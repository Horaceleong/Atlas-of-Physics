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
    visited: store.get('visited', [])
  };

  const byId = {};
  P.chapters.forEach(c => { byId[c.id] = c; });
  const junior = P.chapters.filter(c => c.track === 'junior');
  const senior = P.chapters.filter(c => c.track === 'senior');

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
      <div class="seg lang" role="group" aria-label="语言">
        <button data-lang="zh" type="button">中</button><button data-lang="both" type="button">中英</button><button data-lang="en" type="button">EN</button>
      </div>
      <button class="icon-btn theme-btn" type="button" aria-label="切换夜间">☾</button>
    </header>`;
  }

  function footer() {
    return `<footer class="footer">
      <span>物理图谱 · Atlas of Physics — 离线双语教学平台</span>
      <span>内容结构参考 <a href="https://github.com/nathanliow/atlas-of-physics" target="_blank" rel="noopener">nathanliow/atlas-of-physics</a>（MIT 许可）；中文撰写、初中部分与全部互动图由本平台重写。</span>
    </footer>`;
  }

  /* --------------------------------------------------------------- home */
  function card(c) {
    const done = state.visited.includes(c.id);
    return `<a class="card" href="#/c/${c.id}">
      <div class="no"><span>${c.track === 'junior' ? 'J' : 'H'}${c.no}</span><span class="tag">${done ? '已读' : c.tag}</span></div>
      <h3>${esc(c.title.zh)}</h3>
      <div class="en-title">${esc(c.title.en)}</div>
      <p>${esc(c.summary.zh)}</p>
      <span class="go">${c.concepts.length} 节 · ${c.sims.length} 图 →</span>
    </a>`;
  }

  function trackSection(kind, list, title, en, desc) {
    return `<section class="track" id="track-${kind}">
      <div class="track-head">
        <span class="track-badge ${kind}">${kind === 'junior' ? '初中' : '高中'}</span>
        <h2>${title}</h2><span class="en">${en}</span>
        <div class="desc">${desc}</div>
      </div>
      <div class="cards">${list.map(card).join('')}</div>
    </section>`;
  }

  function renderHome() {
    const nConcept = P.chapters.reduce((s, c) => s + c.concepts.length, 0);
    const nSim = P.chapters.reduce((s, c) => s + c.sims.length, 0);
    const nTerm = P.chapters.reduce((s, c) => s + c.terms.length, 0);
    document.title = '物理图谱 · Atlas of Physics — 离线双语物理教学平台';
    $('#app').innerHTML = `
      ${topbar()}
      <main class="home fade">
        <section class="hero">
          <div>
            <div class="kicker">离线 · 中英对照 · ${P.chapters.length} 章</div>
            <h1>把物理<br>画成<em>可以转动</em>的图</h1>
            <div class="sub">An offline, bilingual atlas of physics — from a falling ball to an induced current.</div>
          </div>
          <div class="hero-side">
            <p>左边是中文与英文并排的课文，右边是可以拖动、缩放的立体图。每个知识点配一张图，每张图都能改参数、看读数。</p>
            <span class="en">Every concept carries a figure you can turn, zoom and change.</span>
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
  }

  /* ------------------------------------------------------------ chapter */
  function conceptHTML(c, i) {
    return `<section class="concept">
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

  function termsHTML(terms) {
    return `<div class="terms">
      <h3>术语对照</h3><div class="en">Key terms</div>
      <table>${terms.map(t => `<tr><td>${esc(t[0])}</td><td>${esc(t[1])}</td><td>${esc(t[2] || '')}</td></tr>`).join('')}</table>
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
    document.title = c.title.zh + ' · ' + c.title.en + ' — 物理图谱';

    $('#app').innerHTML = `
      ${topbar(c)}
      <div class="rail" id="rail"></div>
      <div class="reader-wrap">
        <div class="reader">
          <article class="article fade">
            <div class="kicker"><span class="dot"></span>
              ${c.track === 'junior' ? '初中' : '高中'} No.${c.no} · ${esc(c.kicker.zh)} · ${esc(c.tag)}
            </div>
            <h1 class="zh-block">${esc(c.title.zh)}</h1>
            <div class="h1-en en-block">${esc(c.title.en)}</div>
            <p class="lede zh-block">${esc(c.intro.zh)}</p>
            <p class="lede-en en-block">${esc(c.intro.en)}</p>
            ${c.concepts.map(conceptHTML).join('')}
            ${termsHTML(c.terms)}
            ${practiceHTML(c.practice)}
            <div class="pager">
              ${prev ? `<a href="#/c/${prev.id}"><span class="lab">← 上一章</span><span class="ttl">${esc(prev.title.zh)}</span></a>` : '<a class="disabled"><span class="lab">← 上一章</span></a>'}
              ${next ? `<a class="next" href="#/c/${next.id}"><span class="lab">下一章 →</span><span class="ttl">${esc(next.title.zh)}</span></a>` : '<a class="disabled next"><span class="lab">下一章 →</span></a>'}
            </div>
            <p class="note-line">本页的图为教学模型，参数与数值可在右侧调整。所有计算即时进行，不依赖网络。</p>
          </article>

          <aside class="figure-panel" id="panel">
            <div class="fig-tabs" id="figTabs"></div>
            <div id="figHost"></div>
          </aside>
        </div>
      </div>
      ${footer()}`;

    applyLang(); applyTheme();
    bindPractice(c);
    buildTabs(c);
    window.scrollTo(0, 0);
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
    if (c.sims.length < 2) tabs.style.display = 'none';
    tabs.innerHTML = c.sims.map((s, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-i="${i}"><span class="zh-block">${esc(s.label.zh)}</span> <span class="en en-block">${esc(s.label.en)}</span></button>`).join('');
    tabs.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $$('button', tabs).forEach(x => x.setAttribute('aria-selected', x === b ? 'true' : 'false'));
      mountSim(c, +b.dataset.i);
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
    const host = P.SimHost(hostEl, { aspect: 0.70, badge: (i + 1) + ' / ' + c.sims.length });
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

  /* ------------------------------------------------------------ routing */
  function route() {
    killSim();
    const hash = location.hash || '#/';
    const m = hash.match(/^#\/c\/(.+)$/);
    if (m) renderChapter(decodeURIComponent(m[1]));
    else renderHome();
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('.seg.lang button');
    if (b) { state.lang = b.dataset.lang; store.set('lang', state.lang); applyLang(); return; }
    const t = e.target.closest('.theme-btn');
    if (t) {
      state.theme = state.theme === 'ink' ? 'paper' : 'ink';
      store.set('theme', state.theme); applyTheme(); return;
    }
  });

  window.addEventListener('hashchange', route);

  let booted = false;
  function boot() { if (booted) return; booted = true; applyLang(); applyTheme(); route(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
