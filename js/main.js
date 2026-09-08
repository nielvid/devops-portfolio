// ── Mobile menu ──────────────────────────────────────────────
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
document.querySelectorAll('#mobile-menu a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.add('hidden'))
);

// ── Typed effect ─────────────────────────────────────────────
const roles = ['DevOps Engineer', 'Cloud Architect', 'Infrastructure Automator', 'SRE Enthusiast'];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
    if (!typedEl) return;
    const current = roles[roleIndex];
    typedEl.textContent = deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);
    if (!deleting && charIndex > current.length) { deleting = true; setTimeout(type, 1800); return; }
    if (deleting && charIndex < 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
    setTimeout(type, deleting ? 60 : 100);
}
type();

// ── Scroll reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Active nav on scroll ──────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) current = s.id; });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
});

// ── Contact form ──────────────────────────────────────────────
document.getElementById('contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
    btn.classList.replace('bg-sky-600', 'bg-green-600');
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message';
        btn.classList.replace('bg-green-600', 'bg-sky-600');
        btn.disabled = false;
        this.reset();
    }, 3000);
});
