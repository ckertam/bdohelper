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
const SELECTED_ITEM_KEY = "bdohelper_selected_item_v1";
const TARGET_QTY_KEY = "bdohelper_target_qty_v1";
const VIEW_KEY = "bdohelper_view_v1";
const EXPANDED_KEY = "bdohelper_expanded_v1";
const CHECKED_KEY = "bdohelper_checked_v1";

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
let selectedItems = loadSelectedItems();
// Odak zinciri: sırayla tıklanan maddeler. Bir madde, o an odaklanılmış
// maddenin ALTINDAKİ bir malzemeyse zincire eklenir (kapsam daha da daralır,
// ör. Elixir of Wind -> Wise Man's Blood); değilse zincir o maddeyle sıfırdan
// başlar. focusId her zaman zincirdeki en derin (son) maddedir.
let focusChain = [];
let focusId = null; // türetilir: focusChain[focusChain.length - 1] ya da null
// En son render()'da hesaplanan, odaktaki en derin maddenin kapsamındaki
// (kendisi + tüm alt malzemeleri) id kümesi. Bir sonraki tıklamanın zincire
// eklenip eklenmeyeceğine (mevcut odağın altında mı) karar vermek için kullanılır.
let lastFocusDeepestIds = new Set();
let funnelQuery = ""; // birleşik arama metni (huni/tablo/çekmece bağlama göre yönlenir)
let onlyMissing = false; // "SADECE EKSİKLER" filtresi
let view = loadView(); // "funnel" | "table"
let expandedIds = loadExpanded(); // genişletilmiş satır id'leri
let checkedIds = loadChecked(); // toplama listesinde işaretli id'ler
let drawerOpen = false;
let targetEditorOpen = false;
let activeScreen = "main"; // "main" (huni/tablo) | "gather"
let stockCommitTimer = null;

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

function loadSelectedItems() {
  try {
    const raw = localStorage.getItem(SELECTED_ITEM_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveSelectedItem(sk, itemId) {
  try {
    selectedItems[sk] = itemId;
    localStorage.setItem(SELECTED_ITEM_KEY, JSON.stringify(selectedItems));
  } catch (e) {
    /* no-op */
  }
}

function loadTargetQty() {
  try {
    const raw = parseInt(localStorage.getItem(TARGET_QTY_KEY), 10);
    return Number.isFinite(raw) && raw > 0 ? raw : 10;
  } catch (e) {
    return 10;
  }
}

function saveTargetQty(qty) {
  try {
    localStorage.setItem(TARGET_QTY_KEY, String(qty));
  } catch (e) {
    /* no-op */
  }
}

function loadView() {
  try {
    const raw = localStorage.getItem(VIEW_KEY);
    return raw === "table" ? "table" : "funnel";
  } catch (e) {
    return "funnel";
  }
}

function saveView() {
  try {
    localStorage.setItem(VIEW_KEY, view);
  } catch (e) {
    /* no-op */
  }
}

function loadExpanded() {
  try {
    const raw = localStorage.getItem(EXPANDED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch (e) {
    return new Set();
  }
}

function saveExpanded() {
  try {
    localStorage.setItem(EXPANDED_KEY, JSON.stringify([...expandedIds]));
  } catch (e) {
    /* no-op */
  }
}

function loadChecked() {
  try {
    const raw = localStorage.getItem(CHECKED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch (e) {
    return new Set();
  }
}

function saveChecked() {
  try {
    localStorage.setItem(CHECKED_KEY, JSON.stringify([...checkedIds]));
  } catch (e) {
    /* no-op */
  }
}

const STRINGS = {
  tr: {
    title: "BDO Helper",
    subtitleFor: (sk) => (sk === "cooking" ? "Aşçılık ham madde hesaplayıcısı" : "Simya (Alchemy) ham madde hesaplayıcısı"),
    skillLabel: "Meslek",
    skillNames: { alchemy: "Simya", cooking: "Aşçılık" },
    skillTagLabel: { alchemy: "SİMYA", cooking: "AŞÇILIK" },
    whatToMake: "Ne üretmek istiyorsun?",
    searchPlaceholder: "Ürün ara...",
    howMany: "Adet",
    masteryLabel: "Simya Mastery",
    masteryHint: (pct) => (pct > 0 ? `+%${formatPct(pct)} max şansı` : ""),
    calcBtn: "HESAPLA",
    noTarget: "Hedef seç",
    progressLabel: "İLERLEME",
    progressSub: (done, total) => `${done} / ${total} malzeme tamam`,
    searchPlaceholderGlobal: "Malzeme veya ürün ara — / ile odaklan",
    searchResultCount: (n) => `${n} SONUÇ`,
    viewFunnel: "HUNİ",
    viewTable: "TABLO",
    onlyMissingBtn: "SADECE EKSİKLER",
    gatherBtn: "TOPLAMA LİSTESİ",
    stockDrawerBtn: "STOK GİR",
    resetStock: "SIFIRLA",
    drawerTitle: "TOPLU STOK GİRİŞİ",
    drawerSearchPlaceholder: "Malzeme ara...",
    focusLabel: "ODAK",
    focusScope: (n) => `— sadece bu dalın ihtiyacı gösteriliyor (${n} adet için)`,
    clearFocus: "ODAĞI KALDIR ✕",
    noResults: "Eşleşen madde yok.",
    noResultsFooter: (n) => `Eşleşmeyen ${n} kalem gizlendi — `,
    showAll: "tümünü göster",
    legendMissing: "Eksik / toplaman gereken — kırmızı sayı",
    legendOk: "Elindeki stok yeterli — ✓",
    legendRaw: "Ham madde — üretilmez, toplanır/satın alınır",
    reqShort: (n) => `${n} gerekli`,
    haveShort: (n) => `${n} elimde`,
    batchesBadge: (n, out) => `${n}× üretim → ${out} adet`,
    batchesBadgeMastery: (n, out) => `${n}× üretim → ~${out} adet, Mastery dahil`,
    totalRequired: "Toplam gerekli",
    missing: (n) => `${n} eksik`,
    sufficient: "yeterli",
    inStock: "Elimde",
    simpleAlchemyNote: "Basit Kimya ile yapılır: Simya Mastery bu ürünün miktarını artırmaz.",
    inStockHigher: "Üst kalite (Adv/Endless) elimde",
    higherGradeHint: (ratio) => `1 üst kalite = ${ratio} adet`,
    methodSimple: (sk) => (sk === "cooking" ? "Basit Yemek" : "Basit Kimya"),
    methodTool: (sk) => (sk === "cooking" ? "Aşçılık Aleti" : "Kimya Aleti"),
    ingredientsLabel: "Malzemeler",
    ingredientLine: (name, perCraft, needed, missing) => (
      missing > 0
        ? `${name}: 1 üretim için ${perCraft} adet — toplam ${needed} gerekli (${missing} eksik)`
        : `${name}: 1 üretim için ${perCraft} adet — toplam ${needed} gerekli (yeterli)`
    ),
    usedIn: "Kullanıldığı yer(ler):",
    colName: "MALZEME", colTier: "KADEME", colReq: "GEREKLİ", colHave: "ELİMDE",
    colMiss: "EKSİK", colCraft: "ÜRETİM", colProgress: "İLERLEME",
    tierFilterAll: "TÜMÜ",
    gatherTitle: "Toplama listesi",
    gatherSubFor: (name, qty, n) => `${name} × ${qty} için eksik ${n} kalem`,
    groupGather: "TOPLANACAK / AVLANACAK",
    groupBuy: "PAZARDAN / NPC'DEN ALINACAK",
    itemsCount: (n) => `${n} kalem`,
    copyBtn: "KOPYALA",
    backBtn: "AĞACA DÖN",
    costLabel: "TAHMİNİ PAZAR MALİYETİ",
    silverUnit: "gümüş",
    footer: 'Veriler <a href="https://bdocodex.com" target="_blank" rel="noopener">bdocodex.com</a> kaynak alınarak hazırlanmıştır. Oyun içi güncellemelerle miktarlar değişebilir.',
    sections: {
      final: "ANA ÜRÜN",
      mid: "ÖZ İKSİR",
      elixir: "İKSİR",
      craftable: "REAKTİF / KRİSTAL",
      raw: "HAM MADDE"
    },
    craftableLabelFor: (sk) => (sk === "cooking" ? "AŞÇILIK ÜRÜNÜ" : "REAKTİF / KRİSTAL")
  },
  en: {
    title: "BDO Helper",
    subtitleFor: (sk) => (sk === "cooking" ? "Cooking raw-material calculator" : "Alchemy raw-material calculator"),
    skillLabel: "Profession",
    skillNames: { alchemy: "Alchemy", cooking: "Cooking" },
    skillTagLabel: { alchemy: "ALCHEMY", cooking: "COOKING" },
    whatToMake: "What do you want to craft?",
    searchPlaceholder: "Search item...",
    howMany: "Qty",
    masteryLabel: "Alchemy Mastery",
    masteryHint: (pct) => (pct > 0 ? `+${formatPct(pct)}% max chance` : ""),
    calcBtn: "CALCULATE",
    noTarget: "Pick a target",
    progressLabel: "PROGRESS",
    progressSub: (done, total) => `${done} / ${total} materials done`,
    searchPlaceholderGlobal: "Search materials or products — press / to focus",
    searchResultCount: (n) => `${n} RESULTS`,
    viewFunnel: "FUNNEL",
    viewTable: "TABLE",
    onlyMissingBtn: "MISSING ONLY",
    gatherBtn: "GATHER LIST",
    stockDrawerBtn: "ENTER STOCK",
    resetStock: "RESET",
    drawerTitle: "BULK STOCK ENTRY",
    drawerSearchPlaceholder: "Search materials...",
    focusLabel: "FOCUS",
    focusScope: (n) => `— showing only this branch's needs (for ${n})`,
    clearFocus: "CLEAR FOCUS ✕",
    noResults: "No matching items.",
    noResultsFooter: (n) => `${n} non-matching items hidden — `,
    showAll: "show all",
    legendMissing: "Missing / need to gather — red number",
    legendOk: "You have enough — ✓",
    legendRaw: "Raw material — gather/hunt/buy",
    reqShort: (n) => `${n} needed`,
    haveShort: (n) => `${n} owned`,
    batchesBadge: (n, out) => `${n}× craft → ${out} units`,
    batchesBadgeMastery: (n, out) => `${n}× craft → ~${out} units, Mastery incl.`,
    totalRequired: "Total required",
    missing: (n) => `${n} missing`,
    sufficient: "sufficient",
    inStock: "In stock",
    simpleAlchemyNote: "Made via Simple Alchemy: Alchemy Mastery does not increase this item's yield.",
    inStockHigher: "Higher-grade (Adv/Endless) owned",
    higherGradeHint: (ratio) => `1 higher-grade = ${ratio} units`,
    methodSimple: (sk) => (sk === "cooking" ? "Simple Cooking" : "Simple Alchemy"),
    methodTool: (sk) => (sk === "cooking" ? "Cooking Utensil" : "Alchemy Tool"),
    ingredientsLabel: "Ingredients",
    ingredientLine: (name, perCraft, needed, missing) => (
      missing > 0
        ? `${name}: ${perCraft} per craft — ${needed} total needed (${missing} missing)`
        : `${name}: ${perCraft} per craft — ${needed} total needed (sufficient)`
    ),
    usedIn: "Used in:",
    colName: "MATERIAL", colTier: "TIER", colReq: "NEEDED", colHave: "OWNED",
    colMiss: "MISSING", colCraft: "CRAFT", colProgress: "PROGRESS",
    tierFilterAll: "ALL",
    gatherTitle: "Gathering list",
    gatherSubFor: (name, qty, n) => `${n} items missing for ${name} × ${qty}`,
    groupGather: "TO GATHER / HUNT",
    groupBuy: "TO BUY (MARKET / NPC)",
    itemsCount: (n) => `${n} items`,
    copyBtn: "COPY",
    backBtn: "BACK TO TREE",
    costLabel: "ESTIMATED MARKET COST",
    silverUnit: "silver",
    footer: 'Data sourced from <a href="https://bdocodex.com" target="_blank" rel="noopener">bdocodex.com</a>. Quantities may change with game updates.',
    sections: {
      final: "FINAL PRODUCT",
      mid: "DRAUGHT",
      elixir: "ELIXIR",
      craftable: "REAGENT / CRYSTAL",
      raw: "RAW MATERIAL"
    },
    craftableLabelFor: (sk) => (sk === "cooking" ? "COOKING PRODUCT" : "REAGENT / CRYSTAL")
  }
};

function t() {
  return STRINGS[lang];
}

function formatPct(n) {
  return lang === "tr" ? String(n).replace(".", ",") : String(n);
}

function nameFor(item) {
  const primary = lang === "tr" ? item.name_tr : item.name_en;
  const secondary = lang === "tr" ? item.name_en : item.name_tr;
  return { primary: primary || secondary || "?", secondary: secondary || "" };
}

// Simya reçetelerinin bir kısmı "Basit Kimya" ile (Alet gerekmeden, L tuşu
// İşleme menüsünden, başka iksirleri BİRLEŞTİREREK) yapılır; bu üretimler
// Simya Mastery'den ETKİLENMEZ. Bunlar bizim veride "mid" (5 Öz İksir: Fury/
// Adaptation/Potential/Corruption/Berserk Draught) ve "final" (Harmony
// Draught) kademesindeki maddeler — hepsi başka iksirleri + katalizörü
// birleştiren tariflerdir (bdocodex/BDO wiki'de doğrulandı: bu 5+1 tarif
// açıkça "Simple Alchemy" olarak listeleniyor). Tek bir iksir/reaktif/kristal
// üretmek (bizim "elixir" ve "craftable" kademeleri) ise ham maddelerden
// gerçek bir Kimya Aleti ile yapılır ve Mastery ürün miktarını artırır.
function isSimpleAlchemyRecipe(item) {
  return item.tier === "mid" || item.tier === "final";
}

// bdocodex/oyun içi Mastery tablosu aslında bir "üretim miktarı çarpanı"
// DEĞİL — "+Chance for Max" (o üretimin RNG aralığından MAKSİMUM sonucu
// alma şansı) ifade eder (bkz. bdocodex "Alchemy Mastery" tablosu / GrumpyG
// rehberi: "62.50% +Chance for Max"). Bu yüzden sabit/tek çıktılı (RNG
// aralığı notu olmayan, ör. Sonsuzluk Kristalleri) tariflerde Mastery'nin
// üretim miktarına hiçbir etkisi yoktur — artıracak bir "maksimum" yoktur.
// RNG aralıklı (ör. "1-4 adet") tariflerde ise beklenen değer, minimum ile
// maksimum arasında bu şansa göre enterpole edilir.
function getRngRange(item) {
  const note = (item.note_tr || "") + " " + (item.note_en || "");
  const match = note.match(/(\d+)\s*-\s*(\d+)/);
  if (!match) return null;
  return { min: parseInt(match[1], 10), max: parseInt(match[2], 10) };
}

function getItem(id) {
  const item = RECIPES.items[id];
  if (!item) {
    return { name_tr: id, name_en: id, recipe: null, note: "Tanımsız madde." };
  }
  return item;
}

// Hedeflenen kök madde + miktardan yola çıkarak tüm ağacı hesaplar.
// masteryPct: Simya Mastery'nin bdocodex tablosundaki "+Chance for Max"
// değeri (%) — RNG aralıklı tariflerde o aralığın maksimumunu alma şansı.
// Sadece BİLGİ amaçlı "çıkar" tahmininde kullanılır; malzeme ihtiyacı
// (batches) her zaman garanti minimuma göre hesaplanır (bkz. aşağıda).
function computeAll(rootId, targetQty, masteryPct) {
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
    const rngRange = item.recipe ? getRngRange(item) : null;
    const hasYieldBonus = masteryApplies && !!rngRange;
    let batches = 0;
    let producedQty = 0;

    if (item.recipe && missing > 0) {
      // Mastery, RNG aralıklı (ör. 1-4) tariflerde o aralığın MAKSİMUMUNU
      // alma şansını artırır ("+Chance for Max" — düz bir çarpan değildir),
      // bu yüzden beklenen (ortalama) çıktı min ile max arasında bu şansa
      // göre enterpole edilir. Kaç kez üretim yapman gerektiği (batches) —
      // dolayısıyla alt malzeme ihtiyacı — bu GERÇEKÇİ ortalamaya göre
      // hesaplanır (aksi halde ör. 15000 adet gerekirken tarifin garanti
      // minimumuna göre 15000 kez üretim + Mastery bonusuyla 43000 adet gibi
      // gereksiz bir fazlalık çıkar). Sabit/tek çıktılı tariflerde (artıracak
      // bir "maksimum" olmadığından) Mastery'nin hiçbir etkisi yoktur.
      const expectedOutputQty = hasYieldBonus
        ? rngRange.min + (masteryPct / 100) * (rngRange.max - rngRange.min)
        : item.recipe.output_qty;
      batches = Math.ceil(missing / expectedOutputQty);
      producedQty = Math.round(batches * expectedOutputQty);
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
      hasYieldBonus,
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
// "down" kümesi (odaklanan madde + onun altındaki tüm malzemeler) ayrıca
// döndürülür: bu maddeler için render() tüm ağacın toplam ihtiyacı yerine
// SADECE odaklanan maddenin kendi ihtiyacına göre yeniden hesaplanmış
// (aynı hammaddeyi paylaşan diğer dallardan etkilenmeyen) rakamlar gösterir.
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

  const down = new Set([id]);
  const downQueue = [id];
  while (downQueue.length) {
    const cur = downQueue.shift();
    const item = getItem(cur);
    if (item.recipe) {
      item.recipe.ingredients.forEach((ing) => {
        if (!down.has(ing.item)) {
          down.add(ing.item);
          downQueue.push(ing.item);
        }
        set.add(ing.item);
      });
    }
  }

  return { all: set, down };
}

function sectionOf(node) {
  if (node.isRaw) return "raw";
  return node.tier || "craftable";
}

const SECTION_ORDER = ["raw", "craftable", "elixir", "mid", "final"];

// ═══════════════════════════════════════════════════════════════════════════
// Render katmanı — buradan itibaren SADECE sunum/DOM. Yukarıdaki hesap motoru
// (computeAll, computeFocusSet, getMasteryBonusPercent, getRngRange,
// isSimpleAlchemyRecipe) ve localStorage load/save fonksiyonları değişmez.
// ═══════════════════════════════════════════════════════════════════════════

function sectionLabel(tier, sk) {
  const s = t();
  return tier === "craftable" ? s.craftableLabelFor(sk) : (s.sections[tier] || tier);
}

function shortenSource(text) {
  if (!text) return "";
  const priceMatch = text.match(/([\d.,]+)\s*(?:gümüş|silver)/i);
  const firstClause = text.split(/[.;]/)[0].split(",")[0].trim();
  if (priceMatch) return `${firstClause} · ${priceMatch[1]} ${t().silverUnit}`;
  return firstClause;
}

function looksPurchased(text) {
  return /satın|gümüş|npc|pazar|silver|market/i.test(text || "");
}

// Huni görünümündeki satırın ikinci (meta) satırı: üretilebilir maddede
// üretim/verim özeti, ham maddede kaynak ya da "X gerekli [· Y elimde]".
function computeRowMeta(node) {
  const s = t();
  if (node.isRaw) {
    const source = lang === "tr" ? node.source_tr : node.source_en;
    if (source && looksPurchased(source)) return shortenSource(source);
    const { secondary } = nameFor(node);
    let m = secondary ? `${secondary} · ${s.reqShort(node.required)}` : s.reqShort(node.required);
    if (node.have > 0) m += ` · ${s.haveShort(node.have)}`;
    return m;
  }
  if (node.batches > 0) {
    return (skill === "alchemy" && mastery > 0 && node.hasYieldBonus)
      ? s.batchesBadgeMastery(node.batches, node.producedQty)
      : s.batchesBadge(node.batches, node.producedQty);
  }
  return node.masteryApplies ? s.methodTool(skill) : s.methodSimple(skill);
}

// ── Render modeli: saf veri, DOM'a dokunmaz ────────────────────────────────

function computeRenderModel() {
  const itemSelect = document.getElementById("itemSelect");
  const targetQty = parseInt(document.getElementById("targetQty").value, 10) || 0;
  const selectedId = itemSelect.value;
  if (!selectedId || targetQty <= 0) return null;

  const masteryPct = skill === "alchemy" ? getMasteryBonusPercent(mastery) : 0;
  const results = computeAll(selectedId, targetQty, masteryPct);

  focusChain = focusChain.filter((id) => results[id]);
  focusId = focusChain.length ? focusChain[focusChain.length - 1] : null;

  // Odak zincirindeki her adım, bir öncekinin kendi gerekli miktarını kök
  // alarak yeniden hesaplanır — böylece art arda daraltmalar, aynı
  // hammaddeyi kullanan alakasız başka dallardan etkilenmeyen bir cevap verir.
  let focusSet = null;
  const levelResultsList = [];
  if (focusChain.length) {
    focusSet = computeFocusSet(focusChain[0], results);
    let prevResults = results;
    focusChain.forEach((id) => {
      const req = prevResults[id] ? prevResults[id].required : 0;
      const lvl = computeAll(id, req, masteryPct);
      levelResultsList.push(lvl);
      prevResults = lvl;
    });
  }
  lastFocusDeepestIds = levelResultsList.length
    ? new Set(Object.keys(levelResultsList[levelResultsList.length - 1]))
    : new Set();

  function resultsMapFor(id) {
    for (let i = levelResultsList.length - 1; i >= 0; i--) {
      if (levelResultsList[i][id]) return levelResultsList[i];
    }
    return results;
  }

  const displayIds = focusSet
    ? new Set([
      ...[...focusSet.all].filter((id) => !focusSet.down.has(id)),
      ...focusChain,
      ...lastFocusDeepestIds
    ])
    : null;

  const query = funnelQuery.trim().toLocaleLowerCase(lang);
  function matchesQuery(node) {
    if (!query) return true;
    const { primary, secondary } = nameFor(node);
    return primary.toLocaleLowerCase(lang).includes(query) ||
      (secondary && secondary.toLocaleLowerCase(lang).includes(query));
  }

  const bySection = {};
  const allNodes = [];
  Object.keys(results).forEach((id) => {
    const node = resultsMapFor(id)[id];
    allNodes.push(node);
    const sec = sectionOf(node);
    if (!bySection[sec]) bySection[sec] = [];
    bySection[sec].push(node);
  });

  const baseVisible = (nodes) => nodes.filter((n) =>
    (!displayIds || displayIds.has(n.id)) && (!onlyMissing || n.missing > 0));

  let baseCount = 0;
  let matchedCount = 0;
  const sections = SECTION_ORDER.map((tier) => {
    const base = baseVisible(bySection[tier] || []);
    baseCount += base.length;
    const nodes = base.filter(matchesQuery)
      .sort((a, b) => nameFor(a).primary.localeCompare(nameFor(b).primary, lang));
    matchedCount += nodes.length;
    return { tier, nodes };
  }).filter((s) => s.nodes.length > 0);

  const hiddenByQuery = query ? Math.max(0, baseCount - matchedCount) : 0;

  const doneCount = Object.values(results).filter((n) => n.missing === 0).length;
  const totalCount = Object.keys(results).length;

  return {
    results, resultsMapFor, sections, query, hiddenByQuery,
    selectedId, targetQty, masteryPct,
    rootNode: results[selectedId],
    doneCount, totalCount,
    progressPct: totalCount ? Math.round((doneCount / totalCount) * 100) : 0
  };
}

// ── Satır DOM inşası (huni + tablo ortak parçaları) ────────────────────────

function buildStepper(node, isHigher) {
  const wrap = document.createElement("div");
  wrap.className = "stepper" + (isHigher ? " higher" : "");
  const minus = document.createElement("button");
  minus.type = "button";
  minus.textContent = "−";
  minus.dataset.dir = "-1";
  const input = document.createElement("input");
  input.type = "number";
  input.min = "0";
  input.step = "1";
  input.dataset.item = node.id;
  input.className = isHigher ? "stock-field-higher" : "stock-field";
  input.value = isHigher ? (stockHigh[node.id] || 0) : (stock[node.id] || 0);
  input.title = isHigher ? `${t().inStockHigher} (${t().higherGradeHint(HIGHER_GRADE_RATIO)})` : t().inStock;
  const plus = document.createElement("button");
  plus.type = "button";
  plus.textContent = "+";
  plus.dataset.dir = "1";
  wrap.appendChild(minus);
  wrap.appendChild(input);
  wrap.appendChild(plus);
  return wrap;
}

function buildDetailPanel(node, allResults) {
  const s = t();
  const item = getItem(node.id);
  const wrap = document.createElement("div");
  wrap.className = "row-detail";

  if (item.recipe && item.recipe.ingredients.length > 0 && node.batches > 0) {
    const label = document.createElement("div");
    label.className = "rd-title";
    label.textContent = s.ingredientsLabel;
    wrap.appendChild(label);
    item.recipe.ingredients.forEach((ing) => {
      const ingResult = allResults[ing.item];
      const ingName = ingResult ? nameFor(ingResult).primary : nameFor(getItem(ing.item)).primary;
      const neededHere = node.batches * ing.qty;
      const ingHave = ingResult ? ingResult.have : 0;
      const ingMissing = Math.max(0, neededHere - ingHave);
      const line = document.createElement("div");
      line.className = "rd-line " + (ingMissing > 0 ? "miss" : "ok");
      line.textContent = s.ingredientLine(ingName, ing.qty, neededHere, ingMissing);
      wrap.appendChild(line);
    });
  }

  if (node.usedBy && node.usedBy.length > 0) {
    const usedByNames = node.usedBy
      .map((pid) => (allResults[pid] ? nameFor(allResults[pid]).primary : pid))
      .join(", ");
    const div = document.createElement("div");
    div.className = "rd-line";
    div.textContent = `${s.usedIn} ${usedByNames}`;
    wrap.appendChild(div);
  }

  const source = lang === "tr" ? node.source_tr : node.source_en;
  const note = lang === "tr" ? node.note_tr : node.note_en;
  if (source) {
    const div = document.createElement("div");
    div.className = "rd-line";
    div.textContent = source;
    wrap.appendChild(div);
  }
  if (note) {
    const div = document.createElement("div");
    div.className = "rd-line";
    div.textContent = note;
    wrap.appendChild(div);
  }
  if (!node.isRaw && !node.masteryApplies && skill === "alchemy" && mastery > 0) {
    const div = document.createElement("div");
    div.className = "rd-line miss";
    div.textContent = s.simpleAlchemyNote;
    wrap.appendChild(div);
  }

  if (!wrap.childElementCount) {
    const div = document.createElement("div");
    div.className = "rd-line";
    div.textContent = "—";
    wrap.appendChild(div);
  }

  return wrap;
}

function highlightMatch(text, query) {
  if (!query) return document.createTextNode(text);
  const idx = text.toLocaleLowerCase(lang).indexOf(query);
  if (idx === -1) return document.createTextNode(text);
  const frag = document.createDocumentFragment();
  frag.appendChild(document.createTextNode(text.slice(0, idx)));
  const mark = document.createElement("mark");
  mark.textContent = text.slice(idx, idx + query.length);
  frag.appendChild(mark);
  frag.appendChild(document.createTextNode(text.slice(idx + query.length)));
  return frag;
}

function buildFunnelRow(node, allResults, query) {
  const s = t();
  const item = getItem(node.id);
  const row = document.createElement("div");
  row.className = "row" + (focusId === node.id ? " focused" : "");
  row.dataset.item = node.id;

  const hit = document.createElement("div");
  hit.className = "row-hit";
  hit.setAttribute("role", "button");
  hit.tabIndex = 0;
  if (item.icon) {
    const icon = document.createElement("img");
    icon.className = "row-icon";
    icon.src = item.icon;
    icon.alt = "";
    icon.loading = "lazy";
    hit.appendChild(icon);
  }
  const text = document.createElement("div");
  text.className = "row-text";
  const nameEl = document.createElement("div");
  nameEl.className = "row-name";
  const { primary } = nameFor(node);
  nameEl.appendChild(highlightMatch(primary, query));
  const metaEl = document.createElement("div");
  metaEl.className = "row-meta";
  metaEl.textContent = computeRowMeta(node);
  text.appendChild(nameEl);
  text.appendChild(metaEl);
  hit.appendChild(text);
  row.appendChild(hit);

  const status = document.createElement("span");
  status.className = "row-status " + (node.missing > 0 ? "miss" : "ok");
  status.textContent = node.missing > 0 ? String(node.missing) : "✓";
  row.appendChild(status);

  if (!node.isRaw) {
    row.appendChild(buildStepper(node, false));
    if (node.isElixir) row.appendChild(buildStepper(node, true));
  } else {
    row.appendChild(buildStepper(node, false));
  }

  const expandBtn = document.createElement("button");
  expandBtn.type = "button";
  expandBtn.className = "row-expand";
  expandBtn.textContent = expandedIds.has(node.id) ? "▴" : "▾";
  row.appendChild(expandBtn);

  const wrapper = document.createDocumentFragment();
  wrapper.appendChild(row);
  if (expandedIds.has(node.id)) {
    wrapper.appendChild(buildDetailPanel(node, allResults));
  }
  return wrapper;
}

// ── Huni görünümü ───────────────────────────────────────────────────────

function paintFunnel(model) {
  const view = document.getElementById("funnelView");
  view.innerHTML = "";
  const s = t();

  if (!model.sections.length) {
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.textContent = s.noResults;
    view.appendChild(noResults);
    return;
  }

  model.sections.forEach(({ tier, nodes }) => {
    const col = document.createElement("div");
    col.className = "col";
    const head = document.createElement("div");
    head.className = "col-head";
    const title = document.createElement("span");
    title.className = "col-title";
    title.textContent = sectionLabel(tier, skill);
    const count = document.createElement("span");
    count.className = "col-count";
    count.textContent = String(nodes.length);
    head.appendChild(title);
    head.appendChild(count);
    col.appendChild(head);

    const rows = document.createElement("div");
    rows.className = "col-rows";
    nodes.forEach((node) => {
      rows.appendChild(buildFunnelRow(node, model.resultsMapFor(node.id), model.query));
    });
    col.appendChild(rows);
    view.appendChild(col);
  });

  if (model.hiddenByQuery > 0) {
    const footer = document.createElement("div");
    footer.className = "no-results-footer";
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = s.showAll;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      setSearch("");
    });
    footer.textContent = s.noResultsFooter(model.hiddenByQuery);
    footer.appendChild(link);
    view.appendChild(footer);
  }
}

// ── Tablo görünümü ──────────────────────────────────────────────────────

let tableTierFilter = "all";

function buildTableRow(node, allResults, query) {
  const s = t();
  const item = getItem(node.id);
  const row = document.createElement("div");
  row.className = "table-row" + (focusId === node.id ? " focused" : "");
  row.dataset.item = node.id;

  const nameCell = document.createElement("span");
  nameCell.className = "td-name row-hit";
  nameCell.setAttribute("role", "button");
  nameCell.tabIndex = 0;
  if (item.icon) {
    const icon = document.createElement("img");
    icon.className = "row-icon";
    icon.src = item.icon;
    icon.alt = "";
    icon.loading = "lazy";
    nameCell.appendChild(icon);
  }
  const nameSpan = document.createElement("span");
  nameSpan.className = "row-name";
  const { primary, secondary } = nameFor(node);
  nameSpan.appendChild(highlightMatch(primary, query));
  nameCell.appendChild(nameSpan);
  if (secondary) {
    const enSpan = document.createElement("span");
    enSpan.className = "row-meta";
    enSpan.style.marginLeft = "6px";
    enSpan.textContent = secondary;
    nameCell.appendChild(enSpan);
  }
  row.appendChild(nameCell);

  const tierCell = document.createElement("span");
  tierCell.className = "td-tier";
  tierCell.textContent = sectionLabel(sectionOf(node), skill);
  row.appendChild(tierCell);

  const reqCell = document.createElement("span");
  reqCell.className = "td-req";
  reqCell.textContent = String(node.required);
  row.appendChild(reqCell);

  const haveCell = document.createElement("span");
  haveCell.className = "td-have";
  const haveInput = document.createElement("input");
  haveInput.type = "number";
  haveInput.min = "0";
  haveInput.dataset.item = node.id;
  haveInput.className = "stock-field";
  haveInput.value = stock[node.id] || 0;
  haveCell.appendChild(haveInput);
  row.appendChild(haveCell);

  const missCell = document.createElement("span");
  missCell.className = "td-miss";
  missCell.style.color = node.missing > 0 ? "var(--color-accent)" : "var(--color-dim-2)";
  missCell.textContent = node.missing > 0 ? String(node.missing) : "✓";
  row.appendChild(missCell);

  const craftCell = document.createElement("span");
  craftCell.className = "td-craft";
  craftCell.textContent = node.isRaw ? "—" : computeRowMeta(node);
  row.appendChild(craftCell);

  const pctCell = document.createElement("span");
  pctCell.className = "td-pct";
  const pct = node.required > 0 ? Math.min(100, Math.round((node.have / node.required) * 100)) : 100;
  const track = document.createElement("span");
  track.className = "pct-track";
  const fill = document.createElement("span");
  fill.className = "pct-fill";
  fill.style.width = pct + "%";
  track.appendChild(fill);
  const pctText = document.createElement("span");
  pctText.className = "pct-text";
  pctText.textContent = "%" + pct;
  pctCell.appendChild(track);
  pctCell.appendChild(pctText);
  row.appendChild(pctCell);

  return row;
}

function paintTable(model) {
  const s = t();
  const head = document.getElementById("tableHead");
  head.innerHTML = "";
  [
    ["th-name", s.colName], ["th-tier", s.colTier], ["th-req", s.colReq],
    ["th-have", s.colHave], ["th-miss", s.colMiss], ["th-craft", s.colCraft], ["th-pct", s.colProgress]
  ].forEach(([cls, text]) => {
    const span = document.createElement("span");
    span.className = cls;
    span.textContent = text;
    head.appendChild(span);
  });

  const tierFilterEl = document.getElementById("tierFilter");
  tierFilterEl.innerHTML = "";
  const allBtn = document.createElement("button");
  allBtn.type = "button";
  allBtn.className = "seg-opt" + (tableTierFilter === "all" ? " active" : "");
  allBtn.textContent = s.tierFilterAll;
  allBtn.dataset.tier = "all";
  tierFilterEl.appendChild(allBtn);
  SECTION_ORDER.forEach((tier) => {
    if (!model.sections.some((sec) => sec.tier === tier)) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "seg-opt" + (tableTierFilter === tier ? " active" : "");
    btn.textContent = sectionLabel(tier, skill);
    btn.dataset.tier = tier;
    tierFilterEl.appendChild(btn);
  });

  const rowsEl = document.getElementById("tableRows");
  rowsEl.innerHTML = "";
  let nodes = model.sections
    .filter((sec) => tableTierFilter === "all" || sec.tier === tableTierFilter)
    .flatMap((sec) => sec.nodes);
  nodes = nodes.slice().sort((a, b) => b.missing - a.missing);

  const footer = document.getElementById("tableFooter");
  if (!nodes.length) {
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.textContent = s.noResults;
    rowsEl.appendChild(noResults);
    footer.hidden = true;
  } else {
    nodes.forEach((node) => {
      rowsEl.appendChild(buildTableRow(node, model.resultsMapFor(node.id), model.query));
    });
    if (model.hiddenByQuery > 0) {
      footer.hidden = false;
      footer.innerHTML = "";
      footer.appendChild(document.createTextNode(s.noResultsFooter(model.hiddenByQuery)));
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = s.showAll;
      link.addEventListener("click", (e) => { e.preventDefault(); setSearch(""); });
      footer.appendChild(link);
    } else {
      footer.hidden = true;
    }
  }
}

// ── Odak breadcrumb ─────────────────────────────────────────────────────

function paintFocusBar(model) {
  const bar = document.getElementById("focusBar");
  bar.innerHTML = "";
  if (!focusChain.length) {
    bar.hidden = true;
    return;
  }
  const s = t();
  bar.hidden = false;

  const label = document.createElement("span");
  label.className = "fb-label";
  label.textContent = s.focusLabel;
  bar.appendChild(label);

  focusChain.forEach((id, i) => {
    if (i > 0) {
      const sep = document.createElement("span");
      sep.className = "fb-sep";
      sep.textContent = "›";
      bar.appendChild(sep);
    }
    const crumb = document.createElement("button");
    crumb.type = "button";
    crumb.className = "fb-crumb" + (i === focusChain.length - 1 ? " active" : "");
    crumb.dataset.level = i;
    crumb.textContent = nameFor(getItem(id)).primary;
    bar.appendChild(crumb);
  });

  const rootReq = model.results[focusChain[0]] ? model.results[focusChain[0]].required : 0;
  const scope = document.createElement("span");
  scope.className = "fb-scope";
  scope.textContent = s.focusScope(rootReq);
  bar.appendChild(scope);

  bar.appendChild(document.createElement("span")).style.flex = "1";

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "btn btn-ghost";
  clearBtn.id = "focusClearBtn";
  clearBtn.textContent = s.clearFocus;
  bar.appendChild(clearBtn);
}

// ── Hedef özeti (targetBar) ─────────────────────────────────────────────

function paintTargetBar(model) {
  const s = t();
  const tag = document.getElementById("skillTag");
  tag.textContent = s.skillTagLabel[skill];
  tag.className = "tb-skill-tag" + (skill === "cooking" ? " cooking" : "");

  const iconEl = document.getElementById("tsIcon");
  const titleEl = document.getElementById("tsTitle");
  const metaEl = document.getElementById("tsMeta");
  const progressWrap = document.getElementById("tbProgress");

  if (!model) {
    iconEl.hidden = true;
    titleEl.textContent = s.noTarget;
    metaEl.textContent = "";
    progressWrap.hidden = true;
    return;
  }

  const item = getItem(model.selectedId);
  if (item.icon) {
    iconEl.src = item.icon;
    iconEl.hidden = false;
  } else {
    iconEl.hidden = true;
  }
  const { primary, secondary } = nameFor(item);
  titleEl.textContent = `${primary} × ${model.targetQty}`;
  const masteryHint = skill === "alchemy" ? updateMasteryHintText() : "";
  metaEl.textContent = [secondary, skill === "alchemy" ? `Mastery ${mastery}${masteryHint ? " (" + masteryHint + ")" : ""}` : null]
    .filter(Boolean).join(" · ");

  progressWrap.hidden = false;
  document.getElementById("progLabel").textContent = s.progressLabel;
  document.getElementById("progPct").textContent = "%" + model.progressPct;
  document.getElementById("progFill").style.width = model.progressPct + "%";
  document.getElementById("progSub").textContent = s.progressSub(model.doneCount, model.totalCount);
}

// ── Ana repaint orkestrasyonu ───────────────────────────────────────────

function repaint() {
  if (activeScreen === "gather") {
    paintGather();
    return;
  }
  document.getElementById("gatherView").hidden = true;
  const model = computeRenderModel();
  paintTargetBar(model);
  document.getElementById("funnelView").hidden = view !== "funnel";
  document.getElementById("tableView").hidden = view !== "table";
  if (!model) {
    document.getElementById("funnelView").innerHTML = "";
    document.getElementById("tableRows").innerHTML = "";
    paintFocusBar({ results: {} });
    return;
  }
  paintFocusBar(model);
  if (view === "funnel") paintFunnel(model);
  else paintTable(model);
  if (drawerOpen) paintDrawer();
}

function setSearch(value) {
  funnelQuery = value;
  const input = document.getElementById("globalSearch");
  if (input.value !== value) input.value = value;
  document.getElementById("searchBox").classList.toggle("active", !!value);
  if (drawerOpen) paintDrawer();
  else repaint();
}

// ── Toplu stok çekmecesi ────────────────────────────────────────────────

function buildDrawerRow(id, item) {
  const { primary, secondary } = nameFor(item);
  const row = document.createElement("div");
  row.className = "drawer-row";
  if (item.icon) {
    const icon = document.createElement("img");
    icon.className = "row-icon";
    icon.src = item.icon;
    icon.alt = "";
    icon.loading = "lazy";
    row.appendChild(icon);
  }
  const name = document.createElement("span");
  name.className = "row-name";
  name.textContent = secondary ? `${primary} · ${secondary}` : primary;
  row.appendChild(name);
  row.appendChild(buildStepper({ id, isElixir: false }, false));
  if (item.tier === "elixir") {
    row.appendChild(buildStepper({ id, isElixir: true }, true));
  }
  return row;
}

function paintDrawer() {
  const s = t();
  const listEl = document.getElementById("stockDrawerList");
  listEl.innerHTML = "";

  const query = funnelQuery.trim().toLocaleLowerCase(lang);
  const byTier = {};
  Object.entries(RECIPES.items).forEach(([id, item]) => {
    if ((item.skill || "alchemy") !== skill) return;
    const { primary, secondary } = nameFor(item);
    const matches = !query ||
      primary.toLocaleLowerCase(lang).includes(query) ||
      (secondary && secondary.toLocaleLowerCase(lang).includes(query));
    if (!matches) return;
    const tier = item.tier || "craftable";
    if (!byTier[tier]) byTier[tier] = [];
    byTier[tier].push({ id, item });
  });

  const activeTiers = SECTION_ORDER.filter((tier) => byTier[tier] && byTier[tier].length);
  if (!activeTiers.length) {
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.textContent = s.noResults;
    listEl.appendChild(noResults);
    return;
  }

  activeTiers.forEach((tier) => {
    const group = document.createElement("div");
    group.className = "drawer-group";
    const h3 = document.createElement("h3");
    h3.textContent = sectionLabel(tier, skill);
    group.appendChild(h3);
    byTier[tier]
      .sort((a, b) => nameFor(a.item).primary.localeCompare(nameFor(b.item).primary, lang))
      .forEach(({ id, item }) => group.appendChild(buildDrawerRow(id, item)));
    listEl.appendChild(group);
  });
}

function openDrawer() {
  drawerOpen = true;
  document.getElementById("stockDrawer").hidden = false;
  const backdrop = document.getElementById("drawerBackdrop");
  // Backdrop sadece komuta çubuğunun ALTINDAKİ alanı kaplar, böylece paylaşılan
  // arama kutusu (shell içinde) çekmece açıkken de tıklanabilir/odaklanabilir kalır.
  backdrop.style.top = document.getElementById("shell").getBoundingClientRect().bottom + "px";
  backdrop.hidden = false;
  document.getElementById("drawerTitle").textContent = t().drawerTitle;
  document.getElementById("globalSearch").placeholder = t().drawerSearchPlaceholder;
  paintDrawer();
}

function closeDrawer() {
  drawerOpen = false;
  document.getElementById("stockDrawer").hidden = true;
  document.getElementById("drawerBackdrop").hidden = true;
  document.getElementById("globalSearch").placeholder = t().searchPlaceholderGlobal;
  setSearch("");
}

// ── Toplama listesi ekranı ──────────────────────────────────────────────

function parseSilverPrice(text) {
  if (!text) return null;
  const m = text.match(/([\d.,]+)\s*(?:gümüş|silver)/i);
  if (!m) return null;
  const n = parseFloat(m[1].replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function paintGather() {
  const s = t();
  document.getElementById("funnelView").hidden = true;
  document.getElementById("tableView").hidden = true;
  const gv = document.getElementById("gatherView");
  gv.hidden = false;
  gv.innerHTML = "";

  const model = computeRenderModel();
  paintTargetBar(model);
  document.getElementById("focusBar").hidden = true;

  const head = document.createElement("div");
  head.className = "gv-head";
  const titleWrap = document.createElement("div");
  titleWrap.style.flex = "1";
  const title = document.createElement("div");
  title.className = "gv-title";
  title.textContent = s.gatherTitle;
  const sub = document.createElement("div");
  sub.className = "gv-sub";
  titleWrap.appendChild(title);
  titleWrap.appendChild(sub);
  head.appendChild(titleWrap);
  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "btn";
  copyBtn.textContent = s.copyBtn;
  head.appendChild(copyBtn);
  const backBtn = document.createElement("button");
  backBtn.type = "button";
  backBtn.className = "btn btn-dark";
  backBtn.textContent = s.backBtn;
  backBtn.addEventListener("click", () => { activeScreen = "main"; repaint(); });
  head.appendChild(backBtn);
  gv.appendChild(head);

  if (!model) {
    sub.textContent = "";
    return;
  }
  const { primary } = nameFor(getItem(model.selectedId));
  const raws = Object.values(model.results).filter((n) => n.isRaw && n.missing > 0);
  sub.textContent = s.gatherSubFor(primary, model.targetQty, raws.length);

  const groups = [
    { key: "gather", title: s.groupGather, nodes: raws.filter((n) => !looksPurchased(lang === "tr" ? n.source_tr : n.source_en)) },
    { key: "buy", title: s.groupBuy, nodes: raws.filter((n) => looksPurchased(lang === "tr" ? n.source_tr : n.source_en)) }
  ].filter((g) => g.nodes.length);

  let totalCost = 0;
  const copyLines = [];

  groups.forEach((g) => {
    const gh = document.createElement("div");
    gh.className = "gv-group-head";
    const gt = document.createElement("span");
    gt.className = "g-title";
    gt.textContent = g.title;
    const gm = document.createElement("span");
    gm.className = "g-meta";
    gm.textContent = s.itemsCount(g.nodes.length);
    gh.appendChild(gt);
    gh.appendChild(gm);
    gv.appendChild(gh);

    g.nodes.forEach((node) => {
      const item = getItem(node.id);
      const done = checkedIds.has(node.id);
      const row = document.createElement("div");
      row.className = "gv-row";
      row.dataset.item = node.id;

      const check = document.createElement("button");
      check.type = "button";
      check.className = "gv-check" + (done ? " checked" : "");
      check.textContent = done ? "✓" : "";
      row.appendChild(check);

      if (item.icon) {
        const icon = document.createElement("img");
        icon.className = "row-icon";
        icon.src = item.icon;
        icon.alt = "";
        row.appendChild(icon);
      }

      const textWrap = document.createElement("div");
      textWrap.className = "gv-row-text";
      const nameEl = document.createElement("div");
      nameEl.className = "gv-row-name" + (done ? " done" : "");
      nameEl.textContent = nameFor(node).primary;
      const srcEl = document.createElement("div");
      srcEl.className = "gv-row-src";
      srcEl.textContent = (lang === "tr" ? node.source_tr : node.source_en) || "";
      textWrap.appendChild(nameEl);
      textWrap.appendChild(srcEl);
      row.appendChild(textWrap);

      const qtyWrap = document.createElement("div");
      qtyWrap.className = "gv-row-qty";
      const big = document.createElement("div");
      big.className = "q-big";
      big.style.color = done ? "var(--color-dim-2)" : "var(--color-accent)";
      big.textContent = done ? "✓" : String(node.missing);
      const of = document.createElement("div");
      of.className = "q-of";
      of.textContent = `${node.have} / ${node.required}`;
      qtyWrap.appendChild(big);
      qtyWrap.appendChild(of);
      row.appendChild(qtyWrap);

      gv.appendChild(row);

      const price = parseSilverPrice(lang === "tr" ? node.source_tr : node.source_en);
      if (price && !done) totalCost += price * node.missing;

      copyLines.push(`${done ? "[x]" : "[ ]"} ${nameFor(node).primary} — ${node.missing}/${node.required}`);
    });
  });

  copyBtn.addEventListener("click", () => {
    const text = copyLines.join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  });

  if (totalCost > 0) {
    const costRow = document.createElement("div");
    costRow.className = "gv-cost";
    const label = document.createElement("span");
    label.className = "gc-label";
    label.textContent = s.costLabel;
    const value = document.createElement("span");
    value.className = "gc-value";
    value.textContent = `${Math.round(totalCost).toLocaleString(lang === "tr" ? "tr-TR" : "en-US")} ${s.silverUnit}`;
    costRow.appendChild(label);
    costRow.appendChild(value);
    gv.appendChild(costRow);
  }

  if (!groups.length) {
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.textContent = s.noResults;
    gv.appendChild(noResults);
  }
}

// ── Hedef seçici (populate/filter) ──────────────────────────────────────

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

  ["final", "mid", "elixir", "craftable"].forEach((tier) => {
    const group = byTier[tier];
    if (!group || group.length === 0) return;
    const optgroup = document.createElement("optgroup");
    optgroup.label = sectionLabel(tier, skill);
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

  const restoreValue = prevValue || selectedItems[skill];
  if (restoreValue && RECIPES.items[restoreValue] && (RECIPES.items[restoreValue].skill || "alchemy") === skill) {
    itemSelect.value = restoreValue;
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

// ── Statik metinler / dil-meslek uygulaması ─────────────────────────────

function applyStaticText() {
  const s = t();
  const subtitle = s.subtitleFor(skill);
  document.title = `${s.title} — ${subtitle}`;
  document.documentElement.lang = lang;

  document.getElementById("skillLabel").textContent = s.skillLabel;
  document.getElementById("whatToMakeLabel").textContent = s.whatToMake;
  document.getElementById("itemSearch").placeholder = s.searchPlaceholder;
  document.getElementById("howManyLabel").textContent = s.howMany;
  document.getElementById("masteryLabel").textContent = s.masteryLabel;
  document.getElementById("masteryGroup").style.display = skill === "alchemy" ? "" : "none";
  document.getElementById("targetEditorClose").textContent = s.calcBtn;

  document.getElementById("globalSearch").placeholder = drawerOpen ? s.drawerSearchPlaceholder : s.searchPlaceholderGlobal;
  document.querySelector('[data-view="funnel"]').textContent = s.viewFunnel;
  document.querySelector('[data-view="table"]').textContent = s.viewTable;
  document.getElementById("onlyMissingBtn").textContent = s.onlyMissingBtn;
  document.getElementById("gatherBtn").textContent = s.gatherBtn;
  document.getElementById("stockDrawerBtn").textContent = s.stockDrawerBtn;
  document.getElementById("resetStockBtn").textContent = s.resetStock;

  document.getElementById("legendMissing").textContent = s.legendMissing;
  document.getElementById("legendOk").textContent = s.legendOk;
  document.getElementById("legendRaw").textContent = s.legendRaw;
  document.getElementById("footerText").innerHTML = s.footer;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  document.querySelectorAll(".skill-btn").forEach((btn) => {
    btn.textContent = s.skillNames[btn.dataset.skill] || btn.dataset.skill;
    btn.classList.toggle("active", btn.dataset.skill === skill);
  });
  document.querySelectorAll('[data-view]').forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });
}

function updateMasteryHintText() {
  const s = t();
  const pct = Math.round(getMasteryBonusPercent(mastery) * 10) / 10;
  const text = s.masteryHint(pct);
  document.getElementById("masteryHint").textContent = text;
  return text;
}

function setLang(newLang) {
  if (newLang !== "tr" && newLang !== "en") return;
  lang = newLang;
  saveLang();
  applyStaticText();
  populateSelect(true);
  document.getElementById("itemSearch").value = "";
  repaint();
}

function setSkill(newSkill) {
  if (newSkill !== "alchemy" && newSkill !== "cooking") return;
  skill = newSkill;
  saveSkill();
  applyStaticText();
  populateSelect(false);
  document.getElementById("itemSearch").value = "";
  focusChain = [];
  setSearch("");
  tableTierFilter = "all";
  repaint();
}

function openTargetEditor() {
  targetEditorOpen = true;
  document.getElementById("targetEditor").hidden = false;
}

function closeTargetEditor() {
  targetEditorOpen = false;
  document.getElementById("targetEditor").hidden = true;
}

// ── Stok değişimi: debounce'lu commit, in-place repaint ─────────────────

function setStockValue(id, isHigher, value) {
  const val = Math.max(0, value | 0);
  if (isHigher) stockHigh[id] = val;
  else stock[id] = val;
  scheduleStockCommit();
}

function scheduleStockCommit() {
  if (stockCommitTimer) clearTimeout(stockCommitTimer);
  stockCommitTimer = setTimeout(() => {
    stockCommitTimer = null;
    saveStock();
    saveStockHigh();
    requestAnimationFrame(repaint);
  }, 150);
}

function handleStockInput(e) {
  const isBase = e.target.classList.contains("stock-field");
  const isHigher = e.target.classList.contains("stock-field-higher");
  if (!isBase && !isHigher) return;
  const id = e.target.dataset.item;
  const val = Math.max(0, parseInt(e.target.value, 10) || 0);
  if (isHigher) stockHigh[id] = val;
  else stock[id] = val;
  scheduleStockCommit();
}

function handleStepperClick(e) {
  const btn = e.target.closest(".stepper button");
  if (!btn) return;
  const stepper = btn.closest(".stepper");
  const input = stepper.querySelector("input");
  const id = input.dataset.item;
  const isHigher = input.classList.contains("stock-field-higher");
  const magnitude = e.shiftKey ? 10 : (e.altKey ? 100 : 1);
  const dir = parseInt(btn.dataset.dir, 10);
  const current = isHigher ? (stockHigh[id] || 0) : (stock[id] || 0);
  const next = Math.max(0, current + dir * magnitude);
  input.value = next;
  setStockValue(id, isHigher, next);
}

// ── Odaklanma / genişletme tıklama mantığı ──────────────────────────────

function handleRowClick(e, container) {
  if (e.target.closest(".stepper")) { handleStepperClick(e); return; }

  const expandBtn = e.target.closest(".row-expand");
  if (expandBtn) {
    const row = expandBtn.closest(".row, .table-row");
    const id = row.dataset.item;
    if (expandedIds.has(id)) expandedIds.delete(id);
    else expandedIds.add(id);
    saveExpanded();
    repaint();
    return;
  }

  const hit = e.target.closest(".row-hit");
  if (!hit) return;
  const row = hit.closest(".row, .table-row");
  if (!row) return;
  const id = row.dataset.item;

  // Odaklanınca ağaç aramasını temizle: aksi halde arama metniyle eşleşmeyen
  // ata/alt maddeler (odağın "geçmişi") gizli kalmaya devam eder.
  setSearch("");

  const idx = focusChain.indexOf(id);
  if (idx !== -1) {
    // Zincirde zaten var. En derindeki (o an odaklı) maddeyse tıklamak bir
    // "seçimi kaldır" hareketi: bir kademe geri döner (tek maddeyse odağı
    // tamamen kapatır). Ara bir kademeyse breadcrumb'daki aynı maddeye
    // tıklamakla birebir aynıdır: doğrudan o kademeye atlar.
    focusChain = idx === focusChain.length - 1 ? focusChain.slice(0, idx) : focusChain.slice(0, idx + 1);
  } else if (focusChain.length > 0 && lastFocusDeepestIds.has(id)) {
    // Mevcut odağın KENDİ kapsamındaki bir malzeme: kapsamı daha da daralt.
    focusChain.push(id);
  } else {
    // Alakasız ya da üst bir madde: odağı bu maddeyle sıfırdan başlat.
    focusChain = [id];
  }
  repaint();
}

// ── init ──────────────────────────────────────────────────────────────

function init() {
  document.getElementById("masteryInput").value = mastery;
  document.getElementById("targetQty").value = loadTargetQty();
  applyStaticText();
  populateSelect(false);
  updateMasteryHintText();

  document.getElementById("itemSelect").addEventListener("change", (e) => {
    saveSelectedItem(skill, e.target.value);
    focusChain = [];
    setSearch("");
    repaint();
  });
  document.getElementById("targetQty").addEventListener("input", (e) => {
    const qty = parseInt(e.target.value, 10);
    if (Number.isFinite(qty) && qty > 0) saveTargetQty(qty);
    repaint();
  });
  document.getElementById("itemSearch").addEventListener("input", (e) => {
    filterSelectOptions(e.target.value);
  });
  document.getElementById("masteryInput").addEventListener("input", (e) => {
    mastery = Math.max(0, Math.min(3000, parseInt(e.target.value, 10) || 0));
    saveMastery();
    updateMasteryHintText();
    repaint();
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
  document.querySelectorAll(".skill-btn").forEach((btn) => {
    btn.addEventListener("click", () => setSkill(btn.dataset.skill));
  });
  document.getElementById("skillTag").addEventListener("click", () => {
    setSkill(skill === "alchemy" ? "cooking" : "alchemy");
  });

  document.getElementById("targetSummary").addEventListener("click", () => {
    targetEditorOpen ? closeTargetEditor() : openTargetEditor();
  });
  document.getElementById("targetEditorClose").addEventListener("click", () => {
    closeTargetEditor();
    repaint();
  });

  document.getElementById("globalSearch").addEventListener("input", (e) => {
    setSearch(e.target.value);
  });
  document.getElementById("searchClear").addEventListener("click", () => {
    setSearch("");
    document.getElementById("globalSearch").blur();
  });

  document.querySelectorAll('[data-view]').forEach((btn) => {
    btn.addEventListener("click", () => {
      view = btn.dataset.view;
      saveView();
      document.querySelectorAll('[data-view]').forEach((b) => b.classList.toggle("active", b === btn));
      repaint();
    });
  });

  document.getElementById("onlyMissingBtn").addEventListener("click", (e) => {
    onlyMissing = !onlyMissing;
    e.currentTarget.classList.toggle("btn-primary", onlyMissing);
    repaint();
  });

  document.getElementById("gatherBtn").addEventListener("click", () => {
    activeScreen = activeScreen === "gather" ? "main" : "gather";
    repaint();
  });

  document.getElementById("stockDrawerBtn").addEventListener("click", openDrawer);
  document.getElementById("drawerClose").addEventListener("click", closeDrawer);
  document.getElementById("drawerBackdrop").addEventListener("click", closeDrawer);
  document.getElementById("stockDrawerList").addEventListener("input", handleStockInput);
  document.getElementById("stockDrawerList").addEventListener("click", (e) => handleStepperClick(e));

  document.getElementById("resetStockBtn").addEventListener("click", () => {
    stock = {};
    stockHigh = {};
    saveStock();
    saveStockHigh();
    repaint();
  });

  document.getElementById("focusBar").addEventListener("click", (e) => {
    if (e.target.id === "focusClearBtn" || e.target.closest("#focusClearBtn")) {
      focusChain = [];
      repaint();
      return;
    }
    const crumb = e.target.closest(".fb-crumb");
    if (crumb) {
      const level = parseInt(crumb.dataset.level, 10);
      focusChain = focusChain.slice(0, level + 1);
      setSearch("");
      repaint();
    }
  });

  document.getElementById("funnelView").addEventListener("click", (e) => handleRowClick(e, "funnel"));
  document.getElementById("funnelView").addEventListener("input", handleStockInput);
  document.getElementById("tableRows").addEventListener("click", (e) => handleRowClick(e, "table"));
  document.getElementById("tableRows").addEventListener("input", handleStockInput);
  document.getElementById("tierFilter").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tier]");
    if (!btn) return;
    tableTierFilter = btn.dataset.tier;
    repaint();
  });
  document.getElementById("gatherView").addEventListener("click", (e) => {
    const check = e.target.closest(".gv-check");
    if (!check) return;
    const row = check.closest(".gv-row");
    const id = row.dataset.item;
    const model = computeRenderModel();
    if (!model) return;
    if (checkedIds.has(id)) {
      checkedIds.delete(id);
    } else {
      checkedIds.add(id);
      const node = model.results[id];
      if (node) {
        stock[id] = node.required;
        saveStock();
      }
    }
    saveChecked();
    paintGather();
  });

  // Klavye kısayolları: "/" arama kutusuna odaklan, Esc temizle+bırak,
  // Enter ilk sonuca odaklan.
  document.addEventListener("keydown", (e) => {
    const active = document.activeElement;
    const inField = active && /^(INPUT|SELECT|TEXTAREA)$/.test(active.tagName);
    if (e.key === "/" && !inField) {
      e.preventDefault();
      document.getElementById("globalSearch").focus();
    } else if (e.key === "Escape" && active && active.id === "globalSearch") {
      setSearch("");
      active.blur();
    } else if (e.key === "Enter" && active && active.id === "globalSearch") {
      const model = computeRenderModel();
      if (model && model.query) {
        const firstMatch = model.sections.flatMap((s) => s.nodes)[0];
        if (firstMatch) {
          focusChain = [firstMatch.id];
          setSearch("");
          repaint();
        }
      }
    }
  });

  repaint();
}

document.addEventListener("DOMContentLoaded", init);
