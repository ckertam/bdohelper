// BDO Helper — funnel hesaplama motoru
//
// Aynı ham madde (ör. Kül Özsuyu) veya aynı ara malzeme (ör. Büyülü Katalizör)
// tarif ağacında birden fazla dalda kullanılabiliyor. Bu yüzden hesaplama iki
// aşamalı: önce her maddenin TÜM dallardan gelen toplam ihtiyacı biriktirilir
// (madde ancak kendisini isteyen tüm "üst" maddeler işlendikten sonra kesinleşir
// — topolojik sırayla), sonra kullanıcının "elimde" girdiği stok bu TEK toplam
// üzerinden bir kez düşülür. Böylece aynı stok birden fazla dalda tekrar tekrar
// sayılmaz. Bir üst kademedeki stok yeterliyse, o kademenin altındaki ihtiyaç
// otomatik olarak sıfıra iner (huni/funnel mantığı).

const STORAGE_KEY = "bdohelper_stock_v1";
const LANG_KEY = "bdohelper_lang_v1";

let stock = loadStock();
let lang = loadLang();

function loadStock() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveStock() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stock));
  } catch (e) {
    /* localStorage kapalı olabilir, sessizce geç */
  }
}

function loadLang() {
  try {
    const raw = localStorage.getItem(LANG_KEY);
    return raw === "en" ? "en" : "tr";
  } catch (e) {
    return "tr";
  }
}

function saveLang() {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {
    /* no-op */
  }
}

const STRINGS = {
  tr: {
    title: "BDO Helper",
    subtitle: "Simya (Alchemy) ham madde hesaplayıcısı",
    whatToMake: "Ne üretmek istiyorsun?",
    searchPlaceholder: "Ürün ara...",
    howMany: "Kaç adet üretmek istiyorsun?",
    resetStock: "Tüm stokları sıfırla",
    legendMissing: "Eksik / toplaman gereken",
    legendOk: "Elindeki stok yeterli",
    legendRaw: "Ham madde (üretilmez, toplanır/satın alınır)",
    rawBadge: "Ham Madde",
    batchesBadge: (n, out) => `${n}x üretim (${out} adet çıkar)`,
    totalRequired: "Toplam gerekli",
    missing: (n) => `${n} eksik`,
    sufficient: "yeterli",
    inStock: "Elimde:",
    usedIn: "Kullanıldığı yer(ler):",
    footer: 'Veriler <a href="https://bdocodex.com" target="_blank" rel="noopener">bdocodex.com</a> kaynak alınarak hazırlanmıştır. Oyun içi güncellemelerle miktarlar değişebilir.',
    sections: {
      final: "Ana Ürün",
      mid: "Ara İksirler",
      craftable: "Simya Ürünleri (İksir / Reaktif / Kristal vb.)",
      raw: "Ham Maddeler / Satın Alınanlar"
    }
  },
  en: {
    title: "BDO Helper",
    subtitle: "Alchemy raw-material calculator",
    whatToMake: "What do you want to craft?",
    searchPlaceholder: "Search item...",
    howMany: "How many do you want to craft?",
    resetStock: "Reset all stock",
    legendMissing: "Missing / need to gather",
    legendOk: "You have enough in stock",
    legendRaw: "Raw material (not crafted — gather/hunt/buy)",
    rawBadge: "Raw Material",
    batchesBadge: (n, out) => `${n}x craft (yields ${out})`,
    totalRequired: "Total required",
    missing: (n) => `${n} missing`,
    sufficient: "sufficient",
    inStock: "In stock:",
    usedIn: "Used in:",
    footer: 'Data sourced from <a href="https://bdocodex.com" target="_blank" rel="noopener">bdocodex.com</a>. Quantities may change with game updates.',
    sections: {
      final: "Final Product",
      mid: "Intermediate Draughts",
      craftable: "Alchemy Products (Elixirs / Reagents / Crystals etc.)",
      raw: "Raw Materials / Purchased Items"
    }
  }
};

function t() {
  return STRINGS[lang];
}

function nameFor(item) {
  const primary = lang === "tr" ? item.name_tr : item.name_en;
  const secondary = lang === "tr" ? item.name_en : item.name_tr;
  return { primary: primary || secondary || "?", secondary: secondary || "" };
}

function getItem(id) {
  const item = RECIPES.items[id];
  if (!item) {
    return { name_tr: id, name_en: id, recipe: null, note: "Tanımsız madde." };
  }
  return item;
}

// Hedeflenen kök madde + miktardan yola çıkarak tüm ağacı hesaplar.
function computeAll(rootId, targetQty) {
  // 1) Ulaşılabilir madde kümesi + her maddenin kaç farklı "üst" madde
  //    tarafından talep edildiğini (inDegree) bul.
  const usedBy = {};
  const visited = new Set([rootId]);
  const discoverQueue = [rootId];
  while (discoverQueue.length) {
    const id = discoverQueue.shift();
    const item = getItem(id);
    if (!item.recipe) continue;
    item.recipe.ingredients.forEach((ing) => {
      if (!usedBy[ing.item]) usedBy[ing.item] = new Set();
      usedBy[ing.item].add(id);
      if (!visited.has(ing.item)) {
        visited.add(ing.item);
        discoverQueue.push(ing.item);
      }
    });
  }

  const inDegree = {};
  visited.forEach((id) => {
    inDegree[id] = usedBy[id] ? usedBy[id].size : 0;
  });

  // 2) Kök maddeden başlayarak talebi aşağı doğru dağıt (Kahn benzeri sıralama).
  const demand = {};
  visited.forEach((id) => { demand[id] = 0; });
  demand[rootId] = targetQty;

  const result = {};
  const ready = [rootId];
  const processed = new Set();

  while (ready.length) {
    const id = ready.shift();
    if (processed.has(id)) continue;
    processed.add(id);

    const item = getItem(id);
    const have = stock[id] || 0;
    const required = demand[id];
    const missing = Math.max(0, required - have);
    let batches = 0;
    let producedQty = 0;

    if (item.recipe && missing > 0) {
      batches = Math.ceil(missing / item.recipe.output_qty);
      producedQty = batches * item.recipe.output_qty;
    }

    result[id] = {
      id,
      name_tr: item.name_tr,
      name_en: item.name_en,
      tier: item.tier || null,
      isRaw: !item.recipe,
      note_tr: item.note_tr || null,
      note_en: item.note_en || null,
      source_tr: item.source_tr || null,
      source_en: item.source_en || null,
      required,
      have,
      missing,
      batches,
      producedQty,
      outputQty: item.recipe ? item.recipe.output_qty : null,
      usedBy: usedBy[id] ? Array.from(usedBy[id]) : []
    };

    if (item.recipe) {
      item.recipe.ingredients.forEach((ing) => {
        demand[ing.item] = (demand[ing.item] || 0) + batches * ing.qty;
        inDegree[ing.item] -= 1;
        if (inDegree[ing.item] === 0) ready.push(ing.item);
      });
    }
  }

  return result;
}

function sectionOf(node) {
  if (node.isRaw) return "raw";
  return node.tier || "craftable";
}

const SECTION_ORDER = ["final", "mid", "craftable", "raw"];

function renderCard(node, allResults) {
  const s = t();
  const wrap = document.createElement("div");
  wrap.className = "node";

  const row = document.createElement("div");
  row.className = "node-row";

  const { primary, secondary } = nameFor(node);
  const nameDiv = document.createElement("div");
  nameDiv.className = "node-name";
  nameDiv.innerHTML = `${primary}<span class="en">${secondary}</span>`;
  row.appendChild(nameDiv);

  if (node.isRaw) {
    const badge = document.createElement("span");
    badge.className = "badge raw";
    badge.textContent = s.rawBadge;
    row.appendChild(badge);
  } else if (node.batches) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = s.batchesBadge(node.batches, node.producedQty);
    row.appendChild(badge);
  }

  const qtyInfo = document.createElement("div");
  qtyInfo.className = "qty-info";
  const missingSpan = node.missing > 0
    ? `<span class="missing">${s.missing(node.missing)}</span>`
    : `<span class="satisfied">${s.sufficient}</span>`;
  qtyInfo.innerHTML = `<span>${s.totalRequired}: <b>${node.required}</b></span>${missingSpan}`;
  row.appendChild(qtyInfo);

  const stockWrap = document.createElement("div");
  stockWrap.className = "stock-input";
  const label = document.createElement("label");
  label.textContent = s.inStock;
  const input = document.createElement("input");
  input.type = "number";
  input.min = "0";
  input.step = "1";
  input.dataset.item = node.id;
  input.value = stock[node.id] || 0;
  input.className = "stock-field";
  stockWrap.appendChild(label);
  stockWrap.appendChild(input);
  row.appendChild(stockWrap);

  wrap.appendChild(row);

  if (node.usedBy && node.usedBy.length > 0) {
    const usedByNames = node.usedBy
      .map((pid) => (allResults[pid] ? nameFor(allResults[pid]).primary : pid))
      .join(", ");
    const usedByDiv = document.createElement("div");
    usedByDiv.className = "note-text";
    usedByDiv.textContent = `🔗 ${s.usedIn} ${usedByNames}`;
    wrap.appendChild(usedByDiv);
  }

  const source = lang === "tr" ? node.source_tr : node.source_en;
  const note = lang === "tr" ? node.note_tr : node.note_en;
  if (source) {
    const src = document.createElement("div");
    src.className = "note-text";
    src.textContent = `📍 ${source}`;
    wrap.appendChild(src);
  }
  if (note) {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note-text";
    noteDiv.textContent = `ℹ ${note}`;
    wrap.appendChild(noteDiv);
  }

  return wrap;
}

function render() {
  const itemSelect = document.getElementById("itemSelect");
  const targetQty = parseInt(document.getElementById("targetQty").value, 10) || 0;
  const selectedId = itemSelect.value;

  const tree = document.getElementById("tree");
  const main = document.querySelector("main");
  tree.innerHTML = "";
  if (!selectedId || targetQty <= 0) {
    main.classList.remove("has-results");
    return;
  }

  const results = computeAll(selectedId, targetQty);

  const bySection = {};
  Object.values(results).forEach((node) => {
    const sec = sectionOf(node);
    if (!bySection[sec]) bySection[sec] = [];
    bySection[sec].push(node);
  });

  const s = t();
  const activeSections = SECTION_ORDER.filter((sec) => bySection[sec] && bySection[sec].length > 0);
  main.classList.toggle("has-results", activeSections.length > 0);

  activeSections.forEach((sec, idx) => {
    const items = bySection[sec];

    const section = document.createElement("section");
    section.className = "tier-section";

    const heading = document.createElement("h2");
    heading.textContent = s.sections[sec] || sec;
    section.appendChild(heading);

    const cardsWrap = document.createElement("div");
    cardsWrap.className = "tier-cards";

    items
      .sort((a, b) => nameFor(a).primary.localeCompare(nameFor(b).primary, lang))
      .forEach((node) => {
        cardsWrap.appendChild(renderCard(node, results));
      });

    section.appendChild(cardsWrap);
    tree.appendChild(section);

    if (idx < activeSections.length - 1) {
      const arrow = document.createElement("div");
      arrow.className = "funnel-arrow";
      arrow.textContent = "→";
      arrow.setAttribute("aria-hidden", "true");
      tree.appendChild(arrow);
    }
  });
}

function populateSelect(preserveSelection) {
  const itemSelect = document.getElementById("itemSelect");
  const prevValue = preserveSelection ? itemSelect.value : null;
  itemSelect.innerHTML = "";

  const byTier = { final: [], mid: [], craftable: [] };
  Object.entries(RECIPES.items).forEach(([id, item]) => {
    if (!item.recipe) return; // sadece üretilebilen maddeler seçilebilir
    const tier = item.tier || "craftable";
    if (!byTier[tier]) byTier[tier] = [];
    byTier[tier].push({ id, item });
  });

  const s = t();
  ["final", "mid", "craftable"].forEach((tier) => {
    const group = byTier[tier];
    if (!group || group.length === 0) return;
    const optgroup = document.createElement("optgroup");
    optgroup.label = s.sections[tier] || tier;
    group
      .sort((a, b) => nameFor(a.item).primary.localeCompare(nameFor(b.item).primary, lang))
      .forEach(({ id, item }) => {
        const { primary, secondary } = nameFor(item);
        const opt = document.createElement("option");
        opt.value = id;
        opt.textContent = secondary ? `${primary} (${secondary})` : primary;
        optgroup.appendChild(opt);
      });
    itemSelect.appendChild(optgroup);
  });

  if (prevValue && RECIPES.items[prevValue]) {
    itemSelect.value = prevValue;
  }
}

function filterSelectOptions(query) {
  const itemSelect = document.getElementById("itemSelect");
  const q = query.trim().toLocaleLowerCase(lang);
  let firstVisible = null;
  Array.from(itemSelect.querySelectorAll("option")).forEach((opt) => {
    const matches = !q || opt.textContent.toLocaleLowerCase(lang).includes(q);
    opt.hidden = !matches;
    if (matches && !firstVisible) firstVisible = opt;
  });
  Array.from(itemSelect.querySelectorAll("optgroup")).forEach((g) => {
    const anyVisible = Array.from(g.querySelectorAll("option")).some((o) => !o.hidden);
    g.hidden = !anyVisible;
  });
  if (firstVisible && itemSelect.selectedOptions[0] && itemSelect.selectedOptions[0].hidden) {
    itemSelect.value = firstVisible.value;
  }
}

function applyStaticText() {
  const s = t();
  document.getElementById("pageTitle").textContent = s.title;
  document.getElementById("pageSubtitle").textContent = s.subtitle;
  document.getElementById("whatToMakeLabel").textContent = s.whatToMake;
  document.getElementById("itemSearch").placeholder = s.searchPlaceholder;
  document.getElementById("howManyLabel").textContent = s.howMany;
  document.getElementById("resetStockBtn").textContent = s.resetStock;
  document.getElementById("legendMissing").textContent = s.legendMissing;
  document.getElementById("legendOk").textContent = s.legendOk;
  document.getElementById("legendRaw").textContent = s.legendRaw;
  document.getElementById("footerText").innerHTML = s.footer;
  document.documentElement.lang = lang;
  document.title = `${s.title} — ${s.subtitle}`;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function setLang(newLang) {
  if (newLang !== "tr" && newLang !== "en") return;
  lang = newLang;
  saveLang();
  applyStaticText();
  populateSelect(true);
  document.getElementById("itemSearch").value = "";
  render();
}

function init() {
  applyStaticText();
  populateSelect(false);

  document.getElementById("itemSelect").addEventListener("change", render);
  document.getElementById("targetQty").addEventListener("input", render);
  document.getElementById("itemSearch").addEventListener("input", (e) => {
    filterSelectOptions(e.target.value);
    render();
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  document.getElementById("tree").addEventListener("input", (e) => {
    if (e.target.classList.contains("stock-field")) {
      const id = e.target.dataset.item;
      const selStart = e.target.selectionStart;
      const scrollY = window.scrollY;
      const val = Math.max(0, parseInt(e.target.value, 10) || 0);
      stock[id] = val;
      saveStock();
      render();

      // Tüm liste yeniden çizildiği için düzenlenmekte olan input'un
      // focus/cursor/scroll konumunu geri yüklüyoruz.
      const restored = document.querySelector(`[data-item="${CSS.escape(id)}"]`);
      if (restored) {
        restored.focus();
        try { restored.setSelectionRange(selStart, selStart); } catch (err) { /* no-op */ }
      }
      window.scrollTo(0, scrollY);
    }
  });

  document.getElementById("resetStockBtn").addEventListener("click", () => {
    stock = {};
    saveStock();
    render();
  });

  render();
}

document.addEventListener("DOMContentLoaded", init);
