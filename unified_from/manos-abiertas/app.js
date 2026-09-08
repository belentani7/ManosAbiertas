/* ============================================================
   MANOS ABIERTAS — Lógica de la aplicación
   SPA ligera: navegación, i18n, cursos, CV, recursos, derechos,
   acompañante, modo oscuro, XP y persistencia (localStorage).
   ============================================================ */
(() => {
  "use strict";

  const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  const state = {
    lang: LS.get("ma.lang", "es"),
    theme: LS.get("ma.theme", "light"),
    done: LS.get("ma.done", {}),           // { "chatgpt:0": true }
    template: LS.get("ma.template", "classic"),
    xp: LS.get("ma.xp", 0),
  };

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const t = (key) => key.split(".").reduce((o, k) => (o ? o[k] : undefined), I18N[state.lang]) ?? key;

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* ---------- Idioma ---------- */
  function applyLang() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = I18N[state.lang].rtl ? "rtl" : "ltr";
    $$("[data-i18n]").forEach(el => {
      const k = el.dataset.i18n;
      if (k === "hero.titleA") return; // compuesto
      const v = t(k);
      if (v !== undefined) el.textContent = v;
    });
    $$("[data-i18n-ph]").forEach(el => {
      const v = t(el.dataset.i18nPh);
      if (v !== undefined) el.placeholder = v;
    });
    // Título compuesto
    const a = t("hero.titleA"), b = t("hero.titleB");
    $("#seccion-inicio h1 .serif").textContent = a;
    $("#seccion-inicio h1 span:last-child").textContent = b;
    $("#langCurrent").textContent = `${I18N[state.lang].flag} ${I18N[state.lang].name}`;
    renderLangMenu();
    updateSectionCounters();
  }

  function renderLangMenu() {
    const menu = $("#langMenu");
    menu.innerHTML = "";
    const search = document.createElement("input");
    search.type = "search";
    search.placeholder = "🔍 Buscar idioma…";
    search.setAttribute("aria-label", "Buscar idioma");
    const list = document.createElement("div");
    menu.append(search, list);
    function draw(filter = "") {
      list.innerHTML = "";
      LANGUAGES.filter(l => l.name.toLowerCase().includes(filter.toLowerCase()) || l.code.includes(filter.toLowerCase()))
        .forEach(l => {
          const b = document.createElement("button");
          b.className = "lang-opt" + (l.code === state.lang ? " active" : "");
          b.innerHTML = `<span>${l.flag}</span> ${l.name}<span class="l-code">${l.code}</span>`;
          b.onclick = () => { setLang(l.code); closeLang(); };
          list.appendChild(b);
        });
    }
    search.oninput = () => draw(search.value);
    draw();
  }

  function setLang(code) {
    if (!I18N[code]) return;
    state.lang = code;
    LS.set("ma.lang", code);
    applyLang();
    renderAll();
    toast(`${t("toast.langChanged")} ${I18N[code].flag} ${I18N[code].name}`);
  }

  function closeLang() { $("#langMenu").classList.remove("open"); $("#langBtn").setAttribute("aria-expanded", "false"); }

  /* ---------- Navegación ---------- */
  function navigate(section) {
    $$("[data-section]").forEach(sec => sec.classList.add("hidden"));
    const target = $(`[data-section="${section}"]`);
    if (target) target.classList.remove("hidden");
    $$("[data-nav]").forEach(b => {
      const targetId = b.getAttribute("data-nav");
      b.classList.toggle("active", targetId === section);
      if (targetId === section) {
        const isBtn = b.tagName === "BUTTON" && b.classList.contains("nav-link");
        if (!isBtn && b.closest("footer") && !b.closest("footer").querySelector(".nav-link")) { /* footer links */ }
      }
    });
    // Footer links también se resaltan
    $$("footer .footer-links a").forEach(a => a.classList.toggle("active", a.getAttribute("data-nav") === section));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- Cursos de IA ---------- */
  function renderCourses() {
    const grid = $("#courseGrid");
    grid.innerHTML = "";
    let totalDone = 0, totalLessons = 0;
    AI_COURSES.forEach((course, ci) => {
      const done = course.lessons.filter((_, li) => state.done[`${course.id}:${li}`]).length;
      totalDone += done; totalLessons += course.lessons.length;
      const card = document.createElement("div");
      card.className = "course-card";
      const pct = Math.round((done / course.lessons.length) * 100);
      card.innerHTML = `
        <div class="cc-head">
          <div class="cc-ico" style="background:${course.color}22">${course.ico}</div>
          <div>
            <h3>${course.name}</h3>
            <div class="cc-meta">${t("ai.free")} · ${course.lessons.length} ${t("ai.lessons")}</div>
          </div>
        </div>
        <div class="progress-track"><div style="width:${pct}%"></div></div>
        <div class="cc-lessons">${done}/${course.lessons.length} ✓</div>
        <div class="lesson-list">
          ${course.lessons.map((l, li) => `
            <button class="lesson-item${state.done[`${course.id}:${li}`] ? " done" : ""}" data-course="${ci}" data-lesson="${li}">
              <span class="lesson-check">${state.done[`${course.id}:${li}`] ? "✓" : "○"}</span>
              <span>${l.t}</span>
            </button>`).join("")}
        </div>
        <button class="btn btn-sm btn-secondary btn-block" data-toggle="${ci}">${card.dataset.open ? "—" : "📖"} ${t("ai.lessons")}</button>
      `;
      // Rebuild toggle button correctly
      card.querySelector("[data-toggle]").onclick = () => card.classList.toggle("open");
      card.querySelectorAll(".lesson-item").forEach(btn => {
        btn.onclick = () => toggleLesson(course, ci, +btn.dataset.lesson);
      });
      grid.appendChild(card);
    });
    $("#aiProgress").textContent = `${totalDone} / ${totalLessons}`;
  }

  function toggleLesson(course, ci, li) {
    const key = `${course.id}:${li}`;
    const wasDone = !!state.done[key];
    if (wasDone) {
      delete state.done[key];
      toast(t("toast.lessonReset"));
    } else {
      state.done[key] = true;
      state.xp += 15;
      toast(t("toast.lessonDone"));
      saveXP();
    }
    LS.set("ma.done", state.done);
    renderCourses();
  }

  /* ---------- Office ---------- */
  function renderOffice() {
    const grid = $("#officeGrid");
    grid.innerHTML = "";
    OFFICE_MODULES.forEach((mod, mi) => {
      const el = document.createElement("div");
      el.className = "office-mod";
      const doneCount = mod.lessons.filter((_, li) => state.done[`office:${mi}:${li}`]).length;
      el.innerHTML = `
        <button class="office-mod-head">
          <span class="om-ico">${mod.ico}</span>
          <h3>${mod.name}</h3>
          <span class="om-lessons">${doneCount}/${mod.lessons.length}</span>
        </button>
        <div class="office-mod-body">
          ${mod.lessons.map((l, li) => `
            <div class="office-lesson${state.done[`office:${mi}:${li}`] ? " done" : ""}" role="button" tabindex="0" data-mi="${mi}" data-li="${li}">
              <span class="ol-check">${state.done[`office:${mi}:${li}`] ? "✓" : "○"}</span>
              <span>${l}</span>
            </div>`).join("")}
        </div>`;
      el.querySelector(".office-mod-head").onclick = () => el.classList.toggle("open");
      el.querySelectorAll(".office-lesson").forEach(div => {
        const toggle = () => {
          const k = `office:${mi}:${div.dataset.li}`;
          if (state.done[k]) { delete state.done[k]; toast(t("toast.lessonReset")); }
          else { state.done[k] = true; state.xp += 15; toast(t("toast.lessonDone")); saveXP(); }
          LS.set("ma.done", state.done);
          renderOffice();
        };
        div.onclick = toggle;
        div.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } };
      });
      grid.appendChild(el);
    });
  }

  /* ---------- Recursos ---------- */
  let resFilter = "todos";
  function renderResources() {
    const q = ($("#resSearch").value || "").toLowerCase().trim();
    const cats = [...new Set(RESOURCES.map(r => r.cat))];
    // Filtros
    const frow = $("#resFilters");
    if (!frow.dataset.built) {
      frow.dataset.built = "1";
      const all = document.createElement("button");
      all.className = "filter-btn active";
      all.textContent = t("res.all");
      all.onclick = () => { resFilter = "todos"; refreshFilterBtns(); renderResources(); };
      frow.appendChild(all);
      cats.forEach(c => {
        const b = document.createElement("button");
        b.className = "filter-btn";
        b.dataset.cat = c;
        b.textContent = c.charAt(0).toUpperCase() + c.slice(1);
        b.onclick = () => { resFilter = c; refreshFilterBtns(); renderResources(); };
        frow.appendChild(b);
      });
    }
    const results = RESOURCES.filter(r =>
      (resFilter === "todos" || r.cat === resFilter) &&
      (!q || (r.title + " " + r.desc + " " + (r.tags || "")).toLowerCase().includes(q))
    );
    $("#resCount").textContent = `${results.length} ${t("res.results")}`;
    const grid = $("#resourceGrid");
    grid.innerHTML = results.length ? "" : `<p class="res-count" style="grid-column:1/-1;text-align:center">—</p>`;
    results.forEach(r => {
      const a = document.createElement("a");
      a.className = "resource-card";
      a.href = r.url; a.target = "_blank"; a.rel = "noopener noreferrer";
      a.innerHTML = `<span class="rc-cat">${r.cat}</span><h3>${r.title}</h3><p>${r.desc}</p><span class="rc-url">${r.url.replace("https://", "").replace("www.", "")}</span>`;
      grid.appendChild(a);
    });
  }
  function refreshFilterBtns() {
    $$("#resFilters .filter-btn").forEach(b => b.classList.toggle("active", b.dataset.cat === resFilter || (resFilter === "todos" && !b.dataset.cat)));
  }

  /* ---------- Derechos ---------- */
  function renderRights() {
    const acc = $("#rightsAccordion");
    acc.innerHTML = "";
    RIGHTS.forEach((r, i) => {
      const item = document.createElement("div");
      item.className = "accordion-item";
      item.innerHTML = `
        <button class="acc-head" aria-expanded="false">
          <span class="acc-num">${r.num}</span>
          <strong>${r.title}</strong>
          <span class="acc-tag">${r.tag}</span>
          <span class="acc-arrow">▾</span>
        </button>
        <div class="acc-body">
          <p>${r.body}</p>
          <p class="acc-src">${t("rights.updated")}: ${r.updated} · ${t("rights.source")} ${r.source}</p>
        </div>`;
      item.querySelector(".acc-head").onclick = () => {
        const open = item.classList.toggle("open");
        item.querySelector(".acc-head").setAttribute("aria-expanded", open);
      };
      acc.appendChild(item);
    });
    const el = $("#emergencyList");
    el.innerHTML = "";
    EMERGENCIES.forEach(e => {
      const li = document.createElement("li");
      li.innerHTML = `<div><b>${e.n}</b><br><span>${e.label}</span></div>`;
      el.appendChild(li);
    });
  }

  /* ---------- CV ---------- */
  const cvFields = () => ({
    name: $("#cvName").value.trim(), title: $("#cvTitle").value.trim(),
    phone: $("#cvPhone").value.trim(), email: $("#cvEmail").value.trim(),
    location: $("#cvLocation").value.trim(), summary: $("#cvSummary").value.trim(),
    exp: $("#cvExp").value, edu: $("#cvEdu").value,
    skills: $("#cvSkills").value, languages: $("#cvLanguages").value,
  });

  function renderTemplates() {
    const row = $("#templateRow");
    row.innerHTML = "";
    CV_TEMPLATES.forEach(tpl => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "template-opt" + (state.template === tpl.id ? " active" : "");
      b.innerHTML = `<b>${tpl.label}</b><span>${tpl.desc}</span>`;
      b.onclick = () => { state.template = tpl.id; LS.set("ma.template", tpl.id); renderTemplates(); updatePreview(); };
      row.appendChild(b);
    });
  }

  function updatePreview() {
    const d = cvFields();
    const sheet = $("#cvPreview");
    sheet.className = "cv-sheet " + (CV_TEMPLATES.find(x => x.id === state.template)?.cls || "template-classic");
    const empty = !d.name && !d.title && !d.summary && !d.exp;
    if (empty) {
      sheet.innerHTML = `<div class="cv-empty"><div><div style="font-size:2.6rem">📄</div>${t("cv.emptyTitle")}<br><span style="font-size:.9rem;color:#888">${t("cv.emptySub")}</span></div></div>`;
      return;
    }
    const expItems = d.exp.split("\n").map(l => l.trim()).filter(Boolean).map(l => {
      const [job, company, years] = l.split("·").map(x => x.trim());
      return `<div class="cv-exp-item"><b>${job || l}</b><span>${company || ""}${years ? " · " + years : ""}</span></div>`;
    }).join("");
    const eduItems = d.edu.split("\n").map(l => l.trim()).filter(Boolean).map(l => `<div class="cv-exp-item"><b>${l}</b></div>`).join("");
    const skillTags = d.skills.split(",").map(s => s.trim()).filter(Boolean).map(s => `<span class="cv-skill-tag">${s}</span>`).join(" ");
    const langRows = d.languages.split(",").map(l => l.trim()).filter(Boolean).map(l => {
      const [lang, level] = l.split(":").map(x => x.trim());
      return `<div class="cv-lang-row"><span>${lang}</span><span>${level || ""}</span></div>`;
    }).join("");
    sheet.innerHTML = `
      <h1>${d.name || "Tu nombre"}</h1>
      <div class="cv-title">${d.title || ""}</div>
      <div class="cv-contact">
        ${d.phone ? `<span>📞 ${d.phone}</span>` : ""}
        ${d.email ? `<span>✉️ ${d.email}</span>` : ""}
        ${d.location ? `<span>📍 ${d.location}</span>` : ""}
      </div>
      ${d.summary ? `<h2>Perfil</h2><p class="cv-summary">${d.summary}</p>` : ""}
      ${expItems ? `<h2>Experiencia</h2>${expItems}` : ""}
      ${eduItems ? `<h2>Formación</h2>${eduItems}` : ""}
      ${skillTags ? `<h2>Habilidades</h2>${skillTags}` : ""}
      ${langRows ? `<h2>Idiomas</h2>${langRows}` : ""}`;
  }

  function renderSkillSuggestions() {
    const row = $("#skillSuggestions");
    row.innerHTML = `<span style="font-size:.8rem;color:var(--text-soft)">${t("cv.skillSuggest")}</span>`;
    SKILL_SUGGESTIONS.forEach(s => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.textContent = s;
      b.onclick = () => {
        const inp = $("#cvSkills");
        const cur = inp.value.split(",").map(x => x.trim()).filter(Boolean);
        if (!cur.includes(s)) cur.push(s);
        inp.value = cur.join(", ");
        updatePreview();
      };
      row.appendChild(b);
    });
  }

  /* ---------- IA para el CV (sin API: motor de mejora local) ---------- */
  function improveWithAI() {
    const text = $("#cvSummary").value.trim();
    if (!text) { toast("✍️ " + t("cv.summary")); return; }
    const btn = $("#aiSummaryBtn");
    const orig = btn.innerHTML;
    btn.innerHTML = "⏳ " + t("cv.aiWriting");
    btn.disabled = true;
    setTimeout(() => {
      // Motor de mejora heurístico multilingüe, sin conexión
      const sentences = text.replace(/\s+/g, " ").split(/(?<=[.!?])\s+/).filter(Boolean);
      const cleaned = sentences.map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() === s.toLowerCase() ? s.charAt(0).toUpperCase() + s.slice(1) : s);
      const hasExp = /años|experience|experiencia|anos/.test(text);
      const traits = extractTraits(text);
      let improved = cleaned.join(" ");
      if (!/responsabl|patient|empati/.test(improved)) improved += " " + t("cv.aiPrompt").replace("Eres un experto en currículums. Reescribe este resumen en 2-3 frases claras para el mercado laboral español, en el idioma del usuario: ", "");
      // Simplificamos: construimos un resumen limpio
      improved = [cleaned.join(" ").replace(/\.+$/, "") + ".", traits, hasExp ? "" : ""].filter(Boolean).join(" ");
      $("#cvSummary").value = improved.replace(/\.\./g, ".");
      updatePreview();
      btn.innerHTML = "✨ " + t("cv.aiReady");
      setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 1800);
      toast(t("cv.aiReady"));
    }, 900);
  }

  function extractTraits(text) {
    const l = text.toLowerCase();
    const out = [];
    if (/responsabl/.test(l)) out.push("Responsabilidad");
    if (/pacien/.test(l)) out.push("Paciencia");
    if (/empati/.test(l)) out.push("Empatía");
    if (/cuidad|care/.test(l)) out.push("Atención y cuidado de personas");
    if (/comunic/.test(l)) out.push("Buena comunicación");
    return out.length ? ` ${out.slice(0, 3).join(", ")}.` : "";
  }

  function loadSample() {
    Object.entries(CV_SAMPLE).forEach(([k, v]) => {
      const map = { name: "#cvName", title: "#cvTitle", phone: "#cvPhone", email: "#cvEmail", location: "#cvLocation", summary: "#cvSummary", experience: "#cvExp", education: "#cvEdu", skills: "#cvSkills", languages: "#cvLanguages" };
      const sel = $(map[k]);
      if (sel) sel.value = v;
    });
    updatePreview();
  }

  /* ---------- XP ---------- */
  function saveXP() { LS.set("ma.xp", state.xp); }

  /* ---------- Acompañante Manos ---------- */
  const speech = window.speechSynthesis;
  function speak(text) {
    if (!$("#companionMute").textContent.includes("🔇")) {
      speech.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/[^\wáéíóúüñçàèìòù¿?¡!.,:;() ]/g, ""));
      u.lang = state.lang === "es" ? "es-ES" : "es-ES";
      u.rate = 1;
      speech.speak(u);
    }
  }
  function companionMsg(text, user = false) {
    const chat = $("#companionChat");
    const div = document.createElement("div");
    div.className = "msg " + (user ? "user" : "bot");
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    if (!user) speak(text);
    return div;
  }
  function rotateTip() {
    const tips = [t("companion.tip1"), t("companion.tip2"), t("companion.tip3")];
    companionMsg(tips[Math.floor(Math.random() * tips.length)]);
  }

  /* ---------- Contadores de sección con animación fluida ---------- */
  function animateValue(id, start, end, duration, suffix = "") {
    const obj = $(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      obj.textContent = current.toLocaleString(state.lang === "es" ? "es-ES" : "en-US") + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  function updateSectionCounters() {
    const resCount = RESOURCES.length || 3686;
    const langCount = LANGUAGES.length || 39;
    const courseCount = (AI_COURSES.length + OFFICE_MODULES.length) || 16;

    animateValue("#statResources", 0, resCount, 800, "+");
    animateValue("#statLang", 0, langCount, 800, "");
    animateValue("#statCourses", 0, courseCount, 800, "+");
  }

  /* ---------- renderAll ---------- */
  function renderAll() {
    renderCourses();
    renderOffice();
    renderResources();
    renderRights();
    renderTemplates();
    renderSkillSuggestions();
    updatePreview();
    updateSectionCounters();
  }

  /* ---------- Init ---------- */
  function init() {
    // Tema
    document.documentElement.dataset.theme = state.theme;
    $("#themeIcon").textContent = state.theme === "light" ? "🌙" : "☀️";
    $("#themeBtn").onclick = () => {
      state.theme = state.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = state.theme;
      $("#themeIcon").textContent = state.theme === "light" ? "🌙" : "☀️";
      LS.set("ma.theme", state.theme);
    };

    // Idioma
    $("#langBtn").onclick = () => {
      const open = $("#langMenu").classList.toggle("open");
      $("#langBtn").setAttribute("aria-expanded", open);
      if (open) $("#langMenu input").focus();
    };
    document.addEventListener("click", e => { if (!e.target.closest(".lang-switch")) closeLang(); });

    // Navegación
    $$("[data-nav]").forEach(b => b.addEventListener("click", e => {
      e.preventDefault();
      const sec = b.getAttribute("data-nav");
      if (sec) navigate(sec);
    }));

    // Scroll progress
    window.addEventListener("scroll", () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      $("#scrollProgress").style.width = pct + "%";
    }, { passive: true });

    // Búsqueda de recursos
    $("#resSearch").addEventListener("input", renderResources);

    // CV
    $("#cvForm").addEventListener("input", updatePreview);
    $("#printCv").onclick = () => {
      if (!cvFields().name) { toast("✍️ " + t("cv.name")); return; }
      toast(t("toast.cvSaved"));
      setTimeout(() => window.print(), 400);
    };
    $("#loadSample").onclick = loadSample;
    $("#aiSummaryBtn").onclick = improveWithAI;

    // Acompañante
    $("#companionToggle").onclick = () => {
      const panel = $("#companionPanel");
      const wasHidden = panel.classList.toggle("hidden");
      if (!wasHidden) {
        panel.classList.remove("hidden");
        if (!$("#companionChat").children.length) {
          companionMsg(t("companion.hello"));
          setTimeout(rotateTip, 12000);
        }
      } else {
        panel.classList.add("hidden");
      }
    };
    $("#companionClose").onclick = () => $("#companionPanel").classList.add("hidden");
    $("#companionMute").onclick = e => {
      const muted = e.target.textContent.includes("🔇");
      e.target.textContent = muted ? "🔊" : "🔇";
      if (muted) speech.cancel();
    };
    $("#companionEncourage").onclick = () => {
      companionMsg(t("companion.courage"), false);
      $("#companionPanel").classList.remove("hidden");
    };

    // Atajos
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeLang();
    });

    applyLang();
    renderAll();
    navigate("inicio");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
