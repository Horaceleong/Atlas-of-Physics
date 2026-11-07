/* search.js — offline full-text palette (Ctrl/⌘ K).
   Index is built once from the loaded chapters: titles, concept headings,
   concept prose, key terms. No network, no dependency. */
(function () {
  const P = window.PHYS;
  const ESC = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let index = null;
  function build() {
    if (index) return index;
    index = [];
    P.chapters.forEach(c => {
      index.push({
        type: 'chapter', href: '#/c/' + c.id, anchor: '',
        title: c.title.zh, sub: c.title.en, ch: c.title.zh,
        hay: [c.title.zh, c.title.en, c.summary.zh, c.summary.en, c.kicker.zh, c.tag].join(' '),
        text: c.summary.zh
      });
      c.concepts.forEach((k, i) => {
        const body = String(k.b.zh).replace(/<[^>]+>/g, '');
        const bodyEn = String(k.b.en || '').replace(/<[^>]+>/g, '');
        index.push({
          type: 'concept', href: '#/c/' + c.id, anchor: 's-' + c.id + '-' + i,
          title: k.t.zh, sub: k.t.en, ch: c.title.zh,
          hay: [k.t.zh, k.t.en, body, bodyEn, k.f || ''].join(' '),
          text: body
        });
      });
      c.terms.forEach(t => {
        index.push({
          type: 'term', href: '#/c/' + c.id, anchor: 'terms-' + c.id,
          title: t[0], sub: t[1], ch: c.title.zh,
          hay: [t[0], t[1], t[2] || ''].join(' '), text: t[0] + ' · ' + t[1]
        });
      });
    });
    return index;
  }

  function search(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    const out = [];
    for (const it of build()) {
      const pos = it.hay.toLowerCase().indexOf(q);
      if (pos < 0) continue;
      let score = pos;
      if (it.title.toLowerCase().indexOf(q) === 0) score -= 60;
      else if (it.title.toLowerCase().indexOf(q) > 0) score -= 30;
      if (it.type === 'chapter') score -= 12;
      if (it.type === 'term') score += 6;
      out.push({ it, score });
    }
    out.sort((a, b) => a.score - b.score);
    return out.slice(0, 14).map(o => o.it);
  }

  function mark(text, q) {
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return ESC(text);
    return ESC(text.slice(0, i)) + '<mark>' + ESC(text.slice(i, i + q.length)) + '</mark>' + ESC(text.slice(i + q.length));
  }

  const TYPE = { chapter: '章', concept: '节', term: '术语' };

  let dom = null, sel = 0, current = [];

  function ensure() {
    if (dom) return dom;
    const wrap = document.createElement('div');
    wrap.className = 'palette';
    wrap.hidden = true;
    wrap.innerHTML = `
      <div class="palette-scrim" data-close></div>
      <div class="palette-box" role="dialog" aria-modal="true" aria-label="搜索章节、知识点与术语">
        <div class="palette-input">
          <span class="pi-ico" aria-hidden="true">⌕</span>
          <input type="search" id="palInput" placeholder="搜索章节、知识点、术语…" autocomplete="off" spellcheck="false"
                 aria-controls="palList" aria-autocomplete="list">
          <button type="button" class="pi-esc" data-close aria-label="关闭搜索">Esc</button>
        </div>
        <div class="palette-list" id="palList" role="listbox" aria-label="搜索结果"></div>
        <div class="palette-foot">
          <span class="pstat" aria-live="polite"></span>
          <span><kbd>↑</kbd><kbd>↓</kbd> 选择 · <kbd>↵</kbd> 打开 · <kbd>Esc</kbd> 关闭</span>
        </div>
      </div>`;
    document.body.appendChild(wrap);

    const input = wrap.querySelector('#palInput');
    const list = wrap.querySelector('#palList');
    const stat = wrap.querySelector('.pstat');

    input.addEventListener('input', () => { render(input.value); });

    function move(d) {
      if (!current.length) return;
      sel = (sel + d + current.length) % current.length;
      paint();
      const el = list.querySelector(`[data-i="${sel}"]`);
      if (el) el.scrollIntoView({ block: 'nearest' });
    }

    function paint() {
      Array.from(list.querySelectorAll('.pal-item')).forEach(el => {
        const on = +el.dataset.i === sel;
        el.classList.toggle('on', on);
        el.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      const el = list.querySelector(`[data-i="${sel}"]`);
      if (el) input.setAttribute('aria-activedescendant', el.id);
    }

    function go(i) {
      const it = current[i];
      if (!it) return;
      close();
      if (P.searchGo) P.searchGo(it.href, it.anchor);
      else location.hash = it.href;
    }

    function render(q) {
      current = search(q);
      sel = 0;
      if (!q.trim()) {
        list.innerHTML = '<div class="pal-empty">输入关键词：<em>牛顿</em>、<em>lens</em>、<em>浮力</em>、<em>pV=nRT</em>…</div>';
        stat.textContent = '';
        return;
      }
      if (!current.length) {
        list.innerHTML = '<div class="pal-empty">没有匹配项 · No results</div>';
        stat.textContent = '0 项';
        return;
      }
      list.innerHTML = current.map((it, i) => `<a class="pal-item" id="pal-${i}" data-i="${i}" role="option" aria-selected="false" href="${it.href}">
        <span class="pt">${TYPE[it.type]}</span>
        <span class="pm">
          <span class="ptt">${mark(it.title, q)}</span>
          <span class="psub">${ESC(it.sub)} · ${ESC(it.ch)}</span>
        </span>
        <span class="parrow" aria-hidden="true">↵</span>
      </a>`).join('');
      stat.textContent = current.length + ' 项';
      paint();
    }

    list.addEventListener('click', e => {
      const a = e.target.closest('.pal-item');
      if (!a) return;
      e.preventDefault();
      go(+a.dataset.i);
    });
    wrap.addEventListener('click', e => { if (e.target.closest('[data-close]')) close(); });
    wrap.querySelector('[data-close].palette-scrim').addEventListener('click', close);

    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); go(sel); }
      else if (e.key === 'Escape') { e.preventDefault(); close(); }
    });

    dom = { wrap, input, list, stat, render };
    return dom;
  }

  function open() {
    const d = ensure();
    d.wrap.hidden = false;
    document.body.classList.add('no-scroll');
    d.input.value = '';
    d.render('');
    const btn = document.querySelector('.search-btn');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => d.input.focus());
  }

  function close() {
    if (!dom || dom.wrap.hidden) return;
    dom.wrap.hidden = true;
    document.body.classList.remove('no-scroll');
    const btn = document.querySelector('.search-btn');
    if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
  }

  P.openSearch = open;
  P.closeSearch = close;
  P.isSearchOpen = () => !!(dom && !dom.wrap.hidden);
})();
