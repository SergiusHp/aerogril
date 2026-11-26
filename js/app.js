(() => {
  "use strict";
  const C = window.CATEGORIES || [], M = window.MENUS || [], IMG = window.IMAGES || {};
  const catIdx = Object.fromEntries(C.map((c, i) => [c.id, i]));
  const R = (window.RECIPES || []).slice().sort((a, b) => catIdx[a.cat] - catIdx[b.cat]); // стабільне сортування за категорією
  const byId = Object.fromEntries(R.map(r => [r.id, r]));
  const catName = Object.fromEntries(C.map(c => [c.id, c.name]));
  const app = document.getElementById("app");

  /* ── Збереження ── */
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  const settings = () => store.get("settings", { speed: 0, basket: "l" });
  const exps = id => store.get("exp:" + id, []);

  /* ── Утиліти ── */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const adj = t => Math.max(1, Math.round(t * (1 + settings().speed / 100)));
  const range = r => { const a = adj(r.time[0]), b = adj(r.time[1]); return a === b ? `${a}` : `${a}–${b}`; };
  const hasFlip = r => r.flip && !/^—|^Не /.test(r.flip);
  const norm = s => s.toLowerCase().replace(/[ʼ'’]/g, "").replace(/ё/g, "е");
  const FR = { 0.25: "¼", 0.5: "½", 0.75: "¾" };
  function qty(q, unit, k) {
    if (!q) return "за смаком";
    let v = q * k;
    if (/^(г|мл)$/.test(unit)) v = v >= 100 ? Math.round(v / 10) * 10 : Math.round(v);
    else if (unit === "кг") v = Math.round(v * 100) / 100;
    else v = Math.round(v * 4) / 4;
    const whole = Math.floor(v), frac = +(v - whole).toFixed(2);
    const txt = FR[frac] ? (whole ? whole + FR[frac] : FR[frac]) : String(v).replace(".", ",");
    return `${txt} ${unit}`.trim();
  }
  const img = (id, cls = "") => {
    const i = IMG[id];
    return i ? `<img class="${cls}" src="${esc(i.src)}" alt="${esc(byId[id]?.title || "")}" loading="lazy" decoding="async" onerror="this.remove()">` : "";
  };
  const lastPerfect = id => exps(id).find(e => e.result === "perfect");
  const searchIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`;

  /* ── Головна ── */
  const ui = { q: "", cat: "all", tmax: 0 };

  function viewHome() {
    document.title = "Аерогриль — рецепти з правильним часом і температурою";
    app.innerHTML = `
      <section class="hero">
        <h1>Час і температура, <em>як у реальних людей</em></h1>
        <p>Рецепти для аерогрилю з часом і температурою, на яких сходиться більшість відгуків власників, а не із завищеними цифрами з інструкцій. Стегна за 25 хвилин, а не за 45.</p>
        <label class="search"><span class="sr">Пошук рецептів</span>${searchIcon}
          <input id="q" type="search" placeholder="Стегна, картопля, лосось, сир…" autocomplete="off" value="${esc(ui.q)}"></label>
      </section>
      <div class="chips" role="group" aria-label="Категорії">
        <button class="chip" data-cat="all" aria-pressed="${ui.cat === "all"}">Усі</button>
        ${C.map(c => `<button class="chip" data-cat="${c.id}" aria-pressed="${ui.cat === c.id}">${esc(c.name)}</button>`).join("")}
      </div>
      <div class="filters" role="group" aria-label="Час приготування">
        <span class="label">Час:</span>
        ${[[0, "Будь-який"], [12, "до 12 хв"], [20, "до 20 хв"], [30, "до 30 хв"]].map(([v, l]) =>
          `<button class="chip small" data-tmax="${v}" aria-pressed="${ui.tmax === v}">${l}</button>`).join("")}
      </div>
      <p class="count" id="count" aria-live="polite"></p>
      <div class="grid" id="grid"></div>`;
    const q = app.querySelector("#q");
    q.addEventListener("input", () => { ui.q = q.value; renderGrid(); });
    app.querySelectorAll("[data-cat]").forEach(b => b.onclick = () => { ui.cat = b.dataset.cat; syncPressed("[data-cat]", "cat"); renderGrid(); });
    app.querySelectorAll("[data-tmax]").forEach(b => b.onclick = () => { ui.tmax = +b.dataset.tmax; syncPressed("[data-tmax]", "tmax"); renderGrid(); });
    renderGrid();
  }
  function syncPressed(sel, key) {
    app.querySelectorAll(sel).forEach(b => b.setAttribute("aria-pressed", String(b.dataset[key] == ui[key])));
  }
  function filtered() {
    const words = norm(ui.q).split(/\s+/).filter(Boolean);
    return R.filter(r => {
      if (ui.cat !== "all" && r.cat !== ui.cat) return false;
      if (ui.tmax && adj(r.time[1]) > ui.tmax) return false;
      if (!words.length) return true;
      const hay = norm([r.title, catName[r.cat], ...r.tags, ...r.ing.map(i => i[0])].join(" "));
      return words.every(w => hay.includes(w.length > 4 ? w.slice(0, -1) : w));
    });
  }
  function card(r) {
    const lp = lastPerfect(r.id);
    return `<a class="card" href="#/r/${r.id}">
      <div class="card-img">${img(r.id)}
        <div class="badges"><span class="badge hot">${r.temp}<small>°C</small></span><span class="badge">${range(r)}<small> хв</small></span></div>
      </div>
      <div class="card-body">
        <span class="card-cat">${esc(catName[r.cat])}</span>
        <h3>${esc(r.title)}</h3>
        <span class="card-meta">${lp ? `✓ У вас ідеально: ${lp.time} хв / ${lp.temp} °C` : esc(r.tags.slice(0, 3).join(" · "))}</span>
      </div></a>`;
  }
  function renderGrid() {
    const list = filtered();
    app.querySelector("#count").textContent = list.length ? `${list.length} ${plural(list.length, "рецепт", "рецепти", "рецептів")}` : "";
    app.querySelector("#grid").innerHTML = list.length ? list.map(card).join("")
      : `<p class="empty">Нічого не знайшли. Спробуйте інше слово: «курка», «картопля», «сир».</p>`;
  }
  const plural = (n, a, b, c) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? b : c; };

  /* ── Рецепт ── */
  function viewRecipe(id) {
    const r = byId[id];
    if (!r) return viewHome();
    document.title = `${r.title} — ${r.temp} °C, ${range(r)} хв | Аерогриль`;
    let serv = r.serv;
    const st = settings(), i = IMG[id], lp = lastPerfect(id);
    const smallBasket = st.basket === "s";
    app.innerHTML = `
      <a class="back" href="#/">← Усі рецепти</a>
      <section class="r-hero">
        <div>
          <div class="r-photo">${img(id)}</div>
          ${i ? `<p class="credit">Фото: <a href="${esc(i.page)}" target="_blank" rel="noopener">${esc(i.by)}</a>, ${esc(i.lic)}, Wikimedia Commons</p>` : ""}
        </div>
        <div class="r-head">
          <span class="card-cat">${esc(catName[r.cat])}</span>
          <h1>${esc(r.title)}</h1>
          <div class="r-tags">${r.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          <div class="stats">
            <div class="stat main"><span class="k">Температура</span><span class="v">${r.temp}<small> °C</small></span></div>
            <div class="stat main"><span class="k">Час</span><span class="v">${range(r)}<small> хв</small></span>${lp ? `<span class="s">у вас: ${lp.time} хв</span>` : ""}</div>
            <div class="stat"><span class="k">Розігрів</span><span class="v">${r.preheat ? "3<small> хв</small>" : "—"}</span><span class="s">${r.preheat ? "потрібен" : "не потрібен"}</span></div>
            <div class="stat"><span class="k">Кошик</span><span class="s">${esc(r.load)}${smallBasket ? "<br><b>Малий кошик: половина, партіями</b>" : ""}</span></div>
          </div>
          <div class="cta">
            <button class="btn accent" id="start">▶ Таймер на ${adj(r.time[0])} хв</button>
            <a class="btn ghost" href="#exp">Записати свій результат</a>
          </div>
        </div>
      </section>

      <div class="r-body">
        <div class="stack">
          <section class="panel">
            <div class="panel-head"><h2>Інгредієнти</h2>
              <div class="stepper" aria-label="Кількість порцій"><button id="sm" aria-label="Менше порцій">−</button><span id="sv"></span><button id="sp" aria-label="Більше порцій">+</button></div>
            </div>
            <ul class="ing" id="ing"></ul>
          </section>
          <section class="note done"><h3>Як зрозуміти, що готово</h3><p>${esc(r.done)}</p></section>
        </div>
        <div class="stack">
          <section class="note why"><h3>Чому саме так</h3>
            ${r.appNote ? `<p class="compare"><s>${esc(r.appNote)}</s><span>→ насправді: ${r.temp} °C, ${range(r)} хв</span></p>` : ""}
            <p>${esc(r.why)}</p>
          </section>
          <section class="panel">
            <h2>Приготування</h2>
            ${hasFlip(r) ? `<p class="tag" style="display:inline-block;margin:0 0 16px">↻ ${esc(r.flip)}</p>` : ""}
            <ol class="steps">${r.steps.map(s => `<li><span>${esc(s)}</span></li>`).join("")}</ol>
          </section>
          <section class="panel exp" id="exp">
            <h2>Мій досвід</h2>
            <form class="exp-form" id="expf">
              <label class="field">Скільки хвилин<input name="time" type="number" inputmode="numeric" min="1" max="120" required value="${lp ? lp.time : adj(r.time[0])}"></label>
              <label class="field">Температура, °C<input name="temp" type="number" inputmode="numeric" min="60" max="240" step="5" required value="${lp ? lp.temp : r.temp}"></label>
              <div class="field full">Результат
                <div class="seg">
                  ${[["under", "Недодержав"], ["perfect", "Ідеально"], ["over", "Пересушив"]].map(([v, l], n) =>
                    `<label><input type="radio" name="result" value="${v}" ${n === 1 ? "checked" : ""}><span>${l}</span></label>`).join("")}
                </div></div>
              <label class="field full">Нотатка<textarea name="note" placeholder="Напр.: 8 стегон, повний кошик"></textarea></label>
              <div class="field full"><button class="btn sm" type="submit">Зберегти</button></div>
            </form>
            <ul class="history" id="hist"></ul>
          </section>
        </div>
      </div>`;

    const renderIng = () => {
      app.querySelector("#sv").textContent = `${serv} ${plural(serv, "порція", "порції", "порцій")}`;
      app.querySelector("#ing").innerHTML = r.ing.map(([n, q, u], k) =>
        `<li><label><input type="checkbox" id="i${k}"><span>${esc(n)}</span><span class="q">${esc(qty(q, u, serv / r.serv))}</span></label></li>`).join("");
    };
    app.querySelector("#sm").onclick = () => { if (serv > 1) { serv--; renderIng(); } };
    app.querySelector("#sp").onclick = () => { if (serv < 20) { serv++; renderIng(); } };
    renderIng();

    app.querySelector("#start").onclick = () => Timer.start(r);

    const renderHist = () => {
      const h = exps(id), L = { under: "недодержав", perfect: "ідеально", over: "пересушив" };
      app.querySelector("#hist").innerHTML = h.map((e, k) =>
        `<li><b>${e.time} хв · ${e.temp} °C</b><span>${L[e.result]}</span><span style="color:var(--ink-2)">${esc(e.date)}${e.note ? " — " + esc(e.note) : ""}</span><button class="del" data-k="${k}">видалити</button></li>`).join("");
      app.querySelectorAll(".del").forEach(b => b.onclick = () => { const a = exps(id); a.splice(+b.dataset.k, 1); store.set("exp:" + id, a); renderHist(); });
    };
    app.querySelector("#expf").onsubmit = e => {
      e.preventDefault();
      const f = new FormData(e.target);
      const a = exps(id);
      a.unshift({ time: +f.get("time"), temp: +f.get("temp"), result: f.get("result"), note: String(f.get("note") || "").slice(0, 200), date: new Date().toLocaleDateString("uk-UA") });
      store.set("exp:" + id, a.slice(0, 20));
      e.target.note.value = "";
      renderHist();
    };
    renderHist();
    setSchema(r);
  }

  function setSchema(r) {
    document.getElementById("ld")?.remove();
    const s = document.createElement("script");
    s.type = "application/ld+json"; s.id = "ld";
    s.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Recipe", name: r.title, image: IMG[r.id]?.src,
      recipeCategory: catName[r.cat], recipeYield: `${r.serv} порції`, cookTime: `PT${r.time[1]}M`, keywords: r.tags.join(", "),
      recipeIngredient: r.ing.map(([n, q, u]) => `${n} — ${qty(q, u, 1)}`),
      recipeInstructions: r.steps.map(t => ({ "@type": "HowToStep", text: t })),
      tool: "Аерогриль", description: `${r.temp} °C, ${r.time[0]}–${r.time[1]} хв. ${r.why}`
    });
    document.head.appendChild(s);
  }

  /* ── Шпаргалка ── */
  function viewCheat() {
    document.title = "Шпаргалка: час і температура для аерогрилю";
    app.innerHTML = `
      <section class="page-head"><h1>Шпаргалка</h1>
        <p>Усі продукти на одному екрані. Час уже враховує налаштування вашого аерогрилю${settings().speed ? ` (${settings().speed > 0 ? "+" : ""}${settings().speed} %)` : ""}.</p>
        <label class="search"><span class="sr">Фільтр</span>${searchIcon}<input id="cq" type="search" placeholder="Знайти продукт…"></label>
      </section>
      <table class="cheat"><thead><tr><th>Продукт</th><th>°C</th><th>Хв</th><th class="flip">Струсити / перевернути</th></tr></thead><tbody id="ct"></tbody></table>`;
    const render = q => {
      const w = norm(q || "");
      app.querySelector("#ct").innerHTML = C.map(c => {
        const rows = R.filter(r => r.cat === c.id && (!w || norm(r.title + " " + r.tags.join(" ")).includes(w)));
        return rows.length ? `<tr class="grp"><td colspan="4">${esc(c.name)}</td></tr>` + rows.map(r =>
          `<tr><td><a href="#/r/${r.id}">${esc(r.title)}</a></td><td class="num">${r.temp}</td><td class="num">${range(r)}</td><td class="flip">${esc(r.flip)}</td></tr>`).join("") : "";
      }).join("") || `<tr><td colspan="4" class="empty">Нічого не знайшли</td></tr>`;
    };
    app.querySelector("#cq").addEventListener("input", e => render(e.target.value));
    render();
  }

  /* ── Меню ── */
  function viewMenus() {
    document.title = "Готові меню для аерогрилю";
    app.innerHTML = `
      <section class="page-head"><h1>Готові меню</h1><p>Набори страв і порядок приготування, щоб усе подати гарячим. Кошик один, тож страви йдуть по черзі.</p></section>
      <div class="menus">${M.map(m => {
        const items = m.items.map(i => byId[i]).filter(Boolean);
        const total = items.reduce((s, r) => s + adj(r.time[1]), 0);
        return `<article class="menu">
          <div class="menu-strip">${items.slice(0, 4).map(r => img(r.id)).join("")}</div>
          <div class="menu-body"><h2>${esc(m.title)}</h2><p>${esc(m.note)}</p>
            <ol class="menu-list">${items.map(r => `<li><a href="#/r/${r.id}"><span>${esc(r.title)}</span><small>${r.temp}° · ${range(r)} хв</small></a></li>`).join("")}</ol>
            <p><b>≈ ${total} хв</b> чистого часу в кошику</p></div></article>`;
      }).join("")}</div>`;
  }

  /* ── Налаштування ── */
  function viewSettings() {
    document.title = "Мій аерогриль — налаштування";
    const s = settings();
    const seg = (name, opts, cur) => `<div class="seg">${opts.map(([v, l]) => `<label><input type="radio" name="${name}" value="${v}" ${String(v) === String(cur) ? "checked" : ""}><span>${l}</span></label>`).join("")}</div>`;
    app.innerHTML = `
      <section class="page-head"><h1>Мій аерогриль</h1><p>Аерогрилі різних брендів гріють трохи по-різному. Підлаштуйте застосунок один раз, і весь час у рецептах перерахується.</p></section>
      <div class="settings">
        <section class="panel"><h2>Як швидко готує ваш аерогриль?</h2>
          <p>Якщо страви зазвичай готові раніше, ніж у рецептах, оберіть «Швидше». Якщо доводиться додавати хвилини, оберіть «Повільніше».</p>
          ${seg("speed", [[-10, "Швидше (−10 %)"], [0, "Як зазвичай"], [10, "Повільніше (+10 %)"]], s.speed)}
        </section>
        <section class="panel"><h2>Розмір кошика</h2>
          <p>Від цього залежить, скільки продуктів влазить одним шаром. Повний кошик у кілька шарів — це +20–30 % часу і частіше струшувати.</p>
          ${seg("basket", [["s", "Малий, до 4 л"], ["m", "Середній, 4–6 л"], ["l", "Великий, 6+ л"]], s.basket)}
        </section>
        <section class="note why"><h3>Звідки цифри</h3>
          <p>Для кожної страви ми взяли діапазон часу й температури, на якому сходиться більшість відгуків власників аерогрилів (спільноти Reddit r/airfryer і r/AirFryer_Recipes, українські огляди, поради виробників щодо фрі). Еталонний пристрій для перевірки — кошиковий аерогриль 7,5 л на 1700 Вт. Починайте з нижньої межі, а свій результат записуйте в «Мій досвід».</p>
        </section>
      </div>`;
    app.querySelectorAll("input[type=radio]").forEach(i => i.onchange = () => {
      const n = settings(); n[i.name] = i.name === "speed" ? +i.value : i.value; store.set("settings", n);
    });
  }

  /* ── Таймер ── */
  const Timer = (() => {
    const el = document.getElementById("timer");
    let r, total, end, left, paused = false, tick, halfDone, lock, ac;
    const fmt = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
    function beep(n = 3) {
      try {
        ac = ac || new (window.AudioContext || window.webkitAudioContext)();
        for (let k = 0; k < n; k++) {
          const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + k * 0.35;
          o.frequency.value = 880; o.connect(g); g.connect(ac.destination);
          g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.4, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
          o.start(t); o.stop(t + 0.3);
        }
      } catch {}
      navigator.vibrate?.([200, 100, 200]);
    }
    async function wake(on) {
      try { if (on && "wakeLock" in navigator) lock = await navigator.wakeLock.request("screen"); else { await lock?.release(); lock = null; } } catch {}
    }
    function draw(state) {
      const remain = paused ? left : end - Date.now();
      const pct = Math.min(100, 100 - (remain / total) * 100);
      el.className = "timer" + (state === "half" ? " alert" : state === "done" ? " finished" : "");
      const sub = state === "half" ? `⏸ Час: ${esc(r.flip.toLowerCase())}` : state === "done" ? "Перевірте готовність: " + esc(r.done) : hasFlip(r) && !halfDone ? `На ${fmt(total / 2)} нагадаю: ${esc(r.flip.toLowerCase())}` : `${r.temp} °C`;
      el.innerHTML = `
        <div class="timer-top"><span class="timer-name">${esc(r.title)} · ${r.temp} °C</span></div>
        <div class="timer-clock" role="timer" aria-live="off">${state === "done" ? "Готово?" : fmt(remain)}</div>
        <div class="timer-sub" aria-live="polite">${sub}</div>
        <div class="timer-bar"><i style="width:${pct}%"></i></div>
        <div class="timer-actions">
          ${state === "half" ? `<button class="primary" data-a="ack">Зробив, далі</button>` :
            state === "done" ? `<button data-a="plus2">+2 хв</button><button class="primary" data-a="stop">Готово</button>` :
            `<button data-a="pause">${paused ? "▶ Далі" : "⏸ Пауза"}</button><button data-a="plus1">+1 хв</button><button data-a="stop">Стоп</button>`}
        </div>`;
    }
    function loop() {
      if (paused) return;
      const remain = end - Date.now();
      if (hasFlip(r) && !halfDone && remain <= total / 2) { halfDone = true; paused = true; left = remain; beep(2); draw("half"); return; }
      if (remain <= 0) { clearInterval(tick); beep(4); draw("done"); return; }
      draw();
    }
    el.addEventListener("click", e => {
      const a = e.target.closest("button")?.dataset.a; if (!a) return;
      if (a === "pause") { if (paused) { end = Date.now() + left; paused = false; } else { left = end - Date.now(); paused = true; } draw(); }
      if (a === "ack") { paused = false; end = Date.now() + left; draw(); }
      if (a === "plus1") { if (paused) left += 60000; else end += 60000; total += 60000; draw(); }
      if (a === "plus2") { end = Date.now() + 120000; total = 120000; halfDone = true; tick = setInterval(loop, 250); draw(); }
      if (a === "stop") { clearInterval(tick); el.hidden = true; wake(false); }
    });
    return {
      start(rec) {
        clearInterval(tick); r = rec; total = adj(rec.time[0]) * 60000; end = Date.now() + total;
        paused = false; halfDone = false; el.hidden = false;
        try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); ac.resume(); } catch {}
        wake(true); draw(); tick = setInterval(loop, 250);
      }
    };
  })();

  /* ── Роутинг ── */
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [page, id] = h.split("/");
    const nav = page === "r" || !page ? "home" : page;
    document.querySelectorAll("[data-nav]").forEach(a => a.toggleAttribute("aria-current", false));
    document.querySelector(`[data-nav="${nav}"]`)?.setAttribute("aria-current", "page");
    if (page !== "r") document.getElementById("ld")?.remove();
    if (page === "r") viewRecipe(id);
    else if (page === "cheat") viewCheat();
    else if (page === "menus") viewMenus();
    else if (page === "settings") viewSettings();
    else viewHome();
    if (!(page === "" && ui.q)) window.scrollTo(0, 0);
  }
  // посилання «#exp» усередині рецепта — прокрутка без зміни маршруту
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href="#exp"]');
    if (a) { e.preventDefault(); document.getElementById("exp")?.scrollIntoView({ behavior: "smooth" }); }
  });
  window.addEventListener("hashchange", route);
  route();
})();
