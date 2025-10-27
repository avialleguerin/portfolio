# Portfolio - Développeur Full Stack École 42

Un portfolio moderne et responsive créé avec React, TypeScript, et Tailwind CSS, mettant en valeur les compétences et projets d'un développeur diplômé de l'École 42. Je me suis inspiré du design TURA. UI Design by Denys Turynskyi.

## 🚀 Fonctionnalités

- **Design Moderne** : Interface élégante avec animations fluides
- **Responsive** : Optimisé pour tous les appareils (mobile, tablette, desktop)
- **Mode Sombre** : Support du thème sombre automatique
- **Animations** : Animations interactives avec Framer Motion
- **Performance** : Optimisé avec Vite pour des temps de chargement rapides
- **SEO** : Meta tags optimisés pour le référencement
- **Accessibilité** : Conçu selon les bonnes pratiques d'accessibilité

## 🛠️ Technologies Utilisées

- **Frontend** :
  - React 18 avec TypeScript
  - Tailwind CSS pour le styling
  - Framer Motion pour les animations
  - Lucide React pour les icônes

- **Outils de Développement** :
  - Vite pour le bundling et le développement
  - ESLint pour la qualité du code
  - PostCSS pour le traitement CSS

## 📦 Installation

1. **Cloner le repository** :
   ```bash
   git clone https://github.com/avialleguerin/portfolio.git
   cd portfolio
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur** :
   Aller à `http://localhost:5173`

## 🎨 Personnalisation

### Informations Personnelles

Modifiez les fichiers suivants pour personnaliser le portfolio :

1. **Informations de base** dans `src/sections/Hero.tsx` :
   - Nom, titre, description
   - Avatar et liens sociaux

2. **À propos** dans `src/sections/About.tsx` :
   - Votre parcours et expérience
   - Statistiques personnelles

3. **Projets** dans `src/sections/Projects.tsx` :
   - Ajoutez vos projets avec images, descriptions, technologies
   - Liens GitHub et démonstrations

4. **Compétences** dans `src/sections/Skills.tsx` :
   - Vos technologies et niveaux de compétence
   - Catégories de compétences

5. **Contact** dans `src/sections/Contact.tsx` :
   - Email, liens sociaux, localisation

### Styles et Couleurs

Le portfolio utilise Tailwind CSS avec des couleurs personnalisées définies dans `tailwind.config.js`. Vous pouvez modifier :

- **Couleurs principales** : Palette de couleurs dans la configuration
- **Animations** : Classes CSS personnalisées dans `src/index.css`
- **Typographie** : Police et tailles dans la configuration Tailwind

## 📂 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.tsx      # Navigation principale
│   └── Footer.tsx      # Pied de page
├── sections/           # Sections principales du portfolio
│   ├── Hero.tsx        # Section d'accueil
│   ├── About.tsx       # À propos
│   ├── Projects.tsx    # Projets
│   ├── Skills.tsx      # Compétences
│   └── Contact.tsx     # Contact
├── types/              # Types TypeScript
│   └── index.ts        # Définitions des interfaces
├── App.tsx             # Composant principal
├── main.tsx            # Point d'entrée
└── index.css           # Styles globaux
```

## 🚀 Déploiement

### Netlify

1. **Build du projet** :
   ```bash
   npm run build
   ```

2. **Déployer** sur Netlify en glissant le dossier `dist`

### Vercel

1. **Connecter le repository** GitHub à Vercel
2. **Configuration automatique** détectée
3. **Déploiement automatique** à chaque push

### GitHub Pages

1. **Installer gh-pages** :
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Ajouter les scripts** dans `package.json` :
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Déployer** :
   ```bash
   npm run deploy
   ```

## 📱 Sections du Portfolio

### 1. Hero Section
- Présentation personnelle avec avatar
- CTA vers projets et CV
- Aperçu des compétences principales

### 2. À Propos
- Parcours École 42
- Philosophie de développement
- Statistiques et réalisations

### 3. Projets
- Projets École 42 (ft_transcendence, minishell, webserv, etc.)
- Projets personnels
- Technologies utilisées et liens

### 4. Compétences
- Compétences techniques par catégorie
- Barres de progression animées
- Certifications et formations

### 5. Contact
- Formulaire de contact fonctionnel
- Informations de contact
- Liens sociaux

⭐ Si ce portfolio vous a été utile, n'hésitez pas à lui donner une étoile !
