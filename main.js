/* =========================================================
   SARANGA NUWAN HATHURUSINGHE — Portfolio JS
   ========================================================= */

// ─── NAVBAR SCROLL EFFECT ───────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ─── MOBILE NAV TOGGLE ──────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// ─── TYPEWRITER ─────────────────────────────────────────
// Roles to cycle through
const roles = [
  'Data Analyst',
  'Machine Learning',
  'Data Visualization',
  'Cryptography Enthusiast',
  'Video Editing',
  'Motion Graphics',
  'Problem Solve'
];

(function startTypewriter() {
  var el = document.getElementById('typewriterText');
  if (!el) return;

  var roleIndex  = 0;
  var charIndex  = 0;
  var isDeleting = false;

  function tick() {
    var word = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = word.substring(0, charIndex);
      if (charIndex === word.length) {
        isDeleting = true;
        setTimeout(tick, 1800);   // pause at full word
      } else {
        setTimeout(tick, 70);     // typing speed
      }
    } else {
      charIndex--;
      el.textContent = word.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, 350);    // pause before next word
      } else {
        setTimeout(tick, 38);     // deleting speed
      }
    }
  }

  // Kick off immediately — script is at end of body so DOM is ready
  tick();
})();

// ─── SCROLL REVEAL ──────────────────────────────────────
var revealEls = document.querySelectorAll(
  '.cert-card, .edu-card, .contact-card, .project-card, .about-card, .about-text'
);
revealEls.forEach(function(el) { el.classList.add('reveal'); });

var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var siblings = Array.from(entry.target.parentElement.children);
      var idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 80) + 'ms';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(function(el) { revealObserver.observe(el); });

// ─── ACTIVE NAV HIGHLIGHT ───────────────────────────────
var sections   = document.querySelectorAll('section[id]');
var navAnchors = document.querySelectorAll('.nav-links a');

var sectionObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var id = entry.target.getAttribute('id');
      navAnchors.forEach(function(a) {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + id) {
          a.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.2 });

sections.forEach(function(s) { sectionObserver.observe(s); });

// ─── MARQUEE TOUCH PAUSE ────────────────────────────────
var track = document.getElementById('marqueeTrack');
if (track) {
  track.addEventListener('touchstart', function() {
    track.style.animationPlayState = 'paused';
  }, { passive: true });
  track.addEventListener('touchend', function() {
    track.style.animationPlayState = 'running';
  }, { passive: true });
}

// ─── SMOOTH ANCHOR SCROLL ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: 'smooth'
    });
  });
});

// ─── CARD TILT (desktop only) ───────────────────────────
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.cert-card, .edu-card, .project-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var r  = card.getBoundingClientRect();
      var rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -4;
      var ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  4;
      card.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });
}