# 📝 Guide de Personnalisation du Portfolio

Ce fichier vous guide pour personnaliser votre portfolio École 42.

## 🎯 Étapes de Personnalisation Prioritaires

### 1. Informations Personnelles de Base

**Fichier : `src/sections/Hero.tsx`**
- [ ] Remplacer "Votre Nom" par votre vrai nom
- [ ] Modifier "YN" (initiales) dans l'avatar
- [ ] Changer la description personnelle
- [ ] Mettre à jour les compétences en aperçu (ligne 79)

**Fichier : `src/components/Header.tsx`**
- [ ] Mettre à jour les liens sociaux (GitHub, LinkedIn, Email)

**Fichier : `index.html`**
- [ ] Modifier le titre et la description
- [ ] Mettre à jour les meta tags Open Graph

### 2. Section À Propos

**Fichier : `src/sections/About.tsx`**
- [ ] Réécrire votre parcours personnel (lignes 65-85)
- [ ] Mettre à jour les statistiques (années d'expérience, projets, etc.)
- [ ] Adapter les points forts selon votre profil

### 3. Projets

**Fichier : `src/sections/Projects.tsx`**
- [ ] Remplacer les projets d'exemple par les vôtres
- [ ] Ajouter les vraies URLs GitHub
- [ ] Mettre de vraies images de projets (remplacer `/api/placeholder/600/400`)
- [ ] Adapter les descriptions selon vos réalisations

**Projets École 42 suggérés :**
- ft_transcendence
- minishell
- webserv
- cub3d / miniRT
- push_swap
- philosophers
- ft_printf
- get_next_line
- libft

### 4. Compétences

**Fichier : `src/sections/Skills.tsx`**
- [ ] Ajuster les niveaux de compétence selon votre expertise
- [ ] Ajouter/supprimer des technologies
- [ ] Modifier les catégories si nécessaire

### 5. Contact

**Fichier : `src/sections/Contact.tsx`**
- [ ] Remplacer `votre@email.com` par votre vrai email
- [ ] Mettre à jour les liens GitHub et LinkedIn
- [ ] Changer la localisation
- [ ] Configurer le formulaire de contact (optionnel : intégrer EmailJS)

**Fichier : `src/components/Footer.tsx`**
- [ ] Mettre à jour toutes les informations de contact
- [ ] Modifier les liens sociaux

## 🎨 Personnalisation Visuelle

### Couleurs

**Fichier : `tailwind.config.js`**
- [ ] Modifier la palette de couleurs primaires
- [ ] Ajuster les couleurs selon vos préférences

### Images

1. **Avatar/Photo** :
   - Ajouter votre photo dans `public/`
   - Modifier le composant avatar dans `Hero.tsx`

2. **Images de projets** :
   - Ajouter les screenshots dans `public/projects/`
   - Mettre à jour les URLs dans `Projects.tsx`

3. **Favicon** :
   - Remplacer `public/vite.svg` par votre favicon

### Polices

**Fichier : `src/index.css`**
- [ ] Changer la police Google Fonts si désiré

## 🚀 Fonctionnalités Avancées (Optionnel)

### 1. Mode Sombre Automatique
- [ ] Implémenter la détection du thème système
- [ ] Ajouter un bouton de toggle theme

### 2. Formulaire de Contact Fonctionnel
- [ ] Intégrer EmailJS ou Netlify Forms
- [ ] Configurer les notifications de succès/erreur

### 3. Blog (Optionnel)
- [ ] Ajouter une section blog avec vos articles
- [ ] Intégrer un CMS headless comme Strapi ou Contentful

### 4. Analytics
- [ ] Intégrer Google Analytics ou Plausible
- [ ] Ajouter le tracking des interactions

### 5. SEO Avancé
- [ ] Ajouter un sitemap.xml
- [ ] Configurer les meta tags pour chaque section
- [ ] Optimiser les images (WebP, lazy loading)

## 📱 Tests et Optimisation

### Avant de Déployer
- [ ] Tester sur mobile, tablette, desktop
- [ ] Vérifier l'accessibilité (contraste, navigation clavier)
- [ ] Optimiser les performances (Lighthouse)
- [ ] Tester les liens et formulaires
- [ ] Vérifier l'orthographe et la grammaire

### SEO
- [ ] Tester avec les outils de développement Google
- [ ] Vérifier l'aperçu des réseaux sociaux
- [ ] S'assurer que toutes les images ont des alt text

## 🔧 Scripts Utiles

```bash
# Développement
npm run dev

# Construction
npm run build

# Preview de la version de production
npm run preview

# Linter
npm run lint
```

## 📞 Ressources Utiles

- **Inspiration design** : Dribbble, Behance
- **Icônes** : Lucide React (déjà inclus)
- **Images** : Unsplash, Pexels
- **Couleurs** : Coolors.co, Adobe Color
- **Polices** : Google Fonts
- **Animations** : Framer Motion (déjà inclus)

---

💡 **Conseil** : Personnalisez progressivement. Commencez par les informations de base, puis ajoutez vos projets, et enfin peaufinez le design selon vos goûts !
