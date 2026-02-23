(function () {
  "use strict";

  const reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const canvas = document.createElement("canvas");
  canvas.id = "bgNetworkCanvas";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d", { alpha: true });

  let cssW = 0,
    cssH = 0,
    dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cssW = document.documentElement.clientWidth;
    cssH = document.documentElement.clientHeight;

    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  const mouse = { x: 0, y: 0, active: false };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener("mouseleave", () => {
    mouse.active = false;
  });

  const isSmall =
    window.matchMedia && window.matchMedia("(max-width: 768px)").matches;

  const cfg = {
    particleCount: isSmall ? 55 : 90,
    maxLineDist: isSmall ? 130 : 170,
    particleLinkDist: isSmall ? 80 : 110,
    particleSpeed: 0.25,
    fadeOverlayAlpha: 0.06,
  };

  const particles = [];
  for (let i = 0; i < cfg.particleCount; i++) {
    particles.push({
      x: Math.random() * cssW,
      y: Math.random() * cssH,
      vx: (Math.random() * 2 - 1) * cfg.particleSpeed,
      vy: (Math.random() * 2 - 1) * cfg.particleSpeed,
      r: 1 + Math.random() * 2,
    });
  }

  function wrap(p) {
    if (p.x < -20) p.x = cssW + 20;
    if (p.x > cssW + 20) p.x = -20;
    if (p.y < -20) p.y = cssH + 20;
    if (p.y > cssH + 20) p.y = -20;
  }

  function dist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function drawLine(ax, ay, bx, by, alpha) {
    ctx.strokeStyle = `rgba(212, 167, 74, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.fillStyle = `rgba(0,0,0,${cfg.fadeOverlayAlpha})`;
    ctx.fillRect(0, 0, cssW, cssH);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      wrap(p);

      ctx.fillStyle = "rgba(212, 167, 74, 0.25)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (mouse.active) {
      for (const p of particles) {
        const d = dist(mouse.x, mouse.y, p.x, p.y);
        if (d < cfg.maxLineDist) {
          const alpha = (1 - d / cfg.maxLineDist) * 0.45;
          drawLine(mouse.x, mouse.y, p.x, p.y, alpha);
        }
      }
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const d = dist(a.x, a.y, b.x, b.y);
        if (d < cfg.particleLinkDist) {
          const alpha = (1 - d / cfg.particleLinkDist) * 0.12;
          drawLine(a.x, a.y, b.x, b.y, alpha);
        }
      }
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
