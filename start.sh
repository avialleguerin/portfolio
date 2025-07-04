#!/bin/bash

echo "🚀 Portfolio - École 42"
echo "======================="

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé."
    echo "📥 Veuillez installer Node.js depuis https://nodejs.org/"
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Installer les dépendances si node_modules n'existe pas
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo ""
fi

echo "🎨 Lancement du serveur de développement..."
echo "📍 Le portfolio sera disponible sur http://localhost:5173"
echo ""
echo "💡 Pour arrêter le serveur, appuyez sur Ctrl+C"
echo ""

# Lancer le serveur de développement
npm run dev
