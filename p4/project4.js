/* =========================================================
   PROJECT 4 PAGE JS
   Runs after project.js (navbar, mobile nav, reveal for shared classes)
   ========================================================= */

// ─── SCROLL REVEAL FOR PROJECT 4 ELEMENTS ───────────────
var p4RevealEls = document.querySelectorAll(
  '.p4-poster-wrap, .p4-proto-card, .p4-photo, .p4-member'
);
p4RevealEls.forEach(function(el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
});

var p4Observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var siblings = Array.from(entry.target.parentElement.children);
      var idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 80) + 'ms';
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      p4Observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

p4RevealEls.forEach(function(el) { p4Observer.observe(el); });

// Clear the stagger delay after the reveal so hover effects feel instant
p4RevealEls.forEach(function(el) {
  el.addEventListener('transitionend', function() {
    el.style.transitionDelay = '0ms';
    el.style.transition = '';
  }, { once: true });
});

// ─── LIGHTBOX ───────────────────────────────────────────
var lightbox      = document.getElementById('p4Lightbox');
var lightboxImg   = document.getElementById('p4LightboxImg');
var lightboxClose = document.getElementById('p4LightboxClose');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.p4-zoom').forEach(function(img) {
  img.addEventListener('click', function() {
    openLightbox(img.currentSrc || img.src, img.alt);
  });
});
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox || e.target === lightboxClose) closeLightbox();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});
