/* map.js — the learning map: a small SVG dependency graph for one track.
   Nodes are real links, so the map is keyboard navigable and works offline.
   Layout is computed from PHYS.meta[*].requires (depth = longest path). */
(function () {
  const P = window.PHYS;
  const ESC = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const NODE_H = 52;
  const GAP_Y = 12;
  const GUTTER = 34;

  function columns(list) {
    const byDepth = [];
    list.forEach(c => {
      const d = Math.min(5, P.metaDepth(c.id));
      (byDepth[d] = byDepth[d] || []).push(c);
    });
    return byDepth;
  }

  /* returns { svg, width, height } */
  P.buildMap = function (list, opts) {
    opts = opts || {};
    const track = list[0] ? list[0].track : 'junior';
    const visited = opts.visited || [];
    const byDepth = columns(list);
    const nCols = byDepth.length;
    const maxRows = byDepth.reduce((m, col) => Math.max(m, col ? col.length : 0), 1);

    const avail = Math.max(320, opts.width || 900);
    let colW = Math.min(252, Math.max(186, Math.round(avail / nCols)));
    if (avail < 640) colW = 186;               // narrow: keep readable, scroll instead
    const nodeW = Math.min(206, colW - GUTTER);
    const width = colW * nCols + 4;
    const height = maxRows * (NODE_H + GAP_Y) - GAP_Y;

    const pos = {};
    byDepth.forEach((col, d) => {
      if (!col) return;
      const colH = col.length * (NODE_H + GAP_Y) - GAP_Y;
      const top = (height - colH) / 2;
      col.forEach((c, i) => {
        pos[c.id] = { x: 2 + d * colW, y: top + i * (NODE_H + GAP_Y) };
      });
    });

    const dep = {};
    list.forEach(c => {
      (P.meta[c.id].requires || []).forEach(r => { (dep[r] = dep[r] || []).push(c.id); });
    });

    /* ---- edges ---- */
    let edges = '';
    list.forEach(c => {
      (P.meta[c.id].requires || []).forEach(r => {
        if (!pos[r] || !pos[c.id]) return;
        const a = pos[r], b = pos[c.id];
        const x1 = a.x + nodeW, y1 = a.y + NODE_H / 2;
        const x2 = b.x, y2 = b.y + NODE_H / 2;
        const dx = Math.max(18, (x2 - x1) * .55);
        edges += `<path class="mlink" data-from="${r}" data-to="${c.id}" d="M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}"/>`;
        edges += `<circle class="mtip" cx="${x2 - 1}" cy="${y2}" r="2.4"/>`;
      });
    });

    /* ---- nodes ---- */
    let nodes = '';
    list.forEach(c => {
      const p = pos[c.id];
      const m = P.meta[c.id] || {};
      const done = visited.indexOf(c.id) >= 0;
      const title = c.title.zh.length > 11 ? c.title.zh.slice(0, 11) + '…' : c.title.zh;
      const sub = m.unit || '';
      const label = `第 ${+c.no} 章 ${c.title.zh} · ${c.title.en}${done ? ' · 已读' : ''}`;
      nodes += `<a class="mnode ${track}${done ? ' done' : ''}" href="#/c/${c.id}" data-id="${c.id}" data-req="${(m.requires || []).join(' ')}" aria-label="${ESC(label)}">
        <rect x="${p.x}" y="${p.y}" width="${nodeW}" height="${NODE_H}" rx="7"/>
        <text class="mno" x="${p.x + 11}" y="${p.y + 15}">${ESC(c.no)}</text>
        <text class="mtitle" x="${p.x + 11}" y="${p.y + 32}">${ESC(title)}</text>
        <text class="msub" x="${p.x + 11}" y="${p.y + 44}">${ESC(sub)}</text>
        ${done ? `<circle class="mdot" cx="${p.x + nodeW - 13}" cy="${p.y + 14}" r="3.4"/>` : ''}
      </a>`;
    });

    const svg = `<svg class="map-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="group" aria-label="${track === 'junior' ? '初中物理学习地图' : '高中物理学习地图'}">
      <g class="medges">${edges}</g>
      <g class="mnodes">${nodes}</g>
    </svg>`;

    return { svg, width, height };
  };

  /* hover / focus emphasis: light up the node, its prerequisites and dependents */
  P.bindMap = function (root) {
    const svg = root.querySelector('svg');
    if (!svg) return;
    const nodes = Array.from(svg.querySelectorAll('.mnode'));
    const links = Array.from(svg.querySelectorAll('.mlink'));

    function focusOn(id) {
      if (!id) {
        svg.classList.remove('is-focus');
        nodes.forEach(n => n.classList.remove('hl', 'dim'));
        links.forEach(l => l.classList.remove('hl', 'dim'));
        return;
      }
      const req = new Set((svg.querySelector(`[data-id="${id}"]`).dataset.req || '').split(' ').filter(Boolean));
      const dep = new Set(nodes.filter(n => (n.dataset.req || '').split(' ').indexOf(id) >= 0).map(n => n.dataset.id));
      const set = new Set([id, ...req, ...dep]);
      svg.classList.add('is-focus');
      nodes.forEach(n => {
        const on = set.has(n.dataset.id);
        n.classList.toggle('hl', on);
        n.classList.toggle('dim', !on);
      });
      links.forEach(l => {
        const on = set.has(l.dataset.from) && set.has(l.dataset.to);
        l.classList.toggle('hl', on);
        l.classList.toggle('dim', !on);
      });
    }

    nodes.forEach(n => {
      n.addEventListener('mouseenter', () => focusOn(n.dataset.id));
      n.addEventListener('focus', () => focusOn(n.dataset.id));
    });
    svg.addEventListener('mouseleave', () => focusOn(null));
    svg.addEventListener('focusout', e => {
      if (!svg.contains(e.relatedTarget)) focusOn(null);
    });
  };
})();
