/* ui3d.js — WebGL host for the 3D figures, in the visual spirit of the
   Macao Science Center optics-3d lab: Three.js with hemisphere + directional
   light, ACES tone mapping, soft shadows, a grid stage and OrbitControls.
   Three.js is vendored locally (assets/vendor), so everything still runs
   from file:// with no network. A 2D overlay canvas keeps the house-style
   labels, energy bars and small charts drawn with the regular 2D helpers. */
(function () {
  const T = window.THREE;
  if (!T) return;                       // three.min.js must be loaded first
  const P = window.PHYS, D = P.draw;
  const V3 = (x, y, z) => new T.Vector3(x || 0, y || 0, z || 0);

  /* ---- theme hook: PHYS.setTheme now notifies every GL host ---- */
  P._themeCbs = P._themeCbs || [];
  const _setTheme = P.setTheme;
  P.setTheme = function (name) {
    _setTheme(name);
    P._themeCbs.forEach(f => { try { f(name); } catch (e) {} });
  };

  /* ---- css color ('#rgb/#rrggbb' | 'rgba(...)') → {hex, a} ---- */
  function css(c) {
    if (c == null) return { hex: 0xffffff, a: 1 };
    if (c[0] === '#') {
      let h = c.slice(1);
      if (h.length === 3) h = h.split('').map(x => x + x).join('');
      return { hex: parseInt(h, 16), a: 1 };
    }
    const m = String(c).match(/rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(',').map(Number);
      return { hex: (p[0] << 16) | (p[1] << 8) | p[2], a: p.length > 3 ? p[3] : 1 };
    }
    return { hex: 0xffffff, a: 1 };
  }

  /* ---- shared materials (cached; never disposed per-host) ---- */
  const matCache = {};
  function mBasic(color) {
    const c = css(color), k = 'b' + c.hex + '|' + c.a;
    return matCache[k] || (matCache[k] = new T.MeshBasicMaterial({
      color: c.hex, transparent: c.a < 1, opacity: c.a, side: T.DoubleSide, depthWrite: c.a >= 1
    }));
  }
  function mLine(color, dashed, alpha) {
    const c = css(color);
    if (alpha != null) c.a = alpha;
    const k = 'l' + c.hex + '|' + c.a + (dashed ? 'd' : '');
    return matCache[k] || (matCache[k] = dashed
      ? new T.LineDashedMaterial({ color: c.hex, transparent: c.a < 1, opacity: c.a, dashSize: .3, gapSize: .22 })
      : new T.LineBasicMaterial({ color: c.hex, transparent: c.a < 1, opacity: c.a }));
  }
  P._lineMat = (color, a) => mLine(color, false, a);
  P._dashMat = (color, a) => mLine(color, true, a);
  function mLit(color) {
    const c = css(color), k = 's' + c.hex;
    return matCache[k] || (matCache[k] = new T.MeshStandardMaterial({
      color: c.hex, roughness: .58, metalness: .05
    }));
  }

  /* ---- shared unit geometries ---- */
  const GEO = {
    cyl: new T.CylinderGeometry(1, 1, 1, 10, 1, false),
    cone: new T.ConeGeometry(1, 1, 12),
    sph: new T.SphereGeometry(1, 28, 18),
    box: new T.BoxGeometry(1, 1, 1),
    quad: new T.PlaneGeometry(1, 1),
    disc: new T.CylinderGeometry(1, 1, 1, 56, 1),
    edge: new T.EdgesGeometry(new T.BoxGeometry(1, 1, 1)),
    seg: new T.BufferGeometry().setFromPoints([V3(0, 0, 0), V3(0, 1, 0)])
  };
  const UP = V3(0, 1, 0);
  const _q = new T.Quaternion(), _m = new T.Matrix4();
  const _a = V3(), _b = V3(), _c = V3(), _d = V3();

  /* =================================================================== */
  P.SimHostGL = function (el, opts) {
    opts = opts || {};
    el.innerHTML = '';
    const stage = document.createElement('div');
    stage.className = 'fig-stage fig-stage-3d';
    const canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', opts.label || '立体互动物理图 · interactive 3D physics figure');
    canvas.textContent = opts.label || '立体互动物理图';
    const overlay = document.createElement('canvas');
    overlay.className = 'fig-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    const badge = document.createElement('div');
    badge.className = 'fig-badge';
    if (opts.badge) badge.textContent = opts.badge;
    const hint = document.createElement('div');
    hint.className = 'fig-hint';
    hint.innerHTML = opts.hint || '拖动旋转 · 滚轮缩放 · 右键平移';
    stage.appendChild(canvas);
    stage.appendChild(overlay);
    if (opts.badge) stage.appendChild(badge);
    stage.appendChild(hint);

    const controls = document.createElement('div');
    controls.className = 'fig-controls';
    const readout = document.createElement('div');
    readout.className = 'readout';
    el.appendChild(stage); el.appendChild(controls); el.appendChild(readout);

    const renderer = new T.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;

    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(40, 1, .1, 500);
    const cam3 = new T.OrbitControls(camera, canvas);
    cam3.enableDamping = true; cam3.dampingFactor = .08;
    cam3.minDistance = 1.6; cam3.maxDistance = 90;

    /* lights */
    scene.add(new T.HemisphereLight(0xffffff, 0xd6d2c8, .9));
    const dir = new T.DirectionalLight(0xffffff, 1.45);
    dir.position.set(6, 11, 5); dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    dir.shadow.camera.left = dir.shadow.camera.bottom = -14;
    dir.shadow.camera.right = dir.shadow.camera.top = 14;
    dir.shadow.camera.far = 60;
    const fill = new T.DirectionalLight(0xffffff, .32);
    fill.position.set(-6, 6, -7);
    scene.add(dir, fill);

    /* grid + shadow catcher, rebuilt on theme change */
    let grid = null, shadowPlane = null;
    function themeStage(name) {
      const dark = name === 'ink';
      const bg = css(P.C.bg).hex;
      scene.background = new T.Color(bg);
      scene.fog = new T.Fog(bg, 26, 95);
      if (grid) { scene.remove(grid); grid.geometry.dispose(); grid.material.dispose(); }
      grid = new T.GridHelper(24, 24, dark ? 0x4a4a55 : 0xbab5a9, dark ? 0x33333d : 0xdcd8cb);
      grid.position.y = -0.002;
      scene.add(grid);
      if (!shadowPlane) {
        shadowPlane = new T.Mesh(new T.PlaneGeometry(60, 60), new T.ShadowMaterial({ opacity: .16 }));
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.receiveShadow = true;
        scene.add(shadowPlane);
      }
      shadowPlane.material.opacity = dark ? .3 : .16;
    }
    themeStage('paper');
    P._themeCbs.push(themeStage);

    const host = {
      el, stage, canvas, overlay, controls, readout, scene, camera,
      renderer, cam3, W: 600, H: 400, dpr: 1, aspect: opts.aspect || .70,
      ticks: [], alive: true, paused: false,
      setCam(o) {
        o = o || {};
        if (o.fov) { camera.fov = o.fov; }
        const t = o.target || [0, 0, 0];
        cam3.target.set(t[0], t[1], t[2]);
        const dist = o.dist || 10, az = o.az || .6, elv = o.el == null ? .25 : o.el;
        camera.position.set(
          t[0] + dist * Math.cos(elv) * Math.sin(az),
          t[1] + dist * Math.sin(elv),
          t[2] + dist * Math.cos(elv) * Math.cos(az)
        );
        camera.updateProjectionMatrix();
        cam3.update();
      }
    };
    host.octx = overlay.getContext('2d');
    host.ctx = host.octx;                  // legacy name used by ported sims

    /* ---------------- pooled immediate-mode drawing API ---------------- */
    const poolSet = [];
    function makePool(make) {
      const arr = []; let i = 0;
      const p = {
        get() {
          let o = arr[i];
          if (!o) { o = make(); arr.push(o); scene.add(o); }
          i++; o.visible = true; return o;
        },
        begin() { i = 0; },
        end() { for (let k = i; k < arr.length; k++) arr[k].visible = false; }
      };
      poolSet.push(p);
      return p;
    }

    const pRay = makePool(() => { const m = new T.Mesh(GEO.cyl, mBasic('#fff')); return m; });
    const pArrow = makePool(() => {
      const g = new T.Group();
      const shaft = new T.Mesh(GEO.cyl, mBasic('#fff'));
      const tip = new T.Mesh(GEO.cone, mBasic('#fff'));
      g.add(shaft, tip); g._shaft = shaft; g._tip = tip;
      return g;
    });
    const pSph = makePool(() => { const m = new T.Mesh(GEO.sph, mBasic('#fff')); m.castShadow = true; return m; });
    const pBox = makePool(() => {
      const g = new T.Group();
      const m = new T.Mesh(GEO.box, mBasic('#fff')); m.castShadow = true;
      const e = new T.LineSegments(GEO.edge, mLine('#fff'));
      g.add(m, e); g._mesh = m; g._edge = e;
      return g;
    });
    const pQuad = makePool(() => new T.Mesh(GEO.quad, mBasic('#fff')));
    const pDisc = makePool(() => { const m = new T.Mesh(GEO.disc, mBasic('#fff')); m.castShadow = true; return m; });
    const pDash = makePool(() => {
      const line = new T.Line(GEO.seg.clone(), mLine('#fff', true));
      line.frustumCulled = false;
      return line;
    });

    /* persistent dynamic polyline (trails, helices) */
    host.dynLine = function (max, color, dashed) {
      const geo = new T.BufferGeometry();
      geo.setAttribute('position', new T.BufferAttribute(new Float32Array(max * 3), 3));
      const line = new T.Line(geo, mLine(color, dashed));
      line.frustumCulled = false;
      scene.add(line);
      const pos = geo.attributes.position;
      return {
        obj: line,
        set(i, p) { pos.setXYZ(i, p[0] || p.x || 0, p[1] || p.y || 0, p[2] || p.z || 0); },
        commit(n) {
          pos.needsUpdate = true;
          geo.setDrawRange(0, n);
          if (dashed) line.computeLineDistances();
        },
        dispose() { scene.remove(line); geo.dispose(); }
      };
    };

    function project(p) {
      const v = _a.set(p[0], p[1], p[2]).project(camera);
      if (v.z > 1) return null;
      return { x: (v.x * .5 + .5) * host.W, y: (-v.y * .5 + .5) * host.H };
    }

    const G = host.G = {
      line(a, b, o) {
        o = o || {};
        if (o.dash) {
          const l = pDash.get();
          l.material = mLine(o.color, true);
          const pa = l.geometry.attributes.position;
          pa.setXYZ(0, a[0], a[1], a[2]);
          pa.setXYZ(1, b[0], b[1], b[2]);
          pa.needsUpdate = true;
          l.computeLineDistances();
          return;
        }
        const m = pRay.get();
        _a.set(a[0], a[1], a[2]); _b.set(b[0], b[1], b[2]);
        _d.subVectors(_b, _a);
        const len = _d.length() || 1e-6;
        _q.setFromUnitVectors(UP, _c.copy(_d).multiplyScalar(1 / len));
        m.quaternion.copy(_q);
        const r = .022 + (o.width || 1) * .016;
        m.scale.set(r, len, r);
        m.position.copy(_a).add(_b).multiplyScalar(.5);
        m.material = mBasic(o.color);
      },
      arrow(a, b, o) {
        o = o || {};
        const g = pArrow.get();
        _a.set(a[0], a[1], a[2]); _b.set(b[0], b[1], b[2]);
        _d.subVectors(_b, _a);
        const L = _d.length();
        if (L < 1e-4) { g.visible = false; return; }
        _q.setFromUnitVectors(UP, _c.copy(_d).multiplyScalar(1 / L));
        const head = Math.min(L * .55, (o.head || 7) * .006 + .11);
        const shaftL = Math.max(.001, L - head);
        const r = .024 + (o.width || 1.4) * .013;
        const u = _c.copy(_d).multiplyScalar(1 / L);           // unit dir
        const shaft = g._shaft, tip = g._tip;
        shaft.material = mBasic(o.color); tip.material = mBasic(o.color);
        shaft.quaternion.copy(_q); tip.quaternion.copy(_q);
        shaft.scale.set(r, shaftL, r);
        shaft.position.copy(u).multiplyScalar(shaftL / 2).add(_a);
        tip.scale.set(r * 2.2, head, r * 2.2);
        tip.position.copy(u).multiplyScalar(shaftL + head / 2).add(_a);
      },
      sphere(p, r, o) {
        o = o || {};
        const m = pSph.get();
        m.position.set(p[0], p[1], p[2]);
        m.scale.setScalar(r);
        m.material = (o.light || o.lit) ? mLit(o.color) : mBasic(o.color);
      },
      box(c, size, o) {
        G.boxBasis(c, [1, 0, 0], [0, 1, 0], [0, 0, 1],
          [size[0] / 2, size[1] / 2, size[2] / 2], (o || {}).color, o);
      },
      boxBasis(c, u, v, w, half, color, o) {
        o = o || {};
        const g = pBox.get();
        _m.makeBasis(_a.set(u[0], u[1], u[2]), _b.set(v[0], v[1], v[2]), _c.set(w[0], w[1], w[2]));
        g.quaternion.setFromRotationMatrix(_m);
        g.position.set(c[0], c[1], c[2]);
        g.scale.set(Math.abs(half[0]) * 2, Math.abs(half[1]) * 2, Math.abs(half[2]) * 2);
        g._mesh.material = mLit(color);
        g._edge.visible = !!o.edges;
        if (o.edges) g._edge.material = mLine(o.edges);
      },
      /* flat quad (tank walls, water surface…). pts: p0 p1 p2 (p3) */
      poly(pts, o) {
        o = o || {};
        const m = pQuad.get();
        const p0 = pts[0], p1 = pts[1];
        const p3 = pts[3] || pts[2];
        _a.set(p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]);         // edge u
        _b.set(p3[0] - p0[0], p3[1] - p0[1], p3[2] - p0[2]);         // edge v
        const n = _c.crossVectors(_a, _b).normalize();
        const uHat = _a.clone().normalize();
        const vHat = new T.Vector3().crossVectors(n, uHat);
        _m.makeBasis(uHat, vHat, n);
        m.quaternion.setFromRotationMatrix(_m);
        m.scale.set(_a.length(), _b.length(), 1);
        m.position.set(p0[0] + (_a.x + _b.x) / 2, p0[1] + (_a.y + _b.y) / 2, p0[2] + (_a.z + _b.z) / 2);
        m.material = mBasic(o.fill);
        m.castShadow = false;
      },
      disc(p, r, normal, o) {
        o = o || {};
        const m = pDisc.get();
        m.position.set(p[0], p[1], p[2]);
        _a.set(0, 0, 0); _b.set(normal[0], normal[1], normal[2]);
        _d.subVectors(_b, _a);
        const len = _d.length() || 1e-6;
        _q.setFromUnitVectors(UP, _c.copy(_d).multiplyScalar(1 / len));
        m.quaternion.copy(_q);
        m.scale.set(r, o.t || .04, r);
        m.material = o.fill ? mLit(o.fill) : mBasic(o.color);
      },
      text(p, s, o) {
        o = o || {};
        const q = project(p);
        if (!q) return;
        D.text(host.octx, s, q.x + (o.dx || 0), q.y + (o.dy || 0), o.color || P.C.ink, o.size || 9, o.align || 'left');
      }
    };
    host.boxBasis = G.boxBasis;

    /* ---------------- shared controls / readouts (same as 2D) ---------- */
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
      const show = v => (o.fmt ? o.fmt(v) : P.fmt(v, o.dp == null ? 1 : o.dp)) + (o.unit ? ' ' + o.unit : '');
      out.textContent = show(+inp.value);
      inp.addEventListener('input', () => { out.textContent = show(+inp.value); if (o.oninput) o.oninput(+inp.value); });
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

    /* ---------------- sizing / loop ---------------- */
    function resize() {
      const w = Math.max(240, stage.clientWidth || 480);
      const h = Math.round(w * host.aspect);
      host.dpr = Math.min(2, window.devicePixelRatio || 1);
      host.W = w; host.H = h;
      renderer.setPixelRatio(host.dpr);
      renderer.setSize(w, h, false);
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      overlay.style.width = w + 'px'; overlay.style.height = h + 'px';
      overlay.width = Math.round(w * host.dpr); overlay.height = Math.round(h * host.dpr);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      if (host.onResize) host.onResize();
    }
    host.resize = resize;

    let last = performance.now(), t0 = last;
    function loop(now) {
      if (!host.alive) return;
      if (host.paused || document.hidden) {
        t0 += now - last; last = now;
        host.raf = requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const t = (now - t0) / 1000;
      poolSet.forEach(p => p.begin());
      host.octx.setTransform(host.dpr, 0, 0, host.dpr, 0, 0);
      host.octx.clearRect(0, 0, host.W, host.H);
      cam3.update();
      for (const f of host.ticks) { try { f(dt, t); } catch (e) { console.error(e); } }
      poolSet.forEach(p => p.end());
      renderer.render(scene, camera);
      host.raf = requestAnimationFrame(loop);
    }

    host.destroy = function () {
      host.alive = false;
      cancelAnimationFrame(host.raf);
      cam3.dispose();
      if (host.ro) host.ro.disconnect();
      if (host.io) host.io.disconnect();
      const i = P._themeCbs.indexOf(themeStage);
      if (i >= 0) P._themeCbs.splice(i, 1);
      renderer.dispose();
      el.innerHTML = '';
    };

    host.setCam({ az: .6, el: .25, dist: 12, target: [0, 0, 0], fov: 40 });
    resize();
    if (window.ResizeObserver) {
      host.ro = new ResizeObserver(() => { if (host.alive) resize(); });
      host.ro.observe(stage);
    }
    if (window.IntersectionObserver) {
      host.io = new IntersectionObserver(entries => {
        for (const e of entries) host.paused = !e.isIntersecting;
      }, { rootMargin: '120px' });
      host.io.observe(stage);
    }

    requestAnimationFrame(tt => { last = tt; host.raf = requestAnimationFrame(loop); });
    return host;
  };

  /* 3D sims register through this so app.js knows to build a GL host */
  P.SIMS_3D = P.SIMS_3D || {};
  P.defineSim3D = function (name, factory) {
    P.SIMS_3D[name] = 1;
    P.sims[name] = factory;
  };
})();
