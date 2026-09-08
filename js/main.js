// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Close mobile menu when link is clicked
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

// Fetch GitHub projects data
async function loadProjects() {
    const projects = [
        { repo: 'nielvid/lgtm-stack', name: 'LGTM Stack' },
        { repo: 'nielvid/devops-sandbox', name: 'DevOps Sandbox' },
        { repo: 'nielvid/strongbox-vault', name: 'Strongbox Vault' },
        { repo: 'nielvid/forge', name: 'Forge' },
        { repo: 'nielvid/swiftdeploy', name: 'SwiftDeploy' },
        { repo: 'nielvid/anomaly-detector', name: 'Anomaly Detector' }
    ];

    const projectsContainer = document.getElementById('github-projects');
    if (!projectsContainer) return;

    try {
        for (const project of projects) {
            const response = await fetch(`https://api.github.com/repos/${project.repo}`);
            if (response.ok) {
                const data = await response.json();
                const projectCard = createProjectCard(project.name, data);
                projectsContainer.appendChild(projectCard);
            }
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

function createProjectCard(name, repoData) {
    const card = document.createElement('div');
    card.className = 'card-hover bg-gray-900 rounded-lg overflow-hidden border border-gray-700';
    
    const language = repoData.language || 'Unknown';
    const languages = {
        'Python': 'bg-blue-900 text-blue-200',
        'JavaScript': 'bg-yellow-900 text-yellow-200',
        'Go': 'bg-cyan-900 text-cyan-200',
        'Terraform': 'bg-purple-900 text-purple-200',
        'Shell': 'bg-green-900 text-green-200',
        'YAML': 'bg-red-900 text-red-200',
        'HCL': 'bg-indigo-900 text-indigo-200'
    };
    
    const colorClass = languages[language] || 'bg-gray-700 text-gray-200';
    
    card.innerHTML = `
        <div class="bg-gradient-to-r from-gray-700 to-gray-800 h-40 flex items-center justify-center">
            <i class="fas fa-github text-6xl text-white"></i>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold mb-2">${name}</h3>
            <p class="text-gray-400 mb-4">${repoData.description || 'No description available'}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                <span class="${colorClass} px-3 py-1 rounded-full text-sm">${language}</span>
                <span class="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">⭐ ${repoData.stargazers_count}</span>
            </div>
            <a href="${repoData.html_url}" target="_blank" class="text-blue-400 hover:text-blue-300 font-semibold">View on GitHub →</a>
        </div>
    `;
    
    return card;
}

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', loadProjects);
