/* ============================================================
   Smart Zambia — Main JavaScript
   All interactive functionality for the entire website.
   ============================================================ */

(function() {
    'use strict';

    // ─── PRELOADER ──────────────────────────────────────────────
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            // Start counter animation on index page only
            if (document.querySelector('.stat__number[data-count]')) {
                setTimeout(animateCounters, 400);
            }
        });
    }

    // ─── MOBILE NAV TOGGLE ────────────────────────────────────
    const toggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
    if (toggle && navList) {
        toggle.addEventListener('click', () => {
            const open = toggle.classList.toggle('open');
            navList.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open);
        });

        // Close nav on link click (mobile)
        document.querySelectorAll('.nav__list a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('open');
                navList.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ─── HEADER SHADOW ON SCROLL ──────────────────────────────
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const y = window.scrollY;

        // Header shadow
        if (header) {
            if (y > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (y > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    // ─── BACK TO TOP BUTTON ────────────────────────────────────
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── COUNTER ANIMATION (index page stats) ────────────────
    function animateCounters() {
        const counters = document.querySelectorAll('.stat__number[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            if (isNaN(target)) return;
            let current = 0;
            const increment = Math.ceil(target / 60);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = current;
                }
            }, 25);
        });
    }

    // ─── SMOOTH SCROLL FOR INTERNAL ANCHOR LINKS ──────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ─── FORM HANDLING ──────────────────────────────────────────
    // Shared form submission with honeypot and validation
    function handleFormSubmit(formId, successMessage) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Honeypot check
            const hp = this.querySelector('input[name="hp_website"]');
            if (hp && hp.value.trim() !== '') {
                alert('Bot detected. Submission blocked.');
                return;
            }

            // Validate required fields
            const requiredFields = this.querySelectorAll('[required]');
            let valid = true;
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#c0392b';
                    valid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!valid) {
                alert('Please fill in all required fields.');
                return;
            }

            // Special validation for partner form: at least one expertise checkbox checked
            if (formId === 'partnerForm') {
                const checkboxes = this.querySelectorAll('input[name="expertise"]:checked');
                if (checkboxes.length === 0) {
                    alert('Please select at least one area of expertise.');
                    return;
                }
            }

            // Simulate submission
            const btn = this.querySelector('.btn');
            if (!btn) return;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (formId === 'partnerForm' ? 'Submitting...' : 'Sending...');
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> ' + successMessage;
                btn.style.background = '#2d8f54';
                btn.style.boxShadow = '0 8px 24px rgba(45,143,84,0.35)';

                // Reset after 4 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.boxShadow = '';
                    btn.disabled = false;
                    form.reset();
                }, 4000);
            }, 1800);
        });

        // Remove error border on input
        form.querySelectorAll('input, select, textarea').forEach(el => {
            el.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }

    // Initialise forms
    handleFormSubmit('partnerForm', 'Submitted Successfully!');
    handleFormSubmit('contactForm', 'Message Sent!');

})();
