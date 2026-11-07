/* sims2d.js — two-dimensional interactive figures (graphs, optics, circuits, fields). */
(function () {
  const PHYS = window.PHYS, D = PHYS.draw, C = () => PHYS.C;
  const TAU = Math.PI * 2, clamp = PHYS.clamp, fmt = PHYS.fmt;

  /* exclusive toggle group */
  PHYS.radio = function (host, labels, idx, cb) {
    const btns = labels.map((l, i) => {
      const b = host.addToggle(l, i === idx, () => {
        btns.forEach((x, j) => x.setAttribute('aria-pressed', j === i ? 'true' : 'false'));
        cb(i);
      });
      return b;
    });
    return btns;
  };

  /* =============================================================== motion */
  PHYS.defineSim('motion', function (host) {
    let mode = 0, s = 0, t = 0, pause = false;
    const sp = host.addSlider({ label: '速度', en: 'speed', min: 1, max: 10, step: .5, value: 5, unit: 'm/s', dp: 1, oninput: () => { s = 0; t = 0; } });
    PHYS.radio(host, ['勻速運動', '勻加速運動'], 0, i => { mode = i; s = 0; t = 0; });

    const L = 100; // metres of track
    host.onTick((dt) => {
      if (!pause) {
        const v = sp.value;
        if (mode === 0) { s += v * dt; t += dt; }
        else { t += dt; s = .5 * 2 * t * t; }
        if (s > L) { s = 0; t = 0; }
      }
      const { W, H, ctx } = host;
      const pad = 26, yTrack = H * .24;
      const sx = x => pad + x / L * (W - pad * 2);

      // track
      D.line(ctx, pad, yTrack + 16, W - pad, yTrack + 16, C().faint, 1);
      for (let m = 0; m <= L; m += 10) {
        D.line(ctx, sx(m), yTrack + 16, sx(m), yTrack + 22, C().faint, 1);
        if (m % 20 === 0) D.text(ctx, m + '', sx(m), yTrack + 30, C().soft, 9, 'center');
      }
      D.text(ctx, 's / m', W - pad, yTrack + 30, C().soft, 9, 'right');

      // car
      const cx = sx(s);
      ctx.save();
      ctx.fillStyle = C().red;
      const cw = 26, ch = 12;
      ctx.beginPath();
      ctx.moveTo(cx - cw / 2 + 3, yTrack - ch);
      ctx.lineTo(cx + cw / 2 - 3, yTrack - ch);
      ctx.quadraticCurveTo(cx + cw / 2, yTrack - ch, cx + cw / 2, yTrack - ch + 3);
      ctx.lineTo(cx + cw / 2, yTrack + 1);
      ctx.lineTo(cx - cw / 2, yTrack + 1);
      ctx.lineTo(cx - cw / 2, yTrack - ch + 3);
      ctx.quadraticCurveTo(cx - cw / 2, yTrack - ch, cx - cw / 2 + 3, yTrack - ch);
      ctx.fill();
      ctx.restore();
      D.circle(ctx, cx - 7, yTrack + 4, 3.2, C().ink);
      D.circle(ctx, cx + 7, yTrack + 4, 3.2, C().ink);
      D.text(ctx, 't = ' + fmt(t, 1) + ' s', W - pad, 16, C().ink, 10, 'right');

      // s-t graph
      const gx = pad + 24, gy = H * .48, gw = W - pad * 2 - 34, gh = H * .40;
      const tmax = mode === 0 ? L / sp.value : 10;
      const smax = L;
      const X = tt => gx + tt / tmax * gw;
      const Y = ss => gy + gh - ss / smax * gh;
      ctx.save(); ctx.strokeStyle = C().faint; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
      ctx.restore();
      for (let i = 1; i <= 4; i++) {
        D.line(ctx, gx, gy + gh - gh * i / 4, gx + gw, gy + gh - gh * i / 4, C().grid, .7, [2, 3]);
      }
      D.text(ctx, 's', gx - 6, gy + 4, C().soft, 10, 'right');
      D.text(ctx, 't', gx + gw, gy + gh + 12, C().soft, 10, 'center');

      ctx.beginPath();
      ctx.strokeStyle = C().red; ctx.lineWidth = 1.8;
      for (let i = 0; i <= 60; i++) {
        const tv = tmax * i / 60;
        const sv = mode === 0 ? sp.value * tv : .5 * 2 * tv * tv;
        if (sv > smax) break;
        i ? ctx.lineTo(X(tv), Y(sv)) : ctx.moveTo(X(tv), Y(sv));
      }
      ctx.stroke();
      D.circle(ctx, X(Math.min(t, tmax)), Y(Math.min(s, smax)), 3.6, C().red);

      host.setReadout([
        { k: '時間 t', v: fmt(t, 1), unit: 's' },
        { k: '位移 s', v: fmt(s, 1), unit: 'm' },
        { k: '速度 v', v: fmt(mode === 0 ? sp.value : 2 * t, 1), unit: 'm/s' },
        { k: '平均速度', v: fmt(s / Math.max(t, .001), 1), unit: 'm/s' }
      ]);
    });
  });

  /* ================================================================= wave */
  PHYS.defineSim('wave', function (host, cfg) {
    let mode = cfg && cfg.mode === 'long' ? 1 : 0;
    const fq = host.addSlider({ label: '頻率', en: 'frequency', min: .5, max: 4, step: .1, value: 1, unit: 'Hz', dp: 1 });
    const vv = host.addSlider({ label: '波速', en: 'wave speed', min: 2, max: 10, step: .5, value: 6, unit: 'm/s', dp: 1 });
    const am = host.addSlider({ label: '振幅', en: 'amplitude', min: .3, max: 1, step: .05, value: .7, dp: 2 });
    PHYS.radio(host, ['橫波', '縱波'], mode, i => { mode = i; });

    const XMAX = 12; // metres across the canvas
    host.onTick((dt, t) => {
      const { W, H, ctx } = host;
      const f = fq.value, v = vv.value, A = am.value, k = TAU * f / v, w = TAU * f;
      const lam = v / f;
      const pad = 30;
      const X = x => pad + x / XMAX * (W - pad * 2);

      if (mode === 0) {
        const y0 = H * .46, amp = A * H * .26;
        D.line(ctx, pad - 8, y0, W - pad + 8, y0, C().faint, 1, [3, 3]);
        ctx.beginPath(); ctx.strokeStyle = C().red; ctx.lineWidth = 1.8;
        for (let i = 0; i <= 160; i++) {
          const x = XMAX * i / 160;
          const y = y0 - amp * Math.sin(k * x - w * t);
          i ? ctx.lineTo(X(x), y) : ctx.moveTo(X(x), y);
        }
        ctx.stroke();

        // lambda bracket
        const x1 = 1.0, x2 = 1.0 + lam;
        if (x2 < XMAX) {
          const yb = H * .84;
          D.line(ctx, X(x1), yb, X(x2), yb, C().soft, 1);
          D.line(ctx, X(x1), yb - 4, X(x1), yb + 4, C().soft, 1);
          D.line(ctx, X(x2), yb - 4, X(x2), yb + 4, C().soft, 1);
          D.text(ctx, 'λ = ' + fmt(lam, 1) + ' m', (X(x1) + X(x2)) / 2, yb - 10, C().ink, 10, 'center');
        }
        // marked particle
        const xp = 3.4, yp = y0 - amp * Math.sin(k * xp - w * t);
        const vp = -amp * w * Math.cos(k * xp - w * t);
        D.line(ctx, X(xp), y0, X(xp), yp, C().faint, 1, [2, 3]);
        D.circle(ctx, X(xp), yp, 4, C().ink);
        D.arrow(ctx, X(xp), yp, X(xp), yp + clamp(vp * .06, -26, 26), C().teal, 1.6, 6);
        D.text(ctx, '質點只上下振動', X(xp) + 8, yp - 12, C().teal, 9);
        D.line(ctx, pad, y0 - amp - 14, W - pad, y0 - amp - 14, 'transparent', 1);
      } else {
        const y1 = H * .26, y2 = H * .78, rows = 5;
        // tube
        D.line(ctx, pad - 14, y1, W - pad + 6, y1, C().faint, 1);
        D.line(ctx, pad - 14, y2, W - pad + 6, y2, C().faint, 1);
        // speaker
        const spx = pad - 12;
        D.line(ctx, spx, y1 + 6, spx, y2 - 6, C().ink, 2.5);
        D.text(ctx, '聲源', spx - 4, y1 - 10, C().soft, 9, 'center');
        const ampPx = A * 6;
        for (let r = 0; r < rows; r++) {
          const yy = y1 + (y2 - y1) * (r + .5) / rows;
          for (let i = 0; i < 46; i++) {
            const x0 = i / 45 * XMAX;
            const dx = ampPx * Math.sin(k * x0 - w * t) / 6;
            const px = X(x0 + dx);
            D.circle(ctx, px, yy, 1.9, C().red, null, 0);
            ctx.globalAlpha = 1;
          }
        }
        // compression markers
        for (let n = 0; n < 6; n++) {
          const xc = (n * lam + (w / k) * t) % XMAX;
          if (xc > 0 && xc < XMAX) {
            D.text(ctx, '密', X(xc), y1 - 8, C().muted || C().soft, 9, 'center');
          }
        }
        D.text(ctx, '疏 → 密 → 疏：空氣被壓縮和拉伸', W / 2, H * .93, C().soft, 9.5, 'center');
      }

      host.setReadout([
        { k: '頻率 f', v: fmt(f, 2), unit: 'Hz' },
        { k: '週期 T', v: fmt(1 / f, 2), unit: 's' },
        { k: '波長 λ', v: fmt(lam, 2), unit: 'm' },
        { k: '波速 v = λf', v: fmt(v, 1), unit: 'm/s' }
      ]);
    });
  });

  /* =========================================================== reflection */
  PHYS.defineSim('reflection', function (host) {
    const ang = host.addSlider({ label: '入射角', en: 'angle of incidence', min: 0, max: 80, step: 1, value: 45, unit: '°', dp: 0 });
    host.onTick(() => {
      const { W, H, ctx } = host;
      const my = H * .72, cx = W * .5;
      const th = ang.value * Math.PI / 180;
      const L = Math.min(W * .38, H * .58);

      // mirror
      ctx.fillStyle = C().grid;
      ctx.fillRect(W * .08, my, W * .84, 10);
      D.line(ctx, W * .08, my, W * .92, my, C().ink, 2);
      for (let x = W * .08; x < W * .92; x += 9) D.line(ctx, x, my + 10, x - 5, my + 16, C().faint, 1);
      D.text(ctx, '平面鏡', W * .08 + 2, my + 30, C().soft, 9);

      // normal
      D.line(ctx, cx, my, cx, my - L * 1.25, C().faint, 1, [4, 4]);
      D.text(ctx, '法線', cx + 5, my - L * 1.25, C().soft, 9);

      const S = [cx - Math.sin(th) * L, my - Math.cos(th) * L];
      const R = [cx + Math.sin(th) * L, my - Math.cos(th) * L];

      D.arrow(ctx, S[0], S[1], cx, my, C().red, 1.8, 7);
      D.arrow(ctx, cx, my, R[0], R[1], C().red, 1.8, 7);
      // wavefronts
      D.line(ctx, S[0] - 8, S[1] + 8, S[0] + 8, S[1] - 8, C().red, 1, [2, 2]);
      D.circle(ctx, cx, my, 4, C().ink);

      // angle arcs
      ctx.save(); ctx.strokeStyle = C().teal; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(cx, my, 52, -Math.PI / 2 - th, -Math.PI / 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, my, 52, -Math.PI / 2, -Math.PI / 2 + th); ctx.stroke();
      ctx.restore();
      D.text(ctx, 'θ₁=' + ang.value + '°', cx - Math.sin(th / 2) * 68, my - Math.cos(th / 2) * 68, C().teal, 9.5, 'center');
      D.text(ctx, 'θ₂=' + ang.value + '°', cx + Math.sin(th / 2) * 68, my - Math.cos(th / 2) * 68, C().teal, 9.5, 'center');

      // labels
      D.text(ctx, '入射光線', S[0] - 4, S[1] + 12, C().red, 9);
      D.text(ctx, '反射光線', R[0] + 2, R[1] + 12, C().red, 9);
      D.text(ctx, '入射點 O', cx + 8, my + 22, C().soft, 9);

      host.setReadout([
        { k: '入射角 θ₁', v: ang.value + '', unit: '°' },
        { k: '反射角 θ₂', v: ang.value + '', unit: '°' },
        { k: '關係', v: 'θ₁ = θ₂' }
      ]);
    });
  });

  /* =========================================================== refraction */
  PHYS.defineSim('refraction', function (host) {
    let reverse = false;
    const ang = host.addSlider({ label: '入射角', en: 'incidence', min: 0, max: 85, step: 1, value: 40, unit: '°', dp: 0 });
    const nn = host.addSlider({ label: '下方介質折射率', en: 'n₂', min: 1.05, max: 1.9, step: .01, value: 1.33, dp: 2 });
    PHYS.radio(host, ['空氣 → 水', '水 → 空氣'], 0, i => { reverse = i === 1; });

    host.onTick(() => {
      const { W, H, ctx } = host;
      const iy = H * .52, cx = W * .5;
      const n2 = nn.value, n1 = 1.0;
      const nTop = reverse ? 1.33 : 1.0;
      const nBot = reverse ? 1.0 : n2;
      const th1 = ang.value * Math.PI / 180;
      const s2 = nTop * Math.sin(th1) / nBot;
      const tir = s2 > 1;
      const th2 = tir ? 0 : Math.asin(s2);

      // media
      ctx.fillStyle = 'rgba(47,111,106,.10)';
      ctx.fillRect(0, iy, W, H - iy);
      D.line(ctx, 0, iy, W, iy, C().ink, 1.5);
      D.text(ctx, reverse ? '水  n = 1.33' : '空氣  n = 1.00', 8, iy - 10, C().soft, 9);
      D.text(ctx, reverse ? '空氣  n = 1.00' : '水  n = ' + n2.toFixed(2), 8, iy + 14, C().soft, 9);
      D.line(ctx, cx, iy - H * .36, cx, iy + H * .36, C().faint, 1, [4, 4]);
      D.text(ctx, '法線', cx + 5, iy - H * .36, C().soft, 9);

      const L = H * .34;
      const S = [cx - Math.sin(th1) * L, iy - Math.cos(th1) * L];
      D.arrow(ctx, S[0], S[1], cx, iy, C().red, 1.7, 7);
      D.circle(ctx, cx, iy, 3.2, C().ink);

      // reflected
      const Rf = [cx + Math.sin(th1) * L * .8, iy - Math.cos(th1) * L * .8];
      D.line(ctx, cx, iy, Rf[0], Rf[1], C().faint, 1, [3, 3]);
      D.text(ctx, '反射', Rf[0] + 3, Rf[1], C().soft, 8.5);

      if (!tir) {
        const T = [cx + Math.sin(th2) * L, iy + Math.cos(th2) * L];
        D.arrow(ctx, cx, iy, T[0], T[1], C().teal, 1.7, 7);
        ctx.save(); ctx.strokeStyle = C().teal; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(cx, iy, 44, Math.PI / 2, Math.PI / 2 - th2, true); ctx.stroke();
        ctx.restore();
        D.text(ctx, 'θ₂ = ' + (th2 * 180 / Math.PI).toFixed(0) + '°', cx + 10, iy + 58, C().teal, 9.5);
      } else {
        D.text(ctx, '全反射', cx + 14, iy + 26, C().red, 12);
        D.text(ctx, '沒有折射光線', cx + 14, iy + 42, C().red, 9);
      }
      D.text(ctx, 'θ₁ = ' + ang.value + '°', cx - 52, iy - 44, C().red, 9.5);

      const critical = nTop > nBot ? Math.asin(nBot / nTop) * 180 / Math.PI : null;
      host.setReadout([
        { k: '入射角', v: ang.value + '', unit: '°' },
        { k: '折射角', v: tir ? '—' : fmt(th2 * 180 / Math.PI, 0), unit: tir ? '' : '°' },
        { k: '臨界角', v: critical ? fmt(critical, 1) : '—', unit: critical ? '°' : '' },
        { k: 'n₁sinθ₁', v: fmt(nTop * Math.sin(th1), 2) }
      ]);
    });
  });

  /* ================================================================ lens */
  PHYS.defineSim('lens', function (host) {
    const su = host.addSlider({ label: '物距 u', en: 'object distance', min: 4, max: 60, step: .5, value: 24, unit: 'cm', dp: 1 });
    const sf = host.addSlider({ label: '焦距 f', en: 'focal length', min: 4, max: 16, step: .5, value: 10, unit: 'cm', dp: 1 });
    const sh = host.addSlider({ label: '物高', en: 'height', min: 1, max: 4, step: .2, value: 2, unit: 'cm', dp: 1 });

    host.onTick(() => {
      const { W, H, ctx } = host;
      const u = su.value, f = sf.value, h = sh.value;
      const near = Math.abs(u - f) < .6;
      const v = near ? Infinity : u * f / (u - f);
      const hi = near ? Infinity : -h * v / u;

      const xmin = -(u + f * .5), xmax = near ? f * 2.4 : Math.max(f * 1.9, v + f * .4, u * .3);
      const span = xmax - xmin;
      const yMax = Math.min(7, Math.max(h, isFinite(hi) ? Math.abs(hi) : h, 1.5));
      const sc = Math.min((W * .88) / span, (H * .30) / yMax);
      const cx = W / 2 - (xmin + xmax) / 2 * sc;
      const ay = H * .56;
      const X = x => cx + x * sc;
      const Y = y => ay - y * sc;

      // axis
      D.line(ctx, 6, ay, W - 6, ay, C().faint, 1);
      // lens
      ctx.save();
      ctx.beginPath();
      const lh = Math.min(H * .42, h * sc * 2.2 + 22);
      ctx.ellipse(X(0), ay, 9, lh, 0, 0, TAU);
      ctx.fillStyle = 'rgba(47,111,106,.09)';
      ctx.strokeStyle = C().teal; ctx.lineWidth = 1.4;
      ctx.fill(); ctx.stroke();
      ctx.restore();
      D.text(ctx, '凸透鏡', X(0), ay - lh - 8, C().teal, 9, 'center');

      // focal points
      [[-f, 'F'], [f, "F′"]].forEach(([x, lab]) => {
        D.circle(ctx, X(x), ay, 2.6, C().ink);
        D.text(ctx, lab, X(x), ay + 12, C().ink, 9, 'center');
      });

      // object
      D.arrow(ctx, X(-u), ay, X(-u), Y(h), C().red, 2, 7);
      D.text(ctx, '物', X(-u) - 4, Y(h) - 9, C().red, 9, 'center');

      ctx.save();
      ctx.strokeStyle = C().red; ctx.lineWidth = 1.1; ctx.globalAlpha = .85;
      const far = xmax * 1.02;

      // ray 1: parallel then through F'
      ctx.beginPath(); ctx.moveTo(X(-u), Y(h)); ctx.lineTo(X(0), Y(h));
      if (!near) {
        const slope = (0 - h) / (f - 0);
        ctx.lineTo(X(far), Y(h + slope * (far - 0)));
      }
      ctx.stroke();
      D.arrow(ctx, X(-u * .5), Y(h), X(-u * .5 + 6), Y(h), C().red, 1, 5);

      // ray 2: straight through the optical centre
      ctx.beginPath(); ctx.moveTo(X(-u), Y(h)); ctx.lineTo(X(far), Y(-h * far / u));
      ctx.stroke();

      // ray 3: through F then parallel
      if (u > f + .2) {
        const yAtLens = h * f / (f - u) * -1; // = h f/(f-u)
        ctx.beginPath(); ctx.moveTo(X(-u), Y(h)); ctx.lineTo(X(0), Y(-h * f / (u - f)));
        ctx.lineTo(X(far), Y(-h * f / (u - f)));
        ctx.stroke();
      }
      ctx.restore();

      // image
      if (!near && isFinite(hi)) {
        const real = v > 0;
        ctx.save();
        ctx.strokeStyle = real ? C().teal : C().ochre;
        ctx.setLineDash(real ? [] : [4, 4]);
        ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.moveTo(X(v), ay); ctx.lineTo(X(v), Y(hi)); ctx.stroke();
        ctx.restore();
        D.arrow(ctx, X(v), ay, X(v), Y(hi), real ? C().teal : C().ochre, 1.8, 7);
        D.text(ctx, real ? '實像' : '虛像', X(v) + 5, Y(hi) - 10, real ? C().teal : C().ochre, 9);
        if (!real) {
          ctx.save(); ctx.setLineDash([3, 4]); ctx.strokeStyle = C().ochre; ctx.globalAlpha = .6;
          ctx.beginPath(); ctx.moveTo(X(0), Y(h)); ctx.lineTo(X(v), Y(hi)); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(X(0), Y(-h * f / (u - f))); ctx.lineTo(X(v), Y(hi)); ctx.stroke();
          ctx.restore();
        }
      } else if (near) {
        D.text(ctx, '接近焦點：折射光近乎平行，成像在很遠處', W / 2, H * .90, C().red, 9.5, 'center');
      }

      const m = near ? Infinity : Math.abs(v / u);
      let nature = '—';
      if (!near) {
        nature = (v > 0 ? '倒立' : '正立') + '·' + (m > 1.02 ? '放大' : m < .98 ? '縮小' : '等大') + '·' + (v > 0 ? '實像' : '虛像');
      }
      host.setReadout([
        { k: '像距 v', v: near ? '∞' : fmt(v, 1), unit: near ? '' : 'cm' },
        { k: '放大率', v: near ? '—' : fmt(m, 2) + '×' },
        { k: '像的性質', v: nature, small: true },
        { k: '1/f = 1/u+1/v', v: '' }
      ]);
    });
  });

  /* ============================================================== heating */
  PHYS.defineSim('heating', function (host) {
    const mS = host.addSlider({ label: '質量', en: 'mass', min: .5, max: 2, step: .1, value: 1, unit: 'kg', dp: 1 });
    const pS = host.addSlider({ label: '加熱功率', en: 'power', min: 500, max: 2000, step: 100, value: 1000, unit: 'W', dp: 0 });
    const C_ICE = 2100, L_F = 334000, C_W = 4180, L_V = 2260000, C_ST = 2000;
    let Q = 0;

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const m = mS.value, P = pS.value;
      const segs = [
        { q: m * C_ICE * 20, t0: -20, t1: 0, name: '冰升溫', en: 'ice warms' },
        { q: m * L_F, t0: 0, t1: 0, name: '熔化（冰→水）', en: 'melting' },
        { q: m * C_W * 100, t0: 0, t1: 100, name: '水升溫', en: 'water warms' },
        { q: m * L_V, t0: 100, t1: 100, name: '沸騰（水→水蒸氣）', en: 'boiling' },
        { q: m * C_ST * 20, t0: 100, t1: 120, name: '水蒸氣升溫', en: 'steam warms' }
      ];
      const QT = segs.reduce((s, x) => s + x.q, 0);
      Q += P * dt * 220;               // accelerated for viewing
      if (Q > QT) Q = 0;
      let q = Q, T = -20, idx = 0, frac = 0;
      for (let i = 0; i < segs.length; i++) {
        const s = segs[i];
        if (q <= s.q) { idx = i; frac = s.q ? q / s.q : 1; T = s.t0 + (s.t1 - s.t0) * frac; break; }
        q -= s.q; T = s.t1;
      }
      const tMinutes = Q / P / 60;

      const gx = 46, gy = 34, gw = W - gx - 22, gh = H * .62;
      const X = tt => gx + tt / (QT / P / 60) * gw;
      const Y = temp => gy + gh - (temp + 30) / 160 * gh;

      // axes
      D.line(ctx, gx, gy, gx, gy + gh, C().faint, 1);
      D.line(ctx, gx, gy + gh, gx + gw, gy + gh, C().faint, 1);
      [-20, 0, 100, 120].forEach(tp => {
        D.line(ctx, gx - 4, Y(tp), gx, Y(tp), C().soft, 1);
        D.text(ctx, tp + '', gx - 7, Y(tp), C().soft, 8.5, 'right');
      });
      D.text(ctx, 'T/°C', gx - 7, gy - 10, C().soft, 9, 'right');
      D.text(ctx, 't / min', gx + gw, gy + gh + 14, C().soft, 9, 'right');

      // dashed guide at 0 and 100
      [0, 100].forEach(tp => D.line(ctx, gx, Y(tp), gx + gw, Y(tp), C().grid, .8, [2, 3]));

      // curve
      let qAcc = 0, started = false;
      ctx.beginPath();
      for (let i = 0; i < segs.length; i++) {
        const s = segs[i];
        const tA = qAcc / P / 60, tB = (qAcc + s.q) / P / 60;
        if (!started) { ctx.moveTo(X(tA), Y(s.t0)); started = true; }
        if (s.t1 !== s.t0) ctx.lineTo(X(tB), Y(s.t1));
        else ctx.lineTo(X(tB), Y(s.t0));
        qAcc += s.q;
      }
      ctx.strokeStyle = C().red; ctx.lineWidth = 2; ctx.stroke();

      // phase labels
      qAcc = 0;
      segs.forEach((s, i) => {
        const tA = qAcc / P / 60, tB = (qAcc + s.q) / P / 60;
        if (i % 2 === 0) D.text(ctx, s.name, (X(tA) + X(tB)) / 2, Y((s.t0 + s.t1) / 2) + (s.t0 === s.t1 ? -10 : 0) - 12, C().soft, 8.5, 'center');
        qAcc += s.q;
      });

      // cursor
      D.line(ctx, X(tMinutes), gy, X(tMinutes), gy + gh, C().ink, .8, [3, 3]);
      D.circle(ctx, X(tMinutes), Y(T), 4, C().ink, C().bg, 2);

      host.setReadout([
        { k: '溫度', v: fmt(T, 0), unit: '°C' },
        { k: '狀態', v: segs[idx].name.split('（')[0] },
        { k: '時間', v: fmt(tMinutes, 1), unit: 'min' },
        { k: '吸熱', v: fmt(Q / 1000, 0), unit: 'kJ' }
      ]);
    });
  });

  /* ================================================================ lever */
  PHYS.defineSim('lever', function (host) {
    const f1 = host.addSlider({ label: '左側力 F₁', en: 'F1', min: 1, max: 20, step: .5, value: 6, unit: 'N', dp: 1 });
    const l1 = host.addSlider({ label: '左側力臂 L₁', en: 'L1', min: .2, max: 1.2, step: .05, value: .6, unit: 'm', dp: 2 });
    const f2 = host.addSlider({ label: '右側力 F₂', en: 'F2', min: 1, max: 20, step: .5, value: 9, unit: 'N', dp: 1 });
    const l2 = host.addSlider({ label: '右側力臂 L₂', en: 'L2', min: .2, max: 1.2, step: .05, value: .4, unit: 'm', dp: 2 });

    host.onTick(() => {
      const { W, H, ctx } = host;
      const px = W / 2, py = H * .48;
      const sc = Math.min(W * .38, 170) / 1.25;
      const t1 = f1.value * l1.value, t2 = f2.value * l2.value;
      const diff = t2 - t1;
      const tilt = clamp(diff / Math.max(t1 + t2, 1) * .35, -.22, .22);

      // fulcrum
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(px, py + 6); ctx.lineTo(px - 16, py + 46); ctx.lineTo(px + 16, py + 46);
      ctx.closePath(); ctx.fillStyle = C().grid; ctx.fill();
      ctx.strokeStyle = C().ink; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.restore();

      // beam
      const bx1 = px - l1.value * sc, bx2 = px + l2.value * sc;
      const y1 = py - Math.sin(tilt) * l1.value * sc * .18, y2 = py + Math.sin(tilt) * l2.value * sc * .18;
      D.line(ctx, px - l1.value * sc, py - (px - l1.value * sc - px) * Math.sin(tilt) * .18, px + l2.value * sc, py + (bx2 - px) * Math.sin(tilt) * .18, C().ink, 5);
      D.circle(ctx, px, py, 4, C().ink);

      // weights
      function weight(x, y, F, lab, col) {
        const bh = 20 + F * 1.4;
        D.line(ctx, x, y, x, y + 12, C().soft, 1);
        D.dashRect(ctx, x - 14, y + 12, 28, bh, col);
        D.text(ctx, F + ' N', x, y + 12 + bh / 2, col, 9, 'center');
        D.text(ctx, lab, x, y + 12 + bh + 12, C().soft, 8.5, 'center');
      }
      weight(bx1, y1, f1.value, 'L₁=' + l1.value.toFixed(2) + 'm', C().teal);
      weight(bx2, y2, f2.value, 'L₂=' + l2.value.toFixed(2) + 'm', C().red);

      // tilt arrow
      if (Math.abs(diff) > .05) {
        const down = diff > 0 ? 1 : -1;
        D.arrow(ctx, px, py - 58, px + down * 34, py - 46, C().ochre, 1.6, 7);
      }
      D.text(ctx, 'F₁L₁ = ' + fmt(t1, 1) + ' N·m', 12, H * .12, C().teal, 9.5);
      D.text(ctx, 'F₂L₂ = ' + fmt(t2, 1) + ' N·m', 12, H * .12 + 16, C().red, 9.5);

      const state = Math.abs(diff) < .06 ? '平衡' : diff > 0 ? '右端下沉' : '左端下沉';
      host.setReadout([
        { k: '左力矩', v: fmt(t1, 1), unit: 'N·m' },
        { k: '右力矩', v: fmt(t2, 1), unit: 'N·m' },
        { k: '狀態', v: state }
      ]);
    });
  });

  /* ============================================================== circuit */
  PHYS.defineSim('circuit', function (host) {
    let par = false, phase = 0;
    const U = host.addSlider({ label: '電源電壓', en: 'voltage', min: 1.5, max: 12, step: .5, value: 6, unit: 'V', dp: 1 });
    const R1 = host.addSlider({ label: '電阻 R₁', en: 'R1', min: 1, max: 20, step: 1, value: 6, unit: 'Ω', dp: 0 });
    const R2 = host.addSlider({ label: '電阻 R₂', en: 'R2', min: 1, max: 20, step: 1, value: 3, unit: 'Ω', dp: 0 });
    PHYS.radio(host, ['串聯', '並聯'], 0, i => { par = i === 1; });

    function resistor(x, y, horiz, label, col) {
      const ctx = host.ctx;
      ctx.save();
      ctx.fillStyle = C().bg; ctx.strokeStyle = col; ctx.lineWidth = 1.4;
      if (horiz) ctx.strokeRect(x - 17, y - 7, 34, 14); else ctx.strokeRect(x - 7, y - 17, 14, 34);
      ctx.restore();
      if (horiz) D.text(ctx, label, x, y - 14, col, 9, 'center');
      else D.text(ctx, label, x - 12, y, col, 9, 'right');
    }

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const u = U.value, r1 = R1.value, r2 = R2.value;
      const xL = W * .16, xR = W * .84, yT = H * .26, yB = H * .74;
      const I = par ? u / (r1 * r2 / (r1 + r2)) : u / (r1 + r2);
      const I1 = par ? u / r1 : I, I2 = par ? u / r2 : I;
      const U1 = par ? u : I * r1, U2 = par ? u : I * r2;

      D.line(ctx, xL, yT, xR, yT, C().ink, 1.4);
      D.line(ctx, xL, yB, xR, yB, C().ink, 1.4);
      D.line(ctx, xL, yT, xL, yB, C().ink, 1.4);
      D.line(ctx, xR, yT, xR, yB, C().ink, 1.4);

      // battery on left
      const by = (yT + yB) / 2;
      D.line(ctx, xL, yT, xL, by - 12, C().ink, 1.4);
      D.line(ctx, xL, by - 12, xL - 10, by - 12, C().ink, 1.4);
      D.line(ctx, xL, by + 12, xL - 10, by + 12, C().ink, 1.4);
      D.line(ctx, xL - 10, by - 12, xL - 10, by + 12, C().ink, 1.4);
      D.line(ctx, xL, by + 12, xL, yB, C().ink, 1.4);
      D.text(ctx, u + ' V', xL + 6, by - 20, C().red, 9.5);
      D.text(ctx, '+', xL + 5, by - 8, C().soft, 9);

      if (!par) {
        resistor(W * .40, yT, true, 'R₁ ' + r1 + 'Ω', C().teal);
        resistor(W * .64, yT, true, 'R₂ ' + r2 + 'Ω', C().teal);
        D.text(ctx, '串聯：I 處處相等', W * .5, yB + 22, C().soft, 9, 'center');
      } else {
        D.line(ctx, W * .42, yT, W * .42, H * .38, C().ink, 1.4);
        D.line(ctx, W * .42, H * .62, W * .42, yB, C().ink, 1.4);
        D.line(ctx, W * .68, yT, W * .68, H * .38, C().ink, 1.4);
        D.line(ctx, W * .68, H * .62, W * .68, yB, C().ink, 1.4);
        D.line(ctx, W * .42, H * .38, W * .68, H * .38, C().ink, 1.4);
        D.line(ctx, W * .42, H * .62, W * .68, H * .62, C().ink, 1.4);
        resistor(W * .55, H * .38, true, 'R₁ ' + r1 + 'Ω', C().teal);
        resistor(W * .55, H * .62, true, 'R₂ ' + r2 + 'Ω', C().teal);
        D.text(ctx, '並聯：各支路電壓相等', W * .5, yB + 22, C().soft, 9, 'center');
      }

      // current dots
      phase = (phase + dt * (.15 + I * .05)) % 1;
      const paths = par ? [
        [[xL, yB], [W * .42, yB], [W * .42, H * .62], [W * .68, H * .62], [W * .68, yB], [xR, yB], [xR, yT], [xL, yT], [xL, yB]]
      ] : [
        [[xL, yB], [xR, yB], [xR, yT], [xL, yT], [xL, yB]]
      ];
      if (par) {
        paths.push([[W * .42, yT], [W * .42, H * .38], [W * .68, H * .38], [W * .68, yT]]);
      }
      paths.forEach((pts, pi) => {
        let total = 0; const segs = [];
        for (let i = 0; i < pts.length - 1; i++) {
          const d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
          segs.push(d); total += d;
        }
        const n = par && pi === 1 ? 5 : 9;
        for (let k = 0; k < n; k++) {
          let s = ((k / n + phase * (par && pi === 1 ? 1.6 : 1)) % 1) * total;
          for (let i = 0; i < segs.length; i++) {
            if (s <= segs[i]) {
              const f = s / segs[i];
              const x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f;
              const y = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f;
              D.circle(ctx, x, y, 2.3, C().red);
              break;
            }
            s -= segs[i];
          }
        }
      });

      host.setReadout([
        { k: '總電阻', v: fmt(par ? r1 * r2 / (r1 + r2) : r1 + r2, 2), unit: 'Ω' },
        { k: '總電流 I', v: fmt(I, 2), unit: 'A' },
        { k: 'U₁', v: fmt(U1, 2), unit: 'V' },
        { k: 'U₂', v: fmt(U2, 2), unit: 'V' },
        { k: '總功率', v: fmt(u * I, 2), unit: 'W' }
      ]);
    });
  });

  /* ================================================================ field */
  PHYS.defineSim('field', function (host, cfg) {
    const mode = (cfg && cfg.mode) || 'charges';
    const gain = host.addSlider({ label: '場源強度', en: 'strength', min: .4, max: 2, step: .1, value: 1, dp: 1 });
    let showVec = true, showLines = true;
    host.addToggle('向量箭頭', true, v => showVec = v);
    host.addToggle('場線', true, v => showLines = v);

    function fieldAt(x, y, W, H, k) {
      if (mode === 'charges') {
        const q1 = [W * .36, H * .5, +1 * k], q2 = [W * .64, H * .5, -1 * k];
        let ex = 0, ey = 0;
        [q1, q2].forEach(([qx, qy, q]) => {
          const dx = x - qx, dy = y - qy, r2 = dx * dx + dy * dy + 40;
          const r = Math.sqrt(r2);
          ex += q * dx / (r2 * r); ey += q * dy / (r2 * r);
        });
        return [ex, ey];
      }
      if (mode === 'plates') {
        const inside = x > W * .28 && x < W * .72;
        return [inside ? .9 * k : .1, 0];
      }
      if (mode === 'wire') {
        const dx = x - W / 2, dy = y - H / 2, r2 = dx * dx + dy * dy + 30;
        return [-dy / r2 * 900 * k, dx / r2 * 900 * k];
      }
      // magnet: two poles
      const q1 = [W * .40, H * .5, +1 * k], q2 = [W * .60, H * .5, -1 * k];
      let ex = 0, ey = 0;
      [q1, q2].forEach(([qx, qy, q]) => {
        const dx = x - qx, dy = y - qy, r2 = dx * dx + dy * dy + 60;
        const r = Math.sqrt(r2);
        ex += q * dx / (r2 * r); ey += q * dy / (r2 * r);
      });
      return [ex, ey];
    }

    function streamline(sx, sy, dir, W, H, k) {
      const pts = [[sx, sy]];
      let x = sx, y = sy;
      for (let i = 0; i < 900; i++) {
        let [ex, ey] = fieldAt(x, y, W, H, k);
        const m = Math.hypot(ex, ey);
        if (!m || !isFinite(m)) break;
        ex /= m; ey /= m;
        const step = 3.2;
        x += ex * step * dir; y += ey * step * dir;
        if (x < -20 || x > W + 20 || y < -20 || y > H + 20) break;
        pts.push([x, y]);
      }
      return pts;
    }

    host.onTick(() => {
      const { W, H, ctx } = host;
      const k = gain.value;

      if (showVec) {
        const gap = 26;
        for (let x = gap / 2; x < W; x += gap) {
          for (let y = gap / 2; y < H; y += gap) {
            const [ex, ey] = fieldAt(x, y, W, H, k);
            const m = Math.hypot(ex, ey);
            if (m < 1e-6) continue;
            const len = Math.min(11, 4 + Math.log(1 + m * 3e3) * 1.6);
            const ux = ex / m, uy = ey / m;
            ctx.globalAlpha = clamp(.18 + m * 800, .12, .75);
            D.arrow(ctx, x - ux * len / 2, y - uy * len / 2, x + ux * len / 2, y + uy * len / 2, C().teal, 1, 4);
            ctx.globalAlpha = 1;
          }
        }
      }

      if (showLines) {
        if (mode === 'charges' || mode === 'magnet') {
          const cx = mode === 'charges' ? W * .36 : W * .40;
          const cy = H * .5;
          for (let i = 0; i < 12; i++) {
            const a = i / 12 * TAU;
            const pts = streamline(cx + Math.cos(a) * 9, cy + Math.sin(a) * 9, 1, W, H, k);
            ctx.beginPath(); ctx.strokeStyle = C().soft; ctx.lineWidth = .9;
            pts.forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
            ctx.stroke();
          }
        } else if (mode === 'plates') {
          for (let i = 1; i < 6; i++) {
            const x = W * .28 + (W * .44) * i / 6;
            D.line(ctx, x, H * .24, x, H * .76, C().grid, 1, [3, 4]);
          }
        } else {
          for (let r = 26; r < Math.max(W, H) * .6; r += 30) {
            ctx.beginPath(); ctx.strokeStyle = C().soft; ctx.lineWidth = .9;
            ctx.arc(W / 2, H / 2, r, 0, TAU); ctx.stroke();
            D.arrow(ctx, W / 2 + r, H / 2 - 2, W / 2 + r - 1, H / 2 - 8, C().soft, 1, 5);
          }
        }
      }

      // sources
      if (mode === 'charges') {
        D.circle(ctx, W * .36, H * .5, 12, C().red);
        D.circle(ctx, W * .64, H * .5, 12, C().indigo);
        D.text(ctx, '+', W * .36, H * .5, '#fff', 15, 'center');
        D.text(ctx, '−', W * .64, H * .5, '#fff', 17, 'center');
      } else if (mode === 'plates') {
        ctx.fillStyle = C().ink; ctx.fillRect(W * .26, H * .22, 5, H * .56);
        ctx.fillRect(W * .69, H * .22, 5, H * .56);
        for (let i = 0; i < 7; i++) {
          D.text(ctx, '+', W * .26 - 10, H * .26 + i * H * .08, C().red, 11, 'center');
          D.text(ctx, '−', W * .71 + 10, H * .26 + i * H * .08, C().indigo, 13, 'center');
        }
      } else if (mode === 'wire') {
        D.circle(ctx, W / 2, H / 2, 11, C().red);
        D.circle(ctx, W / 2, H / 2, 3.5, C().bg);
        D.text(ctx, 'I 出紙面', W / 2, H / 2 + 30, C().red, 9, 'center');
        D.text(ctx, 'B 沿逆時針', W / 2, H / 2 - 26, C().soft, 9, 'center');
      } else {
        const w = W * .13, h = H * .11;
        ctx.fillStyle = C().red; ctx.fillRect(W * .40 - w / 2, H * .5 - h / 2, w / 2, h);
        ctx.fillStyle = C().indigo; ctx.fillRect(W * .40, H * .5 - h / 2, w / 2, h);
        ctx.strokeStyle = C().ink; ctx.lineWidth = 1.2; ctx.strokeRect(W * .40 - w / 2, H * .5 - h / 2, w, h);
        D.text(ctx, 'N', W * .40 - w / 4, H * .5, '#fff', 12, 'center');
        D.text(ctx, 'S', W * .40 + w / 4, H * .5, '#fff', 12, 'center');
      }

      const labels = {
        charges: ['等量異種電荷的電場線', '從正電荷出發，終止於負電荷'],
        plates: ['平行板間的勻強電場', 'E 處處相同，方向由正極板指向負極板'],
        wire: ['直線電流的磁場', '安培定則：右手握住導線，拇指指電流'],
        magnet: ['條形磁體的磁感線', '磁體外部由 N 極指向 S 極']
      }[mode];
      D.text(ctx, labels[0], 10, 36, C().ink, 9.5);
      D.text(ctx, labels[1], 10, 50, C().soft, 8.5);
      host.setReadout([{ k: '模型', v: labels[0] }]);
    });
  });

  /* ================================================================ fluid */
  PHYS.defineSim('fluid', function (host) {
    let ps = [];
    const v1 = host.addSlider({ label: '寬處流速 v₁', en: 'v1', min: .5, max: 4, step: .1, value: 1.2, unit: 'm/s', dp: 1 });
    const ratio = host.addSlider({ label: '窄處/寬處 面積比', en: 'A₂/A₁', min: .25, max: 1, step: .05, value: .4, dp: 2 });

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const cx = H * .52;
      const wide = H * .17, narrow = wide * ratio.value;
      const x1 = W * .18, xn = W * .52, x2 = W * .86;
      const half = x => {
        if (x < x1) return wide;
        if (x < xn) { const t = (x - x1) / (xn - x1); return wide + (narrow - wide) * (t * t * (3 - 2 * t)); }
        if (x < x2) { const t = (x - xn) / (x2 - xn); return narrow + (wide - narrow) * (t * t * (3 - 2 * t)); }
        return wide;
      };
      // pipe
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= W; x += 6) ctx.lineTo(x, cx - half(x));
      for (let x = W; x >= 0; x -= 6) ctx.lineTo(x, cx + half(x));
      ctx.closePath();
      ctx.fillStyle = 'rgba(47,111,106,.07)';
      ctx.fill();
      ctx.strokeStyle = C().ink; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.restore();

      const vv1 = v1.value, vv2 = vv1 / ratio.value;
      const rho = 1000;
      const p1 = 120000, p2 = p1 + .5 * rho * (vv1 * vv1 - vv2 * vv2);
      const Q = vv1 * wide * .0045;

      // particles
      if (!ps.length) for (let i = 0; i < 130; i++) ps.push({ x: Math.random() * W, y: Math.random() * 2 - 1 });
      ps.forEach(p => {
        const hh = half(p.x);
        p.y = clamp(p.y, -.92, .92);
        const v = vv1 * wide / hh;
        p.x += v * dt * 55;
        if (p.x > W) { p.x = 0; p.y = Math.random() * 2 - 1; }
        D.circle(ctx, p.x, cx + p.y * hh * .94, 1.7, 'rgba(47,111,106,.55)');
      });

      // standpipes
      function gauge(x, p, label, col) {
        const hh = half(x);
        const colH = clamp((p - 95000) / 1000, 6, H * .34);
        D.line(ctx, x, cx - hh, x, cx - hh - colH, C().faint, 1);
        D.line(ctx, x - 7, cx - hh - colH, x + 7, cx - hh - colH, C().ink, 1.5);
        ctx.fillStyle = col + '22';
        ctx.fillRect(x - 5, cx - hh - colH, 10, colH);
        D.text(ctx, label, x, cx - hh - colH - 12, col, 9, 'center');
        D.text(ctx, (p / 1000).toFixed(1) + ' kPa', x, cx - hh - colH - 25, C().soft, 8.5, 'center');
      }
      gauge(W * .30, p1, '寬處', C().teal);
      gauge(W * .52, p2, '窄處', C().red);

      D.text(ctx, 'A₁v₁ = A₂v₂', 12, 16, C().ink, 10);
      D.text(ctx, 'p + ½ρv² = 常量', 12, 31, C().soft, 9);

      host.setReadout([
        { k: 'v₁', v: fmt(vv1, 2), unit: 'm/s' },
        { k: 'v₂', v: fmt(vv2, 2), unit: 'm/s' },
        { k: 'p₁', v: fmt(p1 / 1000, 1), unit: 'kPa' },
        { k: 'p₂', v: fmt(p2 / 1000, 1), unit: 'kPa' }
      ]);
    });
  });

  /* ============================================================== coaster */
  PHYS.defineSim('coaster', function (host) {
    const P = [[0, 2.7], [.12, 2.5], [.26, .95], [.40, .45], [.54, 1.45], [.68, .55], [.84, 1.05], [1, .6]];
    function hAt(x) {
      for (let i = 0; i < P.length - 1; i++) {
        const a = P[i], b = P[i + 1];
        if (x >= a[0] && x <= b[0]) {
          const t = (x - a[0]) / (b[0] - a[0]);
          const s = t * t * (3 - 2 * t);
          return a[1] + (b[1] - a[1]) * s;
        }
      }
      return P[P.length - 1][1];
    }
    const g = 9.8;
    let x = 0.02, dir = 1, running = true, h0 = 2.7;
    host.addToggle('暫停', false, v => running = !v);
    host.addSlider({
      label: '起點高度', en: 'start height', min: 1.8, max: 3.2, step: .1, value: 2.7, unit: 'm', dp: 1,
      oninput: v => { h0 = v; x = .02; dir = 1; }
    });

    host.onTick((dt) => {
      const { W, H, ctx } = host;
      const x0 = 40, x1 = W - 118, yTop = H * .10, yBot = H * .70;
      const X = v => x0 + v * (x1 - x0);
      const Y = h => yBot - (h - .2) / 3.2 * (yBot - yTop);

      // track
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const xx = i / 120;
        i ? ctx.lineTo(X(xx), Y(hAt(xx))) : ctx.moveTo(X(xx), Y(hAt(xx)));
      }
      ctx.strokeStyle = C().ink; ctx.lineWidth = 2.2; ctx.stroke();

      // ball
      const h = hAt(x), v = Math.sqrt(Math.max(0, 2 * g * (h0 - h)));
      if (running) {
        x += dir * v * dt * .022;
        if (x > .995) { x = .995; dir = -1; }
        if (x < .005) { x = .005; dir = 1; }
      }
      const bx = X(x), by = Y(hAt(x));
      D.circle(ctx, bx, by - 7, 6, C().red, C().bg, 2);

      // velocity arrow along the tangent
      const eps = .006;
      const tx = X(x + eps) - X(x - eps);
      const ty = Y(hAt(x + eps)) - Y(hAt(x - eps));
      const L = Math.hypot(tx, ty) || 1;
      D.arrow(ctx, bx, by - 7, bx + tx / L * 26 * dir, by - 7 + ty / L * 26 * dir, C().teal, 1.6, 6);

      // energy bars
      const KE = .5 * v * v, PE = g * (h - .2), E = g * (h0 - .2);
      const bw = 15, bh = H * .44, bxx = W - 78, byy = H * .18;
      [['E_k', KE, C().red], ['E_p', PE, C().teal]].forEach((row, i) => {
        const x = bxx + i * 32;
        D.bar(ctx, x, byy, bw, bh, Math.min(1, row[1] / E), row[2], C().grid);
        D.text(ctx, row[0], x + bw / 2, byy + bh + 12, C().soft, 8.5, 'center');
      });
      D.text(ctx, 'E=' + fmt(E, 0) + ' J', W - 16, H * .12, C().ink, 9, 'right');

      host.setReadout([
        { k: '高度 h', v: fmt(h, 2), unit: 'm' },
        { k: '速度 v', v: fmt(v, 1), unit: 'm/s' },
        { k: '動能', v: fmt(KE, 0), unit: 'J' },
        { k: '勢能', v: fmt(PE, 0), unit: 'J' }
      ]);
    });
  });
})();
