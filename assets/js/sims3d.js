/* sims3d.js — three-dimensional interactive figures (motion, forces, orbits, fields, machines). */
(function () {
  const PHYS = window.PHYS, D = PHYS.draw, C = () => PHYS.C;
  const V = PHYS.v3, TAU = Math.PI * 2, clamp = PHYS.clamp, fmt = PHYS.fmt;
  const add = V.add, mul = V.mul;

  /* a box with an arbitrary orientation */
  function boxBasis(cam, c, u, v, w, half, color, o) {
    o = o || {};
    const P = [];
    for (let i = -1; i <= 1; i += 2) for (let j = -1; j <= 1; j += 2) for (let k = -1; k <= 1; k += 2) {
      P.push(add(c, add(mul(u, half[0] * i), add(mul(v, half[1] * j), mul(w, half[2] * k)))));
    }
    const faces = [[0, 1, 3, 2], [4, 5, 7, 6], [0, 1, 5, 4], [2, 3, 7, 6], [0, 2, 6, 4], [1, 3, 7, 5]];
    const shades = [.80, .98, .70, .90, .76, 1.0];
    faces.forEach((f, i) => cam.poly(f.map(k => P[k]), {
      fill: PHYS.mix(color, '#000', 1 - shades[i]), stroke: o.edges || null, width: o.width || 1
    }));
    if (o.edges) {
      [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
        .forEach(([a, b]) => cam.line(P[a], P[b], { color: o.edges, width: .9, alpha: .85 }));
    }
    return P;
  }
  PHYS.boxBasis = boxBasis;

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
  PHYS.defineSim('projectile', function (host, cfg) {
    let t = 0, hold = 0;
    const v0 = host.addSlider({ label: '初速度 v₀', en: 'v0', min: 4, max: 26, step: .5, value: 14, unit: 'm/s', dp: 1, oninput: () => { t = 0; hold = 0; } });
    const ang = host.addSlider({ label: '抛射角 θ', en: 'angle', min: 10, max: 80, step: 1, value: 45, unit: '°', dp: 0, oninput: () => { t = 0; hold = 0; } });
    let slow = !(cfg && cfg.slow === false);
    host.addToggle('慢放 ½', slow, v => slow = v);
    const g = 9.8;
    const cam = new PHYS.Cam3({ az: .55, el: .16, dist: 18, fov: 42 });
    const off = cam.bind(host.canvas);

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const th = ang.value * Math.PI / 180, v = v0.value;
      const vx = v * Math.cos(th), vy0 = v * Math.sin(th);
      const T = 2 * vy0 / g, R = vx * T, Hmax = vy0 * vy0 / (2 * g);
      if (t < T) { t += dt * (slow ? .5 : 1); }
      else { hold += dt; if (hold > 1) { t = 0; hold = 0; } }
      const tt = Math.min(t, T);
      const bx = vx * tt, by = vy0 * tt - .5 * g * tt * tt;
      const vy = vy0 - g * tt;

      const dist = clamp(Math.max(R, 14) * 1.05 + 6, 14, 46);
      cam.target = [Math.max(R * .45, 4), Math.max(Hmax * .45, 1.5), 0];
      cam.dist = dist;
      cam.frame(W, H, dt);
      cam.ground(20, 4, { alpha: .7 });

      // full path
      const path = [];
      for (let i = 0; i <= 80; i++) {
        const s = T * i / 80;
        path.push([vx * s, vy0 * s - .5 * g * s * s, 0]);
      }
      for (let i = 0; i < path.length - 1; i++) cam.line(path[i], path[i + 1], { color: C().faint, width: .9, dash: [3, 4] });

      // strobe
      for (let s = 0; s <= tt; s += .06) {
        cam.sphere([vx * s, vy0 * s - .5 * g * s * s, 0], .11, { color: C().soft });
      }
      // apex + range marks
      cam.line([R, 0, 0], [R, .6, 0], { color: C().soft, width: 1 });
      cam.text([R, 0, 0], 'R=' + fmt(R, 1) + ' m', { dy: 14, size: 9, color: C().soft, align: 'center' });
      cam.line([R / 2, Hmax, 0], [R / 2, 0, 0], { color: C().grid, width: .9, dash: [2, 4] });
      cam.text([R / 2, Hmax, 0], 'H=' + fmt(Hmax, 1) + ' m', { dy: -10, size: 9, color: C().soft, align: 'center' });

      // ball
      cam.sphere([bx, by, 0], .26, { color: C().red });
      // velocity + components
      const k = .35;
      cam.arrow([bx, by, 0], [bx + vx * k, by + vy * k, 0], { color: C().red, width: 2 });
      cam.arrow([bx, by, 0], [bx + vx * k, by, 0], { color: C().teal, width: 1.4, dash: [4, 3] });
      cam.arrow([bx, by, 0], [bx, by + vy * k, 0], { color: C().ochre, width: 1.4, dash: [4, 3] });
      cam.text([bx + vx * k, by + vy * k, 0], 'v', { color: C().red, dx: 4, dy: -8, size: 10 });
      cam.text([bx + vx * k, by, 0], 'vₓ', { color: C().teal, dx: 4, dy: 8, size: 9 });
      cam.text([bx, by + vy * k, 0], 'v_y', { color: C().ochre, dx: -6, dy: -6, size: 9, align: 'right' });
      cam.end(ctx);

      host.setReadout([
        { k: 't', v: fmt(tt, 2), unit: 's' },
        { k: 'x', v: fmt(bx, 1), unit: 'm' },
        { k: 'y', v: fmt(by, 1), unit: 'm' },
        { k: 'v', v: fmt(Math.hypot(vx, vy), 1), unit: 'm/s' },
        { k: 'v_y', v: fmt(vy, 1), unit: 'm/s' }
      ]);
    });
    return { destroy: off };
  });

  /* ============================================================== incline */
  PHYS.defineSim('incline', function (host) {
    const th = host.addSlider({ label: '倾角 θ', en: 'angle', min: 5, max: 45, step: 1, value: 25, unit: '°', dp: 0 });
    const mu = host.addSlider({ label: '动摩擦因数 μ', en: 'friction', min: 0, max: .8, step: .02, value: .25, dp: 2 });
    const mm = host.addSlider({ label: '质量 m', en: 'mass', min: 1, max: 8, step: .5, value: 3, unit: 'kg', dp: 1 });
    let showComp = false;
    host.addToggle('分解重力', false, v => showComp = v);
    const cam = new PHYS.Cam3({ az: .62, el: .22, dist: 12, fov: 40 });
    const off = cam.bind(host.canvas);
    const g = 9.8;

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const a = th.value * Math.PI / 180, m = mm.value, k = mu.value;
      const L = 4.6, Hh = L * Math.tan(a);
      const moving = Math.tan(a) > k;
      const acc = moving ? g * (Math.sin(a) - k * Math.cos(a)) : 0;
      const mg = m * g, N = mg * Math.cos(a), f = moving ? k * N : mg * Math.sin(a);

      cam.target = [L * .45, Hh * .45, 0];
      cam.dist = 11.5;
      cam.frame(W, H, dt);
      cam.ground(10, 2, { alpha: .55 });

      // wedge
      cam.poly([[0, 0, -1.6], [L, 0, -1.6], [L, Hh, -1.6], [0, 0, -1.6]], { fill: PHYS.mix(C().ink, C().bg, .88), stroke: C().faint });
      cam.poly([[0, 0, 1.6], [L, 0, 1.6], [L, Hh, 1.6], [0, 0, 1.6]], { fill: PHYS.mix(C().ink, C().bg, .93), stroke: C().faint });
      cam.poly([[0, 0, -1.6], [L, 0, -1.6], [L, 0, 1.6], [0, 0, 1.6]], { fill: PHYS.mix(C().ink, C().bg, .86), stroke: C().faint });
      cam.poly([[0, 0, -1.6], [L, Hh, -1.6], [L, Hh, 1.6], [0, 0, 1.6]], { fill: PHYS.mix(C().ink, C().bg, .96), stroke: C().faint });
      cam.line([0, 0, 0], [L, Hh, 0], { color: C().ink, width: 1.2 });
      cam.text([L, Hh, 0], 'θ=' + th.value + '°', { dx: 6, dy: -6, size: 9, color: C().soft });

      // block
      const s = 3.1;
      const u = [Math.cos(a), Math.sin(a), 0], n = [-Math.sin(a), Math.cos(a), 0];
      const c = add(mul(u, s), mul(n, .34));
      boxBasis(cam, c, u, n, [0, 0, 1], [.42, .34, .62], C().red, { edges: C().ink });

      // forces
      const O = add(c, mul(n, .30));
      const sc = 26 / Math.max(1, mg);
      cam.arrow(O, add(O, [0, -mg * sc * .1, 0]), { color: C().ink, width: 2 });
      cam.text(add(O, [0, -mg * sc * .1, 0]), 'mg', { dx: 8, dy: 6, size: 9.5, color: C().ink });
      cam.arrow(O, add(O, mul(n, N * sc * .1)), { color: C().teal, width: 2 });
      cam.text(add(O, mul(n, N * sc * .1)), 'N', { dx: 6, dy: -6, size: 9.5, color: C().teal });
      const fdir = mul(u, -1);
      cam.arrow(O, add(O, mul(fdir, f * sc * .1)), { color: C().ochre, width: 2 });
      cam.text(add(O, mul(fdir, f * sc * .1)), 'f', { dx: -4, dy: -8, size: 9.5, color: C().ochre, align: 'right' });

      if (showComp) {
        const O2 = add(c, mul(n, .30));
        cam.arrow([O2[0], O2[1], -0.8], add([O2[0], O2[1], -0.8], mul(u, -mg * Math.sin(a) * sc * .1)), { color: C().indigo, width: 1.4, dash: [4, 3] });
        cam.arrow([O2[0], O2[1], -0.8], add([O2[0], O2[1], -0.8], mul(n, -mg * Math.cos(a) * sc * .1)), { color: C().indigo, width: 1.4, dash: [4, 3] });
        cam.text(add([O2[0], O2[1], -0.8], mul(u, -mg * Math.sin(a) * sc * .1)), 'mg sinθ', { dx: -4, dy: 10, size: 9, color: C().indigo, align: 'right' });
      }

      // acceleration arrow along slope
      if (acc > .05) {
        const O3 = add(c, [0, .55, 0]);
        cam.arrow(O3, add(O3, mul(u, -Math.min(1.6, acc * .18))), { color: C().red, width: 1.6, dash: [5, 3] });
        cam.text(add(O3, mul(u, -Math.min(1.6, acc * .18))), 'a', { dx: -4, dy: -8, size: 10, color: C().red, align: 'right' });
      }
      cam.end(ctx);

      host.setReadout([
        { k: '沿斜面合力', v: fmt(moving ? mg * Math.sin(a) - f : 0, 1), unit: 'N' },
        { k: '支持力 N', v: fmt(N, 1), unit: 'N' },
        { k: '摩擦力 f', v: fmt(f, 1), unit: 'N' },
        { k: '加速度 a', v: fmt(acc, 2), unit: 'm/s²' },
        { k: '状态', v: moving ? '下滑' : '静止' }
      ]);
    });
    return { destroy: off };
  });

  /* ============================================================= elevator */
  PHYS.defineSim('elevator', function (host) {
    const acc = host.addSlider({ label: '电梯加速度 a', en: 'acceleration', min: -6, max: 6, step: .5, value: 2, unit: 'm/s²', dp: 1 });
    const mm = host.addSlider({ label: '人的质量 m', en: 'mass', min: 30, max: 100, step: 5, value: 60, unit: 'kg', dp: 0 });
    const cam = new PHYS.Cam3({ az: .48, el: .12, dist: 11, fov: 42 });
    const off = cam.bind(host.canvas);
    const g = 9.8;

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const a = acc.value, m = mm.value;
      const N = m * (g + a), mg = m * g;
      cam.target = [0, 1.6, 0];
      cam.dist = 10.5;
      cam.frame(W, H, dt);
      cam.ground(6, 2, { alpha: .4 });

      // cabin
      const cw = 2.2, chh = 2.8, cd = 2.2;
      const c = [0, chh / 2 + .05, 0];
      cam.box(c, [cw, chh, cd], { color: C().bg, edges: C().ink, width: 1.2 });
      // floor
      cam.poly([[-cw / 2, .1, -cd / 2], [cw / 2, .1, -cd / 2], [cw / 2, .1, cd / 2], [-cw / 2, .1, cd / 2]], { fill: PHYS.mix(C().ink, C().bg, .82), stroke: C().ink });

      // person: body + head
      const py = .1 + .45;
      cam.line([0, py + .35, 0], [0, py + 1.15, 0], { color: C().ink, width: 3.2 });
      cam.line([0, py + .95, 0], [-.35, py + .55, 0], { color: C().ink, width: 2 });
      cam.line([0, py + .95, 0], [.35, py + .55, 0], { color: C().ink, width: 2 });
      cam.line([0, py + .35, 0], [-.28, py - .2, 0], { color: C().ink, width: 2.4 });
      cam.line([0, py + .35, 0], [.28, py - .2, 0], { color: C().ink, width: 2.4 });
      cam.sphere([0, py + 1.34, 0], .16, { color: C().ink });

      // scale/floor force
      const sc = 1 / Math.max(mg, 1);
      cam.arrow([0.55, .16, 0], [0.55, .16 + Math.min(2.4, N * sc * 1.8), 0], { color: C().teal, width: 2.2 });
      cam.text([0.55, .16 + Math.min(2.4, N * sc * 1.8), 0], 'N=' + fmt(N, 0) + 'N', { dx: 6, dy: -6, size: 9.5, color: C().teal });
      cam.arrow([-.55, 1.5, 0], [-.55, 1.5 - Math.min(2.4, mg * sc * 1.8), 0], { color: C().ink, width: 2 });
      cam.text([-.55, 1.5 - Math.min(2.4, mg * sc * 1.8), 0], 'mg', { dx: -6, dy: 4, size: 9.5, color: C().ink, align: 'right' });

      // motion arrow
      if (Math.abs(a) > .2) {
        const up = a > 0;
        cam.arrow([cw / 2 + .5, 1.9, 0], [cw / 2 + .5, 1.9 + (up ? .7 : -.7), 0], { color: C().red, width: 1.6 });
        cam.text([cw / 2 + .5, 1.9 + (up ? .8 : -.8), 0], 'a', { dx: 5, size: 9, color: C().red });
      }
      cam.end(ctx);

      const state = Math.abs(a) < .2 ? '平衡' : a > 0 ? '超重' : '失重';
      D.text(ctx, state, W - 14, 18, a > .2 ? C().red : a < -.2 ? C().indigo : C().teal, 13, 'right');

      host.setReadout([
        { k: '体重 mg', v: fmt(mg, 0), unit: 'N' },
        { k: '支持力 N', v: fmt(N, 0), unit: 'N' },
        { k: '视重/实重', v: fmt(N / mg, 2) },
        { k: '状态', v: state }
      ]);
    });
    return { destroy: off };
  });

  /* ================================================================ orbit */
  PHYS.defineSim('orbit', function (host) {
    const RR = host.addSlider({ label: '轨道半径', en: 'radius', min: 1.15, max: 5, step: .05, value: 1.6, unit: 'R⊕', dp: 2 });
    const cam = new PHYS.Cam3({ az: .6, el: .42, dist: 9, fov: 38 });
    const off = cam.bind(host.canvas);
    const GM = 3.986e14, RE = 6.371e6;
    let phase = 0;

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const r = RR.value * RE;
      const v = Math.sqrt(GM / r);
      const T = TAU * r / v;
      phase += dt * 2 * Math.PI / (T * .55);
      const scale = 3.1 / RR.value;
      cam.target = [0, 0, 0];
      cam.dist = 8.4;
      cam.frame(W, H, dt);

      // Earth
      cam.sphere([0, 0, 0], 1, { color: C().indigo, light: PHYS.mix(C().indigo, '#fff', .5) });
      cam.line([0, -1.35, 0], [0, 1.35, 0], { color: C().soft, width: .8, alpha: .5 });
      // orbit ring
      const N = 96;
      for (let i = 0; i < N; i++) {
        const a1 = i / N * TAU, a2 = (i + 1) / N * TAU;
        cam.line([Math.cos(a1) * RR.value, 0, Math.sin(a1) * RR.value],
                 [Math.cos(a2) * RR.value, 0, Math.sin(a2) * RR.value],
                 { color: C().faint, width: 1, dash: [4, 4] });
      }
      const px = Math.cos(phase) * RR.value, pz = Math.sin(phase) * RR.value;
      cam.sphere([px, 0, pz], .12, { color: C().red });
      const dir = [-Math.sin(phase), 0, Math.cos(phase)];
      cam.arrow([px, 0, pz], [px + dir[0] * 1.0, 0, pz + dir[2] * 1.0], { color: C().teal, width: 1.8, head: 7 });
      cam.text([px + dir[0] * 1.05, 0, pz + dir[2] * 1.05], 'v', { dx: 3, dy: -8, size: 9.5, color: C().teal });
      cam.arrow([px, 0, pz], [px * .74, 0, pz * .74], { color: C().red, width: 1.8, head: 7 });
      cam.text([px * .7, 0, pz * .7], 'F', { dx: 4, dy: 10, size: 9.5, color: C().red });
      cam.end(ctx);

      host.setReadout([
        { k: '轨道半径', v: fmt(r / 1000, 0), unit: 'km' },
        { k: '线速度', v: fmt(v / 1000, 2), unit: 'km/s' },
        { k: '周期', v: fmt(T / 3600, 2), unit: 'h' },
        { k: '向心加速度', v: fmt(GM / (r * r), 2), unit: 'm/s²' }
      ]);
    });
    return { destroy: off };
  });

  /* ============================================================= pendulum */
  PHYS.defineSim('pendulum', function (host) {
    const LL = host.addSlider({ label: '摆长 L', en: 'length', min: 1, max: 4, step: .1, value: 2, unit: 'm', dp: 1, oninput: () => { th = .5; w = 0; } });
    const th0 = host.addSlider({ label: '初始摆角', en: 'amplitude', min: 5, max: 40, step: 1, value: 20, unit: '°', dp: 0, oninput: v => { th = v * Math.PI / 180; w = 0; } });
    const cam = new PHYS.Cam3({ az: .5, el: .1, dist: 6.5, fov: 40 });
    const off = cam.bind(host.canvas);
    const g = 9.8;
    let th = 20 * Math.PI / 180, w = 0, trail = [];

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const L = LL.value;
      for (let i = 0; i < 4; i++) {
        const h = dt / 4;
        w += -g / L * Math.sin(th) * h;
        th += w * h;
      }
      const px = Math.sin(th) * L, py = 3.2 - Math.cos(th) * L;
      trail.push([px, py, 0]);
      if (trail.length > 220) trail.shift();

      cam.target = [0, 1.9, 0];
      cam.dist = Math.max(6.2, L * 2.1);
      cam.frame(W, H, dt);
      cam.ground(4, 1, { alpha: .35 });
      // support
      cam.line([-1.1, 3.2, 0], [1.1, 3.2, 0], { color: C().ink, width: 2.5 });
      cam.line([0, 3.2, 0], [0, 3.2, -1.2], { color: C().faint, width: 1 });

      for (let i = 0; i < trail.length - 1; i++) {
        cam.line([trail[i][0], trail[i][1], 0], [trail[i + 1][0], trail[i + 1][1], 0], { color: C().red, width: 1, alpha: .28 });
      }
      cam.line([0, 3.2, 0], [px, py, 0], { color: C().ink, width: 1.2 });
      cam.sphere([px, py, 0], .2, { color: C().red });
      // velocity arrow
      const vt = w * L;
      cam.arrow([px, py, 0], [px + Math.cos(th) * vt * .12, py + Math.sin(th) * vt * .12, 0], { color: C().teal, width: 1.6, head: 6 });
      cam.end(ctx);

      const v = Math.abs(vt), h0 = L * (1 - Math.cos(th0.value * Math.PI / 180));
      const KE = .5 * v * v, PE = g * L * (1 - Math.cos(th));
      const Etot = g * h0;
      energyBars(ctx, 14, H - 54, 46, 7, [['E_k', KE, C().red], ['E_p', PE, C().teal]], Etot);

      host.setReadout([
        { k: '周期 T', v: fmt(TAU * Math.sqrt(L / g), 2), unit: 's' },
        { k: '当前摆角', v: fmt(th * 180 / Math.PI, 1), unit: '°' },
        { k: '速度 v', v: fmt(v, 2), unit: 'm/s' },
        { k: '机械能', v: fmt(KE + PE, 2), unit: 'J' }
      ]);
    });
    return { destroy: off };
  });

  /* =============================================================== spring */
  PHYS.defineSim('spring', function (host) {
    const kk = host.addSlider({ label: '劲度系数 k', en: 'stiffness', min: 10, max: 120, step: 5, value: 40, unit: 'N/m', dp: 0 });
    const mm = host.addSlider({ label: '质量 m', en: 'mass', min: .5, max: 3, step: .1, value: 1, unit: 'kg', dp: 1 });
    const cam = new PHYS.Cam3({ az: .42, el: .08, dist: 7.5, fov: 42 });
    const off = cam.bind(host.canvas);
    const g = 9.8;
    let phase = 0;

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const k = kk.value, m = mm.value;
      const w0 = Math.sqrt(k / m);
      phase += dt * w0;
      const A = .28;
      const x = A * Math.sin(phase);
      const rest = 3.0 - m * g / k - 1.6;   // equilibrium y of the mass top
      const yTop = 3.4, yMass = rest + x;

      cam.target = [0, 2.1, 0];
      cam.dist = 7.2;
      cam.frame(W, H, dt);
      cam.line([-1.2, yTop, 0], [1.2, yTop, 0], { color: C().ink, width: 2.5 });
      for (let i = -1; i <= 1; i++) cam.line([i * .8, yTop, 0], [i * .8 - .2, yTop + .25, 0], { color: C().faint, width: .8 });

      // helix
      const coils = 9, y0 = yTop, y1 = yMass + .32, r = .22;
      for (let i = 0; i < coils * 24; i++) {
        const t1 = i / (coils * 24), t2 = (i + 1) / (coils * 24);
        const a1 = t1 * coils * TAU, a2 = t2 * coils * TAU;
        cam.line([Math.cos(a1) * r, y0 + (y1 - y0) * t1, Math.sin(a1) * r],
                 [Math.cos(a2) * r, y0 + (y1 - y0) * t2, Math.sin(a2) * r],
                 { color: C().ink, width: 1.1, alpha: .85 });
      }
      cam.box([0, yMass, 0], [.9, .62, .9], { color: C().red, edges: C().ink });
      cam.text([0, yMass, .5], 'm', { dy: 0, size: 10, color: C().ink, align: 'center' });
      // displacement marker
      cam.line([.72, rest, 0], [.72, yMass, 0], { color: C().teal, width: 1.6 });
      cam.text([.78, (rest + yMass) / 2, 0], 'x', { size: 9, color: C().teal });
      cam.end(ctx);

      const v = A * w0 * Math.cos(phase);
      const KE = .5 * m * v * v, PE = .5 * k * x * x + m * g * x;
      const E = .5 * k * A * A;
      energyBars(ctx, 14, H - 54, 46, 7, [['E_k', KE, C().red], ['E_p', PE, C().teal]], E);

      host.setReadout([
        { k: '周期 T', v: fmt(TAU * Math.sqrt(m / k), 2), unit: 's' },
        { k: '位移 x', v: fmt(x, 2), unit: 'm' },
        { k: '速度 v', v: fmt(v, 2), unit: 'm/s' },
        { k: '角频率 ω', v: fmt(w0, 2), unit: 'rad/s' }
      ]);
    });
    return { destroy: off };
  });

  /* ============================================================ collision */
  PHYS.defineSim('collision', function (host) {
    const m1s = host.addSlider({ label: 'A 质量', en: 'm1', min: .5, max: 5, step: .5, value: 2, unit: 'kg', dp: 1, oninput: reset });
    const v1s = host.addSlider({ label: 'A 初速度', en: 'v1', min: 1, max: 8, step: .5, value: 4, unit: 'm/s', dp: 1, oninput: reset });
    const m2s = host.addSlider({ label: 'B 质量', en: 'm2', min: .5, max: 5, step: .5, value: 3, unit: 'kg', dp: 1, oninput: reset });
    const v2s = host.addSlider({ label: 'B 初速度', en: 'v2', min: -6, max: 2, step: .5, value: 0, unit: 'm/s', dp: 1, oninput: reset });
    let elastic = true, x1 = -3.4, x2 = 1.4, u1 = 0, u2 = 0, done = false, timer = 0;
    host.addToggle('弹性碰撞', true, v => { elastic = v; reset(); });
    const cam = new PHYS.Cam3({ az: .28, el: .16, dist: 10, fov: 40 });
    const off = cam.bind(host.canvas);

    function reset() {
      x1 = -3.4; x2 = 1.2; u1 = v1s.value; u2 = v2s.value; done = false; timer = 0;
    }
    reset();

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const m1 = m1s.value, m2 = m2s.value;
      const p0 = m1 * v1s.value + m2 * v2s.value;
      const E0 = .5 * m1 * v1s.value ** 2 + .5 * m2 * v2s.value ** 2;

      if (!done) {
        x1 += u1 * dt * .55;
        x2 += u2 * dt * .55;
        if (x1 + .38 >= x2 - .34) {
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
      } else {
        x1 += u1 * dt * .55; x2 += u2 * dt * .55;
        timer += dt;
        if (timer > 2.6) reset();
      }

      const pA = m1 * u1, pB = m2 * u2;
      const EA = .5 * m1 * u1 ** 2, EB = .5 * m2 * u2 ** 2;

      cam.target = [0, .55, 0];
      cam.dist = 9.2;
      cam.frame(W, H, dt);
      cam.ground(8, 2, { alpha: .5 });
      // rail
      cam.line([-6, .06, -.5], [6, .06, -.5], { color: C().faint, width: 1.2 });
      cam.line([-6, .06, .5], [6, .06, .5], { color: C().faint, width: 1.2 });

      boxBasis(cam, [x1, .42, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [.42, .34, .48], C().red, { edges: C().ink });
      boxBasis(cam, [x2, .42, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [.34, .3, .44], C().indigo, { edges: C().ink });
      cam.text([x1, .95, 0], 'A ' + m1 + 'kg', { size: 9, color: C().red, align: 'center' });
      cam.text([x2, .9, 0], 'B ' + m2 + 'kg', { size: 9, color: C().indigo, align: 'center' });
      if (Math.abs(u1) > .05) cam.arrow([x1, .42 + .42, .6], [x1 + u1 * .2, .84, .6], { color: C().red, width: 1.6, head: 6 });
      if (Math.abs(u2) > .05) cam.arrow([x2, .42 + .38, .6], [x2 + u2 * .2, .8, .6], { color: C().indigo, width: 1.6, head: 6 });
      cam.end(ctx);

      const Emax = Math.max(E0, .01);
      energyBars(ctx, W - 78, 20, 44, 8, [['p_A', Math.abs(pA), C().red], ['p_B', Math.abs(pB), C().indigo]], Math.max(Math.abs(p0), 1));
      energyBars(ctx, W - 78, 74, 44, 8, [['E_k', EA + EB, C().ochre]], Emax);
      D.text(ctx, '动量守恒', W - 100, 12, C().soft, 8.5, 'right');

      host.setReadout([
        { k: '总动量 p', v: fmt(p0, 2), unit: 'kg·m/s' },
        { k: '碰后总动能', v: fmt(EA + EB, 2), unit: 'J' },
        { k: '碰前总动能', v: fmt(E0, 2), unit: 'J' },
        { k: '动能损失', v: fmt(E0 - EA - EB, 2), unit: 'J' }
      ]);
    });
    return { destroy: off };
  });

  /* =========================================================== capacitor */
  PHYS.defineSim('capacitor', function (host) {
    const V = host.addSlider({ label: '电压 U', en: 'voltage', min: 10, max: 500, step: 10, value: 200, unit: 'V', dp: 0 });
    const dd = host.addSlider({ label: '板间距 d', en: 'gap', min: .5, max: 4, step: .1, value: 1.5, unit: 'mm', dp: 1 });
    const AA = host.addSlider({ label: '正对面积 S', en: 'area', min: 10, max: 100, step: 5, value: 50, unit: 'cm²', dp: 0 });
    const cam = new PHYS.Cam3({ az: .52, el: .16, dist: 8, fov: 40 });
    const off = cam.bind(host.canvas);

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const U = V.value, d = dd.value * 1e-3, S = AA.value * 1e-4;
      const eps0 = 8.854e-12;
      const Cc = eps0 * S / d;
      const Q = Cc * U;
      const E = U / d;

      const side = Math.sqrt(S) * 30;
      const gap = 1.4;
      cam.target = [0, 0, 0];
      cam.dist = 7.5;
      cam.frame(W, H, dt);

      // plates (in y-z plane)
      boxBasis(cam, [-gap, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [.05, side / 2, side / 2], C().red, { edges: C().ink });
      boxBasis(cam, [gap, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [.05, side / 2, side / 2], C().indigo, { edges: C().ink });
      cam.text([-gap, side / 2 + .18, 0], '+Q', { size: 10, color: C().red, align: 'center' });
      cam.text([gap, side / 2 + .18, 0], '−Q', { size: 10, color: C().indigo, align: 'center' });

      // field arrows between plates
      for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
          cam.arrow([-gap + .08, i * side * .3, j * side * .3], [gap - .08, i * side * .3, j * side * .3], { color: C().teal, width: 1.3, head: 6 });
        }
      }
      cam.text([0, -side / 2 - .25, 0], 'E = U/d，板间匀强电场', { size: 9, color: C().soft, align: 'center' });
      cam.end(ctx);

      host.setReadout([
        { k: '电容 C', v: fmt(Cc * 1e12, 1), unit: 'pF' },
        { k: '电荷 Q', v: fmt(Q * 1e9, 2), unit: 'nC' },
        { k: '场强 E', v: fmt(E / 1000, 1), unit: 'kV/m' },
        { k: '储能', v: fmt(.5 * Cc * U * U * 1e6, 2), unit: 'µJ' }
      ]);
    });
    return { destroy: off };
  });

  /* ================================================================ coil */
  PHYS.defineSim('coil', function (host) {
    const AA = host.addSlider({ label: '振幅', en: 'amplitude', min: .6, max: 2.2, step: .1, value: 1.6, dp: 1 });
    const spd = host.addSlider({ label: '频率', en: 'frequency', min: .2, max: 1.2, step: .05, value: .5, unit: 'Hz', dp: 2 });
    const cam = new PHYS.Cam3({ az: .5, el: .22, dist: 9, fov: 40 });
    const off = cam.bind(host.canvas);
    let phase = 0;

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      phase += dt * spd.value * TAU;
      const A = AA.value;
      const xm = A * Math.sin(phase);
      const vm = A * TAU * spd.value * Math.cos(phase);
      const sigma = 1.05, xc = 0;
      const Phi = 1.0 * Math.exp(-Math.pow((xm - xc) / sigma, 2));
      const dPhidx = Phi * (-2 * (xm - xc) / (sigma * sigma));
      const emf = -dPhidx * vm;

      cam.target = [0, 0, 0];
      cam.dist = 8.6;
      cam.frame(W, H, dt);
      cam.ground(5, 1, { alpha: .3 });

      // solenoid
      const r = 1.05, len = 2.4, turns = 9;
      for (let i = 0; i < turns * 30; i++) {
        const t1 = i / (turns * 30), t2 = (i + 1) / (turns * 30);
        const a1 = t1 * turns * TAU, a2 = t2 * turns * TAU;
        cam.line([-len / 2 + len * t1, Math.cos(a1) * r, Math.sin(a1) * r],
                 [-len / 2 + len * t2, Math.cos(a2) * r, Math.sin(a2) * r],
                 { color: C().ochre, width: 1.6 });
      }
      cam.text([0, -r - .3, 0], '线圈', { size: 9, color: C().ochre, align: 'center' });

      // magnet
      const mw = .75;
      boxBasis(cam, [xm - mw / 2, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [mw / 2, .26, .26], C().red, { edges: C().ink });
      boxBasis(cam, [xm + mw / 2, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [mw / 2, .26, .26], C().indigo, { edges: C().ink });
      cam.text([xm - mw / 2, .42, 0], 'N', { size: 9, color: C().red, align: 'center' });
      cam.text([xm + mw / 2, .42, 0], 'S', { size: 9, color: C().indigo, align: 'center' });
      // motion arrow
      cam.arrow([xm, .62, 0], [xm + vm * .25, .62, 0], { color: C().teal, width: 1.5, head: 6 });
      cam.end(ctx);

      // EMF graph overlay
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
      D.text(ctx, '感应电动势 ε', gx + 2, gy - 4, C().soft, 8.5);
      D.text(ctx, '磁体位置 x', gx + gw, gy + gh / 2 + 10, C().soft, 8.5, 'right');

      host.setReadout([
        { k: '磁通量 Φ', v: fmt(Phi, 2) },
        { k: '电动势 ε', v: fmt(emf * 1, 2), unit: 'V*' },
        { k: '磁体速度', v: fmt(vm, 2), unit: 'm/s' },
        { k: '感应电流', v: emf > .05 ? '逆时针' : emf < -.05 ? '顺时针' : '无' }
      ]);
    });
    return { destroy: off };
  });

  /* ============================================================= rotation */
  PHYS.defineSim('rotation', function (host) {
    const tau = host.addSlider({ label: '力矩 τ', en: 'torque', min: -8, max: 8, step: .5, value: 3, unit: 'N·m', dp: 1 });
    const inertia = host.addSlider({ label: '转动惯量 I', en: 'inertia', min: .5, max: 8, step: .5, value: 2, unit: 'kg·m²', dp: 1 });
    let om = 0, ang = 0;
    const cam = new PHYS.Cam3({ az: .55, el: .26, dist: 7, fov: 40 });
    const off = cam.bind(host.canvas);

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const I = inertia.value, T = tau.value;
      const alpha = T / I;
      om += alpha * dt;
      ang += om * dt;

      cam.target = [0, .1, 0];
      cam.dist = 6.8;
      cam.frame(W, H, dt);
      cam.ground(4, 1, { alpha: .4 });
      // axle
      cam.line([0, 0, 0], [0, .9, 0], { color: C().ink, width: 3 });
      // disc
      cam.disc([0, 0, 0], 1.55, [0, 1, 0], { fill: PHYS.mix(C().red, C().bg, .88), stroke: C().ink, seg: 56 });
      cam.disc([0, .02, 0], 1.55, [0, 1, 0], { fill: null, stroke: C().ink, seg: 56 });
      for (let i = 0; i < 8; i++) {
        const a = ang + i / 8 * TAU;
        cam.line([0, .03, 0], [Math.cos(a) * 1.55, .03, Math.sin(a) * 1.55], { color: C().red, width: 1.2, alpha: .8 });
        cam.sphere([Math.cos(a) * 1.55, .04, Math.sin(a) * 1.55], .07, { color: C().red });
      }
      // angular velocity arrow
      const av = clamp(om * .25, -2.2, 2.2);
      if (Math.abs(av) > .05) {
        cam.arrow([0, .9, 0], [0, .9 + av, 0], { color: C().teal, width: 1.8, head: 7 });
        cam.text([0, .95 + av, 0], 'ω', { dx: 6, dy: -6, size: 10, color: C().teal });
      }
      cam.text([0, -.05, 1.7], 'I = ' + I + ' kg·m²', { size: 9, color: C().soft, align: 'center' });
      cam.end(ctx);

      host.setReadout([
        { k: '角加速度 α', v: fmt(alpha, 2), unit: 'rad/s²' },
        { k: '角速度 ω', v: fmt(om, 2), unit: 'rad/s' },
        { k: '角动量 L', v: fmt(I * om, 2), unit: 'kg·m²/s' },
        { k: '转动动能', v: fmt(.5 * I * om * om, 1), unit: 'J' }
      ]);
    });
    return { destroy: off };
  });

  /* ============================================================ buoyancy */
  PHYS.defineSim('buoyancy', function (host) {
    const rho = host.addSlider({ label: '物体密度 ρ', en: 'density', min: .2, max: 3, step: .1, value: .6, unit: 'g/cm³', dp: 1 });
    const water = host.addSlider({ label: '液体密度', en: 'liquid', min: .7, max: 1.6, step: .05, value: 1.0, unit: 'g/cm³', dp: 2 });
    const cam = new PHYS.Cam3({ az: .62, el: .18, dist: 11, fov: 40 });
    const off = cam.bind(host.canvas);
    const g = 9.8;
    const h = 1.3, side = 1.1;

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const r = rho.value / water.value;       // relative density
      const level = 2.05;
      let bottom, sub;
      if (r < 1) { sub = r * h; bottom = level - sub; }
      else { bottom = .06; sub = h; }
      const cy = bottom + h / 2;
      const Fb = water.value * 1000 * 9.8 * side * side * Math.min(sub, h);
      const Wt = rho.value * 1000 * 9.8 * side * side * h;

      cam.target = [0, 1.4, 0];
      cam.dist = 10.5;
      cam.frame(W, H, dt);
      cam.ground(5, 1, { alpha: .35 });

      // tank
      const tw = 3.2, td = 3.2, th = 3.0;
      cam.line([-tw / 2, 0, -td / 2], [-tw / 2, th, -td / 2], { color: C().faint, width: 1 });
      cam.line([tw / 2, 0, -td / 2], [tw / 2, th, -td / 2], { color: C().faint, width: 1 });
      cam.line([-tw / 2, 0, td / 2], [-tw / 2, th, td / 2], { color: C().faint, width: 1 });
      cam.line([tw / 2, 0, td / 2], [tw / 2, th, td / 2], { color: C().faint, width: 1 });
      cam.poly([[-tw / 2, 0, -td / 2], [tw / 2, 0, -td / 2], [tw / 2, 0, td / 2], [-tw / 2, 0, td / 2]], { fill: PHYS.mix(C().teal, C().bg, .82), stroke: C().faint });
      // water body
      cam.poly([[-tw / 2, level, -td / 2], [tw / 2, level, -td / 2], [tw / 2, level, td / 2], [-tw / 2, level, td / 2]], { fill: 'rgba(47,111,106,.14)', stroke: C().teal, width: 1 });
      cam.line([-tw / 2, level, -td / 2], [-tw / 2, 0, -td / 2], { color: 'rgba(47,111,106,.25)', width: 1 });
      cam.line([tw / 2, level, -td / 2], [tw / 2, 0, -td / 2], { color: 'rgba(47,111,106,.25)', width: 1 });

      // block
      boxBasis(cam, [0, cy, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [side / 2, h / 2, side / 2], r < 1 ? C().ochre : C().red, { edges: C().ink });

      // arrows
      const sc = 1 / Math.max(Wt, Fb, 1) * 1.5;
      cam.arrow([0, cy, side / 2 + .05], [0, cy - Math.min(1.6, Wt * sc), side / 2 + .05], { color: C().ink, width: 2 });
      cam.text([0, cy - Math.min(1.6, Wt * sc), side / 2 + .05], 'G', { dx: 8, dy: 6, size: 10, color: C().ink });
      if (sub > .02) {
        cam.arrow([.35, bottom + .1, side / 2 + .05], [.35, bottom + .1 + Math.min(1.6, Fb * sc), side / 2 + .05], { color: C().teal, width: 2 });
        cam.text([.35, bottom + .1 + Math.min(1.6, Fb * sc), side / 2 + .05], 'F浮', { dx: 8, dy: -6, size: 10, color: C().teal });
      }
      cam.end(ctx);

      const state = r < 1 ? (r < .98 ? '漂浮' : '悬浮') : '沉底';
      host.setReadout([
        { k: '重力 G', v: fmt(Wt, 0), unit: 'N' },
        { k: '浮力 F', v: fmt(Fb, 0), unit: 'N' },
        { k: '浸入比例', v: fmt(Math.min(sub / h, 1) * 100, 0), unit: '%' },
        { k: '状态', v: state }
      ]);
    });
    return { destroy: off };
  });
})();
