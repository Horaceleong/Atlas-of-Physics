/* ui.js — shared runtime for simulations: canvas host, controls, readouts, 2D drawing.
   Classic script (no modules) so the whole site works from file:// offline. */
(function () {
  const PHYS = (window.PHYS = window.PHYS || {});
  PHYS.sims = PHYS.sims || {};

  const LIGHT = {
    bg: '#fbfaf6', grid: '#e4dfd3', ink: '#17161a', soft: '#7d7970', faint: '#c9c3b6',
    red: '#b4442a', teal: '#2f6f6a', ochre: '#a97b1f', indigo: '#2b4b7d',
    white: '#ffffff', shade: 'rgba(23,22,26,.08)'
  };
  const DARK = {
    bg: '#1a1a22', grid: '#33333d', ink: '#f2efe7', soft: '#9a968e', faint: '#454550',
    red: '#e2705a', teal: '#6fb8ad', ochre: '#d3a44a', indigo: '#8fabe0',
    white: '#0f0f14', shade: 'rgba(255,255,255,.07)'
  };
  PHYS.C = Object.assign({}, LIGHT);
  PHYS.setTheme = function (name) {
    Object.assign(PHYS.C, name === 'ink' ? DARK : LIGHT);
  };

  /* ---------------------------------------------------------------- geometry */
  const TAU = Math.PI * 2;
  PHYS.TAU = TAU;
  PHYS.clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  PHYS.lerp = (a, b, t) => a + (b - a) * t;
  PHYS.fmt = function (v, n) {
    if (!isFinite(v)) return '—';
    n = n == null ? 2 : n;
    const s = Math.abs(v) < 5e-3 && n <= 2 ? 0 : n;
    let out = Math.abs(v).toFixed(s);
    if (Math.abs(v) > 1e4 || (Math.abs(v) < 1e-3 && v !== 0)) out = Math.abs(v).toExponential(1);
    return (v < 0 ? '−' : '') + out;
  };

  /* ---------------------------------------------------------------- 2D draw */
  const D = (PHYS.draw = {});
  D.line = function (ctx, x1, y1, x2, y2, color, w, dash) {
    ctx.save();
    ctx.strokeStyle = color || PHYS.C.ink;
    ctx.lineWidth = w || 1;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.restore();
  };
  D.arrow = function (ctx, x1, y1, x2, y2, color, w, head) {
    const a = Math.atan2(y2 - y1, x2 - x1);
    const h = head || 7;
    ctx.save();
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w || 1.5;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * h * .8, y2 - Math.sin(a) * h * .8); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - Math.cos(a - .38) * h, y2 - Math.sin(a - .38) * h);
    ctx.lineTo(x2 - Math.cos(a + .38) * h, y2 - Math.sin(a + .38) * h);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  };
  D.circle = function (ctx, x, y, r, fill, stroke, w) {
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w || 1; ctx.stroke(); }
  };
  D.text = function (ctx, s, x, y, color, size, align, baseline, font) {
    ctx.save();
    ctx.fillStyle = color || PHYS.C.ink;
    ctx.font = (size || 11) + 'px ' + (font || '"JetBrains Mono", Consolas, monospace');
    ctx.textAlign = align || 'left';
    ctx.textBaseline = baseline || 'middle';
    ctx.fillText(s, x, y);
    ctx.restore();
  };
  D.dashRect = function (ctx, x, y, w, h, color) {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
    ctx.strokeRect(x, y, w, h); ctx.restore();
  };
  D.bar = function (ctx, x, y, w, h, frac, color, bg) {
    ctx.fillStyle = bg || PHYS.C.grid;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w * PHYS.clamp(frac, 0, 1), h);
  };

  /* ---------------------------------------------------------------- Sim host */
  // host = PHYS.SimHost(el, {aspect, badge, hint, interactive})
  PHYS.SimHost = function (el, opts) {
    opts = opts || {};
    el.innerHTML = '';
    const stage = document.createElement('div');
    stage.className = 'fig-stage';
    const canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', opts.label || '互動物理圖 · interactive physics figure');
    canvas.textContent = opts.label || '互動物理圖';
    if (opts.interactive !== false) canvas.setAttribute('tabindex', '-1');
    const badge = document.createElement('div');
    badge.className = 'fig-badge';
    if (opts.badge) badge.textContent = opts.badge;
    const hint = document.createElement('div');
    hint.className = 'fig-hint';
    if (opts.hint) hint.innerHTML = opts.hint;
    stage.appendChild(canvas);
    if (opts.badge) stage.appendChild(badge);
    if (opts.hint) stage.appendChild(hint);

    const controls = document.createElement('div');
    controls.className = 'fig-controls';
    const readout = document.createElement('div');
    readout.className = 'readout';

    el.appendChild(stage);
    el.appendChild(controls);
    el.appendChild(readout);

    const host = {
      el, stage, canvas, controls, readout,
      ctx: canvas.getContext('2d'),
      W: 600, H: 400, dpr: 1,
      aspect: opts.aspect || 0.66,
      ticks: [], alive: true, paused: false
    };

    function resize() {
      const w = Math.max(240, stage.clientWidth || 480);
      const h = Math.round(w * host.aspect);
      host.dpr = Math.min(2, window.devicePixelRatio || 1);
      host.W = w; host.H = h;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      canvas.width = Math.round(w * host.dpr);
      canvas.height = Math.round(h * host.dpr);
      if (host.onResize) host.onResize();
    }
    host.resize = resize;

    host.addSlider = function (o) {
      const wrap = document.createElement('div');
      wrap.className = 'ctrl';
      const lab = document.createElement('label');
      lab.innerHTML = o.label + (o.en ? ' <span class="en">' + o.en + '</span>' : '');
      const out = document.createElement('output');
      const inp = document.createElement('input');
      inp.type = 'range';
      inp.min = o.min; inp.max = o.max; inp.step = o.step == null ? 0.01 : o.step;
      inp.value = o.value;
      inp.setAttribute('aria-label', o.label);
      const show = v => (o.fmt ? o.fmt(v) : PHYS.fmt(v, o.dp == null ? 1 : o.dp)) + (o.unit ? ' ' + o.unit : '');
      out.textContent = show(+inp.value);
      inp.addEventListener('input', () => {
        out.textContent = show(+inp.value);
        if (o.oninput) o.oninput(+inp.value);
      });
      wrap.appendChild(lab); wrap.appendChild(out); wrap.appendChild(inp);
      controls.appendChild(wrap);
      return { input: inp, output: out, get value() { return +inp.value; }, set value(v) { inp.value = v; out.textContent = show(v); } };
    };

    host.addToggle = function (label, initial, fn) {
      let row = controls.querySelector('.fig-toggles');
      if (!row) { row = document.createElement('div'); row.className = 'fig-toggles'; controls.appendChild(row); }
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'tog'; b.textContent = label;
      b.setAttribute('aria-pressed', initial ? 'true' : 'false');
      b.addEventListener('click', () => {
        const on = b.getAttribute('aria-pressed') !== 'true';
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        fn(on);
      });
      row.appendChild(b);
      return b;
    };

    host.setReadout = function (items) {
      let html = '';
      for (const it of items) {
        html += '<div><span class="k">' + it.k + '</span><span class="v">' + it.v +
          (it.unit ? '<small>' + it.unit + '</small>' : '') + '</span></div>';
      }
      if (readout._html !== html) { readout.innerHTML = html; readout._html = html; }
    };

    host.onTick = fn => host.ticks.push(fn);

    let last = performance.now(), t0 = last;
    function loop(now) {
      if (!host.alive) return;
      // pause the simulation clock while off-screen or in a background tab:
      // shifting t0 instead of dt keeps wave phases continuous on return.
      if (host.paused || document.hidden) {
        t0 += now - last; last = now;
        host.raf = requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const t = (now - t0) / 1000;
      const ctx = host.ctx;
      ctx.setTransform(host.dpr, 0, 0, host.dpr, 0, 0);
      ctx.clearRect(0, 0, host.W, host.H);
      ctx.fillStyle = PHYS.C.bg;
      ctx.fillRect(0, 0, host.W, host.H);
      for (const f of host.ticks) { try { f(dt, t); } catch (e) { console.error(e); } }
      host.raf = requestAnimationFrame(loop);
    }

    host.destroy = function () {
      host.alive = false;
      cancelAnimationFrame(host.raf);
      if (host.ro) host.ro.disconnect();
      if (host.io) host.io.disconnect();
      el.innerHTML = '';
    };

    resize();
    if (window.ResizeObserver) {
      host.ro = new ResizeObserver(() => { if (host.alive) resize(); });
      host.ro.observe(stage);
    } else {
      window.addEventListener('resize', resize);
    }
    if (window.IntersectionObserver) {
      host.io = new IntersectionObserver(entries => {
        for (const e of entries) host.paused = !e.isIntersecting;
      }, { rootMargin: '120px' });
      host.io.observe(stage);
    }

    requestAnimationFrame(t => { last = t; host.raf = requestAnimationFrame(loop); });
    return host;
  };

  /* ---------------------------------------------------------------- widgets */
  // A small "bilingual caption" used inside canvases is not possible; sims draw text directly.

  // register( name, factory )
  PHYS.defineSim = function (name, factory) { PHYS.sims[name] = factory; };
})();
