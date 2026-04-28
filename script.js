/* ============================================
   RajBerry · SOC Analyst Portfolio
   script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     1. CUSTOM CURSOR
  ────────────────────────────────────────── */
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth ring follow
  function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  // Scale cursor on interactive elements
  const interactives = document.querySelectorAll('a, button, .skill-card, .tool-badge, .cert-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform     = 'translate(-50%, -50%) scale(1.8)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorRing.style.opacity   = '0.8';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform     = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.opacity   = '0.5';
    });
  });


  /* ──────────────────────────────────────────
     2. TYPEWRITER EFFECT
  ────────────────────────────────────────── */
  const phrases = [
    'Security Operations Center Analyst',
    'Threat Detection Specialist',
    'Log Analysis Expert',
    'Incident Response Handler',
    'Cybersecurity Enthusiast',
  ];

  const tw = document.getElementById('typewriter');
  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  function type() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      tw.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      tw.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        isDeleting    = false;
        phraseIndex   = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(type, isDeleting ? 38 : 78);
  }

  type();


  /* ──────────────────────────────────────────
     3. MOBILE NAV TOGGLE
  ────────────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
      });
    });
  }


  /* ──────────────────────────────────────────
     4. SCROLL ANIMATIONS (Intersection Observer)
  ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.skill-card, .tool-badge, .cert-card, .timeline-item, .about-terminal'
  );

  revealEls.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings
        const siblings = [...entry.target.parentElement.children];
        const delay    = siblings.indexOf(entry.target) * 80;
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ──────────────────────────────────────────
     5. ACTIVE NAV HIGHLIGHT ON SCROLL
  ────────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--green)';
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObserver.observe(s));


  /* ──────────────────────────────────────────
     6. CONTACT FORM BUTTON
  ────────────────────────────────────────── */
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      sendBtn.textContent         = 'MESSAGE SENT ✓';
      sendBtn.style.background    = 'var(--cyan)';
      sendBtn.style.pointerEvents = 'none';
      setTimeout(() => {
        sendBtn.textContent         = 'SEND MESSAGE';
        sendBtn.style.background    = 'var(--green)';
        sendBtn.style.pointerEvents = 'auto';
      }, 3000);
    });
  }


  /* ──────────────────────────────────────────
     7. NAVBAR SHADOW ON SCROLL
  ────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });


  /* ──────────────────────────────────────────
     8. TYPING EFFECT IN TERMINAL (auto-loop)
  ────────────────────────────────────────── */
  const terminalLines = [
    '▸ Threat Detection & Triage',
    '▸ SIEM Alert Investigation',
    '▸ Network Traffic Analysis',
    '▸ Incident Documentation',
    '▸ Phishing Analysis',
  ];

  // Static render — lines already in HTML; no extra JS needed here.
  // Placeholder for future dynamic terminal if needed.

}); // end DOMContentLoaded
