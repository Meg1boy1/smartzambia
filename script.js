// ============================================================
// SMART ZAMBIA – COMPLETE JAVASCRIPT
// Premium Tesla/ABB/SpaceX Inspired Theme
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 1. TOAST NOTIFICATION SYSTEM
    // ============================================================
    const Toast = {
        container: null,

        init() {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            this.container.setAttribute('role', 'status');
            this.container.setAttribute('aria-live', 'polite');
            document.body.appendChild(this.container);
        },

        show(message, title = '', type = 'success', duration = 5000) {
            if (!this.container) this.init();

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
                <button class="toast-close" aria-label="Dismiss notification">&times;</button>
            `;

            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => this.remove(toast));

            this.container.appendChild(toast);

            if (duration > 0) {
                setTimeout(() => {
                    if (toast.parentNode) this.remove(toast);
                }, duration);
            }

            return toast;
        },

        remove(toast) {
            toast.classList.add('removing');
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
            }, 300);
        },

        success(message, title = 'Success!', duration = 5000) {
            return this.show(message, title, 'success', duration);
        },

        error(message, title = 'Error!', duration = 5000) {
            return this.show(message, title, 'error', duration);
        },

        warning(message, title = 'Warning!', duration = 5000) {
            return this.show(message, title, 'warning', duration);
        },

        info(message, title = 'Info', duration = 5000) {
            return this.show(message, title, 'info', duration);
        }
    };

    // ============================================================
    // 2. WATERMARK INJECTION
    // ============================================================
    function addWatermark() {
        if (document.querySelector('.watermark')) return;

        const watermark = document.createElement('div');
        watermark.className = 'watermark';
        watermark.setAttribute('aria-hidden', 'true');

        watermark.innerHTML = `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <text x="18" y="68" font-family="Arial, sans-serif" font-weight="900" font-size="56" fill="#1B5E20">S</text>
                <text x="40" y="68" font-family="Arial, sans-serif" font-weight="900" font-size="56" fill="#E65100">Z</text>
                <polygon points="48,22 38,52 52,52 44,78 62,46 48,46" fill="#FFC107" stroke="#F57C00" stroke-width="2" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,183,77,0.15)" stroke-width="2" />
            </svg>
        `;

        document.body.prepend(watermark);
    }

    // ============================================================
    // 3. MOBILE MENU
    // ============================================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
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

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar')) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ============================================================
    // 4. DARK MODE
    // ============================================================
    const darkToggle = document.getElementById('darkToggle');
    const body = document.body;

    if (darkToggle) {
        const icon = darkToggle.querySelector('i');

        if (localStorage.getItem('darkMode') === 'true') {
            body.classList.add('dark-mode');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        }

        darkToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
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
    // 5. NAVBAR SCROLL EFFECT
    // ============================================================
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

    // ============================================================
    // 6. SCROLL TO TOP BUTTON
    // ============================================================
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

    // ============================================================
    // 7. FLOATING WHATSAPP BUTTON
    // ============================================================
    if (!document.querySelector('.floating-wa')) {
        const waBtn = document.createElement('a');
        waBtn.className = 'floating-wa';
        waBtn.href = 'https://wa.me/260958752821?text=Hello%20Smart%20Zambia!';
        waBtn.target = '_blank';
        waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
        waBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(waBtn);
    }

    // ============================================================
    // 8. SERVICE FILTER + SEARCH
    // ============================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const searchInput = document.getElementById('serviceSearch');
    const noResults = document.getElementById('noResults');

    function filterServices() {
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset?.filter || 'all';
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let visibleCount = 0;

        serviceCards.forEach(card => {
            const category = card.dataset.category;
            const name = (card.dataset.name || '').toLowerCase();
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
            const features = card.querySelector('.features')?.textContent.toLowerCase() || '';

            const matchesFilter = (activeFilter === 'all' || category === activeFilter);
            const matchesSearch = name.includes(searchTerm) ||
                title.includes(searchTerm) ||
                desc.includes(searchTerm) ||
                features.includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResults) {
            noResults.style.display = (visibleCount === 0) ? 'block' : 'none';
        }
    }

    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterServices();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterServices);
    }

    // ============================================================
    // 9. REAL-TIME EMAIL VALIDATION
    // ============================================================
    const emailFields = document.querySelectorAll('input[type="email"]');

    emailFields.forEach(field => {
        const errorEl = field.parentElement?.querySelector('.validation-error');
        const successEl = field.parentElement?.querySelector('.validation-success');

        field.addEventListener('input', function() {
            const value = this.value.trim();
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            if (value === '') {
                this.classList.remove('error');
                if (errorEl) errorEl.classList.remove('visible');
                if (successEl) successEl.classList.remove('visible');
                return;
            }

            if (isValid) {
                this.classList.remove('error');
                if (errorEl) errorEl.classList.remove('visible');
                if (successEl) successEl.classList.add('visible');
            } else {
                this.classList.add('error');
                if (errorEl) errorEl.classList.add('visible');
                if (successEl) successEl.classList.remove('visible');
            }
        });
    });

    // ============================================================
    // 10. CAPTCHA ROTATION
    // ============================================================
    document.querySelectorAll('.captcha-row').forEach(row => {
        const label = row.querySelector('#captchaLabel') || row.querySelector('label');
        if (label) {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            label.textContent = `What is ${num1} + ${num2}?`;
            label.dataset.num1 = num1;
            label.dataset.num2 = num2;
        }
    });

    // ============================================================
    // 11. FORM SUBMISSION HANDLER (with security)
    // ============================================================
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const timestampField = form.querySelector('#formTimestamp');
        if (timestampField) {
            timestampField.value = Date.now();
        }

        const formId = form.id || 'form';
        const saveKey = `smartZambia_${formId}_data`;

        function saveFormData() {
            const data = {};
            const inputs = form.querySelectorAll('input:not([type="checkbox"]):not([type="hidden"]), textarea, select');
            inputs.forEach(el => {
                if (el.id) data[el.id] = el.value;
            });
            const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
            data._checkboxes = Array.from(checkboxes).map(cb => cb.value);
            localStorage.setItem(saveKey, JSON.stringify(data));
        }

        function loadFormData() {
            const saved = localStorage.getItem(saveKey);
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    const inputs = form.querySelectorAll('input:not([type="checkbox"]):not([type="hidden"]), textarea, select');
                    inputs.forEach(el => {
                        if (el.id && data[el.id] !== undefined) {
                            el.value = data[el.id];
                        }
                    });
                    if (data._checkboxes) {
                        form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                            cb.checked = data._checkboxes.includes(cb.value);
                        });
                    }
                } catch (e) { /* ignore */ }
            }
        }

        loadFormData();

        form.querySelectorAll('input, textarea, select').forEach(el => {
            el.addEventListener('change', saveFormData);
            el.addEventListener('input', saveFormData);
        });

        function checkRateLimit(formId) {
            const now = Date.now();
            const key = `smartZambia_${formId}_submissions`;
            let submissions = JSON.parse(localStorage.getItem(key) || '[]');
            submissions = submissions.filter(t => now - t < 300000);
            if (submissions.length >= 3) {
                Toast.warning('Please wait a few minutes before submitting again.', 'Rate limit reached');
                return false;
            }
            submissions.push(now);
            localStorage.setItem(key, JSON.stringify(submissions));
            return true;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Honeypot
            const honeypot = this.querySelector('.honeypot input');
            if (honeypot && honeypot.value.trim() !== '') {
                Toast.error('Bot detected. Submission blocked.', 'Security check');
                return;
            }

            // CAPTCHA
            const captchaRow = this.querySelector('.captcha-row');
            if (captchaRow) {
                const label = captchaRow.querySelector('label');
                const answer = captchaRow.querySelector('input[type="number"]');
                if (label && answer) {
                    const num1 = parseInt(label.dataset.num1);
                    const num2 = parseInt(label.dataset.num2);
                    if (parseInt(answer.value) !== (num1 + num2)) {
                        Toast.error('Incorrect answer. Please try again.', 'CAPTCHA');
                        answer.classList.add('error');
                        return;
                    }
                    answer.classList.remove('error');
                }
            }

            // Timestamp
            const timestamp = this.querySelector('#formTimestamp');
            if (timestamp) {
                const elapsed = (Date.now() - parseInt(timestamp.value)) / 1000;
                if (elapsed < 5) {
                    Toast.warning('Please take your time filling out the form.', 'Too fast');
                    return;
                }
            }

            // Rate limiting
            if (!checkRateLimit(formId)) {
                return;
            }

            // Validate email
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput) {
                const email = emailInput.value.trim();
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email !== '') {
                    emailInput.classList.add('error');
                    const errorEl = emailInput.parentElement?.querySelector('.validation-error');
                    if (errorEl) errorEl.classList.add('visible');
                    Toast.error('Please enter a valid email address.', 'Validation');
                    return;
                }
            }

            // Build message
            const name = this.querySelector('#userName, #contactName, #partnerName')?.value?.trim() || 'Unknown';
            const email = this.querySelector('input[type="email"]')?.value?.trim() || '';
            const message = this.querySelector('textarea')?.value?.trim() || 'No message provided';
            const subject = this.querySelector('#contactSubject')?.value?.trim() || 'General enquiry';

            let fullMessage = '📩 Smart Zambia Enquiry\n';
            fullMessage += `📅 ${new Date().toLocaleString()}\n`;
            fullMessage += `👤 Name: ${name}\n`;
            if (email) fullMessage += `📧 Email: ${email}\n`;
            fullMessage += `📌 Subject: ${subject}\n`;
            fullMessage += `\n📝 Message:\n${message}`;

            Toast.success('We will contact you shortly!', '✅ Thank you!');

            const waNumber = '260958752821';
            const waMsg = encodeURIComponent(fullMessage);
            setTimeout(() => {
                window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank');
            }, 1000);
        });
    });

    // ============================================================
    // 12. STAT COUNTER ANIMATION
    // ============================================================
    const statNumbers = document.querySelectorAll('.stat-number');

    if ('IntersectionObserver' in window && statNumbers.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target) || 0;
                    const suffix = el.textContent.replace(/[0-9]/g, '');
                    let current = 0;
                    const increment = Math.ceil(target / 60);

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

    // ============================================================
    // 13. LIGHTBOX GALLERY
    // ============================================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    if (galleryItems.length && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const title = this.dataset.title || 'Project';
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt || title;
                }
                lightboxCaption.textContent = title;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', function(e) {
            if (e.target === this) closeLightbox();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // ============================================================
    // 14. ACTIVE NAV LINK HIGHLIGHT
    // ============================================================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath || (currentPath === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ============================================================
    // 15. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // 16. KEYBOARD ACCESSIBILITY
    // ============================================================
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+D to toggle dark mode
        if (e.ctrlKey && e.shiftKey && (e.key === 'd' || e.key === 'D')) {
            e.preventDefault();
            if (darkToggle) darkToggle.click();
        }
        // Escape to close lightbox
        if (e.key === 'Escape') {
            if (lightbox && lightbox.classList.contains('open')) {
                closeLightbox();
            }
        }
    });

    // ============================================================
    // 17. PREMIUM EFFECTS – Typing & Parallax
    // ============================================================
    function initTyping() {
        const heroText = document.querySelector('.hero-premium h1');
        if (!heroText) return;

        const originalText = heroText.textContent;
        const words = originalText.split(' ');
        const highlightIndex = words.findIndex(w => w.includes('Future') || w.includes('Zambia'));

        heroText.innerHTML = words.map((word, i) => {
            const isHighlight = i === highlightIndex || i === highlightIndex + 1;
            return `<span class="${isHighlight ? 'highlight' : ''}" style="display:inline-block; opacity:0; animation: fadeInUp 0.6s ease forwards ${i * 0.1}s;">${word}</span>`;
        }).join(' ');
    }

    function initParallax() {
        const hero = document.querySelector('.hero-premium');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
        });
    }

    // ============================================================
    // 18. INITIALIZE ALL FEATURES
    // ============================================================
    // Add watermark
    if (document.readyState === 'complete') {
        addWatermark();
    } else {
        window.addEventListener('load', addWatermark);
    }

    // Premium features
    if (document.body.classList.contains('premium')) {
        initTyping();
        initParallax();
    }

    // Console branding
    console.log('⚡ Smart Zambia – Premium Edition');
    console.log('🌓 Toggle dark mode: Ctrl+Shift+D');
    console.log('📱 WhatsApp: +260 958 752 821');

})();
