/* app.js — hash router, page rendering, language & theme, progress. */
(function () {
  const P = window.PHYS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const store = {
    get(k, d) { try { const v = localStorage.getItem('aop.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('aop.' + k, JSON.stringify(v)); } catch (e) {} }
  };

  const state = {
    lang: store.get('lang', 'both'),
    theme: store.get('theme', 'paper'),
    visited: store.get('visited', []),
    last: store.get('last', '')
  };

  const byId = {};
  P.chapters.forEach(c => { byId[c.id] = c; });
  const junior = P.chapters.filter(c => c.track === 'junior');
  const senior = P.chapters.filter(c => c.track === 'senior');

  let pendingAnchor = '';

  /* ------------------------------------------------------------- chrome */
  function applyLang() {
    document.documentElement.dataset.lang = state.lang;
    $$('.seg.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === state.lang ? 'true' : 'false'));
  }
  function applyTheme() {
    document.documentElement.dataset.theme = state.theme === 'ink' ? 'ink' : 'paper';
    P.setTheme(state.theme);
    $$('.theme-btn').forEach(b => {
      b.textContent = state.theme === 'ink' ? '☀' : '☾';
      b.setAttribute('aria-label', state.theme === 'ink' ? '切换亮色' : '切换夜间');
    });
  }

  function topbar(ch) {
    const crumb = ch
      ? `<a class="back" href="#/" aria-label="返回首页">←</a>
         <span class="chapter-crumb">
           <b>${esc(ch.title.zh)}</b><i>/</i><span>${esc(ch.title.en)}</span>
         </span>`
      : '';
    return `<header class="topbar">
      <a class="brand" href="#/"><span class="brand-dot"></span><b>Atlas of Physics</b><span>物理图谱</span></a>
      ${crumb}
      <span class="grow"></span>
      <button class="tb-btn search-btn" type="button" aria-haspopup="dialog" aria-expanded="false">
        <span aria-hidden="true">⌕</span><span class="tb-label">搜索</span><kbd class="tb-kbd">⌘K</kbd>
      </button>
      <button class="tb-btn toc-btn" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="drawer">
        <span aria-hidden="true">☰</span><span class="tb-label">目录</span>
      </button>
      <div class="seg lang" role="group" aria-label="语言">
        <button data-lang="zh" type="button">中</button><button data-lang="both" type="button">中英</button><button data-lang="en" type="button">EN</button>
      </div>
      <button class="icon-btn theme-btn" type="button" aria-label="切换夜间">☾</button>
    </header>`;
  }

  function footer() {
    return `<footer class="footer">
      <div class="fcol">
        <span><b>物理图谱 · Atlas of Physics</b> — 离线双语物理教学平台</span>
        <span>内容结构参考 <a href="https://github.com/nathanliow/atlas-of-physics" target="_blank" rel="noopener">nathanliow/atlas-of-physics</a>（MIT 许可）；中文撰写、初中部分与全部互动图为本项目重写。</span>
      </div>
      <div class="fcol">
        <span>互动补充资源，<b>非官方教材</b>。教材单元与课标主题标注仅作教学对照，非官方解读。</span>
        <span class="fhint"><kbd>⌘K</kbd> 搜索 · <kbd>Alt</kbd>+<kbd>←</kbd><kbd>→</kbd> 翻章 · <a href="LICENSE">许可</a></span>
      </div>
    </footer>`;
  }

  /* --------------------------------------------------------------- home */
  function mapBand(list, kind) {
    const done = list.filter(c => state.visited.includes(c.id)).length;
    return `<div class="map-band" data-track="${kind}">
      <div class="map-top">
        <div class="map-title">
          <span>学习地图</span><i>Learning map</i>
        </div>
        <div class="map-progress" aria-label="阅读进度 ${done} / ${list.length}">
          <span class="mp-bar"><i style="width:${list.length ? (done / list.length * 100) : 0}%"></i></span>
          <span class="mp-num">${done}<em>/${list.length}</em></span>
        </div>
      </div>
      <div class="map-scroll">
        <div class="map-holder" data-map="${kind}"><p class="map-loading">正在排布学习地图…</p></div>
      </div>
      <div class="map-foot">
        <span class="lg"><i class="lg-dot done"></i>已读</span>
        <span class="lg"><i class="lg-line"></i>箭头：建议先学左侧</span>
        <span class="lg map-scrollhint">窄屏可左右拖动 →</span>
      </div>
    </div>`;
  }

  function buildMaps() {
    $$('.map-holder').forEach(holder => {
      const kind = holder.dataset.map;
      const list = kind === 'junior' ? junior : senior;
      const w = (holder.parentElement ? holder.parentElement.clientWidth : holder.clientWidth) || 900;
      const r = P.buildMap(list, { width: w, visited: state.visited });
      holder.innerHTML = r.svg;
      P.bindMap(holder);
    });
  }

  function card(c) {
    const done = state.visited.includes(c.id);
    const m = P.meta[c.id] || {};
    return `<a class="card${done ? ' is-done' : ''}" href="#/c/${c.id}">
      <div class="no"><span>${c.track === 'junior' ? 'J' : 'H'}${c.no}</span><span class="tag">${esc(m.book || m.theme || c.tag)}</span></div>
      <h3>${esc(c.title.zh)}</h3>
      <div class="en-title">${esc(c.title.en)}</div>
      <p>${esc(c.summary.zh)}</p>
      <div class="card-foot">
        <span class="go">${c.concepts.length} 节 · ${c.sims.length} 图 →</span>
        ${done ? '<span class="read">已读</span>' : ''}
      </div>
    </a>`;
  }

  function trackSection(kind, list, title, en, desc) {
    return `<section class="track" id="track-${kind}">
      <div class="track-head">
        <span class="track-badge ${kind}">${kind === 'junior' ? '初中' : '高中'}</span>
        <h2>${title}</h2><span class="en">${en}</span>
        <div class="desc">${desc}</div>
      </div>
      ${mapBand(list, kind)}
      <div class="cards">${list.map(card).join('')}</div>
    </section>`;
  }

  function renderHome() {
    const nConcept = P.chapters.reduce((s, c) => s + c.concepts.length, 0);
    const nSim = P.chapters.reduce((s, c) => s + c.sims.length, 0);
    const nTerm = P.chapters.reduce((s, c) => s + c.terms.length, 0);
    const lastC = byId[state.last];
    document.title = '物理图谱 · Atlas of Physics — 离线双语物理教学平台';
    document.documentElement.dataset.view = 'home';
    $('#app').innerHTML = `
      ${topbar()}
      <main class="home fade" id="main">
        <section class="hero">
          <div>
            <div class="kicker">离线 · 中英对照 · ${P.chapters.length} 章</div>
            <h1>把物理<br>画成<em>可以转动</em>的图</h1>
            <div class="sub">An offline, bilingual atlas of physics — from a falling ball to an induced current.</div>
          </div>
          <div class="hero-side">
            <p>左边是中文与英文并排的课文，右边是可以拖动、缩放的立体图。每个知识点配一张图，每张图都能改参数、看读数。</p>
            <span class="en">Every concept carries a figure you can turn, zoom and change.</span>
            ${lastC ? `<a class="resume" href="#/c/${lastC.id}">
              <span class="rlab">继续上次</span>
              <span class="rtitle">${esc(lastC.title.zh)}</span>
              <span class="rarrow" aria-hidden="true">→</span>
            </a>` : ''}
          </div>
        </section>

        <div class="stats">
          <div class="stat"><b>${P.chapters.length}</b><span>章 <i>chapters</i></span></div>
          <div class="stat"><b>${nConcept}</b><span>知识点 <i>concepts</i></span></div>
          <div class="stat"><b>${nSim}</b><span>互动图 <i>figures</i></span></div>
          <div class="stat"><b>${nTerm}</b><span>术语 <i>terms</i></span></div>
        </div>

        ${trackSection('junior', junior, '初中物理', 'Junior secondary · grades 8–9',
          '从测量、声、光、热、力到电与磁，对应初中课程标准的核心内容。每章三到六节，配一张可操作的图。')}
        ${trackSection('senior', senior, '高中物理', 'Senior secondary · compulsory & elective',
          '力学、热学、电磁学到刚体转动，公式推导与图像并重。标「拓展」的章节超出必修范围，供竞赛与 AP 衔接使用。')}
      </main>
      ${footer()}`;
    applyLang(); applyTheme();
    requestAnimationFrame(buildMaps);
  }

  /* ------------------------------------------------------------ chapter */
  function conceptHTML(c, i) {
    return `<section class="concept" id="s-${c.id}-${i}">
      <div class="concept-head">
        <span class="concept-no">${String(i + 1).padStart(2, '0')}</span>
        <div>
          <h2 class="zh-block">${esc(c.t.zh)}</h2>
          <div class="h-en en-block">${esc(c.t.en)}</div>
        </div>
      </div>
      <div class="concept-body">
        <p class="zh-block">${c.b.zh}</p>
        <p class="en en-block">${esc(c.b.en)}</p>
        ${c.f ? `<div class="formula">${c.f}<span class="cap">公式 · formula</span></div>` : ''}
        ${c.note ? `<div class="pitfall"><b>易错点</b> ${c.note.zh}<span class="en">${esc(c.note.en)}</span></div>` : ''}
      </div>
    </section>`;
  }

  function termsHTML(c) {
    return `<div class="terms" id="terms-${c.id}">
      <h3>术语对照</h3><div class="en">Key terms</div>
      <table>${c.terms.map(t => `<tr><td>${esc(t[0])}</td><td>${esc(t[1])}</td><td>${esc(t[2] || '')}</td></tr>`).join('')}</table>
    </div>`;
  }

  function practiceHTML(list) {
    return `<div class="practice">
      <h3>即时练习</h3><div class="en">Check yourself</div>
      ${list.map((q, qi) => `<div class="q" data-q="${qi}">
        <div class="qno">Q${qi + 1}</div>
        <p class="qtext zh-block">${esc(q.q.zh)}</p>
        <p class="qtext-en en-block">${esc(q.q.en)}</p>
        <div class="opts">${q.o.map((o, oi) => `<button class="opt" type="button" data-i="${oi}">
          <span class="k">${'ABCD'[oi]}</span>
          <span><span class="zh-block">${esc(o.zh)}</span><span class="en en-block">${esc(o.en)}</span></span>
        </button>`).join('')}</div>
        <div class="sol"><span class="zh-block">${esc(q.e.zh)}</span><span class="en en-block">${esc(q.e.en)}</span></div>
      </div>`).join('')}
    </div>`;
  }

  function renderChapter(id) {
    const c = byId[id];
    if (!c) { location.hash = '#/'; return; }
    const idx = P.chapters.indexOf(c);
    const prev = P.chapters[idx - 1], next = P.chapters[idx + 1];
    if (!state.visited.includes(id)) {
      state.visited.push(id); store.set('visited', state.visited);
    }
    state.last = id; store.set('last', id);
    document.title = c.title.zh + ' · ' + c.title.en + ' — 物理图谱';
    document.documentElement.dataset.view = 'chapter';

    const m = P.meta[c.id] || {};
    const chip1 = m.book || m.theme || '';
    const chip1En = m.bookEn || m.themeEn || '';

    $('#app').innerHTML = `
      ${topbar(c)}
      <div class="rail" id="rail"></div>
      <div class="reader-wrap" id="main">
        <div class="reader">
          <article class="article fade">
            <div class="kicker"><span class="dot"></span>
              ${c.track === 'junior' ? '初中' : '高中'} No.${c.no} · ${esc(c.kicker.zh)} · ${esc(c.tag)}
            </div>
            <h1 class="zh-block">${esc(c.title.zh)}</h1>
            <div class="h1-en en-block">${esc(c.title.en)}</div>
            <div class="meta-chips">
              ${chip1 ? `<span class="chip strong"><span class="zh-block">${esc(chip1)}</span><span class="en en-block">${esc(chip1En)}</span></span>` : ''}
              ${m.unit ? `<span class="chip"><span class="zh-block">${esc(m.unit)}</span><span class="en en-block">${esc(m.unitEn || '')}</span></span>` : ''}
              <span class="chip"><span class="zh-block">${c.concepts.length} 节</span><span class="en en-block">${c.concepts.length} sections</span></span>
              <span class="chip"><span class="zh-block">${c.sims.length} 互动图</span><span class="en en-block">${c.sims.length} figures</span></span>
            </div>
            <p class="lede zh-block">${esc(c.intro.zh)}</p>
            <p class="lede-en en-block">${esc(c.intro.en)}</p>
            ${c.concepts.map((k, i) => conceptHTML(k, i)).join('')}
            ${termsHTML(c)}
            ${practiceHTML(c.practice)}
            <div class="pager">
              ${prev ? `<a href="#/c/${prev.id}"><span class="lab">← 上一章</span><span class="ttl">${esc(prev.title.zh)}</span></a>` : '<a class="disabled"><span class="lab">← 上一章</span></a>'}
              ${next ? `<a class="next" href="#/c/${next.id}"><span class="lab">下一章 →</span><span class="ttl">${esc(next.title.zh)}</span></a>` : '<a class="disabled next"><span class="lab">下一章 →</span></a>'}
            </div>
            <p class="note-line">本页的图为教学模型，参数与数值可在右侧调整。所有计算即时进行，不依赖网络。教材单元标注为教学对照，非官方。</p>
          </article>

          <aside class="figure-panel" id="panel" aria-label="互动图">
            <div class="fig-tabs" id="figTabs" role="tablist"></div>
            <div id="figHost"></div>
          </aside>
        </div>
      </div>
      ${footer()}`;

    applyLang(); applyTheme();
    bindPractice(c);
    buildTabs(c);
    updateDrawer(c);
    if (pendingAnchor) {
      const target = document.getElementById(pendingAnchor);
      pendingAnchor = '';
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top: y, behavior: 'auto' });
      } else window.scrollTo(0, 0);
    } else window.scrollTo(0, 0);
    updateRail();
  }

  let active = null;
  function killSim() {
    if (!active) return;
    try { if (active.api && active.api.destroy) active.api.destroy(); } catch (e) {}
    try { active.host.destroy(); } catch (e) {}
    active = null;
  }

  function buildTabs(c) {
    const tabs = $('#figTabs');
    if (!tabs) return;
    if (c.sims.length < 2) { tabs.style.display = 'none'; }
    tabs.innerHTML = c.sims.map((s, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-i="${i}"><span class="zh-block">${esc(s.label.zh)}</span> <span class="en en-block">${esc(s.label.en)}</span></button>`).join('');
    tabs.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('button', tabs).forEach(x => x.setAttribute('aria-selected', x === b ? 'true' : 'false'));
      mountSim(c, +b.dataset.i);
    });
    tabs.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const bs = $$('button', tabs);
      const cur = bs.findIndex(b => b.getAttribute('aria-selected') === 'true');
      const n = (cur + (e.key === 'ArrowRight' ? 1 : bs.length - 1)) % bs.length;
      bs[n].focus(); bs[n].click(); e.preventDefault();
    });
    mountSim(c, 0);
  }

  function mountSim(c, i) {
    killSim();
    const hostEl = $('#figHost');
    if (!hostEl) return;
    const spec = c.sims[i];
    const factory = P.sims[spec.type];
    if (!factory) { hostEl.innerHTML = '<p class="loading">图表未载入 · figure unavailable</p>'; return; }
    const host = P.SimHost(hostEl, {
      aspect: 0.70,
      badge: (i + 1) + ' / ' + c.sims.length,
      label: '互动图：' + spec.label.zh + ' / ' + spec.label.en + '（' + c.title.zh + '）'
    });
    let api = null;
    try { api = factory(host, spec.cfg || {}); } catch (err) { console.error('[sim]', spec.type, err); }
    active = { host, api };
  }

  function bindPractice(c) {
    const root = $('.practice'); if (!root) return;
    root.addEventListener('click', e => {
      const btn = e.target.closest('.opt'); if (!btn || btn.disabled) return;
      const q = btn.closest('.q');
      const answer = c.practice[+q.dataset.q].a;
      const pick = +btn.dataset.i;
      $$('.opt', q).forEach(b => {
        b.disabled = true;
        if (+b.dataset.i === answer) b.dataset.state = 'right';
      });
      if (pick !== answer) btn.dataset.state = 'wrong';
      $('.sol', q).classList.add('show');
    });
  }

  function updateRail() {
    const rail = $('#rail'); if (!rail) return;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    rail.style.width = (h > 0 ? Math.min(100, window.scrollY / h * 100) : 0) + '%';
  }

  window.addEventListener('scroll', updateRail, { passive: true });
  window.addEventListener('resize', updateRail);

  let rzT = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rzT);
    rzT = setTimeout(() => { if (document.documentElement.dataset.view === 'home') buildMaps(); }, 180);
  });

  /* ------------------------------------------------------------- drawer */
  let drawerEl = null;
  function ensureDrawer() {
    if (drawerEl) return drawerEl;
    const group = (label, list) => `<div class="dgroup"><span>${label}</span><em>${list.length}</em></div>` +
      list.map(c => `<a class="ditem" data-id="${c.id}" href="#/c/${c.id}">
        <span class="dn">${c.no}</span><span class="dt">${esc(c.title.zh)}</span><span class="de">${esc(c.title.en)}</span>
      </a>`).join('');

    const el = document.createElement('div');
    el.className = 'drawer-wrap';
    el.innerHTML = `<div class="drawer-scrim" data-drawer-close hidden></div>
      <aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="章节目录" aria-hidden="true">
        <div class="drawer-head">
          <div><b>目录</b><span>Contents</span></div>
          <button class="icon-btn" type="button" data-drawer-close aria-label="关闭目录">✕</button>
        </div>
        <div class="drawer-body" id="drawerBody">
          ${group('初中 · Junior', junior)}
          ${group('高中 · Senior', senior)}
        </div>
      </aside>`;
    document.body.appendChild(el);
    el.addEventListener('click', e => {
      if (e.target.closest('[data-drawer-close]')) { closeDrawer(); return; }
      if (e.target.closest('.ditem, .dsec')) closeDrawer();
    });
    drawerEl = el;
    return el;
  }

  function updateDrawer(c) {
    const el = ensureDrawer();
    $$('.ditem', el).forEach(a => a.classList.toggle('current', a.dataset.id === c.id));
    let secs = $('#drawerSecs', el);
    if (!secs) {
      secs = document.createElement('div');
      secs.id = 'drawerSecs';
      secs.className = 'drawer-secs';
      $('#drawerBody', el).insertBefore(secs, $('#drawerBody', el).firstChild);
    }
    secs.innerHTML = `<div class="dsec-head">本篇 · <b>${esc(c.title.zh)}</b></div>` +
      c.concepts.map((k, i) => `<a class="dsec" href="#s-${c.id}-${i}" data-anchor="s-${c.id}-${i}">
        <span class="dn">${String(i + 1).padStart(2, '0')}</span><span class="dt">${esc(k.t.zh)}</span>
      </a>`).join('') +
      `<a class="dsec" href="#terms-${c.id}" data-anchor="terms-${c.id}"><span class="dn">§</span><span class="dt">术语与练习</span></a>`;
  }

  function openDrawer() {
    const el = ensureDrawer();
    el.querySelector('.drawer').setAttribute('aria-hidden', 'false');
    el.querySelector('.drawer-scrim').hidden = false;
    el.classList.add('open');
    document.body.classList.add('no-scroll');
    const btn = $('.toc-btn'); if (btn) btn.setAttribute('aria-expanded', 'true');
    const first = el.querySelector('.ditem.current') || el.querySelector('.ditem');
    if (first) first.focus({ preventScroll: true });
  }
  function closeDrawer(returnFocus) {
    if (!drawerEl || !drawerEl.classList.contains('open')) return;
    drawerEl.classList.remove('open');
    drawerEl.querySelector('.drawer').setAttribute('aria-hidden', 'true');
    drawerEl.querySelector('.drawer-scrim').hidden = true;
    document.body.classList.remove('no-scroll');
    const btn = $('.toc-btn');
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      if (returnFocus !== false) btn.focus();
    }
  }

  /* ------------------------------------------------------------ routing */
  P.searchGo = function (href, anchor) {
    pendingAnchor = anchor || '';
    if (location.hash === href) {
      const t = anchor && document.getElementById(anchor);
      if (t) {
        const y = t.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else window.scrollTo({ top: 0, behavior: 'smooth' });
      pendingAnchor = '';
    } else {
      location.hash = href;
    }
  };

  function route() {
    killSim();
    closeDrawer(false);
    if (P.isSearchOpen && P.isSearchOpen()) P.closeSearch();
    const hash = location.hash || '#/';
    if (!hash.startsWith('#/')) return;      // in-page anchors (#main, #s-...) never re-render
    const m = hash.match(/^#\/c\/(.+)$/);
    if (m) renderChapter(decodeURIComponent(m[1]));
    else renderHome();
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('.seg.lang button');
    if (b) { state.lang = b.dataset.lang; store.set('lang', state.lang); applyLang(); return; }
    const t = e.target.closest('.theme-btn');
    if (t) {
      state.theme = state.theme === 'ink' ? 'paper' : 'ink';
      store.set('theme', state.theme); applyTheme(); return;
    }
    if (e.target.closest('.search-btn')) { P.openSearch(); return; }
    if (e.target.closest('.toc-btn')) { openDrawer(); return; }
    const sec = e.target.closest('.dsec');
    if (sec) {
      e.preventDefault();
      const id = sec.dataset.anchor;
      const target = document.getElementById(id);
      closeDrawer();
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });

  document.addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || '')) || e.target.isContentEditable;
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); P.openSearch(); return; }
    if (e.key === '/' && !typing) { e.preventDefault(); P.openSearch(); return; }
    if (e.key === 'Escape') {
      if (P.isSearchOpen && P.isSearchOpen()) return;   // palette handles its own Esc
      closeDrawer();
      return;
    }
    if (e.altKey && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') && document.documentElement.dataset.view === 'chapter') {
      const m = location.hash.match(/^#\/c\/(.+)$/);
      if (!m) return;
      const c = byId[decodeURIComponent(m[1])];
      const idx = P.chapters.indexOf(c);
      const nx = P.chapters[idx + (e.key === 'ArrowRight' ? 1 : -1)];
      if (nx) { e.preventDefault(); location.hash = '#/c/' + nx.id; }
    }
  });

  window.addEventListener('hashchange', route);

  let booted = false;
  function boot() { if (booted) return; booted = true; applyLang(); applyTheme(); route(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
