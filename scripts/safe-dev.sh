#!/bin/bash

# 🔒 SAFE DEV — Script para correr Next.js sin que el PC muera
# Uso: bash scripts/safe-dev.sh

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔒 SAFE DEV MONITOR${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. Matar procesos viejos
echo -e "${YELLOW}1. Limpiando procesos previos...${NC}"
pkill -9 -f "node|npm" 2>/dev/null || true
sleep 1
echo -e "${GREEN}   ✓ Procesos limpios${NC}"

# 2. Limpiar .next (si es muy grande)
echo -e "${YELLOW}2. Verificando tamaño de .next...${NC}"
if [ -d ".next" ]; then
  NEXT_SIZE=$(du -sh .next | cut -f1)
  echo "   Tamaño actual: $NEXT_SIZE"
  if [[ $NEXT_SIZE == *"G"* ]]; then
    echo -e "${RED}   ⚠️  .next es muy grande, limpiando...${NC}"
    rm -rf .next
    echo -e "${GREEN}   ✓ Limpiado${NC}"
  fi
else
  echo -e "${GREEN}   ✓ No existe .next (perfecto)${NC}"
fi

# 3. Iniciar dev con monitor
echo -e "${YELLOW}3. Iniciando Next.js con monitoreo...${NC}"
echo -e "${GREEN}   Puerto: http://localhost:3010${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Background process para monitorear CPU/memoria
monitor_resources() {
  while true; do
    NEXT_PID=$(pgrep -f "next dev" | head -1)
    if [ -z "$NEXT_PID" ]; then
      break
    fi

    # Obtener CPU % del proceso
    CPU=$(ps -p $NEXT_PID -o %cpu= 2>/dev/null || echo "0")
    MEM=$(ps -p $NEXT_PID -o %mem= 2>/dev/null || echo "0")

    # Si CPU > 80% o MEM > 70%, matar
    if (( $(echo "$CPU > 80" | bc -l) )) || (( $(echo "$MEM > 70" | bc -l) )); then
      echo -e "${RED}⚠️  Recursos altos: CPU=${CPU}% MEM=${MEM}%${NC}"
      echo -e "${RED}🔨 Matando proceso para liberar memoria...${NC}"
      kill -9 $NEXT_PID 2>/dev/null || true
      sleep 2
      echo -e "${YELLOW}🔄 Reiniciando Next.js...${NC}"
      npm run dev &
    fi

    sleep 5
  done
}

# Iniciar monitor en background
monitor_resources &
MONITOR_PID=$!

# Iniciar Next.js
npm run dev

# Limpiar monitor al salir
trap "kill $MONITOR_PID 2>/dev/null" EXIT
