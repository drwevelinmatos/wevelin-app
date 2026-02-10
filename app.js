/* global APP_CONFIG, DEFAULT_CONTENT */
(() => {
  const $ = (q) => document.querySelector(q);
  const $$ = (q) => Array.from(document.querySelectorAll(q));

  // =========================
  // PWA / Service Worker
  // =========================
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    });
  }

  // =========================
  // Util: clone seguro (sem structuredClone)
  // =========================
  function safeClone(obj) {
    try {
      return JSON.parse(JSON.stringify(obj ?? {}));
    } catch {
      return {};
    }
  }

  // =========================
  // Estado / Storage (conteúdo local do Admin)
  // =========================
  const LS_KEY = "wevelin_app_content_v1";

  function loadLocal() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function saveLocal(data) {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  }

  function mergeById(baseArr, localArr) {
    const m = new Map((baseArr || []).map((x) => [x.id, x]));
    for (const item of localArr || []) m.set(item.id, item);
    return Array.from(m.values()).sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  }

  function getContent() {
    const local = loadLocal();
    const base = safeClone(DEFAULT_CONTENT || {});

    // garante arrays
    base.temas = Array.isArray(base.temas) ? base.temas : [];
    base.tabelas = Array.isArray(base.tabelas) ? base.tabelas : [];
    base.laser = Array.isArray(base.laser) ? base.laser : [];

    if (!local) {
      return { temas: base.temas, tabelas: base.tabelas, laser: base.laser };
    }

    local.temas = Array.isArray(local.temas) ? local.temas : [];
    local.tabelas = Array.isArray(local.tabelas) ? local.tabelas : [];
    local.laser = Array.isArray(local.laser) ? local.laser : [];

    return {
      temas: mergeById(base.temas, local.temas),
      tabelas: mergeById(base.tabelas, local.tabelas),
      laser: mergeById(base.laser, local.laser),
    };
  }

  // =========================
  // Navegação (telas)
  // =========================
  const screens = $$(".screen");
  const historyStack = [];

  function showScreen(name) {
    const id = `screen-${name}`;
    const target = document.getElementById(id);
    if (!target) return;

    const active = $(".screen.active");
    if (active && active.id !== id) historyStack.push(active.id);

    screens.forEach((s) => s.classList.remove("active"));
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    const prev = historyStack.pop();
    if (!prev) return showScreen("home");
    screens.forEach((s) => s.classList.remove("active"));
    document.getElementById(prev)?.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // expõe para outros módulos (termos)
  window.showScreen = showScreen;
  window.goBack = goBack;

  // listeners de navegação (botões data-go e data-back)
  function bindNav() {
    $$("[data-go]").forEach((btn) => {
      btn.addEventListener("click", () => showScreen(btn.getAttribute("data-go")));
    });
    $$("[data-back]").forEach((btn) => btn.addEventListener("click", goBack));
  }
  bindNav();

  // =========================
  // Preencher HOME (sobre mim)
  // =========================
  $("#aboutMe") && ($("#aboutMe").textContent = APP_CONFIG?.aboutMe || "");

  // =========================
  // Renderização de listas (Temas/Tabelas/Laser)
  // =========================
  function escapeHtml(s) {
    return String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function openDetail(item, kindLabel) {
    $("#detailTitle").textContent = item.title || "Conteúdo";
    $("#detailMeta").textContent =
      `${kindLabel}${item.updatedAt ? " • Atualizado: " + item.updatedAt : ""}`;
    $("#detailBody").innerHTML = item.html || "<p class='muted'>Sem conteúdo.</p>";
    showScreen("detail");
  }

  function renderList(container, items, kindLabel) {
    if (!container) return;

    container.innerHTML = "";
    if (!items || items.length === 0) {
      container.innerHTML = `<div class="card muted">Nenhum item disponível.</div>`;
      return;
    }

    for (const it of items) {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <div class="item-title">${escapeHtml(it.title)}</div>
        <div class="item-meta">
          ${escapeHtml((it.tags || []).join(" • "))}
          ${it.updatedAt ? " • Atualizado: " + escapeHtml(it.updatedAt) : ""}
        </div>
      `;
      div.addEventListener("click", () => openDetail(it, kindLabel));
      container.appendChild(div);
    }
  }

  function wireSearch(inputEl, items, renderFn) {
    if (!inputEl) return;
    inputEl.addEventListener("input", () => {
      const q = inputEl.value.trim().toLowerCase();
      const filtered = !q
        ? items
        : items.filter((x) => {
            const hay = (
              (x.title || "") +
              " " +
              (x.tags || []).join(" ") +
              " " +
              (x.html || "")
            ).toLowerCase();
            return hay.includes(q);
          });
      renderFn(filtered);
    });
  }

  function refreshUI() {
    const content = getContent();

    // TEMAS
    const temas = content.temas || [];
    const temasEl = $("#listTemas");
    renderList(temasEl, temas, "Tema");
    wireSearch($("#searchTemas"), temas, (f) => renderList(temasEl, f, "Tema"));

    // TABELAS
    const tabelas = content.tabelas || [];
    const tabelasEl = $("#listTabelas");
    renderList(tabelasEl, tabelas, "Tabela");
    wireSearch($("#searchTabelas"), tabelas, (f) => renderList(tabelasEl, f, "Tabela"));

    // LASER
    const laser = content.laser || [];
    const laserEl = $("#listLaser");
    renderList(laserEl, laser, "Laserterapia");
    wireSearch($("#searchLaser"), laser, (f) => renderList(laserEl, f, "Laserterapia"));
  }

  document.addEventListener("DOMContentLoaded", refreshUI);

  // =========================
  // Dúvidas (WhatsApp)
  // =========================
  function buildWhatsLink(number, text) {
    if (!number) return null;
    return `https://wa.me/${number}?text=${encodeURIComponent(text || "")}`;
  }

  $("#btnSendWhats")?.addEventListener("click", () => {
    const msg = ($("#msgBox")?.value || "").trim();
    const link = buildWhatsLink(APP_CONFIG?.whatsappNumber, msg ? `Olá! Tenho uma dúvida:\n\n${msg}` : "Olá! Tenho uma dúvida:");
    if (!link) return alert("WhatsApp não configurado em data.js");
    window.open(link, "_blank");
  });

  // =========================
  // Agendamento (WhatsApp)
  // =========================
  $("#btnAgendar")?.addEventListener("click", () => {
    const link = buildWhatsLink(APP_CONFIG?.schedulingWhatsappNumber, "Olá! Gostaria de agendar uma consulta.");
    if (!link) return alert("WhatsApp de agendamento não configurado em data.js");
    window.open(link, "_blank");
  });

  // =========================
  // Admin (salva conteúdo local)
  // =========================
  const modal = $("#adminModal");
  const gate = $("#adminGate");
  const panel = $("#adminPanel");

  function openAdmin() {
    if (!modal) return;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    $("#adminPin").value = "";
    gate?.classList.remove("hidden");
    panel?.classList.add("hidden");
  }

  function closeAdmin() {
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  $("#btnAdmin")?.addEventListener("click", openAdmin);
  $("#btnCloseAdmin")?.addEventListener("click", closeAdmin);

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeAdmin();
  });

  $("#btnEnterAdmin")?.addEventListener("click", () => {
    const pin = ($("#adminPin")?.value || "").trim();
    if (pin !== (APP_CONFIG?.adminPin || "")) return alert("PIN incorreto.");
    gate?.classList.add("hidden");
    panel?.classList.remove("hidden");
  });

  // tabs admin
  $$("[data-admin-tab]").forEach((p) => {
    p.addEventListener("click", () => {
      $$("[data-admin-tab]").forEach((x) => x.classList.remove("active"));
      p.classList.add("active");
      const tab = p.getAttribute("data-admin-tab");
      $$(".admin-tab").forEach((x) => x.classList.add("hidden"));
      $("#adminTab-" + tab)?.classList.remove("hidden");
    });
  });

  function ensureLocalContainer() {
    const local = loadLocal();
    if (local) return local;
    const fresh = { temas: [], tabelas: [], laser: [] };
    saveLocal(fresh);
    return fresh;
  }

  function slugify(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .slice(0, 60) || "item";
  }

  function addItem(kind, title, tags, html) {
    if (!title || !html) return alert("Preencha título e conteúdo.");
    const local = ensureLocalContainer();
    if (!Array.isArray(local[kind])) local[kind] = [];

    const id = slugify(title) + "-" + Date.now().toString(36);
    local[kind].push({
      id,
      title,
      tags: (tags || "").split(",").map((x) => x.trim()).filter(Boolean),
      updatedAt: new Date().toISOString().slice(0, 10),
      html
    });

    saveLocal(local);
    refreshUI();
    alert("Adicionado!");
  }

  $("#btnAddTema")?.addEventListener("click", () => {
    addItem("temas", $("#admTemaTitulo")?.value?.trim(), $("#admTemaTags")?.value?.trim(), $("#admTemaHtml")?.value?.trim());
    $("#admTemaTitulo").value = "";
    $("#admTemaTags").value = "";
    $("#admTemaHtml").value = "";
  });

  $("#btnAddTabela")?.addEventListener("click", () => {
    addItem("tabelas", $("#admTabTitulo")?.value?.trim(), $("#admTabTags")?.value?.trim(), $("#admTabHtml")?.value?.trim());
    $("#admTabTitulo").value = "";
    $("#admTabTags").value = "";
    $("#admTabHtml").value = "";
  });

  // (opcional) se você quiser adicionar Laser via Admin depois:
  // basta criar uma aba no HTML ou eu adiciono pra você.

  $("#btnExport")?.addEventListener("click", async () => {
    const local = ensureLocalContainer();
    const json = JSON.stringify(local, null, 2);
    $("#backupBox").value = json;
    try {
      await navigator.clipboard.writeText(json);
      alert("JSON copiado!");
    } catch {
      alert("JSON gerado. Copie manualmente.");
    }
  });

  $("#btnImport")?.addEventListener("click", () => {
    const raw = $("#backupBox")?.value?.trim();
    if (!raw) return alert("Cole um JSON válido primeiro.");
    try {
      const obj = JSON.parse(raw);
      if (!Array.isArray(obj.temas)) obj.temas = [];
      if (!Array.isArray(obj.tabelas)) obj.tabelas = [];
      if (!Array.isArray(obj.laser)) obj.laser = [];
      saveLocal(obj);
      refreshUI();
      alert("Importado com sucesso!");
    } catch {
      alert("JSON inválido.");
    }
  });

  $("#btnReset")?.addEventListener("click", () => {
    if (!confirm("Tem certeza? Isso apaga os conteúdos salvos neste aparelho.")) return;
    localStorage.removeItem(LS_KEY);
    refreshUI();
    alert("Dados locais apagados.");
  });

  // =========================
  // Termos (bloqueio + 1ª abertura + data/hora)
  // =========================
  const TERMS_KEY = "wevelin_terms_v1";

  function getTermsState() {
    try {
      const raw = localStorage.getItem(TERMS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function isTermsAccepted() {
    const st = getTermsState();
    return !!(st && st.accepted);
  }

  function setTermsAccepted() {
    const now = new Date();
    const acceptedAtText = now.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    const payload = { accepted: true, acceptedAtISO: now.toISOString(), acceptedAtText };
    localStorage.setItem(TERMS_KEY, JSON.stringify(payload));
    return payload;
  }

  function lockMenuIfNeeded() {
    const locked = !isTermsAccepted();
    document.querySelectorAll("[data-go]").forEach((btn) => {
      btn.dataset.locked = locked ? "1" : "0";
      btn.style.opacity = locked ? "0.55" : "1";
      btn.style.pointerEvents = "auto";
    });
  }

  function requireTermsBeforeAction(ev) {
    const btn = ev.currentTarget;
    const locked = btn.dataset.locked === "1";
    if (!locked) return;

    ev.preventDefault();
    ev.stopPropagation();
    alert("Para continuar, leia e aceite os Termos e a Política de Privacidade.");
    showScreen("termos");
  }

  // Intercepta navegação (captura)
  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", requireTermsBeforeAction, true);
  });

  lockMenuIfNeeded();

  // 1ª abertura: mostra termos
  if (!isTermsAccepted()) showScreen("termos");

  // UI do aceite
  const checkbox = document.getElementById("acceptTerms");
  const button = document.getElementById("btnAcceptTerms");
  const status = document.getElementById("termsStatus");

  if (checkbox && button) {
    const st = getTermsState();
    if (st?.accepted) {
      checkbox.checked = true;
      checkbox.disabled = true;
      button.disabled = true;
      button.textContent = "Termos aceitos";
      if (status) status.textContent = `Aceito em: ${st.acceptedAtText}`;
    } else {
      button.disabled = true;
      if (status) status.textContent = "";
    }

    checkbox.addEventListener("change", () => {
      button.disabled = !checkbox.checked;
    });

    button.addEventListener("click", () => {
      const payload = setTermsAccepted();
      checkbox.disabled = true;
      button.disabled = true;
      button.textContent = "Termos aceitos";
      if (status) status.textContent = `Aceito em: ${payload.acceptedAtText}`;
      lockMenuIfNeeded();
      alert("Obrigado! Agora você já pode acessar o conteúdo do app.");
      showScreen("home");
    });
  }

/* =========================
   MRPA • Wevelin-app (Tabelas)
========================= */
const MRPA_KEY = "wevelin_mrpa_v1";

// Layout: Dia 1 = 2 medições (Clínica)
// Dias 2–5 = 6 medições por dia (3 manhã + 3 noite) = 24 no total
const MRPA_PLAN = [
  { day: 1, type: "clinica", count: 2 },
  { day: 2, type: "manha_noite", count: 6 },
  { day: 3, type: "manha_noite", count: 6 },
  { day: 4, type: "manha_noite", count: 6 },
  { day: 5, type: "manha_noite", count: 6 },
];

document.addEventListener("DOMContentLoaded", () => {
  mrpaRender();
  mrpaBindAutoSave();
  mrpaLoad();
});

function mrpaRender(){
  const wrap = document.getElementById("mrpa_days");
  if(!wrap) return;

  let globalIndex = 1; // 1ª medição...24ª
  wrap.innerHTML = "";

  MRPA_PLAN.forEach(p => {
    const dayId = `mrpa_day_${p.day}`;

    let headerRight = `
      <div class="field" style="max-width:190px;margin:0;">
        <label>Data</label>
        <input type="date" id="${dayId}_date" />
      </div>
    `;

    let body = "";

    if(p.type === "clinica"){
      body += `<div class="mrpa-row">` +
        Array.from({length: p.count}).map((_,i)=>{
          const idx = globalIndex++;
          return mrpaMeasureCard(p.day, idx);
        }).join("") +
      `</div>`;
    } else {
      // manhã: 3 / noite: 3
      const morning = Array.from({length:3}).map(()=> mrpaMeasureCard(p.day, globalIndex++ )).join("");
      const night   = Array.from({length:3}).map(()=> mrpaMeasureCard(p.day, globalIndex++ )).join("");

      body += `
        <div class="mrpa-row">
          <div>
            <div class="mrpa-block-title">☀️ Manhã</div>
            ${morning}
          </div>
          <div>
            <div class="mrpa-block-title">🌙 Noite</div>
            ${night}
          </div>
          <div class="no-print" style="font-size:12px;color:var(--muted);padding-top:26px;">
            Dica: preencha pelo menos 2 dias completos para ter melhor amostragem.
          </div>
        </div>
      `;
    }

    wrap.insertAdjacentHTML("beforeend", `
      <div class="mrpa-day" id="${dayId}">
        <div class="day-title">
          <strong>${p.day}º Dia ${p.type==="clinica" ? "– Clínica" : ""}</strong>
          ${headerRight}
        </div>
        ${body}
      </div>
    `);
  });
}

function mrpaMeasureCard(day, idx){
  const base = `mrpa_d${day}_m${idx}`;
  return `
    <div class="mrpa-measure">
      <div class="m-title">${idx}ª Medição</div>
      <div class="mrpa-4">
        <div class="field">
          <label>Hora</label>
          <input type="time" id="${base}_hora" />
        </div>
        <div class="field">
          <label>Pulso</label>
          <input type="number" id="${base}_pulso" min="0" />
        </div>
        <div class="field">
          <label>PAS</label>
          <input type="number" id="${base}_pas" min="0" />
        </div>
        <div class="field">
          <label>PAD</label>
          <input type="number" id="${base}_pad" min="0" />
        </div>
      </div>
    </div>
  `;
}

function mrpaBindAutoSave(){
  const root = document.getElementById("mrpa");
  if(!root) return;

  root.addEventListener("input", () => mrpaSave(), { passive:true });
}

function mrpaCollect(){
  const data = {
    nome: val("mrpa_nome"),
    dn: val("mrpa_dn"),
    peso: val("mrpa_peso"),
    altura: val("mrpa_altura"),
    medico: val("mrpa_medico"),
    clinica: val("mrpa_clinica"),
    meds: val("mrpa_meds"),
    days: {}
  };

  // datas dos dias
  MRPA_PLAN.forEach(p=>{
    data.days[p.day] = data.days[p.day] || {};
    data.days[p.day].date = val(`mrpa_day_${p.day}_date`);
  });

  // medições 1..24
  for(let idx=1; idx<=24; idx++){
    // descobrir dia do idx (mantém id estável para salvar)
    // (como geramos em sequência, guardamos só pelo idx)
    data[`m${idx}`] = {
      hora: valAny(`_m${idx}_hora`),
      pulso: valAny(`_m${idx}_pulso`),
      pas: valAny(`_m${idx}_pas`),
      pad: valAny(`_m${idx}_pad`)
    };
  }
  return data;
}

/* Helper: como os ids têm "mrpa_d{dia}_m{idx}_campo", buscamos por sufixo único "_m{idx}_campo" */
function valAny(suffix){
  const el = document.querySelector(`[id$="${suffix}"]`);
  return el ? el.value : "";
}
function val(id){ const el=document.getElementById(id); return el? el.value : ""; }
function setVal(id,v){ const el=document.getElementById(id); if(el) el.value = (v ?? ""); }

function mrpaSave(){
  try{
    const payload = mrpaCollect();
    localStorage.setItem(MRPA_KEY, JSON.stringify(payload));
  }catch(e){}
}

function mrpaLoad(){
  try{
    const raw = localStorage.getItem(MRPA_KEY);
    if(!raw) return;
    const data = JSON.parse(raw);

    setVal("mrpa_nome", data.nome);
    setVal("mrpa_dn", data.dn);
    setVal("mrpa_peso", data.peso);
    setVal("mrpa_altura", data.altura);
    setVal("mrpa_medico", data.medico);
    setVal("mrpa_clinica", data.clinica);
    setVal("mrpa_meds", data.meds);

    MRPA_PLAN.forEach(p=>{
      setVal(`mrpa_day_${p.day}_date`, data?.days?.[p.day]?.date || "");
    });

    for(let idx=1; idx<=24; idx++){
      const m = data[`m${idx}`] || {};
      // preencher por sufixo
      const setBySuffix = (suffix, v) => {
        const el = document.querySelector(`[id$="${suffix}"]`);
        if(el) el.value = (v ?? "");
      };
      setBySuffix(`_m${idx}_hora`, m.hora);
      setBySuffix(`_m${idx}_pulso`, m.pulso);
      setBySuffix(`_m${idx}_pas`, m.pas);
      setBySuffix(`_m${idx}_pad`, m.pad);
    }
  }catch(e){}
}

function mrpaClear(){
  if(!confirm("Limpar todos os campos do MRPA?")) return;
  localStorage.removeItem(MRPA_KEY);
  location.hash = "#mrpa";
  location.reload();
}

/* Download PDF = aciona modo impressão (usuário salva como PDF) */
function mrpaPrint(){
  mrpaSave();
  window.print();
}

/* CSV simples (dados + 24 medições) */
function mrpaExportCSV(){
  mrpaSave();
  const d = mrpaCollect();

  const rows = [];
  rows.push(["Nome", d.nome]);
  rows.push(["Data Nasc", d.dn]);
  rows.push(["Peso", d.peso]);
  rows.push(["Altura", d.altura]);
  rows.push(["Médico", d.medico]);
  rows.push(["Clínica", d.clinica]);
  rows.push(["Medicações", (d.meds||"").replace(/\n/g," | ")]);
  rows.push([]);

  rows.push(["Medição","Hora","PAS","PAD","Pulso"]);
  for(let i=1;i<=24;i++){
    const m = d[`m${i}`] || {};
    rows.push([i, m.hora||"", m.pas||"", m.pad||"", m.pulso||""]);
  }

  const csv = rows.map(r => r.map(x => `"${String(x??"").replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `MRPA_${(d.nome||"paciente").replace(/\s+/g,"_")}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
})();

