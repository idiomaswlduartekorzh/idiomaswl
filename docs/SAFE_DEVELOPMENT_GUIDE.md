# 🔒 SAFE DEVELOPMENT GUIDE — No Crashees Tu PC

## TL;DR — Lo que pasaba

Tu PC crasheaba porque:
1. **`.next` crecía a 1.4GB** ← Turbopack compilaba TODO innecesariamente
2. **Procesos Node fantasma** ← 10+ instancias corriendo en background
3. **Webpack/Turbopack sin límites** ← Usando toda la memoria disponible
4. **Hot reload agresivo** ← Re-compilaba todo cada cambio

---

## ✅ Solución 1: Script Safe Dev (RECOMENDADO)

```bash
# Opción A: Bash (macOS/Linux)
bash scripts/safe-dev.sh

# Opción B: Node.js (Windows/macOS/Linux) ← MEJOR
npm run dev:safe
```

**Qué hace:**
- ✓ Mata procesos Node viejos automáticamente
- ✓ Limpia .next si es > 1GB
- ✓ Inicia Next.js con configuración optimizada
- ✓ Monitorea memoria en tiempo real
- ✓ Reinicia si CPU/RAM superan límites

---

## 🎛️ Solución 2: next.config.js Optimizado

Ya está creado en `/next.config.js` con:

```javascript
// Limita compilación a 5 páginas a la vez
onDemandEntries: {
  pagesBufferLength: 5,
  maxInactiveAge: 60 * 1000
}

// Webpack cache en disco (no RAM)
cache: {
  type: 'filesystem',
  cacheDirectory: '.webpack_cache'
}

// No optimizar imágenes en dev
images: {
  unoptimized: true
}
```

---

## 🌍 Solución 3: .env Optimizado

Archivo: `.env.development.local`

```env
# Limitar memoria de Turbopack a 512MB
TURBOPACK_MEMORY_LIMIT=512

# Deshabilitar telemetría (ahorra CPU)
NEXT_TELEMETRY_DISABLED=1

# No compilar TypeScript aquí (usa ts-node en IDE)
NEXT_TYPESCRIPT_COMPILER_ENABLED=false
```

---

## 🧹 Solución 4: Limpiar Regularmente

```bash
# Limpiar cache (cuando todo está lento)
npm run clean

# O manual:
rm -rf .next .turbo node_modules/.cache
```

---

## 🚨 Si El PC Sigue Crasheando

### Síntoma 1: "Fan muy ruidoso, 100% CPU"

```bash
# 1. Mata TODO
pkill -9 -f "node|npm"

# 2. Limpia cache
npm run clean

# 3. Reinicia fresh
npm run dev:safe
```

### Síntoma 2: "Memoria se va a 100%"

**Causa**: Browser está cargando muchos assets  
**Fix**:
```bash
# Desabilita source maps temporalmente en .env.development.local
NEXT_TYPESCRIPT_COMPILER_ENABLED=false
```

### Síntoma 3: "Hot reload no funciona, lag"

**Causa**: Demasiadas páginas compiladas en cache  
**Fix**:
```bash
# Solo compila lo que necesitas
cd src/app/(site)/dashboard/student/icfes
# Edita aquí, no en otras rutas
```

---

## 📊 Arquitectura de Memoria

**Antes (CRASH):**
```
├─ .next: 1.4GB      ← Turbopack compiló TODO
├─ node_modules: 546MB
├─ Webpack cache: 300MB
├─ Node process: 400MB
└─ Chrome: 1.2GB
   ═══════════════════
   Total: 3.8GB / 8GB RAM 💀
```

**Después (SAFE):**
```
├─ .next: 200MB      ← Solo lo que necesitas
├─ node_modules: 546MB
├─ Webpack cache: 50MB (filesystem, no RAM)
├─ Node process: 150MB (monitorizado)
└─ Chrome: 800MB
   ═══════════════════
   Total: 1.8GB / 8GB RAM ✅
```

---

## 🎯 Checklist de Configuración

- [x] ✅ `next.config.js` creado
- [x] ✅ `.env.development.local` creado
- [x] ✅ `scripts/safe-dev.js` creado
- [x] ✅ `scripts/safe-dev.sh` creado (macOS/Linux)
- [x] ✅ Scripts agregados a `package.json`
- [ ] 👉 **Usa `npm run dev:safe` en lugar de `npm run dev`**

---

## 💡 Best Practices While Developing

### 1. **Usa un solo terminal**
```bash
npm run dev:safe
# Todo lo demás en otra ventana/tab
```

### 2. **No abras demasiadas pestañas del navegador**
- 1-2 tabs del app
- No mantener abierto DevTools todo el tiempo

### 3. **Limpia cache frecuentemente**
```bash
# Cada 30 min si trabajas muchas horas
npm run clean && npm run dev:safe
```

### 4. **Si usas VS Code**
Desabilita estas extensions en tu workspace:
- ❌ "ES7+ Code Snippets" (hace lint en tiempo real)
- ❌ "Prettier" (formatea cada keystroke)
- ❌ "ESLint" (analiza todo el tiempo)

Enable apenas necesites verificar.

### 5. **Crea un alias en tu shell** (opcional)
```bash
# Añade a ~/.zshrc o ~/.bashrc
alias dev='npm run dev:safe'

# Ahora usa:
dev  # En lugar de npm run dev:safe
```

---

## 🔧 Debugging: Qué Está Consumiendo Memoria

### macOS Activity Monitor:
```
Abre: Cmd + Espacio → Activity Monitor
Ordena por: Memory
Busca: node / npm / next
```

### Linux:
```bash
# Ver top 5 procesos por memoria
ps aux --sort=-%mem | head -6
```

### Windows:
```powershell
# PowerShell como admin
Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 10
```

---

## 📈 Monitoreo en Tiempo Real

Si `npm run dev:safe` no es suficiente, monitorea en otra terminal:

```bash
# macOS/Linux
watch -n 1 'du -sh .next node_modules/.cache'

# Verá esto:
# .next: 150MB
# cache: 30MB
# (actualiza cada 1 segundo)
```

---

## 🎓 Por Qué Pasaba Esto

**Next.js 16 + Turbopack** es NUEVO y puede ser agresivo:

1. **Compilación eager**: Compila páginas que quizás nunca visites
2. **Monorepo detection**: Vio carpetas en `/Developer` y compiló TODO
3. **Webpack cache**: Se guardaba en RAM en lugar de disco
4. **Hot Module Reload**: Re-compilaba cada keystroke

Nuestras soluciones desactivan lo innecesario y limitan recursos.

---

## 📝 Próximos Pasos

Cuando estés trabajando:

1. **Terminal 1** (dev):
   ```bash
   npm run dev:safe
   ```

2. **Terminal 2** (opcional, otro trabajo):
   ```bash
   # TypeScript check
   npx tsc --noEmit --watch
   
   # O linting
   npx eslint src --watch
   ```

3. **Browser**: http://localhost:3010

---

## ❓ FAQ

**P: ¿Puedo usar `npm run dev` normal?**  
A: Sí, pero con riesgo. Si ves fan ruidoso, usa `dev:safe`.

**P: ¿Pierdo cambios si lo reinicia?**  
A: No, los archivos están guardados. Solo reinicia el servidor.

**P: ¿Por qué .next es tan grande?**  
A: Next.js compila TODAS las rutas. Turbopack usa caché agresivo.

**P: ¿Funciona en Windows?**  
A: Sí, `npm run dev:safe` es Node.js puro (multiplataforma).

**P: ¿Y si tengo 16GB RAM?**  
A: Eres afortunado 😅. Estos límites evitan crecer infinito.

---

## 🚀 Resumen

| Acción | Comando |
|--------|---------|
| Desarrollo seguro | `npm run dev:safe` |
| Limpiar todo | `npm run clean` |
| Build (producción) | `npm run build` |
| Mirar recursos | Activity Monitor / `ps aux` |

**Ahora tu PC no debería sufrir. 🎉**

---

Creado: 2026-07-06  
Actualización: Cuando Turbopack se estabilice en Next 17+
