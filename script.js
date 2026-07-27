// ============================================================
// SMART ZAMBIA – COMPLETE JAVASCRIPT
// Local · Smart · Innovative
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 1. TOAST NOTIFICATION SYSTEM
    // ============================================================
    const Toast = {
        container: document.getElementById('toastContainer'),

        show(message, title = '', type = 'success', duration = 5000) {
            if (!this.container) return;

            const iconMap = {
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️'
            };

            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <span class="toast-icon">${iconMap[type] || 'ℹ️'}</span>
                <div class="toast-content">
                    ${title ? `<div class="toast-title">${title}</div>` : ''}
                    <div class="toast-message">${message}</div>
                </div>
                <button class="toast-close" aria-label="Dismiss">&times;</button>
            `;

            toast.querySelector('.toast-close').addEventListener('click', () => {
                toast.classList.add('removing');
                setTimeout(() => toast.remove(), 300);
            });

            this.container.appendChild(toast);

            if (duration > 0) {
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.classList.add('removing');
                        setTimeout(() => toast.remove(), 300);
                    }
                }, duration);
            }
        },

        success(message, title = 'Success!', duration = 5000) {
            this.show(message, title, 'success', duration);
        },
        error(message, title = 'Error!', duration = 5000) {
            this.show(message, title, 'error', duration);
        },
        warning(message, title = 'Warning!', duration = 5000) {
            this.show(message, title, 'warning', duration);
        },
        info(message, title = 'Info', duration = 5000) {
            this.show(message, title, 'info', duration);
        }
    };

    // ============================================================
    // 2. TYPING EFFECT
    // ============================================================
    function initTyping() {
        const textElement = document.getElementById('typed-text');
        if (!textElement) return;

        const phrases = [
            'Local solutions for <span class="highlight">local people</span>',
            'Smart engineering for <span class="highlight">every home</span>',
            'Innovation that <span class="highlight">builds community</span>'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        function type() {
            const fullText = phrases[phraseIndex];
            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }

            textElement.innerHTML = currentText;

            if (!isDeleting && charIndex === fullText.length) {
                isDeleting = true;
                setTimeout(type, 2000);
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
                return;
            }

            const speed = isDeleting ? 30 : 60;
            setTimeout(type, speed);
        }

        type();
    }

    // ============================================================
    // 3. SCROLL ANIMATIONS (Intersection Observer)
    // ============================================================
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.why-card, .service-card');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        // Add a small delay based on data-delay attribute
                        const delay = parseInt(el.dataset.delay) || 0;
                        setTimeout(() => {
                            el.classList.add('visible');
                        }, delay * 100);
                        observer.unobserve(el);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(el => observer.observe(el));
        } else {
            // Fallback: show all
            elements.forEach(el => el.classList.add('visible'));
        }
    }

    // ============================================================
    // 4. STAT COUNTER ANIMATION
    // ============================================================
    function initStatCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');

        if ('IntersectionObserver' in window && statNumbers.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const target = parseInt(el.dataset.target) || 0;
                        const suffix = el.textContent.replace(/[0-9]/g, '');
                        let current = 0;
                        const increment = Math.ceil(target / 50);

                        if (target === 0) return;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                el.textContent = target + suffix;
                                clearInterval(timer);
                            } else {
                                el.textContent = current + suffix;
                            }
                        }, 30);

                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });

            statNumbers.forEach(el => observer.observe(el));
        }
    }

    // ============================================================
    // 5. MOBILE MENU
    // ============================================================
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', navLinks.classList.contains('open'));
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ============================================================
    // 6. DARK MODE
    // ============================================================
    function initDarkMode() {
        const darkToggle = document.getElementById('darkToggle');
        if (!darkToggle) return;

        const icon = darkToggle.querySelector('i');

        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        }

        darkToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            if (icon) {
                if (isDark) {
                    icon.classList.replace('fa-moon', 'fa-sun');
                    Toast.info('Dark mode enabled', '🌓', 2000);
                } else {
                    icon.classList.replace('fa-sun', 'fa-moon');
                    Toast.info('Light mode enabled', '☀️', 2000);
                }
            }
        });
    }

    // ============================================================
    // 7. NAVBAR SCROLL EFFECT
    // ============================================================
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    }

    // ============================================================
    // 8. SCROLL TO TOP BUTTON
    // ============================================================
    function initScrollTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top';
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================================
    // 9. FLOATING WHATSAPP BUTTON
    // ============================================================
    function initWhatsAppButton() {
        if (document.querySelector('.floating-wa')) return;

        const waBtn = document.createElement('a');
        waBtn.className = 'floating-wa';
        waBtn.href = 'https://wa.me/260958752821?text=Hello%20Smart%20Zambia!';
        waBtn.target = '_blank';
        waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
        waBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(waBtn);
    }

    // ============================================================
    // 10. PARTNER FORM HANDLING
    // ============================================================
    function initPartnerForm() {
        const form = document.getElementById('partnerForm');
        if (!form) return;

        // Email validation
        const emailInput = document.getElementById('partnerEmail');
        const emailError = document.getElementById('partnerEmailError');

        if (emailInput && emailError) {
            emailInput.addEventListener('input', function() {
                const value = this.value.trim();
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

                if (value === '') {
                    this.classList.remove('error');
                    emailError.classList.remove('visible');
                    return;
                }

                if (isValid) {
                    this.classList.remove('error');
                    emailError.classList.remove('visible');
                } else {
                    this.classList.add('error');
                    emailError.classList.add('visible');
                }
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Quick validation
            const name = document.getElementById('partnerName').value.trim();
            const what = document.getElementById('partnerWhat').value.trim();
            const howLong = document.getElementById('partnerHowLong').value;
            const phone = document.getElementById('partnerPhone').value.trim();
            const email = document.getElementById('partnerEmail').value.trim();
            const location = document.getElementById('partnerLocation').value.trim();

            if (!name || !what || !howLong || !phone || !email || !location) {
                Toast.warning('Please fill in all required fields.', 'Form incomplete');
                return;
            }

            // Validate email
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                Toast.error('Please enter a valid email address.', 'Invalid email');
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Submit via FormSubmit (or any other service)
            // FormSubmit will redirect by default, but we want to stay on page.
            // We'll use fetch to send the form data.
            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    Toast.success(
                        'We have received your registration. We\'ll contact you within 48 hours.',
                        '🎉 Registration successful!'
                    );
                    form.reset();
                } else {
                    throw new Error('Server error');
                }
            })
            .catch(error => {
                Toast.error(
                    'Something went wrong. Please try again later.',
                    'Submission failed'
                );
                console.error('Form submission error:', error);
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // ============================================================
    // 11. ACTIVE NAV LINK (scroll spy)
    // ============================================================
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const top = section.offsetTop - 120;
                if (window.pageYOffset >= top) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ============================================================
    // 12. KEYBOARD SHORTCUTS
    // ============================================================
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+D to toggle dark mode
        if (e.ctrlKey && e.shiftKey && (e.key === 'd' || e.key === 'D')) {
            e.preventDefault();
            const darkToggle = document.getElementById('darkToggle');
            if (darkToggle) darkToggle.click();
        }
    });

    // ============================================================
    // 13. INITIALIZE EVERYTHING
    // ============================================================
    function init() {
        initTyping();
        initScrollAnimations();
        initStatCounter();
        initMobileMenu();
        initDarkMode();
        initNavbarScroll();
        initScrollTop();
        initWhatsAppButton();
        initPartnerForm();
        initActiveNav();

        console.log('⚡ Smart Zambia – Local · Smart · Innovative');
        console.log('🌓 Toggle dark mode: Ctrl+Shift+D');
        console.log('📱 WhatsApp: +260 958 752 821');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
