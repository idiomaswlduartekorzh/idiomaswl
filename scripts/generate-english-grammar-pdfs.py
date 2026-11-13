#!/usr/bin/env python3
"""Generate the complete multilingual grammar workbook collection."""

import json
import os
import re
import shutil
from pathlib import Path
from xml.sax.saxutils import escape

from pypdf import PdfReader, PdfWriter
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import BaseDocTemplate, Frame, KeepTogether, NotAtTopPageBreak as PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
PDF_LANGUAGE = os.environ.get('GRAMMAR_PDF_LANGUAGE', 'english').lower()
IS_FRENCH = PDF_LANGUAGE == 'french'
IS_GERMAN = PDF_LANGUAGE == 'german'
IS_ITALIAN = PDF_LANGUAGE == 'italian'
IS_PORTUGUESE = PDF_LANGUAGE == 'portuguese'
IS_KOREAN = PDF_LANGUAGE == 'korean'
IS_JAPANESE = PDF_LANGUAGE == 'japanese'
IS_RUSSIAN = PDF_LANGUAGE == 'russian'
DATA = Path(os.environ.get('GRAMMAR_PDF_DATA', ROOT / 'tmp' / 'english-grammar' / 'topics.json'))
OUTPUT = Path(os.environ.get('GRAMMAR_PDF_OUTPUT', os.environ.get('ENGLISH_GRAMMAR_PDF_OUTPUT', ROOT / 'output' / 'pdf' / f'{PDF_LANGUAGE}-grammar')))
if not OUTPUT.is_absolute():
    OUTPUT = ROOT / OUTPUT
PUBLIC = ROOT / 'private' / 'site-materials'
PUBLIC_PREFIX = os.environ.get('GRAMMAR_PDF_PUBLIC_PREFIX', 'frances' if IS_FRENCH else 'aleman' if IS_GERMAN else 'italiano' if IS_ITALIAN else 'portugues' if IS_PORTUGUESE else 'coreano' if IS_KOREAN else 'japones' if IS_JAPANESE else 'ruso' if IS_RUSSIAN else 'ingles')
FONT_REGULAR = ROOT / 'public' / 'fonts' / ('noto-sans-kr-400.ttf' if IS_KOREAN else 'welearn-ja-400.ttf' if IS_JAPANESE else 'welearn-ru-400.ttf' if IS_RUSSIAN else 'welearn-ko-400.ttf')
FONT_BOLD = ROOT / 'public' / 'fonts' / ('noto-sans-kr-700.ttf' if IS_KOREAN else 'welearn-ja-700.ttf' if IS_JAPANESE else 'welearn-ru-700.ttf' if IS_RUSSIAN else 'welearn-ko-700.ttf')
LOGO = ROOT / 'public' / 'images' / 'welearn-wordmark-transparent-v2.png'

NAVY = colors.HexColor('#24458F' if IS_RUSSIAN else '#202A44' if IS_JAPANESE else '#153C79' if IS_KOREAN else '#126B3A' if IS_PORTUGUESE else '#012169')
RED = colors.HexColor('#D92F45' if IS_RUSSIAN else '#BC002D' if IS_JAPANESE else '#D6293E' if IS_KOREAN else '#C99C00' if IS_PORTUGUESE else '#C8102E')
BLUE = colors.HexColor('#3C648F' if IS_RUSSIAN else '#3B4768' if IS_JAPANESE else '#315A9A' if IS_KOREAN else '#197347' if IS_PORTUGUESE else '#244C9A')
INK = colors.HexColor('#172033')
MUTED = colors.HexColor('#667085')
LINE = colors.HexColor('#D8DEE9')
CREAM = colors.HexColor('#F8F3E9')
PALE_BLUE = colors.HexColor('#EEF3FF')
PALE_RED = colors.HexColor('#FFF0F2')
PALE_GOLD = colors.HexColor('#FFF7DF')
PALE_GREEN = colors.HexColor('#EEF9F4')
SOFT_BG = colors.HexColor('#F6F7FB')
WHITE = colors.white
PAGE_W, PAGE_H = A4

pdfmetrics.registerFont(TTFont('WeLearnEN', str(FONT_REGULAR)))
pdfmetrics.registerFont(TTFont('WeLearnEN-Bold', str(FONT_BOLD)))


GERMAN_TEXT = {
    'complete guide': 'vollständiger Kurs', 'exercise workbook': 'Übungsheft', 'answer key': 'Lösungsschlüssel',
    'English grammar': 'Deutsche Grammatik', 'Complete guide': 'Vollständiger Kurs', 'Exercise workbook': 'Übungsheft',
    'Answer key': 'Lösungsschlüssel', 'Original material · English': 'Originalmaterial · Deutsch', 'Page': 'Seite',
    'Options': 'Auswahl', 'OPTIONS  ': 'AUSWAHL  ', 'ENGLISH': 'DEUTSCH', 'This document': 'Dieses Dokument',
    'Model answers and concise grammar explanations for every stage in the separate exercise workbook.': 'Musterlösungen und knappe grammatische Erklärungen zu jeder Stufe des getrennten Übungshefts.',
    'Recommended use': 'Empfohlene Verwendung', 'Keep the three-document system together': 'Das System aus drei Dokumenten zusammen verwenden',
    'Use the complete guide to understand the concept, this workbook to practise, and the answer key to diagnose each decision.': 'Nutzen Sie den vollständigen Kurs zum Verstehen, das Übungsheft zum Trainieren und den Lösungsschlüssel zur Auswertung jeder Entscheidung.',
    'Correct one stage at a time. Explain the rule aloud before marking an answer as secure.': 'Korrigieren Sie jeweils eine Stufe. Erklären Sie die Regel laut, bevor Sie eine Antwort als sicher markieren.',
    'WELEARN STUDY SEQUENCE': 'WELEARN-LERNABLAUF', 'Practice stage': 'Übungsstufe', 'Gap': 'Lücke',
    'Word bank': 'Formenbank', 'Available forms': 'Verfügbare Formen', 'Stage check': 'Stufenkontrolle',
    'Pause before continuing': 'Vor dem Fortfahren kurz prüfen',
    'Underline the trigger or decision point, name the rule, and check that the meaning has not changed.': 'Unterstreichen Sie den Auslöser oder Entscheidungspunkt, benennen Sie die Regel und prüfen Sie, ob die Bedeutung erhalten bleibt.',
    'Retrieval': 'Aktiver Abruf', 'Final self-check': 'Abschließende Selbstkontrolle',
    'Complete these prompts without reopening the guide.': 'Bearbeiten Sie diese Impulse, ohne den Kurs erneut zu öffnen.',
    'Review focus': 'Wiederholungsfokus', 'Compare the form first, then read the explanation and name the rule in your own words.': 'Vergleichen Sie zuerst die Form, lesen Sie dann die Erklärung und formulieren Sie die Regel mit eigenen Worten.',
    'Feedback': 'Rückmeldung', 'Diagnose the pattern, not only the score': 'Analysieren Sie das Muster, nicht nur die Punktzahl',
    'Use this page to decide what to revisit in the complete guide.': 'Nutzen Sie diese Seite, um die nächste Wiederholung im vollständigen Kurs zu planen.',
    'What went wrong? What rule will prevent the same error next time?': 'Was ist schiefgegangen? Welche Regel verhindert denselben Fehler beim nächsten Mal?',
    'ADVANCED GRAMMAR': 'FORTGESCHRITTENE GRAMMATIK', 'The central idea': 'Die zentrale Idee', 'Model': 'Modell',
    'This complete guide combines explanation, visual reasoning, practice and feedback. Separate exercise and answer-key editions are also available from the lesson page.': 'Dieser vollständige Kurs verbindet Erklärung, visuelles Denken, Übungen und Rückmeldung. Ein getrenntes Übungsheft und ein Lösungsschlüssel stehen ebenfalls auf der Lektionsseite bereit.',
    'LEARNING OUTCOMES': 'LERNZIELE', 'Understand': 'Verstehen', 'Build meaning before form': 'Bedeutung vor Form aufbauen',
    'Visual map': 'Visuelle Karte', 'Reason through the pattern': 'Das Muster schrittweise begründen',
    'DECIDE IN THIS ORDER': 'IN DIESER REIHENFOLGE ENTSCHEIDEN', 'Reference': 'Übersicht',
    'Compare forms and meanings': 'Formen und Bedeutungen vergleichen', 'Use the table to justify each structural choice.': 'Begründen Sie jede strukturelle Wahl mithilfe der Tabelle.',
    'EXAMPLES AT A GLANCE': 'BEISPIELE AUF EINEN BLICK', 'COMMON ERRORS': 'HÄUFIGE FEHLER',
    'Edit this': 'Überarbeiten', 'Avoid this pattern': 'Dieses Fehlermuster vermeiden',
    'exercises': 'uebungen', 'answer-key': 'loesungen',
}


def germanize(value):
    if isinstance(value, list):
        if value == ['complete guide', 'exercise workbook', 'answer key', 'retrieval review']:
            return ['vollständiger Kurs', 'Übungsheft', 'Lösungsschlüssel', 'aktiver Abruf']
        if value == ['Trigger or context', 'Auxiliary or structural choice', 'Main verb or clause form', 'Meaning and register']:
            return ['Auslöser oder Kontext', 'Hilfsverb oder Strukturwahl', 'Vollverb oder Satzform', 'Bedeutung und Register']
        return value
    if value in GERMAN_TEXT:
        return GERMAN_TEXT[value]
    match = re.fullmatch(r'(\d+) learning decisions arranged in (?:six )?progressive stages\. Write directly on the page and consult the separate answer key only after completing a stage\.', value)
    if match:
        return f"{match.group(1)} Lernentscheidungen in sechs progressiven Stufen. Schreiben Sie direkt auf die Seite und nutzen Sie den getrennten Lösungsschlüssel erst nach Abschluss einer Stufe."
    match = re.fullmatch(r'Printable practice for (.+)\. No explanations or solutions interrupt the work pages\.', value)
    if match:
        return f"Druckbare Übungen zu {match.group(1)}. Keine Erklärungen oder Lösungen unterbrechen die Arbeitsseiten."
    match = re.fullmatch(r'Explain and exemplify: (.+)\.', value)
    if match:
        return f"Erklären und mit einem Beispiel belegen: {match.group(1)}."
    match = re.fullmatch(r'Solutions and feedback for the (.+) exercise workbook\.', value)
    if match:
        return f"Lösungen und Rückmeldung zum Übungsheft {match.group(1)}."
    match = re.fullmatch(r'(\d+) GUIDED STAGES · (\d+) LEARNING DECISIONS', value)
    if match:
        return f"{match.group(1)} GELENKTE STUFEN · {match.group(2)} LERNENTSCHEIDUNGEN"
    match = re.fullmatch(r'Outcome (\d+)', value)
    if match:
        return f"Lernziel {match.group(1)}"
    match = re.fullmatch(r'Step (\d+)', value)
    if match:
        return f"Schritt {match.group(1)}"
    match = re.fullmatch(r'Decision (\d+)', value)
    if match:
        return f"Entscheidung {match.group(1)}"
    return value


ITALIAN_TEXT = {
    'complete guide': 'corso completo', 'exercise workbook': 'quaderno di esercizi', 'answer key': 'soluzioni',
    'English grammar': 'Grammatica italiana', 'Complete guide': 'Corso completo', 'Exercise workbook': 'Quaderno di esercizi',
    'Answer key': 'Soluzioni', 'Original material · English': 'Materiale originale · Italiano', 'Page': 'Pagina',
    'Options': 'Opzioni', 'OPTIONS  ': 'OPZIONI  ', 'ENGLISH': 'ITALIANO', 'This document': 'Questo documento',
    'Model answers and concise grammar explanations for every stage in the separate exercise workbook.': 'Risposte modello e spiegazioni grammaticali concise per ogni fase del quaderno di esercizi separato.',
    'Recommended use': 'Uso consigliato', 'Keep the three-document system together': 'Usa insieme i tre documenti',
    'Use the complete guide to understand the concept, this workbook to practise, and the answer key to diagnose each decision.': 'Usa il corso completo per capire il concetto, questo quaderno per esercitarti e le soluzioni per valutare ogni decisione.',
    'Correct one stage at a time. Explain the rule aloud before marking an answer as secure.': 'Correggi una fase alla volta. Spiega la regola ad alta voce prima di considerare sicura una risposta.',
    'WELEARN STUDY SEQUENCE': 'PERCORSO DI STUDIO WELEARN', 'Practice stage': 'Fase di pratica', 'Gap': 'Spazio',
    'Word bank': 'Banca di forme', 'Available forms': 'Forme disponibili', 'Stage check': 'Controllo della fase',
    'Pause before continuing': 'Fermati prima di continuare',
    'Underline the trigger or decision point, name the rule, and check that the meaning has not changed.': 'Sottolinea l’elemento attivatore o il punto decisionale, nomina la regola e controlla che il significato non sia cambiato.',
    'Retrieval': 'Recupero attivo', 'Final self-check': 'Autocontrollo finale',
    'Complete these prompts without reopening the guide.': 'Completa queste consegne senza riaprire il corso.',
    'Review focus': 'Focus di revisione', 'Compare the form first, then read the explanation and name the rule in your own words.': 'Confronta prima la forma, poi leggi la spiegazione e formula la regola con parole tue.',
    'Feedback': 'Riscontro', 'Diagnose the pattern, not only the score': 'Analizza lo schema, non solo il punteggio',
    'Use this page to decide what to revisit in the complete guide.': 'Usa questa pagina per decidere che cosa ripassare nel corso completo.',
    'What went wrong? What rule will prevent the same error next time?': 'Che cosa non ha funzionato? Quale regola eviterà lo stesso errore la prossima volta?',
    'ADVANCED GRAMMAR': 'GRAMMATICA AVANZATA', 'The central idea': 'L’idea centrale', 'Model': 'Modello',
    'This complete guide combines explanation, visual reasoning, practice and feedback. Separate exercise and answer-key editions are also available from the lesson page.': 'Questo corso completo unisce spiegazione, ragionamento visivo, pratica e riscontro. Dalla pagina della lezione sono disponibili anche il quaderno di esercizi e le soluzioni separate.',
    'LEARNING OUTCOMES': 'OBIETTIVI DI APPRENDIMENTO', 'Understand': 'Capire', 'Build meaning before form': 'Costruire il significato prima della forma',
    'Visual map': 'Mappa visiva', 'Reason through the pattern': 'Ragionare attraverso lo schema',
    'DECIDE IN THIS ORDER': 'DECIDI IN QUESTO ORDINE', 'Reference': 'Riferimento',
    'Compare forms and meanings': 'Confrontare forme e significati', 'Use the table to justify each structural choice.': 'Usa la tabella per motivare ogni scelta strutturale.',
    'EXAMPLES AT A GLANCE': 'ESEMPI IN SINTESI', 'COMMON ERRORS': 'ERRORI FREQUENTI',
    'Edit this': 'Da rivedere', 'Avoid this pattern': 'Evita questo errore',
    'exercises': 'esercizi', 'answer-key': 'soluzioni',
}


def italianize(value):
    if isinstance(value, list):
        if value == ['complete guide', 'exercise workbook', 'answer key', 'retrieval review']:
            return ['corso completo', 'quaderno di esercizi', 'soluzioni', 'recupero attivo']
        if value == ['Trigger or context', 'Auxiliary or structural choice', 'Main verb or clause form', 'Meaning and register']:
            return ['Elemento attivatore o contesto', 'Ausiliare o scelta strutturale', 'Verbo principale o forma della frase', 'Significato e registro']
        return value
    if value in ITALIAN_TEXT:
        return ITALIAN_TEXT[value]
    match = re.fullmatch(r'(\d+) learning decisions arranged in (?:six )?progressive stages\. Write directly on the page and consult the separate answer key only after completing a stage\.', value)
    if match:
        return f"{match.group(1)} decisioni di apprendimento in sei fasi progressive. Scrivi direttamente sulla pagina e consulta le soluzioni separate solo dopo aver completato una fase."
    match = re.fullmatch(r'Printable practice for (.+)\. No explanations or solutions interrupt the work pages\.', value)
    if match:
        return f"Esercizi stampabili su {match.group(1)}. Nessuna spiegazione o soluzione interrompe le pagine di lavoro."
    match = re.fullmatch(r'Explain and exemplify: (.+)\.', value)
    if match:
        return f"Spiega e illustra con un esempio: {match.group(1)}."
    match = re.fullmatch(r'Solutions and feedback for the (.+) exercise workbook\.', value)
    if match:
        return f"Soluzioni e riscontro per il quaderno di esercizi su {match.group(1)}."
    match = re.fullmatch(r'(\d+) GUIDED STAGES · (\d+) LEARNING DECISIONS', value)
    if match:
        return f"{match.group(1)} FASI GUIDATE · {match.group(2)} DECISIONI DI APPRENDIMENTO"
    match = re.fullmatch(r'Outcome (\d+)', value)
    if match:
        return f"Obiettivo {match.group(1)}"
    match = re.fullmatch(r'Step (\d+)', value)
    if match:
        return f"Passo {match.group(1)}"
    match = re.fullmatch(r'Decision (\d+)', value)
    if match:
        return f"Decisione {match.group(1)}"
    return value


PORTUGUESE_TEXT = {
    'complete guide': 'curso completo', 'exercise workbook': 'caderno de exercícios', 'answer key': 'gabarito comentado',
    'English grammar': 'Gramática portuguesa', 'Complete guide': 'Curso completo', 'Exercise workbook': 'Caderno de exercícios',
    'Answer key': 'Gabarito comentado', 'Original material · English': 'Material original · Português', 'Page': 'Página',
    'Options': 'Opções', 'OPTIONS  ': 'OPÇÕES  ', 'ENGLISH': 'PORTUGUÊS', 'This document': 'Este documento',
    'Model answers and concise grammar explanations for every stage in the separate exercise workbook.': 'Respostas-modelo e explicações gramaticais concisas para cada etapa do caderno de exercícios separado.',
    'Recommended use': 'Uso recomendado', 'Keep the three-document system together': 'Use os três documentos em conjunto',
    'Use the complete guide to understand the concept, this workbook to practise, and the answer key to diagnose each decision.': 'Use o curso completo para compreender o conceito, este caderno para praticar e o gabarito para avaliar cada decisão.',
    'Correct one stage at a time. Explain the rule aloud before marking an answer as secure.': 'Corrija uma etapa de cada vez. Explique a regra em voz alta antes de considerar uma resposta segura.',
    'WELEARN STUDY SEQUENCE': 'PERCURSO DE ESTUDO WELEARN', 'Practice stage': 'Etapa de prática', 'Gap': 'Lacuna',
    'Word bank': 'Banco de formas', 'Available forms': 'Formas disponíveis', 'Stage check': 'Verificação da etapa',
    'Pause before continuing': 'Faça uma pausa antes de continuar',
    'Underline the trigger or decision point, name the rule, and check that the meaning has not changed.': 'Sublinhe o elemento acionador ou o ponto de decisão, nomeie a regra e confira se o sentido não mudou.',
    'Retrieval': 'Recuperação ativa', 'Final self-check': 'Autoavaliação final',
    'Complete these prompts without reopening the guide.': 'Complete estas propostas sem reabrir o curso.',
    'Review focus': 'Foco de revisão', 'Compare the form first, then read the explanation and name the rule in your own words.': 'Compare primeiro a forma, depois leia a explicação e formule a regra com suas próprias palavras.',
    'Feedback': 'Retorno', 'Diagnose the pattern, not only the score': 'Analise o padrão, não apenas a pontuação',
    'Use this page to decide what to revisit in the complete guide.': 'Use esta página para decidir o que deve ser revisto no curso completo.',
    'What went wrong? What rule will prevent the same error next time?': 'O que não funcionou? Que regra evitará o mesmo erro na próxima vez?',
    'ADVANCED GRAMMAR': 'GRAMÁTICA AVANÇADA', 'The central idea': 'A ideia central', 'Model': 'Modelo',
    'This complete guide combines explanation, visual reasoning, practice and feedback. Separate exercise and answer-key editions are also available from the lesson page.': 'Este curso completo reúne explicação, raciocínio visual, prática e retorno. O caderno de exercícios e o gabarito separados também estão disponíveis na página da aula.',
    'LEARNING OUTCOMES': 'OBJETIVOS DE APRENDIZAGEM', 'Understand': 'Compreender', 'Build meaning before form': 'Construir o sentido antes da forma',
    'Visual map': 'Mapa visual', 'Reason through the pattern': 'Raciocinar a partir da estrutura',
    'DECIDE IN THIS ORDER': 'DECIDA NESTA ORDEM', 'Reference': 'Referência',
    'Compare forms and meanings': 'Comparar formas e sentidos', 'Use the table to justify each structural choice.': 'Use a tabela para justificar cada escolha estrutural.',
    'EXAMPLES AT A GLANCE': 'EXEMPLOS EM UM SÓ OLHAR', 'COMMON ERRORS': 'ERROS FREQUENTES',
    'Edit this': 'Revise isto', 'Avoid this pattern': 'Evite este padrão',
    'exercises': 'exercicios', 'answer-key': 'gabarito',
}


def portugueseize(value):
    if isinstance(value, list):
        if value == ['complete guide', 'exercise workbook', 'answer key', 'retrieval review']:
            return ['curso completo', 'caderno de exercícios', 'gabarito comentado', 'recuperação ativa']
        if value == ['Trigger or context', 'Auxiliary or structural choice', 'Main verb or clause form', 'Meaning and register']:
            return ['Elemento acionador ou contexto', 'Auxiliar ou escolha estrutural', 'Verbo principal ou forma da oração', 'Sentido e registro']
        return value
    if value in PORTUGUESE_TEXT:
        return PORTUGUESE_TEXT[value]
    match = re.fullmatch(r'(\d+) learning decisions arranged in (?:six )?progressive stages\. Write directly on the page and consult the separate answer key only after completing a stage\.', value)
    if match:
        return f"{match.group(1)} decisões de aprendizagem em seis etapas progressivas. Escreva diretamente na página e consulte o gabarito separado somente depois de concluir uma etapa."
    match = re.fullmatch(r'Printable practice for (.+)\. No explanations or solutions interrupt the work pages\.', value)
    if match:
        return f"Prática para impressão sobre {match.group(1)}. Nenhuma explicação ou solução interrompe as páginas de trabalho."
    match = re.fullmatch(r'Explain and exemplify: (.+)\.', value)
    if match:
        return f"Explique e exemplifique: {match.group(1)}."
    match = re.fullmatch(r'Solutions and feedback for the (.+) exercise workbook\.', value)
    if match:
        return f"Soluções e retorno para o caderno de exercícios sobre {match.group(1)}."
    match = re.fullmatch(r'(\d+) GUIDED STAGES · (\d+) LEARNING DECISIONS', value)
    if match:
        return f"{match.group(1)} ETAPAS GUIADAS · {match.group(2)} DECISÕES DE APRENDIZAGEM"
    match = re.fullmatch(r'Outcome (\d+)', value)
    if match:
        return f"Objetivo {match.group(1)}"
    match = re.fullmatch(r'Step (\d+)', value)
    if match:
        return f"Passo {match.group(1)}"
    match = re.fullmatch(r'Decision (\d+)', value)
    if match:
        return f"Decisão {match.group(1)}"
    return value


KOREAN_TEXT = {
    'complete guide': '전체 강의', 'exercise workbook': '연습 문제집', 'answer key': '정답과 해설',
    'English grammar': '한국어 문법', 'Complete guide': '전체 강의', 'Exercise workbook': '연습 문제집',
    'Answer key': '정답과 해설', 'Original material · English': 'Idiomas WeLearn 제작 · 한국어', 'Page': '쪽',
    'Options': '선택지', 'OPTIONS  ': '선택지  ', 'ENGLISH': '한국어', 'This document': '이 자료',
    'Model answers and concise grammar explanations for every stage in the separate exercise workbook.': '별도 연습 문제집의 모든 단계에 대한 모범 답안과 핵심 문법 해설입니다.',
    'Recommended use': '권장 활용법', 'Keep the three-document system together': '세 가지 자료를 함께 활용하세요',
    'Use the complete guide to understand the concept, this workbook to practise, and the answer key to diagnose each decision.': '전체 강의로 개념을 이해하고, 연습 문제집으로 훈련한 뒤, 정답과 해설로 각 선택을 점검하세요.',
    'Correct one stage at a time. Explain the rule aloud before marking an answer as secure.': '한 번에 한 단계씩 채점하고, 정답으로 확정하기 전에 규칙을 말로 설명하세요.',
    'WELEARN STUDY SEQUENCE': 'WELEARN 학습 순서', 'Practice stage': '연습 단계', 'Gap': '빈칸',
    'Word bank': '표현 상자', 'Available forms': '사용할 수 있는 형태', 'Stage check': '단계 점검',
    'Pause before continuing': '다음 단계 전에 잠시 점검하세요',
    'Underline the trigger or decision point, name the rule, and check that the meaning has not changed.': '선택을 결정하는 단서를 표시하고 규칙을 말한 뒤 의미가 달라지지 않았는지 확인하세요.',
    'Retrieval': '인출 연습', 'Final self-check': '최종 자기 점검',
    'Complete these prompts without reopening the guide.': '전체 강의를 다시 보지 않고 다음 과제를 완성하세요.',
    'Review focus': '복습 초점', 'Compare the form first, then read the explanation and name the rule in your own words.': '먼저 형태를 비교하고 해설을 읽은 뒤 규칙을 자신의 말로 설명하세요.',
    'Feedback': '피드백', 'Diagnose the pattern, not only the score': '점수뿐 아니라 오류의 패턴을 찾으세요',
    'Use this page to decide what to revisit in the complete guide.': '이 페이지를 바탕으로 전체 강의에서 무엇을 다시 볼지 결정하세요.',
    'What went wrong? What rule will prevent the same error next time?': '무엇이 잘못되었나요? 같은 실수를 막을 규칙은 무엇인가요?',
    'ADVANCED GRAMMAR': '고급 문법', 'The central idea': '핵심 개념', 'Model': '모델',
    'This complete guide combines explanation, visual reasoning, practice and feedback. Separate exercise and answer-key editions are also available from the lesson page.': '이 전체 강의는 설명, 시각적 사고, 연습과 피드백을 연결합니다. 강의 페이지에서 연습 문제집과 정답·해설도 따로 받을 수 있습니다.',
    'LEARNING OUTCOMES': '학습 목표', 'Understand': '이해하기', 'Build meaning before form': '형태보다 의미를 먼저 세우기',
    'Visual map': '시각 지도', 'Reason through the pattern': '구조를 따라 사고하기',
    'DECIDE IN THIS ORDER': '이 순서로 판단하세요', 'Reference': '참고표',
    'Compare forms and meanings': '형태와 의미 비교하기', 'Use the table to justify each structural choice.': '표를 사용해 각 구조 선택의 근거를 설명하세요.',
    'EXAMPLES AT A GLANCE': '예문 한눈에 보기', 'COMMON ERRORS': '자주 하는 실수',
    'Edit this': '고쳐 보기', 'Avoid this pattern': '이 오류 패턴을 피하세요',
    'exercises': 'yeonseup', 'answer-key': 'haeseol',
}


def koreanize(value):
    if isinstance(value, list):
        if value == ['complete guide', 'exercise workbook', 'answer key', 'retrieval review']:
            return ['전체 강의', '연습 문제집', '정답과 해설', '인출 복습']
        if value == ['Trigger or context', 'Auxiliary or structural choice', 'Main verb or clause form', 'Meaning and register']:
            return ['단서 또는 맥락', '문법 형태 또는 구조 선택', '중심 서술어 또는 절의 형태', '의미와 격식']
        return value
    if value in KOREAN_TEXT:
        return KOREAN_TEXT[value]
    match = re.fullmatch(r'(\d+) learning decisions arranged in (?:six )?progressive stages\. Write directly on the page and consult the separate answer key only after completing a stage\.', value)
    if match:
        return f"6단계로 구성된 {match.group(1)}개의 학습 판단입니다. 페이지에 직접 답하고 한 단계를 마친 뒤에만 별도 해설을 확인하세요."
    match = re.fullmatch(r'Printable practice for (.+)\. No explanations or solutions interrupt the work pages\.', value)
    if match:
        return f"{match.group(1)} 인쇄용 연습입니다. 문제 페이지에는 설명이나 정답이 섞이지 않습니다."
    match = re.fullmatch(r'Explain and exemplify: (.+)\.', value)
    if match:
        return f"설명하고 예문을 만드세요: {match.group(1)}."
    match = re.fullmatch(r'Solutions and feedback for the (.+) exercise workbook\.', value)
    if match:
        return f"{match.group(1)} 연습 문제집의 정답과 해설입니다."
    match = re.fullmatch(r'(\d+) GUIDED STAGES · (\d+) LEARNING DECISIONS', value)
    if match:
        return f"{match.group(1)}단계 학습 · {match.group(2)}개 문법 판단"
    match = re.fullmatch(r'Outcome (\d+)', value)
    if match:
        return f"학습 목표 {match.group(1)}"
    match = re.fullmatch(r'Step (\d+)', value)
    if match:
        return f"{match.group(1)}단계"
    match = re.fullmatch(r'Decision (\d+)', value)
    if match:
        return f"판단 {match.group(1)}"
    return value


JAPANESE_TEXT = {
    'complete guide': '完全版', 'exercise workbook': '練習問題集', 'answer key': '解答と解説',
    'English grammar': '日本語文法', 'Complete guide': '完全版', 'Exercise workbook': '練習問題集',
    'Answer key': '解答と解説', 'Original material · English': 'Idiomas WeLearn制作 · 日本語', 'Page': 'ページ',
    'Options': '選択肢', 'OPTIONS  ': '選択肢  ', 'ENGLISH': '日本語', 'This document': 'この資料',
    'Model answers and concise grammar explanations for every stage in the separate exercise workbook.': '別冊の練習問題集の全段階に対応する模範解答と文法解説です。',
    'Recommended use': 'おすすめの使い方', 'Keep the three-document system together': '3種類の資料を一緒に使う',
    'Use the complete guide to understand the concept, this workbook to practise, and the answer key to diagnose each decision.': '完全版で概念を理解し、問題集で練習し、解答と解説で各判断を診断してください。',
    'Correct one stage at a time. Explain the rule aloud before marking an answer as secure.': '一段階ずつ答え合わせし、正解とする前に規則を自分の言葉で説明してください。',
    'WELEARN STUDY SEQUENCE': 'WELEARN 学習の流れ', 'Practice stage': '練習段階', 'Gap': '空欄',
    'Word bank': '表現バンク', 'Available forms': '使える形', 'Stage check': '段階の確認',
    'Pause before continuing': '次へ進む前に確認する',
    'Underline the trigger or decision point, name the rule, and check that the meaning has not changed.': '判断の手掛かりに線を引き、規則を言葉にし、意味が変わっていないか確認してください。',
    'Retrieval': '想起練習', 'Final self-check': '最終セルフチェック',
    'Complete these prompts without reopening the guide.': '完全版を開かずに、次の課題を完成させてください。',
    'Review focus': '復習の焦点', 'Compare the form first, then read the explanation and name the rule in your own words.': 'まず形を比べ、解説を読んだ後、規則を自分の言葉で説明してください。',
    'Feedback': 'フィードバック', 'Diagnose the pattern, not only the score': '点数だけでなく誤りの型を診断する',
    'Use this page to decide what to revisit in the complete guide.': 'このページを使って、完全版で何を復習するか決めてください。',
    'What went wrong? What rule will prevent the same error next time?': '何が間違っていましたか。次に同じ誤りを防ぐ規則は何ですか。',
    'ADVANCED GRAMMAR': '上級文法', 'The central idea': '中心となる考え', 'Model': 'モデル',
    'This complete guide combines explanation, visual reasoning, practice and feedback. Separate exercise and answer-key editions are also available from the lesson page.': 'この完全版は、解説、視覚的な思考、練習、フィードバックを一つにつなげます。レッスンページには問題集と解答解説の別冊もあります。',
    'LEARNING OUTCOMES': '学習目標', 'Understand': '理解する', 'Build meaning before form': '形より先に意味を組み立てる',
    'Visual map': '視覚マップ', 'Reason through the pattern': '型に沿って考える',
    'DECIDE IN THIS ORDER': 'この順序で判断する', 'Reference': '参考表',
    'Compare forms and meanings': '形と意味を比べる', 'Use the table to justify each structural choice.': '表を使って各構造を選んだ理由を説明してください。',
    'EXAMPLES AT A GLANCE': '例文を一目で確認', 'COMMON ERRORS': 'よくある誤り',
    'Edit this': '推敲する', 'Avoid this pattern': 'この誤りを避ける',
    'exercises': 'renshu', 'answer-key': 'kaito',
}


def japaneseize(value):
    if isinstance(value, list):
        if value == ['complete guide', 'exercise workbook', 'answer key', 'retrieval review']:
            return ['完全版', '練習問題集', '解答と解説', '想起復習']
        if value == ['Trigger or context', 'Auxiliary or structural choice', 'Main verb or clause form', 'Meaning and register']:
            return ['手掛かり・文脈', '文法形式・構造の選択', '中心述語・節の形', '意味と文体']
        return value
    if value in JAPANESE_TEXT:
        return JAPANESE_TEXT[value]
    match = re.fullmatch(r'(\d+) learning decisions arranged in (?:six )?progressive stages\. Write directly on the page and consult the separate answer key only after completing a stage\.', value)
    if match:
        return f"6段階に整理した{match.group(1)}の学習判断です。ページに直接答えを書き、一段階を終えてから別冊の解答を確認してください。"
    match = re.fullmatch(r'Printable practice for (.+)\. No explanations or solutions interrupt the work pages\.', value)
    if match:
        return f"「{match.group(1)}」の印刷用練習です。問題ページには解説や答えを入れていません。"
    match = re.fullmatch(r'Explain and exemplify: (.+)\.', value)
    if match:
        return f"説明し、例文を作ってください：{match.group(1)}。"
    match = re.fullmatch(r'Solutions and feedback for the (.+) exercise workbook\.', value)
    if match:
        return f"「{match.group(1)}」練習問題集の解答とフィードバックです。"
    match = re.fullmatch(r'(\d+) GUIDED STAGES · (\d+) LEARNING DECISIONS', value)
    if match:
        return f"{match.group(1)}段階の練習 · {match.group(2)}の文法判断"
    match = re.fullmatch(r'Outcome (\d+)', value)
    if match:
        return f"学習目標 {match.group(1)}"
    match = re.fullmatch(r'Step (\d+)', value)
    if match:
        return f"ステップ {match.group(1)}"
    match = re.fullmatch(r'Decision (\d+)', value)
    if match:
        return f"判断 {match.group(1)}"
    return value


RUSSIAN_TEXT = {
    'complete guide': 'полный учебник', 'exercise workbook': 'тетрадь упражнений', 'answer key': 'ответы и объяснения',
    'English grammar': 'Русская грамматика', 'Complete guide': 'Полный учебник', 'Exercise workbook': 'Тетрадь упражнений',
    'Answer key': 'Ответы и объяснения', 'Original material · English': 'Авторский материал · Русский язык', 'Page': 'Страница',
    'Options': 'Варианты', 'OPTIONS  ': 'ВАРИАНТЫ  ', 'ENGLISH': 'РУССКИЙ ЯЗЫК', 'This document': 'Этот материал',
    'Model answers and concise grammar explanations for every stage in the separate exercise workbook.': 'Модельные ответы и краткие грамматические объяснения для каждого этапа отдельной тетради упражнений.',
    'Recommended use': 'Как работать с материалами', 'Keep the three-document system together': 'Используйте три документа как единую систему',
    'Use the complete guide to understand the concept, this workbook to practise, and the answer key to diagnose each decision.': 'Изучите понятие по полному учебнику, закрепите его в тетради и разберите каждое решение по ответам с объяснениями.',
    'Correct one stage at a time. Explain the rule aloud before marking an answer as secure.': 'Проверяйте по одному этапу и формулируйте правило вслух, прежде чем считать ответ усвоенным.',
    'WELEARN STUDY SEQUENCE': 'УЧЕБНЫЙ МАРШРУТ WELEARN', 'Practice stage': 'Этап практики', 'Gap': 'Пропуск',
    'Word bank': 'Банк форм', 'Available forms': 'Доступные формы', 'Stage check': 'Проверка этапа',
    'Pause before continuing': 'Остановитесь перед продолжением',
    'Underline the trigger or decision point, name the rule, and check that the meaning has not changed.': 'Подчеркните опорный элемент, назовите правило и проверьте, сохранился ли исходный смысл.',
    'Retrieval': 'Активное воспроизведение', 'Final self-check': 'Итоговая самопроверка',
    'Complete these prompts without reopening the guide.': 'Выполните задания, не открывая полный учебник.',
    'Review focus': 'Фокус повторения', 'Compare the form first, then read the explanation and name the rule in your own words.': 'Сначала сравните форму, затем прочитайте объяснение и сформулируйте правило своими словами.',
    'Feedback': 'Обратная связь', 'Diagnose the pattern, not only the score': 'Анализируйте тип ошибки, а не только результат',
    'Use this page to decide what to revisit in the complete guide.': 'Используйте эту страницу, чтобы выбрать материал для повторения в полном учебнике.',
    'What went wrong? What rule will prevent the same error next time?': 'Что пошло не так? Какое правило поможет избежать этой ошибки в следующий раз?',
    'ADVANCED GRAMMAR': 'ПРОДВИНУТАЯ ГРАММАТИКА', 'The central idea': 'Центральная идея', 'Model': 'Модель',
    'This complete guide combines explanation, visual reasoning, practice and feedback. Separate exercise and answer-key editions are also available from the lesson page.': 'Полный учебник объединяет объяснение, визуальную логику, практику и обратную связь. На странице урока также доступны отдельная тетрадь и ответы с объяснениями.',
    'LEARNING OUTCOMES': 'РЕЗУЛЬТАТЫ ОБУЧЕНИЯ', 'Understand': 'Понять', 'Build meaning before form': 'Сначала построить смысл, затем форму',
    'Visual map': 'Визуальная карта', 'Reason through the pattern': 'Разобрать модель по шагам',
    'DECIDE IN THIS ORDER': 'ПРИНИМАЙТЕ РЕШЕНИЯ В ЭТОМ ПОРЯДКЕ', 'Reference': 'Справочник',
    'Compare forms and meanings': 'Сопоставить формы и значения', 'Use the table to justify each structural choice.': 'Используйте таблицу, чтобы обосновать каждый структурный выбор.',
    'EXAMPLES AT A GLANCE': 'ПРИМЕРЫ ОДНИМ ВЗГЛЯДОМ', 'COMMON ERRORS': 'ТИПИЧНЫЕ ОШИБКИ',
    'Edit this': 'Отредактируйте', 'Avoid this pattern': 'Избегайте этой модели ошибки',
    'exercises': 'uprazhneniya', 'answer-key': 'otvety',
}


def russianize(value):
    if isinstance(value, list):
        if value == ['complete guide', 'exercise workbook', 'answer key', 'retrieval review']:
            return ['полный учебник', 'тетрадь упражнений', 'ответы и объяснения', 'активное повторение']
        if value == ['Trigger or context', 'Auxiliary or structural choice', 'Main verb or clause form', 'Meaning and register']:
            return ['Опорный элемент или контекст', 'Структурный выбор', 'Главный глагол или форма части', 'Смысл и регистр']
        return value
    if value in RUSSIAN_TEXT:
        return RUSSIAN_TEXT[value]
    match = re.fullmatch(r'(\d+) learning decisions arranged in (?:six )?progressive stages\. Write directly on the page and consult the separate answer key only after completing a stage\.', value)
    if match:
        return f"{match.group(1)} учебных решений в шести последовательных этапах. Пишите прямо на странице и открывайте отдельные ответы только после завершения этапа."
    match = re.fullmatch(r'Printable practice for (.+)\. No explanations or solutions interrupt the work pages\.', value)
    if match:
        return f"Печатная практика по теме «{match.group(1)}». На рабочих страницах нет объяснений и готовых ответов."
    match = re.fullmatch(r'Explain and exemplify: (.+)\.', value)
    if match:
        return f"Объясните и приведите пример: {match.group(1)}."
    match = re.fullmatch(r'Solutions and feedback for the (.+) exercise workbook\.', value)
    if match:
        return f"Ответы и обратная связь к тетради упражнений по теме «{match.group(1)}»."
    match = re.fullmatch(r'(\d+) GUIDED STAGES · (\d+) LEARNING DECISIONS', value)
    if match:
        return f"{match.group(1)} ЭТАПОВ ПРАКТИКИ · {match.group(2)} УЧЕБНЫХ РЕШЕНИЙ"
    match = re.fullmatch(r'Outcome (\d+)', value)
    if match:
        return f"Результат {match.group(1)}"
    match = re.fullmatch(r'Step (\d+)', value)
    if match:
        return f"Шаг {match.group(1)}"
    match = re.fullmatch(r'Decision (\d+)', value)
    if match:
        return f"Решение {match.group(1)}"
    return value


def l(english, french):
    if IS_FRENCH:
        return french
    if IS_GERMAN:
        return germanize(english)
    if IS_ITALIAN:
        return italianize(english)
    if IS_PORTUGUESE:
        return portugueseize(english)
    if IS_KOREAN:
        return koreanize(english)
    if IS_JAPANESE:
        return japaneseize(english)
    if IS_RUSSIAN:
        return russianize(english)
    return english


def lower_language_es():
    if IS_FRENCH:
        return 'Francés'
    if IS_GERMAN:
        return 'Alemán'
    if IS_ITALIAN:
        return 'Italiano'
    if IS_PORTUGUESE:
        return 'Portugués'
    if IS_KOREAN:
        return 'Coreano'
    if IS_JAPANESE:
        return 'Japonés'
    if IS_RUSSIAN:
        return 'Ruso'
    return 'Inglés'


def lower_subject_es():
    return f'Cuaderno de gramática {lower_language_es().lower()}'


def p(text, style):
    printable = str(text).replace('→', '->')
    return Paragraph(escape(printable).replace('\n', '<br/>'), style)


STYLES = {
    'eyebrow': ParagraphStyle('eyebrow', fontName='WeLearnEN-Bold', fontSize=8.2, leading=11, textColor=RED, spaceAfter=5),
    'title': ParagraphStyle('title', fontName='WeLearnEN-Bold', fontSize=23, leading=28, textColor=NAVY, spaceAfter=7),
    'lead': ParagraphStyle('lead', fontName='WeLearnEN', fontSize=9.7, leading=14.5, textColor=INK, spaceAfter=8),
    'h1': ParagraphStyle('h1', fontName='WeLearnEN-Bold', fontSize=15.5, leading=20, textColor=NAVY, spaceBefore=7, spaceAfter=7),
    'h2': ParagraphStyle('h2', fontName='WeLearnEN-Bold', fontSize=10.4, leading=14, textColor=BLUE, spaceBefore=5, spaceAfter=3),
    'body': ParagraphStyle('body', fontName='WeLearnEN', fontSize=8.2, leading=11.8, textColor=INK, spaceAfter=4),
    'small': ParagraphStyle('small', fontName='WeLearnEN', fontSize=7.2, leading=9.7, textColor=MUTED),
    'table': ParagraphStyle('table', fontName='WeLearnEN', fontSize=7.4, leading=10, textColor=INK),
    'table_head': ParagraphStyle('table_head', fontName='WeLearnEN-Bold', fontSize=7.3, leading=9.8, textColor=WHITE, alignment=TA_CENTER),
    'formula': ParagraphStyle('formula', fontName='WeLearnEN-Bold', fontSize=13.2, leading=19, textColor=NAVY, alignment=TA_CENTER),
    'model': ParagraphStyle('model', fontName='WeLearnEN-Bold', fontSize=11.1, leading=16.5, textColor=WHITE, alignment=TA_CENTER),
    'exercise': ParagraphStyle('exercise', fontName='WeLearnEN', fontSize=8.1, leading=11.6, textColor=INK, leftIndent=15, firstLineIndent=-15, spaceAfter=5),
    'answer': ParagraphStyle('answer', fontName='WeLearnEN', fontSize=7.2, leading=9.7, textColor=INK, leftIndent=15, firstLineIndent=-15, spaceAfter=3),
    'example': ParagraphStyle('example', fontName='WeLearnEN-Bold', fontSize=9.6, leading=13.2, textColor=NAVY),
    'cover_title': ParagraphStyle('cover_title', fontName='WeLearnEN-Bold', fontSize=29, leading=34, textColor=NAVY, spaceAfter=10),
    'cover_lead': ParagraphStyle('cover_lead', fontName='WeLearnEN', fontSize=11.2, leading=17.5, textColor=INK, spaceAfter=10),
    'section_title': ParagraphStyle('section_title', fontName='WeLearnEN-Bold', fontSize=21, leading=26, textColor=NAVY, spaceAfter=8),
    'section_lead': ParagraphStyle('section_lead', fontName='WeLearnEN', fontSize=10, leading=15.5, textColor=INK, spaceAfter=9),
    'card_title': ParagraphStyle('card_title', fontName='WeLearnEN-Bold', fontSize=9.2, leading=12.5, textColor=BLUE, spaceAfter=4),
    'card_body': ParagraphStyle('card_body', fontName='WeLearnEN', fontSize=8.6, leading=12.8, textColor=INK, spaceAfter=2),
    'exercise_large': ParagraphStyle('exercise_large', fontName='WeLearnEN', fontSize=8.8, leading=13.3, textColor=INK, spaceAfter=3),
    'answer_large': ParagraphStyle('answer_large', fontName='WeLearnEN', fontSize=8.1, leading=12, textColor=INK, spaceAfter=3),
}


class Workbook(BaseDocTemplate):
    def __init__(self, filename, topic, edition='complete'):
        self.topic = topic
        self.edition = edition
        advanced = topic['level'].lower() in ('b2', 'c1', 'c2')
        edition_label = {'complete': l('complete guide', 'cours complet'), 'exercises': l('exercise workbook', "cahier d'exercices"), 'answer-key': l('answer key', 'corrigé')}[edition]
        subject = f"{l('English grammar', 'Grammaire française')} {edition_label} {topic['level']}" if advanced else f"{lower_subject_es()} {topic['level']}"
        super().__init__(filename, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=31 * mm, bottomMargin=20 * mm, title=f"Idiomas WeLearn - {topic['title']} - {edition_label}", author='Idiomas WeLearn', subject=subject)
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id='body')
        self.addPageTemplates([PageTemplate(id='welearn', frames=[frame], onPage=self.draw_page)])

    def draw_page(self, canvas, doc):
        canvas.saveState()
        canvas.setFillColor(WHITE)
        canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        advanced = self.topic['level'].lower() in ('b2', 'c1', 'c2')
        if advanced and doc.page == 1:
            canvas.setFillColor(SOFT_BG)
            canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
            canvas.setFillColor(RED)
            canvas.circle(PAGE_W + 13 * mm, PAGE_H - 8 * mm, 48 * mm, fill=1, stroke=0)
            canvas.setFillColor(colors.HexColor('#E9EDF8'))
            canvas.circle(-10 * mm, 47 * mm, 33 * mm, fill=1, stroke=0)
        elif advanced:
            canvas.setFillColor(SOFT_BG)
            canvas.rect(0, PAGE_H - 29 * mm, PAGE_W, 29 * mm, fill=1, stroke=0)
            canvas.setFillColor(RED)
            canvas.circle(PAGE_W - 18 * mm, PAGE_H - 14 * mm, 5 * mm, fill=1, stroke=0)
        else:
            canvas.setFillColor(NAVY)
            canvas.rect(0, PAGE_H - 9 * mm, PAGE_W, 9 * mm, fill=1, stroke=0)
            canvas.setFillColor(RED)
            canvas.rect(PAGE_W - 48 * mm, PAGE_H - 9 * mm, 48 * mm, 9 * mm, fill=1, stroke=0)
        if LOGO.is_file():
            canvas.drawImage(str(LOGO), 18 * mm, PAGE_H - 23 * mm, width=38 * mm, height=10 * mm, preserveAspectRatio=True, mask='auto')
        canvas.setStrokeColor(LINE)
        canvas.line(18 * mm, PAGE_H - 28 * mm, PAGE_W - 18 * mm, PAGE_H - 28 * mm)
        canvas.setFillColor(MUTED)
        canvas.setFont('WeLearnEN', 6.7)
        edition_footer = {'complete': l('Complete guide', 'Cours complet'), 'exercises': l('Exercise workbook', "Cahier d'exercices"), 'answer-key': l('Answer key', 'Corrigé')}[self.edition]
        footer = f"{l('Original material · English', 'Ressource originale · Français')} {self.topic['level']} · {edition_footer} · idiomaswl.com" if advanced or IS_ITALIAN or IS_PORTUGUESE or IS_GERMAN or IS_KOREAN or IS_JAPANESE or IS_RUSSIAN else f"Material original · {lower_language_es()} {self.topic['level']} · idiomaswl.com"
        page_label = l('Page', 'Page') if advanced or IS_ITALIAN or IS_PORTUGUESE or IS_GERMAN or IS_KOREAN or IS_JAPANESE or IS_RUSSIAN else 'Página'
        canvas.drawString(18 * mm, 10 * mm, footer)
        canvas.drawRightString(PAGE_W - 18 * mm, 10 * mm, f'{page_label} {doc.page}')
        canvas.restoreState()


def info_box(label, text, background=PALE_BLUE, style='body'):
    table = Table([[p(label.upper(), STYLES['eyebrow'])], [p(text, STYLES[style])]], colWidths=[169 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), background), ('BOX', (0, 0), (-1, -1), .7, LINE), ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    return table


def data_table(rows):
    columns = max(len(row) for row in rows)
    width = 169 * mm / columns
    padded = [list(row) + [''] * (columns - len(row)) for row in rows]
    data = [[p(cell, STYLES['table_head'] if index == 0 else STYLES['table']) for cell in row] for index, row in enumerate(padded)]
    table = Table(data, colWidths=[width] * columns, repeatRows=1, hAlign='LEFT')
    table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NAVY), ('GRID', (0, 0), (-1, -1), .55, LINE), ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, colors.HexColor('#F8FAFC')]), ('LEFTPADDING', (0, 0), (-1, -1), 5), ('RIGHTPADDING', (0, 0), (-1, -1), 5), ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))
    return table


def examples_table(scene):
    data = [[p(english, STYLES['example']), p(spanish, STYLES['small'])] for english, spanish in scene]
    table = Table(data, colWidths=[91 * mm, 78 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([('GRID', (0, 0), (-1, -1), .45, LINE), ('ROWBACKGROUNDS', (0, 0), (-1, -1), [WHITE, colors.HexColor('#F8FAFC')]), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('LEFTPADDING', (0, 0), (-1, -1), 7), ('RIGHTPADDING', (0, 0), (-1, -1), 7), ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 6)]))
    return table


def blank_text(text):
    expanded = re.sub(r'\[\[\d+\]\]', '________________', str(text))
    return re.sub(r'_{3,}', '________________', expanded)


def exercises_for(topic):
    exercises, answers, number = [], [], 1
    advanced = topic['level'].lower() in ('b2', 'c1', 'c2')
    options_label = l('Options', 'Choix') if advanced else 'Opciones'
    for level in topic['practice']['levels']:
        kind, title = level['type'], level['title']
        if kind == 'choice':
            for item in level['items']:
                prompt = ' '.join(line[1] for line in item['lines'])
                exercises.append((number, title, blank_text(prompt)))
                answers.append((number, item['answer'], item['explain']))
                number += 1
        elif kind == 'dual':
            for item in level['items']:
                prompt = blank_text(' '.join(line[1] for line in item['lines']))
                exercises.append((number, title, prompt))
                answers.append((number, ' / '.join(blank['answer'] for blank in item['blanks']), ' '.join(blank['explain'] for blank in item['blanks'])))
                number += 1
        elif kind in ('guidedText', 'freeText'):
            exercises.append((number, title, blank_text(level['text'])))
            answers.append((number, ' / '.join(blank['answer'] for blank in level['blanks']), ' '.join(blank['explain'] for blank in level['blanks'])))
            number += 1
        elif kind == 'write':
            for item in level['items']:
                exercises.append((number, title, f"{item['prompt']}\n\n____________________________________________________________"))
                answers.append((number, item['answer'], item['explain']))
                number += 1
    return exercises, answers


def editorial_card(label, title, body, background=PALE_BLUE, accent=BLUE):
    content = [
        p(label.upper(), ParagraphStyle('card_label', parent=STYLES['eyebrow'], textColor=accent, fontSize=7.2, leading=9, spaceAfter=3)),
        p(title, STYLES['card_title']),
        p(body, STYLES['card_body']),
    ]
    table = Table([[content]], colWidths=[169 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), background),
        ('BOX', (0, 0), (-1, -1), .65, LINE),
        ('LINEBEFORE', (0, 0), (0, -1), 4, accent),
        ('LEFTPADDING', (0, 0), (-1, -1), 11), ('RIGHTPADDING', (0, 0), (-1, -1), 11),
        ('TOPPADDING', (0, 0), (-1, -1), 9), ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
    ]))
    return table


def section_heading(number, eyebrow, title, lead=None):
    block = [p(f'{number} · {eyebrow.upper()}', STYLES['eyebrow']), Spacer(1, 2.5 * mm), p(title, STYLES['section_title'])]
    if lead:
        block.append(p(lead, STYLES['section_lead']))
    return [KeepTogether(block)]


def formula_flow(parts):
    cells = []
    widths = []
    for index, part in enumerate(parts):
        cells.append([p(f'{index + 1:02d}', STYLES['eyebrow']), p(part, STYLES['card_title'])])
        widths.append(169 * mm / len(parts))
    table = Table([cells], colWidths=widths, hAlign='LEFT')
    style = [
        ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BOX', (0, 0), (-1, -1), .7, LINE),
        ('INNERGRID', (0, 0), (-1, -1), .55, LINE),
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [PALE_BLUE]),
        ('LEFTPADDING', (0, 0), (-1, -1), 8), ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 9), ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
    ]
    style.extend(('BACKGROUND', (index, 0), (index, 0), PALE_RED if index == 0 else PALE_BLUE) for index in range(len(parts)))
    table.setStyle(TableStyle(style))
    return table


def practice_box(code, scene, prompt, options=None, lines=0, background=WHITE):
    content = [p(f'{code} · {scene}'.upper(), STYLES['eyebrow']), p(blank_text(prompt), STYLES['exercise_large'])]
    if options:
        content.append(p(l('OPTIONS  ', 'CHOIX  ') + '  ·  '.join(options), STYLES['small']))
    for _ in range(lines):
        content.append(p('________________________________________________________________________________', STYLES['small']))
    table = Table([[content]], colWidths=[169 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), background), ('BOX', (0, 0), (-1, -1), .65, LINE),
        ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    return table


def worksheet_item(code, prompt, lines=0):
    """A quiet worksheet row: one task, ample writing room, no embedded hints."""
    code_style = ParagraphStyle(
        f'worksheet_code_{code}', parent=STYLES['eyebrow'], fontSize=8,
        leading=11, spaceAfter=0, textColor=RED,
    )
    prompt_style = ParagraphStyle(
        f'worksheet_prompt_{code}', parent=STYLES['exercise_large'], fontSize=10.2,
        leading=15.5, spaceAfter=0,
    )
    content = [p(blank_text(prompt), prompt_style)]
    for _ in range(lines):
        content.append(Spacer(1, 3.8 * mm))
        content.append(p('____________________________________________________________________', STYLES['small']))
    table = Table([[p(code, code_style), content]], colWidths=[15 * mm, 154 * mm], hAlign='LEFT')
    table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LINEBELOW', (0, 0), (-1, -1), .55, LINE),
        ('LEFTPADDING', (0, 0), (0, -1), 2), ('RIGHTPADDING', (0, 0), (0, -1), 5),
        ('LEFTPADDING', (1, 0), (1, -1), 2), ('RIGHTPADDING', (1, 0), (1, -1), 2),
        ('TOPPADDING', (0, 0), (-1, -1), 14), ('BOTTOMPADDING', (0, 0), (-1, -1), 15),
    ]))
    return table


def compact_exercise_cover(topic):
    decisions = practice_decision_count(topic)
    copy = {
        'english': {
            'language': 'ENGLISH', 'edition': 'EXERCISE WORKBOOK',
            'lead': 'Independent practice: complete every blank without options or solutions on the work pages.',
            'label': 'PRACTICE FORMAT', 'title': f'{decisions} decisions in progressive stages',
            'body': 'Write directly on the page. Check the separate answer key only after completing a full stage.',
            'rule': 'WORK RULE',
            'rule_body': 'One instruction per stage. No word banks, option lists, mini-explanations or answers interrupt the exercises.',
        },
        'french': {
            'language': 'FRANÇAIS', 'edition': "CAHIER D'EXERCICES",
            'lead': 'Pratique autonome : complétez chaque espace sans choix ni solutions sur les pages de travail.',
            'label': 'FORMAT DE PRATIQUE', 'title': f'{decisions} décisions en étapes progressives',
            'body': 'Écrivez directement sur la page. Consultez le corrigé séparé seulement après avoir terminé une étape complète.',
            'rule': 'RÈGLE DE TRAVAIL',
            'rule_body': "Une consigne par étape. Aucune banque de mots, liste de choix, mini-explication ou solution n'interrompt les exercices.",
        },
        'german': {
            'language': 'DEUTSCH', 'edition': 'ÜBUNGSHEFT',
            'lead': 'Selbstständige Praxis: Ergänzen Sie jede Lücke ohne Auswahlmöglichkeiten oder Lösungen auf den Arbeitsseiten.',
            'label': 'ÜBUNGSFORMAT', 'title': f'{decisions} Entscheidungen in progressiven Stufen',
            'body': 'Schreiben Sie direkt auf die Seite. Prüfen Sie den getrennten Lösungsschlüssel erst nach einer vollständigen Stufe.',
            'rule': 'ARBEITSREGEL',
            'rule_body': 'Eine Anweisung pro Stufe. Keine Formenbank, Auswahlliste, Mini-Erklärung oder Lösung unterbricht die Übungen.',
        },
        'italian': {
            'language': 'ITALIANO', 'edition': 'QUADERNO DI ESERCIZI',
            'lead': 'Pratica autonoma: completa ogni spazio senza opzioni o soluzioni nelle pagine di lavoro.',
            'label': 'FORMATO DI PRATICA', 'title': f'{decisions} decisioni in fasi progressive',
            'body': 'Scrivi direttamente sulla pagina. Controlla le soluzioni separate solo dopo aver completato una fase.',
            'rule': 'REGOLA DI LAVORO',
            'rule_body': 'Una consegna per fase. Nessuna lista di opzioni, mini-spiegazione o soluzione interrompe gli esercizi.',
        },
        'portuguese': {
            'language': 'PORTUGUÊS', 'edition': 'CADERNO DE EXERCÍCIOS',
            'lead': 'Prática autônoma: complete cada espaço sem opções ou respostas nas páginas de trabalho.',
            'label': 'FORMATO DA PRÁTICA', 'title': f'{decisions} decisões em etapas progressivas',
            'body': 'Escreva diretamente na página. Consulte o gabarito separado somente após concluir uma etapa inteira.',
            'rule': 'REGRA DE TRABALHO',
            'rule_body': 'Uma instrução por etapa. Nenhum banco de palavras, lista de opções, mini-explicação ou resposta interrompe os exercícios.',
        },
        'korean': {
            'language': '한국어', 'edition': '연습 문제집',
            'lead': '독립 연습: 작업 페이지의 선택지나 정답 없이 모든 빈칸을 완성하세요.',
            'label': '연습 형식', 'title': f'점진적 단계의 {decisions}개 판단',
            'body': '페이지에 직접 쓰고, 한 단계를 모두 끝낸 뒤 별도 정답지를 확인하세요.',
            'rule': '학습 규칙',
            'rule_body': '단계마다 지시는 하나뿐입니다. 단어 목록, 선택지, 미니 해설, 정답은 연습을 방해하지 않습니다.',
        },
        'japanese': {
            'language': '日本語', 'edition': '練習問題集',
            'lead': '自立練習：作業ページの選択肢や解答を見ずに、すべての空欄を完成させます。',
            'label': '練習形式', 'title': f'段階的な{decisions}の判断',
            'body': 'ページに直接書き、ひとつの段階を終えてから別冊の解答を確認します。',
            'rule': '作業ルール',
            'rule_body': '各段階の指示は一つです。語群、選択肢、短い解説、解答は練習ページに置きません。',
        },
        'russian': {
            'language': 'РУССКИЙ ЯЗЫК', 'edition': 'ТЕТРАДЬ УПРАЖНЕНИЙ',
            'lead': 'Самостоятельная практика: заполните все пропуски без вариантов и ответов на рабочих страницах.',
            'label': 'ФОРМАТ ПРАКТИКИ', 'title': f'{decisions} решений по нарастающей сложности',
            'body': 'Пишите прямо на странице. Сверяйтесь с отдельными ответами только после завершения всего этапа.',
            'rule': 'ПРАВИЛО РАБОТЫ',
            'rule_body': 'Одна инструкция на этап. Списки вариантов, мини-пояснения и ответы не прерывают упражнения.',
        },
    }.get(PDF_LANGUAGE, {})
    return [
        Spacer(1, 20 * mm),
        p(f"{copy['language']} {topic['level']} · {copy['edition']}", STYLES['eyebrow']),
        p(topic['shortTitle'], STYLES['cover_title']),
        p(copy['lead'], STYLES['cover_lead']),
        Spacer(1, 7 * mm),
        editorial_card(
            copy['label'], copy['title'], copy['body'],
            PALE_RED, RED,
        ),
        Spacer(1, 11 * mm),
        p(copy['rule'], STYLES['eyebrow']),
        p(copy['rule_body'], STYLES['section_lead']),
    ]


def practice_decision_count(topic):
    total = 0
    for level in topic['practice']['levels']:
        if level['type'] == 'dual':
            total += sum(len(item['blanks']) for item in level['items'])
        elif level['type'] in ('choice', 'write'):
            total += len(level['items'])
        else:
            total += len(level['blanks'])
    return total


def trim_trailing_blank_pages(path):
    """Remove branded sheets created when a flowable lands exactly on a page edge."""
    pdf_path = Path(path)
    reader = PdfReader(pdf_path)
    keep = [
        index for index, page in enumerate(reader.pages)
        if len((page.extract_text() or '').strip()) >= 80
    ]
    if len(keep) == len(reader.pages) or not keep:
        return
    writer = PdfWriter()
    for index in keep:
        writer.add_page(reader.pages[index])
    if reader.metadata:
        writer.add_metadata({key: str(value) for key, value in reader.metadata.items() if value is not None})
    temporary = pdf_path.with_suffix('.trimmed.pdf')
    with temporary.open('wb') as handle:
        writer.write(handle)
    temporary.replace(pdf_path)


def build_advanced_editorial_story(topic):
    story = []
    decisions = practice_decision_count(topic)
    levels = topic['practice']['levels']

    # Cover — mirrors the approved WeLearn editorial language: generous space,
    # a strong red/blue hierarchy and a concrete learning promise.
    story += [Spacer(1, 28 * mm), p(f"ENGLISH {topic['level']} · ADVANCED GRAMMAR", STYLES['eyebrow']), p(topic['shortTitle'], STYLES['cover_title']), p(topic['lead'], STYLES['cover_lead'])]
    story += [Spacer(1, 3 * mm), editorial_card('The central idea', 'Front the restriction; invert the auxiliary', topic['description'], PALE_BLUE, RED), Spacer(1, 6 * mm)]
    metrics = [[
        [p('6', STYLES['section_title']), p('guided stages', STYLES['small'])],
        [p(str(decisions), STYLES['section_title']), p('learning decisions', STYLES['small'])],
        [p('60', STYLES['section_title']), p('recommended minutes', STYLES['small'])],
    ]]
    metric_table = Table(metrics, colWidths=[56.3 * mm] * 3)
    metric_table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), WHITE), ('BOX', (0, 0), (-1, -1), .7, LINE), ('INNERGRID', (0, 0), (-1, -1), .55, LINE), ('ALIGN', (0, 0), (-1, -1), 'CENTER'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('TOPPADDING', (0, 0), (-1, -1), 10), ('BOTTOMPADDING', (0, 0), (-1, -1), 10)]))
    story += [metric_table, Spacer(1, 8 * mm), p('BY THE END, YOU WILL BE ABLE TO', STYLES['eyebrow'])]
    outcome_cells = []
    for index, outcome in enumerate(topic['outcomes'], 1):
        outcome_cells.append([p(f'{index:02d}', STYLES['eyebrow']), p(outcome, STYLES['card_body'])])
    story.append(Table([[outcome_cells[0], outcome_cells[1]], [outcome_cells[2], outcome_cells[3]]], colWidths=[84.5 * mm] * 2, style=TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BOX', (0, 0), (-1, -1), .6, LINE), ('INNERGRID', (0, 0), (-1, -1), .5, LINE), ('ROWBACKGROUNDS', (0, 0), (-1, -1), [WHITE, PALE_RED]), ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9), ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)])))

    # Meaning and register.
    story += [PageBreak(), *section_heading('01', 'Understand', 'Why inversion changes the focus', 'Before changing the word order, understand what the writer wants the reader to notice.')]
    section = topic['seo'][0]
    for paragraph in section['paragraphs']:
        story.append(p(paragraph, STYLES['section_lead']))
    story += [Spacer(1, 3 * mm), data_table(section['examples']), Spacer(1, 5 * mm), editorial_card('Register check', 'Use inversion because the emphasis matters', 'It is natural in formal speeches, analytical writing, literary narration and carefully edited journalism. In casual conversation, an inverted sentence may sound deliberately dramatic.', PALE_GOLD, RED), Spacer(1, 6 * mm), p('A QUICK CONTRAST', STYLES['eyebrow'])]
    story += [examples_table([['We had never experienced such pressure.', 'neutral · information first'], ['Never had we experienced such pressure.', 'emphatic · exception first'], ['Only the director knew the code.', 'only modifies the subject · no inversion'], ['Only later did the director reveal the code.', 'only restricts time · inversion']])]

    # Visual map and guided reading.
    story += [PageBreak(), *section_heading('02', 'Visual map', 'Read the structure from left to right', topic['visual']['teacherLens']), formula_flow(['negative / restrictive opener', 'auxiliary', 'subject', 'main verb', 'emphatic effect']), Spacer(1, 5 * mm), p('THE FIVE DECISIONS', STYLES['eyebrow'])]
    for index, decision in enumerate(topic['guide']['decisions'], 1):
        story += [editorial_card(f'Step {index}', f'Decision {index}', decision, WHITE if index % 2 else SOFT_BG, RED if index == 1 else BLUE), Spacer(1, 2.5 * mm)]

    story += [PageBreak(), *section_heading('03', 'Worked example', 'From a neutral sentence to controlled emphasis', 'Follow the reasoning. The tense is preserved even though the word order changes.')]
    worked = [
        ['1 · Neutral', 'We understood the risk only after the audit.'],
        ['2 · Front the restriction', 'Only after the audit...'],
        ['3 · Recover the tense', 'past simple; no visible auxiliary'],
        ['4 · Supply and invert', 'did + we + understand'],
        ['5 · Final sentence', 'Only after the audit did we understand the risk.'],
        ['Rhetorical effect', 'The delayed moment of understanding becomes the focus.'],
    ]
    worked_rows = [[p(label, STYLES['card_title']), p(value, STYLES['card_body'])] for label, value in worked]
    worked_table = Table(worked_rows, colWidths=[49 * mm, 120 * mm], hAlign='LEFT')
    worked_table.setStyle(TableStyle([('ROWBACKGROUNDS', (0, 0), (-1, -1), [WHITE, SOFT_BG]), ('BOX', (0, 0), (-1, -1), .7, LINE), ('INNERGRID', (0, 0), (-1, -1), .5, LINE), ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9), ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8), ('BACKGROUND', (0, 4), (-1, 4), PALE_BLUE), ('BACKGROUND', (0, 5), (-1, 5), PALE_GOLD)]))
    story += [worked_table, Spacer(1, 6 * mm), p('REFERENCE PATTERNS', STYLES['eyebrow']), data_table(topic['guide']['table'])]

    # Auxiliary toolkit.
    story += [PageBreak(), *section_heading('04', 'Build accurately', topic['seo'][2]['heading'], topic['seo'][2]['paragraphs'][0]), p(topic['seo'][2]['paragraphs'][1], STYLES['section_lead']), data_table(topic['seo'][2]['table']), Spacer(1, 6 * mm), editorial_card('Memory rule', 'The auxiliary carries the tense', 'After do, does or did, use the base form. After have, has or had, use the past participle. A modal moves directly before the subject.', PALE_GREEN, BLUE), Spacer(1, 6 * mm), p('COMMON ERRORS TO EDIT OUT', STYLES['eyebrow'])]
    for mistake in topic['guide']['mistakes']:
        story += [p('×  ' + mistake, STYLES['card_body']), Spacer(1, 1.5 * mm)]

    # Complex patterns.
    story += [PageBreak(), *section_heading('05', 'Scope', topic['seo'][3]['heading'], topic['seo'][3]['paragraphs'][0]), p(topic['seo'][3]['paragraphs'][1], STYLES['section_lead']), data_table(topic['seo'][3]['table']), Spacer(1, 6 * mm), editorial_card('Scope test', 'Ask what only modifies', 'If only identifies the subject, keep normal word order. If it fronts a time, condition, method or other adverbial restriction, invert the following main clause.', PALE_RED, RED)]
    story += [PageBreak(), *section_heading('06', 'Sequence and limits', topic['seo'][4]['heading'], topic['seo'][4]['paragraphs'][0]), p(topic['seo'][4]['paragraphs'][1], STYLES['section_lead']), data_table(topic['seo'][4]['table']), Spacer(1, 7 * mm), p(topic['seo'][5]['heading'], STYLES['section_title'])]
    for paragraph in topic['seo'][5]['paragraphs']:
        story.append(p(paragraph, STYLES['section_lead']))
    story += [editorial_card('Pair check', 'No sooner...than · Hardly/Scarcely...when', 'Keep the first event in the inverted past perfect and the second event in the past simple.', PALE_GOLD, RED)]

    # Practice stage 1.
    choice = levels[0]
    story += [PageBreak(), *section_heading('07', 'Practice · Stage 1', choice['title'], choice['intro'])]
    for index, item in enumerate(choice['items'], 1):
        options = item['options']
        story += [practice_box(f'A{index}', item['scene'], ' '.join(line[1] for line in item['lines']), options, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 2.3 * mm)]

    # Connected choices and guided text.
    dual = levels[1]
    guided = levels[2]
    story += [PageBreak(), *section_heading('08', 'Practice · Stages 2–3', 'Connect the decisions inside a complete context', 'Choose the auxiliary and verb form together; then maintain the pattern through the negotiation text.')]
    for index, item in enumerate(dual['items'], 1):
        options = [f"Gap {blank_index + 1}: {' / '.join(blank.get('options', []))}" for blank_index, blank in enumerate(item['blanks'])]
        story += [practice_box(f'B{index}', item['scene'], ' '.join(line[1] for line in item['lines']), options, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 2.5 * mm)]
    story += [Spacer(1, 3 * mm), p('C1 · GUIDED TEXT', STYLES['eyebrow']), p(guided['scene'], STYLES['card_title']), p(blank_text(guided['text']), STYLES['exercise_large']), p('WORD BANK  ' + '  ·  '.join(sorted(set(option for blank in guided['blanks'] for option in blank.get('options', [])))), STYLES['small'])]

    # Open transformation.
    free = levels[3]
    story += [PageBreak(), *section_heading('09', 'Practice · Stage 4', free['title'], free['intro']), editorial_card('Method', 'Protect the meaning before you change the order', 'Underline the trigger, identify the original tense, write the auxiliary, and only then rebuild the clause.', PALE_BLUE, BLUE), Spacer(1, 5 * mm)]
    transformation_parts = [part.strip() for part in free['text'].split('. ') if part.strip()]
    transformations = ['. '.join(transformation_parts[index:index + 2]) for index in range(0, len(transformation_parts), 2)]
    for index, prompt in enumerate(transformations, 1):
        story += [practice_box(f'D{index}', free['scene'], prompt if prompt.endswith('.') else prompt + '.', lines=1, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 2.5 * mm)]

    # Controlled and communicative production.
    controlled = levels[4]
    mission = levels[5]
    story += [PageBreak(), *section_heading('10', 'Practice · Stage 5', controlled['title'], controlled['intro'])]
    for index, item in enumerate(controlled['items'], 1):
        story += [practice_box(f'E{index}', item['scene'], item['prompt'], lines=1, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 2.5 * mm)]
    story += [PageBreak(), *section_heading('11', 'Practice · Final mission', mission['title'], mission['intro'])]
    for index, item in enumerate(mission['items'], 1):
        story += [practice_box(f'F{index}', item['scene'], item['prompt'], lines=3, background=PALE_GOLD if index % 2 else WHITE), Spacer(1, 3 * mm)]
    story += [editorial_card('Self-check', 'Before you consult the key', 'Can you identify the trigger, name the tense, justify the auxiliary, check the main verb and explain the rhetorical effect?', PALE_GREEN, BLUE)]

    # Answer key.
    story += [PageBreak(), *section_heading('12', 'Answer key', 'Check the form and explain the choice', 'Do not stop at right or wrong. Use each explanation to name the rule that controlled the answer.')]
    key_blocks = []
    for prefix, level in [('A', choice), ('B', dual)]:
        for index, item in enumerate(level['items'], 1):
            if level['type'] == 'choice':
                key_blocks.append((f'{prefix}{index}', item['answer'], item['explain']))
            else:
                key_blocks.append((f'{prefix}{index}', ' / '.join(blank['answer'] for blank in item['blanks']), ' '.join(blank['explain'] for blank in item['blanks'])))
    key_blocks.append(('C1', ' / '.join(blank['answer'] for blank in guided['blanks']), ' '.join(blank['explain'] for blank in guided['blanks'])))
    for code, answer, explanation in key_blocks:
        story += [editorial_card(code, answer, explanation, WHITE if len(story) % 2 else SOFT_BG, BLUE), Spacer(1, 2.3 * mm)]

    story += [PageBreak(), *section_heading('12', 'Answer key · continued', 'Open transformations and production models', 'Alternative answers are possible when they preserve the target pattern and the original meaning.')]
    open_levels = [('D', free), ('E', controlled), ('F', mission)]
    for prefix, level in open_levels:
        if level['type'] in ('guidedText', 'freeText'):
            for index, blank in enumerate(level['blanks'], 1):
                story += [editorial_card(f'{prefix}{index}', blank['answer'], blank['explain'], WHITE if index % 2 else SOFT_BG, BLUE), Spacer(1, 2.3 * mm)]
        else:
            for index, item in enumerate(level['items'], 1):
                story += [editorial_card(f'{prefix}{index}', item['answer'], item['explain'], WHITE if index % 2 else SOFT_BG, BLUE), Spacer(1, 2.3 * mm)]

    story += [PageBreak(), *section_heading('13', 'Review', 'One-minute retrieval sheet', 'Close the workbook and complete this page from memory.')]
    prompts = ['Write five inversion triggers.', 'State the rule for do/does/did.', 'Complete: No sooner ___ than ___.', 'Complete: Hardly ___ when ___.', 'Give one case where only does not trigger inversion.', 'Transform one neutral sentence and explain the rhetorical effect.']
    for index, prompt in enumerate(prompts, 1):
        story += [practice_box(f'R{index}', 'Retrieval', prompt, lines=2, background=WHITE if index % 2 else SOFT_BG), Spacer(1, 2.5 * mm)]
    story += [editorial_card('Next review', 'Return in 24 hours', 'Rebuild the visual map without looking, then complete the final mission again with new content.', PALE_RED, RED)]
    return story


def split_pdf_cover(topic, edition, description, decisions):
    edition_title = l('Exercise workbook', "Cahier d'exercices") if edition == 'exercises' else l('Answer key', 'Corrigé raisonné')
    accent = RED if edition == 'exercises' else BLUE
    return [
        Spacer(1, 16 * mm),
        p(f"{l('ENGLISH', 'FRANÇAIS')} {topic['level']} · {edition_title.upper()}", STYLES['eyebrow']),
        p(topic['shortTitle'], STYLES['cover_title']),
        p(description, STYLES['cover_lead']),
        Spacer(1, 4 * mm),
        editorial_card(l('This document', 'Ce document'), edition_title, (
            l(f'{decisions} learning decisions arranged in progressive stages. Write directly on the page and consult the separate answer key only after completing a stage.', f'{decisions} décisions d’apprentissage organisées en étapes progressives. Écrivez directement sur la page et consultez le corrigé séparé seulement après avoir terminé une étape.')
            if edition == 'exercises'
            else l('Model answers and concise grammar explanations for every stage in the separate exercise workbook.', "Réponses modèles et explications grammaticales concises pour chaque étape du cahier d'exercices séparé.")
        ), PALE_RED if edition == 'exercises' else PALE_BLUE, accent),
        Spacer(1, 8 * mm),
        editorial_card(l('Recommended use', 'Utilisation conseillée'), l('Keep the three-document system together', 'Conservez le système de trois documents'), (
            l('Use the complete guide to understand the concept, this workbook to practise, and the answer key to diagnose each decision.', "Utilisez le cours complet pour comprendre, ce cahier pour pratiquer et le corrigé pour analyser chaque décision.")
            if edition == 'exercises'
            else l('Correct one stage at a time. Explain the rule aloud before marking an answer as secure.', "Corrigez une étape à la fois. Expliquez la règle à voix haute avant de considérer une réponse comme acquise.")
        ), PALE_GOLD, accent),
        Spacer(1, 8 * mm),
        p(l('WELEARN STUDY SEQUENCE', 'PARCOURS D’ÉTUDE WELEARN'), STYLES['eyebrow']),
        formula_flow(l(['complete guide', 'exercise workbook', 'answer key', 'retrieval review'], ['cours complet', "cahier d'exercices", 'corrigé', 'rappel actif'])),
        Spacer(1, 7 * mm),
        editorial_card(
            l('Stage check', 'Bilan de l’étape'),
            l('Pause before continuing', 'Faites une pause avant de continuer'),
            l(
                'Underline the trigger or decision point, name the rule, and check that the meaning has not changed.',
                "Soulignez le déclencheur ou le point de décision, nommez la règle et vérifiez que le sens n’a pas changé.",
            ),
            PALE_GREEN,
            accent,
        ),
    ]


def build_exercises_only_story(topic):
    story = compact_exercise_cover(topic)
    levels = topic['practice']['levels']
    for level_index, level in enumerate(levels):
        story += [PageBreak(), *section_heading(f'{level_index + 1:02d}', l('Practice stage', 'Étape de pratique'), level['title'], level['intro'])]
        prefix = chr(ord('A') + level_index) if level_index < 26 else f'S{level_index + 1}'
        if level['type'] == 'choice':
            for index, item in enumerate(level['items'], 1):
                if index > 1 and (index - 1) % 6 == 0:
                    story += [PageBreak(), *section_heading(
                        f'{level_index + 1:02d}', l('Practice stage', 'Étape de pratique'),
                        level['title'], level['intro'],
                    )]
                story += [worksheet_item(f'{prefix}{index}', ' '.join(line[1] for line in item['lines']))]
        elif level['type'] == 'dual':
            for index, item in enumerate(level['items'], 1):
                if index > 1 and (index - 1) % 6 == 0:
                    story += [PageBreak(), *section_heading(
                        f'{level_index + 1:02d}', l('Practice stage', 'Étape de pratique'),
                        level['title'], level['intro'],
                    )]
                story += [worksheet_item(f'{prefix}{index}', ' '.join(line[1] for line in item['lines']))]
        elif level['type'] in ('guidedText', 'freeText'):
            story += [worksheet_item(f'{prefix}1', level['text'], lines=3 if level['type'] == 'freeText' else 1)]
        else:
            for index, item in enumerate(level['items'], 1):
                story += [worksheet_item(f'{prefix}{index}', item['prompt'], lines=3 if level_index == 5 else 2)]
    story += [PageBreak(), *section_heading('07', l('Retrieval', 'Rappel actif'), l('Final self-check', 'Autoévaluation finale'), l('Complete these prompts without reopening the guide.', 'Répondez sans rouvrir le cours.'))]
    focus_prompts = [
        l(f'Explain and exemplify: {focus}.', f'Expliquez et illustrez : {focus}.')
        for focus in topic.get('visual', {}).get('reviewFocus', [])
    ]
    decision_prompts = [
        l(
            f'Apply this decision to a new example, then justify it: {decision}.',
            f'Appliquez cette décision à un nouvel exemple, puis justifiez-la : {decision}.',
        )
        for decision in topic.get('guide', {}).get('decisions', [])
    ]
    fixed_prompts = l([
        'Write one correct example and one plausible error; annotate the difference.',
        'Create a two-line dialogue that makes the target structure necessary.',
        'State the rule from memory in one sentence, without copying the model.',
        'Rewrite one example for a different subject, time or register.',
        'Name the cue that tells the reader which form or structure to choose.',
        'Correct a likely mistake and explain why the correction preserves meaning.',
    ], [
        'Écrivez un exemple correct et une erreur plausible ; annotez la différence.',
        'Créez un dialogue de deux répliques qui rende la structure cible nécessaire.',
        'Formulez la règle de mémoire en une phrase, sans recopier le modèle.',
        'Réécrivez un exemple avec un autre sujet, un autre temps ou un autre registre.',
        'Nommez l’indice qui permet de choisir la forme ou la structure correcte.',
        'Corrigez une erreur probable et expliquez pourquoi la correction préserve le sens.',
    ])
    prompts = []
    for prompt in [*focus_prompts, *decision_prompts, *fixed_prompts]:
        if prompt and prompt not in prompts:
            prompts.append(prompt)
        if len(prompts) == 6:
            break
    for index, prompt in enumerate(prompts[:4], 1):
        story += [worksheet_item(f'R{index}', prompt, lines=2)]
    return story


def build_answer_key_only_story(topic):
    story = split_pdf_cover(topic, 'answer-key', l(f"Solutions and feedback for the {topic['title']} exercise workbook.", f"Solutions et rétroaction pour le cahier d’exercices {topic['title']}."), practice_decision_count(topic))
    for level_index, level in enumerate(topic['practice']['levels']):
        story += [PageBreak(), *section_heading(f'{level_index + 1:02d}', l('Answer key', 'Corrigé'), level['title'], l('Compare the form first, then read the explanation and name the rule in your own words.', "Comparez d’abord la forme, puis lisez l’explication et reformulez la règle avec vos propres mots."))]
        prefix = chr(ord('A') + level_index) if level_index < 26 else f'S{level_index + 1}'
        if level['type'] == 'choice':
            entries = [(f'{prefix}{index}', item['answer'], item['explain']) for index, item in enumerate(level['items'], 1)]
        elif level['type'] == 'dual':
            entries = [(f'{prefix}{index}', ' / '.join(blank['answer'] for blank in item['blanks']), ' '.join(blank['explain'] for blank in item['blanks'])) for index, item in enumerate(level['items'], 1)]
        elif level['type'] in ('guidedText', 'freeText'):
            entries = [(f'{prefix}{index}', blank['answer'], blank['explain']) for index, blank in enumerate(level['blanks'], 1)]
        else:
            entries = [(f'{prefix}{index}', item['answer'], item['explain']) for index, item in enumerate(level['items'], 1)]
        for index, (code, answer, explanation) in enumerate(entries, 1):
            story += [editorial_card(code, answer, explanation, WHITE if index % 2 else SOFT_BG, BLUE), Spacer(1, 2.5 * mm)]
    story += [PageBreak(), *section_heading('07', l('Feedback', 'Rétroaction'), l('Diagnose the pattern, not only the score', 'Analysez la structure, pas seulement le score'), l('Use this page to decide what to revisit in the complete guide.', 'Utilisez cette page pour décider ce qu’il faut revoir dans le cours complet.'))]
    labels = l(['Trigger or context', 'Auxiliary or structural choice', 'Main verb or clause form', 'Meaning and register'], ['Déclencheur ou contexte', 'Choix structurel', 'Forme verbale ou propositionnelle', 'Sens et registre'])
    for label in labels:
        story += [practice_box('CHECK', label, l('What went wrong? What rule will prevent the same error next time?', 'Quelle erreur avez-vous commise ? Quelle règle permettra de l’éviter ?'), lines=3, background=WHITE), Spacer(1, 3 * mm)]
    story += [p(l('WELEARN STUDY SEQUENCE', 'PARCOURS D’ÉTUDE WELEARN'), STYLES['eyebrow']), formula_flow(l(['complete guide', 'exercise workbook', 'answer key', 'retrieval review'], ['cours complet', "cahier d'exercices", 'corrigé', 'rappel actif'])), Spacer(1, 5 * mm), editorial_card(
        l('Retrieval', 'Rappel actif'),
        l('Final self-check', 'Autoévaluation finale'),
        l('Complete these prompts without reopening the guide.', 'Répondez sans rouvrir le cours.'),
        PALE_RED,
        RED,
    )]
    return story


def without_cover(story):
    for index, flowable in enumerate(story):
        if isinstance(flowable, PageBreak):
            return story[index:]
    return story


def build_advanced_standard_story(topic):
    decisions = practice_decision_count(topic)
    story = [
        Spacer(1, 28 * mm),
        p(f"{l('ENGLISH', 'FRANÇAIS')} {topic['level']} · {l('ADVANCED GRAMMAR', 'GRAMMAIRE AVANCÉE')}", STYLES['eyebrow']),
        p(topic['shortTitle'], STYLES['cover_title']),
        p(topic['lead'], STYLES['cover_lead']),
        Spacer(1, 3 * mm),
        editorial_card(l('The central idea', 'L’idée centrale'), topic['guide']['goal'], topic['description'], PALE_BLUE, RED),
        Spacer(1, 6 * mm),
        editorial_card(l('Model', 'Modèle'), topic['guide']['model'], topic['guide']['formula'], PALE_GOLD, BLUE),
        Spacer(1, 7 * mm),
        p(l(f"{len(topic['practice']['levels'])} GUIDED STAGES · {decisions} LEARNING DECISIONS", f"{len(topic['practice']['levels'])} ÉTAPES GUIDÉES · {decisions} DÉCISIONS D’APPRENTISSAGE"), STYLES['eyebrow']),
        p(l('This complete guide combines explanation, visual reasoning, practice and feedback. Separate exercise and answer-key editions are also available from the lesson page.', "Ce cours complet réunit explication, raisonnement visuel, pratique et rétroaction. Un cahier d’exercices et un corrigé séparés sont également disponibles sur la page de la leçon."), STYLES['section_lead']),
        Spacer(1, 4 * mm),
        p(l('LEARNING OUTCOMES', 'OBJECTIFS D’APPRENTISSAGE'), STYLES['eyebrow']),
    ]
    outcome_cells = []
    for index, outcome in enumerate(topic['outcomes'], 1):
        outcome_cells.append([p(l(f'Outcome {index}', f'Objectif {index}'), STYLES['eyebrow']), p(outcome, STYLES['card_body'])])
    outcome_columns = 3 if len(outcome_cells) == 3 else 2
    outcome_rows = [outcome_cells[index:index + outcome_columns] for index in range(0, len(outcome_cells), outcome_columns)]
    if outcome_rows and len(outcome_rows[-1]) < outcome_columns:
        outcome_rows[-1].extend([''] * (outcome_columns - len(outcome_rows[-1])))
    story.append(Table(outcome_rows, colWidths=[169 * mm / outcome_columns] * outcome_columns, style=TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BOX', (0, 0), (-1, -1), .6, LINE),
        ('INNERGRID', (0, 0), (-1, -1), .5, LINE), ('ROWBACKGROUNDS', (0, 0), (-1, -1), [WHITE, PALE_RED]),
        ('LEFTPADDING', (0, 0), (-1, -1), 8), ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ])))

    story += [PageBreak(), *section_heading('01', l('Understand', 'Comprendre'), l('Build meaning before form', 'Construire le sens avant la forme'), topic['description'])]
    for section_index, section in enumerate(topic['seo'], 1):
        story += [p(section['heading'], STYLES['section_title'])]
        for paragraph in section.get('paragraphs', []):
            story.append(p(paragraph, STYLES['section_lead']))
        if section.get('table'):
            story += [Spacer(1, 2 * mm), data_table(section['table']), Spacer(1, 5 * mm)]
        if section.get('examples'):
            story += [Spacer(1, 2 * mm), data_table(section['examples']), Spacer(1, 5 * mm)]
        if section_index < len(topic['seo']):
            story += [Spacer(1, 4 * mm)]

    formula_parts = [part.strip() for part in re.split(r'\s*(?:\||→|\+)\s*', topic['guide']['formula']) if part.strip()]
    story += [PageBreak(), *section_heading('02', l('Visual map', 'Carte visuelle'), l('Reason through the pattern', 'Raisonner à partir de la structure'), topic['visual']['teacherLens']), formula_flow(formula_parts), Spacer(1, 6 * mm), p(l('DECIDE IN THIS ORDER', 'DÉCIDEZ DANS CET ORDRE'), STYLES['eyebrow'])]
    for index, decision in enumerate(topic['guide']['decisions'], 1):
        story += [editorial_card(l(f'Step {index}', f'Étape {index}'), l(f'Decision {index}', f'Décision {index}'), decision, WHITE if index % 2 else SOFT_BG, RED if index == 1 else BLUE), Spacer(1, 2.5 * mm)]
    story += [PageBreak(), *section_heading('03', l('Reference', 'Référence'), l('Compare forms and meanings', 'Comparer les formes et les sens'), l('Use the table to justify each structural choice.', 'Utilisez le tableau pour justifier chaque choix structurel.')), data_table(topic['guide']['table']), Spacer(1, 6 * mm), p(l('EXAMPLES AT A GLANCE', 'EXEMPLES EN UN COUP D’ŒIL'), STYLES['eyebrow']), examples_table(topic['visual']['scene']), Spacer(1, 7 * mm), p(l('COMMON ERRORS', 'ERREURS FRÉQUENTES'), STYLES['eyebrow'])]
    for mistake in topic['guide']['mistakes']:
        story += [editorial_card(l('Edit this', 'À corriger'), l('Avoid this pattern', 'Évitez cette erreur'), mistake, PALE_RED, RED), Spacer(1, 2.5 * mm)]

    story += without_cover(build_exercises_only_story(topic))
    story += without_cover(build_answer_key_only_story(topic))
    return story


def build_story(topic):
    advanced = topic['level'].lower() in ('b2', 'c1', 'c2')
    if topic['slug'] == 'inversion-emphasis-c1':
        return build_advanced_editorial_story(topic)
    if advanced:
        return build_advanced_standard_story(topic)
    labels = {
        'cover': f"ENGLISH · LEVEL {topic['level']} · PRINTABLE WORKBOOK" if advanced else f"{lower_language_es().upper()} · NIVEL {topic['level']} · CUADERNO IMPRIMIBLE",
        'goal': 'Lesson goal' if advanced else 'Meta de la lección',
        'model': 'Model' if advanced else 'Modelo',
        'outcomes': 'By the end, you will be able to' if advanced else 'Al terminar podrás',
        'study': 'How to study' if advanced else 'Cómo estudiar',
        'understand': '01 · UNDERSTAND' if advanced else '01 · COMPRENDER',
        'essential': 'The essential idea' if advanced else 'La idea esencial',
        'map': '02 · VISUAL MAP' if advanced else '02 · MAPA VISUAL',
        'glance': 'The rule at a glance' if advanced else 'La regla de una sola mirada',
        'formula': 'Formula' if advanced else 'Fórmula',
        'order': 'Decide in this order' if advanced else 'Decide en este orden',
        'errors': 'Common errors' if advanced else 'Errores frecuentes',
        'examples': 'Reference examples' if advanced else 'Ejemplos de referencia',
        'practice': '03 · PRACTICE' if advanced else '03 · PRÁCTICA',
        'production': 'From recognition to production' if advanced else 'De reconocer a producir',
        'answers': '04 · ANSWER KEY' if advanced else '04 · SOLUCIONES',
        'correct': 'Correct and explain the rule' if advanced else 'Corrige y explica la regla',
        'close': 'Final task' if advanced else 'Cierre',
    }
    if IS_ITALIAN and not advanced:
        labels.update({
            'cover': f"ITALIANO · LIVELLO {topic['level']} · QUADERNO STAMPABILE",
            'goal': 'Obiettivo della lezione', 'model': 'Modello', 'outcomes': 'Al termine saprai',
            'study': 'Come studiare', 'understand': '01 · CAPIRE', 'essential': 'L’idea essenziale',
            'map': '02 · MAPPA VISIVA', 'glance': 'La regola in un colpo d’occhio', 'formula': 'Formula',
            'order': 'Decidi in questo ordine', 'errors': 'Errori frequenti', 'examples': 'Esempi di riferimento',
            'practice': '03 · PRATICA', 'production': 'Dal riconoscimento alla produzione',
            'answers': '04 · SOLUZIONI', 'correct': 'Correggi e spiega la regola', 'close': 'Compito finale',
        })
    if IS_PORTUGUESE and not advanced:
        labels.update({
            'cover': f"PORTUGUÊS · NÍVEL {topic['level']} · CADERNO PARA IMPRESSÃO",
            'goal': 'Objetivo da aula', 'model': 'Modelo', 'outcomes': 'Ao final, você saberá',
            'study': 'Como estudar', 'understand': '01 · COMPREENDER', 'essential': 'A ideia essencial',
            'map': '02 · MAPA VISUAL', 'glance': 'A regra em um só olhar', 'formula': 'Fórmula',
            'order': 'Decida nesta ordem', 'errors': 'Erros frequentes', 'examples': 'Exemplos de referência',
            'practice': '03 · PRÁTICA', 'production': 'Do reconhecimento à produção',
            'answers': '04 · GABARITO', 'correct': 'Corrija e explique a regra', 'close': 'Tarefa final',
        })
    if IS_RUSSIAN and not advanced:
        labels.update({'cover':f"РУССКИЙ ЯЗЫК · УРОВЕНЬ {topic['level']} · МАТЕРИАЛ ДЛЯ ПЕЧАТИ",'goal':'Цель урока','model':'Модель','outcomes':'После урока вы сможете','study':'Как работать','understand':'01 · ПОНЯТЬ','essential':'Главная идея','map':'02 · ВИЗУАЛЬНАЯ КАРТА','glance':'Правило одним взглядом','formula':'Формула','order':'Принимайте решения в этом порядке','errors':'Типичные ошибки','examples':'Опорные примеры','practice':'03 · ПРАКТИКА','production':'От распознавания к созданию','answers':'04 · ОТВЕТЫ','correct':'Проверьте и объясните правило','close':'Итоговое задание'})
    if IS_KOREAN and not advanced:
        labels.update({'cover':f"한국어 · {topic['level']} · 인쇄용 학습 자료",'goal':'학습 목표','model':'핵심 모델','outcomes':'학습 후 할 수 있는 것','study':'학습 방법','understand':'01 · 이해하기','essential':'핵심 개념','map':'02 · 시각 지도','glance':'한눈에 보는 규칙','formula':'구조','order':'이 순서로 판단하세요','errors':'자주 하는 오류','examples':'기준 예문','practice':'03 · 연습하기','production':'형태 인식에서 실제 사용까지','answers':'04 · 정답과 해설','correct':'고치고 규칙을 설명하세요','close':'마무리 과제'})
    if IS_JAPANESE and not advanced:
        labels.update({'cover':f"日本語 · {topic['level']} · 印刷用学習資料",'goal':'学習目標','model':'中心モデル','outcomes':'学習後にできること','study':'学習方法','understand':'01 · 理解する','essential':'中心となる考え','map':'02 · 視覚マップ','glance':'規則を一目で確認','formula':'公式','order':'この順序で判断する','errors':'よくある誤り','examples':'参考例文','practice':'03 · 練習する','production':'形式の識別から自分の表現へ','answers':'04 · 解答と解説','correct':'修正して規則を説明する','close':'まとめの課題'})
    story = [p(labels['cover'], STYLES['eyebrow']), p(topic['title'], STYLES['title']), p(topic['lead'], STYLES['lead']), info_box(labels['goal'], topic['guide']['goal']), Spacer(1, 4 * mm), info_box(labels['model'], topic['guide']['model'], NAVY, 'model'), Spacer(1, 4 * mm), p(labels['outcomes'], STYLES['h1'])]
    story.extend(p(f'{index}. {outcome}', STYLES['body']) for index, outcome in enumerate(topic['outcomes'], 1))
    study_copy = (
        'Lee la explicación, reconstruye el mapa sin mirar, resuelve las seis etapas y corrige al final. Vuelve al modelo para justificar cada decisión.'
        if topic['level'].lower() in ('a1', 'a2', 'b1')
        else 'Read the explanation, rebuild the infographic from memory, complete the practice, and check the answer key. Return to the visual map to justify each decision.'
    )
    if IS_ITALIAN and not advanced:
        study_copy = 'Leggi la spiegazione, ricostruisci la mappa senza guardare, completa le sei fasi e correggi solo alla fine. Torna al modello per motivare ogni decisione.'
    if IS_PORTUGUESE and not advanced:
        study_copy = 'Leia a explicação, reconstrua o mapa sem olhar, complete as seis etapas e confira apenas no final. Volte ao modelo para justificar cada decisão.'
    if IS_RUSSIAN and not advanced: study_copy='Прочитайте объяснение, восстановите карту по памяти, выполните шесть этапов и только затем проверьте ответы. Обоснуйте каждое решение через модель.'
    if IS_KOREAN and not advanced: study_copy='설명을 읽고, 보지 않고 시각 지도를 다시 만든 뒤, 여섯 단계를 완료하세요. 마지막에만 정답을 확인하고 각 선택을 모델로 설명하세요.'
    if IS_JAPANESE and not advanced: study_copy='解説を読み、見ずに視覚マップを再現し、六段階の練習を終えてから答えを確認します。各判断を中心モデルで説明してください。'
    route_steps = l(['complete guide', 'exercise workbook', 'answer key', 'retrieval review'], ['cours complet', "cahier d'exercices", 'corrigé', 'rappel actif'])
    story += [
        Spacer(1, 3 * mm),
        info_box(labels['study'], study_copy, PALE_RED),
        Spacer(1, 6 * mm),
        p(l('WELEARN STUDY SEQUENCE', 'PARCOURS D’ÉTUDE WELEARN'), STYLES['eyebrow']),
        formula_flow(route_steps),
        Spacer(1, 5 * mm),
        editorial_card(
            l('Stage check', 'Bilan de l’étape'),
            l('Pause before continuing', 'Faites une pause avant de continuer'),
            l('Underline the trigger or decision point, name the rule, and check that the meaning has not changed.', "Soulignez le déclencheur ou le point de décision, nommez la règle et vérifiez que le sens n’a pas changé."),
            PALE_GREEN,
            BLUE,
        ),
        PageBreak(),
    ]
    story += [p(labels['understand'], STYLES['eyebrow']), p(labels['essential'], STYLES['title']), p(topic['description'], STYLES['lead'])]
    for section in topic['seo']:
        block = [p(section['heading'], STYLES['h2'])] + [p(paragraph, STYLES['body']) for paragraph in section.get('paragraphs', [])]
        story.append(KeepTogether(block))
        if section.get('table'):
            # The following heading already supplies vertical rhythm. A trailing
            # spacer can spill onto an otherwise empty page immediately before
            # the explicit section break, producing a blank branded sheet.
            story += [Spacer(1, 2 * mm), data_table(section['table'])]
    story += [PageBreak(), p(labels['map'], STYLES['eyebrow']), p(labels['glance'], STYLES['title']), info_box(labels['formula'], topic['guide']['formula'], CREAM, 'formula'), Spacer(1, 4 * mm), p(labels['order'], STYLES['h1'])]
    story.extend(p(f'{index}. {decision}', STYLES['body']) for index, decision in enumerate(topic['guide']['decisions'], 1))
    story += [Spacer(1, 2 * mm), data_table(topic['guide']['table']), Spacer(1, 3 * mm), p(labels['errors'], STYLES['h2'])]
    story.extend(p(f'× {mistake}', STYLES['body']) for mistake in topic['guide']['mistakes'])
    examples_copy = 'Cover the second column, reconstruct the pattern, and explain why the inversion is required.' if advanced else 'Tapa la columna en español, explica el sentido y lee el ejemplo en voz alta.'
    if IS_ITALIAN and not advanced:
        examples_copy = 'Copri la seconda colonna, ricostruisci lo schema e spiega ad alta voce quale scelta controlla la forma.'
    if IS_PORTUGUESE and not advanced:
        examples_copy = 'Cubra a segunda coluna, reconstrua o padrão e explique em voz alta qual decisão controla a forma.'
    if IS_RUSSIAN and not advanced: examples_copy='Закройте второй столбец, восстановите модель и вслух объясните, какое решение управляет формой.'
    if IS_KOREAN and not advanced: examples_copy='두 번째 열을 가리고 구조를 복원한 뒤, 어떤 판단이 형태를 결정하는지 소리 내어 설명하세요.'
    if IS_JAPANESE and not advanced: examples_copy='二列目を隠して型を再現し、どの判断が形を決めるのか声に出して説明してください。'
    story += [PageBreak(), p(labels['map'], STYLES['eyebrow']), p(labels['examples'], STYLES['title']), p(examples_copy, STYLES['lead']), examples_table(topic['visual']['scene']), PageBreak()]
    exercises, answers = exercises_for(topic)
    exercise_copy = f'{len(exercises)} printable exercises. Work without checking the answer key.' if advanced else f'{len(exercises)} ejercicios imprimibles. Trabaja sin consultar las soluciones.'
    if IS_ITALIAN and not advanced:
        exercise_copy = f'{len(exercises)} esercizi stampabili. Lavora senza consultare le soluzioni.'
    if IS_PORTUGUESE and not advanced:
        exercise_copy = f'{len(exercises)} exercícios para impressão. Trabalhe sem consultar o gabarito.'
    if IS_RUSSIAN and not advanced: exercise_copy=f'{len(exercises)} заданий для печати. Работайте, не заглядывая в ответы.'
    if IS_KOREAN and not advanced: exercise_copy=f'인쇄용 연습 {len(exercises)}문항입니다. 정답을 보지 않고 풀어 보세요.'
    if IS_JAPANESE and not advanced: exercise_copy=f'印刷用練習{len(exercises)}問です。解答を見ずに取り組んでください。'
    story += [p(labels['practice'], STYLES['eyebrow']), p(labels['production'], STYLES['title']), p(exercise_copy, STYLES['lead'])]
    current = None
    for number, level, prompt in exercises:
        if level != current:
            story.append(p(level, STYLES['h2']))
            current = level
        story.append(p(f'{number}. {prompt}', STYLES['exercise']))
    answer_copy = 'For open responses, compare the target structure first and the vocabulary second.' if advanced else 'En respuestas abiertas, compara primero la estructura objetivo y después el vocabulario.'
    if IS_ITALIAN and not advanced:
        answer_copy = 'Nelle risposte aperte, confronta prima la struttura obiettivo e poi il lessico.'
    if IS_PORTUGUESE and not advanced:
        answer_copy = 'Nas respostas abertas, compare primeiro a estrutura-alvo e depois o vocabulário.'
    if IS_RUSSIAN and not advanced: answer_copy='В открытых ответах сначала сравните целевую структуру, а затем лексику.'
    if IS_KOREAN and not advanced: answer_copy='서술형 답에서는 목표 구조를 먼저 비교하고, 그다음 어휘를 확인하세요.'
    if IS_JAPANESE and not advanced: answer_copy='自由記述では、まず目標構造を比べ、その後で語彙を確認してください。'
    story += [PageBreak(), p(labels['answers'], STYLES['eyebrow']), p(labels['correct'], STYLES['title']), p(answer_copy, STYLES['lead'])]
    for number, answer, explanation in answers:
        story.append(p(f'{number}. {answer} — {explanation}', STYLES['answer']))
    closing_copy = 'Write three original sentences and return to the visual map within 24 hours.' if advanced else 'Escribe tres frases nuevas, léelas en voz alta y vuelve al mapa visual dentro de 24 horas.'
    if IS_ITALIAN and not advanced:
        closing_copy = 'Scrivi tre frasi originali, leggile ad alta voce e torna alla mappa visiva entro ventiquattro ore.'
    if IS_PORTUGUESE and not advanced:
        closing_copy = 'Escreva três frases originais, leia-as em voz alta e volte ao mapa visual dentro de vinte e quatro horas.'
    if IS_RUSSIAN and not advanced: closing_copy='Напишите три новых предложения, прочитайте их вслух и вернитесь к визуальной карте через сутки.'
    if IS_KOREAN and not advanced: closing_copy='새 문장 세 개를 쓰고 소리 내어 읽은 뒤, 하루 안에 시각 지도를 다시 확인하세요.'
    if IS_JAPANESE and not advanced: closing_copy='新しい文を三つ書いて声に出して読み、24時間以内に視覚マップをもう一度確認してください。'
    review_rows = [[
        l('Review focus', 'Point de révision'),
        l('Retrieval', 'Rappel actif'),
        l('Feedback', 'Rétroaction'),
    ]]
    for index, focus in enumerate((topic['visual'].get('reviewFocus') or [topic['guide']['formula']])[:4]):
        review_rows.append([
            focus,
            l(f'Explain and exemplify: {focus}.', f'Expliquez et illustrez : {focus}.'),
            topic['guide']['decisions'][index % len(topic['guide']['decisions'])],
        ])
    story += [
        Spacer(1, 4 * mm),
        info_box(labels['close'], closing_copy, PALE_BLUE),
        Spacer(1, 5 * mm),
        p(l('Retrieval', 'Rappel actif'), STYLES['h1']),
        data_table(review_rows),
    ]
    return story


def main():
    topics = json.loads(DATA.read_text(encoding='utf-8'))
    editions = {
        value.strip()
        for value in os.environ.get('GRAMMAR_PDF_EDITIONS', 'complete,exercises,answer-key').split(',')
        if value.strip()
    }
    for topic in topics:
        level = topic['level'].lower()
        output_dir = OUTPUT / level
        public_dir = PUBLIC / f'{PUBLIC_PREFIX}-{level}' / 'grammar'
        output_dir.mkdir(parents=True, exist_ok=True)
        public_dir.mkdir(parents=True, exist_ok=True)
        filename = f"idiomaswl-{topic['slug']}.pdf" if topic['slug'].endswith(f'-{level}') else f"idiomaswl-{topic['slug']}-{level}.pdf"
        if 'complete' in editions:
            target = output_dir / filename
            Workbook(str(target), topic).build(build_story(topic))
            trim_trailing_blank_pages(target)
            shutil.copy2(target, public_dir / filename)
            print(target.relative_to(ROOT))
        if level in ('a1', 'a2', 'b1', 'b2', 'c1', 'c2') and {'exercises', 'answer-key'} & editions:
            stem = filename[:-4]
            exercises_filename = f"{stem}-{l('exercises', 'exercices')}.pdf"
            answer_key_filename = f"{stem}-{l('answer-key', 'corrige')}.pdf"
            exercises_target = output_dir / exercises_filename
            answer_key_target = output_dir / answer_key_filename
            if 'exercises' in editions:
                Workbook(str(exercises_target), topic, 'exercises').build(build_exercises_only_story(topic))
                trim_trailing_blank_pages(exercises_target)
                shutil.copy2(exercises_target, public_dir / exercises_filename)
                print(exercises_target.relative_to(ROOT))
            if 'answer-key' in editions:
                Workbook(str(answer_key_target), topic, 'answer-key').build(build_answer_key_only_story(topic))
                trim_trailing_blank_pages(answer_key_target)
                shutil.copy2(answer_key_target, public_dir / answer_key_filename)
                print(answer_key_target.relative_to(ROOT))
    print(f"Fertig: {len(topics)} deutsche Grammatikkurse mit getrennten Ausgaben." if IS_GERMAN else f"Pronti: {len(topics)} corsi di grammatica italiana con edizioni separate." if IS_ITALIAN else f"Prontos: {len(topics)} cursos de gramática portuguesa com edições separadas." if IS_PORTUGUESE else f"완료: 한국어 문법 {len(topics)}개 강의와 분리형 자료를 생성했습니다." if IS_KOREAN else f"完了：日本語文法{len(topics)}レッスンと別冊資料を生成しました。" if IS_JAPANESE else f"Готово: создано {len(topics)} уроков русской грамматики и отдельные материалы." if IS_RUSSIAN else l(f"Ready: {len(topics)} English grammar PDF workbooks.", f"Prêt : {len(topics)} cours de grammaire française et leurs éditions séparées."))


if __name__ == '__main__':
    main()
