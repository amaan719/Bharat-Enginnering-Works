// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const themeToggle = document.getElementById('themeToggle');
const themeToggleText = themeToggle?.querySelector('.theme-toggle-text');
const themeToggleIcon = themeToggle?.querySelector('.theme-toggle-icon');

function setTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    if (themeToggleText) {
        themeToggleText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
    if (themeToggleIcon) {
        themeToggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

function getPreferredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
    });
}

setTheme(getPreferredTheme());

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileNav.classList.contains('hidden');
    
    if (isOpen) {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    } else {
        mobileNav.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }
});

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe all contact cards
document.querySelectorAll('.contact-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe banners
document.querySelectorAll('.specialization-banner, .cta-banner').forEach(banner => {
    banner.style.transitionDelay = '0.6s';
    observer.observe(banner);
});

// Scroll indicator click
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            const headerOffset = 80;
            const elementPosition = servicesSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animate counters (if you want to add statistics)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(start);
        }
    }, 16);
}

// Card hover effects - Add ripple effect
document.querySelectorAll('.service-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function(e) {
        this.style.transform = '';
    });
});

// Add loading effect
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add dynamic text typing effect (optional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Prevent animations on page resize
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Add CSS for resize animation stopper
const style = document.createElement('style');
style.textContent = `
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(style);

// Service icon rotation on hover
document.querySelectorAll('.service-card').forEach(card => {
    const icon = card.querySelector('.service-icon');
    
    card.addEventListener('mouseenter', () => {
        icon.style.transform = 'rotate(360deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        icon.style.transform = 'rotate(0deg)';
    });
});

// Add active state to navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
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

// Add particle effect on hover (optional enhancement)
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.background = '#2563eb';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity;
    let life = 1;
    
    function animate() {
        x += vx;
        y += vy;
        life -= 0.02;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = life;
        
        if (life > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}

// Form validation (if you add a contact form)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth reveal for footer sections
const footerSections = document.querySelectorAll('.footer-section');
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

footerSections.forEach(section => {
    footerObserver.observe(section);
});

// Console welcome message
console.log('%c Welcome to Bharat Engineering Works! ', 'background: #2563eb; color: white; font-size: 16px; padding: 10px;');
console.log('%c We specialize in Modern Rice Mill & Sortex Plant ', 'background: #10b981; color: white; font-size: 14px; padding: 8px;');

// Add page visibility change handler
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back! - Bharat Engineering Works';
    } else {
        document.title = 'Bharat Engineering Works - Excellence in Engineering';
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});
