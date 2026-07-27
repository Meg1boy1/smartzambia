// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when any navigation link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth scroll only for internal # links (stays in same page)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // ignore empty hash
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.style.boxShadow = window.scrollY > 50 
            ? '0 4px 20px rgba(0,0,0,0.1)' 
            : 'none';
    }
});

// Enhanced form submission feedback (works with Formspree)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const btn = this.querySelector('button[type="submit"]');
        if (!btn) return;
        
        // Store original text
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.7';
        
        // Re-enable after 3 seconds (fallback if page doesn't redirect)
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.opacity = '1';
        }, 3000);
    });
});

// Scroll animations (with Intersection Observer)
const animatedElements = document.querySelectorAll(
    '.about-card, .service-card, .contact-item, .hero-content, .join-form-container'
);

if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // animate only once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
} else {
    // Fallback for older browsers: just show elements
    animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}
