/* engine3d.js — a tiny dependency-free 3D scene renderer on Canvas 2D.
   Perspective camera, painter's-algorithm depth sort, orbit control.
   Enough for physics figures (vectors, bodies, fields, tracks) and works offline. */
(function () {
  const PHYS = window.PHYS;
  const C = () => PHYS.C;

  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, s) { return [a[0] * s, a[1] * s, a[2] * s]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function norm(a) { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  PHYS.v3 = { sub, add, mul, dot, cross, norm };

  PHYS.Cam3 = function (opt) {
    opt = opt || {};
    this.az = opt.az == null ? 0.7 : opt.az;
    this.el = opt.el == null ? 0.22 : opt.el;
    this.dist = opt.dist == null ? 12 : opt.dist;
    this.target = opt.target || [0, 0, 0];
    this.fov = (opt.fov || 40) * Math.PI / 180;
    this.minDist = opt.minDist || 2.5;
    this.maxDist = opt.maxDist || 60;
    this.spin = opt.spin || 0;      // optional auto-rotation rad/s
    this.ops = [];
    this.labels = [];
    this.W = 600; this.H = 400; this.f = 500;
    this.eye = [0, 0, 10];
    this.basis = null;
  };

  PHYS.Cam3.prototype.bind = function (canvas, opts) {
    const self = this;
    opts = opts || {};
    let dragging = false, px = 0, py = 0;
    canvas.style.touchAction = 'none';
    function down(e) {
      dragging = true; px = e.clientX; py = e.clientY;
      if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
    }
    function move(e) {
      if (!dragging) return;
      const dx = e.clientX - px, dy = e.clientY - py;
      px = e.clientX; py = e.clientY;
      self.az -= dx * 0.008;
      self.el = PHYS.clamp(self.el + dy * 0.006, -1.4, 1.4);
      if (opts.onmove) opts.onmove();
    }
    function up(e) { dragging = false; }
    function wheel(e) {
      e.preventDefault();
      const k = Math.exp(e.deltaY * 0.0012);
      self.dist = PHYS.clamp(self.dist * k, self.minDist, self.maxDist);
    }
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('pointerleave', up);
    canvas.addEventListener('wheel', wheel, { passive: false });
    return function () {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('pointerleave', up);
      canvas.removeEventListener('wheel', wheel);
    };
  };

  PHYS.Cam3.prototype.frame = function (W, H, dt) {
    if (this.spin) this.az += this.spin * (dt || 0);
    this.W = W; this.H = H;
    this.f = (H / 2) / Math.tan(this.fov / 2);
    const ce = Math.cos(this.el), se = Math.sin(this.el);
    const dir = [ce * Math.sin(this.az), se, ce * Math.cos(this.az)];
    this.eye = add(this.target, mul(dir, this.dist));
    const fwd = mul(dir, -1);
    const right = norm(cross(fwd, [0, 1, 0]));
    const up = cross(right, fwd);
    this.basis = { fwd, right, up };
    this.ops.length = 0;
    this.labels.length = 0;
  };

  PHYS.Cam3.prototype.project = function (p) {
    const b = this.basis;
    const v = sub(p, this.eye);
    const z = dot(v, b.fwd);
    if (z < 0.08) return null;
    return {
      x: this.W / 2 + dot(v, b.right) / z * this.f,
      y: this.H / 2 - dot(v, b.up) / z * this.f,
      z, s: this.f / z
    };
  };

  PHYS.Cam3.prototype.line = function (a, b, o) {
    o = o || {};
    const pa = this.project(a), pb = this.project(b);
    if (!pa || !pb) return;
    this.ops.push({ z: (pa.z + pb.z) / 2, d: (ctx) => {
      ctx.save();
      ctx.strokeStyle = o.color || C().ink;
      ctx.lineWidth = o.width || 1.2;
      ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
      if (o.dash) ctx.setLineDash(o.dash);
      ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
      ctx.restore();
    }});
  };

  PHYS.Cam3.prototype.poly = function (pts, o) {
    o = o || {};
    const ps = pts.map(p => this.project(p));
    if (ps.some(p => !p)) return;
    const z = ps.reduce((s, p) => s + p.z, 0) / ps.length;
    this.ops.push({ z, d: (ctx) => {
      ctx.save();
      ctx.beginPath();
      ps.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
      ctx.closePath();
      if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); }
      if (o.stroke) { ctx.strokeStyle = o.stroke; ctx.lineWidth = o.width || 1; if (o.dash) ctx.setLineDash(o.dash); ctx.stroke(); }
      ctx.restore();
    }});
  };

  PHYS.Cam3.prototype.sphere = function (p, r, o) {
    o = o || {};
    const pp = this.project(p);
    if (!pp) return;
    const rad = Math.max(1, r * pp.s);
    this.ops.push({ z: pp.z, d: (ctx) => {
      const col = o.color || C().ink;
      const g = ctx.createRadialGradient(pp.x - rad * .35, pp.y - rad * .38, rad * .1, pp.x, pp.y, rad);
      g.addColorStop(0, o.light || mix(col, '#ffffff', .55));
      g.addColorStop(.65, col);
      g.addColorStop(1, mix(col, '#000000', .22));
      ctx.beginPath(); ctx.arc(pp.x, pp.y, rad, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      if (o.stroke) { ctx.strokeStyle = o.stroke; ctx.lineWidth = o.strokeW || 1; ctx.stroke(); }
    }});
  };

  PHYS.Cam3.prototype.disc = function (c, r, n, o) {
    o = o || {};
    const nn = norm(n);
    let t = Math.abs(nn[1]) > .9 ? [1, 0, 0] : [0, 1, 0];
    const u = norm(cross(nn, t)), v = norm(cross(nn, u));
    const pts = [];
    const seg = o.seg || 40;
    for (let i = 0; i < seg; i++) {
      const a = i / seg * Math.PI * 2;
      pts.push(add(c, add(mul(u, Math.cos(a) * r), mul(v, Math.sin(a) * r))));
    }
    this.poly(pts, o);
  };

  PHYS.Cam3.prototype.box = function (c, s, o) {
    // s = [sx, sy, sz] full sizes; draws 6 faces sorted by depth internally
    const [x, y, z] = c, [a, b, d] = s.map(v => v / 2);
    const P = [
      [x - a, y - b, z - d], [x + a, y - b, z - d], [x + a, y + b, z - d], [x - a, y + b, z - d],
      [x - a, y - b, z + d], [x + a, y - b, z + d], [x + a, y + b, z + d], [x - a, y + b, z + d]
    ];
    const faces = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
    faces.forEach((f, i) => {
      const pts = f.map(k => P[k]);
      const shade = [.82, .94, .72, .88, .78, .99][i];
      this.poly(pts, { fill: mix(o.color || C().red, o.shade || '#000000', 1 - shade), stroke: o.stroke || null, width: o.width || 1 });
    });
    if (o.edges) {
      [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
        .forEach(([i, j]) => this.line(P[i], P[j], { color: o.edges, width: o.edgeW || 1, alpha: .9 }));
    }
  };

  PHYS.Cam3.prototype.arrow = function (a, b, o) {
    o = o || {};
    const pa = this.project(a), pb = this.project(b);
    if (!pa || !pb) return;
    const ang = Math.atan2(pb.y - pa.y, pb.x - pa.x);
    const h = o.head || 8;
    const col = o.color || C().red;
    this.ops.push({ z: (pa.z + pb.z) / 2 + .001, d: (ctx) => {
      ctx.save();
      ctx.strokeStyle = col; ctx.fillStyle = col;
      ctx.lineWidth = o.width || 1.8;
      if (o.dash) ctx.setLineDash(o.dash);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x - Math.cos(ang) * h * .7, pb.y - Math.sin(ang) * h * .7);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pb.x, pb.y);
      ctx.lineTo(pb.x - Math.cos(ang - .36) * h, pb.y - Math.sin(ang - .36) * h);
      ctx.lineTo(pb.x - Math.cos(ang + .36) * h, pb.y - Math.sin(ang + .36) * h);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }});
  };

  PHYS.Cam3.prototype.text = function (p, s, o) {
    o = o || {};
    const pp = this.project(p);
    if (!pp) return;
    this.labels.push({ x: pp.x + (o.dx || 0), y: pp.y + (o.dy || 0), s, o });
  };

  PHYS.Cam3.prototype.ground = function (size, step, o) {
    o = o || {};
    const col = o.color || C().grid;
    for (let i = -size; i <= size; i += step) {
      this.line([-size, 0, i], [size, 0, i], { color: col, width: .7, alpha: o.alpha == null ? .8 : o.alpha });
      this.line([i, 0, -size], [i, 0, size], { color: col, width: .7, alpha: o.alpha == null ? .8 : o.alpha });
    }
  };

  PHYS.Cam3.prototype.axes = function (len, o) {
    o = o || {};
    this.arrow([0, 0, 0], [len, 0, 0], { color: C().red, width: 1.2, head: 6 });
    this.arrow([0, 0, 0], [0, len, 0], { color: C().teal, width: 1.2, head: 6 });
    this.arrow([0, 0, 0], [0, 0, len], { color: C().indigo, width: 1.2, head: 6 });
    this.text([len, 0, 0], o.x || 'x', { color: C().red, dx: 6, size: 10 });
    this.text([0, len, 0], o.y || 'y', { color: C().teal, dx: 4, dy: -8, size: 10 });
    this.text([0, 0, len], o.z || 'z', { color: C().indigo, dx: 6, size: 10 });
  };

  PHYS.Cam3.prototype.end = function (ctx) {
    this.ops.sort((a, b) => b.z - a.z);
    for (const op of this.ops) op.d(ctx);
    for (const l of this.labels) {
      const o = l.o;
      ctx.save();
      ctx.font = (o.size || 10.5) + 'px "JetBrains Mono", Consolas, monospace';
      ctx.fillStyle = o.color || C().ink;
      ctx.textAlign = o.align || 'left';
      ctx.textBaseline = 'middle';
      if (o.bg) {
        const w = ctx.measureText(l.s).width + 8;
        ctx.fillStyle = o.bg;
        ctx.fillRect(l.x - 4, l.y - 8, w, 16);
        ctx.fillStyle = o.color || C().ink;
      }
      ctx.fillText(l.s, l.x, l.y);
      ctx.restore();
    }
  };

  /* ------------------------------------------------------------ color utils */
  function hex2rgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function mix(a, b, t) {
    try {
      const A = hex2rgb(a), B = hex2rgb(b);
      const c = A.map((v, i) => Math.round(v + (B[i] - v) * t));
      return 'rgb(' + c.join(',') + ')';
    } catch (e) { return a; }
  }
  PHYS.mix = mix;

  /* --------------------------------------------------- tiny 2D chart helper */
  PHYS.chart = function (ctx, box, o) {
    const { x, y, w, h } = box;
    const C0 = PHYS.C;
    ctx.save();
    ctx.strokeStyle = C0.faint; ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);
    if (o.grid) {
      ctx.strokeStyle = C0.grid; ctx.lineWidth = .7; ctx.setLineDash([2, 3]);
      for (let i = 1; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(x, y + h * i / 4); ctx.lineTo(x + w, y + h * i / 4); ctx.stroke();
      }
      ctx.setLineDash([]);
    }
    ctx.restore();
    return {
      X: v => x + (v - o.x0) / (o.x1 - o.x0) * w,
      Y: v => y + h - (v - o.y0) / (o.y1 - o.y0) * h
    };
  };
})();
