'use client'

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowLeft, Download, Eraser, Highlighter, LayoutGrid, Mic, MicOff, MousePointer2, PenLine, Plus, Sparkles, Trash2, Undo2, Upload } from 'lucide-react'
import styles from './ClassBoard.module.css'

type Kind = 'note' | 'highlight' | 'table' | 'diagram'
type Block = {
  id: string
  kind: Kind
  x: number
  y: number
  title: string
  text: string
  headers: string[]
  rows: string[][]
  nodes: string[]
}
type Stroke = { id: string; color: string; width: number; points: { x: number; y: number }[] }
type BoardTool = 'select' | 'pen' | 'highlighter'
type RecognitionEvent = { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }
type Recognition = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: RecognitionEvent) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
  start: () => void
  abort: () => void
}
type RecognitionWindow = Window & { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }
type AIBlock = Pick<Block, 'kind' | 'title' | 'text'> & Partial<Pick<Block, 'headers' | 'rows' | 'nodes'>>

const STORE = 'welearn:class-board:v1:'
const LANGUAGES = [
  ['es-CO', 'Español'], ['en-US', 'English'], ['fr-FR', 'Français'],
  ['de-DE', 'Deutsch'], ['it-IT', 'Italiano'], ['pt-BR', 'Português'],
  ['ko-KR', '한국어'], ['ja-JP', '日本語'],
] as const

function makeBlock(kind: Kind, index: number): Block {
  return {
    id: crypto.randomUUID(), kind,
    x: 48 + (index % 3) * 358,
    y: 54 + Math.floor(index / 3) * 278,
    title: kind === 'note' ? 'Idea principal' : kind === 'highlight' ? 'Recuerda' : kind === 'table' ? 'Comparación' : 'Proceso',
    text: kind === 'highlight' ? 'Escribe aquí la regla que quieres destacar.' : kind === 'note' ? 'Escribe aquí tus apuntes de clase.' : '',
    headers: ['Concepto', 'Ejemplo'], rows: [['', ''], ['', '']], nodes: ['Primer paso', 'Siguiente paso'],
  }
}

function BlockCard({ block, onChange, onDelete, onDrag }: {
  block: Block
  onChange: (patch: Partial<Block>) => void
  onDelete: () => void
  onDrag: (x: number, y: number) => void
}) {
  const drag = useRef<{ pointerX: number; pointerY: number; x: number; y: number } | null>(null)
  return (
    <article className={`${styles.card} ${block.kind === 'highlight' ? styles.highlight : block.kind === 'table' ? styles.tableCard : block.kind === 'diagram' ? styles.diagramCard : ''}`} style={{ left: block.x, top: block.y }}>
      <div className={styles.cardHandle}
        onPointerDown={event => { if (event.button !== 0) return; drag.current = { pointerX: event.clientX, pointerY: event.clientY, x: block.x, y: block.y }; event.currentTarget.setPointerCapture(event.pointerId) }}
        onPointerMove={event => { if (!drag.current) return; onDrag(Math.max(0, Math.round(drag.current.x + event.clientX - drag.current.pointerX)), Math.max(0, Math.round(drag.current.y + event.clientY - drag.current.pointerY))) }}
        onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }}>
        <span className={styles.cardType}>{block.kind === 'note' ? 'APUNTE' : block.kind === 'highlight' ? 'DESTACADO' : block.kind === 'table' ? 'TABLA' : 'DIAGRAMA'}</span>
        <button type="button" className={styles.cardDelete} onPointerDown={event => event.stopPropagation()} onClick={onDelete} aria-label={`Eliminar ${block.title}`}><Trash2 size={15} /></button>
      </div>
      <input className={styles.cardTitle} aria-label="Título del bloque" value={block.title} maxLength={70} onChange={event => onChange({ title: event.target.value })} />
      {(block.kind === 'note' || block.kind === 'highlight') &&
        <textarea className={styles.cardText} aria-label="Contenido del bloque" value={block.text} onChange={event => onChange({ text: event.target.value })} rows={block.kind === 'highlight' ? 3 : 6} />}
      {block.kind === 'table' && <div className={styles.tableWrap}>
        <table className={styles.table}><thead><tr>{block.headers.map((header, i) => <th key={i}><input aria-label={`Encabezado ${i + 1}`} value={header} onChange={event => onChange({ headers: block.headers.map((value, j) => i === j ? event.target.value : value) })} /></th>)}</tr></thead>
          <tbody>{block.rows.map((row, i) => <tr key={i}>{block.headers.map((_, j) => <td key={j}><input aria-label={`Fila ${i + 1}, columna ${j + 1}`} value={row[j] ?? ''} onChange={event => onChange({ rows: block.rows.map((current, ri) => ri === i ? block.headers.map((_, ci) => ci === j ? event.target.value : (current[ci] ?? '')) : current) })} /></td>)}</tr>)}</tbody></table>
        <button type="button" className={styles.tinyAction} onClick={() => onChange({ rows: [...block.rows, block.headers.map(() => '')] })}>+ Añadir fila</button>
      </div>}
      {block.kind === 'diagram' && <div className={styles.diagram}>
        {block.nodes.map((node, i) => <div key={i} className={styles.diagramStep}>
          {i > 0 && <ArrowDown size={17} aria-hidden="true" />}
          <input aria-label={`Paso ${i + 1}`} value={node} onChange={event => onChange({ nodes: block.nodes.map((value, j) => i === j ? event.target.value : value) })} />
        </div>)}
        <button type="button" className={styles.tinyAction} onClick={() => onChange({ nodes: [...block.nodes, 'Nuevo paso'] })}>+ Añadir paso</button>
      </div>}
    </article>
  )
}

export default function ClassBoard({ userId }: { userId: string }) {
  const [topic, setTopic] = useState('Clase sin título')
  const [blocks, setBlocks] = useState<Block[]>([])
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null)
  const [transcript, setTranscript] = useState('')
  const [interim, setInterim] = useState('')
  const [manual, setManual] = useState('')
  const [language, setLanguage] = useState('es-CO')
  const [tool, setTool] = useState<BoardTool>('select')
  const [ink, setInk] = useState('#194e9b')
  const [listening, setListening] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [message, setMessage] = useState('Activa el micrófono para empezar a tomar apuntes.')
  const [loaded, setLoaded] = useState(false)
  const [speechAvailable, setSpeechAvailable] = useState(true)
  const boardRef = useRef<HTMLDivElement>(null)
  const importRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<Recognition | null>(null)
  const activeRef = useRef(false)
  const generationRef = useRef(0)
  const pendingRef = useRef('')
  const processingRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSpeechAvailable(Boolean((window as RecognitionWindow).SpeechRecognition || (window as RecognitionWindow).webkitSpeechRecognition))
      try {
        const saved = JSON.parse(localStorage.getItem(STORE + userId) ?? 'null') as { topic?: string; blocks?: Block[]; strokes?: Stroke[]; transcript?: string; language?: string } | null
        if (saved) {
          if (typeof saved.topic === 'string') setTopic(saved.topic)
          if (Array.isArray(saved.blocks)) setBlocks(saved.blocks.slice(0, 80))
          if (Array.isArray(saved.strokes)) setStrokes(saved.strokes.slice(0, 250))
          if (typeof saved.transcript === 'string') setTranscript(saved.transcript.slice(0, 30_000))
          if (typeof saved.language === 'string') setLanguage(saved.language)
        }
      } catch { setMessage('No se pudo recuperar el tablero guardado. Puedes empezar uno nuevo.') }
      setLoaded(true)
    }, 0)
    return () => clearTimeout(timeout)
  }, [userId])

  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem(STORE + userId, JSON.stringify({ topic, blocks, strokes, transcript, language })) }
    catch { queueMicrotask(() => setMessage('El almacenamiento de este navegador está lleno. Exporta el tablero para conservarlo.')) }
  }, [loaded, userId, topic, blocks, strokes, transcript, language])

  useEffect(() => {
    const stopOnHide = () => {
      if (!document.hidden) return
      activeRef.current = false
      generationRef.current++
      recognitionRef.current?.abort()
      abortRef.current?.abort()
      if (timerRef.current) clearTimeout(timerRef.current)
      pendingRef.current = ''
      setListening(false)
      setInterim('')
      setMessage('Micrófono apagado al salir de la pestaña.')
    }
    document.addEventListener('visibilitychange', stopOnHide)
    return () => {
      document.removeEventListener('visibilitychange', stopOnHide)
      activeRef.current = false
      recognitionRef.current?.abort()
      abortRef.current?.abort()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function addBlocks(items: AIBlock[]) {
    setBlocks(current => [...current, ...items.slice(0, 3).map((item, index) => ({
      ...makeBlock(item.kind, current.length + index),
      title: item.title,
      text: item.text,
      headers: item.headers?.length ? item.headers : ['Concepto', 'Ejemplo'],
      rows: item.rows?.length ? item.rows : [['', '']],
      nodes: item.nodes?.length ? item.nodes : ['Primer paso', 'Siguiente paso'],
    }))].slice(0, 80))
  }

  async function convert(chunk: string, auto: boolean) {
    if (auto && !activeRef.current) return
    if (processingRef.current) { if (auto) pendingRef.current = `${chunk} ${pendingRef.current}`.trim(); return }
    processingRef.current = true
    setProcessing(true)
    setMessage('Organizando ideas en el tablero…')
    const generation = generationRef.current
    const controller = new AbortController()
    abortRef.current = controller
    try {
      const response = await fetch('/api/admin/class-board', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ topic, transcript: chunk }), signal: controller.signal,
      })
      const result = await response.json() as { blocks?: AIBlock[]; error?: string }
      if (generation !== generationRef.current || (auto && !activeRef.current)) return
      if (!response.ok || !result.blocks?.length) throw new Error(result.error ?? 'No se generaron apuntes.')
      addBlocks(result.blocks)
      setMessage(`${result.blocks.length} ${result.blocks.length === 1 ? 'bloque añadido' : 'bloques añadidos'} al tablero.`)
    } catch (error) {
      if (generation !== generationRef.current || controller.signal.aborted) return
      addBlocks([{ kind: 'note', title: 'Apunte de la clase', text: chunk }])
      setMessage(error instanceof Error ? `${error.message} Guardé el texto como apunte.` : 'Guardé el texto como apunte.')
    } finally {
      processingRef.current = false
      setProcessing(false)
      if (abortRef.current === controller) abortRef.current = null
      if (activeRef.current && pendingRef.current.length >= 20) {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => void flush(), 1200)
      }
    }
  }

  function flush() {
    if (!activeRef.current || pendingRef.current.trim().length < 20 || processingRef.current) return
    const chunk = pendingRef.current.trim()
    pendingRef.current = ''
    void convert(chunk, true)
  }

  function stopListening(messageText = 'Micrófono apagado. El tablero dejó de generar apuntes.') {
    activeRef.current = false
    generationRef.current++
    pendingRef.current = ''
    if (timerRef.current) clearTimeout(timerRef.current)
    abortRef.current?.abort()
    recognitionRef.current?.abort()
    recognitionRef.current = null
    setListening(false)
    setInterim('')
    setMessage(messageText)
  }

  function startListening() {
    const browser = window as RecognitionWindow
    const Constructor = browser.SpeechRecognition ?? browser.webkitSpeechRecognition
    if (!Constructor) { setMessage('Este navegador no admite dictado. Escribe en el cuadro de abajo y usa “Crear apuntes”.'); return }
    const recognition = new Constructor()
    recognition.lang = language
    recognition.continuous = true
    recognition.interimResults = true
    recognitionRef.current = recognition
    activeRef.current = true
    generationRef.current++
    recognition.onresult = event => {
      if (!activeRef.current) return
      let live = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const spoken = result[0]?.transcript?.trim()
        if (!spoken) continue
        if (result.isFinal) {
          setTranscript(current => `${current}${current ? '\n' : ''}${spoken}`.slice(-30_000))
          pendingRef.current = `${pendingRef.current} ${spoken}`.trim()
        } else live += `${spoken} `
      }
      setInterim(live.trim())
      if (pendingRef.current.length >= 170) void flush()
      else if (pendingRef.current.length >= 20) {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => void flush(), 6500)
      }
    }
    recognition.onerror = event => {
      if (!activeRef.current || event.error === 'no-speech' || event.error === 'aborted') return
      stopListening(event.error === 'not-allowed' ? 'Permite el micrófono en el navegador para usar el dictado.' : `El dictado se detuvo (${event.error}). Puedes seguir escribiendo manualmente.`)
    }
    recognition.onend = () => {
      if (!activeRef.current || recognitionRef.current !== recognition) return
      setTimeout(() => { if (activeRef.current && recognitionRef.current === recognition) { try { recognition.start() } catch { stopListening('El dictado se detuvo. Activa el micrófono para continuar.') } } }, 300)
    }
    try { recognition.start(); setListening(true); setMessage('Escuchando. Cada idea completa aparecerá en el tablero.') }
    catch { stopListening('No se pudo iniciar el micrófono. Comprueba los permisos del navegador.') }
  }

  function pointerPosition(event: PointerEvent<SVGSVGElement>) {
    const rect = boardRef.current!.getBoundingClientRect()
    return { x: Math.round(event.clientX - rect.left), y: Math.round(event.clientY - rect.top) }
  }

  function downloadBoard() {
    const blob = new Blob([JSON.stringify({ version: 1, topic, blocks, strokes, transcript, language, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `tablero-${topic.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').slice(0, 35) || 'clase'}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  async function importBoard(file: File | undefined) {
    if (!file) return
    try {
      if (file.size > 8_000_000) throw new Error('El archivo es demasiado grande.')
      const data = JSON.parse(await file.text()) as Record<string, unknown>
      if (data.version !== 1 || !Array.isArray(data.blocks) || !Array.isArray(data.strokes)) throw new Error('Este archivo no es un tablero de WeLearn válido.')
      const kinds: Kind[] = ['note', 'highlight', 'table', 'diagram']
      const importedBlocks = data.blocks.slice(0, 80).flatMap((value: unknown, index: number): Block[] => {
        if (!value || typeof value !== 'object') return []
        const item = value as Record<string, unknown>
        if (!kinds.includes(item.kind as Kind)) return []
        const fallback = makeBlock(item.kind as Kind, index)
        return [{ ...fallback, id: typeof item.id === 'string' ? item.id : fallback.id,
          x: typeof item.x === 'number' && Number.isFinite(item.x) ? Math.min(3000, Math.max(0, item.x)) : fallback.x,
          y: typeof item.y === 'number' && Number.isFinite(item.y) ? Math.min(5000, Math.max(0, item.y)) : fallback.y,
          title: typeof item.title === 'string' ? item.title.slice(0, 70) : fallback.title,
          text: typeof item.text === 'string' ? item.text.slice(0, 2000) : fallback.text,
          headers: Array.isArray(item.headers) ? item.headers.slice(0, 4).map(value => String(value).slice(0, 50)) : fallback.headers,
          rows: Array.isArray(item.rows) ? item.rows.slice(0, 12).filter(Array.isArray).map(row => row.slice(0, 4).map(value => String(value).slice(0, 100))) : fallback.rows,
          nodes: Array.isArray(item.nodes) ? item.nodes.slice(0, 12).map(value => String(value).slice(0, 100)) : fallback.nodes,
        }]
      })
      const importedStrokes = data.strokes.slice(0, 250).flatMap((value: unknown): Stroke[] => {
        if (!value || typeof value !== 'object') return []
        const item = value as Record<string, unknown>
        if (!Array.isArray(item.points) || typeof item.color !== 'string' || !/^#[0-9a-f]{6}$/i.test(item.color)) return []
        const points = item.points.slice(0, 2000).flatMap((point: unknown) => {
          if (!point || typeof point !== 'object') return []
          const p = point as Record<string, unknown>
          return typeof p.x === 'number' && Number.isFinite(p.x) && typeof p.y === 'number' && Number.isFinite(p.y)
            ? [{ x: Math.min(3000, Math.max(0, p.x)), y: Math.min(5000, Math.max(0, p.y)) }] : []
        })
        return [{ id: crypto.randomUUID(), color: item.color, width: item.width === 21 ? 21 : 3, points }]
      })
      stopListening()
      setTopic(typeof data.topic === 'string' ? data.topic.slice(0, 100) : 'Clase sin título')
      setBlocks(importedBlocks)
      setStrokes(importedStrokes)
      setTranscript(typeof data.transcript === 'string' ? data.transcript.slice(0, 30_000) : '')
      setLanguage(typeof data.language === 'string' && LANGUAGES.some(([value]) => value === data.language) ? data.language : 'es-CO')
      setMessage('Tablero importado. Puedes continuar la clase.')
    } catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo importar el tablero.') }
    finally { if (importRef.current) importRef.current.value = '' }
  }

  const boardHeight = Math.max(900, ...blocks.map(block => block.y + (block.kind === 'diagram' ? 430 : 290) + 60))

  return <div className={styles.shell}>
    <header className={styles.topbar}>
      <Link href="/dashboard/admin" className={styles.back}><ArrowLeft size={18} /><span>Administración</span></Link>
      <div className={styles.identity}><span className={styles.kicker}>WELEARN · ESTUDIO DE CLASE</span><input aria-label="Tema de la clase" value={topic} maxLength={100} onChange={event => setTopic(event.target.value)} /></div>
      <div className={styles.topActions}><span className={`${styles.liveBadge} ${listening ? styles.live : ''}`}>{listening ? '● EN VIVO' : '○ MICRÓFONO APAGADO'}</span><input ref={importRef} type="file" accept="application/json,.json" className={styles.hiddenInput} aria-label="Seleccionar tablero para importar" onChange={event => void importBoard(event.target.files?.[0])} /><button type="button" onClick={() => importRef.current?.click()} className={styles.export}><Upload size={16} /> Importar</button><button type="button" onClick={downloadBoard} className={styles.export}><Download size={16} /> Exportar</button></div>
    </header>

    <div className={styles.workspace}>
      <section className={styles.main} aria-label="Tablero de clase">
        <div className={styles.toolbar}>
          <div className={styles.toolGroup} role="group" aria-label="Herramientas de dibujo">
            <button type="button" className={tool === 'select' ? styles.selectedTool : ''} onClick={() => setTool('select')} title="Seleccionar y mover bloques" aria-label="Seleccionar y mover bloques"><MousePointer2 size={18} /></button>
            <button type="button" className={tool === 'pen' ? styles.selectedTool : ''} onClick={() => setTool('pen')} title="Dibujar" aria-label="Dibujar"><PenLine size={18} /></button>
            <button type="button" className={tool === 'highlighter' ? styles.selectedTool : ''} onClick={() => setTool('highlighter')} title="Resaltar a mano" aria-label="Resaltar a mano"><Highlighter size={18} /></button>
            {['#194e9b', '#e4a323', '#157d72', '#d6575c'].map(color => <button key={color} type="button" aria-label={`Color ${color}`} title={`Color ${color}`} onClick={() => setInk(color)} className={`${styles.swatch} ${ink === color ? styles.activeSwatch : ''}`} style={{ '--swatch': color } as CSSProperties} />)}
            <button type="button" onClick={() => setStrokes(current => current.slice(0, -1))} disabled={!strokes.length} title="Deshacer trazo" aria-label="Deshacer trazo"><Undo2 size={18} /></button>
            <button type="button" onClick={() => setStrokes([])} disabled={!strokes.length} title="Borrar todos los trazos" aria-label="Borrar todos los trazos"><Eraser size={18} /></button>
          </div>
          <div className={styles.toolGroup} role="group" aria-label="Añadir contenido">
            <button type="button" onClick={() => setBlocks(current => [...current, makeBlock('note', current.length)])}><Plus size={16} /> Nota</button>
            <button type="button" onClick={() => setBlocks(current => [...current, makeBlock('table', current.length)])}><LayoutGrid size={16} /> Tabla</button>
            <button type="button" onClick={() => setBlocks(current => [...current, makeBlock('highlight', current.length)])}><Highlighter size={16} /> Resaltar</button>
            <button type="button" onClick={() => setBlocks(current => [...current, makeBlock('diagram', current.length)])}><ArrowDown size={16} /> Diagrama</button>
          </div>
        </div>
        <div className={styles.boardScroll}>
          <div ref={boardRef} className={styles.board} style={{ height: boardHeight }}>
            {!blocks.length && !strokes.length && <div className={styles.emptyBoard}><span>✳</span><h2>Este tablero empieza contigo.</h2><p>Activa el micrófono y explica un concepto, o añade una nota, tabla o diagrama desde la barra de herramientas.</p></div>}
            {blocks.map(block => <BlockCard key={block.id} block={block} onChange={patch => setBlocks(current => current.map(item => item.id === block.id ? { ...item, ...patch } : item))} onDelete={() => setBlocks(current => current.filter(item => item.id !== block.id))} onDrag={(x, y) => setBlocks(current => current.map(item => item.id === block.id ? { ...item, x, y } : item))} />)}
            <svg className={styles.drawing} width="100%" height="100%" style={{ pointerEvents: tool === 'select' ? 'none' : 'auto', cursor: tool === 'select' ? 'default' : 'crosshair' }}
              onPointerDown={event => { if (tool === 'select' || event.button !== 0) return; const stroke = { id: crypto.randomUUID(), color: tool === 'highlighter' ? '#eabf48' : ink, width: tool === 'highlighter' ? 21 : 3, points: [pointerPosition(event)] }; setCurrentStroke(stroke); event.currentTarget.setPointerCapture(event.pointerId) }}
              onPointerMove={event => { if (!currentStroke) return; setCurrentStroke(current => current ? { ...current, points: [...current.points, pointerPosition(event)] } : null) }}
              onPointerUp={() => { if (currentStroke) setStrokes(current => [...current, currentStroke].slice(-250)); setCurrentStroke(null) }}
              onPointerCancel={() => setCurrentStroke(null)}>
              {[...strokes, ...(currentStroke ? [currentStroke] : [])].map(stroke => <polyline key={stroke.id} points={stroke.points.map(point => `${point.x},${point.y}`).join(' ')} fill="none" stroke={stroke.color} strokeWidth={stroke.width} strokeLinecap="round" strokeLinejoin="round" opacity={stroke.width > 10 ? 0.42 : 1} />)}
            </svg>
          </div>
        </div>
      </section>

      <aside className={styles.side} aria-label="Control de voz y transcripción">
        <div className={styles.sideHeader}><span className={styles.kicker}>ASISTENTE DE CLASE</span><h2>Tu voz, en ideas claras.</h2><p>Habla con naturalidad. El tablero organiza conceptos mientras el micrófono esté activo.</p></div>
        <label className={styles.language}>Idioma de la clase<select value={language} disabled={listening} onChange={event => setLanguage(event.target.value)}>{LANGUAGES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <button type="button" className={`${styles.micButton} ${listening ? styles.micOn : ''}`} onClick={() => listening ? stopListening() : startListening()} aria-pressed={listening}>
          {listening ? <MicOff size={20} /> : <Mic size={20} />}{listening ? 'Apagar micrófono' : 'Activar micrófono'}
        </button>
        {!speechAvailable && <p className={styles.unsupported}>El dictado no está disponible en este navegador. Puedes escribir abajo y crear apuntes manualmente.</p>}
        <p className={styles.status} role="status">{processing && <Sparkles size={15} />}{message}</p>
        <div className={styles.transcriptHeader}><h3>Lo dicho en clase</h3><span>{transcript ? transcript.trim().split(/\s+/).length : 0} palabras</span></div>
        <div className={styles.transcript} aria-live="polite">{transcript ? <p>{transcript}</p> : <p className={styles.transcriptEmpty}>La transcripción aparecerá aquí cuando hables.</p>}{interim && <p className={styles.interim}>{interim}…</p>}</div>
        <div className={styles.manual}><label htmlFor="board-manual">Añadir una idea escrita</label><textarea id="board-manual" value={manual} onChange={event => setManual(event.target.value)} placeholder="Ej.: En inglés usamos present perfect para experiencias sin fecha específica…" rows={4} /><button type="button" disabled={manual.trim().length < 20 || processing} onClick={() => { const text = manual.trim(); setManual(''); setTranscript(current => `${current}${current ? '\n' : ''}${text}`.slice(-30_000)); void convert(text, false) }}><Sparkles size={16} /> Crear apuntes</button></div>
        <div className={styles.privacy}>El micrófono se apaga al salir de esta pestaña. El navegador puede usar su servicio de voz para transcribir; WeLearn envía solo el texto a la IA. El tablero se guarda en este navegador. Expórtalo para abrirlo después o en otro equipo.</div>
        <button type="button" className={styles.reset} onClick={() => { if (!window.confirm('¿Empezar un tablero nuevo? Se borrarán los apuntes de esta sesión guardados en este navegador.')) return; stopListening(); setTopic('Clase sin título'); setBlocks([]); setStrokes([]); setTranscript(''); setManual('') }}><Trash2 size={15} /> Nuevo tablero</button>
      </aside>
    </div>
  </div>
}
