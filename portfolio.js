// portfolio.js

document.addEventListener('DOMContentLoaded', function () {
  // SEE MORE (To Impress -> Work)
  const seeMoreBtn = document.getElementById('seeMoreBtn');
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', () => {
      const workSection = document.getElementById('work');
      if (workSection) workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // TYPING EFFECT
  const words = ["HI! I'M DENZEN"];
  const typingSpeed = 90;
  const deletingSpeed = 60;
  const pauseAfterTyping = 1400;
  const pauseAfterDeleting = 600;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingElement = document.querySelector('.typing-text');

  function typeLoop() {
    if (!typingElement) return;

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

  if (typingElement) typeLoop();

  // MOBILE NAVIGATION + BLUR OVERLAY
  const hamburger = document.querySelector('.hamburger');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const navBlurOverlay = document.querySelector('.nav-blur-overlay');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-overlay .nav-item');

  if (hamburger && mobileNavOverlay) {
    hamburger.addEventListener('click', function () {
      this.classList.toggle('active');
      mobileNavOverlay.classList.toggle('active');
      if (navBlurOverlay) navBlurOverlay.classList.toggle('active');

      document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
    });

    if (navBlurOverlay) {
      navBlurOverlay.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        navBlurOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    mobileNavItems.forEach((item) => {
      item.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        if (navBlurOverlay) navBlurOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function (e) {
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
  navItems.forEach((item) => {
    item.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offset = 80;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });

    item.addEventListener('keypress', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // PARALLAX
  const hero = document.querySelector('.hero');
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobileWidth = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

  let parallaxTicking = false;

  window.addEventListener(
    'scroll',
    function () {
      if (prefersReducedMotion || isMobileWidth) return;
      if (parallaxTicking) return;

      parallaxTicking = true;

      window.requestAnimationFrame(function () {
        const scrolled = window.pageYOffset;

        if (hero) {
          hero.style.transform = `translateY(${scrolled * 0.5}px)`;
          hero.style.opacity = String(1 - scrolled / 600);
        }

        parallaxTicking = false;
      });
    },
    { passive: true }
  );

  // INTERSECTION OBSERVER FOR FADE-IN SECTIONS
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };

  const sectionObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section').forEach((section) => sectionObserver.observe(section));

  // CARD ANIMATIONS ON SCROLL
  const cardObserver = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.animation = 'scaleIn 0.6s ease-out forwards';
            obs.unobserve(entry.target);
          }, index * 100);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px' }
  );

  document
    .querySelectorAll('.card-hover, .design-card, .reel, .estate-video')
    .forEach((card) => cardObserver.observe(card));

  // CONTACT ITEMS ANIMATE IN
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

  // VIDEO HOVER EFFECTS (desktop)
  const videoElements = document.querySelectorAll('.reel, .estate-video');
  videoElements.forEach((el) => {
    el.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    el.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // PAGE LOAD FADE IN
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 80);

  // RESPONSIVE NAV RESET
  function handleResize() {
    const width = window.innerWidth;
    if (width > 1024 && hamburger && mobileNavOverlay) {
      hamburger.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      if (navBlurOverlay) navBlurOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  });
  handleResize();

  // SOFTWARE ITEM ANIMATIONS
  const softwareItems = document.querySelectorAll('.software-item');
  const softwareObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = 'slideInFromRight 0.6s ease-out forwards';
          entry.target.style.opacity = '1';
          obs.unobserve(entry.target);
        }, index * 100);
      }
    });
  }, observerOptions);

  softwareItems.forEach((item) => {
    item.style.opacity = '0';
    softwareObserver.observe(item);
  });

  // IFRAME FADE IN ON LOAD
  document.querySelectorAll('iframe').forEach((iframe) => {
    iframe.style.opacity = '0';
    iframe.addEventListener('load', function () {
      this.style.transition = 'opacity 0.5s ease';
      this.style.opacity = '1';
    });
  });

  // LAZY LOAD VIMEO IFRAMES
  (function lazyLoadVimeo() {
    const vimeoIframes = Array.from(document.querySelectorAll('iframe.lazy-vimeo[data-src]'));
    if (!vimeoIframes.length) return;

    const loadIframe = (iframe) => {
      if (!iframe || iframe.dataset.loaded) return;
      const src = iframe.getAttribute('data-src');
      if (!src) return;
      iframe.setAttribute('src', src);
      iframe.dataset.loaded = '1';
    };

    if (!('IntersectionObserver' in window)) {
      loadIframe(vimeoIframes[0]);
      setTimeout(() => vimeoIframes.slice(1).forEach(loadIframe), 800);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadIframe(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '300px 0px' }
    );

    vimeoIframes.forEach((iframe) => io.observe(iframe));
  })();

  // ACTIVE SECTION HIGHLIGHTING
  const sections = document.querySelectorAll('section[id]');
  function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-item').forEach((item) => {
          item.classList.remove('active-nav');
          if (item.getAttribute('data-target') === sectionId) item.classList.add('active-nav');
        });
      }
    });
  }

  let navTicking = false;
  window.addEventListener(
    'scroll',
    function () {
      if (navTicking) return;
      navTicking = true;
      window.requestAnimationFrame(function () {
        highlightNavigation();
        navTicking = false;
      });
    },
    { passive: true }
  );

  // DRAG SCROLL + BUTTONS (WORK CAROUSEL ONLY)
  function enableDragScroll(container) {
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
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

    const endDrag = () => {
      isDown = false;
      container.style.cursor = 'grab';
      container.style.userSelect = '';
      container.querySelectorAll('iframe').forEach((f) => (f.style.pointerEvents = 'auto'));
    };

    container.addEventListener('mouseup', endDrag);
    container.addEventListener('mouseleave', endDrag);

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      hasDragged = true;

      container.querySelectorAll('iframe').forEach((f) => (f.style.pointerEvents = 'none'));

      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener(
      'click',
      (e) => {
        if (hasDragged) {
          e.preventDefault();
          e.stopPropagation();
          hasDragged = false;
        }
      },
      true
    );

    // Touch support
    let touchStartX = 0;
    let touchScrollLeft = 0;

    container.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = container.scrollLeft;
      },
      { passive: true }
    );

    container.addEventListener(
      'touchmove',
      (e) => {
        const touchX = e.touches[0].pageX;
        const walk = (touchStartX - touchX) * 1.5;
        container.scrollLeft = touchScrollLeft + walk;
      },
      { passive: true }
    );
  }

  const reelsGrid = document.querySelector('#work .reels-grid');
  const scrollLeftBtn = document.getElementById('reelsScrollLeft');
  const scrollRightBtn = document.getElementById('reelsScrollRight');

  if (reelsGrid) enableDragScroll(reelsGrid);

  if (scrollLeftBtn && reelsGrid) {
    scrollLeftBtn.addEventListener('click', function () {
      const scrollAmount = reelsGrid.clientWidth * 0.8;
      reelsGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (scrollRightBtn && reelsGrid) {
    scrollRightBtn.addEventListener('click', function () {
      const scrollAmount = reelsGrid.clientWidth * 0.8;
      reelsGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}); // ✅ IMPORTANT: closes DOMContentLoaded

// PREVENT IMAGE DRAG
document.addEventListener('dragstart', function (e) {
  if (e.target && e.target.tagName === 'IMG') e.preventDefault();
});

// BACKDROP FILTER SUPPORT CHECK
function checkBackdropFilterSupport() {
  const testElement = document.createElement('div');
  testElement.style.backdropFilter = 'blur(10px)';
  if (!testElement.style.backdropFilter) {
    document.body.classList.add('no-backdrop-filter');
  }
}
checkBackdropFilterSupport();

// BACK TO TOP BUTTON
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 300) backToTopBtn.classList.add('show');
      else backToTopBtn.classList.remove('show');
    },
    { passive: true }
  );

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// NAV COLOR UPDATE
function updateNavigationColors() {
  const quoteText = document.querySelector('.quote-text');
  const topNav = document.querySelector('.top-nav');
  const hamburger = document.querySelector('.hamburger');

  const lightSections = [
    document.querySelector('.hero'),
    document.querySelector('.short-reels'),
    document.querySelector('.graphic-designs'),
  ];

  function checkBackground(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;

    for (const section of lightSections) {
      if (!section) continue;
      const sectionRect = section.getBoundingClientRect();
      if (elementCenter >= sectionRect.top && elementCenter <= sectionRect.bottom) return true;
    }
    return false;
  }

  if (quoteText) quoteText.classList.toggle('on-light', checkBackground(quoteText));
  if (topNav) topNav.classList.toggle('on-light', checkBackground(topNav));
  if (hamburger) hamburger.classList.toggle('on-light', checkBackground(hamburger));
}

window.addEventListener('load', updateNavigationColors);
window.addEventListener('resize', updateNavigationColors);
window.addEventListener(
  'scroll',
  () => {
    window.requestAnimationFrame(updateNavigationColors);
  },
  { passive: true }
);
