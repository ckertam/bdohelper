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
const DONE_COLLAPSED_KEY = "bdohelper_done_collapsed_v1";
const SORT_OVERRIDE_KEY = "bdohelper_sort_v1";
const UNDO_KEY = "bdohelper_undo_v1";
const MONEY_COLLAPSED_KEY = "bdohelper_money_collapsed_v1";
const COUNT_MONEY_KEY = "bdohelper_count_money_v1";

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
let doneCollapsed = loadDoneCollapsed(); // "TAMAMLANDI" bölümü katlı mı
let tableSortOverride = loadSortOverride(); // {col, dir} | null — tablo başlığına tıklayarak özel sıralama
let moneyCollapsed = loadMoneyCollapsed(); // toplama listesinde "PARAYLA ÇÖZÜLÜR" katlı mı
let countMoney = loadCountMoney(); // "PARAYLA ÇÖZÜLENLERİ SAY" — kapalıyken unlimited kalemler ilerlemeye katılmaz
let undoStack = loadUndoStack();
let redoStack = [];
let undoToastTimer = null;
let stockFocusValue = null; // {id, field, from} — bir stok input'una odaklanıldığı andaki değer (blur'da geri al kaydı için)
let drawerQuery = ""; // çekmecenin KENDİ arama metni (kabuktan bağımsız, SPEC (1).md §6)
let drawerChip = null; // "missing" | "raw" | "entered" | null
// Bir önceki render'da her maddenin GERÇEK (donmamış) blok üyeliği ("missing"|"done").
// Bir stok input'u odaktayken o maddenin blok konumu bu haritadaki değerde donar
// (yazarken satır sıçramaz), blur'da hemen gerçek değere döner.
let lastBlockState = new Map();

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

function loadDoneCollapsed() {
  try {
    return localStorage.getItem(DONE_COLLAPSED_KEY) === "1";
  } catch (e) {
    return false;
  }
}

function saveDoneCollapsed() {
  try {
    localStorage.setItem(DONE_COLLAPSED_KEY, doneCollapsed ? "1" : "0");
  } catch (e) {
    /* no-op */
  }
}

function loadSortOverride() {
  try {
    const raw = localStorage.getItem(SORT_OVERRIDE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveSortOverride() {
  try {
    if (tableSortOverride) localStorage.setItem(SORT_OVERRIDE_KEY, JSON.stringify(tableSortOverride));
    else localStorage.removeItem(SORT_OVERRIDE_KEY);
  } catch (e) {
    /* no-op */
  }
}

function loadMoneyCollapsed() {
  try {
    return localStorage.getItem(MONEY_COLLAPSED_KEY) === "1";
  } catch (e) {
    return false;
  }
}

function saveMoneyCollapsed() {
  try {
    localStorage.setItem(MONEY_COLLAPSED_KEY, moneyCollapsed ? "1" : "0");
  } catch (e) {
    /* no-op */
  }
}

function loadCountMoney() {
  try {
    const raw = localStorage.getItem(COUNT_MONEY_KEY);
    return raw === null ? true : raw === "1";
  } catch (e) {
    return true;
  }
}

function saveCountMoney() {
  try {
    localStorage.setItem(COUNT_MONEY_KEY, countMoney ? "1" : "0");
  } catch (e) {
    /* no-op */
  }
}

function loadUndoStack() {
  try {
    const raw = localStorage.getItem(UNDO_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

function saveUndoStack() {
  try {
    localStorage.setItem(UNDO_KEY, JSON.stringify(undoStack.slice(-50)));
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
    craftableLabelFor: (sk) => (sk === "cooking" ? "AŞÇILIK ÜRÜNÜ" : "REAKTİF / KRİSTAL"),
    missingSuffix: (n) => `−${formatQty(n)} eksik`,
    higherBadge: (n, converted) => `+${formatQty(n)} Adv (${formatQty(converted)})`,
    higherNormalLabel: "NORMAL",
    higherAdvLabel: "ADVANCED / ENDLESS",
    higherConverted: (n) => `= ${formatQty(n)} normal`,
    higherHelpText: (ratio) => `1 üst kalite (Adv/Endless) = ${ratio} normal adet.`,
    altCount: (n) => `${n} ALTERNATİF`,
    altSectionTitle: "YERİNE KULLANILABİLİR",
    altSuffix: (n) => `+${formatQty(n)} ikameden`,
    doneCollapsedLabel: (n) => `TAMAMLANDI · ${n} KALEM`,
    sortResetBtn: "EKSİKLER ÜSTTE",
    drawerFilterMissing: "SADECE EKSİKLER",
    drawerFilterRaw: "SADECE HAM",
    drawerFilterEntered: "GİRİLENLER",
    countMoneyBtn: "PARAYLA ÇÖZÜLENLERİ SAY",
    moneyGroupTitle: "PARAYLA ÇÖZÜLÜR",
    priceSourceLabel: { market: "Pazar", npc: "NPC", guild: "Lonca" },
    priceEstimated: "TAHMİNİ",
    priceUpdatedNote: (date) => `Fiyatlar ${date} itibarıyla`,
    undoRestored: "GERİ ALINDI",
    redoBtn: "YENİDEN UYGULA",
    gotoRow: "SATIRA GİT →"
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
    craftableLabelFor: (sk) => (sk === "cooking" ? "COOKING PRODUCT" : "REAGENT / CRYSTAL"),
    missingSuffix: (n) => `-${formatQty(n)} missing`,
    higherBadge: (n, converted) => `+${formatQty(n)} Adv (${formatQty(converted)})`,
    higherNormalLabel: "NORMAL",
    higherAdvLabel: "ADVANCED / ENDLESS",
    higherConverted: (n) => `= ${formatQty(n)} normal`,
    higherHelpText: (ratio) => `1 higher-grade (Adv/Endless) = ${ratio} normal units.`,
    altCount: (n) => `${n} ALTERNATIVE`,
    altSectionTitle: "CAN BE SUBSTITUTED WITH",
    altSuffix: (n) => `+${formatQty(n)} from substitutes`,
    doneCollapsedLabel: (n) => `DONE · ${n} ITEMS`,
    sortResetBtn: "MISSING FIRST",
    drawerFilterMissing: "MISSING ONLY",
    drawerFilterRaw: "RAW ONLY",
    drawerFilterEntered: "ENTERED",
    countMoneyBtn: "COUNT MONEY-SOLVABLE",
    moneyGroupTitle: "SOLVABLE WITH MONEY",
    priceSourceLabel: { market: "Market", npc: "NPC", guild: "Guild" },
    priceEstimated: "ESTIMATED",
    priceUpdatedNote: (date) => `Prices as of ${date}`,
    undoRestored: "UNDONE",
    redoBtn: "REDO",
    gotoRow: "GO TO ROW →"
  }
};

function t() {
  return STRINGS[lang];
}

function formatPct(n) {
  return lang === "tr" ? String(n).replace(".", ",") : String(n);
}

function formatQty(n) {
  return (n || 0).toLocaleString(lang === "tr" ? "tr-TR" : "en-US");
}

// DATA.md §2: price her zaman elle güncellenen bir TAHMİNİ, hiçbir yerde
// "kesin fiyat" denmez. g/m/b kısaltmalı gösterim.
function formatSilver(n) {
  const v = Math.round(n || 0);
  if (v < 1000000) return formatQty(v) + " g";
  if (v < 1000000000) {
    const m = (v / 1000000).toFixed(2);
    return (lang === "tr" ? m.replace(".", ",") : m) + " m";
  }
  const b = (v / 1000000000).toFixed(2);
  return (lang === "tr" ? b.replace(".", ",") : b) + " b";
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

// ── İkame malzemeler (DATA.md §1, SPEC §4c) — SADECE sunum katmanı ─────────
// data.js'te henüz hiçbir kalemde `substitutes` alanı yok; bu yüzden bu
// fonksiyonlar bugün her zaman boş/etkisiz sonuç döner. Kullanıcı ileride
// veriyi eklediğinde kod değişikliği gerekmeden çalışır.

let _substituteGroupsCache = null;

// item.substitutes tek yönlü yazılsa da (A -> B) iki yönlü (A<->B) ve geçişli
// (A<->B, B<->C ⇒ A<->C) çalışır: kenarları BFS ile gezip her üyenin grubun
// rastgele bir "kök" üyesine göre oranını (factor) buluyoruz — 1 kök = factor[x]
// adet x. Varsayılan oran 1:1; {id, ratio} verilirse ratio = "1 sahibi madde
// için gereken bu ikameden adet" (DATA.md örneği: 2 kurt kanı = 1 tilki kanı).
function getSubstituteGroups() {
  if (_substituteGroupsCache) return _substituteGroupsCache;
  const groups = new Map();
  const adj = {};
  function addEdge(a, b, ratio) {
    if (!RECIPES.items[a] || !RECIPES.items[b]) return;
    if (!adj[a]) adj[a] = [];
    if (!adj[b]) adj[b] = [];
    adj[a].push({ id: b, perOne: ratio });
    adj[b].push({ id: a, perOne: 1 / ratio });
  }
  Object.entries(RECIPES.items).forEach(([id, item]) => {
    if (!item.substitutes) return;
    item.substitutes.forEach((sub) => {
      const subId = typeof sub === "string" ? sub : (sub && sub.id);
      const ratio = typeof sub === "string" ? 1 : (sub && sub.ratio) || 1;
      if (subId) addEdge(id, subId, ratio);
    });
  });

  const visited = new Set();
  Object.keys(adj).forEach((rootId) => {
    if (visited.has(rootId)) return;
    const factor = { [rootId]: 1 };
    visited.add(rootId);
    const queue = [rootId];
    while (queue.length) {
      const cur = queue.shift();
      (adj[cur] || []).forEach((edge) => {
        if (!visited.has(edge.id)) {
          visited.add(edge.id);
          factor[edge.id] = factor[cur] * edge.perOne;
          queue.push(edge.id);
        }
      });
    }
    const memberIds = Object.keys(factor);
    if (memberIds.length < 2) return;
    let nameTr = null;
    let nameEn = null;
    let key = null;
    memberIds.forEach((id) => {
      const item = RECIPES.items[id];
      if (item && item.substituteGroup && !nameTr && !nameEn) {
        nameTr = item.substituteGroup.name_tr || null;
        nameEn = item.substituteGroup.name_en || null;
        key = item.substituteGroup.key || null;
      }
    });
    if (!nameTr && !nameEn) {
      const first = RECIPES.items[memberIds[0]];
      nameTr = first.name_tr || null;
      nameEn = first.name_en || null;
    }
    const groupObj = { members: memberIds.map((id) => ({ id, factor: factor[id] })), nameTr, nameEn, key };
    memberIds.forEach((id) => groups.set(id, groupObj));
  });

  _substituteGroupsCache = groups;
  return groups;
}

function substituteGroupName(group) {
  return (lang === "tr" ? group.nameTr : group.nameEn) || group.nameTr || group.nameEn || "";
}

// Bir maddenin kendi stoğu + grubundaki diğer üyelerin stoğunun (kendi
// birimine oranla çevrilmiş) toplamı. Grubu yoksa `node.have` ile birebir
// aynıdır — computeAll'ın kendi `missing` alanı bundan ETKİLENMEZ, sadece
// ekranda gösterilen/gruplanan değerler bu sarmalayıcıdan geçer.
function getEffectiveHave(node, allResults) {
  const groups = getSubstituteGroups();
  const group = groups.get(node.id);
  if (!group) return node.have;
  const self = group.members.find((m) => m.id === node.id);
  if (!self) return node.have;
  let total = node.have;
  group.members.forEach((m) => {
    if (m.id === node.id) return;
    const other = allResults[m.id];
    if (!other) return;
    total += other.have * (self.factor / m.factor);
  });
  return total;
}

function getEffectiveMissing(node, allResults) {
  return Math.max(0, node.required - getEffectiveHave(node, allResults));
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
// Yetersizken (SPEC (1).md §1) sona her zaman "−N eksik" eklenir.
function computeRowMeta(node, withSuffix) {
  if (withSuffix === undefined) withSuffix = true;
  const s = t();
  let m;
  if (node.isRaw) {
    const source = lang === "tr" ? node.source_tr : node.source_en;
    if (source && looksPurchased(source)) {
      m = shortenSource(source);
    } else {
      const { secondary } = nameFor(node);
      m = secondary ? `${secondary} · ${s.reqShort(node.required)}` : s.reqShort(node.required);
      if (node.have > 0) m += ` · ${s.haveShort(node.have)}`;
    }
  } else if (node.batches > 0) {
    m = (skill === "alchemy" && mastery > 0 && node.hasYieldBonus)
      ? s.batchesBadgeMastery(node.batches, node.producedQty)
      : s.batchesBadge(node.batches, node.producedQty);
  } else {
    m = node.masteryApplies ? s.methodTool(skill) : s.methodSimple(skill);
  }
  if (withSuffix) {
    if (node.isElixir && node.higherHave > 0) {
      m += ` · ${s.higherBadge(node.higherHave, node.higherHave * HIGHER_GRADE_RATIO)}`;
    }
    if (node.missing > 0) {
      m += ` · ${s.missingSuffix(node.missing)}`;
    }
  }
  return m;
}

// ── Render modeli: saf veri, DOM'a dokunmaz ────────────────────────────────

function getFocusedStockItemId() {
  const active = document.activeElement;
  if (active && active.classList &&
    (active.classList.contains("stock-field") || active.classList.contains("stock-field-higher"))) {
    return active.dataset.item || null;
  }
  return null;
}

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
    (!displayIds || displayIds.has(n.id)) && (!onlyMissing || getEffectiveMissing(n, resultsMapFor(n.id)) > 0));

  // İki bloklu sıralama (SPEC (1).md §4b): her bölüm "eksik" (miktara göre
  // azalan) ve "tamamlandı" (ada göre artan, sönük) olarak ikiye ayrılır.
  // O an bir stok input'u odaktaysa (yazıyorken), o maddenin blok üyeliği bir
  // önceki render'daki GERÇEK haliyle donar — satır elinin altından kaymaz;
  // input blur olduğunda odak kalktığı için bir sonraki repaint gerçek
  // değere anında oturur. `blockOf` TÜM ağaç için (görünürlük/arama
  // filtrelerinden bağımsız) hesaplanır ki çekmece (§6) de aynı donuk
  // sınıflandırmayı okuyabilsin.
  const focusedStockId = getFocusedStockItemId();
  const blockOf = new Map();
  const nextBlockState = new Map();
  Object.keys(results).forEach((id) => {
    const scope = resultsMapFor(id);
    const node = scope[id];
    const effMissing = getEffectiveMissing(node, scope);
    const trueKey = effMissing > 0 ? "missing" : "done";
    nextBlockState.set(id, trueKey);
    const key = (id === focusedStockId && lastBlockState.has(id)) ? lastBlockState.get(id) : trueKey;
    blockOf.set(id, key);
  });
  lastBlockState = nextBlockState;

  let baseCount = 0;
  let matchedCount = 0;
  const sections = SECTION_ORDER.map((tier) => {
    const base = baseVisible(bySection[tier] || []);
    baseCount += base.length;
    const filtered = base.filter(matchesQuery);
    matchedCount += filtered.length;

    const missingRows = [];
    const doneRows = [];
    filtered.forEach((node) => {
      const effMissing = getEffectiveMissing(node, resultsMapFor(node.id));
      const key = blockOf.get(node.id);
      (key === "missing" ? missingRows : doneRows).push({ node, effMissing });
    });
    missingRows.sort((a, b) =>
      b.effMissing - a.effMissing || nameFor(a.node).primary.localeCompare(nameFor(b.node).primary, lang));
    doneRows.sort((a, b) => nameFor(a.node).primary.localeCompare(nameFor(b.node).primary, lang));

    return {
      tier,
      missingNodes: missingRows.map((r) => r.node),
      doneNodes: doneRows.map((r) => r.node)
    };
  }).filter((s) => s.missingNodes.length > 0 || s.doneNodes.length > 0);

  const hiddenByQuery = query ? Math.max(0, baseCount - matchedCount) : 0;

  // SPEC (1).md §7: "PARAYLA ÇÖZÜLENLERİ SAY" kapalıyken unlimited:true
  // kalemler ilerleme paydasından/sayaçlarından tamamen çıkar. Bugün hiçbir
  // kalemde `unlimited` olmadığından bu dal hiçbir şeyi değiştirmez.
  let doneCount = 0;
  let totalCount = 0;
  Object.keys(results).forEach((id) => {
    const item = getItem(id);
    if (!countMoney && item.unlimited) return;
    totalCount++;
    if (getEffectiveMissing(results[id], resultsMapFor(id)) === 0) doneCount++;
  });

  return {
    results, resultsMapFor, sections, query, hiddenByQuery, blockOf,
    selectedId, targetQty, masteryPct,
    rootNode: results[selectedId],
    doneCount, totalCount,
    progressPct: totalCount ? Math.round((doneCount / totalCount) * 100) : 0
  };
}

// ── Satır DOM inşası (huni + tablo ortak parçaları) ────────────────────────

function buildStepper(node, isHigher) {
  // Not: "stepper" ismi kalsa da artık +/- düğmesi yok, sadece doğrudan
  // yazılabilen bir sayı kutusu — büyük miktarlar (yüzlerce/binlerce) için
  // tek tek tıklamak işlevsiz olduğundan kaldırıldı.
  const input = document.createElement("input");
  input.type = "number";
  input.min = "0";
  input.step = "1";
  input.dataset.item = node.id;
  input.className = "qty-input " + (isHigher ? "stock-field-higher" : "stock-field");
  input.value = isHigher ? (stockHigh[node.id] || 0) : (stock[node.id] || 0);
  input.title = isHigher ? `${t().inStockHigher} (${t().higherGradeHint(HIGHER_GRADE_RATIO)})` : t().inStock;
  return input;
}

function buildDetailPanel(node, allResults) {
  const s = t();
  const item = getItem(node.id);
  const wrap = document.createElement("div");
  wrap.className = "row-detail";

  // SPEC (1).md §3: üst kalite (Adv/Endless) girişi artık satır kapalıyken
  // görünmez — sadece burada, genişletilmiş detayda, etiketli iki alan +
  // canlı "= N normal" dönüşümüyle gösterilir.
  if (node.isElixir) {
    const higherWrap = document.createElement("div");
    higherWrap.className = "rd-higher";

    const title = document.createElement("div");
    title.className = "rd-title";
    title.textContent = s.inStockHigher;
    higherWrap.appendChild(title);

    const normalRow = document.createElement("div");
    normalRow.className = "rd-higher-row";
    const normalLabel = document.createElement("label");
    normalLabel.className = "rd-higher-label";
    normalLabel.textContent = s.higherNormalLabel;
    normalRow.appendChild(normalLabel);
    normalRow.appendChild(buildStepper(node, false));
    higherWrap.appendChild(normalRow);

    const advRow = document.createElement("div");
    advRow.className = "rd-higher-row";
    const advLabel = document.createElement("label");
    advLabel.className = "rd-higher-label";
    advLabel.textContent = s.higherAdvLabel;
    advRow.appendChild(advLabel);
    const higherInput = buildStepper(node, true);
    advRow.appendChild(higherInput);
    const converted = document.createElement("span");
    converted.className = "rd-higher-converted";
    converted.textContent = s.higherConverted((stockHigh[node.id] || 0) * HIGHER_GRADE_RATIO);
    higherInput.addEventListener("input", () => {
      const n = Math.max(0, parseInt(higherInput.value, 10) || 0);
      converted.textContent = s.higherConverted(n * HIGHER_GRADE_RATIO);
    });
    advRow.appendChild(converted);
    higherWrap.appendChild(advRow);

    const help = document.createElement("div");
    help.className = "rd-higher-help";
    help.textContent = s.higherHelpText(HIGHER_GRADE_RATIO);
    higherWrap.appendChild(help);

    wrap.appendChild(higherWrap);
  }

  // SPEC (1).md §4c: ikame malzemeler — sadece grubu olan kalemlerde görünür.
  // data.js'te henüz `substitutes` alanı yokken bu blok hiç render edilmez.
  const substituteGroup = getSubstituteGroups().get(node.id);
  if (substituteGroup) {
    const label = document.createElement("div");
    label.className = "rd-title";
    label.textContent = s.altSectionTitle;
    wrap.appendChild(label);
    substituteGroup.members
      .filter((m) => m.id !== node.id)
      .forEach((m) => {
        const otherItem = getItem(m.id);
        const otherResult = allResults[m.id];
        const otherHave = otherResult ? otherResult.have : (stock[m.id] || 0);
        const otherRequired = otherResult ? otherResult.required : 0;
        const line = document.createElement("div");
        line.className = "rd-alt-line";
        if (otherItem.icon) {
          const icon = document.createElement("img");
          icon.className = "row-icon";
          icon.src = otherItem.icon;
          icon.alt = "";
          line.appendChild(icon);
        }
        const nm = document.createElement("span");
        nm.className = "rd-alt-name";
        nm.textContent = nameFor(otherItem).primary;
        line.appendChild(nm);
        const qty = document.createElement("span");
        qty.className = "rd-alt-qty";
        qty.textContent = `${formatQty(otherHave)}/${formatQty(otherRequired)}`;
        line.appendChild(qty);
        line.appendChild(buildStepper({ id: m.id }, false));
        wrap.appendChild(line);
      });
  }

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

// Her yerde ortak kullanılan "elimde/gerekli" durum rozeti (SPEC (1).md §1):
// yeterliyken de gösterilir, sonuna ✓ eklenir; yetersizken "elimde" kısmı
// vurgulanır. `font-variant-numeric: tabular-nums` CSS'te uygulanır.
function buildQtyStatus(node) {
  const status = document.createElement("span");
  status.className = "row-status " + (node.missing > 0 ? "miss" : "ok");
  const haveSpan = document.createElement("span");
  haveSpan.className = "qty-have" + (node.missing > 0 ? " short" : "");
  haveSpan.textContent = formatQty(node.have);
  status.appendChild(haveSpan);
  status.appendChild(document.createTextNode("/"));
  const reqSpan = document.createElement("span");
  reqSpan.className = "qty-req";
  reqSpan.textContent = formatQty(node.required);
  status.appendChild(reqSpan);
  if (node.missing === 0) status.appendChild(document.createTextNode(" ✓"));
  return status;
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
  const { primary, secondary } = nameFor(node);
  nameEl.appendChild(highlightMatch(primary, query));
  const metaEl = document.createElement("div");
  metaEl.className = "row-meta";
  let metaText = computeRowMeta(node);
  const substituteGroup = getSubstituteGroups().get(node.id);
  if (substituteGroup) {
    const extra = getEffectiveHave(node, allResults) - node.have;
    if (extra > 0) metaText += ` · ${s.altSuffix(extra)}`;
  }
  metaEl.textContent = metaText;
  // İsim/meta metni dar kolonlarda kesiliyor (ellipsis) — üzerine gelince
  // tam metni gösteren tooltip.
  text.title = `${primary}${secondary ? " · " + secondary : ""}\n${metaText}`;
  text.appendChild(nameEl);
  if (substituteGroup) {
    const altTag = document.createElement("span");
    altTag.className = "tag-outline row-alt-tag";
    altTag.textContent = s.altCount(substituteGroup.members.length - 1);
    text.appendChild(altTag);
  }
  text.appendChild(metaEl);
  hit.appendChild(text);
  row.appendChild(hit);

  row.appendChild(buildQtyStatus(node));
  row.appendChild(buildStepper(node, false));

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

// ── Ortak: eksik/tamamlandı iki bloklu render arasındaki katlanır ayraç ────
// (SPEC (1).md §4b — huni kolonlarında, tabloda ve çekmecede aynı davranış)

function buildBlockDivider(n) {
  const div = document.createElement("div");
  div.className = "block-divider";
  div.setAttribute("role", "button");
  div.tabIndex = 0;
  div.textContent = (doneCollapsed ? "▸ " : "▾ ") + t().doneCollapsedLabel(n);
  div.addEventListener("click", () => {
    doneCollapsed = !doneCollapsed;
    saveDoneCollapsed();
    repaint();
  });
  return div;
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

  model.sections.forEach(({ tier, missingNodes, doneNodes }) => {
    const col = document.createElement("div");
    col.className = "col";
    const head = document.createElement("div");
    head.className = "col-head";
    const title = document.createElement("span");
    title.className = "col-title";
    title.textContent = sectionLabel(tier, skill);
    const count = document.createElement("span");
    count.className = "col-count";
    count.textContent = String(missingNodes.length + doneNodes.length);
    head.appendChild(title);
    head.appendChild(count);
    col.appendChild(head);

    const rows = document.createElement("div");
    rows.className = "col-rows";
    missingNodes.forEach((node) => {
      rows.appendChild(buildFunnelRow(node, model.resultsMapFor(node.id), model.query));
    });
    if (doneNodes.length) {
      rows.appendChild(buildBlockDivider(doneNodes.length));
      if (!doneCollapsed) {
        doneNodes.forEach((node) => {
          rows.appendChild(buildFunnelRow(node, model.resultsMapFor(node.id), model.query));
        });
      }
    }
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
  nameCell.title = secondary ? `${primary} · ${secondary}` : primary;
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
  reqCell.className = "td-req" + (node.missing === 0 ? " dim" : "");
  reqCell.textContent = formatQty(node.required);
  row.appendChild(reqCell);

  const haveCell = document.createElement("span");
  haveCell.className = "td-have";
  haveCell.appendChild(buildStepper(node, false));
  row.appendChild(haveCell);

  const missCell = document.createElement("span");
  missCell.className = "td-miss";
  missCell.style.color = node.missing > 0 ? "var(--color-accent)" : "var(--color-dim-2)";
  missCell.textContent = node.missing > 0 ? formatQty(node.missing) : "✓";
  row.appendChild(missCell);

  const craftCell = document.createElement("span");
  craftCell.className = "td-craft";
  craftCell.textContent = node.isRaw ? "—" : computeRowMeta(node, false);
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

  // SPEC (1).md §3: elixir kalemlerinde üst kalite girişi artık bu genişletme
  // panelinde — tablo satırları da huni gibi kendi detay panelini açabilir.
  const expandBtn = document.createElement("button");
  expandBtn.type = "button";
  expandBtn.className = "row-expand td-expand";
  expandBtn.textContent = expandedIds.has(node.id) ? "▴" : "▾";
  row.appendChild(expandBtn);

  const wrapper = document.createDocumentFragment();
  wrapper.appendChild(row);
  if (expandedIds.has(node.id)) {
    wrapper.appendChild(buildDetailPanel(node, allResults));
  }
  return wrapper;
}

function tableSortValue(node, col, allResults) {
  switch (col) {
    case "name": return nameFor(node).primary.toLocaleLowerCase(lang);
    case "tier": return SECTION_ORDER.indexOf(sectionOf(node));
    case "req": return node.required;
    case "have": return node.have;
    case "miss": return getEffectiveMissing(node, allResults);
    case "craft": return node.batches || 0;
    case "pct": return node.required > 0 ? node.have / node.required : 1;
    default: return 0;
  }
}

function paintTable(model) {
  const s = t();
  const head = document.getElementById("tableHead");
  head.innerHTML = "";
  [
    ["th-name", "name", s.colName], ["th-tier", "tier", s.colTier], ["th-req", "req", s.colReq],
    ["th-have", "have", s.colHave], ["th-miss", "miss", s.colMiss], ["th-craft", "craft", s.colCraft],
    ["th-pct", "pct", s.colProgress]
  ].forEach(([cls, col, text]) => {
    const span = document.createElement("span");
    span.className = cls + " th-sortable";
    span.dataset.sortCol = col;
    let label = text;
    if (tableSortOverride && tableSortOverride.col === col) {
      label += tableSortOverride.dir === "asc" ? " ▲" : " ▼";
      span.classList.add("active");
    }
    span.textContent = label;
    head.appendChild(span);
  });
  const expandHead = document.createElement("span");
  expandHead.className = "th-expand";
  head.appendChild(expandHead);

  document.getElementById("sortResetBtn").hidden = !tableSortOverride;

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
  const filteredSections = model.sections.filter((sec) =>
    tableTierFilter === "all" || sec.tier === tableTierFilter);
  const footer = document.getElementById("tableFooter");

  function renderRows(nodes) {
    nodes.forEach((node) => {
      rowsEl.appendChild(buildTableRow(node, model.resultsMapFor(node.id), model.query));
    });
  }

  let isEmpty;
  if (tableSortOverride) {
    // SPEC (1).md §2: bir sütun başlığına tıklamak varsayılan iki-bloklu
    // sıralamayı geçici olarak geçersiz kılar — tek liste, o sütuna göre.
    const allNodes = filteredSections.flatMap((sec) => [...sec.missingNodes, ...sec.doneNodes]);
    const dir = tableSortOverride.dir === "asc" ? 1 : -1;
    allNodes.sort((a, b) => {
      const av = tableSortValue(a, tableSortOverride.col, model.resultsMapFor(a.id));
      const bv = tableSortValue(b, tableSortOverride.col, model.resultsMapFor(b.id));
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
    isEmpty = !allNodes.length;
    if (!isEmpty) renderRows(allNodes);
  } else {
    const missingAll = [];
    const doneAll = [];
    filteredSections.forEach((sec) => {
      missingAll.push(...sec.missingNodes);
      doneAll.push(...sec.doneNodes);
    });
    missingAll.sort((a, b) =>
      getEffectiveMissing(b, model.resultsMapFor(b.id)) - getEffectiveMissing(a, model.resultsMapFor(a.id)) ||
      nameFor(a).primary.localeCompare(nameFor(b).primary, lang));
    doneAll.sort((a, b) => nameFor(a).primary.localeCompare(nameFor(b).primary, lang));

    isEmpty = !missingAll.length && !doneAll.length;
    if (!isEmpty) {
      renderRows(missingAll);
      if (doneAll.length) {
        rowsEl.appendChild(buildBlockDivider(doneAll.length));
        if (!doneCollapsed) renderRows(doneAll);
      }
    }
  }

  if (isEmpty) {
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.textContent = s.noResults;
    rowsEl.appendChild(noResults);
    footer.hidden = true;
  } else if (model.hiddenByQuery > 0) {
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
  if (drawerOpen) paintDrawer(model);
  if (!model) {
    document.getElementById("funnelView").innerHTML = "";
    document.getElementById("tableRows").innerHTML = "";
    paintFocusBar({ results: {} });
    return;
  }
  paintFocusBar(model);
  if (view === "funnel") paintFunnel(model);
  else paintTable(model);
}

function setSearch(value) {
  funnelQuery = value;
  const input = document.getElementById("globalSearch");
  if (input.value !== value) input.value = value;
  document.getElementById("searchBox").classList.toggle("active", !!value);
  repaint();
}

// ── Toplu stok çekmecesi (SPEC (1).md §6 — kendi arama kutusu + klavye akışı) ─

function buildDrawerRow(id, item, node) {
  const { primary, secondary } = nameFor(item);
  const row = document.createElement("div");
  row.className = "drawer-row";
  row.dataset.item = id;
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
  name.title = name.textContent;
  row.appendChild(name);
  if (node) row.appendChild(buildQtyStatus(node));
  row.appendChild(buildStepper({ id, isElixir: false }, false));
  if (item.tier === "elixir") {
    row.appendChild(buildStepper({ id, isElixir: true }, true));
  }
  return row;
}

function setDrawerSearch(value) {
  drawerQuery = value;
  const input = document.getElementById("drawerSearch");
  if (input.value !== value) input.value = value;
  document.getElementById("drawerSearchBox").classList.toggle("active", !!value);
  document.getElementById("drawerSearchClear").hidden = !value;
  paintDrawer();
}

function updateDrawerChipsUI() {
  document.querySelectorAll("#drawerChips button[data-chip]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.chip === drawerChip);
  });
}

function paintDrawer(model) {
  if (model === undefined) model = computeRenderModel();
  const s = t();
  const listEl = document.getElementById("stockDrawerList");
  listEl.innerHTML = "";

  const query = drawerQuery.trim().toLocaleLowerCase(lang);
  const items = [];
  Object.entries(RECIPES.items).forEach(([id, item]) => {
    if ((item.skill || "alchemy") !== skill) return;
    const { primary, secondary } = nameFor(item);
    const matchesQuery = !query ||
      primary.toLocaleLowerCase(lang).includes(query) ||
      (secondary && secondary.toLocaleLowerCase(lang).includes(query));
    if (!matchesQuery) return;
    const node = model ? model.results[id] : null;
    if (drawerChip === "raw" && item.recipe) return;
    if (drawerChip === "missing" && !(node && node.missing > 0)) return;
    if (drawerChip === "entered" && !((stock[id] || 0) > 0 || (stockHigh[id] || 0) > 0)) return;
    items.push({ id, item, node });
  });

  if (!items.length) {
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.textContent = s.noResults;
    listEl.appendChild(noResults);
    return;
  }

  // İki bloklu sıralama, ana ağaçtaki aynı donuk `blockOf` sınıflandırmasını
  // kullanır — böylece huni/tablo/çekmece bir maddeyi hep aynı şekilde
  // gruplar ve yazarken satır sıçramaz (SPEC (1).md §2/§6).
  const missingItems = [];
  const otherItems = [];
  items.forEach((x) => {
    const key = (model && x.node) ? model.blockOf.get(x.id) : null;
    (key === "missing" ? missingItems : otherItems).push(x);
  });
  missingItems.sort((a, b) =>
    b.node.missing - a.node.missing || nameFor(a.item).primary.localeCompare(nameFor(b.item).primary, lang));
  otherItems.sort((a, b) => nameFor(a.item).primary.localeCompare(nameFor(b.item).primary, lang));

  missingItems.forEach(({ id, item, node }) => listEl.appendChild(buildDrawerRow(id, item, node)));
  if (otherItems.length) {
    listEl.appendChild(buildBlockDivider(otherItems.length));
    if (!doneCollapsed) {
      otherItems.forEach(({ id, item, node }) => listEl.appendChild(buildDrawerRow(id, item, node)));
    }
  }
}

function focusNextMissingDrawerInput(afterId) {
  const model = computeRenderModel();
  const inputs = Array.from(document.querySelectorAll("#stockDrawerList .stock-field"));
  const idx = inputs.findIndex((el) => el.dataset.item === afterId);
  for (let i = idx + 1; i < inputs.length; i++) {
    const id = inputs[i].dataset.item;
    const node = model && model.results[id];
    if (node && node.missing > 0) {
      inputs[i].focus();
      inputs[i].select();
      return true;
    }
  }
  return false;
}

function openDrawer() {
  drawerOpen = true;
  document.getElementById("stockDrawer").hidden = false;
  document.getElementById("drawerBackdrop").hidden = false;
  document.getElementById("drawerTitle").textContent = t().drawerTitle;
  updateDrawerChipsUI();
  paintDrawer();
  requestAnimationFrame(() => {
    const input = document.getElementById("drawerSearch");
    if (input) input.focus();
  });
}

function closeDrawer() {
  drawerOpen = false;
  document.getElementById("stockDrawer").hidden = true;
  document.getElementById("drawerBackdrop").hidden = true;
}

// ── Toplama listesi ekranı ──────────────────────────────────────────────

function parseSilverPrice(text) {
  if (!text) return null;
  const m = text.match(/([\d.,]+)\s*(?:gümüş|silver)/i);
  if (!m) return null;
  const n = parseFloat(m[1].replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

// SPEC (1).md §4c: aynı ikame grubundaki ham maddeler toplama listesinde TEK
// satırda birleşir (grubun ilk üyesi "çapa" alınır, gerçek üyelerin stoğu
// oranla toplanır). data.js'te henüz `substitutes` yokken her ham madde kendi
// tek satırında kalır — davranış birebir eskisiyle aynıdır.
function buildGatherEntries(model) {
  const groups = getSubstituteGroups();
  const seen = new Set();
  const entries = [];
  Object.values(model.results).forEach((n) => {
    if (!n.isRaw) return;
    const group = groups.get(n.id);
    if (group) {
      const gkey = group.members.map((m) => m.id).sort().join("|");
      if (seen.has(gkey)) return;
      seen.add(gkey);
      const anchorMember = group.members.find((m) => model.results[m.id]);
      const anchorNode = anchorMember && model.results[anchorMember.id];
      if (!anchorNode) return;
      const effHave = getEffectiveHave(anchorNode, model.results);
      const effMissing = Math.max(0, anchorNode.required - effHave);
      if (effMissing <= 0) return;
      entries.push({ id: anchorNode.id, node: anchorNode, group, effMissing, effHave });
    } else {
      if (n.missing <= 0) return;
      entries.push({ id: n.id, node: n, group: null, effMissing: n.missing, effHave: n.have });
    }
  });
  return entries;
}

function buildGatherGroupHeader(title, count, totalPrice) {
  const s = t();
  const gh = document.createElement("div");
  gh.className = "gv-group-head";
  const gt = document.createElement("span");
  gt.className = "g-title";
  gt.textContent = title;
  gh.appendChild(gt);
  const gm = document.createElement("span");
  gm.className = "g-meta";
  gm.textContent = s.itemsCount(count) + (totalPrice > 0 ? ` · ${s.priceEstimated} ${formatSilver(totalPrice)}` : "");
  gh.appendChild(gm);
  return gh;
}

function buildMoneyDivider(count, totalPrice) {
  const s = t();
  const div = document.createElement("div");
  div.className = "gv-group-head money-toggle";
  div.setAttribute("role", "button");
  div.tabIndex = 0;
  const label = s.moneyGroupTitle + " · " + s.itemsCount(count) +
    (totalPrice > 0 ? ` · ${s.priceEstimated} ${formatSilver(totalPrice)}` : "");
  div.textContent = (moneyCollapsed ? "▸ " : "▾ ") + label;
  div.addEventListener("click", () => {
    moneyCollapsed = !moneyCollapsed;
    saveMoneyCollapsed();
    paintGather();
  });
  return div;
}

function buildGatherRow(entry) {
  const s = t();
  const done = checkedIds.has(entry.id);
  const row = document.createElement("div");
  row.className = "gv-row";
  row.dataset.item = entry.id;

  const check = document.createElement("button");
  check.type = "button";
  check.className = "gv-check" + (done ? " checked" : "");
  check.textContent = done ? "✓" : "";
  row.appendChild(check);

  if (entry.item.icon) {
    const icon = document.createElement("img");
    icon.className = "row-icon";
    icon.src = entry.item.icon;
    icon.alt = "";
    row.appendChild(icon);
  }

  const textWrap = document.createElement("div");
  textWrap.className = "gv-row-text";
  const nameEl = document.createElement("div");
  nameEl.className = "gv-row-name" + (done ? " done" : "");
  nameEl.textContent = entry.group ? substituteGroupName(entry.group) : nameFor(entry.node).primary;
  textWrap.appendChild(nameEl);
  if (entry.group) {
    const altLine = document.createElement("div");
    altLine.className = "gv-row-src";
    altLine.textContent = entry.group.members.map((m) => nameFor(getItem(m.id)).primary).join(" / ");
    textWrap.appendChild(altLine);
  } else {
    const srcEl = document.createElement("div");
    srcEl.className = "gv-row-src";
    srcEl.textContent = (lang === "tr" ? entry.node.source_tr : entry.node.source_en) || "";
    textWrap.appendChild(srcEl);
  }
  if (entry.price) {
    const priceEl = document.createElement("div");
    priceEl.className = "gv-row-price";
    priceEl.textContent = `${s.priceEstimated} ${formatSilver(entry.price * entry.effMissing)}`;
    textWrap.appendChild(priceEl);
  }
  row.appendChild(textWrap);

  const qtyWrap = document.createElement("div");
  qtyWrap.className = "gv-row-qty";
  const big = document.createElement("div");
  big.className = "q-big";
  big.style.color = done ? "var(--color-dim-2)" : "var(--color-accent)";
  big.textContent = done ? "✓" : formatQty(entry.effMissing);
  const of = document.createElement("div");
  of.className = "q-of";
  of.textContent = `${formatQty(entry.effHave)} / ${formatQty(entry.node.required)}`;
  qtyWrap.appendChild(big);
  qtyWrap.appendChild(of);
  row.appendChild(qtyWrap);

  return row;
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
  const entries = buildGatherEntries(model);
  entries.forEach((entry) => {
    entry.item = getItem(entry.id);
    const source = lang === "tr" ? entry.node.source_tr : entry.node.source_en;
    // DATA.md §2: item.price varsa gerçek TAHMİNİ fiyat kullanılır; yoksa
    // eski metin-içi kaba tahmine (parseSilverPrice) düşülür.
    entry.price = typeof entry.item.price === "number" ? entry.item.price : parseSilverPrice(source);
    entry.unlimited = !!entry.item.unlimited;
    entry.purchased = looksPurchased(source) || typeof entry.item.price === "number";
  });
  sub.textContent = s.gatherSubFor(primary, model.targetQty, entries.length);

  const moneyEntries = entries.filter((e) => e.unlimited);
  const gatherEntries = entries.filter((e) => !e.unlimited && !e.purchased);
  const buyEntries = entries.filter((e) => !e.unlimited && e.purchased);
  const byPriceDesc = (a, b) => (b.price || 0) - (a.price || 0);
  gatherEntries.sort((a, b) => b.effMissing - a.effMissing);
  buyEntries.sort(byPriceDesc);
  moneyEntries.sort(byPriceDesc);

  const copyLines = [];
  let totalCost = 0;

  function renderGroup(title, list) {
    if (!list.length) return;
    const groupTotal = list.reduce((sum, e) => sum + (e.price ? e.price * e.effMissing : 0), 0);
    gv.appendChild(buildGatherGroupHeader(title, list.length, groupTotal));
    list.forEach((entry) => {
      gv.appendChild(buildGatherRow(entry));
      if (entry.price && !checkedIds.has(entry.id)) totalCost += entry.price * entry.effMissing;
      const label = entry.group ? substituteGroupName(entry.group) : nameFor(entry.node).primary;
      copyLines.push(`${checkedIds.has(entry.id) ? "[x]" : "[ ]"} ${label} — ${formatQty(entry.effMissing)}/${formatQty(entry.node.required)}`);
    });
  }

  renderGroup(s.groupGather, gatherEntries);
  renderGroup(s.groupBuy, buyEntries);

  if (moneyEntries.length) {
    const moneyTotal = moneyEntries.reduce((sum, e) => sum + (e.price ? e.price * e.effMissing : 0), 0);
    gv.appendChild(buildMoneyDivider(moneyEntries.length, moneyTotal));
    if (!moneyCollapsed) {
      moneyEntries.forEach((entry) => {
        gv.appendChild(buildGatherRow(entry));
        const label = entry.group ? substituteGroupName(entry.group) : nameFor(entry.node).primary;
        copyLines.push(`${checkedIds.has(entry.id) ? "[x]" : "[ ]"} ${label} — ${formatQty(entry.effMissing)}/${formatQty(entry.node.required)}`);
      });
    }
  }

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
    value.textContent = formatSilver(totalCost);
    costRow.appendChild(label);
    costRow.appendChild(value);
    gv.appendChild(costRow);
  }

  // DATA.md §2: `priceUpdated` tek yerde yazılır — herhangi bir kalemde
  // varsa (ilk bulunan) altta tarih notu düşer, yoksa hiçbir şey görünmez.
  const withDate = entries.find((e) => e.item.priceUpdated);
  if (withDate) {
    const dateNote = document.createElement("div");
    dateNote.className = "gv-price-date";
    dateNote.textContent = s.priceUpdatedNote(withDate.item.priceUpdated);
    gv.appendChild(dateNote);
  }

  if (!gatherEntries.length && !buyEntries.length && !moneyEntries.length) {
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

  document.getElementById("globalSearch").placeholder = s.searchPlaceholderGlobal;
  document.querySelector('[data-view="funnel"]').textContent = s.viewFunnel;
  document.querySelector('[data-view="table"]').textContent = s.viewTable;
  document.getElementById("onlyMissingBtn").textContent = s.onlyMissingBtn;
  document.getElementById("gatherBtn").textContent = s.gatherBtn;
  document.getElementById("stockDrawerBtn").textContent = s.stockDrawerBtn;
  document.getElementById("resetStockBtn").textContent = s.resetStock;
  document.getElementById("sortResetBtn").textContent = s.sortResetBtn;
  const countMoneyBtn = document.getElementById("countMoneyBtn");
  countMoneyBtn.textContent = s.countMoneyBtn;
  countMoneyBtn.classList.toggle("btn-primary", countMoney);

  const drawerSearchEl = document.getElementById("drawerSearch");
  if (drawerSearchEl) drawerSearchEl.placeholder = s.drawerSearchPlaceholder;
  const chipMissing = document.querySelector('#drawerChips [data-chip="missing"]');
  if (chipMissing) chipMissing.textContent = s.drawerFilterMissing;
  const chipRaw = document.querySelector('#drawerChips [data-chip="raw"]');
  if (chipRaw) chipRaw.textContent = s.drawerFilterRaw;
  const chipEntered = document.querySelector('#drawerChips [data-chip="entered"]');
  if (chipEntered) chipEntered.textContent = s.drawerFilterEntered;

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

function scheduleStockCommit() {
  if (stockCommitTimer) clearTimeout(stockCommitTimer);
  stockCommitTimer = setTimeout(() => {
    stockCommitTimer = null;
    saveStock();
    saveStockHigh();
    requestAnimationFrame(repaint);
  }, 150);
}

// Blur anında (bekleyen debounce varsa iptal edip) HEMEN commit + repaint —
// SPEC (1).md §2: satırın blok konumu (eksik/tamamlandı) input odaktan
// çıkar çıkmaz gerçek haline oturmalı, 150ms'lik debounce'u beklememeli.
function flushStockCommit() {
  if (stockCommitTimer) {
    clearTimeout(stockCommitTimer);
    stockCommitTimer = null;
  }
  saveStock();
  saveStockHigh();
  repaint();
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

// SPEC (1).md §9: geri al kaydı "tek işlem = tek kayıt" olacak şekilde
// odaklanma anındaki değeri hatırlar, blur'da değişmişse tek bir undo kaydı
// oluşturur (her tuş vuruşunda değil).
function handleStockFocusIn(e) {
  const isBase = e.target.classList && e.target.classList.contains("stock-field");
  const isHigher = e.target.classList && e.target.classList.contains("stock-field-higher");
  if (!isBase && !isHigher) return;
  const id = e.target.dataset.item;
  const field = isHigher ? "stockHigh" : "stock";
  stockFocusValue = { id, field, from: (field === "stockHigh" ? stockHigh[id] : stock[id]) || 0 };
}

function handleStockFocusOut(e) {
  const isBase = e.target.classList && e.target.classList.contains("stock-field");
  const isHigher = e.target.classList && e.target.classList.contains("stock-field-higher");
  if (!isBase && !isHigher) return;
  const id = e.target.dataset.item;
  const field = isHigher ? "stockHigh" : "stock";
  const to = (field === "stockHigh" ? stockHigh[id] : stock[id]) || 0;
  if (stockFocusValue && stockFocusValue.id === id && stockFocusValue.field === field && stockFocusValue.from !== to) {
    pushUndo({ type: "single", id, field, from: stockFocusValue.from, to, at: Date.now() });
  }
  stockFocusValue = null;
  flushStockCommit();
}

// ── Geri al / yinele — Ctrl+Z / Ctrl+Shift+Z (SPEC (1).md §9) ───────────

function pushUndo(entry) {
  undoStack.push(entry);
  if (undoStack.length > 50) undoStack.shift();
  saveUndoStack();
  redoStack = [];
}

function applyUndoEntry(entry, direction) {
  const items = entry.type === "batch" ? entry.items : [entry];
  items.forEach((it) => {
    const val = direction === "undo" ? it.from : it.to;
    if (it.field === "stockHigh") stockHigh[it.id] = val;
    else stock[it.id] = val;
  });
  saveStock();
  saveStockHigh();
}

function hideUndoToast() {
  const toast = document.getElementById("undoToast");
  if (toast) toast.hidden = true;
  if (undoToastTimer) {
    clearTimeout(undoToastTimer);
    undoToastTimer = null;
  }
}

function showUndoToast(entry) {
  const toast = document.getElementById("undoToast");
  if (!toast) return;
  if (undoToastTimer) clearTimeout(undoToastTimer);
  toast.innerHTML = "";
  const s = t();

  const msg = document.createElement("span");
  msg.className = "ut-msg";
  msg.textContent = s.undoRestored;
  toast.appendChild(msg);

  const affectedIds = entry.type === "batch" ? entry.items.map((it) => it.id) : [entry.id];
  const visibleEls = Array.from(document.querySelectorAll("[data-item]"))
    .filter((el) => affectedIds.includes(el.dataset.item));

  if (visibleEls.length) {
    visibleEls.forEach((el) => {
      el.classList.add("just-restored");
      setTimeout(() => el.classList.remove("just-restored"), 600);
    });
  } else if (affectedIds.length === 1 && (RECIPES.items[affectedIds[0]])) {
    const link = document.createElement("a");
    link.href = "#";
    link.className = "ut-goto";
    link.textContent = s.gotoRow;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      focusChain = [affectedIds[0]];
      setSearch("");
      hideUndoToast();
      repaint();
    });
    toast.appendChild(link);
  }

  const redoBtn = document.createElement("button");
  redoBtn.type = "button";
  redoBtn.className = "ut-redo";
  redoBtn.textContent = s.redoBtn;
  redoBtn.addEventListener("mousedown", (e) => e.preventDefault());
  redoBtn.addEventListener("click", redo);
  toast.appendChild(redoBtn);

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "ut-close";
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("mousedown", (e) => e.preventDefault());
  closeBtn.addEventListener("click", hideUndoToast);
  toast.appendChild(closeBtn);

  toast.hidden = false;
  undoToastTimer = setTimeout(hideUndoToast, 3000);
}

function undo() {
  if (!undoStack.length) return;
  const entry = undoStack.pop();
  saveUndoStack();
  redoStack.push(entry);
  applyUndoEntry(entry, "undo");
  repaint();
  showUndoToast(entry);
}

function redo() {
  if (!redoStack.length) return;
  const entry = redoStack.pop();
  applyUndoEntry(entry, "redo");
  undoStack.push(entry);
  saveUndoStack();
  repaint();
  showUndoToast(entry);
}

// ── Odaklanma / genişletme tıklama mantığı ──────────────────────────────

function handleRowClick(e, container) {
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

  document.getElementById("countMoneyBtn").addEventListener("click", (e) => {
    countMoney = !countMoney;
    saveCountMoney();
    e.currentTarget.classList.toggle("btn-primary", countMoney);
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
  document.getElementById("stockDrawerList").addEventListener("focusin", handleStockFocusIn);
  document.getElementById("stockDrawerList").addEventListener("focusout", handleStockFocusOut);
  document.getElementById("stockDrawerList").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    if (!e.target.classList || !e.target.classList.contains("stock-field")) return;
    e.preventDefault();
    focusNextMissingDrawerInput(e.target.dataset.item);
  });

  document.getElementById("drawerSearch").addEventListener("input", (e) => setDrawerSearch(e.target.value));
  document.getElementById("drawerSearchClear").addEventListener("click", () => {
    setDrawerSearch("");
    document.getElementById("drawerSearch").focus();
  });
  document.getElementById("drawerSearch").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const first = document.querySelector("#stockDrawerList .stock-field");
    if (first) { first.focus(); first.select(); }
  });
  document.getElementById("drawerChips").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-chip]");
    if (!btn) return;
    drawerChip = drawerChip === btn.dataset.chip ? null : btn.dataset.chip;
    updateDrawerChipsUI();
    paintDrawer();
  });

  document.getElementById("resetStockBtn").addEventListener("click", () => {
    const items = [];
    Object.keys(stock).forEach((id) => { if (stock[id]) items.push({ id, field: "stock", from: stock[id], to: 0 }); });
    Object.keys(stockHigh).forEach((id) => { if (stockHigh[id]) items.push({ id, field: "stockHigh", from: stockHigh[id], to: 0 }); });
    if (items.length) pushUndo({ type: "batch", items, at: Date.now() });
    stock = {};
    stockHigh = {};
    saveStock();
    saveStockHigh();
    repaint();
  });

  document.getElementById("sortResetBtn").addEventListener("click", () => {
    tableSortOverride = null;
    saveSortOverride();
    repaint();
  });
  document.getElementById("tableHead").addEventListener("click", (e) => {
    const th = e.target.closest(".th-sortable");
    if (!th) return;
    const col = th.dataset.sortCol;
    if (tableSortOverride && tableSortOverride.col === col) {
      tableSortOverride = tableSortOverride.dir === "desc" ? { col, dir: "asc" } : null;
    } else {
      tableSortOverride = { col, dir: "desc" };
    }
    saveSortOverride();
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
  document.getElementById("funnelView").addEventListener("focusin", handleStockFocusIn);
  document.getElementById("funnelView").addEventListener("focusout", handleStockFocusOut);
  document.getElementById("tableRows").addEventListener("click", (e) => handleRowClick(e, "table"));
  document.getElementById("tableRows").addEventListener("input", handleStockInput);
  document.getElementById("tableRows").addEventListener("focusin", handleStockFocusIn);
  document.getElementById("tableRows").addEventListener("focusout", handleStockFocusOut);
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
        const from = stock[id] || 0;
        if (from !== node.required) pushUndo({ type: "single", id, field: "stock", from, to: node.required, at: Date.now() });
        stock[id] = node.required;
        saveStock();
      }
    }
    saveChecked();
    paintGather();
  });

  // Klavye kısayolları: "/" arama kutusuna odaklan (çekmece açıksa ÇEKMECENİN
  // kendi aramasına), Esc temizle+bırak, Enter ilk sonuca odaklan, Ctrl+Z /
  // Ctrl+Shift+Z geri al / yinele (bir metin alanı odaktaysa tarayıcının
  // kendi geri alma davranışına karışılmaz — SPEC (1).md §9).
  document.addEventListener("keydown", (e) => {
    const active = document.activeElement;
    const inField = active && /^(INPUT|SELECT|TEXTAREA)$/.test(active.tagName);
    const isUndoKey = (e.ctrlKey || e.metaKey) && !e.altKey && (e.key === "z" || e.key === "Z");
    if (isUndoKey) {
      if (inField) return;
      e.preventDefault();
      if (e.shiftKey) redo(); else undo();
      return;
    }
    if (e.key === "/" && !inField) {
      e.preventDefault();
      if (drawerOpen) document.getElementById("drawerSearch").focus();
      else document.getElementById("globalSearch").focus();
    } else if (e.key === "Escape" && active && active.id === "globalSearch") {
      setSearch("");
      active.blur();
    } else if (e.key === "Escape" && active && active.id === "drawerSearch") {
      if (drawerQuery) setDrawerSearch("");
      else closeDrawer();
    } else if (e.key === "Enter" && active && active.id === "globalSearch") {
      const model = computeRenderModel();
      if (model && model.query) {
        const firstMatch = model.sections.flatMap((s) => [...s.missingNodes, ...s.doneNodes])[0];
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
