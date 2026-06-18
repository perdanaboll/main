// ========================================
// PRELOADER
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 1800);
});

// ========================================
// CUSTOM CURSOR
// ========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .service-card, .portfolio-item, .filter-btn, .social-link').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });

    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
        document.querySelectorAll('.cursor-dot, .cursor-ring').forEach(el => el.style.display = 'none');
        document.body.style.cursor = 'auto';
    }
}

// ========================================
// NAVIGATION
// ========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navLinks?.classList.remove('active');
        navLinkItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ========================================
// SCROLL ACTIVE LINK
// ========================================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// ANIMATED COUNTER
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target + (target > 1 ? '+' : '%');
        }
    }
    requestAnimationFrame(update);
}

const observerCounter = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            animateCounter(el);
            observerCounter.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => observerCounter.observe(el));

// ========================================
// PORTFOLIO FILTER
// ========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================
const animateElements = document.querySelectorAll(
    '.service-card, .portfolio-item, .testimonial-card, .contact-item'
);

const observerAnim = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observerAnim.observe(el);
});

// ========================================
// PARTICLES BACKGROUND
// ========================================
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.count = 80;
        this.init();
    }

    init() {
        for (let i = 0; i < this.count; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.particles.forEach(p => {
            p.x = Math.random() * window.innerWidth;
            p.y = Math.random() * window.innerHeight;
        });
    }

    animate() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        this.container.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles = this.particles;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(108, 60, 225, ${p.opacity})`;
                ctx.fill();
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(108, 60, 225, ${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(draw);
        }
        draw();
    }
}

const heroParticles = document.getElementById('particles');
if (heroParticles) {
    new ParticleSystem(heroParticles);
}

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✧ Terkirim!</span>';
        btn.style.background = 'var(--gradient2)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// ========================================
// SMOOTH SCROLL (for all anchor links)
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
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

// ========================================
// KEYBOARD ACCESSIBILITY
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navLinks?.classList.contains('active')) {
            hamburger?.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});

// ========================================
// PERFORMANCE: DEBOUNCE RESIZE
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle any resize-specific logic
    }, 250);
});

// ========================================
// CONSOLE WELCOME
// ========================================
console.log('%c✦ Cosmic Studio ✦', 'font-size: 32px; font-weight: 900; color: #6C3CE1;');
console.log('%cKreativitas Tanpa Batas', 'font-size: 16px; color: #8A8AB5;');
console.log('%c🚀 Built with passion & code', 'font-size: 14px; color: #F5A623;');

// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================
const footerYear = document.querySelector('.footer-bottom p:first-child');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} Cosmic Studio. All rights reserved.`;
}

// ========================================
// LAZY LOADING FOR PORTFOLIO IMAGES
// ========================================
const portfolioImages = document.querySelectorAll('.portfolio-image');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.backgroundImage = entry.target.style.backgroundImage;
            imageObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

portfolioImages.forEach(img => imageObserver.observe(img));

// ========================================
// NEWSLETTER FORM
// ========================================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        if (input.value.trim()) {
            const btn = newsletterForm.querySelector('button');
            btn.textContent = '✓';
            btn.style.background = '#4ade80';
            setTimeout(() => {
                btn.textContent = '→';
                btn.style.background = '';
                input.value = '';
            }, 2000);
        }
    });
}

// ========================================
// MOBILE NAV CLOSE ON OUTSIDE CLICK
// ========================================
document.addEventListener('click', (e) => {
    if (navLinks?.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !hamburger?.contains(e.target)) {
            hamburger?.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});

console.log('%c✨ Website siap deploy ke Cloudflare!', 'font-size: 18px; color: #4facfe;');