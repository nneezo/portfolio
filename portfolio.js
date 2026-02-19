document.addEventListener('DOMContentLoaded', function() {
    
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
    
     // HORIZONTAL SCROLL CAROUSEL - MOUSE DRAG FUNCTIONALITY (FIXED + TOUCH SUPPORT)

    function enableDragScroll(container) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let hasDragged = false;

        container.style.cursor = 'grab';

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            hasDragged = false;
            container.style.cursor = 'grabbing';
            container.style.userSelect = 'none';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
            container.querySelectorAll('iframe').forEach(f => f.style.pointerEvents = 'auto');
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
            container.querySelectorAll('iframe').forEach(f => f.style.pointerEvents = 'auto');
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            hasDragged = true;
            container.querySelectorAll('iframe').forEach(f => f.style.pointerEvents = 'none'); 
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
        // Prevent clicks on child elements after a drag
        container.addEventListener('click', (e) => {
            if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
                hasDragged = false;
            }
        }, true);
    
    if (reelsGrid) preventClickAfterDrag(reelsGrid);
    if (estateGrid) preventClickAfterDrag(estateGrid);
    if (designsGrid) preventClickAfterDrag(designsGrid);
    
    // CAROUSEL BUTTON CONTROLS
    const scrollLeftBtn = document.getElementById('reelsScrollLeft');
    const scrollRightBtn = document.getElementById('reelsScrollRight');
    
    if (scrollLeftBtn && reelsGrid) {
        scrollLeftBtn.addEventListener('click', function() {
            const scrollAmount = reelsGrid.offsetWidth * 0.01;
            reelsGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    if (scrollRightBtn && reelsGrid) {
        scrollRightBtn.addEventListener('click', function() {
            const scrollAmount = reelsGrid.offsetWidth * 0.01;
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
