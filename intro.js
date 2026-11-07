/* =========================================================
   INTRO — "Cursor Agents" build-in animation
   - Hero: plays on load (once per browser tab session).
   - Other sections: cursors build each element as you scroll
     to it (About, Skills, Projects, Certificates, Education,
     Contact).
   - A "Motion" button in the nav replays everything.
   - Self-contained: injects its own CSS, no libraries.
   - Skipped for anchor links (#projects) and for visitors who
     prefer reduced motion. Add ?intro to the URL to force it.
   ========================================================= */
(function () {
  'use strict';

  var KEY   = 'snhIntroPlayed';
  var html  = document.documentElement;
  var force = /[?&]intro(=|&|$)/.test(location.search);
  var played = false;
  try { played = sessionStorage.getItem(KEY) === '1'; } catch (e) {}
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var autoplay = force || !(played || location.hash || reduce);

  // ─── 1. CSS (always injected so the Motion button can replay) ───
  var css = `
  /* hero elements */
  html.ix-on .hero-bg-grid,
  html.ix-on nav.navbar,
  html.ix-on .hero-image-wrap,
  html.ix-on .hero-tag,
  html.ix-on .hero-name,
  html.ix-on .hero-typewriter,
  html.ix-on .hero-cta .btn-primary,
  html.ix-on .hero-cta .btn-outline,
  html.ix-on .hero-scroll-hint { opacity: 0 !important; filter: blur(8px) !important; }

  html.ix-on .ix-shown.ix-shown.ix-shown {
    opacity: 1 !important; filter: none !important;
    transition: opacity .7s ease, filter .7s ease !important;
  }

  /* other sections */
  .ix-pend { opacity: 0 !important; filter: blur(6px) !important; pointer-events: none; }
  .ix-pend.ix-go.ix-go {
    opacity: 1 !important; filter: none !important;
    transition: opacity .7s ease, filter .7s ease, transform .7s ease !important;
  }

  .ix-layer { position: fixed; inset: 0; z-index: 3000; pointer-events: none; overflow: hidden; }
  .ix-layer.ix-out { opacity: 0; transition: opacity .5s ease; }

  .ix-cur { position: absolute; left: 0; top: 0; will-change: transform; }
  .ix-cur svg { display: block; filter: drop-shadow(0 2px 4px rgba(0,0,0,.55)); }
  .ix-tag {
    position: absolute; left: 12px; top: 18px; white-space: nowrap;
    font: 700 10px/1 var(--font-mono, monospace); letter-spacing: .04em;
    padding: 4px 7px; border-radius: 4px; color: #04121a;
  }

  .ix-sel { position: absolute; border: 1px solid currentColor; box-sizing: border-box; }
  .ix-sel::before { content: ''; position: absolute; inset: 0; background: currentColor; opacity: .08; }
  .ix-h { position: absolute; width: 7px; height: 7px; background: #fff; border: 1px solid currentColor; box-sizing: border-box; }
  .ix-h:nth-child(1) { left: -4px;  top: -4px; }
  .ix-h:nth-child(2) { right: -4px; top: -4px; }
  .ix-h:nth-child(3) { left: -4px;  bottom: -4px; }
  .ix-h:nth-child(4) { right: -4px; bottom: -4px; }
  .ix-dim {
    position: absolute; left: 50%; top: 100%; transform: translate(-50%, 9px);
    font: 700 9px/1 var(--font-mono, monospace); padding: 3px 6px; border-radius: 3px;
    background: currentColor; white-space: nowrap;
  }
  .ix-dim span { color: #04121a; }

  .ix-prog {
    position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%);
    display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-radius: 999px;
    background: rgba(20,23,32,.88); border: 1px solid rgba(255,255,255,.1);
    -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
    font: 400 11px/1 var(--font-mono, monospace); color: #8a8fa8; white-space: nowrap;
  }
  .ix-prog b { color: #e8eaf0; font-weight: 700; }
  .ix-bar { width: 110px; height: 3px; border-radius: 3px; background: rgba(255,255,255,.1); overflow: hidden; }
  .ix-bar i { display: block; height: 100%; width: 0; background: linear-gradient(90deg, #00e5ff, #7c3aed); transition: width .3s ease; }

  .ix-skip {
    position: absolute; right: 20px; bottom: 22px; pointer-events: auto; cursor: pointer;
    font: 400 11px/1 var(--font-mono, monospace); letter-spacing: .08em; text-transform: uppercase;
    color: #8a8fa8; background: rgba(20,23,32,.88); border: 1px solid rgba(255,255,255,.1);
    padding: 10px 14px; border-radius: 999px; transition: .3s;
  }
  .ix-skip:hover { color: #00e5ff; border-color: #00e5ff; }

  .ix-motion {
    font-family: var(--font-mono, monospace); font-size: .72rem; letter-spacing: .1em;
    text-transform: uppercase; color: var(--accent, #00e5ff); background: transparent;
    border: 1px solid rgba(0,229,255,.35); padding: 7px 12px; border-radius: 999px;
    cursor: pointer; transition: .3s;
  }
  .ix-motion:hover { background: rgba(0,229,255,.1); }
  .ix-motion:disabled { opacity: .4; cursor: default; }

  @media (max-width: 640px) {
    .ix-skip { bottom: 72px; right: 16px; }
    .ix-bar { width: 70px; }
  }`;

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Hide hero elements immediately (prevents a flash before the animation)
  if (autoplay) html.classList.add('ix-on');

  // ─── 2. Data ────────────────────────────────────────────
  var TARGETS = [
    { q: '.hero-bg-grid',            box: false },
    { q: 'nav.navbar',               box: true  },
    { q: '.hero-image-wrap',         box: true  },
    { q: '.hero-tag',                box: true  },
    { q: '.hero-name',               box: true  },
    { q: '.hero-typewriter',         box: true  },
    { q: '.hero-cta .btn-primary',   box: true  },
    { q: '.hero-cta .btn-outline',   box: true  },
    { q: '.hero-scroll-hint',        box: true  }
  ];

  var AGENTS = [
    { n: 'Data Agent',   c: '#00e5ff' },
    { n: 'Design Agent', c: '#ff6b8b' },
    { n: 'Math Agent',   c: '#a78bfa' },
    { n: 'ML Agent',     c: '#6ee7b7' },
    { n: 'Motion Agent', c: '#ffd166' }
  ];

  var SEC_IDS = ['about', 'skills', 'projects', 'certificates', 'education', 'contact'];
  var SEC_SEL = ['.section-label', '.container > .section-title', '.about-text', '.about-card',
                 '.marquee-wrapper', '.project-card', '.cert-card', '.edu-card', '.contact-card'].join(',');

  // ─── 3. Helpers ─────────────────────────────────────────
  var done = false, playing = false;
  var layerEl = null, safetyTimer = null, motionBtn = null;

  function ease(p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function tween(d, fn, stop) {
    return new Promise(function (res) {
      var t0 = performance.now();
      (function f(t) {
        if (stop()) { res(); return; }
        var p = Math.min(1, (t - t0) / d);
        fn(p);
        if (p < 1) requestAnimationFrame(f); else res();
      })(t0);
    });
  }

  function place(cur) { cur.el.style.transform = 'translate3d(' + cur.x + 'px,' + cur.y + 'px,0)'; }

  function fly(cur, x, y, d, stop) {
    var x0 = cur.x, y0 = cur.y;
    var cx = (x0 + x) / 2 + (Math.random() - 0.5) * 240;
    var cy = (y0 + y) / 2 + (Math.random() - 0.5) * 240;
    return tween(d, function (p) {
      var e = ease(p), u = 1 - e;
      cur.x = u * u * x0 + 2 * u * e * cx + e * e * x;
      cur.y = u * u * y0 + 2 * u * e * cy + e * e * y;
      place(cur);
    }, stop);
  }

  function click(cur) {
    if (cur.svg.animate) {
      cur.svg.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(.75)' }, { transform: 'scale(1)' }],
        { duration: 240, easing: 'ease-out' }
      );
    }
  }

  function startPoint(i) {
    var W = window.innerWidth, H = window.innerHeight;
    return [[-60, -60], [W + 60, -40], [-60, H * 0.6], [W + 60, H + 40], [W * 0.5, -70]][i % 5];
  }

  function makeCursor(layer, i) {
    var a = AGENTS[i % AGENTS.length];
    var s = startPoint(i);
    var el = document.createElement('div');
    el.className = 'ix-cur';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML =
      '<svg width="18" height="24" viewBox="0 0 16 22"><path d="M0 0v17l4.6-4.3 3.1 7.1 2.6-1.1-3.1-7H15z" fill="' + a.c +
      '" stroke="#06080c" stroke-width="1.3" stroke-linejoin="round"/></svg>' +
      '<span class="ix-tag" style="background:' + a.c + '">' + a.n + '</span>';
    layer.appendChild(el);
    var cur = { el: el, svg: el.firstChild, x: s[0], y: s[1], c: a.c, start: s };
    place(cur);
    return cur;
  }

  // Shared: a cursor flies to an element, drags a selection box over it,
  // then the element is revealed.  ctx = { layer, stop(), reveal(el) }
  async function buildElement(ctx, cur, el, hasBox) {
    var r = el.getBoundingClientRect();
    var W = window.innerWidth, H = window.innerHeight;

    // off-screen by now (user scrolled past) -> just show it
    if (r.bottom < 20 || r.top > H - 20 || r.width < 2 || r.height < 2) { ctx.reveal(el); return; }

    if (!hasBox) {
      var tx = r.left + r.width  * (0.3 + Math.random() * 0.4);
      var ty = r.top  + r.height * (0.3 + Math.random() * 0.4);
      await fly(cur, tx, ty, 700, ctx.stop);
      if (ctx.stop()) return;
      click(cur);
      ctx.reveal(el);
      await sleep(200);
      return;
    }

    var pad = 6;
    var x  = Math.max(4, r.left - pad),  y  = Math.max(4, r.top - pad);
    var x2 = Math.min(W - 4, r.right + pad), y2 = Math.min(H - 4, r.bottom + pad);
    var w = x2 - x, h = y2 - y;
    if (w < 8 || h < 8) { ctx.reveal(el); return; }

    await fly(cur, x, y, 550 + Math.random() * 250, ctx.stop);
    if (ctx.stop()) return;
    click(cur);

    var box = document.createElement('div');
    box.className = 'ix-sel';
    box.style.color = cur.c;
    box.style.left = x + 'px';
    box.style.top = y + 'px';
    box.style.width = '0px';
    box.style.height = '0px';
    box.innerHTML = '<i class="ix-h"></i><i class="ix-h"></i><i class="ix-h"></i><i class="ix-h"></i>' +
                    '<div class="ix-dim"><span>' + Math.round(r.width) + ' &times; ' + Math.round(r.height) + '</span></div>';
    ctx.layer.insertBefore(box, cur.el);

    await sleep(100);
    var dur = Math.min(650, 320 + (w * h) / 3000);
    await tween(dur, function (p) {
      var e = ease(p);
      box.style.width  = (w * e) + 'px';
      box.style.height = (h * e) + 'px';
      cur.x = x + w * e;
      cur.y = y + h * e;
      place(cur);
    }, ctx.stop);
    if (ctx.stop()) { if (box.parentNode) box.parentNode.removeChild(box); return; }

    ctx.reveal(el);
    await sleep(260);
    box.style.transition = 'opacity .3s ease';
    box.style.opacity = '0';
    setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 350);
  }

  // ─── 4. Hero animation ──────────────────────────────────
  function isDone() { return done; }
  function onKey(e) { if (e.key === 'Escape') finish(); }

  function hardCleanup() {
    clearTimeout(safetyTimer);
    document.removeEventListener('keydown', onKey);
    html.classList.remove('ix-on');
    Array.prototype.forEach.call(document.querySelectorAll('.ix-shown'), function (el) { el.classList.remove('ix-shown'); });
    if (layerEl && layerEl.parentNode) layerEl.parentNode.removeChild(layerEl);
    layerEl = null;
    playing = false;
    if (motionBtn) motionBtn.disabled = false;
    kick(); // start building any sections that were waiting
  }

  var finishFn = null;
  function finish() { if (finishFn) finishFn(); }

  function run(isReplay) {
    var layers = [];
    TARGETS.forEach(function (t) {
      var el = document.querySelector(t.q);
      if (el) layers.push({ el: el, box: t.box });
    });
    if (!layers.length || (!isReplay && window.scrollY > 60)) { hardCleanup(); return; }

    done = false;
    playing = true;
    if (motionBtn) motionBtn.disabled = true;

    var total = layers.length, count = 0;

    layerEl = document.createElement('div');
    layerEl.className = 'ix-layer';
    layerEl.innerHTML =
      '<div class="ix-prog"><span class="ix-txt"></span><div class="ix-bar"><i></i></div></div>' +
      '<button type="button" class="ix-skip">Skip intro &rarr;</button>';
    document.body.appendChild(layerEl);
    var txt = layerEl.querySelector('.ix-txt');
    var bar = layerEl.querySelector('.ix-bar i');

    function progress(label) {
      txt.innerHTML = (label || (AGENTS.length + ' agents')) + ' &middot; <b>' + count + '</b> / ' + total + ' layers';
      bar.style.width = (count / total * 100) + '%';
    }
    progress();

    finishFn = function () {
      if (done) return;
      done = true;
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
      layers.forEach(function (L) { L.el.classList.add('ix-shown'); });
      if (layerEl) layerEl.classList.add('ix-out');
      setTimeout(hardCleanup, 800);
    };

    layerEl.querySelector('.ix-skip').addEventListener('click', finish);
    document.addEventListener('keydown', onKey);
    safetyTimer = setTimeout(finish, 12000);

    var ctx = {
      layer: layerEl,
      stop: isDone,
      reveal: function (el) { el.classList.add('ix-shown'); count++; progress(); }
    };

    var cursors = AGENTS.map(function (a, i) { return makeCursor(layerEl, i); });

    async function worker(cur, k) {
      var mine = layers.filter(function (_, i) { return i % cursors.length === k; });
      await sleep(k * 220);
      for (var i = 0; i < mine.length; i++) {
        if (done) return;
        await buildElement(ctx, cur, mine[i].el, mine[i].box);
      }
      if (done) return;
      await fly(cur, cur.start[0], cur.start[1], 650, isDone);
      if (cur.el.parentNode) cur.el.parentNode.removeChild(cur.el);
    }

    Promise.all(cursors.map(worker)).then(async function () {
      if (done) return;
      progress('&#10003; build complete');
      await sleep(550);
      finish();
    });
  }

  // ─── 5. Other sections: build as you scroll ─────────────
  var secObs = null, secLayer = null, secGen = 0;
  var queue = [], slots = [false, false, false, false, false], activeWorkers = 0;

  function showEl(el) {
    if (el.classList.contains('reveal')) el.classList.add('visible'); // keep main.js reveal in sync
    el.classList.add('ix-go');
    var g = secGen;
    setTimeout(function () {
      if (g === secGen) el.classList.remove('ix-pend', 'ix-go');
    }, 900);
  }

  function armSections() {
    if (!('IntersectionObserver' in window)) return;
    if (secObs) secObs.disconnect();
    secObs = new IntersectionObserver(onSecIntersect, {
      threshold: [0.05, 0.15, 0.3, 0.5],
      rootMargin: '0px 0px -6% 0px'
    });
    SEC_IDS.forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec) return;
      Array.prototype.forEach.call(sec.querySelectorAll(SEC_SEL), function (el) {
        el.classList.remove('ix-go');
        el.classList.add('ix-pend');
        secObs.observe(el);
      });
    });
  }

  function onSecIntersect(entries) {
    var H = window.innerHeight, fresh = [];
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      if (en.intersectionRatio < 0.15 && en.intersectionRect.height < H * 0.4) return;
      secObs.unobserve(en.target);
      fresh.push(en.target);
    });
    fresh.sort(function (a, b) {
      var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      return (ra.top - rb.top) || (ra.left - rb.left);
    });
    fresh.forEach(function (el) { queue.push(el); });
    kick();
  }

  function resetSections() {
    secGen++;
    queue = [];
    slots = [false, false, false, false, false];
    activeWorkers = 0;
    if (secLayer && secLayer.parentNode) secLayer.parentNode.removeChild(secLayer);
    secLayer = null;
  }

  function kick() {
    if (playing || !queue.length) return;
    if (!secLayer) {
      secLayer = document.createElement('div');
      secLayer.className = 'ix-layer';
      document.body.appendChild(secLayer);
    }
    var g = secGen, layer = secLayer;
    var ctx = {
      layer: layer,
      stop: function () { return g !== secGen; },
      reveal: showEl
    };
    var pending = queue.length;
    while (pending > 0 && activeWorkers < AGENTS.length) {
      var s = slots.indexOf(false);
      if (s < 0) break;
      slots[s] = true;
      activeWorkers++;
      pending--;
      secWorker(s, ctx, g, layer);
    }
  }

  async function secWorker(s, ctx, g, layer) {
    var cur = makeCursor(layer, s);
    try {
      while (queue.length && !ctx.stop()) {
        var el = queue.shift();
        try { await buildElement(ctx, cur, el, true); }
        catch (err) { showEl(el); }
      }
      if (!ctx.stop()) await fly(cur, cur.start[0], cur.start[1], 600, ctx.stop);
    } finally {
      if (cur.el.parentNode) cur.el.parentNode.removeChild(cur.el);
      if (g === secGen) {
        slots[s] = false;
        activeWorkers--;
        if (queue.length) kick();
        else if (!activeWorkers && secLayer === layer) {
          if (layer.parentNode) layer.parentNode.removeChild(layer);
          secLayer = null;
        }
      }
    }
  }

  // ─── 6. "Motion" replay button in the nav ───────────────
  function addMotionButton() {
    var ul = document.getElementById('navLinks');
    if (!ul) return;
    var li = document.createElement('li');
    motionBtn = document.createElement('button');
    motionBtn.type = 'button';
    motionBtn.className = 'ix-motion';
    motionBtn.setAttribute('aria-label', 'Replay the build animation');
    motionBtn.innerHTML = '&#9654; Motion';
    motionBtn.addEventListener('click', function () {
      if (playing) return;
      var t = document.getElementById('navToggle');
      if (t) t.classList.remove('open');
      ul.classList.remove('open');
      resetSections();
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      armSections();
      html.classList.add('ix-on');
      run(true);
    });
    li.appendChild(motionBtn);
    ul.appendChild(li);
  }

  function start() {
    addMotionButton();
    if (!autoplay) return;
    armSections();
    var fonts = (document.fonts && document.fonts.ready)
      ? Promise.race([document.fonts.ready, sleep(1500)])
      : Promise.resolve();
    fonts.then(function () {
      try { run(false); } catch (err) { hardCleanup(); }
    });
  }

  if (autoplay) setTimeout(function () { if (!layerEl) hardCleanup(); }, 15000); // failsafe

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
