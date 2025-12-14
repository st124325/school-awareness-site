// ============================================
// NAVIGATION
// ============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS (AOS - Animate On Scroll)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ============================================
// PARALLAX EFFECTS
// ============================================

const parallaxElements = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ============================================
// FLOATING CARDS ANIMATION
// ============================================

const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    // Add random floating animation
    setInterval(() => {
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        const randomRotate = (Math.random() - 0.5) * 10;
        
        card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    }, 3000 + index * 1000);
});

// ============================================
// STAT CARDS COUNTER ANIMATION
// ============================================

const statCards = document.querySelectorAll('.stat-card');

const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue && !statValue.dataset.animated) {
                const text = statValue.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    statValue.dataset.animated = 'true';
                    statValue.textContent = '0' + (text.includes('%') ? '%' : '');
                    animateCounter(statValue, number, 2000);
                }
            }
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => {
    statObserver.observe(card);
});

// ============================================
// TIMELINE ANIMATION
// ============================================

const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    timelineObserver.observe(item);
});

// ============================================
// FACT CARDS HOVER EFFECT
// ============================================

const factCards = document.querySelectorAll('.fact-card');

factCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ============================================
// CURSOR EFFECT (Optional - for desktop)
// ============================================

if (window.innerWidth > 968) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #667eea;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    let cursorVisible = false;
    
    document.addEventListener('mousemove', (e) => {
        if (!cursorVisible) {
            cursor.style.display = 'block';
            cursorVisible = true;
        }
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursorVisible = false;
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .fact-card, .timeline-content');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// LAZY LOADING IMAGES (if any)
// ============================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle scroll events
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ============================================
// ROLLING BALL INDICATOR - COMPLEX ANIMATION
// ============================================

const rollingBall = document.getElementById('rollingBall');
let lastScrollY = window.scrollY;
let scrollDirection = 'down';
let ballRotation = 0;
let isScrolling = false;
let targetSection = null;

// Находим среднюю секцию (Impact section)
function findTargetSection() {
    const impactSection = document.getElementById('impact');
    if (impactSection) {
        targetSection = impactSection;
        return impactSection;
    }
    // Если нет Impact, берем Facts
    return document.getElementById('facts') || document.querySelector('section:nth-of-type(2)');
}

function updateRollingBall() {
    if (!rollingBall) return;
    
    if (!targetSection) {
        targetSection = findTargetSection();
    }
    
    if (!targetSection) return;
    
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    const windowHeight = window.innerHeight;
    
    // Получаем границы целевой секции
    const sectionRect = targetSection.getBoundingClientRect();
    const sectionTop = sectionRect.top + currentScrollY;
    const sectionBottom = sectionTop + sectionRect.height;
    
    // Проверяем, находится ли пользователь в области секции
    const viewportTop = currentScrollY;
    const viewportBottom = currentScrollY + windowHeight;
    
    const isInSection = viewportBottom >= sectionTop && viewportTop <= sectionBottom;
    
    if (isInSection) {
        // Показываем шарик только в средней части секции
        const sectionMiddle = sectionTop + sectionRect.height / 2;
        const sectionVisibleTop = Math.max(sectionTop, viewportTop);
        const sectionVisibleBottom = Math.min(sectionBottom, viewportBottom);
        const visibleHeight = sectionVisibleBottom - sectionVisibleTop;
        
        // Вычисляем позицию шарика относительно видимой части секции
        const relativePosition = (currentScrollY + windowHeight / 2 - sectionVisibleTop) / visibleHeight;
        const clampedPosition = Math.max(0, Math.min(1, relativePosition));
        
        // Ограничиваем область появления (только средние 60% секции)
        const minPosition = 0.2;
        const maxPosition = 0.8;
        
        if (clampedPosition >= minPosition && clampedPosition <= maxPosition) {
            const ballTop = sectionVisibleTop + (clampedPosition - minPosition) / (maxPosition - minPosition) * visibleHeight * 0.6;
            rollingBall.style.top = `${ballTop}px`;
            rollingBall.classList.add('visible');
        } else {
            rollingBall.classList.remove('visible');
        }
    } else {
        rollingBall.classList.remove('visible');
    }
    
    // Определяем направление скролла для анимации
    if (Math.abs(scrollDelta) > 0 && rollingBall.classList.contains('visible')) {
        if (scrollDelta > 0) {
            scrollDirection = 'down';
            rollingBall.classList.remove('scrolling-up');
            rollingBall.classList.add('scrolling-down');
        } else {
            scrollDirection = 'up';
            rollingBall.classList.remove('scrolling-down');
            rollingBall.classList.add('scrolling-up');
        }
        
        // Сложное вращение с ускорением
        const rotationSpeed = Math.min(Math.abs(scrollDelta) * 3, 30);
        if (scrollDirection === 'down') {
            ballRotation += rotationSpeed;
        } else {
            ballRotation -= rotationSpeed;
        }
        
        // Применяем вращение к контейнеру
        const ballContainer = rollingBall.querySelector('.ball-container');
        if (ballContainer) {
            ballContainer.style.transform = `rotateZ(${ballRotation}deg)`;
        }
        
        // Добавляем эффект движения с задержкой
        rollingBall.classList.add('moving');
        clearTimeout(rollingBall.scrollTimeout);
        rollingBall.scrollTimeout = setTimeout(() => {
            rollingBall.classList.remove('moving');
        }, 300);
    }
    
    // Динамическое изменение размера в зависимости от скорости скролла
    if (Math.abs(scrollDelta) > 5 && rollingBall.classList.contains('visible')) {
        const scale = 1 + Math.min(Math.abs(scrollDelta) / 100, 0.2);
        rollingBall.style.transform = `scale(${scale})`;
    } else {
        rollingBall.style.transform = 'scale(1)';
    }
    
    lastScrollY = currentScrollY;
}

// Throttle для оптимизации
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        window.requestAnimationFrame(() => {
            updateRollingBall();
            scrollTimeout = null;
        });
        scrollTimeout = true;
    }
}, { passive: true });

// Инициализация при загрузке
window.addEventListener('load', () => {
    targetSection = findTargetSection();
    updateRollingBall();
});

// Обновление при изменении размера окна
window.addEventListener('resize', () => {
    updateRollingBall();
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🎓 Правда о Гимназии №18', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cЭтот сайт создан для информирования общественности о проблемах в системе образования.', 'font-size: 12px; color: #6b7280;');


