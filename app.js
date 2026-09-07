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
const STORAGE_KEY_HIGH = "bdohelper_stock_high_v1";
const LANG_KEY = "bdohelper_lang_v1";
const MASTERY_KEY = "bdohelper_mastery_v1";
const SKILL_KEY = "bdohelper_skill_v1";

// bdocodex: her iksirin üst kaliteli (Advanced/Endless vb.) versiyonu, tarifte
// istenen normal (Simple/base) iksir yerine 1:3 oranında kullanılabilir.
const HIGHER_GRADE_RATIO = 3;

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
let stockHigh = loadStockHigh();
let lang = loadLang();
let mastery = loadMastery();
let skill = loadSkill();
let focusId = null; // tıklanan madde: sadece bununla ilişkili maddeler gösterilir
let funnelQuery = ""; // ağaç içi arama metni

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

function loadStockHigh() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HIGH);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveStockHigh() {
  try {
    localStorage.setItem(STORAGE_KEY_HIGH, JSON.stringify(stockHigh));
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
    simpleAlchemyNote: "Basit Kimya ile yapılır: Simya Mastery bu ürünün miktarını artırmaz.",
    inStockHigher: "Üst kalite (Adv/Endless) elimde:",
    higherGradeHint: (ratio) => `1 üst kalite = ${ratio} adet`,
    methodSimple: (sk) => (sk === "cooking" ? "Basit Yemek" : "Basit Kimya"),
    methodTool: (sk) => (sk === "cooking" ? "Aşçılık Aleti" : "Kimya Aleti"),
    ingredientsLabel: "Malzemeler:",
    ingredientLine: (name, needed, missing) => (
      missing > 0
        ? `${name}: bu ürün için ${needed} gerekli · toplamda ${missing} eksik`
        : `${name}: bu ürün için ${needed} gerekli · toplamda yeterli`
    ),
    usedIn: "Kullanıldığı yer(ler):",
    funnelSearchPlaceholder: "Ağaçta ara...",
    focusChip: (name) => `🔎 Odak: ${name} ✕`,
    noResults: "Eşleşen madde yok.",
    footer: 'Veriler <a href="https://bdocodex.com" target="_blank" rel="noopener">bdocodex.com</a> kaynak alınarak hazırlanmıştır. Oyun içi güncellemelerle miktarlar değişebilir.',
    sections: {
      final: "Ana Ürün",
      mid: "Ara İksirler",
      elixir: "İksirler",
      craftable: "Diğer Simya Ürünleri (Reaktif / Kristal vb.)",
      raw: "Ham Maddeler / Satın Alınanlar"
    },
    craftableLabelFor: (sk) => (sk === "cooking" ? "Aşçılık Ürünleri (Yemek / Tatlı vb.)" : "Diğer Simya Ürünleri (Reaktif / Kristal vb.)")
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
    simpleAlchemyNote: "Made via Simple Alchemy: Alchemy Mastery does not increase this item's yield.",
    inStockHigher: "Higher-grade (Adv/Endless) owned:",
    higherGradeHint: (ratio) => `1 higher-grade = ${ratio} units`,
    methodSimple: (sk) => (sk === "cooking" ? "Simple Cooking" : "Simple Alchemy"),
    methodTool: (sk) => (sk === "cooking" ? "Cooking Utensil" : "Alchemy Tool"),
    ingredientsLabel: "Ingredients:",
    ingredientLine: (name, needed, missing) => (
      missing > 0
        ? `${name}: ${needed} needed for this · ${missing} missing overall`
        : `${name}: ${needed} needed for this · sufficient overall`
    ),
    usedIn: "Used in:",
    funnelSearchPlaceholder: "Search the tree...",
    focusChip: (name) => `🔎 Focus: ${name} ✕`,
    noResults: "No matching items.",
    footer: 'Data sourced from <a href="https://bdocodex.com" target="_blank" rel="noopener">bdocodex.com</a>. Quantities may change with game updates.',
    sections: {
      final: "Final Product",
      mid: "Intermediate Draughts",
      elixir: "Elixirs",
      craftable: "Other Alchemy Products (Reagents / Crystals etc.)",
      raw: "Raw Materials / Purchased Items"
    },
    craftableLabelFor: (sk) => (sk === "cooking" ? "Cooking Products (Dishes / Desserts etc.)" : "Other Alchemy Products (Reagents / Crystals etc.)")
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

// Simya reçetelerinin bir kısmı "Basit Kimya" ile (Alet gerekmeden, L tuşu
// İşleme menüsünden) yapılır ve RNG'li (1-4 vb.) miktar üretir; bu üretimler
// Simya Mastery'den ETKİLENMEZ. Gerçek Kimya Aleti ile yapılan (sabit çıktı,
// RNG notu olmayan) reçetelerde Mastery ürün miktarını artırır. Veride bu
// ayrım, o maddenin notundaki "RNG üretim/yield" ifadesiyle işaretleniyor.
function isSimpleAlchemyRecipe(item) {
  const note = (item.note_tr || "") + " " + (item.note_en || "");
  return /RNG (üretim|yield)/i.test(note);
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
    const isElixir = item.tier === "elixir";
    const baseHave = stock[id] || 0;
    const higherHave = isElixir ? (stockHigh[id] || 0) : 0;
    const have = baseHave + higherHave * HIGHER_GRADE_RATIO;
    const required = demand[id];
    const missing = Math.max(0, required - have);
    const masteryApplies = !!item.recipe && !isSimpleAlchemyRecipe(item);
    let batches = 0;
    let producedQty = 0;
    let effectiveOutputQty = item.recipe
      ? item.recipe.output_qty * (masteryApplies ? yieldMultiplier : 1)
      : null;

    if (item.recipe && missing > 0) {
      // Mastery, bir üretimden çıkan ORTALAMA miktarı artırır ama tarifin
      // malzeme oranını değiştirmez — yani "kaç kez üretim yapman gerektiği"
      // (batches), dolayısıyla malzeme ihtiyacı, HER ZAMAN temel (Mastery'siz)
      // çıktıya göre hesaplanır. Mastery'nin etkisi sadece o üretimlerden
      // muhtemelen ne kadar FAZLADAN ürün alacağını (producedQty) gösterir —
      // bu fazlalığa güvenip alt malzeme ihtiyacını azaltmıyoruz.
      batches = Math.ceil(missing / item.recipe.output_qty);
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
      isElixir,
      masteryApplies,
      required,
      have,
      baseHave,
      higherHave,
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

// Tıklanan maddeyle ilişkili TÜM maddeleri bulur: yukarı doğru (bunu kullanan
// üst maddeler, kök ürüne kadar) ve aşağı doğru (bunun tarifindeki malzemeler,
// ham maddelere kadar). Odak modunda ağaçta sadece bu küme gösterilir.
function computeFocusSet(id, results) {
  const set = new Set([id]);

  const upQueue = [id];
  while (upQueue.length) {
    const cur = upQueue.shift();
    const node = results[cur];
    if (!node) continue;
    (node.usedBy || []).forEach((pid) => {
      if (!set.has(pid)) {
        set.add(pid);
        upQueue.push(pid);
      }
    });
  }

  const downQueue = [id];
  while (downQueue.length) {
    const cur = downQueue.shift();
    const item = getItem(cur);
    if (item.recipe) {
      item.recipe.ingredients.forEach((ing) => {
        if (!set.has(ing.item)) {
          set.add(ing.item);
          downQueue.push(ing.item);
        }
      });
    }
  }

  return set;
}

function sectionOf(node) {
  if (node.isRaw) return "raw";
  return node.tier || "craftable";
}

const SECTION_ORDER = ["raw", "craftable", "elixir", "mid", "final"];

function renderCard(node, allResults) {
  const s = t();
  const wrap = document.createElement("div");
  wrap.className = "node" + (focusId === node.id ? " focused" : "");
  wrap.dataset.item = node.id;

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
  } else {
    const methodBadge = document.createElement("span");
    methodBadge.className = "badge method " + (node.masteryApplies ? "method-tool" : "method-simple");
    methodBadge.textContent = node.masteryApplies ? s.methodTool(skill) : s.methodSimple(skill);
    row.appendChild(methodBadge);

    if (node.batches) {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = skill === "alchemy" && mastery > 0 && node.masteryApplies
        ? s.batchesBadgeMastery(node.batches, node.producedQty)
        : s.batchesBadge(node.batches, node.producedQty);
      row.appendChild(badge);
    }
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

  if (node.isElixir) {
    const higherWrap = document.createElement("div");
    higherWrap.className = "stock-input stock-input-higher";
    const higherLabel = document.createElement("label");
    higherLabel.textContent = s.inStockHigher;
    higherLabel.title = s.higherGradeHint(HIGHER_GRADE_RATIO);
    const higherInput = document.createElement("input");
    higherInput.type = "number";
    higherInput.min = "0";
    higherInput.step = "1";
    higherInput.dataset.item = node.id;
    higherInput.value = stockHigh[node.id] || 0;
    higherInput.className = "stock-field-higher";
    higherInput.title = s.higherGradeHint(HIGHER_GRADE_RATIO);
    higherWrap.appendChild(higherLabel);
    higherWrap.appendChild(higherInput);
    row.appendChild(higherWrap);
  }

  wrap.appendChild(row);

  if (item.recipe && item.recipe.ingredients.length > 0 && node.batches > 0) {
    const ingredientsWrap = document.createElement("div");
    ingredientsWrap.className = "ingredients-list";
    const ingredientsLabel = document.createElement("div");
    ingredientsLabel.className = "note-text ingredients-label";
    ingredientsLabel.textContent = `🧪 ${s.ingredientsLabel}`;
    ingredientsWrap.appendChild(ingredientsLabel);

    item.recipe.ingredients.forEach((ing) => {
      const ingResult = allResults[ing.item];
      const ingName = ingResult ? nameFor(ingResult).primary : nameFor(getItem(ing.item)).primary;
      const neededHere = node.batches * ing.qty;
      const ingMissing = ingResult ? ingResult.missing : 0;
      const line = document.createElement("div");
      line.className = "ingredient-line" + (ingMissing > 0 ? " missing" : " satisfied");
      line.textContent = s.ingredientLine(ingName, neededHere, ingMissing);
      ingredientsWrap.appendChild(line);
    });

    wrap.appendChild(ingredientsWrap);
  }

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

  if (!node.isRaw && !node.masteryApplies && skill === "alchemy" && mastery > 0) {
    const masteryNote = document.createElement("div");
    masteryNote.className = "note-text";
    masteryNote.textContent = `⚠ ${s.simpleAlchemyNote}`;
    wrap.appendChild(masteryNote);
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

  // Odak (tıklanan madde) artık bu ağaçta yoksa (hedef/meslek değişti) temizle.
  if (focusId && !results[focusId]) focusId = null;
  const focusSet = focusId ? computeFocusSet(focusId, results) : null;

  updateFocusChip();

  const query = funnelQuery.trim().toLocaleLowerCase(lang);
  function matchesQuery(node) {
    if (!query) return true;
    const { primary, secondary } = nameFor(node);
    return primary.toLocaleLowerCase(lang).includes(query) ||
      (secondary && secondary.toLocaleLowerCase(lang).includes(query));
  }

  const filteredSections = {};
  SECTION_ORDER.forEach((sec) => {
    const items = (bySection[sec] || []).filter((node) =>
      (!focusSet || focusSet.has(node.id)) && matchesQuery(node)
    );
    if (items.length > 0) filteredSections[sec] = items;
  });

  const activeSections = SECTION_ORDER.filter((sec) => filteredSections[sec]);
  main.classList.toggle("has-results", Object.values(bySection).some((arr) => arr.length > 0));

  if (activeSections.length === 0) {
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.textContent = s.noResults;
    tree.appendChild(noResults);
    return;
  }

  activeSections.forEach((sec, idx) => {
    const items = filteredSections[sec];

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

  const byTier = { final: [], mid: [], elixir: [], craftable: [] };
  Object.entries(RECIPES.items).forEach(([id, item]) => {
    if (!item.recipe) return; // sadece üretilebilen maddeler seçilebilir
    if ((item.skill || "alchemy") !== skill) return; // sadece seçili meslekteki hedefler
    const tier = item.tier || "craftable";
    if (!byTier[tier]) byTier[tier] = [];
    byTier[tier].push({ id, item });
  });

  const s = t();
  ["final", "mid", "elixir", "craftable"].forEach((tier) => {
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
  document.getElementById("funnelSearch").placeholder = s.funnelSearchPlaceholder;
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

function updateFocusChip() {
  const chip = document.getElementById("focusChip");
  if (!focusId) {
    chip.hidden = true;
    chip.textContent = "";
    return;
  }
  const s = t();
  chip.hidden = false;
  chip.textContent = s.focusChip(nameFor(getItem(focusId)).primary);
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
  focusId = null;
  funnelQuery = "";
  document.getElementById("funnelSearch").value = "";
  render();
}

function init() {
  document.getElementById("masteryInput").value = mastery;
  applyStaticText();
  populateSelect(false);

  document.getElementById("itemSelect").addEventListener("change", () => {
    focusId = null;
    funnelQuery = "";
    document.getElementById("funnelSearch").value = "";
    render();
  });
  document.getElementById("targetQty").addEventListener("input", render);
  document.getElementById("itemSearch").addEventListener("input", (e) => {
    filterSelectOptions(e.target.value);
    render();
  });
  document.getElementById("funnelSearch").addEventListener("input", (e) => {
    funnelQuery = e.target.value;
    render();
  });
  document.getElementById("focusChip").addEventListener("click", () => {
    focusId = null;
    render();
  });
  document.getElementById("tree").addEventListener("click", (e) => {
    if (e.target.closest(".stock-input")) return;
    const card = e.target.closest(".node");
    if (!card) return;
    const id = card.dataset.item;
    focusId = focusId === id ? null : id;
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
    const isBase = e.target.classList.contains("stock-field");
    const isHigher = e.target.classList.contains("stock-field-higher");
    if (isBase || isHigher) {
      const id = e.target.dataset.item;
      const cls = isBase ? "stock-field" : "stock-field-higher";
      const selStart = e.target.selectionStart;
      const scrollY = window.scrollY;
      const val = Math.max(0, parseInt(e.target.value, 10) || 0);
      if (isBase) {
        stock[id] = val;
        saveStock();
      } else {
        stockHigh[id] = val;
        saveStockHigh();
      }
      render();

      // Tüm liste yeniden çizildiği için düzenlenmekte olan input'un
      // focus/cursor/scroll konumunu geri yüklüyoruz.
      const restored = document.querySelector(`input.${cls}[data-item="${CSS.escape(id)}"]`);
      if (restored) {
        restored.focus();
        try { restored.setSelectionRange(selStart, selStart); } catch (err) { /* no-op */ }
      }
      window.scrollTo(0, scrollY);
    }
  });

  document.getElementById("resetStockBtn").addEventListener("click", () => {
    stock = {};
    stockHigh = {};
    saveStock();
    saveStockHigh();
    render();
  });

  render();
}

document.addEventListener("DOMContentLoaded", init);
