/* ============================================================
   APP.JS — Renderização, navegação e quiz
   ============================================================ */
(function(){
  "use strict";

  const MOD_ORDER = ["bia","piapic","hemo","marcapasso","vm"];

  /* ---------------------------------------------------------
     UTIL
  --------------------------------------------------------- */
  function el(tag, cls, html){
    const e = document.createElement(tag);
    if(cls) e.className = cls;
    if(html !== undefined) e.innerHTML = html;
    return e;
  }
  function esc(str){
    return String(str).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  }
  // permite negrito leve via **texto** nos dados, sem libs externas
  function rich(str){
    return esc(str).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  /* ---------------------------------------------------------
     RENDER DE SEÇÕES — um renderer por "type"
  --------------------------------------------------------- */
  const renderers = {

    subheader(s){
      const wrap = el('div','subhead');
      wrap.innerHTML = `<span class="subhead__label">${esc(s.label)}</span><h3>${esc(s.title)}</h3>`;
      return wrap;
    },

    divider(){
      return el('div','section-divider');
    },

    concept(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>
        <div class="card__body">${rich(s.body)}</div>`;
      if(s.highlight){
        const h = el('div','highlight');
        h.innerHTML = `<div class="highlight__label">${esc(s.highlight.label)}</div>
          <ul>${s.highlight.items.map(i=>`<li>${rich(i)}</li>`).join('')}</ul>`;
        c.appendChild(h);
      }
      if(s.source){
        c.appendChild(el('div','card__source', `Fonte: ${esc(s.source)}`));
      }
      return c;
    },

    team(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>`;
      if(s.body) c.appendChild(el('div','card__body', rich(s.body)));
      const list = el('div','team-list');
      s.roles.forEach((r,i)=>{
        const row = el('div','team-row');
        row.innerHTML = `<div class="team-row__badge">${i+1}</div>
          <div class="team-row__text"><strong>${esc(r.role)}</strong><span>${esc(r.desc)}</span></div>`;
        list.appendChild(row);
      });
      c.appendChild(list);
      if(s.note) c.appendChild(el('div','team-note', rich(s.note)));
      return c;
    },

    diagram(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>
        <div class="card__body">${rich(s.body)}</div>`;
      const dw = el('div','diagram-wrap');
      dw.appendChild(buildDiagram(s.diagramType));
      c.appendChild(dw);
      return c;
    },

    mechanism(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>
        <div class="card__body">${rich(s.body)}</div>`;
      const steps = el('div','mech-steps');
      s.steps.forEach(st=>{
        const isD = st.phase.toLowerCase().includes('di');
        const row = el('div', `mech-step ${isD?'mech-step--diastole':'mech-step--sistole'}`);
        row.innerHTML = `<div class="mech-step__icon">${isD?'D':'S'}</div>
          <div class="mech-step__phase">${esc(st.phase)}<small>${esc(st.trigger)}</small></div>
          <span class="mech-step__action">${esc(st.action)}</span>
          <div class="mech-step__effect">${esc(st.effect)}</div>`;
        steps.appendChild(row);
      });
      c.appendChild(steps);
      if(s.result) c.appendChild(el('div','mech-result', rich(s.result)));
      return c;
    },

    list(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>`;
      const list = el('div', `list-items ${s.tone==='critical'?'is-critical':''}`);
      s.items.forEach((it,i)=>{
        const row = el('div','list-item');
        const mark = s.icon==='alert' ? '!' : (i+1);
        row.innerHTML = `<span class="list-item__mark">${mark}</span><span>${rich(it)}</span>`;
        list.appendChild(row);
      });
      c.appendChild(list);
      if(s.note) c.appendChild(el('div','list-note', rich(s.note)));
      return c;
    },

    care(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>`;
      s.groups.forEach(g=>{
        c.appendChild(el('div','care-group__label', esc(g.label)));
        const items = el('div','care-items');
        g.items.forEach(it=>{
          const row = el('div','care-item');
          row.innerHTML = `<span class="care-item__check"></span><span>${rich(it)}</span>`;
          items.appendChild(row);
        });
        c.appendChild(items);
      });
      return c;
    },

    vitals(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>`;
      const board = el('div','vitals-board');
      s.items.forEach(v=>{
        const row = el('div', `vital-row tone-${v.tone||'normal'}`);
        row.innerHTML = `<span class="vital-row__label">${esc(v.label)}</span>
          <span class="vital-row__val"><span class="vital-row__num">${esc(v.value)}</span><span class="vital-row__unit">${esc(v.unit)}</span>${v.extra?`<span class="vital-row__extra">${esc(v.extra)}</span>`:''}</span>`;
        board.appendChild(row);
      });
      c.appendChild(board);
      return c;
    },

    formula(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>`;
      const box = el('div','formula-box');
      box.innerHTML = `<div class="formula-box__eq">${esc(s.formula)}</div>
        <div class="formula-box__caption">${rich(s.body)}</div>`;
      c.appendChild(box);
      return c;
    },

    twocol(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>`;
      const grid = el('div','twocol-grid');
      [s.colA, s.colB].forEach(col=>{
        const box = el('div','twocol-box');
        box.innerHTML = `<div class="twocol-box__label">${esc(col.label)}</div><ul>${col.items.map(i=>`<li>${rich(i)}</li>`).join('')}</ul>`;
        grid.appendChild(box);
      });
      c.appendChild(grid);
      return c;
    },

    competence(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>`;
      const box = el('div','competence-box');
      box.innerHTML = `<div class="competence-box__ico">i</div><p>${rich(s.body)}</p>`;
      c.appendChild(box);
      if(s.source) c.appendChild(el('div','card__source', `Fonte: ${esc(s.source)}`));
      return c;
    },

    steps(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>`;
      const list = el('div','steps-list');
      s.steps.forEach((st,i)=>{
        const row = el('div','step-row');
        row.innerHTML = `<div class="step-row__num">${i+1}</div><div class="step-row__text">${rich(st)}</div>`;
        list.appendChild(row);
      });
      c.appendChild(list);
      return c;
    },

    procedure(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>
        <div class="card__body">${rich(s.body)}</div>`;
      const list = el('div','steps-list procedure-steps');
      s.steps.forEach((st,i)=>{
        const row = el('div','step-row');
        row.innerHTML = `<div class="step-row__num">${i+1}</div><div class="step-row__text">${rich(st)}</div>`;
        list.appendChild(row);
      });
      c.appendChild(list);
      return c;
    },

    ranked(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>`;
      const list = el('div','ranked-list');
      s.items.forEach(it=>{
        const row = el('div','ranked-item');
        row.innerHTML = `<span class="ranked-item__order">${esc(it.rank||'')}</span><span class="ranked-item__label">${esc(it.label)}</span>`;
        list.appendChild(row);
      });
      c.appendChild(list);
      return c;
    },

    composition(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>
        <div class="card__body">${rich(s.body)}</div>`;
      const bars = el('div','composition-bars');
      s.parts.forEach(p=>{
        const row = el('div','comp-row');
        row.innerHTML = `<div class="comp-row__top"><span class="comp-row__name">${esc(p.label)}</span><span class="comp-row__pct" style="color:${p.color}">${p.pct}%</span></div>
          <div class="comp-row__bar"><div class="comp-row__fill" style="width:0%;background:${p.color}"></div></div>`;
        bars.appendChild(row);
        requestAnimationFrame(()=>{
          requestAnimationFrame(()=>{
            row.querySelector('.comp-row__fill').style.width = p.pct + '%';
          });
        });
      });
      c.appendChild(bars);
      return c;
    },

    glossary(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>`;
      const list = el('div','glossary-list');
      s.items.forEach(g=>{
        const row = el('div','gloss-row');
        row.innerHTML = `<span class="gloss-row__term">${esc(g.term)}</span><div class="gloss-row__def">${rich(g.def)}</div>`;
        list.appendChild(row);
      });
      c.appendChild(list);
      return c;
    },

    modes(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>`;
      const list = el('div','modes-list');
      s.items.forEach(m=>{
        const row = el('div','mode-row');
        row.innerHTML = `<div class="mode-row__n">${m.n}</div>
          <div><div class="mode-row__name">${esc(m.name)}</div><div class="mode-row__desc">${rich(m.desc)}</div></div>`;
        list.appendChild(row);
      });
      c.appendChild(list);
      return c;
    },

    'tabs-compare'(s){
      const c = el('div','card');
      c.innerHTML = `<div class="card__title"><span class="dot"></span>${esc(s.title)}</div>`;
      const tabs = el('div','tcompare-tabs');
      const panel = el('div','tcompare-panel');

      function renderPanel(idx){
        const t = s.tabs[idx];
        panel.innerHTML = `<span class="tcompare-panel__badge">${esc(t.badge)}</span>
          <div class="tcompare-panel__body">${rich(t.body)}</div>
          <ul class="tcompare-panel__details">${t.details.map(d=>`<li>${rich(d)}</li>`).join('')}</ul>`;
      }
      s.tabs.forEach((t,i)=>{
        const btn = el('button', `tcompare-tab ${i===0?'is-active':''}`, esc(t.label));
        btn.type = 'button';
        btn.addEventListener('click', ()=>{
          tabs.querySelectorAll('.tcompare-tab').forEach(b=>b.classList.remove('is-active'));
          btn.classList.add('is-active');
          renderPanel(i);
        });
        tabs.appendChild(btn);
      });
      renderPanel(0);
      c.appendChild(tabs);
      c.appendChild(panel);
      return c;
    }
  };

  function buildDiagram(type){
    if(type === 'bia-position'){
      const wrap = document.createElement('div');
      wrap.innerHTML = `
      <svg viewBox="0 0 220 320" xmlns="http://www.w3.org/2000/svg">
        <!-- torso simplificado -->
        <path d="M110 18 C75 18 60 45 60 80 L58 230 C58 270 80 300 110 300 C140 300 162 270 162 230 L160 80 C160 45 145 18 110 18 Z"
              fill="#F4EBFA" stroke="#D9C2EC" stroke-width="2"/>
        <!-- aorta -->
        <path d="M110 50 C110 50 128 60 128 85 L124 180 C124 195 116 205 110 215 L106 240"
              fill="none" stroke="#B0247A" stroke-width="7" stroke-linecap="round"/>
        <!-- arco subclavia label point -->
        <circle cx="124" cy="92" r="4.5" fill="#1888E2"/>
        <line x1="124" y1="92" x2="172" y2="78" stroke="#1888E2" stroke-width="1.4" stroke-dasharray="3 2"/>
        <text x="176" y="81" font-size="10" font-family="Inter, sans-serif" fill="#1888E2" font-weight="600">art. subclávia</text>
        <!-- balao posicionado -->
        <ellipse cx="118" cy="140" rx="9" ry="34" fill="#7500AF" opacity="0.85"/>
        <circle cx="118" cy="140" r="3" fill="#fff"/>
        <line x1="118" y1="140" x2="172" y2="140" stroke="#7500AF" stroke-width="1.4" stroke-dasharray="3 2"/>
        <text x="176" y="143" font-size="10" font-family="Inter, sans-serif" fill="#7500AF" font-weight="700">balão (~1cm abaixo)</text>
        <!-- cateter saindo pela femoral -->
        <path d="M106 240 C100 260 92 275 84 295" fill="none" stroke="#7500AF" stroke-width="4" stroke-linecap="round"/>
        <circle cx="84" cy="295" r="5" fill="#7500AF"/>
        <line x1="84" y1="295" x2="40" y2="305" stroke="#7500AF" stroke-width="1.4" stroke-dasharray="3 2"/>
        <text x="6" y="316" font-size="10" font-family="Inter, sans-serif" fill="#7500AF" font-weight="700">art. femoral</text>
      </svg>`;
      return wrap.firstElementChild;
    }
    return document.createTextNode('');
  }

  /* ---------------------------------------------------------
     RENDER DE UM MÓDULO COMPLETO (com sub-nav e cards)
  --------------------------------------------------------- */
  const renderedModules = new Set();

  function countTopics(modKey){
    const data = STUDY_DATA[modKey];
    return data.sections.filter(s => s.type !== 'divider' && s.type !== 'subheader').length;
  }

  function renderModule(modKey){
    if(renderedModules.has(modKey)) return;
    const data = STUDY_DATA[modKey];
    const section = document.querySelector(`[data-view="${modKey}"]`);
    const navHost = section.querySelector(`[data-modnav="${modKey}"]`);
    const bodyHost = section.querySelector(`[data-modbody="${modKey}"]`);

    // intro card
    const intro = el('div','card');
    intro.id = `${modKey}-intro`;
    intro.innerHTML = `<div class="card__body">${rich(data.intro)}</div>`;
    bodyHost.appendChild(intro);

    // sections
    let navCount = 0;
    data.sections.forEach((s, idx)=>{
      const renderer = renderers[s.type];
      if(!renderer) return;
      const node = renderer(s);
      const anchorId = `${modKey}-sec-${idx}`;
      node.id = anchorId;
      bodyHost.appendChild(node);

      // monta sub-nav apenas para subheaders (partes) — se não houver, usa títulos de concept/list relevantes como atalho
      if(s.type === 'subheader'){
        const btn = el('button','modnav__btn', esc(s.title));
        btn.type = 'button';
        btn.addEventListener('click', ()=>{
          document.getElementById(anchorId).scrollIntoView({behavior:'smooth', block:'start'});
        });
        navHost.appendChild(btn);
        navCount++;
      }
    });

    // se não há subheaders (módulo sem "partes"), cria nav rápido com títulos principais (até 4)
    if(navCount === 0){
      const introBtn = el('button','modnav__btn is-active','Visão geral');
      introBtn.type='button';
      introBtn.addEventListener('click', ()=> intro.scrollIntoView({behavior:'smooth', block:'start'}));
      navHost.appendChild(introBtn);

      const picks = data.sections
        .map((s,i)=>({s,i}))
        .filter(o => ['concept','list','care','vitals','modes','tabs-compare'].includes(o.s.type))
        .slice(0,5);
      picks.forEach(({s,i})=>{
        const label = s.title.length > 18 ? s.title.slice(0,17)+'…' : s.title;
        const btn = el('button','modnav__btn', esc(label));
        btn.type = 'button';
        btn.addEventListener('click', ()=>{
          navHost.querySelectorAll('.modnav__btn').forEach(b=>b.classList.remove('is-active'));
          btn.classList.add('is-active');
          document.getElementById(`${modKey}-sec-${i}`).scrollIntoView({behavior:'smooth', block:'start'});
        });
        navHost.appendChild(btn);
      });
    } else {
      // ativa primeiro botão por padrão
      const first = navHost.querySelector('.modnav__btn');
      if(first) first.classList.add('is-active');
      navHost.querySelectorAll('.modnav__btn').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          navHost.querySelectorAll('.modnav__btn').forEach(b=>b.classList.remove('is-active'));
          btn.classList.add('is-active');
        });
      });
    }

    renderedModules.add(modKey);
  }

  /* ---------------------------------------------------------
     DRAWER (declarado antes de goTo, que depende de closeDrawer)
  --------------------------------------------------------- */
  const drawer = document.getElementById('drawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  function openDrawer(){ drawer.classList.add('is-open'); drawerBackdrop.classList.add('is-open'); }
  function closeDrawer(){ drawer.classList.remove('is-open'); drawerBackdrop.classList.remove('is-open'); }
  document.getElementById('menuBtn').addEventListener('click', openDrawer);
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);

  /* ---------------------------------------------------------
     PROGRESS TRACKING (visited modules → topbar progress)
  --------------------------------------------------------- */
  function getVisited(){
    try{ return JSON.parse(localStorage.getItem('ti_visited')||'[]'); }catch(e){ return []; }
  }
  function markVisited(modKey){
    if(!MOD_ORDER.includes(modKey)) return;
    const v = new Set(getVisited());
    v.add(modKey);
    localStorage.setItem('ti_visited', JSON.stringify([...v]));
    updateProgressBar();
  }
  function updateProgressBar(){
    const visited = getVisited();
    const pct = Math.round((visited.length / MOD_ORDER.length) * 100);
    document.getElementById('progressFill').style.width = pct + '%';
  }

  /* ---------------------------------------------------------
     NAVEGAÇÃO ENTRE VIEWS
  --------------------------------------------------------- */
  let currentView = 'inicio';

  function goTo(viewKey, opts){
    opts = opts || {};
    if(!document.querySelector(`[data-view="${viewKey}"]`)) return;
    if(MOD_ORDER.includes(viewKey)) renderModule(viewKey);

    document.querySelectorAll('.view').forEach(v=>v.classList.remove('is-active'));
    document.querySelector(`[data-view="${viewKey}"]`).classList.add('is-active');

    document.querySelectorAll('.tabbar__btn').forEach(b=>{
      b.classList.toggle('is-active', b.dataset.tab === viewKey);
    });
    document.querySelectorAll('.drawer__list a[data-mod]').forEach(a=>{
      a.classList.toggle('is-active', a.dataset.mod === viewKey);
    });

    currentView = viewKey;
    localStorage.setItem('ti_last_view', viewKey);

    if(!opts.skipScroll){
      document.getElementById('main').scrollIntoView({behavior:'auto'});
      window.scrollTo(0,0);
    }
    closeDrawer();
    markVisited(viewKey);
    if(!opts.skipHash) history.replaceState(null,'',`#${viewKey}`);
  }

  document.body.addEventListener('click', (e)=>{
    const trigger = e.target.closest('[data-goto]');
    if(trigger){
      e.preventDefault();
      goTo(trigger.dataset.goto);
    }
  });

  /* ---------------------------------------------------------
     HERO WAVEFORM ANIMADO (decorativo, leve)
  --------------------------------------------------------- */
  function animateWave(){
    const path = document.getElementById('heroWavePath');
    if(!path) return;
    let t = 0;
    function frame(){
      t += 0.018;
      let d = 'M0,45 ';
      for(let x=0; x<=400; x+=8){
        const y = 45
          + Math.sin(x*0.045 + t*2) * 7
          + Math.sin(x*0.018 + t) * 4;
        d += `L${x},${y.toFixed(1)} `;
      }
      path.setAttribute('d', d);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    animateWave();
  }

  /* ---------------------------------------------------------
     HERO STATS (contagem dinâmica)
  --------------------------------------------------------- */
  function fillStats(){
    let total = 0;
    MOD_ORDER.forEach(m=>{
      const n = countTopics(m);
      total += n;
      const tag = document.querySelector(`[data-count-for="${m}"]`);
      if(tag) tag.textContent = `${n} tópicos`;
    });
    document.getElementById('statCards').textContent = total;
    document.getElementById('statQuiz').textContent = QUIZ_DATA.length;
  }

  /* ===========================================================
     QUIZ ENGINE
  =========================================================== */
  const quizModal = document.getElementById('quizModal');
  const quizBody = document.getElementById('quizBody');
  const quizFoot = document.getElementById('quizFoot');
  const quizPrev = document.getElementById('quizPrev');
  const quizNext = document.getElementById('quizNext');
  const quizCounter = document.getElementById('quizCounter');
  const quizModuleLabel = document.getElementById('quizModuleLabel');
  const quizProgressFill = document.getElementById('quizProgressFill');

  let quizQueue = [];
  let quizIndex = 0;
  let quizAnswered = []; // bool per question (answered correctly or flipped)
  let quizScore = 0;

  function shuffle(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }

  function startQuiz(modKey){
    const pool = modKey ? QUIZ_DATA.filter(q=>q.mod===modKey) : QUIZ_DATA;
    quizQueue = shuffle(pool);
    quizIndex = 0;
    quizScore = 0;
    quizAnswered = new Array(quizQueue.length).fill(false);
    quizModuleLabel.textContent = modKey ? `Revisão · ${STUDY_DATA[modKey].short}` : 'Revisão geral · todos os módulos';
    openQuiz();
    renderQuizQuestion();
  }

  function openQuiz(){
    quizModal.classList.add('is-open');
    quizModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeQuiz(){
    quizModal.classList.remove('is-open');
    quizModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  document.getElementById('quizClose').addEventListener('click', closeQuiz);
  document.getElementById('quizBackdrop').addEventListener('click', closeQuiz);

  document.getElementById('openQuizBtn').addEventListener('click', ()=>{
    const modKey = MOD_ORDER.includes(currentView) ? currentView : null;
    startQuiz(modKey);
  });
  document.getElementById('drawerQuizLink').addEventListener('click', (e)=>{
    e.preventDefault();
    closeDrawer();
    startQuiz(null);
  });
  document.getElementById('heroStartBtn').addEventListener('click', ()=>{
    const last = localStorage.getItem('ti_last_view');
    if(last && MOD_ORDER.includes(last)){
      goTo(last);
    } else {
      goTo('bia');
    }
  });

  function renderQuizQuestion(){
    quizBody.innerHTML = '';

    if(quizIndex >= quizQueue.length){
      quizCounter.textContent = `${quizQueue.length}/${quizQueue.length}`;
      quizProgressFill.style.width = `100%`;
      renderQuizDone();
      return;
    }

    quizCounter.textContent = `${quizIndex+1}/${quizQueue.length}`;
    quizProgressFill.style.width = `${Math.round(((quizIndex)/quizQueue.length)*100)}%`;

    const q = quizQueue[quizIndex];
    if(q.type === 'flip'){
      quizBody.appendChild(buildFlipCard(q));
    } else {
      quizBody.appendChild(buildMCQuestion(q));
    }

    quizFoot.style.display = 'flex';
    quizPrev.disabled = quizIndex === 0;
    quizNext.textContent = (quizIndex === quizQueue.length-1) ? 'Concluir' : 'Próxima';
  }

  function buildFlipCard(q){
    const wrap = el('div','qcard');
    const inner = el('div','qcard__inner');
    inner.innerHTML = `
      <div class="qcard__face qcard__face--front">
        <span class="qcard__tag">${esc(STUDY_DATA[q.mod].short)}</span>
        <div class="qcard__q">${esc(q.q)}</div>
        <span class="qcard__hint">toque para ver a resposta</span>
      </div>
      <div class="qcard__face qcard__face--back">
        <span class="qcard__tag" style="color:${STUDY_DATA[q.mod].accent}">Resposta</span>
        <div class="qcard__a">${esc(q.a)}</div>
      </div>`;
    inner.addEventListener('click', ()=>{
      inner.classList.toggle('is-flipped');
      if(!quizAnswered[quizIndex]){
        quizAnswered[quizIndex] = true;
        quizScore++;
      }
    });
    wrap.appendChild(inner);
    return wrap;
  }

  function buildMCQuestion(q){
    const wrap = el('div','qmc');
    wrap.innerHTML = `<div class="qmc__q">${esc(q.q)}</div>`;
    const opts = el('div','qmc__options');
    const letters = ['A','B','C','D'];
    const feedback = el('div','qmc__feedback');

    q.options.forEach((optText, i)=>{
      const btn = el('button','qmc__opt');
      btn.type = 'button';
      btn.innerHTML = `<span class="qmc__opt-letter">${letters[i]}</span><span>${esc(optText)}</span>`;
      btn.addEventListener('click', ()=>{
        if(opts.dataset.locked) return;
        opts.dataset.locked = '1';
        const correct = i === q.correct;
        btn.classList.add(correct ? 'is-correct' : 'is-wrong');
        if(!correct){
          opts.children[q.correct].classList.add('is-correct');
        }
        [...opts.children].forEach(b=>{ if(b!==btn) b.disabled = true; });
        btn.disabled = true;

        feedback.classList.add('is-shown', correct ? 'is-right' : 'is-wrong');
        feedback.textContent = correct ? '✓ Correto!' : `✗ Resposta certa: ${q.options[q.correct]}`;

        if(!quizAnswered[quizIndex]){
          quizAnswered[quizIndex] = true;
          if(correct) quizScore++;
        }
      });
      opts.appendChild(btn);
    });

    wrap.appendChild(opts);
    wrap.appendChild(feedback);
    return wrap;
  }

  function renderQuizDone(){
    quizFoot.style.display = 'none';
    const pct = quizQueue.length ? Math.round((quizScore/quizQueue.length)*100) : 0;
    const done = el('div','qdone');
    done.style.setProperty('--pct', pct);
    done.innerHTML = `
      <div class="qdone__ring" style="--pct:${pct}">
        <div class="qdone__ring-inner"><strong>${pct}%</strong><span>acerto</span></div>
      </div>
      <h3>Revisão concluída</h3>
      <p>Você passou por ${quizQueue.length} questões. Repita quando quiser — a ordem embaralha a cada rodada.</p>
      <button class="hero__cta" id="quizRestart" style="background:var(--purple); color:#fff;">Revisar novamente</button>
    `;
    quizBody.innerHTML = '';
    quizBody.appendChild(done);
    document.getElementById('quizRestart').addEventListener('click', ()=>{
      const modKey = quizQueue.length && quizQueue.every(q=>q.mod===quizQueue[0].mod) ? quizQueue[0].mod : null;
      startQuiz(modKey);
    });
    showToast(`Revisão concluída — ${pct}% de acerto`);
  }

  quizNext.addEventListener('click', ()=>{
    quizIndex++;
    renderQuizQuestion();
  });
  quizPrev.addEventListener('click', ()=>{
    if(quizIndex>0){ quizIndex--; renderQuizQuestion(); }
  });

  // swipe simples para navegar entre perguntas no mobile
  (function enableSwipe(){
    let startX = 0, startY = 0, tracking = false;
    quizBody.addEventListener('touchstart', (e)=>{
      startX = e.touches[0].clientX; startY = e.touches[0].clientY; tracking = true;
    }, {passive:true});
    quizBody.addEventListener('touchend', (e)=>{
      if(!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if(Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)*1.5){
        if(dx < 0 && quizIndex < quizQueue.length){ quizIndex++; renderQuizQuestion(); }
        else if(dx > 0 && quizIndex > 0){ quizIndex--; renderQuizQuestion(); }
      }
    }, {passive:true});
  })();

  /* ---------------------------------------------------------
     TOAST
  --------------------------------------------------------- */
  let toastTimer = null;
  function showToast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> t.classList.remove('is-shown'), 2600);
  }

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  function init(){
    fillStats();
    updateProgressBar();

    const hash = location.hash.replace('#','');
    const startView = (hash && (hash==='inicio' || MOD_ORDER.includes(hash))) ? hash : 'inicio';
    goTo(startView, {skipScroll:true, skipHash:true});

    // tile clicks on início (data-goto já cobre via delegation)
  }

  document.addEventListener('DOMContentLoaded', init);

})();
