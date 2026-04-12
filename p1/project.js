/* =========================================================
   PROJECT PAGE JS
   ========================================================= */

// ─── NAVBAR ─────────────────────────────────────────────
var navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ─── MOBILE NAV ─────────────────────────────────────────
var navToggle = document.getElementById('navToggle');
var navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
  document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target)) {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// ─── COPY CODE BUTTON ───────────────────────────────────
function copyCode(btn) {
  var pre  = btn.closest('.code-block').querySelector('pre');
  var text = pre ? pre.innerText : '';
  navigator.clipboard.writeText(text).then(function() {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function() {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(function() {
    btn.textContent = 'Error';
    setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
  });
}

// ─── SCROLL REVEAL ──────────────────────────────────────
var revealEls = document.querySelectorAll(
  '.step-card, .dashboard-card, .result-card, .challenge-item, .proj-summary-box, .sql-screenshot-wrap, .demo-video-wrap, .demo-chapter'
);
revealEls.forEach(function(el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
});

var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var siblings = Array.from(entry.target.parentElement.children);
      var idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 80) + 'ms';
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(function(el) { observer.observe(el); });

// ─── CODE BLOCK SYNTAX HIGHLIGHT (simple keyword coloring) ──
document.querySelectorAll('.code-block code').forEach(function(block) {
  var sql_keywords = ['SELECT','FROM','WHERE','JOIN','LEFT','INNER','ON','AS',
    'GROUP','BY','ORDER','HAVING','CASE','WHEN','THEN','ELSE','END',
    'WITH','DISTINCT','COUNT','SUM','AVG','ROUND','YEAR','MONTH',
    'COALESCE','NULL','NOT','AND','OR','IN','LIKE','INSERT','UPDATE',
    'DELETE','CREATE','TABLE','INTO','VALUES','RETURN','VAR'];
  var dax_keywords = ['VAR','RETURN','CALCULATE','SUM','DIVIDE','FILTER',
    'ALL','ALLEXCEPT','SELECTEDVALUE','DISTINCTCOUNT','ISBLANK','IF',
    'YEAR','MONTH','RELATED','SUMX','COUNTROWS'];

  var text = block.innerHTML;

  // Colour SQL/DAX keywords
  var all_kw = [...new Set([...sql_keywords, ...dax_keywords])];
  all_kw.forEach(function(kw) {
    var re = new RegExp('\\b(' + kw + ')\\b', 'g');
    text = text.replace(re, '<span style="color:#89b4fa;font-weight:600">$1</span>');
  });

  // Colour strings
  text = text.replace(/('.*?')/g, '<span style="color:#a6e3a1">$1</span>');

  // Colour numbers
  text = text.replace(/\b(\d+(\.\d+)?)\b/g, '<span style="color:#fab387">$1</span>');

  // Colour comments
  text = text.replace(/(--.*)/g, '<span style="color:#585b70;font-style:italic">$1</span>');

  block.innerHTML = text;
});
