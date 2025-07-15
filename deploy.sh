#!/bin/bash

# Script de despliegue para GitHub Pages
echo "🚀 Iniciando despliegue a GitHub Pages..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
fi

# Verificar que git está inicializado
if [ ! -d ".git" ]; then
    echo "❌ Error: No se encontró repositorio Git. Ejecuta 'git init' primero."
    exit 1
fi

# Verificar que hay un remote configurado
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ Error: No hay un remote 'origin' configurado."
    echo "Ejecuta: git remote add origin https://github.com/TU-USUARIO/VC_Compra.git"
    exit 1
fi

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Construir la aplicación
echo "🔨 Construyendo la aplicación..."
npm run build

# Verificar que la construcción fue exitosa
if [ ! -d "build" ]; then
    echo "❌ Error: La construcción falló. No se encontró la carpeta 'build'."
    exit 1
fi

# Desplegar a GitHub Pages
echo "☁️ Desplegando a GitHub Pages..."
npm run deploy

# Verificar el resultado del despliegue
if [ $? -eq 0 ]; then
    echo "✅ ¡Despliegue exitoso!"
    echo "🌐 Tu aplicación estará disponible en: https://TU-USUARIO.github.io/VC_Compra"
    echo "⏰ Puede tomar unos minutos en estar disponible."
else
    echo "❌ Error en el despliegue."
    exit 1
fi 