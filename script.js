// ========================================
// LOADING SCREEN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hide');
    }, 1200);
});

// ========================================
// MOBILE NAVIGATION
// ========================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const menuLinks = document.querySelectorAll('.menu-link');

menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = '';
        
        menuLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !menuToggle?.contains(e.target)) {
            menuToggle?.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ========================================
// ACTIVE LINK ON SCROLL
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
    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navHeight = 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
const revealElements = document.querySelectorAll(
    '.benefit-card, .program-card, .testimonial-item, .resource-card'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in-up');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<span>✓ Terkirim!</span><span class="btn-arrow">✧</span>';
        btn.style.background = '#4CAF50';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// ========================================
// NEWSLETTER FORM
// ========================================
const newsletterInput = document.querySelector('.newsletter-input');
if (newsletterInput) {
    const input = newsletterInput.querySelector('input');
    const btn = newsletterInput.querySelector('button');
    
    btn?.addEventListener('click', (e) => {
        e.preventDefault();
        if (input?.value.trim()) {
            btn.textContent = '✓';
            btn.style.background = '#4CAF50';
            setTimeout(() => {
                btn.textContent = '→';
                btn.style.background = '';
                input.value = '';
            }, 2000);
        }
    });
    
    input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            btn?.click();
        }
    });
}

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================
const heroImage = document.querySelector('.hero-image-wrapper');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (heroImage) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.35;
                heroImage.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// ========================================
// TOUCH FEEDBACK FOR MOBILE
// ========================================
document.querySelectorAll('a, button, .program-card, .resource-card, .benefit-card').forEach(el => {
    el.addEventListener('touchstart', function() {
        this.style.transition = 'transform 0.1s ease';
        this.style.transform = 'scale(0.97)';
    }, { passive: true });
    
    el.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    }, { passive: true });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// CONSOLE BRANDING
// ========================================
console.log('%c🌿 BloomSpace', 'font-size: 32px; font-weight: 800; color: #4CAF50;');
console.log('%cTemukan Ketenangan dalam Diri', 'font-size: 16px; color: #94A3B8;');
console.log('%c❤️ Made with love for wellness', 'font-size: 14px; color: #8B5CF6;');

// ========================================
// DYNAMIC YEAR
// ========================================
const yearElement = document.querySelector('.footer-bottom p:first-child');
if (yearElement) {
    yearElement.textContent = `© ${new Date().getFullYear()} BloomSpace. All rights reserved.`;
}

console.log('✨ Website siap deploy ke Cloudflare!');
