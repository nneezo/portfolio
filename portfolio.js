// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // TYPING EFFECT
    
    const words = ["HI! I'M DENZEN"];
    const typingSpeed = 90;
    const deletingSpeed = 60;
    const pauseAfterTyping = 1400;
    const pauseAfterDeleting = 600;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingElement = document.querySelector(".typing-text");

    function typeLoop() {
        const currentWord = words[wordIndex];

        if (!isDeleting) {
            typingElement.textContent = currentWord.slice(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                return setTimeout(() => {
                    isDeleting = true;
                    typeLoop();
                }, pauseAfterTyping);
            }
        } else {
            typingElement.textContent = currentWord.slice(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;

                return setTimeout(() => {
                    typeLoop();
                }, pauseAfterDeleting);
            }
        }

        const delay = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeLoop, delay);
    }

    typeLoop();
    
    // PREMIUM MOBILE NAVIGATION WITH BLUR OVERLAY
    
    const hamburger = document.querySelector('.hamburger');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const navBlurOverlay = document.querySelector('.nav-blur-overlay');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-overlay .nav-item');
    
    if (hamburger && mobileNavOverlay) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
            if (navBlurOverlay) navBlurOverlay.classList.toggle('active');
            
            // Prevent background scrolling when menu is open
            if (this.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when blur overlay is clicked
        if (navBlurOverlay) {
            navBlurOverlay.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                navBlurOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close menu when nav item is clicked
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                if (navBlurOverlay) navBlurOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on ESC key press
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                if (navBlurOverlay) navBlurOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // SMOOTH SCROLL NAVIGATION
    
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offset = 80;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // PARALLAX EFFECT FOR HERO SECTION
    
    const hero = document.querySelector('.hero');
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                    hero.style.opacity = 1 - scrolled / 600;
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    fadeInSections.forEach(section => {
        observer.observe(section);
    });
    
    // CARD ANIMATIONS ON SCROLL
    
    const cardObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'scaleIn 0.6s ease-out forwards';
                    cardObserver.unobserve(entry.target);
                }, index * 100);
            }
        });
    }, cardObserverOptions);
    
    const allCards = document.querySelectorAll('.card-hover, .design-card, .reel, .estate-video');
    allCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // ANIMATE CONTACT ITEMS ON LOAD
    
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
    
    // HOVER EFFECTS FOR VIDEO THUMBNAILS
    
    const videoElements = document.querySelectorAll('.reel, .estate-video');
    
    videoElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // SCROLL PROGRESS TRACKING
    
    let scrollProgress = 0;
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        scrollProgress = (window.pageYOffset / documentHeight) * 100;
    });
    
    // PAGE LOAD ANIMATION
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // KEYBOARD NAVIGATION (ACCESSIBILITY)
    
    navItems.forEach(item => {
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // RESPONSIVE NAVIGATION FOR MOBILE
    
    function handleResize() {
        const width = window.innerWidth;
        
        if (width > 1024) {
            if (hamburger) {
                hamburger.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                if (navBlurOverlay) navBlurOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });
    
    handleResize();
    
    // SOFTWARE ITEM ANIMATIONS
    
    const softwareItems = document.querySelectorAll('.software-item');
    
    const softwareObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'slideInFromRight 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                    softwareObserver.unobserve(entry.target);
                }, index * 100);
            }
        });
    }, observerOptions);
    
    softwareItems.forEach(item => {
        item.style.opacity = '0';
        softwareObserver.observe(item);
    });
    
    // SMOOTH IFRAME LOADING
    
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.5s ease';
        });
        
        iframe.style.opacity = '0';
    });
    
    // LAZY LOADING FOR IMAGES
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ACTIVE SECTION HIGHLIGHTING
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active-nav');
                    if (item.getAttribute('data-target') === sectionId) {
                        item.classList.add('active-nav');
                    }
                });
            }
        });
    }
    
    let scrollTicking = false;
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            window.requestAnimationFrame(function() {
                highlightNavigation();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });
    
    // HORIZONTAL SCROLL CAROUSEL - MOUSE DRAG FUNCTIONALITY
    
    function enableDragScroll(container) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            container.style.userSelect = 'none';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Apply drag scrolling to all carousel containers
    const reelsGrid = document.querySelector('.reels-grid');
    const estateGrid = document.querySelector('.estate-grid');
    const designsGrid = document.querySelector('.designs-grid');
    
    if (reelsGrid) enableDragScroll(reelsGrid);
    if (estateGrid) enableDragScroll(estateGrid);
    if (designsGrid) enableDragScroll(designsGrid);
    
    // Prevent click events after drag
    function preventClickAfterDrag(container) {
        let dragging = false;
        
        container.addEventListener('mousedown', () => {
            dragging = false;
        });
        
        container.addEventListener('mousemove', () => {
            dragging = true;
        });
        
        container.addEventListener('click', (e) => {
            if (dragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    }
    
    if (reelsGrid) preventClickAfterDrag(reelsGrid);
    if (estateGrid) preventClickAfterDrag(estateGrid);
    if (designsGrid) preventClickAfterDrag(designsGrid);
    
    // CAROUSEL BUTTON CONTROLS
    const scrollLeftBtn = document.getElementById('reelsScrollLeft');
    const scrollRightBtn = document.getElementById('reelsScrollRight');
    
    if (scrollLeftBtn && reelsGrid) {
        scrollLeftBtn.addEventListener('click', function() {
            const scrollAmount = reelsGrid.offsetWidth * 0.8;
            reelsGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    if (scrollRightBtn && reelsGrid) {
        scrollRightBtn.addEventListener('click', function() {
            const scrollAmount = reelsGrid.offsetWidth * 0.8;
            reelsGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
});

// PREVENT DEFAULT BEHAVIOR ON CERTAIN ELEMENTS

document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        // Optionally prevent right-click on images
    }
});

// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS

if (!('scrollBehavior' in document.documentElement.style)) {
    const links = document.querySelectorAll('.nav-item');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const target = document.getElementById(targetId);
            
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

// RESPONSIVE VIDEO ASPECT RATIO MAINTENANCE

function maintainAspectRatios() {
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    
    videoWrappers.forEach(wrapper => {
        const iframe = wrapper.querySelector('iframe');
        if (iframe) {
            iframe.style.width = '100%';
            iframe.style.height = '100%';
        }
    });
}

window.addEventListener('load', maintainAspectRatios);

let resizeAspectTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeAspectTimer);
    resizeAspectTimer = setTimeout(maintainAspectRatios, 250);
});

// BROWSER COMPATIBILITY CHECKS

function checkBackdropFilterSupport() {
    const testElement = document.createElement('div');
    testElement.style.backdropFilter = 'blur(10px)';
    
    if (!testElement.style.backdropFilter) {
        document.body.classList.add('no-backdrop-filter');
        console.warn('Backdrop filter not supported. Using fallback styles.');
    }
}

checkBackdropFilterSupport();

// CONSOLE EASTER EGG

console.log('%c👋 Welcome to Denzen\'s Portfolio!', 'color: #fff; background: #000; font-size: 20px; padding: 10px;');
console.log('%cVideo Editor • Graphic Designer', 'color: #666; font-size: 12px;');
console.log('%cInterested in working together? Let\'s connect!', 'color: #333; font-size: 14px;');

// BACK TO TOP LOGIC

const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// DYNAMIC NAVIGATION COLOR CHANGE BASED ON BACKGROUND

function updateNavigationColors() {
    const quoteText = document.querySelector('.quote-text');
    const topNav = document.querySelector('.top-nav');
    const hamburger = document.querySelector('.hamburger');
    
    const lightSections = [
        document.querySelector('.hero'),
        document.querySelector('.short-reels'),
        document.querySelector('.graphic-designs')
    ];
    
    function checkBackground(element) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + (rect.height / 2);
        
        for (const section of lightSections) {
            if (!section) continue;
            
            const sectionRect = section.getBoundingClientRect();
            if (elementCenter >= sectionRect.top && elementCenter <= sectionRect.bottom) {
                return true;
            }
        }
        return false;
    }
    
    if (quoteText) {
        if (checkBackground(quoteText)) {
            quoteText.classList.add('on-light');
        } else {
            quoteText.classList.remove('on-light');
        }
    }
    
    if (topNav) {
        if (checkBackground(topNav)) {
            topNav.classList.add('on-light');
        } else {
            topNav.classList.remove('on-light');
        }
    }
    
    if (hamburger) {
        if (checkBackground(hamburger)) {
            hamburger.classList.add('on-light');
        } else {
            hamburger.classList.remove('on-light');
        }
    }
}

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        updateNavigationColors();
    });
});

window.addEventListener('load', updateNavigationColors);
window.addEventListener('resize', updateNavigationColors);

/* Subtle Cursor-Reactive Background Particles */

class CursorParticles {
    constructor(options = {}) {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        // Configuration
        this.config = {
            particleCount: options.particleCount || 80,
            maxDistance: options.maxDistance || 150,
            repelForce: options.repelForce || 0.3,
            particleSize: options.particleSize || 1.5,
            particleOpacity: options.particleOpacity || 0.15,
            lineOpacity: options.lineOpacity || 0.08,
            particleColor: options.particleColor || '#d4a74a',
            lineColor: options.lineColor || '#d4a74a',
            returnSpeed: options.returnSpeed || 0.05,
            enableLines: options.enableLines !== false,
            enableMobile: options.enableMobile || false
        };
        
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Don't initialize on mobile unless explicitly enabled
        if (this.isMobile && !this.config.enableMobile) {
            return;
        }
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '1';
        
        document.body.prepend(this.canvas);
        
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.resize();
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                originalX: 0,
                originalY: 0,
                vx: 0,
                vy: 0,
                size: this.config.particleSize * (0.5 + Math.random() * 0.5)
            });
        }
        
        // Store original positions
        this.particles.forEach(p => {
            p.originalX = p.x;
            p.originalY = p.y;
        });
    }
    
    bindEvents() {
        // Mouse/touch move
        const handleMove = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = (e.clientX || e.touches?.[0]?.clientX || 0) - rect.left;
            this.mouse.y = (e.clientY || e.touches?.[0]?.clientY || 0) - rect.top;
        };
        
        window.addEventListener('mousemove', handleMove, { passive: true });
        window.addEventListener('touchmove', handleMove, { passive: true });
        
        // Resize
        window.addEventListener('resize', () => this.resize(), { passive: true });
        
        // Visibility change - pause when tab hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }
    
    resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx.scale(dpr, dpr);
        
        // Reposition particles proportionally
        this.particles.forEach(p => {
            const ratioX = p.originalX / (rect.width || 1);
            const ratioY = p.originalY / (rect.height || 1);
            
            p.originalX = ratioX * rect.width;
            p.originalY = ratioY * rect.height;
            p.x = p.originalX;
            p.y = p.originalY;
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Calculate distance to mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Apply repel force if within range
            if (distance < this.config.maxDistance) {
                const force = (this.config.maxDistance - distance) / this.config.maxDistance;
                const angle = Math.atan2(dy, dx);
                
                particle.vx -= Math.cos(angle) * force * this.config.repelForce;
                particle.vy -= Math.sin(angle) * force * this.config.repelForce;
            }
            
            // Return to original position
            particle.vx += (particle.originalX - particle.x) * this.config.returnSpeed;
            particle.vy += (particle.originalY - particle.y) * this.config.returnSpeed;
            
            // Apply friction
            particle.vx *= 0.92;
            particle.vy *= 0.92;
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
        });
    }
    
    drawParticles() {
        const rect = this.canvas.getBoundingClientRect();
        
        this.ctx.clearRect(0, 0, rect.width, rect.height);
        
        // Draw connecting lines first (behind particles)
        if (this.config.enableLines) {
            this.ctx.strokeStyle = this.config.lineColor;
            this.ctx.lineWidth = 0.5;
            
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        const opacity = (1 - distance / 120) * this.config.lineOpacity;
                        this.ctx.globalAlpha = opacity;
                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.stroke();
                    }
                }
            }
        }
        
        // Draw particles
        this.ctx.fillStyle = this.config.particleColor;
        this.ctx.globalAlpha = this.config.particleOpacity;
        
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1;
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    resume() {
        if (!this.animationId) {
            this.animate();
        }
    }
    
    destroy() {
        this.pause();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        this.particles = [];
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cursorParticles = new CursorParticles({
            particleCount: 150,
            maxDistance: 150,
            repelForce: 0.3,
            particleSize: 3,
            particleOpacity: 0.15,
            lineOpacity: 0.08,
            particleColor: '#d4a74a',
            lineColor: '#d4a74a',
            returnSpeed: 0.05,
            enableLines: true,
            enableMobile: false
        });
    });
} else {
    window.cursorParticles = new CursorParticles({
        particleCount: 150,
        maxDistance: 150,
        repelForce: 0.3,
        particleSize: 3,
        particleOpacity: 0.15,
        lineOpacity: 0.08,
        particleColor: '#d4a74a',
        lineColor: '#d4a74a',
        returnSpeed: 0.05,
        enableLines: true,
        enableMobile: false
    });
}
