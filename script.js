// ------------------------------------------------------------------
// Smart Zambia – Enhanced Main Script
// ------------------------------------------------------------------

(function () {
    'use strict';

    /* ---------- DOM element references ---------- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    /* ---------- 1. Mobile Navigation ---------- */
    if (hamburger && navLinks) {
        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus(); // return focus to hamburger
            }
        });
    }

    /* ---------- 2. Active Navigation Highlighting ---------- */
    function setActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav-links a');

        navItems.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            // Remove existing active class
            link.classList.remove('active-link');

            // Exact match or index.html as default
            if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active-link');
            }
        });

        // On home page, also highlight based on scroll position for sections
        if (currentPath === 'index.html' || currentPath === '') {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-links a[href="#${id}"]`);

                if (correspondingLink && scrollPos >= top && scrollPos < top + height) {
                    navItems.forEach(l => l.classList.remove('active-link'));
                    correspondingLink.classList.add('active-link');
                }
            });
        }
    }

    // Run on load and scroll (with throttle)
    window.addEventListener('load', setActiveNavLink);
    window.addEventListener('scroll', throttle(setActiveNavLink, 100));
    window.addEventListener('hashchange', setActiveNavLink);

    /* ---------- 3. Smooth Scroll (internal # links only) ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update URL hash without jump
                history.pushState(null, null, targetId);
            }
        });
    });

    /* ---------- 4. Navbar Scroll Effect (throttled) ---------- */
    function updateNavbarShadow() {
        if (navbar) {
            navbar.style.boxShadow = window.scrollY > 50
                ? '0 4px 20px rgba(0,0,0,0.1)'
                : 'none';
        }
    }
    window.addEventListener('scroll', throttle(updateNavbarShadow, 100));

    /* ---------- 5. Scroll‑to‑Top Button ---------- */
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', throttle(() => {
        scrollToTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
    }, 200));

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- 6. Enhanced Form Feedback ---------- */
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            const btn = this.querySelector('button[type="submit"]');
            if (!btn) return;

            // Basic validation (HTML5 will handle most, but we add a fallback)
            if (!this.checkValidity()) return;

            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // Reset after 4 seconds if page doesn't redirect (Formspree typically redirects)
            const resetTimer = setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 4000);

            // Store timer so we can clear if the page unloads
            btn._resetTimer = resetTimer;
        });
    });

    // Clear timeout if the form submission navigates away
    window.addEventListener('beforeunload', () => {
        document.querySelectorAll('button[type="submit"]').forEach(btn => {
            if (btn._resetTimer) clearTimeout(btn._resetTimer);
        });
    });

    /* ---------- 7. Staggered Scroll Animations ---------- */
    const animatedElements = document.querySelectorAll(
        '.about-card, .service-card, .contact-item, .hero-content, .join-form-container'
    );

    if ('IntersectionObserver' in window && animatedElements.length) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a slight delay based on the element's index within its parent
                    const siblings = Array.from(entry.target.parentNode.children).filter(
                        child => child.matches('.about-card, .service-card, .contact-item, .hero-content, .join-form-container')
                    );
                    const index = siblings.indexOf(entry.target);
                    const delay = index > -1 ? index * 100 : 0; // 100ms stagger

                    entry.target.style.transitionDelay = `${delay}ms`;
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
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
        // No observer support – show all immediately
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    /* ---------- Utility: Throttle function ---------- */
    function throttle(fn, delay) {
        let lastTime = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastTime >= delay) {
                lastTime = now;
                fn.apply(this, args);
            }
        };
    }

})();
