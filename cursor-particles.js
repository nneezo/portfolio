/**
 * Subtle Cursor-Reactive Background Particles
 * Standalone version - guaranteed to work
 */

(function() {
    'use strict';

    class CursorParticles {
        constructor(options = {}) {
            this.canvas = null;
            this.ctx = null;
            this.particles = [];
            this.mouse = { x: 0, y: 0 };
            this.animationId = null;
            
            // Configuration
            this.config = {
                particleCount: options.particleCount || 250,
                maxDistance: options.maxDistance || 150,
                repelForce: options.repelForce || 0.3,
                particleSize: options.particleSize || 3,
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
                console.log('Cursor particles disabled on mobile');
                return;
            }
            
            this.init();
        }
        
        init() {
            console.log('Initializing cursor particles...');
            this.createCanvas();
            this.createParticles();
            this.bindEvents();
let __particlesStarted = false;
function __startParticles(){
  if (__particlesStarted) return;
  __particlesStarted = true;
  animate();
}
window.addEventListener('pointermove', __startParticles, { once: true, passive: true });
window.addEventListener('touchstart', __startParticles, { once: true, passive: true });
// If user never interacts, start after a short delay so desktop still shows effect
setTimeout(__startParticles, 1500);
            console.log('Cursor particles initialized successfully!');
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
          if (!this.canvas || !this.ctx) return;
        
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
        
          // Use viewport size (more stable on mobile than getBoundingClientRect in early load)
          const cssW = document.documentElement.clientWidth;
          const cssH = document.documentElement.clientHeight;
        
          // Set actual pixel size
          this.canvas.width = Math.floor(cssW * dpr);
          this.canvas.height = Math.floor(cssH * dpr);
        
          // Keep CSS size
          this.canvas.style.width = cssW + "px";
          this.canvas.style.height = cssH + "px";
        
          // IMPORTANT: reset transform so scale does NOT stack
          this.ctx.setTransform(1, 0, 0, 1, 0, 0);
          this.ctx.scale(dpr, dpr);
        
          // Reposition particles proportionally (keep your logic, just based on cssW/cssH)
          const w = cssW || 1;
          const h = cssH || 1;
        
          this.particles.forEach(p => {
            const ratioX = p.originalX / w;
            const ratioY = p.originalY / h;
        
            p.originalX = ratioX * w;
            p.originalY = ratioY * h;
            p.x = p.originalX;
            p.y = p.originalY;
          });
        } 
        
        // Mobile rotation + returning to tab can cause "blank until switch apps" issue
        window.addEventListener('orientationchange', () => {
        setTimeout(() => this.resize(), 250);
        }, { passive: true });
        
        // When coming back to the tab/app, force resize + redraw
        window.addEventListener('pageshow', () => {
        setTimeout(() => this.resize(), 150);
        }, { passive: true });
        
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
                const w = document.documentElement.clientWidth;
                const h = document.documentElement.clientHeight;
                
                this.ctx.clearRect(0, 0, w, h);
            
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
    function initParticles() {
        console.log('Starting cursor particles initialization...');
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

    // Initialize based on document state
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParticles);
    } else {
        // DOM already loaded
        initParticles();
    }

})();
