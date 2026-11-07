/* sims3d.js — three-dimensional interactive figures, rendered with the
   local Three.js engine (see ui3d.js): lit solid objects, soft shadows,
   grid stage, OrbitControls. Physics is unchanged from the 2D-engine build;
   only the presentation layer was rewritten. */
(function () {
  const PHYS = window.PHYS, D = PHYS.draw, C = () => PHYS.C;
  const TAU = Math.PI * 2, clamp = PHYS.clamp, fmt = PHYS.fmt;

  function energyBars(ctx, x, y, w, h, items, total) {
    const gap = 7;
    let yy = y;
    items.forEach(([lab, val, col]) => {
      D.text(ctx, lab, x - 6, yy + 4, C().soft, 8.5, 'right');
      D.bar(ctx, x, yy, w, 7, Math.min(1, val / (total || 1)), col, C().grid);
      yy += gap + 7;
    });
  }

  /* ============================================================ projectile */
  PHYS.defineSim3D('projectile', function (host, cfg) {
    let t = 0, hold = 0;
    const g = 9.8;

    function geometry() {
      const th = ang.value * Math.PI / 180, v = v0.value;
      const vx = v * Math.cos(th), vy0 = v * Math.sin(th);
      const T = 2 * vy0 / g, R = vx * T, Hmax = vy0 * vy0 / (2 * g);
      return { vx, vy0, T, R, Hmax };
    }
    function reframe() {
      const { R, Hmax } = geometry();
      host.setCam({
        az: .55, el: .16, fov: 42,
        dist: clamp(Math.max(R, 14) * 1.05 + 6, 14, 46),
        target: [Math.max(R * .45, 4), Math.max(Hmax * .45, 1.5), 0]
      });
    }

    const v0 = host.addSlider({ label: '初速度 v₀', en: 'v0', min: 4, max: 26, step: .5, value: 14, unit: 'm/s', dp: 1, oninput: () => { t = 0; hold = 0; reframe(); } });
    const ang = host.addSlider({ label: '拋射角 θ', en: 'angle', min: 10, max: 80, step: 1, value: 45, unit: '°', dp: 0, oninput: () => { t = 0; hold = 0; reframe(); } });
    let slow = !(cfg && cfg.slow === false);
    host.addToggle('慢放 ½', slow, v => slow = v);
    reframe();

    const path = host.dynLine(84, null, true);
    host.onTick((dt) => {
      const G = host.G;
      const th = ang.value * Math.PI / 180, v = v0.value;
      const vx = v * Math.cos(th), vy0 = v * Math.sin(th);
      const T = 2 * vy0 / g, R = vx * T, Hmax = vy0 * vy0 / (2 * g);
      if (t < T) { t += dt * (slow ? .5 : 1); }
      else { hold += dt; if (hold > 1) { t = 0; hold = 0; } }
      const tt = Math.min(t, T);
      const bx = vx * tt, by = vy0 * tt - .5 * g * tt * tt;
      const vy = vy0 - g * tt;

      // full path (dashed)
      for (let i = 0; i <= 80; i++) {
        const s = T * i / 80;
        path.set(i, [vx * s, vy0 * s - .5 * g * s * s, 0]);
      }
      path.obj.material = TLINE();
      path.commit(81);

      // strobe dots
      for (let s = 0; s <= tt; s += .06) {
        G.sphere([vx * s, vy0 * s - .5 * g * s * s, 0], .12, { color: C().soft });
      }
      // apex + range marks
      G.line([R, 0, 0], [R, .6, 0], { color: C().soft, width: 1 });
      G.text([R, .6, 0], 'R=' + fmt(R, 1) + ' m', { dy: 14, size: 9, color: C().soft, align: 'center' });
      G.line([R / 2, Hmax, 0], [R / 2, 0, 0], { color: C().faint, width: .9, dash: true });
      G.text([R / 2, Hmax, 0], 'H=' + fmt(Hmax, 1) + ' m', { dy: -10, size: 9, color: C().soft, align: 'center' });

      // ball + velocity components
      G.sphere([bx, by, 0], .27, { color: C().red, light: true });
      const k = .35;
      G.arrow([bx, by, 0], [bx + vx * k, by + vy * k, 0], { color: C().red, width: 2 });
      G.arrow([bx, by, 0], [bx + vx * k, by, 0], { color: C().teal, width: 1.2 });
      G.arrow([bx, by, 0], [bx, by + vy * k, 0], { color: C().ochre, width: 1.2 });
      G.text([bx + vx * k, by + vy * k, 0], 'v', { color: C().red, dx: 4, dy: -8, size: 10 });
      G.text([bx + vx * k, by, 0], 'vₓ', { color: C().teal, dx: 4, dy: 8, size: 9 });
      G.text([bx, by + vy * k, 0], 'v_y', { color: C().ochre, dx: -6, dy: -6, size: 9, align: 'right' });

      host.setReadout([
        { k: 't', v: fmt(tt, 2), unit: 's' },
        { k: 'x', v: fmt(bx, 1), unit: 'm' },
        { k: 'y', v: fmt(by, 1), unit: 'm' },
        { k: 'v', v: fmt(Math.hypot(vx, vy), 1), unit: 'm/s' },
        { k: 'v_y', v: fmt(vy, 1), unit: 'm/s' }
      ]);
    });
    function TLINE() { return window.PHYS._dashMat(C().faint); }
    return {};
  });

  /* ============================================================== incline */
  PHYS.defineSim3D('incline', function (host) {
    const T = window.THREE;
    const th = host.addSlider({ label: '傾角 θ', en: 'angle', min: 5, max: 45, step: 1, value: 25, unit: '°', dp: 0 });
    const mu = host.addSlider({ label: '動摩擦因數 μ', en: 'friction', min: 0, max: .8, step: .02, value: .25, dp: 2 });
    const mm = host.addSlider({ label: '質量 m', en: 'mass', min: 1, max: 8, step: .5, value: 3, unit: 'kg', dp: 1 });
    let showComp = false;
    host.addToggle('分解重力', false, v => showComp = v);
    const g = 9.8;

    /* persistent wedge */
    const wedge = new T.Mesh(new T.BufferGeometry(), null);
    const wedgeEdges = new T.LineSegments(new T.BufferGeometry(), null);
    host.scene.add(wedge, wedgeEdges);
    wedge.castShadow = true; wedge.receiveShadow = true;
    let wedgeMat = new T.MeshStandardMaterial({ color: new T.Color('#d8d2c4'), roughness: .85, metalness: 0 });
    let edgeMat = new T.LineBasicMaterial({ color: new T.Color('#c9c3b6') });
    function buildWedge() {
      const a = th.value * Math.PI / 180, L = 4.6, Hh = L * Math.tan(a), dep = 3.2;
      const shape = new T.Shape();
      shape.moveTo(0, 0); shape.lineTo(L, 0); shape.lineTo(L, Hh); shape.closePath();
      const geo = new T.ExtrudeGeometry(shape, { depth: dep, bevelEnabled: false });
      geo.translate(0, 0, -dep / 2);
      wedge.geometry.dispose(); wedge.geometry = geo;
      wedge.material = wedgeMat;
      const eg = new T.EdgesGeometry(geo);
      wedgeEdges.geometry.dispose(); wedgeEdges.geometry = eg;
      wedgeEdges.material = edgeMat;
      host.setCam({ az: .62, el: .22, dist: 12.5, fov: 40, target: [L * .45, Hh * .45, 0] });
    }
    th.input.addEventListener('input', buildWedge);
    buildWedge();
    host._wedgeTint = () => {
      const ink = document.documentElement.dataset.theme === 'ink';
      wedgeMat.color.set(ink ? '#43434e' : '#d8d2c4');
      edgeMat.color.set(C().faint);
    };
    host._wedgeTint();
    PHYS._themeCbs.push(host._wedgeTint);

    host.onTick((dt) => {
      const G = host.G, { W, H, ctx } = host;
      const a = th.value * Math.PI / 180, m = mm.value, k = mu.value;
      const L = 4.6, Hh = L * Math.tan(a);
      const moving = Math.tan(a) > k;
      const acc = moving ? g * (Math.sin(a) - k * Math.cos(a)) : 0;
      const mg = m * g, N = mg * Math.cos(a), f = moving ? k * N : mg * Math.sin(a);

      G.text([L, Hh, 0], 'θ=' + th.value + '°', { dx: 6, dy: -6, size: 9, color: C().soft });

      // block on the slope
      const u = [Math.cos(a), Math.sin(a), 0], n = [-Math.sin(a), Math.cos(a), 0];
      const s = 3.1;
      const c = [u[0] * s + n[0] * .34, u[1] * s + n[1] * .34, 0];
      G.boxBasis(c, u, n, [0, 0, 1], [.42, .34, .62], C().red, { edges: C().ink });

      // forces from the block centre
      const O = [c[0] + n[0] * .30, c[1] + n[1] * .30, 0];
      const sc = 26 / Math.max(1, mg);
      G.arrow(O, [O[0], O[1] - mg * sc * .1, 0], { color: C().ink, width: 2 });
      G.text([O[0], O[1] - mg * sc * .1, 0], 'mg', { dx: 8, dy: 6, size: 9.5, color: C().ink });
      G.arrow(O, [O[0] + n[0] * N * sc * .1, O[1] + n[1] * N * sc * .1, 0], { color: C().teal, width: 2 });
      G.text([O[0] + n[0] * N * sc * .1, O[1] + n[1] * N * sc * .1, 0], 'N', { dx: 6, dy: -6, size: 9.5, color: C().teal });
      G.arrow(O, [O[0] - u[0] * f * sc * .1, O[1] - u[1] * f * sc * .1, 0], { color: C().ochre, width: 2 });
      G.text([O[0] - u[0] * f * sc * .1, O[1] - u[1] * f * sc * .1, 0], 'f', { dx: -4, dy: -8, size: 9.5, color: C().ochre, align: 'right' });

      if (showComp) {
        const zz = -0.85;
        G.line([O[0], O[1], zz], [O[0] - u[0] * mg * Math.sin(a) * sc * .1, O[1] - u[1] * mg * Math.sin(a) * sc * .1, zz], { color: C().indigo, width: 1.3, dash: true });
        G.line([O[0], O[1], zz], [O[0] - n[0] * mg * Math.cos(a) * sc * .1, O[1] - n[1] * mg * Math.cos(a) * sc * .1, zz], { color: C().indigo, width: 1.3, dash: true });
        G.text([O[0] - u[0] * mg * Math.sin(a) * sc * .1, O[1] - u[1] * mg * Math.sin(a) * sc * .1, zz], 'mg sinθ', { dx: -4, dy: 10, size: 9, color: C().indigo, align: 'right' });
      }

      if (acc > .05) {
        const O3 = [c[0], c[1] + .55, 0], L2 = Math.min(1.6, acc * .18);
        G.arrow(O3, [O3[0] - u[0] * L2, O3[1] - u[1] * L2, 0], { color: C().red, width: 1.6 });
        G.text([O3[0] - u[0] * L2, O3[1] - u[1] * L2, 0], 'a', { dx: -4, dy: -8, size: 10, color: C().red, align: 'right' });
      }

      host.setReadout([
        { k: '沿斜面合力', v: fmt(moving ? mg * Math.sin(a) - f : 0, 1), unit: 'N' },
        { k: '支持力 N', v: fmt(N, 1), unit: 'N' },
        { k: '摩擦力 f', v: fmt(f, 1), unit: 'N' },
        { k: '加速度 a', v: fmt(acc, 2), unit: 'm/s²' },
        { k: '狀態', v: moving ? '下滑' : '靜止' }
      ]);
    });
    const prevDestroy = host.destroy.bind(host);
    host.destroy = function () {
      const i = PHYS._themeCbs.indexOf(host._wedgeTint);
      if (i >= 0) PHYS._themeCbs.splice(i, 1);
      prevDestroy();
    };
    return {};
  });

  /* ============================================================= elevator */
  PHYS.defineSim3D('elevator', function (host) {
    const T = window.THREE;
    const acc = host.addSlider({ label: '電梯加速度 a', en: 'acceleration', min: -6, max: 6, step: .5, value: 2, unit: 'm/s²', dp: 1 });
    const mm = host.addSlider({ label: '人的質量 m', en: 'mass', min: 30, max: 100, step: 5, value: 60, unit: 'kg', dp: 0 });
    const g = 9.8;
    host.setCam({ az: .48, el: .12, dist: 10.5, fov: 42, target: [0, 1.6, 0] });

    /* translucent cabin (persistent) */
    const cabinMat = new T.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: .22, roughness: .4, metalness: 0, side: T.DoubleSide });
    const cabin = new T.Mesh(new T.BoxGeometry(2.2, 2.8, 2.2), cabinMat);
    cabin.position.set(0, 1.45, 0);
    const cabinEdge = new T.LineSegments(new T.EdgesGeometry(cabin.geometry), new T.LineBasicMaterial({ color: 0x17161a }));
    cabinEdge.position.copy(cabin.position);
    host.scene.add(cabin, cabinEdge);
    host._cabinTint = () => cabinEdge.material.color.set(C().ink);
    host._cabinTint();
    PHYS._themeCbs.push(host._cabinTint);

    host.onTick((dt) => {
      const G = host.G, { W, H, ctx } = host;
      const a = acc.value, m = mm.value;
      const N = m * (g + a), mg = m * g;

      // floor
      G.poly([[-1.1, .1, -1.1], [1.1, .1, -1.1], [1.1, .1, 1.1], [-1.1, .1, 1.1]], { fill: C().faint });

      // person (stick figure)
      const py = .1 + .45;
      G.line([0, py + .35, 0], [0, py + 1.15, 0], { color: C().ink, width: 3 });
      G.line([0, py + .95, 0], [-.35, py + .55, 0], { color: C().ink, width: 2 });
      G.line([0, py + .95, 0], [.35, py + .55, 0], { color: C().ink, width: 2 });
      G.line([0, py + .35, 0], [-.28, py - .2, 0], { color: C().ink, width: 2.2 });
      G.line([0, py + .35, 0], [.28, py - .2, 0], { color: C().ink, width: 2.2 });
      G.sphere([0, py + 1.34, 0], .16, { color: C().ink, light: true });

      // forces
      const sc = 1 / Math.max(mg, 1);
      const Nh = Math.min(2.4, N * sc * 1.8), Gh = Math.min(2.4, mg * sc * 1.8);
      G.arrow([.55, .16, .5], [.55, .16 + Nh, .5], { color: C().teal, width: 2.2 });
      G.text([.55, .16 + Nh, .5], 'N=' + fmt(N, 0) + 'N', { dx: 6, dy: -6, size: 9.5, color: C().teal });
      G.arrow([-.55, 1.5, .5], [-.55, 1.5 - Gh, .5], { color: C().ink, width: 2 });
      G.text([-.55, 1.5 - Gh, .5], 'mg', { dx: -6, dy: 4, size: 9.5, color: C().ink, align: 'right' });

      if (Math.abs(a) > .2) {
        const up = a > 0;
        G.arrow([1.9, 1.9, 0], [1.9, 1.9 + (up ? .7 : -.7), 0], { color: C().red, width: 1.6 });
        G.text([1.9, 1.9 + (up ? .8 : -.8), 0], 'a', { dx: 5, size: 9, color: C().red });
      }

      const state = Math.abs(a) < .2 ? '平衡' : a > 0 ? '超重' : '失重';
      D.text(ctx, state, W - 14, 18, a > .2 ? C().red : a < -.2 ? C().indigo : C().teal, 13, 'right');

      host.setReadout([
        { k: '體重 mg', v: fmt(mg, 0), unit: 'N' },
        { k: '支持力 N', v: fmt(N, 0), unit: 'N' },
        { k: '視重/實重', v: fmt(N / mg, 2) },
        { k: '狀態', v: state }
      ]);
    });
    const prevDestroy = host.destroy.bind(host);
    host.destroy = function () {
      const i = PHYS._themeCbs.indexOf(host._cabinTint);
      if (i >= 0) PHYS._themeCbs.splice(i, 1);
      prevDestroy();
    };
    return {};
  });

  /* ================================================================ orbit */
  PHYS.defineSim3D('orbit', function (host) {
    const RR = host.addSlider({ label: '軌道半徑', en: 'radius', min: 1.15, max: 5, step: .05, value: 1.6, unit: 'R⊕', dp: 2 });
    host.setCam({ az: .6, el: .42, dist: 8.4, fov: 38, target: [0, 0, 0] });
    const GM = 3.986e14, RE = 6.371e6;
    let phase = 0;

    host.onTick((dt) => {
      const G = host.G;
      const r = RR.value * RE;
      const v = Math.sqrt(GM / r);
      const T = TAU * r / v;
      phase += dt * 2 * Math.PI / (T * .55);

      // Earth
      G.sphere([0, 0, 0], 1, { color: C().indigo, light: true });
      G.line([0, -1.35, 0], [0, 1.35, 0], { color: C().soft, width: .8 });
      // orbit ring
      const N = 96;
      for (let i = 0; i < N; i++) {
        const a1 = i / N * TAU, a2 = (i + 1) / N * TAU;
        G.line([Math.cos(a1) * RR.value, 0, Math.sin(a1) * RR.value],
               [Math.cos(a2) * RR.value, 0, Math.sin(a2) * RR.value],
               { color: C().faint, width: .8, dash: true });
      }
      const px = Math.cos(phase) * RR.value, pz = Math.sin(phase) * RR.value;
      G.sphere([px, 0, pz], .13, { color: C().red, light: true });
      const dir = [-Math.sin(phase), 0, Math.cos(phase)];
      G.arrow([px, 0, pz], [px + dir[0] * 1.0, 0, pz + dir[2] * 1.0], { color: C().teal, width: 1.8, head: 7 });
      G.text([px + dir[0] * 1.05, 0, pz + dir[2] * 1.05], 'v', { dx: 3, dy: -8, size: 9.5, color: C().teal });
      G.arrow([px, 0, pz], [px * .74, 0, pz * .74], { color: C().red, width: 1.8, head: 7 });
      G.text([px * .7, 0, pz * .7], 'F', { dx: 4, dy: 10, size: 9.5, color: C().red });

      host.setReadout([
        { k: '軌道半徑', v: fmt(r / 1000, 0), unit: 'km' },
        { k: '線速度', v: fmt(v / 1000, 2), unit: 'km/s' },
        { k: '週期', v: fmt(T / 3600, 2), unit: 'h' },
        { k: '向心加速度', v: fmt(GM / (r * r), 2), unit: 'm/s²' }
      ]);
    });
    return {};
  });

  /* ============================================================= pendulum */
  PHYS.defineSim3D('pendulum', function (host) {
      const LL = host.addSlider({ label: '擺長 L', en: 'length', min: 1, max: 4, step: .1, value: 2, unit: 'm', dp: 1, oninput: () => { th = .5; w = 0; trail.length = 0; } });
    const th0 = host.addSlider({ label: '初始擺角', en: 'amplitude', min: 5, max: 40, step: 1, value: 20, unit: '°', dp: 0, oninput: v => { th = v * Math.PI / 180; w = 0; trail.length = 0; } });
    const g = 9.8;
    let th = 20 * Math.PI / 180, w = 0;
    const trail = [];
    host.setCam({ az: .5, el: .1, dist: 7, fov: 40, target: [0, 1.9, 0] });
    const dtrail = host.dynLine(240, null, false);

    host.onTick((dt) => {
      const G = host.G, { W, H, ctx } = host;
      const L = LL.value;
      for (let i = 0; i < 4; i++) {
        const h = dt / 4;
        w += -g / L * Math.sin(th) * h;
        th += w * h;
      }
      const px = Math.sin(th) * L, py = 3.2 - Math.cos(th) * L;
      trail.push([px, py, 0]);
      if (trail.length > 240) trail.shift();
      for (let i = 0; i < trail.length; i++) dtrail.set(i, trail[i]);
      dtrail.obj.material = window.PHYS._lineMat(C().red, .3);
      dtrail.commit(trail.length);

      // support
      G.line([-1.1, 3.2, 0], [1.1, 3.2, 0], { color: C().ink, width: 2.6 });
      G.line([0, 3.2, 0], [0, 3.2, -1.2], { color: C().faint, width: 1 });
      // rod + bob
      G.line([0, 3.2, 0], [px, py, 0], { color: C().ink, width: 1.3 });
      G.sphere([px, py, 0], .21, { color: C().red, light: true });
      // velocity arrow
      const vt = w * L;
      G.arrow([px, py, 0], [px + Math.cos(th) * vt * .12, py + Math.sin(th) * vt * .12, 0], { color: C().teal, width: 1.6, head: 6 });

      const v = Math.abs(vt), h0 = L * (1 - Math.cos(th0.value * Math.PI / 180));
      const KE = .5 * v * v, PE = g * L * (1 - Math.cos(th));
      const Etot = g * h0;
      energyBars(ctx, 14, H - 54, 46, 7, [['E_k', KE, C().red], ['E_p', PE, C().teal]], Etot);

      host.setReadout([
        { k: '週期 T', v: fmt(TAU * Math.sqrt(L / g), 2), unit: 's' },
        { k: '當前擺角', v: fmt(th * 180 / Math.PI, 1), unit: '°' },
        { k: '速度 v', v: fmt(v, 2), unit: 'm/s' },
        { k: '機械能', v: fmt(KE + PE, 2), unit: 'J' }
      ]);
    });
    return {};
  });

  /* =============================================================== spring */
  PHYS.defineSim3D('spring', function (host) {
    const kk = host.addSlider({ label: '勁度係數 k', en: 'stiffness', min: 10, max: 120, step: 5, value: 40, unit: 'N/m', dp: 0 });
    const mm = host.addSlider({ label: '質量 m', en: 'mass', min: .5, max: 3, step: .1, value: 1, unit: 'kg', dp: 1 });
    const g = 9.8;
    let phase = 0;
    host.setCam({ az: .42, el: .08, dist: 7.2, fov: 42, target: [0, 2.1, 0] });
    const helix = host.dynLine(240, null, false);

    host.onTick((dt) => {
      const G = host.G, { W, H, ctx } = host;
      const k = kk.value, m = mm.value;
      const w0 = Math.sqrt(k / m);
      phase += dt * w0;
      const A = .28;
      const x = A * Math.sin(phase);
      const rest = 3.0 - m * g / k - 1.6;
      const yTop = 3.4, yMass = rest + x;

      G.line([-1.2, yTop, 0], [1.2, yTop, 0], { color: C().ink, width: 2.6 });
      for (let i = -1; i <= 1; i++) G.line([i * .8, yTop, 0], [i * .8 - .2, yTop + .25, 0], { color: C().faint, width: 1 });

      const coils = 9, r = .22, y1 = yMass + .32;
      const n = coils * 24 + 1;
      for (let i = 0; i < n; i++) {
        const t1 = i / (coils * 24);
        const a1 = t1 * coils * TAU;
        helix.set(i, [Math.cos(a1) * r, yTop + (y1 - yTop) * t1, Math.sin(a1) * r]);
      }
      helix.obj.material = window.PHYS._lineMat(C().ink, .85);
      helix.commit(n);

      G.box([0, yMass, 0], [.9, .62, .9], { color: C().red, edges: C().ink });
      G.text([0, yMass, .55], 'm', { size: 10, color: C().ink, align: 'center' });
      G.line([.72, rest, 0], [.72, yMass, 0], { color: C().teal, width: 1.6 });
      G.text([.78, (rest + yMass) / 2, 0], 'x', { size: 9, color: C().teal });

      const v = A * w0 * Math.cos(phase);
      const KE = .5 * m * v * v, PE = .5 * k * x * x + m * g * x;
      const E = .5 * k * A * A;
      energyBars(ctx, 14, H - 54, 46, 7, [['E_k', KE, C().red], ['E_p', PE, C().teal]], E);

      host.setReadout([
        { k: '週期 T', v: fmt(TAU * Math.sqrt(m / k), 2), unit: 's' },
        { k: '位移 x', v: fmt(x, 2), unit: 'm' },
        { k: '速度 v', v: fmt(v, 2), unit: 'm/s' },
        { k: '角頻率 ω', v: fmt(w0, 2), unit: 'rad/s' }
      ]);
    });
    return {};
  });

  /* ============================================================ collision */
  PHYS.defineSim3D('collision', function (host) {
    const m1s = host.addSlider({ label: 'A 質量', en: 'm1', min: .5, max: 5, step: .5, value: 2, unit: 'kg', dp: 1, oninput: reset });
    const v1s = host.addSlider({ label: 'A 初速度', en: 'v1', min: 1, max: 8, step: .5, value: 4, unit: 'm/s', dp: 1, oninput: reset });
    const m2s = host.addSlider({ label: 'B 質量', en: 'm2', min: .5, max: 5, step: .5, value: 3, unit: 'kg', dp: 1, oninput: reset });
    const v2s = host.addSlider({ label: 'B 初速度', en: 'v2', min: -6, max: 2, step: .5, value: 0, unit: 'm/s', dp: 1, oninput: reset });
    let elastic = true, x1 = -3.4, x2 = 1.4, u1 = 0, u2 = 0, done = false, timer = 0;
    host.addToggle('彈性碰撞', true, v => { elastic = v; reset(); });
    host.setCam({ az: .3, el: .2, dist: 9.6, fov: 40, target: [0, .55, 0] });

    function reset() {
      x1 = -3.4; x2 = 1.2; u1 = v1s.value; u2 = v2s.value; done = false; timer = 0;
    }
    reset();

    host.onTick((dt) => {
      const G = host.G, { W, H, ctx } = host;
      const m1 = m1s.value, m2 = m2s.value;
      const p0 = m1 * v1s.value + m2 * v2s.value;
      const E0 = .5 * m1 * v1s.value ** 2 + .5 * m2 * v2s.value ** 2;

      if (x1 + .38 >= x2 - .34 && !done) {
        done = true;
        if (elastic) {
          const a = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
          const b = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);
          u1 = a; u2 = b;
        } else {
          const v = (m1 * u1 + m2 * u2) / (m1 + m2);
          u1 = v; u2 = v;
        }
      }
      x1 += u1 * dt * .55; x2 += u2 * dt * .55;
      if (done) { timer += dt; if (timer > 2.6) reset(); }

      const pA = m1 * u1, pB = m2 * u2;
      const EA = .5 * m1 * u1 ** 2, EB = .5 * m2 * u2 ** 2;

      // rail
      G.line([-6, .06, -.5], [6, .06, -.5], { color: C().faint, width: 1.2 });
      G.line([-6, .06, .5], [6, .06, .5], { color: C().faint, width: 1.2 });

      G.boxBasis([x1, .42, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [.42, .34, .48], C().red, { edges: C().ink });
      G.boxBasis([x2, .42, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [.34, .3, .44], C().indigo, { edges: C().ink });
      G.text([x1, .95, 0], 'A ' + m1 + 'kg', { size: 9, color: C().red, align: 'center' });
      G.text([x2, .9, 0], 'B ' + m2 + 'kg', { size: 9, color: C().indigo, align: 'center' });
      if (Math.abs(u1) > .05) G.arrow([x1, .84, .6], [x1 + u1 * .2, .84, .6], { color: C().red, width: 1.6, head: 6 });
      if (Math.abs(u2) > .05) G.arrow([x2, .8, .6], [x2 + u2 * .2, .8, .6], { color: C().indigo, width: 1.6, head: 6 });

      const Emax = Math.max(E0, .01);
      energyBars(ctx, W - 78, 20, 44, 8, [['p_A', Math.abs(pA), C().red], ['p_B', Math.abs(pB), C().indigo]], Math.max(Math.abs(p0), 1));
      energyBars(ctx, W - 78, 74, 44, 8, [['E_k', EA + EB, C().ochre]], Emax);
      D.text(ctx, '動量守恆', W - 100, 12, C().soft, 8.5, 'right');

      host.setReadout([
        { k: '總動量 p', v: fmt(p0, 2), unit: 'kg·m/s' },
        { k: '碰後總動能', v: fmt(EA + EB, 2), unit: 'J' },
        { k: '碰前總動能', v: fmt(E0, 2), unit: 'J' },
        { k: '動能損失', v: fmt(E0 - EA - EB, 2), unit: 'J' }
      ]);
    });
    return {};
  });

  /* =========================================================== capacitor */
  PHYS.defineSim3D('capacitor', function (host) {
    const V = host.addSlider({ label: '電壓 U', en: 'voltage', min: 10, max: 500, step: 10, value: 200, unit: 'V', dp: 0 });
    const dd = host.addSlider({ label: '板間距 d', en: 'gap', min: .5, max: 4, step: .1, value: 1.5, unit: 'mm', dp: 1 });
    const AA = host.addSlider({ label: '正對面積 S', en: 'area', min: 10, max: 100, step: 5, value: 50, unit: 'cm²', dp: 0 });
    host.setCam({ az: .52, el: .16, dist: 7.5, fov: 40, target: [0, 0, 0] });

    host.onTick((dt) => {
      const G = host.G;
      const U = V.value, d = dd.value * 1e-3, S = AA.value * 1e-4;
      const eps0 = 8.854e-12;
      const Cc = eps0 * S / d;
      const Q = Cc * U;
      const E = U / d;

      const side = Math.sqrt(S) * 30;
      const gap = 1.4;
      G.boxBasis([-gap, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [.05, side / 2, side / 2], C().red, { edges: C().ink });
      G.boxBasis([gap, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [.05, side / 2, side / 2], C().indigo, { edges: C().ink });
      G.text([-gap, side / 2 + .18, 0], '+Q', { size: 10, color: C().red, align: 'center' });
      G.text([gap, side / 2 + .18, 0], '−Q', { size: 10, color: C().indigo, align: 'center' });

      for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
          G.arrow([-gap + .08, i * side * .3, j * side * .3], [gap - .08, i * side * .3, j * side * .3], { color: C().teal, width: 1.3, head: 6 });
        }
      }
      G.text([0, -side / 2 - .25, 0], 'E = U/d，板間勻強電場', { size: 9, color: C().soft, align: 'center' });

      host.setReadout([
        { k: '電容 C', v: fmt(Cc * 1e12, 1), unit: 'pF' },
        { k: '電荷 Q', v: fmt(Q * 1e9, 2), unit: 'nC' },
        { k: '場強 E', v: fmt(E / 1000, 1), unit: 'kV/m' },
        { k: '儲能', v: fmt(.5 * Cc * U * U * 1e6, 2), unit: 'µJ' }
      ]);
    });
    return {};
  });

  /* ================================================================ coil */
  PHYS.defineSim3D('coil', function (host) {
    const AA = host.addSlider({ label: '振幅', en: 'amplitude', min: .6, max: 2.2, step: .1, value: 1.6, dp: 1 });
    const spd = host.addSlider({ label: '頻率', en: 'frequency', min: .2, max: 1.2, step: .05, value: .5, unit: 'Hz', dp: 2 });
    let phase = 0;
    host.setCam({ az: .5, el: .22, dist: 8.6, fov: 40, target: [0, 0, 0] });
    const helix = host.dynLine(300, null, false);

    host.onTick((dt) => {
      const G = host.G, { W, H, ctx } = host;
      phase += dt * spd.value * TAU;
      const A = AA.value;
      const xm = A * Math.sin(phase);
      const vm = A * TAU * spd.value * Math.cos(phase);
      const sigma = 1.05, xc = 0;
      const Phi = 1.0 * Math.exp(-Math.pow((xm - xc) / sigma, 2));
      const dPhidx = Phi * (-2 * (xm - xc) / (sigma * sigma));
      const emf = -dPhidx * vm;

      // solenoid
      const r = 1.05, len = 2.4, turns = 9;
      const n = turns * 30 + 1;
      for (let i = 0; i < n; i++) {
        const t1 = i / (turns * 30);
        const a1 = t1 * turns * TAU;
        helix.set(i, [-len / 2 + len * t1, Math.cos(a1) * r, Math.sin(a1) * r]);
      }
      helix.obj.material = window.PHYS._lineMat(C().ochre, 1);
      helix.commit(n);
      G.text([0, -r - .3, 0], '線圈', { size: 9, color: C().ochre, align: 'center' });

      // magnet
      const mw = .75;
      G.boxBasis([xm - mw / 2, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [mw / 2, .26, .26], C().red, { edges: C().ink });
      G.boxBasis([xm + mw / 2, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [mw / 2, .26, .26], C().indigo, { edges: C().ink });
      G.text([xm - mw / 2, .42, 0], 'N', { size: 9, color: C().red, align: 'center' });
      G.text([xm + mw / 2, .42, 0], 'S', { size: 9, color: C().indigo, align: 'center' });
      G.arrow([xm, .62, 0], [xm + vm * .25, .62, 0], { color: C().teal, width: 1.5, head: 6 });

      // EMF graph on the overlay
      const gx = 12, gy = H - 74, gw = W - 24, gh = 58;
      D.line(ctx, gx, gy + gh / 2, gx + gw, gy + gh / 2, C().faint, .8);
      ctx.beginPath();
      for (let i = 0; i <= 90; i++) {
        const tt = i / 90;
        const ph = phase - (1 - tt) * 6.4;
        const xx = A * Math.sin(ph);
        const vv = A * TAU * spd.value * Math.cos(ph);
        const phh = Math.exp(-Math.pow(xx / sigma, 2));
        const e = -phh * (-2 * xx / (sigma * sigma)) * vv;
        const sx = gx + gw * tt, sy = gy + gh / 2 - clamp(e * .55, -1, 1) * gh * .46;
        i ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy);
      }
      ctx.strokeStyle = C().teal; ctx.lineWidth = 1.5; ctx.stroke();
      D.circle(ctx, gx + gw, gy + gh / 2 - clamp(emf * .55, -1, 1) * gh * .46, 3, C().red);
      D.text(ctx, '感應電動勢 ε', gx + 2, gy - 4, C().soft, 8.5);
      D.text(ctx, '磁體位置 x', gx + gw, gy + gh / 2 + 10, C().soft, 8.5, 'right');

      host.setReadout([
        { k: '磁通量 Φ', v: fmt(Phi, 2) },
        { k: '電動勢 ε', v: fmt(emf, 2), unit: 'V*' },
        { k: '磁體速度', v: fmt(vm, 2), unit: 'm/s' },
        { k: '感應電流', v: emf > .05 ? '逆時針' : emf < -.05 ? '順時針' : '無' }
      ]);
    });
    return {};
  });

  /* ============================================================= rotation */
  PHYS.defineSim3D('rotation', function (host) {
    const tau = host.addSlider({ label: '力矩 τ', en: 'torque', min: -8, max: 8, step: .5, value: 3, unit: 'N·m', dp: 1 });
    const inertia = host.addSlider({ label: '轉動慣量 I', en: 'inertia', min: .5, max: 8, step: .5, value: 2, unit: 'kg·m²', dp: 1 });
    let om = 0, ang = 0;
    host.setCam({ az: .55, el: .26, dist: 7, fov: 40, target: [0, .1, 0] });

    host.onTick((dt) => {
      const G = host.G, { W, H, ctx } = host;
      const I = inertia.value, Tq = tau.value;
      const alpha = Tq / I;
      om += alpha * dt;
      ang += om * dt;

      // axle
      G.line([0, 0, 0], [0, .9, 0], { color: C().ink, width: 3 });
      // disc
      G.disc([0, 0, 0], 1.55, [0, 1, 0], { fill: C().red, t: .06 });
      for (let i = 0; i < 8; i++) {
        const a = ang + i / 8 * TAU;
        G.line([0, .05, 0], [Math.cos(a) * 1.55, .05, Math.sin(a) * 1.55], { color: C().ink, width: 1.1 });
        G.sphere([Math.cos(a) * 1.55, .05, Math.sin(a) * 1.55], .07, { color: C().red });
      }
      const av = clamp(om * .25, -2.2, 2.2);
      if (Math.abs(av) > .05) {
        G.arrow([0, .9, 0], [0, .9 + av, 0], { color: C().teal, width: 1.8, head: 7 });
        G.text([0, .95 + av, 0], 'ω', { dx: 6, dy: -6, size: 10, color: C().teal });
      }
      G.text([0, -.05, 1.75], 'I = ' + I + ' kg·m²', { size: 9, color: C().soft, align: 'center' });

      host.setReadout([
        { k: '角加速度 α', v: fmt(alpha, 2), unit: 'rad/s²' },
        { k: '角速度 ω', v: fmt(om, 2), unit: 'rad/s' },
        { k: '角動量 L', v: fmt(I * om, 2), unit: 'kg·m²/s' },
        { k: '轉動動能', v: fmt(.5 * I * om * om, 1), unit: 'J' }
      ]);
    });
    return {};
  });

  /* ============================================================ buoyancy */
  PHYS.defineSim3D('buoyancy', function (host) {
    const rho = host.addSlider({ label: '物體密度 ρ', en: 'density', min: .2, max: 3, step: .1, value: .6, unit: 'g/cm³', dp: 1 });
    const water = host.addSlider({ label: '液體密度', en: 'liquid', min: .7, max: 1.6, step: .05, value: 1.0, unit: 'g/cm³', dp: 2 });
    const g = 9.8;
    const h = 1.3, side = 1.1;
    host.setCam({ az: .62, el: .18, dist: 10.5, fov: 40, target: [0, 1.4, 0] });

    host.onTick((dt) => {
      const G = host.G;
      const r = rho.value / water.value;
      const level = 2.05;
      let bottom, sub;
      if (r < 1) { sub = r * h; bottom = level - sub; }
      else { bottom = .06; sub = h; }
      const cy = bottom + h / 2;
      const Fb = water.value * 1000 * 9.8 * side * side * Math.min(sub, h);
      const Wt = rho.value * 1000 * 9.8 * side * side * h;

      // tank
      const tw = 3.2, td = 3.2, th = 3.0;
      G.line([-tw / 2, 0, -td / 2], [-tw / 2, th, -td / 2], { color: C().faint, width: 1 });
      G.line([tw / 2, 0, -td / 2], [tw / 2, th, -td / 2], { color: C().faint, width: 1 });
      G.line([-tw / 2, 0, td / 2], [-tw / 2, th, td / 2], { color: C().faint, width: 1 });
      G.line([tw / 2, 0, td / 2], [tw / 2, th, td / 2], { color: C().faint, width: 1 });
      G.poly([[-tw / 2, 0, -td / 2], [tw / 2, 0, -td / 2], [tw / 2, 0, td / 2], [-tw / 2, 0, td / 2]], { fill: C().teal });
      // water surface
      G.poly([[-tw / 2, level, -td / 2], [tw / 2, level, -td / 2], [tw / 2, level, td / 2], [-tw / 2, level, td / 2]],
        { fill: document.documentElement.dataset.theme === 'ink' ? 'rgba(111,184,173,.16)' : 'rgba(47,111,106,.16)' });
      G.line([-tw / 2, level, -td / 2], [-tw / 2, 0, -td / 2], { color: 'rgba(47,111,106,.3)', width: 1 });
      G.line([tw / 2, level, -td / 2], [tw / 2, 0, -td / 2], { color: 'rgba(47,111,106,.3)', width: 1 });

      // block
      G.boxBasis([0, cy, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [side / 2, h / 2, side / 2], r < 1 ? C().ochre : C().red, { edges: C().ink });

      // forces
      const sc = 1 / Math.max(Wt, Fb, 1) * 1.5;
      const Wh = Math.min(1.6, Wt * sc), Fh = Math.min(1.6, Fb * sc);
      G.arrow([0, cy, side / 2 + .05], [0, cy - Wh, side / 2 + .05], { color: C().ink, width: 2 });
      G.text([0, cy - Wh, side / 2 + .05], 'G', { dx: 8, dy: 6, size: 10, color: C().ink });
      if (sub > .02) {
        G.arrow([.35, bottom + .1, side / 2 + .05], [.35, bottom + .1 + Fh, side / 2 + .05], { color: C().teal, width: 2 });
        G.text([.35, bottom + .1 + Fh, side / 2 + .05], 'F浮', { dx: 8, dy: -6, size: 10, color: C().teal });
      }

      const state = r < 1 ? (r < .98 ? '漂浮' : '懸浮') : '沉底';
      host.setReadout([
        { k: '重力 G', v: fmt(Wt, 0), unit: 'N' },
        { k: '浮力 F', v: fmt(Fb, 0), unit: 'N' },
        { k: '浸入比例', v: fmt(Math.min(sub / h, 1) * 100, 0), unit: '%' },
        { k: '狀態', v: state }
      ]);
    });
    return {};
  });
})();
