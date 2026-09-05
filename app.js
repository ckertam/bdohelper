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

let stock = loadStock();

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

function getItem(id) {
  const item = RECIPES.items[id];
  if (!item) {
    return { name_tr: id, name_en: id, recipe: null, note: "Tanımsız madde." };
  }
  return item;
}

// Hedeflenen kök madde + miktardan yola çıkarak tüm ağacı hesaplar.
// Dönen değer: { itemId: { ...sonuç }, usedBy: { itemId: [parentId, ...] } }
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
  //    Bir madde ancak KENDİSİNİ isteyen tüm üst maddeler işlendikten sonra
  //    (inDegree sıfıra inince) işlenir — böylece toplam talep kesinleşmeden
  //    stok düşülmez.
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
      note: item.note || null,
      source: item.source || null,
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
  return node.tier || "base";
}

const SECTION_LABELS = {
  final: "Ana Ürün",
  mid: "Ara İksirler",
  base: "Temel İksirler",
  raw: "Ham Maddeler / Satın Alınanlar"
};
const SECTION_ORDER = ["final", "mid", "base", "raw"];

function renderCard(node, allResults) {
  const wrap = document.createElement("div");
  wrap.className = "node";

  const row = document.createElement("div");
  row.className = "node-row";

  const nameDiv = document.createElement("div");
  nameDiv.className = "node-name";
  nameDiv.innerHTML = `${node.name_tr}<span class="en">${node.name_en || ""}</span>`;
  row.appendChild(nameDiv);

  if (node.isRaw) {
    const badge = document.createElement("span");
    badge.className = "badge raw";
    badge.textContent = "Ham Madde";
    row.appendChild(badge);
  } else if (node.batches) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = `${node.batches}x üretim (${node.producedQty} adet çıkar)`;
    row.appendChild(badge);
  }

  const qtyInfo = document.createElement("div");
  qtyInfo.className = "qty-info";
  const missingSpan = node.missing > 0
    ? `<span class="missing">${node.missing} eksik</span>`
    : `<span class="satisfied">yeterli</span>`;
  qtyInfo.innerHTML = `<span>Toplam gerekli: <b>${node.required}</b></span>${missingSpan}`;
  row.appendChild(qtyInfo);

  const stockWrap = document.createElement("div");
  stockWrap.className = "stock-input";
  const label = document.createElement("label");
  label.textContent = "Elimde:";
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
      .map((pid) => (allResults[pid] ? allResults[pid].name_tr : pid))
      .join(", ");
    const usedByDiv = document.createElement("div");
    usedByDiv.className = "note-text";
    usedByDiv.textContent = `🔗 Kullanıldığı yer(ler): ${usedByNames}`;
    wrap.appendChild(usedByDiv);
  }

  if (node.source) {
    const src = document.createElement("div");
    src.className = "note-text";
    src.textContent = `📍 ${node.source}`;
    wrap.appendChild(src);
  }
  if (node.note) {
    const note = document.createElement("div");
    note.className = "note-text";
    note.textContent = `ℹ ${node.note}`;
    wrap.appendChild(note);
  }

  return wrap;
}

function render() {
  const itemSelect = document.getElementById("itemSelect");
  const targetQty = parseInt(document.getElementById("targetQty").value, 10) || 0;
  const selectedId = itemSelect.value;

  const tree = document.getElementById("tree");
  tree.innerHTML = "";
  if (!selectedId || targetQty <= 0) return;

  const results = computeAll(selectedId, targetQty);

  const bySection = {};
  Object.values(results).forEach((node) => {
    const sec = sectionOf(node);
    if (!bySection[sec]) bySection[sec] = [];
    bySection[sec].push(node);
  });

  SECTION_ORDER.forEach((sec) => {
    const items = bySection[sec];
    if (!items || items.length === 0) return;

    const section = document.createElement("section");
    section.className = "tier-section";

    const heading = document.createElement("h2");
    heading.textContent = SECTION_LABELS[sec] || sec;
    section.appendChild(heading);

    const cardsWrap = document.createElement("div");
    cardsWrap.className = "tier-cards";

    items
      .sort((a, b) => a.name_tr.localeCompare(b.name_tr, "tr"))
      .forEach((node) => {
        cardsWrap.appendChild(renderCard(node, results));
      });

    section.appendChild(cardsWrap);
    tree.appendChild(section);
  });
}

const TIER_LABELS = {
  final: "Ana Ürün",
  mid: "Ara İksirler",
  base: "Temel İksirler"
};
const TIER_ORDER = ["final", "mid", "base"];

function populateSelect() {
  const itemSelect = document.getElementById("itemSelect");
  itemSelect.innerHTML = "";

  const byTier = {};
  Object.entries(RECIPES.items).forEach(([id, item]) => {
    if (!item.recipe) return; // sadece üretilebilen maddeler seçilebilir
    const tier = item.tier || "base";
    if (!byTier[tier]) byTier[tier] = [];
    byTier[tier].push({ id, item });
  });

  TIER_ORDER.forEach((tier) => {
    const group = byTier[tier];
    if (!group || group.length === 0) return;
    const optgroup = document.createElement("optgroup");
    optgroup.label = TIER_LABELS[tier] || tier;
    group
      .sort((a, b) => a.item.name_tr.localeCompare(b.item.name_tr, "tr"))
      .forEach(({ id, item }) => {
        const opt = document.createElement("option");
        opt.value = id;
        opt.textContent = `${item.name_tr} (${item.name_en || ""})`;
        optgroup.appendChild(opt);
      });
    itemSelect.appendChild(optgroup);
  });
}

function init() {
  populateSelect();

  document.getElementById("itemSelect").addEventListener("change", render);
  document.getElementById("targetQty").addEventListener("input", render);

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
