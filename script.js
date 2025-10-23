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
