// BDO Helper — reçete verisi
// Her item: { name_tr, name_en, recipe, tier, note, source }
//   recipe: { output_qty, ingredients:[{item, qty}] } | null
//   recipe === null  ->  ham madde / taban malzeme (üretilmez; toplanır/avlanır/satın alınır)
//   tier: "final" | "mid" | "base"  -> "Ne üretmek istiyorsun" listesinde gruplama için
//   note: bilinen istisna/alternatif malzeme notu (varsa)
//   source: ham maddeler için nasıl elde edildiği bilgisi
//
// Kaynak: bdocodex.com (item ve recipe sayfaları çapraz kontrol edilerek derlendi, 2026-09).
// Elixir tarifleri RNG'li üretir (1-4 adet + şans eseri bonus üst-tier iksir); burada
// garanti edilen minimum olan 1 adet output olarak alındı, yani hesap "güvenli/muhafazakar"
// tarafta kalır — gerçekte biraz daha az ham madde ile de aynı sonucu alabilirsin.

const RECIPES = {
  items: {
    harmony_draught: {
      name_tr: "Ahenk Öz İksiri",
      name_en: "Harmony Draught",
      tier: "final",
      recipe: {
        output_qty: 10,
        ingredients: [
          { item: "fury_draught", qty: 10 },
          { item: "adaptation_draught", qty: 10 },
          { item: "potential_draught", qty: 10 },
          { item: "corruption_draught", qty: 10 },
          { item: "berserk_draught", qty: 10 }
        ]
      },
      note: "İtem sayfası özetinde tüketilmeyen bir Büyülü Katalizör'den bahsedilse de, tarif sayfası (mrecipe/6682) katalizör olmadan listeler; tarif sayfası esas alındı."
    },

    fury_draught: {
      name_tr: "Öfke Öz İksiri",
      name_en: "Fury Draught",
      tier: "mid",
      recipe: {
        output_qty: 10,
        ingredients: [
          { item: "elixir_of_fury", qty: 30 },
          { item: "elixir_of_frenzy", qty: 30 },
          { item: "elixir_of_concentration", qty: 30 },
          { item: "elixir_of_destruction", qty: 30 },
          { item: "spellbound_catalyst", qty: 10 }
        ]
      },
      note: "Her iksirin üst kaliteli (Advanced/Endless vb.) versiyonu 1:3 oranında yerine geçebilir."
    },
    adaptation_draught: {
      name_tr: "Adaptasyon Öz İksiri",
      name_en: "Adaptation Draught",
      tier: "mid",
      recipe: {
        output_qty: 10,
        ingredients: [
          { item: "defense_elixir", qty: 30 },
          { item: "helix_elixir", qty: 30 },
          { item: "elixir_of_life", qty: 30 },
          { item: "elixir_of_endurance", qty: 30 },
          { item: "spellbound_catalyst", qty: 10 }
        ]
      },
      note: "Her iksirin üst kaliteli versiyonu 1:3 oranında yerine geçebilir."
    },
    potential_draught: {
      name_tr: "Potansiyel Öz İksiri",
      name_en: "Potential Draught",
      tier: "mid",
      recipe: {
        output_qty: 10,
        ingredients: [
          { item: "elixir_of_wind", qty: 30 },
          { item: "elixir_of_spells", qty: 30 },
          { item: "elixir_of_shock", qty: 30 },
          { item: "elixir_of_swiftness", qty: 30 },
          { item: "spellbound_catalyst", qty: 10 }
        ]
      },
      note: "Her iksirin üst kaliteli versiyonu 1:3 oranında yerine geçebilir."
    },
    corruption_draught: {
      name_tr: "Yozlaşma Öz İksiri",
      name_en: "Corruption Draught",
      tier: "mid",
      recipe: {
        output_qty: 10,
        ingredients: [
          { item: "elixir_of_perforation", qty: 30 },
          { item: "elixir_of_death", qty: 30 },
          { item: "elixir_of_draining", qty: 30 },
          { item: "grim_reapers_elixir", qty: 30 },
          { item: "spellbound_catalyst", qty: 10 }
        ]
      },
      note: "Her iksirin üst kaliteli versiyonu 1:3 oranında yerine geçebilir."
    },
    berserk_draught: {
      name_tr: "Cinnet Öz İksiri",
      name_en: "Berserk Draught",
      tier: "mid",
      recipe: {
        output_qty: 10,
        ingredients: [
          { item: "elixir_of_assassination", qty: 30 },
          { item: "elixir_of_detection", qty: 30 },
          { item: "elixir_of_carnage", qty: 30 },
          { item: "elixir_of_sky", qty: 30 },
          { item: "spellbound_catalyst", qty: 10 }
        ]
      },
      note: "Her iksirin üst kaliteli versiyonu 1:3 oranında yerine geçebilir."
    },

    spellbound_catalyst: {
      name_tr: "Büyülü Katalizör",
      name_en: "Spellbound Catalyst",
      recipe: null,
      source: "Üretilmez — Old Moon Guild yöneticisinden 1.000.000 gümüşe satın alınır."
    },

    elixir_of_fury: {
      name_tr: "Öfke İksiri", name_en: "Elixir of Fury", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "ash_sap", qty: 1 }, { item: "dwarf_mushroom", qty: 4 },
        { item: "bear_blood", qty: 4 }, { item: "purified_water", qty: 3 }
      ]},
      note: "Alchemy Beginner 1. Gerçek üretim RNG ile 1-4 arası + şansla bonus üst-tier iksir verir; burada garanti min. (1) esas alındı. Alt: 2x Büyük Cüce Mantarı, 4x Cüce Mantarı yerine geçebilir."
    },
    elixir_of_frenzy: {
      name_tr: "Çılgınlık İksiri", name_en: "Elixir of Frenzy", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "oil_of_regeneration", qty: 1 }, { item: "clear_liquid_reagent", qty: 5 },
        { item: "cedar_sap", qty: 5 }, { item: "trace_of_nature", qty: 3 }, { item: "ghost_mushroom", qty: 2 }
      ]},
      note: "Alchemy Skilled 1. RNG üretim (1-4) — garanti min. (1) esas alındı."
    },
    elixir_of_concentration: {
      name_tr: "Konsantrasyon İksiri", name_en: "Elixir of Concentration", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "clear_liquid_reagent", qty: 1 }, { item: "cloud_mushroom", qty: 3 },
        { item: "wild_grass", qty: 2 }, { item: "bear_blood", qty: 3 }
      ]},
      note: "RNG üretim (1-4) — garanti min. (1) esas alındı. Alt: 8x Ot, 2x Yabani Ot yerine geçebilir."
    },
    elixir_of_destruction: {
      name_tr: "Yıkım İksiri", name_en: "Elixir of Destruction", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "oil_of_storms", qty: 1 }, { item: "trace_of_nature", qty: 3 },
        { item: "clear_liquid_reagent", qty: 5 }, { item: "powder_of_flame", qty: 5 }, { item: "snowfield_cedar_sap", qty: 7 }
      ]},
      note: "Alchemy Skilled 1. RNG üretim (1-4) — garanti min. (1) esas alındı."
    },

    defense_elixir: {
      name_tr: "Savunma İksiri", name_en: "Defense Elixir", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "clear_liquid_reagent", qty: 1 }, { item: "ash_sap", qty: 6 },
        { item: "pig_blood", qty: 5 }, { item: "purified_water", qty: 3 }
      ]},
      note: "Alchemy Beginner 1. RNG üretim (1-4) — garanti min. (1) esas alındı. Kan tipi (Geyik/Koyun/Domuz/Öküz/Wargon) birbirinin yerine geçebilir."
    },
    helix_elixir: {
      name_tr: "Sarmal İksir", name_en: "Helix Elixir", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "thuja_sap", qty: 6 }, { item: "monks_branch", qty: 3 },
        { item: "clowns_blood", qty: 2 }, { item: "powder_of_flame", qty: 2 }, { item: "purified_water", qty: 3 }
      ]},
      note: "Alchemy Apprentice 1. RNG üretim — garanti min. (1) esas alındı."
    },
    elixir_of_life: {
      name_tr: "Yaşam İksiri", name_en: "Elixir of Life", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "pure_powder_reagent", qty: 1 }, { item: "silver_azalea", qty: 3 },
        { item: "fox_blood", qty: 5 }, { item: "hp_potion_small", qty: 3 }
      ]},
      note: "RNG üretim — garanti min. (1) esas alındı. Alt: Gelincik Kanı, Tilki Kanı yerine geçebilir."
    },
    elixir_of_endurance: {
      name_tr: "Dayanıklılık İksiri", name_en: "Elixir of Endurance", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "pure_powder_reagent", qty: 1 }, { item: "dwarf_mushroom", qty: 2 },
        { item: "birch_sap", qty: 5 }, { item: "bear_blood", qty: 4 }
      ]},
      note: "Alchemy Beginner 1. RNG üretim — garanti min. (1) esas alındı."
    },

    elixir_of_wind: {
      name_tr: "Rüzgar İksiri", name_en: "Elixir of Wind", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "wise_mans_blood", qty: 1 }, { item: "fortune_teller_mushroom", qty: 5 },
        { item: "pine_sap", qty: 5 }, { item: "powder_of_darkness", qty: 2 }
      ]},
      note: "RNG üretim — garanti min. (1) esas alındı."
    },
    elixir_of_spells: {
      name_tr: "Büyü İksiri", name_en: "Elixir of Spells", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "tyrants_blood", qty: 1 }, { item: "fire_flake_flower", qty: 5 },
        { item: "maple_sap", qty: 3 }, { item: "powder_of_darkness", qty: 2 }
      ]},
      note: "Alchemy Apprentice 1. RNG üretim — garanti min. (1) esas alındı."
    },
    elixir_of_shock: {
      name_tr: "Şok İksiri", name_en: "Elixir of Shock", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "clowns_blood", qty: 1 }, { item: "tiger_mushroom", qty: 5 },
        { item: "powder_of_time", qty: 3 }, { item: "cedar_sap", qty: 7 }
      ]},
      note: "Alchemy Apprentice 1. RNG üretim — garanti min. (1) esas alındı."
    },
    elixir_of_swiftness: {
      name_tr: "Çeviklik İksiri", name_en: "Elixir of Swiftness", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "legendary_beasts_blood", qty: 1 }, { item: "arrow_mushroom", qty: 5 },
        { item: "birch_sap", qty: 5 }, { item: "powder_of_darkness", qty: 2 }
      ]},
      note: "Alchemy Apprentice 1. RNG üretim — garanti min. (1) esas alındı."
    },

    elixir_of_perforation: {
      name_tr: "Delme İksiri", name_en: "Elixir of Perforation", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "oil_of_corruption", qty: 1 }, { item: "clear_liquid_reagent", qty: 4 },
        { item: "bluffer_mushroom", qty: 5 }, { item: "pine_sap", qty: 5 }, { item: "trace_of_nature", qty: 2 }
      ]},
      note: "Alchemy Skilled 1. RNG üretim — garanti min. (1) esas alındı."
    },
    elixir_of_death: {
      name_tr: "Ölüm İksiri", name_en: "Elixir of Death", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "oil_of_tranquility", qty: 1 }, { item: "clear_liquid_reagent", qty: 6 },
        { item: "ancient_mushroom", qty: 2 }, { item: "ash_sap", qty: 7 }, { item: "trace_of_nature", qty: 2 }
      ]},
      note: "Alchemy Skilled 1. RNG üretim — garanti min. (1) esas alındı."
    },
    elixir_of_draining: {
      name_tr: "Emme İksiri", name_en: "Elixir of Draining", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "oil_of_fortitude", qty: 1 }, { item: "clear_liquid_reagent", qty: 4 },
        { item: "hump_mushroom", qty: 3 }, { item: "birch_sap", qty: 4 }, { item: "trace_of_nature", qty: 2 }
      ]},
      note: "Alchemy Skilled 1. RNG üretim — garanti min. (1) esas alındı."
    },
    grim_reapers_elixir: {
      name_tr: "Azrail İksiri", name_en: "Grim Reaper's Elixir", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "oil_of_fortitude", qty: 1 }, { item: "pure_powder_reagent", qty: 4 },
        { item: "sky_mushroom", qty: 2 }, { item: "monks_branch", qty: 2 }, { item: "trace_of_nature", qty: 4 }
      ]},
      note: "Alchemy Skilled 1. RNG üretim — garanti min. (1) esas alındı."
    },

    elixir_of_assassination: {
      name_tr: "Suikast İksiri", name_en: "Elixir of Assassination", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "oil_of_regeneration", qty: 1 }, { item: "pure_powder_reagent", qty: 5 },
        { item: "amanita_mushroom", qty: 4 }, { item: "red_tree_lump", qty: 2 }, { item: "trace_of_nature", qty: 2 }
      ]},
      note: "Alchemy Skilled 1+. RNG üretim — garanti min. (1) esas alındı."
    },
    elixir_of_detection: {
      name_tr: "Tespit İksiri", name_en: "Elixir of Detection", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "oil_of_storms", qty: 1 }, { item: "pure_powder_reagent", qty: 6 },
        { item: "truffle_mushroom", qty: 3 }, { item: "trace_of_nature", qty: 3 }, { item: "old_tree_bark", qty: 2 }
      ]},
      note: "Alchemy Skilled 1. RNG üretim — garanti min. (1) esas alındı."
    },
    elixir_of_carnage: {
      name_tr: "Katliam İksiri", name_en: "Elixir of Carnage", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "oil_of_corruption", qty: 1 }, { item: "pure_powder_reagent", qty: 7 },
        { item: "tiger_mushroom", qty: 2 }, { item: "spirits_leaf", qty: 2 }, { item: "trace_of_nature", qty: 3 }
      ]},
      note: "Alchemy Skilled 1. RNG üretim — garanti min. (1) esas alındı."
    },
    elixir_of_sky: {
      name_tr: "Gökyüzü İksiri", name_en: "Elixir of Sky", tier: "base",
      recipe: { output_qty: 1, ingredients: [
        { item: "oil_of_tranquility", qty: 1 }, { item: "pure_powder_reagent", qty: 6 },
        { item: "emperor_mushroom", qty: 1 }, { item: "bloody_tree_knot", qty: 2 }, { item: "trace_of_nature", qty: 4 }
      ]},
      note: "Alchemy Skilled 1. RNG üretim — garanti min. (1) esas alındı."
    },

    ash_sap: { name_tr: "Kül Özsuyu", name_en: "Ash Sap", recipe: null, source: "Toplama — Sıvı Toplayıcı ile kül ağaçlarından." },
    dwarf_mushroom: { name_tr: "Cüce Mantarı", name_en: "Dwarf Mushroom", recipe: null, source: "Toplama — ormanlarda/ovalarda mantar toplama." },
    bear_blood: { name_tr: "Ayı Kanı", name_en: "Bear Blood", recipe: null, source: "Avcılık — ayı avlayıp yüzerek elde edilir." },
    purified_water: { name_tr: "Arıtılmış Su", name_en: "Purified Water", recipe: null, source: "Basit İşleme — normal Su'yun filtrelenmesi." },
    oil_of_regeneration: { name_tr: "Yenilenme Yağı", name_en: "Oil of Regeneration", recipe: null, source: "Old Moon içeriği / canavar düşürmesi / tüccardan satın alma." },
    clear_liquid_reagent: { name_tr: "Berrak Sıvı Reaktifi", name_en: "Clear Liquid Reagent", recipe: null, source: "Simya tüccarından satın alınabilen temel reaktif." },
    cedar_sap: { name_tr: "Sedir Özsuyu", name_en: "Cedar Sap", recipe: null, source: "Toplama — Sıvı Toplayıcı ile sedir ağaçlarından." },
    trace_of_nature: { name_tr: "Doğa İzi", name_en: "Trace of Nature", recipe: null, source: "Old Moon Loncası içeriği / node yatırımı / canavar düşürmesi / Old Moon tüccarından satın alma." },
    ghost_mushroom: { name_tr: "Hayalet Mantarı", name_en: "Ghost Mushroom", recipe: null, source: "Toplama — özellikle Mediah orman bölgelerinde." },
    cloud_mushroom: { name_tr: "Bulut Mantarı", name_en: "Cloud Mushroom", recipe: null, source: "Toplama — dağlık/yayla bölgelerinde." },
    wild_grass: { name_tr: "Yabani Ot", name_en: "Wild Grass", recipe: null, source: "Toplama — ova bölgelerinde ot toplama." },
    oil_of_storms: { name_tr: "Fırtına Yağı", name_en: "Oil of Storms", recipe: null, source: "Old Moon içeriği / canavar düşürmesi / tüccardan satın alma." },
    powder_of_flame: { name_tr: "Alev Tozu", name_en: "Powder of Flame", recipe: null, source: "Old Moon içeriği / canavar düşürmesi / tüccardan satın alma." },
    snowfield_cedar_sap: { name_tr: "Karlı Sedir Özsuyu", name_en: "Snowfield Cedar Sap", recipe: null, source: "Toplama — Kalis/Grana bölgesindeki sedir ağaçlarından." },
    pig_blood: { name_tr: "Domuz Kanı", name_en: "Pig Blood", recipe: null, source: "Avcılık — domuz avlayıp yüzerek elde edilir." },
    thuja_sap: { name_tr: "Thuja Özsuyu", name_en: "Thuja Sap", recipe: null, source: "Toplama — Sıvı Toplayıcı ile thuja ağaçlarından." },
    monks_branch: { name_tr: "Keşiş Dalı", name_en: "Monk's Branch", recipe: null, source: "Toplama — belirli ağaçlardan kesilerek." },
    clowns_blood: { name_tr: "Palyaço Kanı", name_en: "Clown's Blood", recipe: null, source: "Avcılık — belirli canavar düşürmesi." },
    pure_powder_reagent: { name_tr: "Saf Toz Reaktifi", name_en: "Pure Powder Reagent", recipe: null, source: "Simya tüccarından satın alınabilen temel reaktif." },
    silver_azalea: { name_tr: "Gümüş Açelya", name_en: "Silver Azalea", recipe: null, source: "Toplama — çiçek toplama." },
    fox_blood: { name_tr: "Tilki Kanı", name_en: "Fox Blood", recipe: null, source: "Avcılık — tilki avlayıp yüzerek elde edilir." },
    hp_potion_small: { name_tr: "Küçük Can Potu", name_en: "HP Potion (Small)", recipe: null, source: "Aşçılık (Beginner tarifi) — simya dışı, hazır alınabilir/pişirilebilir." },
    birch_sap: { name_tr: "Huş Özsuyu", name_en: "Birch Sap", recipe: null, source: "Toplama — Sıvı Toplayıcı ile huş ağaçlarından." },
    wise_mans_blood: { name_tr: "Bilge Kanı", name_en: "Wise Man's Blood", recipe: null, source: "Avcılık — belirli insansı canavar düşürmesi." },
    fortune_teller_mushroom: { name_tr: "Falcı Mantarı", name_en: "Fortune Teller Mushroom", recipe: null, source: "Toplama — mantar toplama." },
    pine_sap: { name_tr: "Çam Özsuyu", name_en: "Pine Sap", recipe: null, source: "Toplama — Sıvı Toplayıcı ile çam ağaçlarından." },
    powder_of_darkness: { name_tr: "Karanlık Tozu", name_en: "Powder of Darkness", recipe: null, source: "Old Moon içeriği / canavar düşürmesi / tüccardan satın alma." },
    tyrants_blood: { name_tr: "Zorba Kanı", name_en: "Tyrant's Blood", recipe: null, source: "Avcılık — belirli elit canavar düşürmesi." },
    fire_flake_flower: { name_tr: "Ateş Pulu Çiçeği", name_en: "Fire Flake Flower", recipe: null, source: "Toplama — çöl bölgelerinde çiçek toplama." },
    maple_sap: { name_tr: "Akçaağaç Özsuyu", name_en: "Maple Sap", recipe: null, source: "Toplama — Sıvı Toplayıcı ile akçaağaçlardan." },
    tiger_mushroom: { name_tr: "Kaplan Mantarı", name_en: "Tiger Mushroom", recipe: null, source: "Toplama — mantar toplama." },
    powder_of_time: { name_tr: "Zaman Tozu", name_en: "Powder of Time", recipe: null, source: "Old Moon içeriği / canavar düşürmesi / tüccardan satın alma." },
    legendary_beasts_blood: { name_tr: "Efsanevi Canavar Kanı", name_en: "Legendary Beast's Blood", recipe: null, source: "Avcılık — belirli elit/efsanevi canavar düşürmesi." },
    arrow_mushroom: { name_tr: "Ok Mantarı", name_en: "Arrow Mushroom", recipe: null, source: "Toplama — mantar toplama." },
    oil_of_corruption: { name_tr: "Yozlaşma Yağı", name_en: "Oil of Corruption", recipe: null, source: "Old Moon içeriği / canavar düşürmesi / tüccardan satın alma." },
    bluffer_mushroom: { name_tr: "Blöfçü Mantarı", name_en: "Bluffer Mushroom", recipe: null, source: "Toplama — mantar toplama." },
    oil_of_tranquility: { name_tr: "Huzur Yağı", name_en: "Oil of Tranquility", recipe: null, source: "Old Moon içeriği / canavar düşürmesi / tüccardan satın alma." },
    ancient_mushroom: { name_tr: "Antik Mantar", name_en: "Ancient Mushroom", recipe: null, source: "Toplama — daha nadir mantar toplama." },
    oil_of_fortitude: { name_tr: "Metanet Yağı", name_en: "Oil of Fortitude", recipe: null, source: "Old Moon içeriği / canavar düşürmesi / tüccardan satın alma." },
    hump_mushroom: { name_tr: "Hörgüç Mantarı", name_en: "Hump Mushroom", recipe: null, source: "Toplama — mantar toplama." },
    sky_mushroom: { name_tr: "Gökyüzü Mantarı", name_en: "Sky Mushroom", recipe: null, source: "Toplama — mantar toplama." },
    amanita_mushroom: { name_tr: "Amanita Mantarı", name_en: "Amanita Mushroom", recipe: null, source: "Toplama — mantar toplama." },
    red_tree_lump: { name_tr: "Kızıl Ağaç Yumrusu", name_en: "Red Tree Lump", recipe: null, source: "Toplama — belirli ağaçlardan." },
    truffle_mushroom: { name_tr: "Trüf Mantarı", name_en: "Truffle Mushroom", recipe: null, source: "Toplama — trüf rotasyon noktalarından." },
    old_tree_bark: { name_tr: "Yaşlı Ağaç Kabuğu", name_en: "Old Tree Bark", recipe: null, source: "Toplama — yaşlı/antik ağaçlardan kesilerek." },
    spirits_leaf: { name_tr: "Ruh Yaprağı", name_en: "Spirit's Leaf", recipe: null, source: "Toplama — yaprak toplama." },
    emperor_mushroom: { name_tr: "İmparator Mantarı", name_en: "Emperor Mushroom", recipe: null, source: "Toplama — nadir mantar toplama." },
    bloody_tree_knot: { name_tr: "Kanlı Ağaç Boğumu", name_en: "Bloody Tree Knot", recipe: null, source: "Toplama — belirli ağaçlardan." }
  }
};
