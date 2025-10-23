// Système de navigation fullpage entre sections
let currentSection = 0;
let isScrolling = false;
let touchStartY = 0;

function goToSection(sectionIndex) {
    if (isScrolling) return;
    isScrolling = true;
    currentSection = sectionIndex;
    
    if (sectionIndex === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionIndex === 1) {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    setTimeout(() => { isScrolling = false; }, 800);
}

window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    if (e.deltaY > 0 && scrollPosition < windowHeight * 0.5) {
        e.preventDefault();
        goToSection(1);
    } else if (e.deltaY < 0 && scrollPosition >= windowHeight * 0.5) {
        const projectsSection = document.getElementById('projects');
        const projectsTop = projectsSection ? projectsSection.offsetTop : windowHeight;
        if (scrollPosition <= projectsTop + 50) {
            e.preventDefault();
            goToSection(0);
        }
    }
}, { passive: false });

// Gestion du clic sur l'indicateur de scroll
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.getElementById('projects').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
    
    // Rendre l'indicateur cliquable visuellement
    scrollIndicator.style.cursor = 'pointer';
}

// Gestion du lien navigation PROJECTS
const projectsLink = document.querySelector('a[href="#projects"]');
if (projectsLink) {
    projectsLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('projects').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Gestion du carousel de projets
const projects = [
    {
        image: 'project1.png',
        title: 'PORTFOLIO',
        description: 'Portfolio web développé en totale autonomie. Inclut un système de gestion de transactions, budgets, objectifs d\'épargne, catégorisation automatique et tableau de bord avec statistiques avancées.'
    },
    {
        image: 'project2.png',
        title: 'PORTFOLIO',
        description: 'Portfolio web développé en totale autonomie. Inclut un système de gestion de transactions, budgets, objectifs d\'épargne, catégorisation automatique et tableau de bord avec statistiques avancées.'
    },
    {
        image: 'project3.png',
        title: 'FINANCE TRACKER',
        description: 'Application web de gestion financière personnelle développée en totale autonomie. Inclut un système de gestion de transactions, budgets, objectifs d\'épargne, catégorisation automatique et tableau de bord avec statistiques avancées.'
    }
];

let currentProjectIndex = 1; // Index du projet au centre (commence à project2)
let isRotating = false;

function updateProjectDisplay() {
    const leftIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    const centerIndex = currentProjectIndex;
    const rightIndex = (currentProjectIndex + 1) % projects.length;
    
    // Mettre à jour les images
    document.querySelector('.project-bg-left img').src = projects[leftIndex].image;
    document.querySelector('.project-bg-center img').src = projects[centerIndex].image;
    document.querySelector('.project-bg-right img').src = projects[rightIndex].image;
    
    // Mettre à jour le contenu du projet central
    document.querySelector('.project-main-title').textContent = projects[centerIndex].title;
    document.querySelector('.project-description').textContent = projects[centerIndex].description;
}

function rotateLeft() {
    if (isRotating) return;
    isRotating = true;
    
    const leftImg = document.querySelector('.project-bg-left');
    const centerImg = document.querySelector('.project-bg-center');
    const rightImg = document.querySelector('.project-bg-right');
    
    // Nettoyer toutes les classes d'animation existantes
    leftImg.classList.remove('slide-to-center-right', 'slide-to-center-left', 'fade-out-left', 'fade-in-left');
    centerImg.classList.remove('slide-to-left', 'slide-to-right');
    rightImg.classList.remove('slide-to-center-right', 'slide-to-center-left', 'fade-out-right', 'fade-in-right');
    
    // Rotation vers la droite : gauche -> centre, centre -> droite, droite disparait, nouveau à gauche
    leftImg.classList.add('slide-to-center-right');
    centerImg.classList.add('slide-to-right');
    rightImg.classList.add('fade-out-right');
    
    // Attendre la fin de l'animation
    setTimeout(() => {
        // Mettre à jour l'index
        currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        
        // Retirer toutes les classes d'animation
        leftImg.classList.remove('slide-to-center-right');
        centerImg.classList.remove('slide-to-right');
        rightImg.classList.remove('fade-out-right');
        
        // Mettre à jour l'affichage
        updateProjectDisplay();
        
        // Nettoyer les classes sur les nouvelles images après le swap
        const newLeftImg = document.querySelector('.project-bg-left');
        const newCenterImg = document.querySelector('.project-bg-center');
        const newRightImg = document.querySelector('.project-bg-right');
        
        newLeftImg.classList.remove('slide-to-center-right', 'slide-to-center-left', 'fade-out-left', 'fade-in-left');
        newCenterImg.classList.remove('slide-to-left', 'slide-to-right');
        newRightImg.classList.remove('slide-to-center-right', 'slide-to-center-left', 'fade-out-right', 'fade-in-right');
        
        // Animer la nouvelle image à gauche qui apparaît
        newLeftImg.classList.add('fade-in-left');
        
        setTimeout(() => {
            newLeftImg.classList.remove('fade-in-left');
            // Petit délai de sécurité avant de permettre la prochaine rotation
            setTimeout(() => {
                isRotating = false;
            }, 50);
        }, 600);
    }, 600);
}

function rotateRight() {
    if (isRotating) return;
    isRotating = true;
    
    const leftImg = document.querySelector('.project-bg-left');
    const centerImg = document.querySelector('.project-bg-center');
    const rightImg = document.querySelector('.project-bg-right');
    
    // Nettoyer toutes les classes d'animation existantes
    leftImg.classList.remove('slide-to-center-right', 'slide-to-center-left', 'fade-out-left', 'fade-in-left');
    centerImg.classList.remove('slide-to-left', 'slide-to-right');
    rightImg.classList.remove('slide-to-center-right', 'slide-to-center-left', 'fade-out-right', 'fade-in-right');
    
    // Rotation vers la gauche : droite -> centre, centre -> gauche, gauche disparait, nouveau à droite
    rightImg.classList.add('slide-to-center-left');
    centerImg.classList.add('slide-to-left');
    leftImg.classList.add('fade-out-left');
    
    // Attendre la fin de l'animation
    setTimeout(() => {
        // Mettre à jour l'index
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        
        // Retirer toutes les classes d'animation
        rightImg.classList.remove('slide-to-center-left');
        centerImg.classList.remove('slide-to-left');
        leftImg.classList.remove('fade-out-left');
        
        // Mettre à jour l'affichage
        updateProjectDisplay();
        
        // Nettoyer les classes sur les nouvelles images après le swap
        const newLeftImg = document.querySelector('.project-bg-left');
        const newCenterImg = document.querySelector('.project-bg-center');
        const newRightImg = document.querySelector('.project-bg-right');
        
        newLeftImg.classList.remove('slide-to-center-right', 'slide-to-center-left', 'fade-out-left', 'fade-in-left');
        newCenterImg.classList.remove('slide-to-left', 'slide-to-right');
        newRightImg.classList.remove('slide-to-center-right', 'slide-to-center-left', 'fade-out-right', 'fade-in-right');
        
        // Animer la nouvelle image à droite qui apparaît
        newRightImg.classList.add('fade-in-right');
        
        setTimeout(() => {
            newRightImg.classList.remove('fade-in-right');
            // Petit délai de sécurité avant de permettre la prochaine rotation
            setTimeout(() => {
                isRotating = false;
            }, 50);
        }, 600);
    }, 600);
}

// Gestion des clics sur les images latérales
const leftImage = document.querySelector('.project-bg-left');
const rightImage = document.querySelector('.project-bg-right');

if (leftImage) {
    leftImage.style.cursor = 'pointer';
    leftImage.addEventListener('click', rotateLeft); // Cliquer à gauche fait venir l'image de gauche au centre
}

if (rightImage) {
    rightImage.style.cursor = 'pointer';
    rightImage.addEventListener('click', rotateRight); // Cliquer à droite fait venir l'image de droite au centre
}

// Gestion du bouton retour en haut
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    // Afficher/masquer le bouton selon la position de scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Retour en haut au clic
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
}
