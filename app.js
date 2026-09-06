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
const MASTERY_KEY = "bdohelper_mastery_v1";
const SKILL_KEY = "bdohelper_skill_v1";

// bdocodex.com/us/alchemymastery/ — Simya Mastery seviyesine göre "Ürün Miktarı Artışı" (%).
// [mastery, productAmountIncreasePercent], mastery'ye göre artan sırada, 50 puanlık aralıklarla.
// Aradaki değerler için doğrusal enterpolasyon yapılır. Sadece garanti/ortalama üretim miktarını
// artıran bu ana etken kullanılıyor; ek "özel/nadir ürün" şans bonusları hesaba katılmıyor.
const MASTERY_TABLE = [
  [0, 0.00], [50, 5.76], [100, 6.35], [150, 6.97], [200, 7.62], [250, 8.29],
  [300, 9.00], [350, 9.73], [400, 10.50], [450, 11.29], [500, 12.11], [550, 12.96],
  [600, 13.84], [650, 14.75], [700, 15.68], [750, 16.65], [800, 17.64], [850, 18.66],
  [900, 19.71], [950, 20.79], [1000, 21.90], [1050, 23.04], [1100, 24.21], [1150, 25.40],
  [1200, 26.63], [1250, 27.88], [1300, 29.16], [1350, 30.47], [1400, 31.81], [1450, 33.18],
  [1500, 34.57], [1550, 36.00], [1600, 37.45], [1650, 38.94], [1700, 40.45], [1750, 41.99],
  [1800, 43.56], [1850, 45.16], [1900, 46.79], [1950, 48.44], [2000, 50.00], [2050, 50.63],
  [2100, 51.25], [2150, 51.88], [2200, 52.50], [2250, 53.13], [2300, 53.75], [2350, 54.38],
  [2400, 55.00], [2450, 55.63], [2500, 56.25], [2550, 56.88], [2600, 57.50], [2650, 58.13],
  [2700, 58.75], [2750, 59.38], [2800, 60.00], [2850, 60.63], [2900, 61.25], [2950, 61.88],
  [3000, 62.50]
];

function getMasteryBonusPercent(mastery) {
  const m = Math.max(0, Math.min(3000, mastery || 0));
  for (let i = 0; i < MASTERY_TABLE.length - 1; i++) {
    const [lvl0, val0] = MASTERY_TABLE[i];
    const [lvl1, val1] = MASTERY_TABLE[i + 1];
    if (m >= lvl0 && m <= lvl1) {
      const ratio = lvl1 === lvl0 ? 0 : (m - lvl0) / (lvl1 - lvl0);
      return val0 + (val1 - val0) * ratio;
    }
  }
  return 0;
}

let stock = loadStock();
let lang = loadLang();
let mastery = loadMastery();
let skill = loadSkill();

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

function loadMastery() {
  try {
    const raw = parseInt(localStorage.getItem(MASTERY_KEY), 10);
    return Number.isFinite(raw) ? Math.max(0, Math.min(3000, raw)) : 0;
  } catch (e) {
    return 0;
  }
}

function saveMastery() {
  try {
    localStorage.setItem(MASTERY_KEY, String(mastery));
  } catch (e) {
    /* no-op */
  }
}

function loadSkill() {
  try {
    const raw = localStorage.getItem(SKILL_KEY);
    return raw === "cooking" ? "cooking" : "alchemy";
  } catch (e) {
    return "alchemy";
  }
}

function saveSkill() {
  try {
    localStorage.setItem(SKILL_KEY, skill);
  } catch (e) {
    /* no-op */
  }
}

const STRINGS = {
  tr: {
    title: "BDO Helper",
    subtitle: "Simya (Alchemy) ham madde hesaplayıcısı",
    subtitleFor: (sk) => (sk === "cooking" ? "Aşçılık ham madde hesaplayıcısı" : "Simya (Alchemy) ham madde hesaplayıcısı"),
    skillLabel: "Meslek",
    skillNames: { alchemy: "Simya", cooking: "Aşçılık" },
    whatToMake: "Ne üretmek istiyorsun?",
    searchPlaceholder: "Ürün ara...",
    howMany: "Kaç adet üretmek istiyorsun?",
    masteryLabel: "Simya Mastery (0-3000)",
    masteryHint: (pct) => (pct > 0 ? `→ üretimde +%${pct} verim` : ""),
    resetStock: "Tüm stokları sıfırla",
    legendMissing: "Eksik / toplaman gereken",
    legendOk: "Elindeki stok yeterli",
    legendRaw: "Ham madde (üretilmez, toplanır/satın alınır)",
    rawBadge: "Ham Madde",
    batchesBadge: (n, out) => `${n}x üretim (${out} adet çıkar)`,
    batchesBadgeMastery: (n, out) => `${n}x üretim (~${out} adet çıkar, Mastery dahil)`,
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
    },
    craftableLabelFor: (sk) => (sk === "cooking" ? "Aşçılık Ürünleri (Yemek / Tatlı vb.)" : "Simya Ürünleri (İksir / Reaktif / Kristal vb.)")
  },
  en: {
    title: "BDO Helper",
    subtitle: "Alchemy raw-material calculator",
    subtitleFor: (sk) => (sk === "cooking" ? "Cooking raw-material calculator" : "Alchemy raw-material calculator"),
    skillLabel: "Profession",
    skillNames: { alchemy: "Alchemy", cooking: "Cooking" },
    whatToMake: "What do you want to craft?",
    searchPlaceholder: "Search item...",
    howMany: "How many do you want to craft?",
    masteryLabel: "Alchemy Mastery (0-3000)",
    masteryHint: (pct) => (pct > 0 ? `→ +${pct}% yield` : ""),
    resetStock: "Reset all stock",
    legendMissing: "Missing / need to gather",
    legendOk: "You have enough in stock",
    legendRaw: "Raw material (not crafted — gather/hunt/buy)",
    rawBadge: "Raw Material",
    batchesBadge: (n, out) => `${n}x craft (yields ${out})`,
    batchesBadgeMastery: (n, out) => `${n}x craft (~${out} yielded, Mastery incl.)`,
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
    },
    craftableLabelFor: (sk) => (sk === "cooking" ? "Cooking Products (Dishes / Desserts etc.)" : "Alchemy Products (Elixirs / Reagents / Crystals etc.)")
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
// masteryPct: Simya Mastery'nin verdiği "Ürün Miktarı Artışı" (%) — her tarifin
// çıktısına uygulanır (örn. Mastery 2000 -> output_qty * 1.50), böylece yüksek
// Mastery'de aynı hedefe ulaşmak için daha az üretim/ham madde gerekir.
function computeAll(rootId, targetQty, masteryPct) {
  const yieldMultiplier = 1 + (masteryPct || 0) / 100;
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
    let effectiveOutputQty = item.recipe ? item.recipe.output_qty * yieldMultiplier : null;

    if (item.recipe && missing > 0) {
      batches = Math.ceil(missing / effectiveOutputQty);
      producedQty = Math.round(batches * effectiveOutputQty);
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

const SECTION_ORDER = ["raw", "craftable", "mid", "final"];

function renderCard(node, allResults) {
  const s = t();
  const wrap = document.createElement("div");
  wrap.className = "node";

  const row = document.createElement("div");
  row.className = "node-row";

  const item = getItem(node.id);
  if (item.icon) {
    const icon = document.createElement("img");
    icon.className = "node-icon";
    icon.src = item.icon;
    icon.alt = "";
    icon.loading = "lazy";
    row.appendChild(icon);
  }

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
    badge.textContent = skill === "alchemy" && mastery > 0
      ? s.batchesBadgeMastery(node.batches, node.producedQty)
      : s.batchesBadge(node.batches, node.producedQty);
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

  const masteryPct = skill === "alchemy" ? getMasteryBonusPercent(mastery) : 0;
  const results = computeAll(selectedId, targetQty, masteryPct);

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
    heading.textContent = sec === "craftable" ? s.craftableLabelFor(skill) : (s.sections[sec] || sec);
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
    if ((item.skill || "alchemy") !== skill) return; // sadece seçili meslekteki hedefler
    const tier = item.tier || "craftable";
    if (!byTier[tier]) byTier[tier] = [];
    byTier[tier].push({ id, item });
  });

  const s = t();
  ["final", "mid", "craftable"].forEach((tier) => {
    const group = byTier[tier];
    if (!group || group.length === 0) return;
    const optgroup = document.createElement("optgroup");
    optgroup.label = tier === "craftable" ? s.craftableLabelFor(skill) : (s.sections[tier] || tier);
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
  const subtitle = s.subtitleFor(skill);
  document.getElementById("pageTitle").textContent = s.title;
  document.getElementById("pageSubtitle").textContent = subtitle;
  document.getElementById("skillLabel").textContent = s.skillLabel;
  document.getElementById("whatToMakeLabel").textContent = s.whatToMake;
  document.getElementById("itemSearch").placeholder = s.searchPlaceholder;
  document.getElementById("howManyLabel").textContent = s.howMany;
  document.getElementById("masteryLabel").textContent = s.masteryLabel;
  document.getElementById("masteryGroup").style.display = skill === "alchemy" ? "" : "none";
  updateMasteryHint();
  document.getElementById("resetStockBtn").textContent = s.resetStock;
  document.getElementById("legendMissing").textContent = s.legendMissing;
  document.getElementById("legendOk").textContent = s.legendOk;
  document.getElementById("legendRaw").textContent = s.legendRaw;
  document.getElementById("footerText").innerHTML = s.footer;
  document.documentElement.lang = lang;
  document.title = `${s.title} — ${subtitle}`;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  document.querySelectorAll(".skill-btn").forEach((btn) => {
    btn.textContent = s.skillNames[btn.dataset.skill] || btn.dataset.skill;
    btn.classList.toggle("active", btn.dataset.skill === skill);
  });
}

function updateMasteryHint() {
  const s = t();
  const pct = Math.round(getMasteryBonusPercent(mastery) * 10) / 10;
  document.getElementById("masteryHint").textContent = s.masteryHint(pct);
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

function setSkill(newSkill) {
  if (newSkill !== "alchemy" && newSkill !== "cooking") return;
  skill = newSkill;
  saveSkill();
  applyStaticText();
  populateSelect(false);
  document.getElementById("itemSearch").value = "";
  render();
}

function init() {
  document.getElementById("masteryInput").value = mastery;
  applyStaticText();
  populateSelect(false);

  document.getElementById("itemSelect").addEventListener("change", render);
  document.getElementById("targetQty").addEventListener("input", render);
  document.getElementById("itemSearch").addEventListener("input", (e) => {
    filterSelectOptions(e.target.value);
    render();
  });
  document.getElementById("masteryInput").addEventListener("input", (e) => {
    mastery = Math.max(0, Math.min(3000, parseInt(e.target.value, 10) || 0));
    saveMastery();
    updateMasteryHint();
    render();
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  document.querySelectorAll(".skill-btn").forEach((btn) => {
    btn.addEventListener("click", () => setSkill(btn.dataset.skill));
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
