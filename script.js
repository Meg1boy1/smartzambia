/* -----------------------------------------------
   Smart Zambia – Enhanced Main Script
   ----------------------------------------------- */

(function () {
    'use strict';

    // DOM references
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');

    /* ---------- 1. Mobile Navigation (accessible) ---------- */
    if (hamburger && navMenu) {
        // Toggle menu
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ---------- 2. Smooth scroll for internal # links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update URL without jump
                history.pushState(null, null, targetId);
            }
        });
    });

    /* ---------- 3. Navbar shadow on scroll (throttled) ---------- */
    function updateNavbarShadow() {
        if (navbar) {
            navbar.style.boxShadow = window.scrollY > 50
                ? '0 4px 20px rgba(0,0,0,0.1)'
                : 'none';
        }
    }
    window.addEventListener('scroll', throttle(updateNavbarShadow, 100));

    /* ---------- 4. Active navigation highlighting ---------- */
    function setActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinksAll = document.querySelectorAll('.nav-links a');

        // Remove existing active class
        navLinksAll.forEach(link => link.classList.remove('active-link'));

        // Highlight based on current page (for pages like join.html, contact.html)
        navLinksAll.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active-link');
            }
        });

        // On home page, also highlight based on scroll position
        if (currentPath === 'index.html' || currentPath === '') {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-links a[href="#${id}"]`);

                if (correspondingLink && scrollPos >= top && scrollPos < top + height) {
                    navLinksAll.forEach(l => l.classList.remove('active-link'));
                    correspondingLink.classList.add('active-link');
                }
            });
        }
    }
    window.addEventListener('load', setActiveNavLink);
    window.addEventListener('scroll', throttle(setActiveNavLink, 100));
    window.addEventListener('hashchange', setActiveNavLink);

    /* ---------- 5. Scroll‑to‑Top Button ---------- */
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    function toggleScrollTopButton() {
        scrollToTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
    }
    window.addEventListener('scroll', throttle(toggleScrollTopButton, 200));
    toggleScrollTopButton(); // initial check

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- 6. Form submission feedback ---------- */
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            const btn = this.querySelector('button[type="submit"]');
            if (!btn) return;

            // Use HTML5 validation first
            if (!this.checkValidity()) return;

            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            const resetTimer = setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 4000);

            // Clean up timer if page unloads (e.g., Formspree redirects)
            btn._resetTimer = resetTimer;
        });
    });

    window.addEventListener('beforeunload', () => {
        document.querySelectorAll('button[type="submit"]').forEach(btn => {
            if (btn._resetTimer) clearTimeout(btn._resetTimer);
        });
    });

    /* ---------- 7. Scroll animations (staggered) ---------- */
    const animatedElements = document.querySelectorAll(
        '.about-card, .service-card, .process-step, .cta-card'
    );

    if ('IntersectionObserver' in window && animatedElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a staggered delay based on sibling index
                    const siblings = Array.from(entry.target.parentNode.children).filter(
                        child => child.matches('.about-card, .service-card, .process-step, .cta-card')
                    );
                    const index = siblings.indexOf(entry.target);
                    const delay = index > -1 ? index * 100 : 0;

                    entry.target.style.transitionDelay = `${delay}ms`;
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    } else {
        // Fallback: show all immediately
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    /* ---------- Utility: throttle ---------- */
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
