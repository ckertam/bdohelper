// BDO Helper — reçete verisi (otomatik üretildi)
//
// Kaynak: bdocodex.com
//   - "item_1399" (Ahenk Öz İksiri) ve 5 ara "Öz İksir" (item_1389/1391/1393/1395/1397) +
//     "item_820936" (Büyülü Katalizör): bdocodex item/recipe sayfalarından elle doğrulandı
//     (bu özel kombinasyon tarifleri normal Simya beceri tablosunda YER ALMAZ).
//   - Simya: bdocodex "Alchemy Recipes" tablosundaki (209 reçete) TÜM kayıtlar.
//   - Aşçılık: bdocodex "Cooking" reçete tablosundaki (321 reçete) TÜM kayıtlar.
//   - Tüm isimler ve ikonlar sitenin kendi tooltip API'sinden (tip.php) çekilen resmi
//     İngilizce/Türkçe verilerle otomatik derlendi; ikonlar bdocodex'e hotlink yapmamak
//     için indirilip yerel icons/ klasöründe barındırılıyor.
//
// Her item: { name_en, name_tr, tier, skill, recipe, note_tr, note_en, source_tr, source_en, icon }
//   recipe: { output_qty, ingredients:[{item, qty}] } | null
//   recipe === null  ->  ham madde / taban malzeme (üretilmez; toplanır/avlanır/satın alınır)
//   tier: "final" | "mid" | "craftable" | "raw"  -> aynı meslek içinde gruplama
//   skill: "alchemy" | "cooking"  -> "Ne üretmek istiyorsun" listesinde hangi meslek
//     seçiliyken bu madde bir HEDEF olarak seçilebilir olsun (sadece recipe'si olanlarda anlamlı)
//   note_tr/note_en: RNG üretim aralığı veya bilinen istisna notu (varsa)
//   source_tr/source_en: bazı ham maddeler için nasıl elde edildiği bilgisi (varsa)
//   icon: yerel görsel dosya yolu (site köküne göre, örn. "icons/item_1399.webp")
//
// Tarifler RNG'li üretir (temel/garanti miktar + şansla bonus adet/üst-tier ürün).
// Buradaki output_qty, garanti edilen MİNİMUM adettir — yani hesap güvenli/muhafazakar
// tarafta kalır (gerçekte biraz daha az ham madde ile de aynı sonucu alabilirsin).

const RECIPES = {
  items: {
  "item_1399": {
    "name_en": "Harmony Draught",
    "name_tr": "Ahenk Öz İksiri",
    "tier": "final",
    "recipe": {
      "output_qty": 10,
      "ingredients": [
        {
          "item": "item_1389",
          "qty": 10
        },
        {
          "item": "item_1391",
          "qty": 10
        },
        {
          "item": "item_1393",
          "qty": 10
        },
        {
          "item": "item_1395",
          "qty": 10
        },
        {
          "item": "item_1397",
          "qty": 10
        }
      ]
    },
    "note_tr": "İtem sayfası özetinde tüketilmeyen bir Büyülü Katalizör'den bahsedilse de, tarif sayfası (mrecipe/6682) katalizör olmadan listeler; tarif sayfası esas alındı.",
    "note_en": "The item page summary briefly mentions a non-consumed Spellbound Catalyst, but the dedicated recipe page (mrecipe/6682) lists no catalyst for this craft; the recipe page was treated as authoritative.",
    "icon": "icons/item_1399.webp",
    "skill": "alchemy"
  },
  "item_1389": {
    "name_en": "Fury Draught",
    "name_tr": "Öfke Öz İksiri",
    "tier": "mid",
    "recipe": {
      "output_qty": 10,
      "ingredients": [
        {
          "item": "item_704",
          "qty": 30
        },
        {
          "item": "item_672",
          "qty": 30
        },
        {
          "item": "item_700",
          "qty": 30
        },
        {
          "item": "item_1180",
          "qty": 30
        },
        {
          "item": "item_820936",
          "qty": 10
        }
      ]
    },
    "note_tr": "Her iksirin üst kaliteli (Advanced/Endless vb.) versiyonu 1:3 oranında yerine geçebilir.",
    "note_en": "A higher-grade version (Advanced/Endless etc.) of each elixir can substitute at a 1:3 ratio.",
    "icon": "icons/item_1389.webp",
    "skill": "alchemy"
  },
  "item_1391": {
    "name_en": "Adaptation Draught",
    "name_tr": "Adaptasyon Öz İksiri",
    "tier": "mid",
    "recipe": {
      "output_qty": 10,
      "ingredients": [
        {
          "item": "item_716",
          "qty": 30
        },
        {
          "item": "item_782",
          "qty": 30
        },
        {
          "item": "item_708",
          "qty": 30
        },
        {
          "item": "item_722",
          "qty": 30
        },
        {
          "item": "item_820936",
          "qty": 10
        }
      ]
    },
    "note_tr": "Her iksirin üst kaliteli (Advanced/Endless vb.) versiyonu 1:3 oranında yerine geçebilir.",
    "note_en": "A higher-grade version (Advanced/Endless etc.) of each elixir can substitute at a 1:3 ratio.",
    "icon": "icons/item_1391.webp",
    "skill": "alchemy"
  },
  "item_1393": {
    "name_en": "Potential Draught",
    "name_tr": "Potansiyel Öz İksiri",
    "tier": "mid",
    "recipe": {
      "output_qty": 10,
      "ingredients": [
        {
          "item": "item_688",
          "qty": 30
        },
        {
          "item": "item_692",
          "qty": 30
        },
        {
          "item": "item_762",
          "qty": 30
        },
        {
          "item": "item_690",
          "qty": 30
        },
        {
          "item": "item_820936",
          "qty": 10
        }
      ]
    },
    "note_tr": "Her iksirin üst kaliteli (Advanced/Endless vb.) versiyonu 1:3 oranında yerine geçebilir.",
    "note_en": "A higher-grade version (Advanced/Endless etc.) of each elixir can substitute at a 1:3 ratio.",
    "icon": "icons/item_1393.webp",
    "skill": "alchemy"
  },
  "item_1395": {
    "name_en": "Corruption Draught",
    "name_tr": "Yozlaşma Öz İksiri",
    "tier": "mid",
    "recipe": {
      "output_qty": 10,
      "ingredients": [
        {
          "item": "item_680",
          "qty": 30
        },
        {
          "item": "item_686",
          "qty": 30
        },
        {
          "item": "item_676",
          "qty": 30
        },
        {
          "item": "item_712",
          "qty": 30
        },
        {
          "item": "item_820936",
          "qty": 10
        }
      ]
    },
    "note_tr": "Her iksirin üst kaliteli (Advanced/Endless vb.) versiyonu 1:3 oranında yerine geçebilir.",
    "note_en": "A higher-grade version (Advanced/Endless etc.) of each elixir can substitute at a 1:3 ratio.",
    "icon": "icons/item_1395.webp",
    "skill": "alchemy"
  },
  "item_1397": {
    "name_en": "Berserk Draught",
    "name_tr": "Cinnet Öz İksiri",
    "tier": "mid",
    "recipe": {
      "output_qty": 10,
      "ingredients": [
        {
          "item": "item_696",
          "qty": 30
        },
        {
          "item": "item_698",
          "qty": 30
        },
        {
          "item": "item_718",
          "qty": 30
        },
        {
          "item": "item_720",
          "qty": 30
        },
        {
          "item": "item_820936",
          "qty": 10
        }
      ]
    },
    "note_tr": "Her iksirin üst kaliteli (Advanced/Endless vb.) versiyonu 1:3 oranında yerine geçebilir.",
    "note_en": "A higher-grade version (Advanced/Endless etc.) of each elixir can substitute at a 1:3 ratio.",
    "icon": "icons/item_1397.webp",
    "skill": "alchemy"
  },
  "item_820936": {
    "name_en": "Spellbound Catalyst",
    "name_tr": "Büyülü Katalizör",
    "tier": "raw",
    "recipe": null,
    "source_tr": "Üretilmez — Old Moon Guild yöneticisinden 1.000.000 gümüşe satın alınır.",
    "source_en": "Not crafted — purchased from the Old Moon Guild manager for 1,000,000 silver each.",
    "icon": "icons/item_820936.webp"
  },
  "item_664": {
    "name_en": "Elixir of Amity",
    "name_tr": "Dostluk İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6351",
          "qty": 1
        },
        {
          "item": "item_5403",
          "qty": 5
        },
        {
          "item": "item_5001",
          "qty": 6
        },
        {
          "item": "item_4901",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_664.webp",
    "skill": "alchemy"
  },
  "item_668": {
    "name_en": "Resurrection Elixir",
    "name_tr": "Dirilme İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5301",
          "qty": 1
        },
        {
          "item": "item_5401",
          "qty": 3
        },
        {
          "item": "item_6656",
          "qty": 3
        },
        {
          "item": "item_517",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_668.webp",
    "skill": "alchemy"
  },
  "item_670": {
    "name_en": "Elixir of Human Hunt",
    "name_tr": "İnsan Avı İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6353",
          "qty": 1
        },
        {
          "item": "item_5407",
          "qty": 4
        },
        {
          "item": "item_5002",
          "qty": 4
        },
        {
          "item": "item_4901",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_670.webp",
    "skill": "alchemy"
  },
  "item_672": {
    "name_en": "Elixir of Frenzy",
    "name_tr": "Çılgınlık İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6601",
          "qty": 1
        },
        {
          "item": "item_5301",
          "qty": 5
        },
        {
          "item": "item_5010",
          "qty": 5
        },
        {
          "item": "item_5960",
          "qty": 3
        },
        {
          "item": "item_5414",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_672.webp",
    "skill": "alchemy"
  },
  "item_674": {
    "name_en": "Golden Hand Elixir",
    "name_tr": "Altın El İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6602",
          "qty": 1
        },
        {
          "item": "item_5301",
          "qty": 4
        },
        {
          "item": "item_5415",
          "qty": 4
        },
        {
          "item": "item_5960",
          "qty": 3
        },
        {
          "item": "item_5009",
          "qty": 6
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_674.webp",
    "skill": "alchemy"
  },
  "item_676": {
    "name_en": "Elixir of Draining",
    "name_tr": "Yağma İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6603",
          "qty": 1
        },
        {
          "item": "item_5301",
          "qty": 4
        },
        {
          "item": "item_5416",
          "qty": 3
        },
        {
          "item": "item_5004",
          "qty": 4
        },
        {
          "item": "item_5960",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_676.webp",
    "skill": "alchemy"
  },
  "item_678": {
    "name_en": "Elixir of Demihuman Hunt",
    "name_tr": "Yarı İnsan Avı İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6354",
          "qty": 1
        },
        {
          "item": "item_5408",
          "qty": 4
        },
        {
          "item": "item_5009",
          "qty": 4
        },
        {
          "item": "item_4901",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_678.webp",
    "skill": "alchemy"
  },
  "item_680": {
    "name_en": "Elixir of Perforation",
    "name_tr": "Delme İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6604",
          "qty": 1
        },
        {
          "item": "item_5301",
          "qty": 4
        },
        {
          "item": "item_5417",
          "qty": 5
        },
        {
          "item": "item_5003",
          "qty": 5
        },
        {
          "item": "item_5960",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_680.webp",
    "skill": "alchemy"
  },
  "item_682": {
    "name_en": "Elixir of Energy",
    "name_tr": "Enerji İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5302",
          "qty": 1
        },
        {
          "item": "item_6203",
          "qty": 4
        },
        {
          "item": "item_6656",
          "qty": 3
        },
        {
          "item": "item_520",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_682.webp",
    "skill": "alchemy"
  },
  "item_684": {
    "name_en": "Elixir of Wings",
    "name_tr": "Kanat İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5402",
          "qty": 2
        },
        {
          "item": "item_5001",
          "qty": 1
        },
        {
          "item": "item_6213",
          "qty": 4
        },
        {
          "item": "item_6656",
          "qty": 5
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_684.webp",
    "skill": "alchemy"
  },
  "item_686": {
    "name_en": "Elixir of Death",
    "name_tr": "Ölüm İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6605",
          "qty": 1
        },
        {
          "item": "item_5301",
          "qty": 6
        },
        {
          "item": "item_5418",
          "qty": 2
        },
        {
          "item": "item_5001",
          "qty": 7
        },
        {
          "item": "item_5960",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_686.webp",
    "skill": "alchemy"
  },
  "item_688": {
    "name_en": "Elixir of Wind",
    "name_tr": "Rüzgar İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6355",
          "qty": 1
        },
        {
          "item": "item_5407",
          "qty": 5
        },
        {
          "item": "item_5003",
          "qty": 5
        },
        {
          "item": "item_4801",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_688.webp",
    "skill": "alchemy"
  },
  "item_690": {
    "name_en": "Elixir of Swiftness",
    "name_tr": "Çabukluk İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6351",
          "qty": 1
        },
        {
          "item": "item_5408",
          "qty": 5
        },
        {
          "item": "item_5004",
          "qty": 5
        },
        {
          "item": "item_4801",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_690.webp",
    "skill": "alchemy"
  },
  "item_692": {
    "name_en": "Elixir of Spells",
    "name_tr": "Sihir İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6352",
          "qty": 1
        },
        {
          "item": "item_5403",
          "qty": 5
        },
        {
          "item": "item_5002",
          "qty": 3
        },
        {
          "item": "item_4801",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_692.webp",
    "skill": "alchemy"
  },
  "item_694": {
    "name_en": "Elixir of Seal",
    "name_tr": "Fok İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5409",
          "qty": 3
        },
        {
          "item": "item_5004",
          "qty": 1
        },
        {
          "item": "item_6214",
          "qty": 4
        },
        {
          "item": "item_6656",
          "qty": 5
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_694.webp",
    "skill": "alchemy"
  },
  "item_696": {
    "name_en": "Elixir of Assassination",
    "name_tr": "Suikastçı İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6601",
          "qty": 1
        },
        {
          "item": "item_5302",
          "qty": 5
        },
        {
          "item": "item_5419",
          "qty": 4
        },
        {
          "item": "item_5011",
          "qty": 2
        },
        {
          "item": "item_5960",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_696.webp",
    "skill": "alchemy"
  },
  "item_698": {
    "name_en": "Elixir of Detection",
    "name_tr": "Tespit İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6602",
          "qty": 1
        },
        {
          "item": "item_5302",
          "qty": 6
        },
        {
          "item": "item_5420",
          "qty": 3
        },
        {
          "item": "item_5008",
          "qty": 2
        },
        {
          "item": "item_5960",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_698.webp",
    "skill": "alchemy"
  },
  "item_700": {
    "name_en": "Elixir of Concentration",
    "name_tr": "Konsantrasyon İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5301",
          "qty": 1
        },
        {
          "item": "item_5410",
          "qty": 3
        },
        {
          "item": "item_5439",
          "qty": 2
        },
        {
          "item": "item_6213",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_700.webp",
    "skill": "alchemy"
  },
  "item_702": {
    "name_en": "Elixir of Will",
    "name_tr": "İrade İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5302",
          "qty": 1
        },
        {
          "item": "item_5401",
          "qty": 4
        },
        {
          "item": "item_6214",
          "qty": 6
        },
        {
          "item": "item_6656",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_702.webp",
    "skill": "alchemy"
  },
  "item_704": {
    "name_en": "Elixir of Fury",
    "name_tr": "Öfke İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5409",
          "qty": 4
        },
        {
          "item": "item_5001",
          "qty": 1
        },
        {
          "item": "item_6213",
          "qty": 4
        },
        {
          "item": "item_6656",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_704.webp",
    "skill": "alchemy"
  },
  "item_706": {
    "name_en": "Elixir of Resistance",
    "name_tr": "Karşı Koyma İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5410",
          "qty": 3
        },
        {
          "item": "item_5004",
          "qty": 1
        },
        {
          "item": "item_6214",
          "qty": 7
        },
        {
          "item": "item_6656",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_706.webp",
    "skill": "alchemy"
  },
  "item_708": {
    "name_en": "Elixir of Life",
    "name_tr": "Yaşam İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5302",
          "qty": 1
        },
        {
          "item": "item_5402",
          "qty": 3
        },
        {
          "item": "item_6203",
          "qty": 5
        },
        {
          "item": "item_517",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_708.webp",
    "skill": "alchemy"
  },
  "item_710": {
    "name_en": "Elixir of Mentality",
    "name_tr": "Mentalite İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5301",
          "qty": 1
        },
        {
          "item": "item_5001",
          "qty": 4
        },
        {
          "item": "item_6656",
          "qty": 3
        },
        {
          "item": "item_520",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_710.webp",
    "skill": "alchemy"
  },
  "item_712": {
    "name_en": "Grim Reaper's Elixir",
    "name_tr": "Ölüm Meleği İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6603",
          "qty": 1
        },
        {
          "item": "item_5302",
          "qty": 4
        },
        {
          "item": "item_5411",
          "qty": 2
        },
        {
          "item": "item_5007",
          "qty": 2
        },
        {
          "item": "item_5960",
          "qty": 4
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_712.webp",
    "skill": "alchemy"
  },
  "item_714": {
    "name_en": "EXP Elixir",
    "name_tr": "Deneyim İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6353",
          "qty": 1
        },
        {
          "item": "item_5404",
          "qty": 7
        },
        {
          "item": "item_5003",
          "qty": 5
        },
        {
          "item": "item_4802",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_714.webp",
    "skill": "alchemy"
  },
  "item_716": {
    "name_en": "Defense Elixir",
    "name_tr": "Savunma İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5301",
          "qty": 1
        },
        {
          "item": "item_5001",
          "qty": 6
        },
        {
          "item": "item_6205",
          "qty": 5
        },
        {
          "item": "item_6656",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_716.webp",
    "skill": "alchemy"
  },
  "item_718": {
    "name_en": "Elixir of Carnage",
    "name_tr": "Katliam İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6604",
          "qty": 1
        },
        {
          "item": "item_5302",
          "qty": 7
        },
        {
          "item": "item_5412",
          "qty": 2
        },
        {
          "item": "item_5006",
          "qty": 2
        },
        {
          "item": "item_5960",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_718.webp",
    "skill": "alchemy"
  },
  "item_720": {
    "name_en": "Elixir of Sky",
    "name_tr": "Gök İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6605",
          "qty": 1
        },
        {
          "item": "item_5302",
          "qty": 6
        },
        {
          "item": "item_5413",
          "qty": 1
        },
        {
          "item": "item_5005",
          "qty": 2
        },
        {
          "item": "item_5960",
          "qty": 4
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_720.webp",
    "skill": "alchemy"
  },
  "item_722": {
    "name_en": "Elixir of Endurance",
    "name_tr": "Dayanım İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5302",
          "qty": 1
        },
        {
          "item": "item_5409",
          "qty": 2
        },
        {
          "item": "item_5004",
          "qty": 5
        },
        {
          "item": "item_6213",
          "qty": 4
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_722.webp",
    "skill": "alchemy"
  },
  "item_724": {
    "name_en": "Worker's Elixir",
    "name_tr": "İşçi İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6354",
          "qty": 1
        },
        {
          "item": "item_5402",
          "qty": 6
        },
        {
          "item": "item_5001",
          "qty": 4
        },
        {
          "item": "item_4802",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_724.webp",
    "skill": "alchemy"
  },
  "item_726": {
    "name_en": "Fisher's Elixir",
    "name_tr": "Balıkçı İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6355",
          "qty": 1
        },
        {
          "item": "item_5401",
          "qty": 6
        },
        {
          "item": "item_5009",
          "qty": 3
        },
        {
          "item": "item_4802",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_726.webp",
    "skill": "alchemy"
  },
  "item_728": {
    "name_en": "Elixir of Burn Removal",
    "name_tr": "Yanık Kaldırma İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5301",
          "qty": 1
        },
        {
          "item": "item_6656",
          "qty": 1
        },
        {
          "item": "item_7313",
          "qty": 2
        },
        {
          "item": "item_5439",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_728.webp",
    "skill": "alchemy"
  },
  "item_729": {
    "name_en": "Antidote Elixir",
    "name_tr": "Panzehir İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5302",
          "qty": 1
        },
        {
          "item": "item_5439",
          "qty": 1
        },
        {
          "item": "item_6205",
          "qty": 2
        },
        {
          "item": "item_9015",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_729.webp",
    "skill": "alchemy"
  },
  "item_730": {
    "name_en": "Elixir of Hemostasis",
    "name_tr": "Pıhtılaştırma İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5302",
          "qty": 1
        },
        {
          "item": "item_5410",
          "qty": 1
        },
        {
          "item": "item_5001",
          "qty": 1
        },
        {
          "item": "item_6656",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_730.webp",
    "skill": "alchemy"
  },
  "item_4076": {
    "name_en": "Metal Solvent",
    "name_tr": "Metal Çözücü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5301",
          "qty": 1
        },
        {
          "item": "item_4051",
          "qty": 3
        },
        {
          "item": "item_4006",
          "qty": 4
        },
        {
          "item": "item_5960",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-2 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-2 per craft (guaranteed min. used)",
    "icon": "icons/item_4076.webp",
    "skill": "alchemy"
  },
  "item_4481": {
    "name_en": "Gem Polisher",
    "name_tr": "Mücevher Parlatıcı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5302",
          "qty": 1
        },
        {
          "item": "item_4070",
          "qty": 4
        },
        {
          "item": "item_5960",
          "qty": 2
        },
        {
          "item": "item_6656",
          "qty": 6
        }
      ]
    },
    "note_tr": "RNG üretim: 1-2 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-2 per craft (guaranteed min. used)",
    "icon": "icons/item_4481.webp",
    "skill": "alchemy"
  },
  "item_4684": {
    "name_en": "Plywood Hardener",
    "name_tr": "Kereste Sertleştirici",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5302",
          "qty": 1
        },
        {
          "item": "item_5005",
          "qty": 3
        },
        {
          "item": "item_5009",
          "qty": 4
        },
        {
          "item": "item_5960",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-2 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-2 per craft (guaranteed min. used)",
    "icon": "icons/item_4684.webp",
    "skill": "alchemy"
  },
  "item_5202": {
    "name_en": "Essence of Crimson Flame",
    "name_tr": "Kızıl Alev Özü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5205",
          "qty": 2
        },
        {
          "item": "item_5409",
          "qty": 3
        },
        {
          "item": "item_5001",
          "qty": 4
        },
        {
          "item": "item_5960",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_5202.webp",
    "skill": "alchemy"
  },
  "item_5204": {
    "name_en": "Essence of Abundance",
    "name_tr": "Bolluk Özü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5205",
          "qty": 2
        },
        {
          "item": "item_5410",
          "qty": 3
        },
        {
          "item": "item_5004",
          "qty": 4
        },
        {
          "item": "item_5960",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_5204.webp",
    "skill": "alchemy"
  },
  "item_5206": {
    "name_en": "Essence of Nature",
    "name_tr": "Doğa Özü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5205",
          "qty": 2
        },
        {
          "item": "item_5407",
          "qty": 3
        },
        {
          "item": "item_5002",
          "qty": 4
        },
        {
          "item": "item_5960",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_5206.webp",
    "skill": "alchemy"
  },
  "item_5208": {
    "name_en": "Essence of the Sun",
    "name_tr": "Güneşin Özü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5205",
          "qty": 2
        },
        {
          "item": "item_5408",
          "qty": 3
        },
        {
          "item": "item_5003",
          "qty": 4
        },
        {
          "item": "item_5960",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_5208.webp",
    "skill": "alchemy"
  },
  "item_5210": {
    "name_en": "Essence of Enchantment",
    "name_tr": "Büyü Özü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5205",
          "qty": 2
        },
        {
          "item": "item_5403",
          "qty": 3
        },
        {
          "item": "item_5001",
          "qty": 4
        },
        {
          "item": "item_4801",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_5210.webp",
    "skill": "alchemy"
  },
  "item_5214": {
    "name_en": "Essence of Perfection",
    "name_tr": "Mükemmellik Özü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5205",
          "qty": 2
        },
        {
          "item": "item_5401",
          "qty": 3
        },
        {
          "item": "item_5002",
          "qty": 4
        },
        {
          "item": "item_4802",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_5214.webp",
    "skill": "alchemy"
  },
  "item_5216": {
    "name_en": "Essence of Destruction",
    "name_tr": "Yıkım Özü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5205",
          "qty": 2
        },
        {
          "item": "item_5402",
          "qty": 3
        },
        {
          "item": "item_5003",
          "qty": 4
        },
        {
          "item": "item_4802",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_5216.webp",
    "skill": "alchemy"
  },
  "item_5301": {
    "name_en": "Clear Liquid Reagent",
    "name_tr": "Berrak Sıvı Reaktif",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5439",
          "qty": 1
        },
        {
          "item": "item_5401",
          "qty": 1
        },
        {
          "item": "item_9001",
          "qty": 1
        },
        {
          "item": "item_6656",
          "qty": 1
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_5301.webp",
    "skill": "alchemy"
  },
  "item_5302": {
    "name_en": "Pure Powder Reagent",
    "name_tr": "Saf Toz Reaktif",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5439",
          "qty": 1
        },
        {
          "item": "item_5402",
          "qty": 1
        },
        {
          "item": "item_9002",
          "qty": 1
        },
        {
          "item": "item_6656",
          "qty": 1
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_5302.webp",
    "skill": "alchemy"
  },
  "item_5603": {
    "name_en": "Herbal Poison",
    "name_tr": "Bitkisel zehir",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5602",
          "qty": 1
        },
        {
          "item": "item_5419",
          "qty": 5
        }
      ]
    },
    "note_tr": "RNG üretim: 1-3 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-3 per craft (guaranteed min. used)",
    "icon": "icons/item_5603.webp",
    "skill": "alchemy"
  },
  "item_5604": {
    "name_en": "Herbal Gunpowder",
    "name_tr": "Bitkisel Barut",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5601",
          "qty": 1
        },
        {
          "item": "item_4801",
          "qty": 1
        }
      ]
    },
    "note_tr": "RNG üretim: 1-3 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-3 per craft (guaranteed min. used)",
    "icon": "icons/item_5604.webp",
    "skill": "alchemy"
  },
  "item_6183": {
    "name_en": "Leather Glaze",
    "name_tr": "Deri Cilası",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5301",
          "qty": 1
        },
        {
          "item": "item_5002",
          "qty": 3
        },
        {
          "item": "item_5960",
          "qty": 3
        },
        {
          "item": "item_4801",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-2 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-2 per craft (guaranteed min. used)",
    "icon": "icons/item_6183.webp",
    "skill": "alchemy"
  },
  "item_6351": {
    "name_en": "Legendary Beast's Blood",
    "name_tr": "Efsanevi Canavar'ın Kanı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5006",
          "qty": 1
        },
        {
          "item": "item_5960",
          "qty": 1
        },
        {
          "item": "item_5302",
          "qty": 1
        },
        {
          "item": "item_6219",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_6351.webp",
    "skill": "alchemy"
  },
  "item_6352": {
    "name_en": "Tyrant's Blood",
    "name_tr": "Zalim'in Kanı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5007",
          "qty": 1
        },
        {
          "item": "item_5960",
          "qty": 1
        },
        {
          "item": "item_5302",
          "qty": 1
        },
        {
          "item": "item_6213",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_6352.webp",
    "skill": "alchemy"
  },
  "item_6353": {
    "name_en": "Clown's Blood",
    "name_tr": "Palyaço Kanı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5006",
          "qty": 1
        },
        {
          "item": "item_4801",
          "qty": 1
        },
        {
          "item": "item_5301",
          "qty": 1
        },
        {
          "item": "item_6214",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_6353.webp",
    "skill": "alchemy"
  },
  "item_6354": {
    "name_en": "Sinner's Blood",
    "name_tr": "Günahkar Kanı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5005",
          "qty": 1
        },
        {
          "item": "item_4802",
          "qty": 1
        },
        {
          "item": "item_5301",
          "qty": 1
        },
        {
          "item": "item_6205",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_6354.webp",
    "skill": "alchemy"
  },
  "item_6355": {
    "name_en": "Wise Man's Blood",
    "name_tr": "Bilge Adamın Kanı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5007",
          "qty": 1
        },
        {
          "item": "item_5960",
          "qty": 1
        },
        {
          "item": "item_5301",
          "qty": 1
        },
        {
          "item": "item_6203",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_6355.webp",
    "skill": "alchemy"
  },
  "item_6601": {
    "name_en": "Oil of Regeneration",
    "name_tr": "Yenilenme Yağı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6351",
          "qty": 1
        },
        {
          "item": "item_5011",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4803",
          "qty": 1
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_6601.webp",
    "skill": "alchemy"
  },
  "item_6602": {
    "name_en": "Oil of Storms",
    "name_tr": "Fırtına Yağı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6352",
          "qty": 1
        },
        {
          "item": "item_5008",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4805",
          "qty": 1
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_6602.webp",
    "skill": "alchemy"
  },
  "item_6603": {
    "name_en": "Oil of Fortitude",
    "name_tr": "Cesaret Yağı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6353",
          "qty": 1
        },
        {
          "item": "item_5007",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4802",
          "qty": 1
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_6603.webp",
    "skill": "alchemy"
  },
  "item_6604": {
    "name_en": "Oil of Corruption",
    "name_tr": "Yozlaşma Yağı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6354",
          "qty": 1
        },
        {
          "item": "item_5006",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4801",
          "qty": 1
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_6604.webp",
    "skill": "alchemy"
  },
  "item_6605": {
    "name_en": "Oil of Tranquility",
    "name_tr": "Sükunet Yağı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6355",
          "qty": 1
        },
        {
          "item": "item_5005",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4804",
          "qty": 1
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_6605.webp",
    "skill": "alchemy"
  },
  "item_15101": {
    "name_en": "Magic Crystal of Infinity - Precision",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Hassasiyet",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15001",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4051",
          "qty": 8
        },
        {
          "item": "item_6203",
          "qty": 5
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15101.webp",
    "skill": "alchemy"
  },
  "item_15102": {
    "name_en": "Magic Crystal of Infinity - Power",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Kuvvet",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4054",
          "qty": 7
        },
        {
          "item": "item_6205",
          "qty": 4
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15102.webp",
    "skill": "alchemy"
  },
  "item_15103": {
    "name_en": "Magic Crystal of Infinity - Carnage",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Katliam",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15003",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4057",
          "qty": 9
        },
        {
          "item": "item_6214",
          "qty": 3
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15103.webp",
    "skill": "alchemy"
  },
  "item_15104": {
    "name_en": "Magic Crystal of Infinity - Carnage",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Katliam",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15004",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4060",
          "qty": 8
        },
        {
          "item": "item_6213",
          "qty": 3
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15104.webp",
    "skill": "alchemy"
  },
  "item_15105": {
    "name_en": "Magic Crystal of Infinity - Carnage",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Katliam",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15005",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4063",
          "qty": 10
        },
        {
          "item": "item_6219",
          "qty": 5
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15105.webp",
    "skill": "alchemy"
  },
  "item_15106": {
    "name_en": "Magic Crystal of Infinity - Armor",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Zırh",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15006",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4466",
          "qty": 3
        },
        {
          "item": "item_5001",
          "qty": 4
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15106.webp",
    "skill": "alchemy"
  },
  "item_15107": {
    "name_en": "Magic Crystal of Infinity - Vigor",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Dinçlik",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15007",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4467",
          "qty": 2
        },
        {
          "item": "item_5002",
          "qty": 4
        },
        {
          "item": "item_15002",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15107.webp",
    "skill": "alchemy"
  },
  "item_15108": {
    "name_en": "Magic Crystal of Infinity - Patience",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Sabır",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15008",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4468",
          "qty": 2
        },
        {
          "item": "item_5004",
          "qty": 4
        },
        {
          "item": "item_15002",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15108.webp",
    "skill": "alchemy"
  },
  "item_15109": {
    "name_en": "Magic Crystal of Infinity - Healing",
    "name_tr": "Sonsuzluğun Sihirli Kristali - İyileşme",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15009",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4469",
          "qty": 2
        },
        {
          "item": "item_5009",
          "qty": 3
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15109.webp",
    "skill": "alchemy"
  },
  "item_15110": {
    "name_en": "Magic Crystal of Infinity - Resonance",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Rezonans",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15010",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4251",
          "qty": 2
        },
        {
          "item": "item_5003",
          "qty": 3
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15110.webp",
    "skill": "alchemy"
  },
  "item_15111": {
    "name_en": "Magic Crystal of Infinity - Swiftness",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Çabukluk",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15011",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4451",
          "qty": 2
        },
        {
          "item": "item_5401",
          "qty": 5
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15111.webp",
    "skill": "alchemy"
  },
  "item_15112": {
    "name_en": "Magic Crystal of Infinity - Adamantine",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Sarsılmaz",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15012",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4454",
          "qty": 2
        },
        {
          "item": "item_5402",
          "qty": 3
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15112.webp",
    "skill": "alchemy"
  },
  "item_15113": {
    "name_en": "Magic Crystal of Infinity - Ascension",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Yükselme",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15013",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4457",
          "qty": 1
        },
        {
          "item": "item_5403",
          "qty": 3
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15113.webp",
    "skill": "alchemy"
  },
  "item_15114": {
    "name_en": "Magic Crystal of Infinity - Descent",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Düşme",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15027",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4451",
          "qty": 1
        },
        {
          "item": "item_5439",
          "qty": 3
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15114.webp",
    "skill": "alchemy"
  },
  "item_15115": {
    "name_en": "Magic Crystal of Infinity - Endurance",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Dayanım",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15028",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4457",
          "qty": 2
        },
        {
          "item": "item_5404",
          "qty": 4
        },
        {
          "item": "item_15002",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15115.webp",
    "skill": "alchemy"
  },
  "item_15116": {
    "name_en": "Magic Crystal of Infinity - Assault",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Saldırı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15014",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4460",
          "qty": 2
        },
        {
          "item": "item_6203",
          "qty": 5
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15116.webp",
    "skill": "alchemy"
  },
  "item_15117": {
    "name_en": "Magic Crystal of Infinity - Sturdiness",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Sağlamlık",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15015",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4463",
          "qty": 1
        },
        {
          "item": "item_6205",
          "qty": 3
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15117.webp",
    "skill": "alchemy"
  },
  "item_15118": {
    "name_en": "Magic Crystal of Infinity - Valor",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Cesaret",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15016",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4466",
          "qty": 3
        },
        {
          "item": "item_6214",
          "qty": 5
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15118.webp",
    "skill": "alchemy"
  },
  "item_15119": {
    "name_en": "Magic Crystal of Infinity - Ensnare",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Tutma",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15029",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4460",
          "qty": 1
        },
        {
          "item": "item_5405",
          "qty": 3
        },
        {
          "item": "item_15002",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15119.webp",
    "skill": "alchemy"
  },
  "item_15121": {
    "name_en": "Magic Crystal of Infinity - Memory",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Hafıza",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15017",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4467",
          "qty": 2
        },
        {
          "item": "item_5407",
          "qty": 3
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15121.webp",
    "skill": "alchemy"
  },
  "item_15122": {
    "name_en": "Magic Crystal of Infinity - Intimidation",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Gözdağı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15018",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4468",
          "qty": 3
        },
        {
          "item": "item_5408",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15122.webp",
    "skill": "alchemy"
  },
  "item_15123": {
    "name_en": "Magic Crystal of Infinity - Vision",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Görüş Mesafesi",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15019",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4469",
          "qty": 2
        },
        {
          "item": "item_5409",
          "qty": 3
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15123.webp",
    "skill": "alchemy"
  },
  "item_15124": {
    "name_en": "Magic Crystal of Infinity - Agility",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Çeviklik",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15020",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_5410",
          "qty": 4
        },
        {
          "item": "item_4251",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15124.webp",
    "skill": "alchemy"
  },
  "item_15126": {
    "name_en": "Magic Crystal of Infinity - Durability",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Dayanıklılık Düşüşü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4051",
          "qty": 8
        },
        {
          "item": "item_6353",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15126.webp",
    "skill": "alchemy"
  },
  "item_15127": {
    "name_en": "Magic Crystal of Infinity - HP Recovery",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Soğurma",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4054",
          "qty": 7
        },
        {
          "item": "item_6355",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15127.webp",
    "skill": "alchemy"
  },
  "item_15128": {
    "name_en": "Magic Crystal of Infinity - MP Recovery",
    "name_tr": "Sonsuzluğun Sihirli Kristali - MP Yenileme",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4057",
          "qty": 9
        },
        {
          "item": "item_6351",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15128.webp",
    "skill": "alchemy"
  },
  "item_15129": {
    "name_en": "Magic Crystal of Infinity - Back Attack",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Arkadan Darbe",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5208",
          "qty": 2
        },
        {
          "item": "item_4251",
          "qty": 3
        },
        {
          "item": "item_6354",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15129.webp",
    "skill": "alchemy"
  },
  "item_15130": {
    "name_en": "Magic Crystal of Infinity - Down Attack",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Yerden Darbe",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4254",
          "qty": 2
        },
        {
          "item": "item_6352",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15130.webp",
    "skill": "alchemy"
  },
  "item_15131": {
    "name_en": "Magic Crystal of Infinity - Air Attack",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Havadan Darbe",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4257",
          "qty": 2
        },
        {
          "item": "item_6355",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15131.webp",
    "skill": "alchemy"
  },
  "item_15132": {
    "name_en": "Magic Crystal of Infinity - Critical Hit",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Kritik Vuruş",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4260",
          "qty": 2
        },
        {
          "item": "item_6351",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15132.webp",
    "skill": "alchemy"
  },
  "item_15133": {
    "name_en": "Magic Crystal of Infinity - Speed Attack",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Hızlı Darbe",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4060",
          "qty": 8
        },
        {
          "item": "item_6354",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15133.webp",
    "skill": "alchemy"
  },
  "item_15134": {
    "name_en": "Magic Crystal of Infinity - Counter Attack",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Kontra Saldırı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4063",
          "qty": 6
        },
        {
          "item": "item_6352",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15134.webp",
    "skill": "alchemy"
  },
  "item_15136": {
    "name_en": "Magic Crystal of Infinity - Max HP",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Maks. HP",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4467",
          "qty": 2
        },
        {
          "item": "item_6353",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_15136.webp",
    "skill": "alchemy"
  },
  "item_15137": {
    "name_en": "Magic Crystal of Infinity - Melee Defense",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Fiziksel Savunma",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4468",
          "qty": 2
        },
        {
          "item": "item_6355",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15137.webp",
    "skill": "alchemy"
  },
  "item_15138": {
    "name_en": "Magic Crystal of Infinity - Ranged Defense",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Mesafeli Savunma",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4469",
          "qty": 2
        },
        {
          "item": "item_6351",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15138.webp",
    "skill": "alchemy"
  },
  "item_15139": {
    "name_en": "Magic Crystal of Infinity - Magic Defense",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Büyü Savunması",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4251",
          "qty": 2
        },
        {
          "item": "item_6354",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15139.webp",
    "skill": "alchemy"
  },
  "item_15146": {
    "name_en": "Magic Crystal of Infinity - Energy",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Enerji",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4451",
          "qty": 4
        },
        {
          "item": "item_6352",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15146.webp",
    "skill": "alchemy"
  },
  "item_15147": {
    "name_en": "Magic Crystal of Infinity - Submergence",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Su Altında Nefes Tutma Artışı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4454",
          "qty": 2
        },
        {
          "item": "item_6353",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15147.webp",
    "skill": "alchemy"
  },
  "item_15148": {
    "name_en": "Magic Crystal of Infinity - Melee Attack",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Fiziksel Hasar",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4457",
          "qty": 3
        },
        {
          "item": "item_6355",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15148.webp",
    "skill": "alchemy"
  },
  "item_15149": {
    "name_en": "Magic Crystal of Infinity - Ranged Attack",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Mesafeli Hasar",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4460",
          "qty": 3
        },
        {
          "item": "item_6351",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15149.webp",
    "skill": "alchemy"
  },
  "item_15150": {
    "name_en": "Magic Crystal of Infinity - Magic Attack",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Büyü Saldırısı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_5206",
          "qty": 2
        },
        {
          "item": "item_4463",
          "qty": 3
        },
        {
          "item": "item_6354",
          "qty": 2
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15150.webp",
    "skill": "alchemy"
  },
  "item_42398": {
    "name_en": "Askasha's Repaired Magic Weapon",
    "name_tr": "Askasha’nın Tamir edilen Büyülü Silahı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_42395",
          "qty": 1
        },
        {
          "item": "item_42396",
          "qty": 1
        },
        {
          "item": "item_42397",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_42398.webp",
    "skill": "alchemy"
  },
  "item_42402": {
    "name_en": "Ardan's Jewel",
    "name_tr": "Ardan’ın Mücevheri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_42399",
          "qty": 1
        },
        {
          "item": "item_42400",
          "qty": 1
        },
        {
          "item": "item_42401",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_42402.webp",
    "skill": "alchemy"
  },
  "item_575": {
    "name_en": "Whale Tendon Potion",
    "name_tr": "Balina Tendon Potu",
    "tier": "craftable",
    "recipe": {
      "output_qty": 10,
      "ingredients": [
        {
          "item": "item_9729",
          "qty": 1
        },
        {
          "item": "item_518",
          "qty": 3
        },
        {
          "item": "item_521",
          "qty": 3
        },
        {
          "item": "item_6656",
          "qty": 8
        }
      ]
    },
    "icon": "icons/item_575.webp",
    "skill": "alchemy"
  },
  "item_732": {
    "name_en": "Whale Tendon Elixir",
    "name_tr": "Balina Tendonu İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9729",
          "qty": 1
        },
        {
          "item": "item_6353",
          "qty": 1
        },
        {
          "item": "item_5001",
          "qty": 12
        },
        {
          "item": "item_6656",
          "qty": 5
        },
        {
          "item": "item_5301",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-2 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-2 per craft (guaranteed min. used)",
    "icon": "icons/item_732.webp",
    "skill": "alchemy"
  },
  "item_734": {
    "name_en": "Perfume of Courage",
    "name_tr": "Cesaret Parfümü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9727",
          "qty": 1
        },
        {
          "item": "item_5960",
          "qty": 3
        },
        {
          "item": "item_5005",
          "qty": 6
        },
        {
          "item": "item_6656",
          "qty": 4
        },
        {
          "item": "item_5301",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_734.webp",
    "skill": "alchemy"
  },
  "item_735": {
    "name_en": "Perfume of Swiftness",
    "name_tr": "Çabukluk Parfümü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9727",
          "qty": 1
        },
        {
          "item": "item_4805",
          "qty": 4
        },
        {
          "item": "item_5406",
          "qty": 6
        },
        {
          "item": "item_6656",
          "qty": 4
        },
        {
          "item": "item_5301",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_735.webp",
    "skill": "alchemy"
  },
  "item_748": {
    "name_en": "Perfume of Khalk",
    "name_tr": "Khalk Parfümü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9736",
          "qty": 1
        },
        {
          "item": "item_5012",
          "qty": 10
        },
        {
          "item": "item_5960",
          "qty": 5
        },
        {
          "item": "item_6656",
          "qty": 4
        },
        {
          "item": "item_6604",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_748.webp",
    "skill": "alchemy"
  },
  "item_761": {
    "name_en": "Marking Reagent",
    "name_tr": "İşaretleme Reaktifi",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6354",
          "qty": 1
        },
        {
          "item": "item_15019",
          "qty": 1
        },
        {
          "item": "item_5604",
          "qty": 1
        },
        {
          "item": "item_44084",
          "qty": 1
        },
        {
          "item": "item_4901",
          "qty": 5
        }
      ]
    },
    "note_tr": "RNG üretim: 1-3 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-3 per craft (guaranteed min. used)",
    "icon": "icons/item_761.webp",
    "skill": "alchemy"
  },
  "item_753": {
    "name_en": "Elixir of Training",
    "name_tr": "Eğitim İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6351",
          "qty": 1
        },
        {
          "item": "item_5402",
          "qty": 7
        },
        {
          "item": "item_5003",
          "qty": 4
        },
        {
          "item": "item_4803",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_753.webp",
    "skill": "alchemy"
  },
  "item_749": {
    "name_en": "Elixir of Time",
    "name_tr": "Zaman İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6355",
          "qty": 1
        },
        {
          "item": "item_5403",
          "qty": 6
        },
        {
          "item": "item_4805",
          "qty": 2
        },
        {
          "item": "item_5002",
          "qty": 5
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_749.webp",
    "skill": "alchemy"
  },
  "item_762": {
    "name_en": "Elixir of Shock",
    "name_tr": "Şok İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6353",
          "qty": 1
        },
        {
          "item": "item_5412",
          "qty": 5
        },
        {
          "item": "item_5010",
          "qty": 7
        },
        {
          "item": "item_4805",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_762.webp",
    "skill": "alchemy"
  },
  "item_771": {
    "name_en": "Perfume of Deep Sea",
    "name_tr": "Derin Deniz Parfümü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6606",
          "qty": 1
        },
        {
          "item": "item_6533",
          "qty": 2
        },
        {
          "item": "item_5301",
          "qty": 5
        },
        {
          "item": "item_5408",
          "qty": 5
        },
        {
          "item": "item_5012",
          "qty": 5
        }
      ]
    },
    "icon": "icons/item_771.webp",
    "skill": "alchemy"
  },
  "item_6606": {
    "name_en": "Oil of the Abyss",
    "name_tr": "Abis Yağı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6352",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4805",
          "qty": 2
        },
        {
          "item": "item_5005",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_6606.webp",
    "skill": "alchemy"
  },
  "item_15120": {
    "name_en": "Magic Crystal of Infinity - Strength",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Güç",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15030",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_5002",
          "qty": 3
        },
        {
          "item": "item_4463",
          "qty": 1
        },
        {
          "item": "item_15001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15120.webp",
    "skill": "alchemy"
  },
  "item_781": {
    "name_en": "Perfume of Spirits",
    "name_tr": "Ruh Parfümü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5019",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_5018",
          "qty": 10
        },
        {
          "item": "item_4801",
          "qty": 10
        },
        {
          "item": "item_5526",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_781.webp",
    "skill": "alchemy"
  },
  "item_740": {
    "name_en": "Griffon's Elixir",
    "name_tr": "Grifon İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9741",
          "qty": 1
        },
        {
          "item": "item_5010",
          "qty": 6
        },
        {
          "item": "item_5960",
          "qty": 3
        },
        {
          "item": "item_6656",
          "qty": 3
        },
        {
          "item": "item_6354",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_740.webp",
    "skill": "alchemy"
  },
  "item_777": {
    "name_en": "Looney Elixir",
    "name_tr": "Looney İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5017",
          "qty": 4
        },
        {
          "item": "item_5517",
          "qty": 2
        },
        {
          "item": "item_4802",
          "qty": 3
        },
        {
          "item": "item_5011",
          "qty": 5
        },
        {
          "item": "item_5526",
          "qty": 1
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_777.webp",
    "skill": "alchemy"
  },
  "item_773": {
    "name_en": "Weenie Elixir",
    "name_tr": "Weenie İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5017",
          "qty": 4
        },
        {
          "item": "item_5516",
          "qty": 2
        },
        {
          "item": "item_4805",
          "qty": 3
        },
        {
          "item": "item_5007",
          "qty": 5
        },
        {
          "item": "item_5525",
          "qty": 1
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_773.webp",
    "skill": "alchemy"
  },
  "item_15125": {
    "name_en": "Magic Crystal of Infinity - Experience",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Deneyim",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_15001",
          "qty": 1
        },
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_4260",
          "qty": 2
        },
        {
          "item": "item_5406",
          "qty": 2
        },
        {
          "item": "item_15031",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15125.webp",
    "skill": "alchemy"
  },
  "item_42413": {
    "name_en": "Elixir of Fond Memories",
    "name_tr": "Güzel Hatıralar İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_42411",
          "qty": 1
        },
        {
          "item": "item_42412",
          "qty": 1
        },
        {
          "item": "item_6601",
          "qty": 1
        },
        {
          "item": "item_5960",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_42413.webp",
    "skill": "alchemy"
  },
  "item_9734": {
    "name_en": "Broken Alchemy Stone Shard",
    "name_tr": "Kırık Kimya Taşı Parçası",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9733",
          "qty": 10
        },
        {
          "item": "item_6354",
          "qty": 3
        },
        {
          "item": "item_4805",
          "qty": 5
        },
        {
          "item": "item_5302",
          "qty": 10
        },
        {
          "item": "item_5301",
          "qty": 10
        }
      ]
    },
    "icon": "icons/item_9734.webp",
    "skill": "alchemy"
  },
  "item_54032": {
    "name_en": "Special Honey Jar",
    "name_tr": "Özel Bal Kavanozu",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7704",
          "qty": 2
        },
        {
          "item": "item_5205",
          "qty": 5
        },
        {
          "item": "item_9057",
          "qty": 1
        },
        {
          "item": "item_6656",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_54032.webp",
    "skill": "alchemy"
  },
  "item_782": {
    "name_en": "Helix Elixir",
    "name_tr": "Helix İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5020",
          "qty": 6
        },
        {
          "item": "item_5007",
          "qty": 3
        },
        {
          "item": "item_6353",
          "qty": 2
        },
        {
          "item": "item_4802",
          "qty": 2
        },
        {
          "item": "item_6656",
          "qty": 3
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_782.webp",
    "skill": "alchemy"
  },
  "item_45201": {
    "name_en": "불완전한 파괴의 연금석",
    "name_tr": "불완전한 파괴의 연금석",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9733",
          "qty": 10
        },
        {
          "item": "item_6354",
          "qty": 3
        },
        {
          "item": "item_4805",
          "qty": 5
        },
        {
          "item": "item_5302",
          "qty": 10
        },
        {
          "item": "item_5301",
          "qty": 10
        }
      ]
    },
    "icon": "icons/item_45201.webp",
    "skill": "alchemy"
  },
  "item_15156": {
    "name_en": "Magic Crystal of Infinity - Skill",
    "name_tr": "Sonsuzluğun Sihirli Kristali - Beceri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5205",
          "qty": 2
        },
        {
          "item": "item_15002",
          "qty": 1
        },
        {
          "item": "item_4451",
          "qty": 2
        },
        {
          "item": "item_5406",
          "qty": 6
        },
        {
          "item": "item_6500",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_15156.webp",
    "skill": "alchemy"
  },
  "item_1152": {
    "name_en": "Elixir of Skill",
    "name_tr": "Beceri İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6355",
          "qty": 2
        },
        {
          "item": "item_5538",
          "qty": 5
        },
        {
          "item": "item_4805",
          "qty": 2
        },
        {
          "item": "item_5023",
          "qty": 5
        },
        {
          "item": "item_5960",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_1152.webp",
    "skill": "alchemy"
  },
  "item_1155": {
    "name_en": "Elixir of Mastery",
    "name_tr": "Becerikli İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6605",
          "qty": 2
        },
        {
          "item": "item_5606",
          "qty": 3
        },
        {
          "item": "item_5023",
          "qty": 5
        },
        {
          "item": "item_5406",
          "qty": 5
        },
        {
          "item": "item_5960",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_1155.webp",
    "skill": "alchemy"
  },
  "item_1156": {
    "name_en": "Elixir of Labor",
    "name_tr": "İş İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6354",
          "qty": 2
        },
        {
          "item": "item_5606",
          "qty": 2
        },
        {
          "item": "item_4805",
          "qty": 2
        },
        {
          "item": "item_5023",
          "qty": 4
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_1156.webp",
    "skill": "alchemy"
  },
  "item_1157": {
    "name_en": "Elixir of Armor",
    "name_tr": "Zırh İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6603",
          "qty": 3
        },
        {
          "item": "item_5606",
          "qty": 3
        },
        {
          "item": "item_5023",
          "qty": 5
        },
        {
          "item": "item_9778",
          "qty": 1
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_1157.webp",
    "skill": "alchemy"
  },
  "item_1161": {
    "name_en": "Perfume of Charm",
    "name_tr": "Cezbetme Parfümü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9779",
          "qty": 2
        },
        {
          "item": "item_9733",
          "qty": 3
        },
        {
          "item": "item_5406",
          "qty": 5
        },
        {
          "item": "item_5535",
          "qty": 1
        },
        {
          "item": "item_6656",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_1161.webp",
    "skill": "alchemy"
  },
  "item_9779": {
    "name_en": "Oil of Enchantment",
    "name_tr": "Büyü Yağı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5205",
          "qty": 1
        },
        {
          "item": "item_5606",
          "qty": 1
        },
        {
          "item": "item_6656",
          "qty": 2
        },
        {
          "item": "item_5406",
          "qty": 2
        },
        {
          "item": "item_9778",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 1-2 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-2 per craft (guaranteed min. used)",
    "icon": "icons/item_9779.webp",
    "skill": "alchemy"
  },
  "item_5606": {
    "name_en": "Refined Delotia Reagent",
    "name_tr": "Rafine Edilmiş Delotia Reaktif",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5605",
          "qty": 3
        },
        {
          "item": "item_5301",
          "qty": 1
        },
        {
          "item": "item_5302",
          "qty": 1
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_5606.webp",
    "skill": "alchemy"
  },
  "item_1178": {
    "name_en": "Corrupt Oil of Immortality",
    "name_tr": "Yozlaşmış Ölümsüzlük Yağı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_44461",
          "qty": 1
        },
        {
          "item": "item_5964",
          "qty": 1
        },
        {
          "item": "item_6601",
          "qty": 20
        },
        {
          "item": "item_6603",
          "qty": 20
        },
        {
          "item": "item_6604",
          "qty": 20
        }
      ]
    },
    "icon": "icons/item_1178.webp",
    "skill": "alchemy"
  },
  "item_5125": {
    "name_en": "Runn Light Fragment",
    "name_tr": "Rün Işığı Parçası",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5122",
          "qty": 1
        },
        {
          "item": "item_721009",
          "qty": 1
        },
        {
          "item": "item_721010",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_5125.webp",
    "skill": "alchemy"
  },
  "item_1180": {
    "name_en": "Elixir of Destruction",
    "name_tr": "Yıkım İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6602",
          "qty": 1
        },
        {
          "item": "item_5960",
          "qty": 3
        },
        {
          "item": "item_5301",
          "qty": 5
        },
        {
          "item": "item_4802",
          "qty": 5
        },
        {
          "item": "item_5024",
          "qty": 7
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_1180.webp",
    "skill": "alchemy"
  },
  "item_1184": {
    "name_en": "Elixir of Persistence",
    "name_tr": "Azim İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6605",
          "qty": 1
        },
        {
          "item": "item_5960",
          "qty": 2
        },
        {
          "item": "item_5546",
          "qty": 3
        },
        {
          "item": "item_5301",
          "qty": 5
        },
        {
          "item": "item_4805",
          "qty": 7
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_1184.webp",
    "skill": "alchemy"
  },
  "item_1188": {
    "name_en": "Elixir of Brawn",
    "name_tr": "Kuvvet İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6603",
          "qty": 1
        },
        {
          "item": "item_5960",
          "qty": 2
        },
        {
          "item": "item_5550",
          "qty": 3
        },
        {
          "item": "item_5302",
          "qty": 5
        },
        {
          "item": "item_4804",
          "qty": 7
        }
      ]
    },
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)",
    "icon": "icons/item_1188.webp",
    "skill": "alchemy"
  },
  "item_1200": {
    "name_en": "Perfume of Insight",
    "name_tr": "Önsezi Parfümü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9791",
          "qty": 1
        },
        {
          "item": "item_5960",
          "qty": 3
        },
        {
          "item": "item_5007",
          "qty": 3
        },
        {
          "item": "item_6656",
          "qty": 3
        },
        {
          "item": "item_4803",
          "qty": 5
        }
      ]
    },
    "icon": "icons/item_1200.webp",
    "skill": "alchemy"
  },
  "item_5140": {
    "name_en": "Miloberry's Apu Apu Waterstarwort",
    "name_tr": "Miloberry'nin Apu Apu Yaprağı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 5,
      "ingredients": [
        {
          "item": "item_5019",
          "qty": 1
        },
        {
          "item": "item_5651",
          "qty": 10
        },
        {
          "item": "item_9057",
          "qty": 10
        },
        {
          "item": "item_5006",
          "qty": 10
        }
      ]
    },
    "note_tr": "RNG üretim: 5-10 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 5-10 per craft (guaranteed min. used)",
    "icon": "icons/item_5140.webp",
    "skill": "alchemy"
  },
  "item_5198": {
    "name_en": "Dragon's Tears",
    "name_tr": "Ejderhanın Gözyaşı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6651",
          "qty": 50
        },
        {
          "item": "item_5301",
          "qty": 50
        },
        {
          "item": "item_5406",
          "qty": 50
        },
        {
          "item": "item_5960",
          "qty": 50
        },
        {
          "item": "item_4918",
          "qty": 4
        }
      ]
    },
    "note_tr": "RNG üretim: 1-2 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-2 per craft (guaranteed min. used)",
    "icon": "icons/item_5198.webp",
    "skill": "alchemy"
  },
  "item_65741": {
    "name_en": "Essence of Tunta",
    "name_tr": "Tunta'nın Özü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5205",
          "qty": 50
        },
        {
          "item": "item_5606",
          "qty": 50
        },
        {
          "item": "item_6165",
          "qty": 50
        },
        {
          "item": "item_4999",
          "qty": 10
        },
        {
          "item": "item_42435",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_65741.webp",
    "skill": "alchemy"
  },
  "item_766001": {
    "name_en": "Purified Lightstone of Fire",
    "name_tr": "Ateşin Arındırılmış Işık Taşı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_766104",
          "qty": 1
        },
        {
          "item": "item_4999",
          "qty": 10
        },
        {
          "item": "item_16001",
          "qty": 10
        },
        {
          "item": "item_4802",
          "qty": 50
        },
        {
          "item": "item_5301",
          "qty": 50
        }
      ]
    },
    "icon": "icons/item_766001.webp",
    "skill": "alchemy"
  },
  "item_766011": {
    "name_en": "Purified Lightstone of Earth",
    "name_tr": "Toprağın Arındırılmış Işık Taşı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_766105",
          "qty": 1
        },
        {
          "item": "item_4999",
          "qty": 10
        },
        {
          "item": "item_16001",
          "qty": 10
        },
        {
          "item": "item_4804",
          "qty": 50
        },
        {
          "item": "item_5302",
          "qty": 50
        }
      ]
    },
    "icon": "icons/item_766011.webp",
    "skill": "alchemy"
  },
  "item_766021": {
    "name_en": "Purified Lightstone of Wind",
    "name_tr": "Rüzgarın Arındırılmış Işık Taşı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_766106",
          "qty": 1
        },
        {
          "item": "item_4999",
          "qty": 10
        },
        {
          "item": "item_16001",
          "qty": 10
        },
        {
          "item": "item_4803",
          "qty": 50
        },
        {
          "item": "item_5301",
          "qty": 50
        }
      ]
    },
    "icon": "icons/item_766021.webp",
    "skill": "alchemy"
  },
  "item_766031": {
    "name_en": "Purified Lightstone of Flora",
    "name_tr": "Floranın Arındırılmış Işık Taşı",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_766107",
          "qty": 1
        },
        {
          "item": "item_4999",
          "qty": 10
        },
        {
          "item": "item_16001",
          "qty": 10
        },
        {
          "item": "item_4805",
          "qty": 50
        },
        {
          "item": "item_5302",
          "qty": 50
        }
      ]
    },
    "icon": "icons/item_766031.webp",
    "skill": "alchemy"
  },
  "item_9733": {
    "name_en": "Shining Powder",
    "name_tr": "Pırıltılı Toz",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5302",
          "qty": 1
        },
        {
          "item": "item_6208",
          "qty": 2
        },
        {
          "item": "item_5960",
          "qty": 1
        },
        {
          "item": "item_5006",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9733.webp",
    "skill": "alchemy"
  },
  "item_699": {
    "name_en": "Elixir of Sharp Detection",
    "name_tr": "Keskin Tespit İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 25,
      "ingredients": [
        {
          "item": "item_6602",
          "qty": 1
        },
        {
          "item": "item_5302",
          "qty": 6
        },
        {
          "item": "item_820909",
          "qty": 3
        },
        {
          "item": "item_5960",
          "qty": 3
        },
        {
          "item": "item_5008",
          "qty": 2
        }
      ]
    },
    "note_tr": "RNG üretim: 25-35 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 25-35 per craft (guaranteed min. used)",
    "icon": "icons/item_699.webp",
    "skill": "alchemy"
  },
  "item_5121": {
    "name_en": "Charred Stone",
    "name_tr": "Ateşte Kömürleşmiş Taş",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_4999",
          "qty": 10
        },
        {
          "item": "item_4802",
          "qty": 10
        },
        {
          "item": "item_4070",
          "qty": 10
        },
        {
          "item": "item_6603",
          "qty": 10
        },
        {
          "item": "item_9733",
          "qty": 10
        }
      ]
    },
    "icon": "icons/item_5121.webp",
    "skill": "alchemy"
  },
  "item_15668": {
    "name_en": "Kagtunak",
    "name_tr": "Kagtunak",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_4989",
          "qty": 1
        },
        {
          "item": "item_6603",
          "qty": 1
        },
        {
          "item": "item_5020",
          "qty": 5
        },
        {
          "item": "item_4803",
          "qty": 10
        }
      ]
    },
    "icon": "icons/item_15668.webp",
    "skill": "alchemy"
  },
  "item_1409": {
    "name_en": "Elixir of Edania",
    "name_tr": "Edania İksiri",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6354",
          "qty": 2
        },
        {
          "item": "item_5960",
          "qty": 4
        },
        {
          "item": "item_5008",
          "qty": 5
        },
        {
          "item": "item_5301",
          "qty": 5
        },
        {
          "item": "item_5025",
          "qty": 6
        }
      ]
    },
    "icon": "icons/item_1409.webp",
    "skill": "alchemy"
  },
  "item_1413": {
    "name_en": "Perfume of Tenacity",
    "name_tr": "Kararlılık Parfümü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5960",
          "qty": 5
        },
        {
          "item": "item_5006",
          "qty": 5
        },
        {
          "item": "item_5302",
          "qty": 5
        },
        {
          "item": "item_6601",
          "qty": 6
        },
        {
          "item": "item_821255",
          "qty": 30
        }
      ]
    },
    "icon": "icons/item_1413.webp",
    "skill": "alchemy"
  },
  "item_1411": {
    "name_en": "Perfume of Envy",
    "name_tr": "Tutku Parfümü",
    "tier": "craftable",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5960",
          "qty": 5
        },
        {
          "item": "item_5011",
          "qty": 5
        },
        {
          "item": "item_5301",
          "qty": 5
        },
        {
          "item": "item_6604",
          "qty": 6
        },
        {
          "item": "item_821255",
          "qty": 30
        }
      ]
    },
    "icon": "icons/item_1411.webp",
    "skill": "alchemy"
  },
  "item_5403": {
    "name_en": "Fire Flake Flower",
    "name_tr": "Ateş Tanesi Çiçeği",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5403.webp"
  },
  "item_5001": {
    "name_en": "Ash Sap",
    "name_tr": "Dişbudak Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5001.webp"
  },
  "item_4901": {
    "name_en": "Black Stone Powder",
    "name_tr": "Kara Taş Tozu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4901.webp"
  },
  "item_5401": {
    "name_en": "Sunrise Herb",
    "name_tr": "Gündoğumu Bitkisi",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5401.webp"
  },
  "item_6656": {
    "name_en": "Purified Water",
    "name_tr": "Saf Su",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_6656.webp"
  },
  "item_517": {
    "name_en": "HP Potion (Small)",
    "name_tr": "HP Pot (Küçük)",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_517.webp"
  },
  "item_5407": {
    "name_en": "Fortune Teller Mushroom",
    "name_tr": "Kahin Mantar",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5407.webp"
  },
  "item_5002": {
    "name_en": "Maple Sap",
    "name_tr": "Akçaağaç Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5002.webp"
  },
  "item_5010": {
    "name_en": "Cedar Sap",
    "name_tr": "Sedir Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5010.webp"
  },
  "item_5960": {
    "name_en": "Trace of Nature",
    "name_tr": "Doğa İzi",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5960.webp"
  },
  "item_5414": {
    "name_en": "Ghost Mushroom",
    "name_tr": "Hayalet Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5414.webp"
  },
  "item_5415": {
    "name_en": "Fog Mushroom",
    "name_tr": "Sis Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5415.webp"
  },
  "item_5009": {
    "name_en": "Fir Sap",
    "name_tr": "Köknar Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5009.webp"
  },
  "item_5416": {
    "name_en": "Hump Mushroom",
    "name_tr": "Kambur Mantar",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5416.webp"
  },
  "item_5004": {
    "name_en": "Birch Sap",
    "name_tr": "Huş Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5004.webp"
  },
  "item_5408": {
    "name_en": "Arrow Mushroom",
    "name_tr": "Ok Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5408.webp"
  },
  "item_5417": {
    "name_en": "Bluffer Mushroom",
    "name_tr": "Blöf Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5417.webp"
  },
  "item_5003": {
    "name_en": "Pine Sap",
    "name_tr": "Çam Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5003.webp"
  },
  "item_6203": {
    "name_en": "Fox Blood",
    "name_tr": "Tilki Kanı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_6203.webp"
  },
  "item_520": {
    "name_en": "MP Potion (Small)",
    "name_tr": "MP Pot (Küçük)",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_520.webp"
  },
  "item_5402": {
    "name_en": "Silver Azalea",
    "name_tr": "Gümüş Açelya",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5402.webp"
  },
  "item_6213": {
    "name_en": "Bear Blood",
    "name_tr": "Ayı Kanı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_6213.webp"
  },
  "item_5418": {
    "name_en": "Ancient Mushroom",
    "name_tr": "Kadim Mantar",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5418.webp"
  },
  "item_4801": {
    "name_en": "Powder of Darkness",
    "name_tr": "Karanlık Tozu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4801.webp"
  },
  "item_5409": {
    "name_en": "Dwarf Mushroom",
    "name_tr": "Cüce Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5409.webp"
  },
  "item_6214": {
    "name_en": "Wolf Blood",
    "name_tr": "Kurt Kanı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_6214.webp"
  },
  "item_5419": {
    "name_en": "Amanita Mushroom",
    "name_tr": "Amanita Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5419.webp"
  },
  "item_5011": {
    "name_en": "Red Tree Lump",
    "name_tr": "Kızıl Ağaç Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5011.webp"
  },
  "item_5420": {
    "name_en": "Truffle Mushroom",
    "name_tr": "Makarna Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5420.webp"
  },
  "item_5008": {
    "name_en": "Old Tree Bark",
    "name_tr": "Eski Ağaç Kabuğu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5008.webp"
  },
  "item_5410": {
    "name_en": "Cloud Mushroom",
    "name_tr": "Bulut Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5410.webp"
  },
  "item_5439": {
    "name_en": "Wild Grass",
    "name_tr": "Yabani Çimen",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5439.webp"
  },
  "item_5411": {
    "name_en": "Sky Mushroom",
    "name_tr": "Gök Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5411.webp"
  },
  "item_5007": {
    "name_en": "Monk's Branch",
    "name_tr": "Keşiş Dalı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5007.webp"
  },
  "item_5404": {
    "name_en": "Dry Mane Grass",
    "name_tr": "Kuru Yelken Otu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5404.webp"
  },
  "item_4802": {
    "name_en": "Powder of Flame",
    "name_tr": "Alev Tozu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4802.webp"
  },
  "item_6205": {
    "name_en": "Pig Blood",
    "name_tr": "Domuz Kanı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_6205.webp"
  },
  "item_5412": {
    "name_en": "Tiger Mushroom",
    "name_tr": "Kaplan Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5412.webp"
  },
  "item_5006": {
    "name_en": "Spirit's Leaf",
    "name_tr": "Ruh Yaprağı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5006.webp"
  },
  "item_5413": {
    "name_en": "Emperor Mushroom",
    "name_tr": "İmparator Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5413.webp"
  },
  "item_5005": {
    "name_en": "Bloody Tree Knot",
    "name_tr": "Kızıl Budak",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5005.webp"
  },
  "item_7313": {
    "name_en": "Apple",
    "name_tr": "Elma",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_7313.webp"
  },
  "item_9015": {
    "name_en": "Olive Oil",
    "name_tr": "Zeytin Yağı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_9015.webp"
  },
  "item_4051": {
    "name_en": "Melted Iron Shard",
    "name_tr": "Erimiş Demir Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4051.webp"
  },
  "item_4006": {
    "name_en": "Rough Stone",
    "name_tr": "Kaba Taş",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4006.webp"
  },
  "item_4070": {
    "name_en": "Processed Coal",
    "name_tr": "İşlenmiş Kömür",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4070.webp"
  },
  "item_5205": {
    "name_en": "Fruit of Nature",
    "name_tr": "Doğa Meyvesi",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5205.webp"
  },
  "item_9001": {
    "name_en": "Salt",
    "name_tr": "Tuz",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_9001.webp"
  },
  "item_9002": {
    "name_en": "Sugar",
    "name_tr": "Şeker",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_9002.webp"
  },
  "item_5602": {
    "name_en": "Insectivore Plant Sap",
    "name_tr": "Böcek Yiyen Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5602.webp"
  },
  "item_5601": {
    "name_en": "Insectivore Plant Powder",
    "name_tr": "Böcek Yiyen Bitki Tozu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5601.webp"
  },
  "item_6219": {
    "name_en": "Bat Blood",
    "name_tr": "Yarasa Kanı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_6219.webp"
  },
  "item_4803": {
    "name_en": "Powder of Rifts",
    "name_tr": "Yarık Tozu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4803.webp"
  },
  "item_4805": {
    "name_en": "Powder of Time",
    "name_tr": "Zaman Tozu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4805.webp"
  },
  "item_4804": {
    "name_en": "Powder of Earth",
    "name_tr": "Toprak Tozu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4804.webp"
  },
  "item_15001": {
    "name_en": "Magic Crystal of Crimson Flame - Precision",
    "name_tr": "Kızıl Alevin Sihirli Kristali - Hassasiyet",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15001.webp"
  },
  "item_15002": {
    "name_en": "Magic Crystal of Crimson Flame - Power",
    "name_tr": "Kızıl Alevin Sihirli Kristali - Kuvvet",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15002.webp"
  },
  "item_4054": {
    "name_en": "Melted Lead Shard",
    "name_tr": "Erimiş Kurşun Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4054.webp"
  },
  "item_15003": {
    "name_en": "Magic Crystal of Crimson Flame - Carnage",
    "name_tr": "Kızıl Alevin Sihirli Kristali - Katliam",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15003.webp"
  },
  "item_4057": {
    "name_en": "Melted Copper Shard",
    "name_tr": "Erimiş Bakır Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4057.webp"
  },
  "item_15004": {
    "name_en": "Magic Crystal of Crimson Flame - Carnage",
    "name_tr": "Kızıl Alevin Sihirli Kristali - Katliam",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15004.webp"
  },
  "item_4060": {
    "name_en": "Melted Tin Shard",
    "name_tr": "Erimiş Kalay Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4060.webp"
  },
  "item_15005": {
    "name_en": "Magic Crystal of Crimson Flame - Carnage",
    "name_tr": "Kızıl Alevin Sihirli Kristali - Katliam",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15005.webp"
  },
  "item_4063": {
    "name_en": "Melted Zinc Shard",
    "name_tr": "Erimiş Çinko Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4063.webp"
  },
  "item_15006": {
    "name_en": "Magic Crystal of Abundance - Armor",
    "name_tr": "Bolluğun Sihirli Kristali - Zırh",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15006.webp"
  },
  "item_4466": {
    "name_en": "Translucent Crystal",
    "name_tr": "Saydam Kristal",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4466.webp"
  },
  "item_15007": {
    "name_en": "Magic Crystal of Abundance - Vigor",
    "name_tr": "Bolluğun Sihirli Kristali - Dinçlik",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15007.webp"
  },
  "item_4467": {
    "name_en": "Mud Crystal",
    "name_tr": "Çamur Kristali",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4467.webp"
  },
  "item_15008": {
    "name_en": "Magic Crystal of Abundance - Patience",
    "name_tr": "Bolluğun Sihirli Kristali - Sabır",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15008.webp"
  },
  "item_4468": {
    "name_en": "Red Crystal",
    "name_tr": "Kırmızı Kristal",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4468.webp"
  },
  "item_15009": {
    "name_en": "Magic Crystal of Abundance - Healing",
    "name_tr": "Bolluğun Sihirli Kristali - İyileşme",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15009.webp"
  },
  "item_4469": {
    "name_en": "Green Crystal",
    "name_tr": "Yeşil Kristal",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4469.webp"
  },
  "item_15010": {
    "name_en": "Magic Crystal of Abundance - Resonance",
    "name_tr": "Bolluğun Sihirli Kristali - Rezonans",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15010.webp"
  },
  "item_4251": {
    "name_en": "Melted Silver Shard",
    "name_tr": "Erimiş Gümüş Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4251.webp"
  },
  "item_15011": {
    "name_en": "Magic Crystal of Nature - Swiftness",
    "name_tr": "Doğanın Sihirli Kristali - Çabukluk",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15011.webp"
  },
  "item_4451": {
    "name_en": "Ruby",
    "name_tr": "Yakut",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4451.webp"
  },
  "item_15012": {
    "name_en": "Magic Crystal of Nature - Adamantine",
    "name_tr": "Doğanın Sihirli Kristali - Sarsılmaz",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15012.webp"
  },
  "item_4454": {
    "name_en": "Sapphire",
    "name_tr": "Safir",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4454.webp"
  },
  "item_15013": {
    "name_en": "Magic Crystal of Nature - Ascension",
    "name_tr": "Doğanın Sihirli Kristali - Yükselme",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15013.webp"
  },
  "item_4457": {
    "name_en": "Topaz",
    "name_tr": "Topaz",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4457.webp"
  },
  "item_15027": {
    "name_en": "Magic Crystal of Nature - Descent",
    "name_tr": "Doğanın Sihirli Kristali - Düşme",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15027.webp"
  },
  "item_15028": {
    "name_en": "Magic Crystal of Nature - Endurance",
    "name_tr": "Doğanın Sihirli Kristali - Dayanım",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15028.webp"
  },
  "item_15014": {
    "name_en": "Magic Crystal of the Sun - Assault",
    "name_tr": "Güneşin Sihirli Kristali - Saldırı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15014.webp"
  },
  "item_4460": {
    "name_en": "Emerald",
    "name_tr": "Zümrüt",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4460.webp"
  },
  "item_15015": {
    "name_en": "Magic Crystal of the Sun - Sturdiness",
    "name_tr": "Güneşin Sihirli Kristali - Sağlamlık",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15015.webp"
  },
  "item_4463": {
    "name_en": "Diamond",
    "name_tr": "Elmas",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4463.webp"
  },
  "item_15016": {
    "name_en": "Magic Crystal of the Sun - Valor",
    "name_tr": "Güneşin Sihirli Kristali - Cesaret",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15016.webp"
  },
  "item_15029": {
    "name_en": "Magic Crystal of the Sun - Ensnare",
    "name_tr": "Güneşin Sihirli Kristali - Tutma",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15029.webp"
  },
  "item_5405": {
    "name_en": "Silk Honey Grass",
    "name_tr": "İpek Bal Otu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5405.webp"
  },
  "item_15017": {
    "name_en": "Magic Crystal of Enchantment - Memory",
    "name_tr": "Büyünün Sihirli Kristali - Hafıza",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15017.webp"
  },
  "item_15018": {
    "name_en": "Magic Crystal of Enchantment - Intimidation",
    "name_tr": "Büyünün Sihirli Kristali - Gözdağı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15018.webp"
  },
  "item_15019": {
    "name_en": "Magic Crystal of Enchantment - Vision",
    "name_tr": "Büyünün Sihirli Kristali - Görüş Mesafesi",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15019.webp"
  },
  "item_15020": {
    "name_en": "Magic Crystal of Enchantment - Agility",
    "name_tr": "Büyünün Sihirli Kristali - Çeviklik",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15020.webp"
  },
  "item_4254": {
    "name_en": "Melted Gold Shard",
    "name_tr": "Erimiş Altın Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4254.webp"
  },
  "item_4257": {
    "name_en": "Melted Platinum Shard",
    "name_tr": "Erimiş Platinyum Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4257.webp"
  },
  "item_4260": {
    "name_en": "Polished Opal",
    "name_tr": "İşlenmiş Opal",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4260.webp"
  },
  "item_42395": {
    "name_en": "Askasha's Broken Magic Weapon I",
    "name_tr": "Askasha’nın Kırık Büyülü Silahı I",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42395.webp"
  },
  "item_42396": {
    "name_en": "Askasha's Broken Magic Weapon II",
    "name_tr": "Askasha’nın Kırık Büyülü Silahı II",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42396.webp"
  },
  "item_42397": {
    "name_en": "Askasha's Broken Magic Weapon III",
    "name_tr": "Askasha’nın Kırık Büyülü Silahı III",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42397.webp"
  },
  "item_42399": {
    "name_en": "Ardan's Broken Jewel I",
    "name_tr": "Ardan’ın Kırık Mücevheri I",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42399.webp"
  },
  "item_42400": {
    "name_en": "Ardan's Broken Jewel II",
    "name_tr": "Ardan’ın Kırık Mücevheri II",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42400.webp"
  },
  "item_42401": {
    "name_en": "Ardan's Broken Jewel III",
    "name_tr": "Ardan’ın Kırık Mücevheri III",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42401.webp"
  },
  "item_9729": {
    "name_en": "Blue Whale Tendon",
    "name_tr": "Mavi Balina Tendonu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_9729.webp"
  },
  "item_518": {
    "name_en": "HP Potion (Medium)",
    "name_tr": "HP Pot (Orta)",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_518.webp"
  },
  "item_521": {
    "name_en": "MP Potion (Medium)",
    "name_tr": "MP Pot (Orta)",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_521.webp"
  },
  "item_9727": {
    "name_en": "Great Ocean Oil",
    "name_tr": "Okyanus Yağı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_9727.webp"
  },
  "item_5406": {
    "name_en": "Everlasting Herb",
    "name_tr": "Sonsuzluk Bitkisi",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5406.webp"
  },
  "item_9736": {
    "name_en": "Fugitive Khalk's Skin",
    "name_tr": "Kaçak Khalk'ın Derisi",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_9736.webp"
  },
  "item_5012": {
    "name_en": "White Cedar Sap",
    "name_tr": "Beyaz Sedir Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5012.webp"
  },
  "item_44084": {
    "name_en": "Sticky Liquid",
    "name_tr": "Yapışkan Sıvı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_44084.webp"
  },
  "item_6533": {
    "name_en": "Coral Crystal",
    "name_tr": "Mercan Kristal",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_6533.webp"
  },
  "item_15030": {
    "name_en": "Magic Crystal of the Sun - Boulder",
    "name_tr": "Güneşin Sihirli Kristali - Güç",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15030.webp"
  },
  "item_5019": {
    "name_en": "Dead Tree Essence",
    "name_tr": "Ölü Ağaç Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5019.webp"
  },
  "item_5018": {
    "name_en": "Loopy Tree Sap",
    "name_tr": "Sürünen Ağaç Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5018.webp"
  },
  "item_5526": {
    "name_en": "Violet Flower",
    "name_tr": "Menekşe",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5526.webp"
  },
  "item_9741": {
    "name_en": "Griffon Claw",
    "name_tr": "Grifon Pençesi",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_9741.webp"
  },
  "item_5017": {
    "name_en": "Moss Tree Sap",
    "name_tr": "Yosun Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5017.webp"
  },
  "item_5517": {
    "name_en": "Volcanic Umbrella Mushroom",
    "name_tr": "Volkanik Şemsiye Mantar",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5517.webp"
  },
  "item_5516": {
    "name_en": "Blue Umbrella Mushroom",
    "name_tr": "Mavi Şemsiye Mantar",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5516.webp"
  },
  "item_5525": {
    "name_en": "Sky Blue Flower",
    "name_tr": "Gök Mavi Çiçek",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5525.webp"
  },
  "item_15031": {
    "name_en": "Magic Crystal of Enchantment - Experience",
    "name_tr": "Büyünün Sihirli Kristali - Deneyim",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_15031.webp"
  },
  "item_42411": {
    "name_en": "Incomplete First Element",
    "name_tr": "Tamamlanmamış İlk Element",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42411.webp"
  },
  "item_42412": {
    "name_en": "Arenda's Special Synthesis Base",
    "name_tr": "Arenda'nın Özel Sentez Karışımı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42412.webp"
  },
  "item_7704": {
    "name_en": "Top-quality Cooking Honey",
    "name_tr": "En Üst Kalite Pişirme Balı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_7704.webp"
  },
  "item_9057": {
    "name_en": "Essence of Liquor",
    "name_tr": "İçki Özü",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7105",
          "qty": 1
        },
        {
          "item": "item_7313",
          "qty": 1
        },
        {
          "item": "item_9005",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9057.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_5020": {
    "name_en": "Thuja Sap",
    "name_tr": "Thuja Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5020.webp"
  },
  "item_6500": {
    "name_en": "Stone of Malice",
    "name_tr": "Habis Düşünce Taşı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_6500.webp"
  },
  "item_5538": {
    "name_en": "Delotia",
    "name_tr": "Delotia",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5538.webp"
  },
  "item_5023": {
    "name_en": "Thornwood Sap",
    "name_tr": "Dikenli Ağaç Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5023.webp"
  },
  "item_9778": {
    "name_en": "Thick Turo Blood",
    "name_tr": "Sert Turo Kanı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_9778.webp"
  },
  "item_5535": {
    "name_en": "Delotia Essence",
    "name_tr": "Delotia Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5535.webp"
  },
  "item_5605": {
    "name_en": "Delotia Powder",
    "name_tr": "Delotia Tozu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5605.webp"
  },
  "item_44461": {
    "name_en": "Turo Heart",
    "name_tr": "Turo Kalbi",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_44461.webp"
  },
  "item_5964": {
    "name_en": "Remnants of Burnt Spirits",
    "name_tr": "Yanan Ruh Kalıntıları",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5964.webp"
  },
  "item_5122": {
    "name_en": "Inextinguishable Stone",
    "name_tr": "Sönmeyen Taş",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5122.webp"
  },
  "item_721009": {
    "name_en": "Stabilized Magical Black Stone",
    "name_tr": "Dengeli Sihirli Kara Taş",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_721009.webp"
  },
  "item_721010": {
    "name_en": "Cleansed Magical Black Stone",
    "name_tr": "Arındırılmış Sihirli Kara Taş",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_721010.webp"
  },
  "item_5024": {
    "name_en": "Snowfield Cedar Sap",
    "name_tr": "Kar Ovası Sedir Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5024.webp"
  },
  "item_5546": {
    "name_en": "Red-spotted Amanita",
    "name_tr": "Kırmızı Benekli Amanita Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5546.webp"
  },
  "item_5550": {
    "name_en": "Dictyophora",
    "name_tr": "Bambu Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5550.webp"
  },
  "item_9791": {
    "name_en": "Essence of Insight",
    "name_tr": "Önsezi Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_9791.webp"
  },
  "item_5651": {
    "name_en": "Fairy Powder",
    "name_tr": "Peri Tozu",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5651.webp"
  },
  "item_6651": {
    "name_en": "Distilled Water",
    "name_tr": "Damıtılmış Su",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_6651.webp"
  },
  "item_4918": {
    "name_en": "Magical Shard",
    "name_tr": "Büyülü Parça",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4918.webp"
  },
  "item_6165": {
    "name_en": "Fine Lightweight Plume",
    "name_tr": "İyi Hafif Tüy",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_6165.webp"
  },
  "item_4999": {
    "name_en": "Black Gem Fragment",
    "name_tr": "Kara Kristal Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4999.webp"
  },
  "item_42435": {
    "name_en": "Latent Boss Aura",
    "name_tr": "Gizli Boss Enerjisi",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42435.webp"
  },
  "item_42436": {
    "name_en": "Nouver's Latent Aura",
    "name_tr": "Nouver'in Gizli Aurası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42436.webp"
  },
  "item_42450": {
    "name_en": "Kutum's Latent Aura",
    "name_tr": "Kutum'un Gizli Aurası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42450.webp"
  },
  "item_42437": {
    "name_en": "Karanda's Latent Aura",
    "name_tr": "Karanda'nın Gizli Aurası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42437.webp"
  },
  "item_42495": {
    "name_en": "Offin Tett's Light Fragment",
    "name_tr": "Offin Tett'in Işık Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_42495.webp"
  },
  "item_766104": {
    "name_en": "Imperfect Lightstone of Fire",
    "name_tr": "Ateşin Kusurlu Işık Taşı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_766104.webp"
  },
  "item_16001": {
    "name_en": "Black Stone",
    "name_tr": "Kara Taş",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_16001.webp"
  },
  "item_766105": {
    "name_en": "Imperfect Lightstone of Earth",
    "name_tr": "Toprağın Kusurlu Işık Taşı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_766105.webp"
  },
  "item_766106": {
    "name_en": "Imperfect Lightstone of Wind",
    "name_tr": "Rüzgarın Kusurlu Işık Taşı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_766106.webp"
  },
  "item_766107": {
    "name_en": "Imperfect Lightstone of Flora",
    "name_tr": "Floranın Kusurlu Işık Taşı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_766107.webp"
  },
  "item_766108": {
    "name_en": "Magical Lightstone Crystal",
    "name_tr": "Sihirli Işık Taşı Kristali",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_766108.webp"
  },
  "item_5600": {
    "name_en": "Weeds",
    "name_tr": "Ot",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5600.webp"
  },
  "item_6208": {
    "name_en": "Lizard Blood",
    "name_tr": "Kertenkele Kanı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_6208.webp"
  },
  "item_5523": {
    "name_en": "Purple Pink Flower",
    "name_tr": "Mor Pembe Çiçek",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5523.webp"
  },
  "item_5527": {
    "name_en": "Blue Flower",
    "name_tr": "Mavi Çiçek",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5527.webp"
  },
  "item_5524": {
    "name_en": "Yellow Flower",
    "name_tr": "Sarı Çiçek",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5524.webp"
  },
  "item_6501": {
    "name_en": "Coral Piece",
    "name_tr": "Mercan Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_6501.webp"
  },
  "item_4476": {
    "name_en": "Red Coral",
    "name_tr": "Kırmızı Mercan",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4476.webp"
  },
  "item_44336": {
    "name_en": "Alchemy Stone Shard",
    "name_tr": "Kimya Taşı Parçası",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_44336.webp"
  },
  "item_820909": {
    "name_en": "White Truffle Mushroom",
    "name_tr": "Beyaz Makarna Mantarı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_820909.webp"
  },
  "item_4989": {
    "name_en": "Red Essence",
    "name_tr": "Kırmızı Esans",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_4989.webp"
  },
  "item_5025": {
    "name_en": "Caphras Tree Sap",
    "name_tr": "Caphras Ağacı Bitki Özü",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_5025.webp"
  },
  "item_821255": {
    "name_en": "Rusalka's Coral",
    "name_tr": "Rusalka Mercanı",
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_821255.webp"
  },
  "item_9003": {
    "name_en": "White Sauce",
    "name_tr": "Beyaz Sos",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9018",
          "qty": 1
        },
        {
          "item": "item_9065",
          "qty": 1
        },
        {
          "item": "item_7313",
          "qty": 1
        },
        {
          "item": "item_9017",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9003.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9004": {
    "name_en": "Red Sauce",
    "name_tr": "Kırmızı Sos",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9018",
          "qty": 1
        },
        {
          "item": "item_9002",
          "qty": 2
        },
        {
          "item": "item_7906",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9004.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9006": {
    "name_en": "Dressing",
    "name_tr": "Salata Sosu",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9015",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 1
        },
        {
          "item": "item_9064",
          "qty": 1
        },
        {
          "item": "item_9001",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9006.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9066": {
    "name_en": "Vinegar",
    "name_tr": "Sirke",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7005",
          "qty": 1
        },
        {
          "item": "item_7313",
          "qty": 1
        },
        {
          "item": "item_9005",
          "qty": 1
        },
        {
          "item": "item_9002",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9066.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9201": {
    "name_en": "Fruit Wine",
    "name_tr": "Meyve Şarabı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9262",
          "qty": 1
        },
        {
          "item": "item_7313",
          "qty": 5
        },
        {
          "item": "item_9057",
          "qty": 3
        },
        {
          "item": "item_9059",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9201.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9202": {
    "name_en": "Pickled Vegetables",
    "name_tr": "Salamura Sebze",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7318",
          "qty": 8
        },
        {
          "item": "item_9066",
          "qty": 4
        },
        {
          "item": "item_9005",
          "qty": 2
        },
        {
          "item": "item_9002",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9202.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9203": {
    "name_en": "Cheese Gratin",
    "name_tr": "Peynir Graten",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9427",
          "qty": 1
        },
        {
          "item": "item_7201",
          "qty": 5
        },
        {
          "item": "item_7318",
          "qty": 4
        },
        {
          "item": "item_9062",
          "qty": 3
        },
        {
          "item": "item_9004",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9203.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9204": {
    "name_en": "Aloe Yogurt",
    "name_tr": "Aloe Yoğurdu",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7347",
          "qty": 5
        },
        {
          "item": "item_9065",
          "qty": 2
        },
        {
          "item": "item_9002",
          "qty": 3
        },
        {
          "item": "item_9005",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9204.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9205": {
    "name_en": "Aloe Cookie",
    "name_tr": "Aloe Kurabiyesi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7347",
          "qty": 5
        },
        {
          "item": "item_7205",
          "qty": 7
        },
        {
          "item": "item_7702",
          "qty": 3
        },
        {
          "item": "item_9002",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9205.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9206": {
    "name_en": "Honey Wine",
    "name_tr": "Bal Şarabı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7702",
          "qty": 3
        },
        {
          "item": "item_9057",
          "qty": 2
        },
        {
          "item": "item_9002",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 6
        }
      ]
    },
    "icon": "icons/item_9206.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9207": {
    "name_en": "Sute Tea",
    "name_tr": "Sute Çayı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9270",
          "qty": 2
        },
        {
          "item": "item_9063",
          "qty": 2
        },
        {
          "item": "item_9065",
          "qty": 3
        },
        {
          "item": "item_9001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9207.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9208": {
    "name_en": "Fish Fillet Chips",
    "name_tr": "Çin Usulü Balık Fileto",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_8510",
          "qty": 2
        },
        {
          "item": "item_9003",
          "qty": 3
        },
        {
          "item": "item_7105",
          "qty": 7
        },
        {
          "item": "item_9001",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9208.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9209": {
    "name_en": "Assorted Side Dishes",
    "name_tr": "Çeşitli Aperitif",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9403",
          "qty": 1
        },
        {
          "item": "item_8211",
          "qty": 1
        },
        {
          "item": "item_9062",
          "qty": 3
        },
        {
          "item": "item_7313",
          "qty": 5
        }
      ]
    },
    "icon": "icons/item_9209.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9210": {
    "name_en": "High-quality Carrot Juice",
    "name_tr": "Yüksek Kalite Havuç Suyu",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 5,
      "ingredients": [
        {
          "item": "item_54004",
          "qty": 1
        },
        {
          "item": "item_7105",
          "qty": 3
        },
        {
          "item": "item_9002",
          "qty": 3
        },
        {
          "item": "item_9059",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9210.webp",
    "note_tr": "RNG üretim: 5-20 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 5-20 per craft (guaranteed min. used)"
  },
  "item_9211": {
    "name_en": "Special Carrot Juice",
    "name_tr": "Özel Havuç Suyu",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 5,
      "ingredients": [
        {
          "item": "item_54005",
          "qty": 1
        },
        {
          "item": "item_7105",
          "qty": 3
        },
        {
          "item": "item_9002",
          "qty": 3
        },
        {
          "item": "item_9059",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9211.webp",
    "note_tr": "RNG üretim: 5-20 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 5-20 per craft (guaranteed min. used)"
  },
  "item_9213": {
    "name_en": "Beer",
    "name_tr": "Bira",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7005",
          "qty": 5
        },
        {
          "item": "item_9059",
          "qty": 6
        },
        {
          "item": "item_9002",
          "qty": 1
        },
        {
          "item": "item_9005",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9213.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9241": {
    "name_en": "Stir-Fried Vegetables",
    "name_tr": "Çin Usulü Sebze Kızartması",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7318",
          "qty": 5
        },
        {
          "item": "item_7305",
          "qty": 2
        },
        {
          "item": "item_9015",
          "qty": 2
        },
        {
          "item": "item_9001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9241.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9255": {
    "name_en": "Grain Soup",
    "name_tr": "Tahıl Çorbası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7005",
          "qty": 6
        },
        {
          "item": "item_6656",
          "qty": 1
        },
        {
          "item": "item_9017",
          "qty": 3
        },
        {
          "item": "item_9001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9255.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9256": {
    "name_en": "Fried Vegetables",
    "name_tr": "Sebze Kızartması",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7318",
          "qty": 4
        },
        {
          "item": "item_7205",
          "qty": 3
        },
        {
          "item": "item_9064",
          "qty": 2
        },
        {
          "item": "item_9016",
          "qty": 6
        }
      ]
    },
    "icon": "icons/item_9256.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9257": {
    "name_en": "Fruit Juice",
    "name_tr": "Meyve Suyu",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7313",
          "qty": 4
        },
        {
          "item": "item_9002",
          "qty": 3
        },
        {
          "item": "item_9059",
          "qty": 5
        },
        {
          "item": "item_9001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9257.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9258": {
    "name_en": "Fruit and Vegetable Salad",
    "name_tr": "Meyve ve Sebze Salatası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7313",
          "qty": 4
        },
        {
          "item": "item_7318",
          "qty": 4
        },
        {
          "item": "item_9066",
          "qty": 1
        },
        {
          "item": "item_9017",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9258.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9259": {
    "name_en": "Fruit Pudding",
    "name_tr": "Meyve Pudingi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7313",
          "qty": 5
        },
        {
          "item": "item_9061",
          "qty": 1
        },
        {
          "item": "item_9065",
          "qty": 3
        },
        {
          "item": "item_9002",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9259.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9260": {
    "name_en": "Soft Bread",
    "name_tr": "Yumuşak Ekmek",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7205",
          "qty": 6
        },
        {
          "item": "item_9005",
          "qty": 2
        },
        {
          "item": "item_9064",
          "qty": 2
        },
        {
          "item": "item_9065",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9260.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9261": {
    "name_en": "Oatmeal",
    "name_tr": "Yulaf Ezmesi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7105",
          "qty": 9
        },
        {
          "item": "item_9065",
          "qty": 3
        },
        {
          "item": "item_7303",
          "qty": 3
        },
        {
          "item": "item_7702",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9261.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9262": {
    "name_en": "Makgeolli",
    "name_tr": "Makgeolli",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7205",
          "qty": 3
        },
        {
          "item": "item_9057",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 5
        },
        {
          "item": "item_9005",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9262.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9263": {
    "name_en": "Milk Tea",
    "name_tr": "Sütlü Çay",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9270",
          "qty": 2
        },
        {
          "item": "item_7105",
          "qty": 2
        },
        {
          "item": "item_9065",
          "qty": 3
        },
        {
          "item": "item_7702",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9263.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9264": {
    "name_en": "Fruit Pie",
    "name_tr": "Meyveli Turta",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7205",
          "qty": 6
        },
        {
          "item": "item_7313",
          "qty": 6
        },
        {
          "item": "item_9061",
          "qty": 3
        },
        {
          "item": "item_9002",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9264.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9265": {
    "name_en": "Meat Pie",
    "name_tr": "Etli Turta",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7906",
          "qty": 4
        },
        {
          "item": "item_7205",
          "qty": 6
        },
        {
          "item": "item_9002",
          "qty": 2
        },
        {
          "item": "item_9015",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9265.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9267": {
    "name_en": "Ham Sandwich",
    "name_tr": "Jambonlu Sandviç",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9260",
          "qty": 2
        },
        {
          "item": "item_9427",
          "qty": 2
        },
        {
          "item": "item_7318",
          "qty": 5
        },
        {
          "item": "item_9064",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9267.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9268": {
    "name_en": "Cheese Pie",
    "name_tr": "Peynirli Turta",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7205",
          "qty": 4
        },
        {
          "item": "item_9062",
          "qty": 7
        },
        {
          "item": "item_9063",
          "qty": 3
        },
        {
          "item": "item_9064",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9268.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9269": {
    "name_en": "Omelet",
    "name_tr": "Omlet",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7005",
          "qty": 5
        },
        {
          "item": "item_9015",
          "qty": 2
        },
        {
          "item": "item_9064",
          "qty": 5
        },
        {
          "item": "item_9001",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9269.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9270": {
    "name_en": "Tea With Fine Scent",
    "name_tr": "Güzel Kokulu Çay",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7319",
          "qty": 4
        },
        {
          "item": "item_7313",
          "qty": 4
        },
        {
          "item": "item_9059",
          "qty": 7
        },
        {
          "item": "item_7702",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9270.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9401": {
    "name_en": "Steak",
    "name_tr": "Biftek",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7906",
          "qty": 8
        },
        {
          "item": "item_9001",
          "qty": 2
        },
        {
          "item": "item_7302",
          "qty": 2
        },
        {
          "item": "item_9004",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9401.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9402": {
    "name_en": "Boiled Bird Eggs",
    "name_tr": "Kaynatılmış Kuş Yumurtası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9064",
          "qty": 3
        },
        {
          "item": "item_9059",
          "qty": 6
        },
        {
          "item": "item_9017",
          "qty": 1
        },
        {
          "item": "item_9001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9402.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9403": {
    "name_en": "Fried Bird",
    "name_tr": "Kuş Kızartması",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7921",
          "qty": 7
        },
        {
          "item": "item_7105",
          "qty": 4
        },
        {
          "item": "item_9064",
          "qty": 2
        },
        {
          "item": "item_7301",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9403.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9404": {
    "name_en": "Meat Croquette",
    "name_tr": "Et Kroket",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7906",
          "qty": 8
        },
        {
          "item": "item_7105",
          "qty": 5
        },
        {
          "item": "item_9064",
          "qty": 2
        },
        {
          "item": "item_9062",
          "qty": 2
        },
        {
          "item": "item_9016",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9404.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9405": {
    "name_en": "Steamed Bird",
    "name_tr": "Buğulama Kuş",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7921",
          "qty": 5
        },
        {
          "item": "item_7318",
          "qty": 3
        },
        {
          "item": "item_9066",
          "qty": 2
        },
        {
          "item": "item_9057",
          "qty": 2
        },
        {
          "item": "item_9001",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9405.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9406": {
    "name_en": "Lizard Kebab",
    "name_tr": "Kertenkele Kebabı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7908",
          "qty": 6
        },
        {
          "item": "item_9004",
          "qty": 2
        },
        {
          "item": "item_7303",
          "qty": 3
        },
        {
          "item": "item_7005",
          "qty": 7
        }
      ]
    },
    "icon": "icons/item_9406.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9407": {
    "name_en": "Fried Fish",
    "name_tr": "Balık Kızartması",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_8210",
          "qty": 1
        },
        {
          "item": "item_7105",
          "qty": 3
        },
        {
          "item": "item_9016",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9407.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9408": {
    "name_en": "Borscht",
    "name_tr": "Borş Çorbası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7918",
          "qty": 7
        },
        {
          "item": "item_9065",
          "qty": 3
        },
        {
          "item": "item_7348",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9408.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9409": {
    "name_en": "Steamed Fish",
    "name_tr": "Buğulama Balık",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_8501",
          "qty": 2
        },
        {
          "item": "item_7302",
          "qty": 2
        },
        {
          "item": "item_9001",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9409.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9410": {
    "name_en": "Desert Dumpling",
    "name_tr": "Çöl Mantısı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7908",
          "qty": 6
        },
        {
          "item": "item_7205",
          "qty": 6
        },
        {
          "item": "item_7348",
          "qty": 1
        },
        {
          "item": "item_9015",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9410.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9411": {
    "name_en": "Steamed Seafood",
    "name_tr": "Buğulama Deniz Ürünü",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_8211",
          "qty": 1
        },
        {
          "item": "item_7305",
          "qty": 3
        },
        {
          "item": "item_9059",
          "qty": 6
        },
        {
          "item": "item_9001",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9411.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9412": {
    "name_en": "Pickled Fish",
    "name_tr": "Salamura Balık",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_8210",
          "qty": 1
        },
        {
          "item": "item_9066",
          "qty": 2
        },
        {
          "item": "item_9001",
          "qty": 4
        },
        {
          "item": "item_9005",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9412.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9413": {
    "name_en": "Seafood Pasta",
    "name_tr": "Deniz Ürünlü Makarna",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_8211",
          "qty": 1
        },
        {
          "item": "item_7205",
          "qty": 5
        },
        {
          "item": "item_9017",
          "qty": 3
        },
        {
          "item": "item_7302",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9413.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9414": {
    "name_en": "Meat Stew",
    "name_tr": "Et Yahnisi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7906",
          "qty": 5
        },
        {
          "item": "item_7105",
          "qty": 2
        },
        {
          "item": "item_9017",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9414.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9415": {
    "name_en": "Meat Sandwich",
    "name_tr": "Etli Sandviç",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9260",
          "qty": 1
        },
        {
          "item": "item_7906",
          "qty": 7
        },
        {
          "item": "item_7318",
          "qty": 6
        },
        {
          "item": "item_9062",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9415.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9416": {
    "name_en": "Meat Pasta",
    "name_tr": "Etli Makarna",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7906",
          "qty": 5
        },
        {
          "item": "item_7205",
          "qty": 4
        },
        {
          "item": "item_7301",
          "qty": 3
        },
        {
          "item": "item_7302",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9416.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9417": {
    "name_en": "Smoked Fish Steak",
    "name_tr": "Füme Balık Bifteği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_8210",
          "qty": 1
        },
        {
          "item": "item_9015",
          "qty": 1
        },
        {
          "item": "item_9001",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9417.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9418": {
    "name_en": "Fish Soup",
    "name_tr": "Balık Çorbası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_8210",
          "qty": 1
        },
        {
          "item": "item_7105",
          "qty": 3
        },
        {
          "item": "item_9061",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 6
        }
      ]
    },
    "icon": "icons/item_9418.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9419": {
    "name_en": "Seafood Mushroom Salad",
    "name_tr": "Deniz Ürünlü Mantar Salatası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_8211",
          "qty": 1
        },
        {
          "item": "item_5407",
          "qty": 1
        },
        {
          "item": "item_9006",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9419.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9420": {
    "name_en": "Stir-Fried Seafood",
    "name_tr": "Çin Usulü Deniz Ürünü Kızartması",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_8211",
          "qty": 1
        },
        {
          "item": "item_7318",
          "qty": 4
        },
        {
          "item": "item_9003",
          "qty": 2
        },
        {
          "item": "item_7305",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9420.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9421": {
    "name_en": "Seafood Grilled with Butter",
    "name_tr": "Izgara Tereyağlı Deniz Ürünü",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_8211",
          "qty": 1
        },
        {
          "item": "item_9063",
          "qty": 3
        },
        {
          "item": "item_9001",
          "qty": 2
        },
        {
          "item": "item_9015",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9421.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9422": {
    "name_en": "Dark Pudding",
    "name_tr": "Siyah Puding",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9261",
          "qty": 1
        },
        {
          "item": "item_9202",
          "qty": 1
        },
        {
          "item": "item_7921",
          "qty": 5
        },
        {
          "item": "item_6201",
          "qty": 7
        }
      ]
    },
    "icon": "icons/item_9422.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9423": {
    "name_en": "Fish Fillet Salad",
    "name_tr": "Balık Fileto Salatası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_8210",
          "qty": 1
        },
        {
          "item": "item_9006",
          "qty": 2
        },
        {
          "item": "item_7303",
          "qty": 3
        },
        {
          "item": "item_9062",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9423.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9424": {
    "name_en": "Meat Soup",
    "name_tr": "Et Çorbası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7906",
          "qty": 5
        },
        {
          "item": "item_7301",
          "qty": 1
        },
        {
          "item": "item_9061",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9424.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9425": {
    "name_en": "Lean Meat Salad",
    "name_tr": "Kırmızı Et Salatası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7906",
          "qty": 8
        },
        {
          "item": "item_9066",
          "qty": 2
        },
        {
          "item": "item_7301",
          "qty": 3
        },
        {
          "item": "item_9006",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9425.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9426": {
    "name_en": "Stir-Fried Meat",
    "name_tr": "Çin Usulü Et Kızartması",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7906",
          "qty": 7
        },
        {
          "item": "item_9018",
          "qty": 2
        },
        {
          "item": "item_7303",
          "qty": 2
        },
        {
          "item": "item_7305",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9426.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9427": {
    "name_en": "Grilled Sausage",
    "name_tr": "Izgara Sosis",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7906",
          "qty": 6
        },
        {
          "item": "item_7303",
          "qty": 1
        },
        {
          "item": "item_7301",
          "qty": 2
        },
        {
          "item": "item_9001",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9427.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9455": {
    "name_en": "Steamed Whale Meat",
    "name_tr": "Buğulama Balina Eti",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9726",
          "qty": 1
        },
        {
          "item": "item_9206",
          "qty": 1
        },
        {
          "item": "item_7302",
          "qty": 4
        },
        {
          "item": "item_9001",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 6
        }
      ]
    },
    "icon": "icons/item_9455.webp"
  },
  "item_9456": {
    "name_en": "Whale Meat Salad",
    "name_tr": "Balina Eti Salatası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9726",
          "qty": 1
        },
        {
          "item": "item_7318",
          "qty": 6
        },
        {
          "item": "item_9006",
          "qty": 2
        },
        {
          "item": "item_9064",
          "qty": 3
        },
        {
          "item": "item_7301",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9456.webp"
  },
  "item_9601": {
    "name_en": "Balenos Meal",
    "name_tr": "Balenos Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9203",
          "qty": 1
        },
        {
          "item": "item_9404",
          "qty": 1
        },
        {
          "item": "item_9417",
          "qty": 1
        },
        {
          "item": "item_9241",
          "qty": 2
        },
        {
          "item": "item_9213",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9601.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9603": {
    "name_en": "Serendia Meal",
    "name_tr": "Serendia Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9267",
          "qty": 1
        },
        {
          "item": "item_9265",
          "qty": 1
        },
        {
          "item": "item_9266",
          "qty": 1
        },
        {
          "item": "item_9402",
          "qty": 2
        },
        {
          "item": "item_9201",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9603.webp"
  },
  "item_9605": {
    "name_en": "Calpheon Meal",
    "name_tr": "Calpheon Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9260",
          "qty": 2
        },
        {
          "item": "item_9263",
          "qty": 1
        },
        {
          "item": "item_9423",
          "qty": 1
        },
        {
          "item": "item_9268",
          "qty": 1
        },
        {
          "item": "item_9416",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9605.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9607": {
    "name_en": "Mediah Meal",
    "name_tr": "Mediah Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9422",
          "qty": 1
        },
        {
          "item": "item_9261",
          "qty": 1
        },
        {
          "item": "item_9427",
          "qty": 2
        },
        {
          "item": "item_9425",
          "qty": 1
        },
        {
          "item": "item_9262",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9607.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9631": {
    "name_en": "Knight Combat Rations",
    "name_tr": "Şövalye Savaş İstihkakı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9422",
          "qty": 1
        },
        {
          "item": "item_9267",
          "qty": 1
        },
        {
          "item": "item_9404",
          "qty": 1
        },
        {
          "item": "item_9201",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9631.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_54017": {
    "name_en": "Good Feed",
    "name_tr": "İyi Yem",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 3,
      "ingredients": [
        {
          "item": "item_7906",
          "qty": 6
        },
        {
          "item": "item_8210",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 3
        },
        {
          "item": "item_7105",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_54017.webp",
    "note_tr": "RNG üretim: 3-5 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 3-5 per craft (guaranteed min. used)"
  },
  "item_54018": {
    "name_en": "Organic Feed",
    "name_tr": "Organik Yem",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9261",
          "qty": 2
        },
        {
          "item": "item_7906",
          "qty": 5
        },
        {
          "item": "item_7921",
          "qty": 4
        },
        {
          "item": "item_8210",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_54018.webp",
    "note_tr": "RNG üretim: 1-5 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-5 per craft (guaranteed min. used)"
  },
  "item_9266": {
    "name_en": "Honeycomb Cookie",
    "name_tr": "Kovan Kurabiye",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7205",
          "qty": 4
        },
        {
          "item": "item_7702",
          "qty": 6
        },
        {
          "item": "item_9064",
          "qty": 2
        },
        {
          "item": "item_9065",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9266.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9307": {
    "name_en": "Coconut Cocktail",
    "name_tr": "Hindistan Cevizi Kokteyli",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7026",
          "qty": 2
        },
        {
          "item": "item_9262",
          "qty": 1
        },
        {
          "item": "item_9057",
          "qty": 2
        },
        {
          "item": "item_7304",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 5
        }
      ]
    },
    "icon": "icons/item_9307.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9308": {
    "name_en": "Coconut Pasta",
    "name_tr": "Hindistan Cevizi Makarna",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7026",
          "qty": 2
        },
        {
          "item": "item_7303",
          "qty": 2
        },
        {
          "item": "item_7201",
          "qty": 5
        },
        {
          "item": "item_7302",
          "qty": 4
        },
        {
          "item": "item_9003",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9308.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9309": {
    "name_en": "Coconut Fried Fish",
    "name_tr": "Hindistan Cevizli Balık Kızartması",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7026",
          "qty": 3
        },
        {
          "item": "item_8201",
          "qty": 1
        },
        {
          "item": "item_9064",
          "qty": 2
        },
        {
          "item": "item_7201",
          "qty": 3
        },
        {
          "item": "item_9016",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9309.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9459": {
    "name_en": "Hunter's Salad",
    "name_tr": "Avcı Salatası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9731",
          "qty": 1
        },
        {
          "item": "item_9066",
          "qty": 2
        },
        {
          "item": "item_9006",
          "qty": 2
        },
        {
          "item": "item_7302",
          "qty": 5
        }
      ]
    },
    "icon": "icons/item_9459.webp"
  },
  "item_9469": {
    "name_en": "Khalk's Fermented Wine",
    "name_tr": "Khalk'ın Mayalanmış Şarabı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9735",
          "qty": 1
        },
        {
          "item": "item_9206",
          "qty": 5
        },
        {
          "item": "item_7016",
          "qty": 6
        },
        {
          "item": "item_9005",
          "qty": 6
        },
        {
          "item": "item_9002",
          "qty": 6
        }
      ]
    },
    "icon": "icons/item_9469.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9632": {
    "name_en": "Special Arehaza Meal",
    "name_tr": "Arehaza Özel Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9307",
          "qty": 2
        },
        {
          "item": "item_9308",
          "qty": 1
        },
        {
          "item": "item_9309",
          "qty": 1
        },
        {
          "item": "item_9414",
          "qty": 1
        },
        {
          "item": "item_9401",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9632.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9609": {
    "name_en": "Valencia Meal",
    "name_tr": "Valencia Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9218",
          "qty": 1
        },
        {
          "item": "item_9463",
          "qty": 1
        },
        {
          "item": "item_9220",
          "qty": 1
        },
        {
          "item": "item_9216",
          "qty": 2
        },
        {
          "item": "item_9219",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9609.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9463": {
    "name_en": "King of Jungle Hamburg",
    "name_tr": "Orman Kralı Hamburgeri",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7923",
          "qty": 4
        },
        {
          "item": "item_9214",
          "qty": 4
        },
        {
          "item": "item_9202",
          "qty": 2
        },
        {
          "item": "item_7020",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9463.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9214": {
    "name_en": "Teff Bread",
    "name_tr": "Teff Ekmeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7106",
          "qty": 5
        },
        {
          "item": "item_9059",
          "qty": 3
        },
        {
          "item": "item_9001",
          "qty": 2
        },
        {
          "item": "item_9005",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9214.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9220": {
    "name_en": "Couscous",
    "name_tr": "Kuskus",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9215",
          "qty": 1
        },
        {
          "item": "item_7206",
          "qty": 6
        },
        {
          "item": "item_7020",
          "qty": 3
        },
        {
          "item": "item_7311",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9220.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9218": {
    "name_en": "Teff Sandwich",
    "name_tr": "Teff Sandviçi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9214",
          "qty": 1
        },
        {
          "item": "item_9461",
          "qty": 1
        },
        {
          "item": "item_9215",
          "qty": 1
        },
        {
          "item": "item_9004",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9218.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9461": {
    "name_en": "Grilled Scorpion",
    "name_tr": "Izgara Akrep",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7924",
          "qty": 3
        },
        {
          "item": "item_9063",
          "qty": 2
        },
        {
          "item": "item_7020",
          "qty": 3
        },
        {
          "item": "item_7305",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9461.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9216": {
    "name_en": "Fig Pie",
    "name_tr": "İncir Turtası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7018",
          "qty": 5
        },
        {
          "item": "item_7201",
          "qty": 3
        },
        {
          "item": "item_9002",
          "qty": 3
        },
        {
          "item": "item_9015",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9216.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9215": {
    "name_en": "Freekeh Snake Stew",
    "name_tr": "Fereke Yılan Yahnisi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9059",
          "qty": 5
        },
        {
          "item": "item_7021",
          "qty": 6
        },
        {
          "item": "item_7922",
          "qty": 3
        },
        {
          "item": "item_7019",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9215.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9219": {
    "name_en": "Date Palm Wine",
    "name_tr": "Hurma Şarabı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7016",
          "qty": 5
        },
        {
          "item": "item_9057",
          "qty": 2
        },
        {
          "item": "item_9002",
          "qty": 1
        },
        {
          "item": "item_9005",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9219.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9475": {
    "name_en": "Pan-Fried Oyster",
    "name_tr": "Çin Usulü İstiridye Kızartması",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6515",
          "qty": 3
        },
        {
          "item": "item_9064",
          "qty": 2
        },
        {
          "item": "item_7101",
          "qty": 5
        },
        {
          "item": "item_9066",
          "qty": 2
        },
        {
          "item": "item_9015",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9475.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9479": {
    "name_en": "Hard-Boiled Shellfish",
    "name_tr": "Çok Kaynatılmış Midye",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6520",
          "qty": 2
        },
        {
          "item": "item_9057",
          "qty": 3
        },
        {
          "item": "item_7302",
          "qty": 4
        },
        {
          "item": "item_7305",
          "qty": 2
        },
        {
          "item": "item_9015",
          "qty": 5
        }
      ]
    },
    "icon": "icons/item_9479.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9217": {
    "name_en": "Pistachio Fried Rice",
    "name_tr": "Fıstıklı Kızartılmış Pirinç",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7017",
          "qty": 4
        },
        {
          "item": "item_7022",
          "qty": 6
        },
        {
          "item": "item_7348",
          "qty": 2
        },
        {
          "item": "item_9001",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9217.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9471": {
    "name_en": "Prawn Salad",
    "name_tr": "Büyük Karides Salatası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6516",
          "qty": 2
        },
        {
          "item": "item_9015",
          "qty": 3
        },
        {
          "item": "item_9001",
          "qty": 2
        },
        {
          "item": "item_9064",
          "qty": 3
        },
        {
          "item": "item_9258",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9471.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9473": {
    "name_en": "Steamed Prawn",
    "name_tr": "Buğulama Büyük Karides",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6516",
          "qty": 4
        },
        {
          "item": "item_7312",
          "qty": 3
        },
        {
          "item": "item_7305",
          "qty": 2
        },
        {
          "item": "item_9017",
          "qty": 3
        },
        {
          "item": "item_9059",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9473.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9477": {
    "name_en": "Butter-roasted Lobster",
    "name_tr": "Yağda Kavrulmuş Istakoz",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6511",
          "qty": 1
        },
        {
          "item": "item_9063",
          "qty": 4
        },
        {
          "item": "item_9001",
          "qty": 5
        },
        {
          "item": "item_9015",
          "qty": 5
        },
        {
          "item": "item_7302",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9477.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9634": {
    "name_en": "Margoria Seafood Meal",
    "name_tr": "Margoria Özel Deniz Ürünü Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9471",
          "qty": 1
        },
        {
          "item": "item_9473",
          "qty": 1
        },
        {
          "item": "item_9475",
          "qty": 1
        },
        {
          "item": "item_9477",
          "qty": 1
        },
        {
          "item": "item_9201",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9634.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9316": {
    "name_en": "Rainbow Button Mushroom Sandwich",
    "name_tr": "Gökkuşağı Kültür Mantarı Sandviç",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5515",
          "qty": 1
        },
        {
          "item": "item_9260",
          "qty": 1
        },
        {
          "item": "item_9061",
          "qty": 2
        },
        {
          "item": "item_7303",
          "qty": 2
        },
        {
          "item": "item_9015",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9316.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9483": {
    "name_en": "Rainbow Button Mushroom Cheese Melt",
    "name_tr": "Gökkuşağı Kültür Mantarı Erimiş Peynir",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5515",
          "qty": 1
        },
        {
          "item": "item_7913",
          "qty": 2
        },
        {
          "item": "item_9062",
          "qty": 2
        },
        {
          "item": "item_9001",
          "qty": 3
        },
        {
          "item": "item_9015",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9483.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9635": {
    "name_en": "Kamasylvia Meal",
    "name_tr": "Kamasylvia Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9316",
          "qty": 1
        },
        {
          "item": "item_9308",
          "qty": 1
        },
        {
          "item": "item_9216",
          "qty": 1
        },
        {
          "item": "item_9201",
          "qty": 2
        },
        {
          "item": "item_9483",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9635.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_54030": {
    "name_en": "Sweet Honey Wine",
    "name_tr": "Tatlı Bal Şarabı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7704",
          "qty": 2
        },
        {
          "item": "item_9279",
          "qty": 4
        },
        {
          "item": "item_9002",
          "qty": 10
        },
        {
          "item": "item_7313",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_54030.webp"
  },
  "item_9492": {
    "name_en": "Grilled Bird Meat",
    "name_tr": "Izgara Kuş Eti",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7921",
          "qty": 2
        },
        {
          "item": "item_9016",
          "qty": 6
        },
        {
          "item": "item_9001",
          "qty": 1
        },
        {
          "item": "item_9017",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9492.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9494": {
    "name_en": "Five-Grain Chicken Porridge",
    "name_tr": "Beş Tahıllı Tavuk Lapası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7958",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 2
        },
        {
          "item": "item_7001",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9494.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9488": {
    "name_en": "Roast Marmot",
    "name_tr": "Kavurma Marmot",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7955",
          "qty": 5
        },
        {
          "item": "item_7305",
          "qty": 3
        },
        {
          "item": "item_9001",
          "qty": 2
        },
        {
          "item": "item_9004",
          "qty": 1
        },
        {
          "item": "item_9017",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9488.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9486": {
    "name_en": "Ghormeh Sabzi",
    "name_tr": "Ghormeh Sabzi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7954",
          "qty": 5
        },
        {
          "item": "item_7001",
          "qty": 2
        },
        {
          "item": "item_7302",
          "qty": 5
        },
        {
          "item": "item_9001",
          "qty": 2
        },
        {
          "item": "item_9065",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9486.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9490": {
    "name_en": "Skewered Llama Cheese Melt",
    "name_tr": "Peynirli Şiş Lama",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7956",
          "qty": 5
        },
        {
          "item": "item_9062",
          "qty": 4
        },
        {
          "item": "item_7305",
          "qty": 3
        },
        {
          "item": "item_7301",
          "qty": 1
        },
        {
          "item": "item_9003",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9490.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9318": {
    "name_en": "Stir-Fried Bracken",
    "name_tr": "Eğrelti Otu Kavurması",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5532",
          "qty": 8
        },
        {
          "item": "item_7302",
          "qty": 5
        },
        {
          "item": "item_9001",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 5
        },
        {
          "item": "item_9015",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9318.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9637": {
    "name_en": "Special Drieghanese Meal",
    "name_tr": "Drieghan Özel Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9490",
          "qty": 1
        },
        {
          "item": "item_9318",
          "qty": 1
        },
        {
          "item": "item_9488",
          "qty": 1
        },
        {
          "item": "item_9486",
          "qty": 1
        },
        {
          "item": "item_9206",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9637.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9496": {
    "name_en": "Savory Steak",
    "name_tr": "Leziz Biftek",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7923",
          "qty": 4
        },
        {
          "item": "item_7018",
          "qty": 5
        },
        {
          "item": "item_9017",
          "qty": 2
        },
        {
          "item": "item_7301",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9496.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9321": {
    "name_en": "Carrot Confit",
    "name_tr": "Havuçlu Karamel",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_54005",
          "qty": 2
        },
        {
          "item": "item_6656",
          "qty": 3
        },
        {
          "item": "item_54003",
          "qty": 3
        },
        {
          "item": "item_9001",
          "qty": 2
        },
        {
          "item": "item_7348",
          "qty": 4
        }
      ]
    },
    "icon": "icons/item_9321.webp"
  },
  "item_6394": {
    "name_en": "Chowder",
    "name_tr": "Balıkçı Türlüsü",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_6520",
          "qty": 1
        },
        {
          "item": "item_7301",
          "qty": 2
        },
        {
          "item": "item_7905",
          "qty": 2
        },
        {
          "item": "item_9065",
          "qty": 1
        },
        {
          "item": "item_9214",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_6394.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9331": {
    "name_en": "Stir-Fried Bird",
    "name_tr": "Kuş Eti Kavurma",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7921",
          "qty": 5
        },
        {
          "item": "item_7001",
          "qty": 5
        },
        {
          "item": "item_7303",
          "qty": 3
        },
        {
          "item": "item_9016",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9331.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9335": {
    "name_en": "Chicken Breast Salad",
    "name_tr": "Tavuk Göğsü Salatası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7921",
          "qty": 5
        },
        {
          "item": "item_7313",
          "qty": 5
        },
        {
          "item": "item_7318",
          "qty": 5
        },
        {
          "item": "item_9066",
          "qty": 1
        },
        {
          "item": "item_9017",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9335.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9327": {
    "name_en": "Delotia Juice",
    "name_tr": "Delotia Meyve Suyu",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5538",
          "qty": 4
        },
        {
          "item": "item_7313",
          "qty": 5
        },
        {
          "item": "item_9002",
          "qty": 3
        },
        {
          "item": "item_6656",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9327.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9329": {
    "name_en": "Delotia Milk Tea",
    "name_tr": "Delotia Sütlü Çay",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5538",
          "qty": 4
        },
        {
          "item": "item_9065",
          "qty": 3
        },
        {
          "item": "item_7702",
          "qty": 3
        },
        {
          "item": "item_6656",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9329.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9323": {
    "name_en": "Delotia Tart",
    "name_tr": "Delotia Turta",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5538",
          "qty": 3
        },
        {
          "item": "item_9065",
          "qty": 2
        },
        {
          "item": "item_7101",
          "qty": 5
        },
        {
          "item": "item_9064",
          "qty": 1
        },
        {
          "item": "item_6656",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9323.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9325": {
    "name_en": "Delotia Pudding",
    "name_tr": "Delotia Puding",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5538",
          "qty": 5
        },
        {
          "item": "item_6214",
          "qty": 7
        },
        {
          "item": "item_9206",
          "qty": 2
        },
        {
          "item": "item_9261",
          "qty": 1
        },
        {
          "item": "item_6656",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9325.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9337": {
    "name_en": "Frank Sandwich",
    "name_tr": "Frank Sandviç",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9427",
          "qty": 2
        },
        {
          "item": "item_9260",
          "qty": 1
        },
        {
          "item": "item_7318",
          "qty": 2
        },
        {
          "item": "item_9004",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9337.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9333": {
    "name_en": "Stir-Fried Bracken and Meat",
    "name_tr": "Eğrelti Otu Et Kavurma",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5532",
          "qty": 3
        },
        {
          "item": "item_7905",
          "qty": 6
        },
        {
          "item": "item_7302",
          "qty": 3
        },
        {
          "item": "item_9015",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 5
        }
      ]
    },
    "icon": "icons/item_9333.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9638": {
    "name_en": "O'dyllita Meal",
    "name_tr": "O'dyllita Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9326",
          "qty": 1
        },
        {
          "item": "item_9333",
          "qty": 1
        },
        {
          "item": "item_9327",
          "qty": 2
        },
        {
          "item": "item_9335",
          "qty": 2
        },
        {
          "item": "item_9331",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9638.webp"
  },
  "item_9364": {
    "name_en": "Single-brewed Mesima Tea",
    "name_tr": "Bir Kez Demlenmiş Mesima Mantarı Çayı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5548",
          "qty": 5
        },
        {
          "item": "item_9059",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9364.webp",
    "note_tr": "RNG üretim: 1-4 adet (garanti min. esas alındı)",
    "note_en": "RNG yield: 1-4 per craft (guaranteed min. used)"
  },
  "item_9365": {
    "name_en": "Twice-brewed Mesima Tea",
    "name_tr": "İki Kez Demlenmiş Mesima Mantarı Çayı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9364",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9365.webp"
  },
  "item_9366": {
    "name_en": "Well-brewed Mesima Tea",
    "name_tr": "İyi Demlenmiş Mesima Mantarı Çayı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9365",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9366.webp"
  },
  "item_9339": {
    "name_en": "Chanterelle Stew",
    "name_tr": "Şanterel Mantarı Türlüsü",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5544",
          "qty": 3
        },
        {
          "item": "item_7305",
          "qty": 1
        },
        {
          "item": "item_9004",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9339.webp"
  },
  "item_9341": {
    "name_en": "Chanterelle and Potato Stew",
    "name_tr": "Şanterel Mantarlı Patates Yahnisi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5544",
          "qty": 2
        },
        {
          "item": "item_7003",
          "qty": 5
        },
        {
          "item": "item_7303",
          "qty": 1
        },
        {
          "item": "item_7318",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 5
        }
      ]
    },
    "icon": "icons/item_9341.webp"
  },
  "item_9343": {
    "name_en": "Stir-Fried Chanterelle and Meat",
    "name_tr": "Şanterel Mantarlı Et Kavurma",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5544",
          "qty": 3
        },
        {
          "item": "item_7905",
          "qty": 5
        },
        {
          "item": "item_9018",
          "qty": 2
        },
        {
          "item": "item_7301",
          "qty": 2
        },
        {
          "item": "item_9001",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9343.webp"
  },
  "item_9345": {
    "name_en": "Chanterelle Porridge",
    "name_tr": "Şanterel Mantarı Lapası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5544",
          "qty": 2
        },
        {
          "item": "item_7001",
          "qty": 5
        },
        {
          "item": "item_7303",
          "qty": 1
        },
        {
          "item": "item_9001",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9345.webp"
  },
  "item_9349": {
    "name_en": "Chanterelle Risotto",
    "name_tr": "Şanterel Mantarı Risotto",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5544",
          "qty": 2
        },
        {
          "item": "item_7001",
          "qty": 5
        },
        {
          "item": "item_9003",
          "qty": 1
        },
        {
          "item": "item_9063",
          "qty": 1
        },
        {
          "item": "item_9015",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9349.webp"
  },
  "item_9351": {
    "name_en": "Citron Cider",
    "name_tr": "Ağaç Kavunu Şarabı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7362",
          "qty": 1
        },
        {
          "item": "item_9057",
          "qty": 3
        },
        {
          "item": "item_9002",
          "qty": 1
        },
        {
          "item": "item_9005",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9351.webp"
  },
  "item_9353": {
    "name_en": "Citron Vinegar",
    "name_tr": "Ağaç Kavunu Sirkesi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7362",
          "qty": 1
        },
        {
          "item": "item_9005",
          "qty": 1
        },
        {
          "item": "item_9002",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9353.webp"
  },
  "item_9355": {
    "name_en": "Citron Juice",
    "name_tr": "Ağaç Kavunu Suyu",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7362",
          "qty": 1
        },
        {
          "item": "item_9002",
          "qty": 3
        },
        {
          "item": "item_9059",
          "qty": 5
        },
        {
          "item": "item_7702",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9355.webp"
  },
  "item_9359": {
    "name_en": "Balacs Lunchbox",
    "name_tr": "Balacs Öğle Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9369",
          "qty": 2
        },
        {
          "item": "item_9355",
          "qty": 2
        },
        {
          "item": "item_9378",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9359.webp"
  },
  "item_9360": {
    "name_en": "Special Eilton Specialty Meal",
    "name_tr": "Eilton Özel Ürünü Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9351",
          "qty": 2
        },
        {
          "item": "item_9345",
          "qty": 2
        },
        {
          "item": "item_9361",
          "qty": 1
        },
        {
          "item": "item_9339",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9360.webp"
  },
  "item_9361": {
    "name_en": "Pickled Citron and Onions",
    "name_tr": "Ağaç Kavunlu Salamura Soğan",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7303",
          "qty": 2
        },
        {
          "item": "item_9353",
          "qty": 2
        },
        {
          "item": "item_9002",
          "qty": 2
        },
        {
          "item": "item_9005",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9361.webp"
  },
  "item_9367": {
    "name_en": "Mesima Rice Wine",
    "name_tr": "Mesima Mantarı Pirinç Şarabı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5548",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 3
        },
        {
          "item": "item_9005",
          "qty": 3
        },
        {
          "item": "item_7001",
          "qty": 5
        }
      ]
    },
    "icon": "icons/item_9367.webp"
  },
  "item_9369": {
    "name_en": "Eilton Sandwich",
    "name_tr": "Eilton Sandviçi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7362",
          "qty": 1
        },
        {
          "item": "item_9260",
          "qty": 2
        },
        {
          "item": "item_9064",
          "qty": 4
        },
        {
          "item": "item_7318",
          "qty": 5
        }
      ]
    },
    "icon": "icons/item_9369.webp"
  },
  "item_9371": {
    "name_en": "Mesima Chicken Soup",
    "name_tr": "Mesima Mantarı Tavuk Çorbası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_5548",
          "qty": 3
        },
        {
          "item": "item_9059",
          "qty": 2
        },
        {
          "item": "item_7302",
          "qty": 1
        },
        {
          "item": "item_7016",
          "qty": 1
        },
        {
          "item": "item_7921",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9371.webp"
  },
  "item_9376": {
    "name_en": "Fruit Sherbet",
    "name_tr": "Meyve Şerbeti",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9069",
          "qty": 1
        },
        {
          "item": "item_7313",
          "qty": 2
        },
        {
          "item": "item_9002",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_9376.webp"
  },
  "item_9378": {
    "name_en": "Citron Candy",
    "name_tr": "Ağaç Kavunu Şekeri",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7360",
          "qty": 1
        },
        {
          "item": "item_7702",
          "qty": 1
        },
        {
          "item": "item_9009",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_9378.webp"
  },
  "item_9640": {
    "name_en": "Eilton Meal",
    "name_tr": "Eilton Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9349",
          "qty": 1
        },
        {
          "item": "item_9341",
          "qty": 1
        },
        {
          "item": "item_9343",
          "qty": 1
        },
        {
          "item": "item_9376",
          "qty": 2
        },
        {
          "item": "item_9367",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_9640.webp"
  },
  "item_9271": {
    "name_en": "Crispy Fried Vegetables",
    "name_tr": "Çıtır Sebze Kızartması",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7303",
          "qty": 6
        },
        {
          "item": "item_7201",
          "qty": 3
        },
        {
          "item": "item_9064",
          "qty": 2
        },
        {
          "item": "item_9016",
          "qty": 6
        }
      ]
    },
    "icon": "icons/item_9271.webp"
  },
  "item_820801": {
    "name_en": "White Kimchi",
    "name_tr": "Beyaz Kimçi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_820121",
          "qty": 2
        },
        {
          "item": "item_7303",
          "qty": 1
        },
        {
          "item": "item_7302",
          "qty": 4
        },
        {
          "item": "item_9001",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_820801.webp"
  },
  "item_820805": {
    "name_en": "Dongchimi",
    "name_tr": "Dongchimi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_820123",
          "qty": 5
        },
        {
          "item": "item_7302",
          "qty": 2
        },
        {
          "item": "item_9001",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 5
        }
      ]
    },
    "icon": "icons/item_820805.webp"
  },
  "item_820811": {
    "name_en": "Bean Sprout Salad",
    "name_tr": "Baharatlı Fasulye Filizi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9073",
          "qty": 5
        },
        {
          "item": "item_820126",
          "qty": 1
        },
        {
          "item": "item_9001",
          "qty": 1
        },
        {
          "item": "item_9077",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_820811.webp"
  },
  "item_820815": {
    "name_en": "Cooked Rice",
    "name_tr": "Pirinç Pilavı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_820130",
          "qty": 1
        },
        {
          "item": "item_9024",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_820815.webp"
  },
  "item_820819": {
    "name_en": "Soybean Jjigae",
    "name_tr": "Soya Ezmesi Yemeği",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9076",
          "qty": 3
        },
        {
          "item": "item_7905",
          "qty": 1
        },
        {
          "item": "item_7302",
          "qty": 2
        },
        {
          "item": "item_9075",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_820819.webp"
  },
  "item_820821": {
    "name_en": "Mungbean Jeon",
    "name_tr": "Maş Fasulyeli Pankek",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9083",
          "qty": 5
        },
        {
          "item": "item_9072",
          "qty": 1
        },
        {
          "item": "item_9001",
          "qty": 1
        },
        {
          "item": "item_7905",
          "qty": 1
        },
        {
          "item": "item_5532",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_820821.webp"
  },
  "item_820823": {
    "name_en": "Buckwheat Jelly",
    "name_tr": "Karabuğday Jölesi",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9082",
          "qty": 5
        },
        {
          "item": "item_9001",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 1
        },
        {
          "item": "item_9075",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_820823.webp"
  },
  "item_820845": {
    "name_en": "Garaetteok",
    "name_tr": "Çubuk Pirinç Keki",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_820118",
          "qty": 5
        },
        {
          "item": "item_9001",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_820845.webp"
  },
  "item_820829": {
    "name_en": "Skewer",
    "name_tr": "Sanjeok",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_7905",
          "qty": 5
        },
        {
          "item": "item_820845",
          "qty": 2
        },
        {
          "item": "item_9023",
          "qty": 1
        },
        {
          "item": "item_9075",
          "qty": 1
        },
        {
          "item": "item_9001",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_820829.webp"
  },
  "item_820831": {
    "name_en": "Nurungji",
    "name_tr": "Kavrulmuş Pirinç",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_820815",
          "qty": 1
        },
        {
          "item": "item_9021",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_820831.webp"
  },
  "item_820833": {
    "name_en": "Sungnyung",
    "name_tr": "Kavrulmuş Pirinç Suyu",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_820831",
          "qty": 2
        },
        {
          "item": "item_9059",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_820833.webp"
  },
  "item_820839": {
    "name_en": "Jujube Tea",
    "name_tr": "Hünnap Çayı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_820114",
          "qty": 5
        },
        {
          "item": "item_9059",
          "qty": 1
        },
        {
          "item": "item_7702",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_820839.webp"
  },
  "item_820843": {
    "name_en": "Roasted Silver Apricot",
    "name_tr": "Kavrulmuş Gümüş Kayısı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_820116",
          "qty": 4
        },
        {
          "item": "item_9001",
          "qty": 1
        },
        {
          "item": "item_9072",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_820843.webp"
  },
  "item_820849": {
    "name_en": "Red Bean Sirutteok",
    "name_tr": "Kırmızı Fasulyeli Pirinç Keki",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9080",
          "qty": 4
        },
        {
          "item": "item_820118",
          "qty": 3
        },
        {
          "item": "item_9002",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_820849.webp"
  },
  "item_820856": {
    "name_en": "Moodle Gukbap",
    "name_tr": "Orijinal Moodle Gukbabı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_820118",
          "qty": 2
        },
        {
          "item": "item_820815",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 1
        },
        {
          "item": "item_7302",
          "qty": 2
        },
        {
          "item": "item_7905",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_820856.webp"
  },
  "item_820857": {
    "name_en": "Dalbeol Gukbap",
    "name_tr": "Orijinal Dalbeol Gukbabı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_820104",
          "qty": 2
        },
        {
          "item": "item_820815",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 1
        },
        {
          "item": "item_5532",
          "qty": 2
        },
        {
          "item": "item_9077",
          "qty": 3
        }
      ]
    },
    "icon": "icons/item_820857.webp"
  },
  "item_820858": {
    "name_en": "Byeot County Gukbap",
    "name_tr": "Orijinal Byeot Gukbabı",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_820121",
          "qty": 1
        },
        {
          "item": "item_820815",
          "qty": 1
        },
        {
          "item": "item_9059",
          "qty": 1
        },
        {
          "item": "item_820123",
          "qty": 2
        },
        {
          "item": "item_7905",
          "qty": 2
        }
      ]
    },
    "icon": "icons/item_820858.webp"
  },
  "item_820825": {
    "name_en": "Red Bean Porridge",
    "name_tr": "Kırmızı Fasulye Lapası",
    "tier": "craftable",
    "skill": "cooking",
    "recipe": {
      "output_qty": 1,
      "ingredients": [
        {
          "item": "item_9080",
          "qty": 5
        },
        {
          "item": "item_820118",
          "qty": 5
        },
        {
          "item": "item_9001",
          "qty": 1
        },
        {
          "item": "item_9024",
          "qty": 1
        }
      ]
    },
    "icon": "icons/item_820825.webp"
  },
  "item_9018": {
    "name_en": "Base Sauce",
    "name_tr": "Temel Sos",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9018.webp"
  },
  "item_9065": {
    "name_en": "Milk",
    "name_tr": "Süt",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9065.webp"
  },
  "item_9017": {
    "name_en": "Cooking Wine",
    "name_tr": "Aşçılık Şarabı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9017.webp"
  },
  "item_7906": {
    "name_en": "Beef",
    "name_tr": "Sığır Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7906.webp"
  },
  "item_9059": {
    "name_en": "Mineral Water",
    "name_tr": "Maden Suyu",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9059.webp"
  },
  "item_9064": {
    "name_en": "Egg",
    "name_tr": "Yumurta",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9064.webp"
  },
  "item_7105": {
    "name_en": "Corn Flour",
    "name_tr": "Mısır Unu",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7105.webp"
  },
  "item_9005": {
    "name_en": "Leavening Agent",
    "name_tr": "Karbonat",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9005.webp"
  },
  "item_7005": {
    "name_en": "Corn",
    "name_tr": "Mısır",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7005.webp"
  },
  "item_7318": {
    "name_en": "Cabbage",
    "name_tr": "Lahana",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7318.webp"
  },
  "item_7201": {
    "name_en": "Wheat Dough",
    "name_tr": "Buğday Hamuru",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7201.webp"
  },
  "item_9062": {
    "name_en": "Cheese",
    "name_tr": "Peynir",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9062.webp"
  },
  "item_7347": {
    "name_en": "Aloe",
    "name_tr": "Aloe",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7347.webp"
  },
  "item_7205": {
    "name_en": "Corn Dough",
    "name_tr": "Mısır Hamuru",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7205.webp"
  },
  "item_7702": {
    "name_en": "Cooking Honey",
    "name_tr": "Pişirme Balı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7702.webp"
  },
  "item_9063": {
    "name_en": "Butter",
    "name_tr": "Tereyağı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9063.webp"
  },
  "item_8510": {
    "name_en": "Dried Rockfish",
    "name_tr": "Kurutulmuş Kaya Balığı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_8510.webp"
  },
  "item_8211": {
    "name_en": "Squid",
    "name_tr": "Kalamar",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_8211.webp"
  },
  "item_54004": {
    "name_en": "High-quality Carrot",
    "name_tr": "Yüksek Kalite Havuç",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_54004.webp"
  },
  "item_54005": {
    "name_en": "Special Carrot",
    "name_tr": "Özel Havuç",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_54005.webp"
  },
  "item_7305": {
    "name_en": "Hot Pepper",
    "name_tr": "Acı Biber",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7305.webp"
  },
  "item_9016": {
    "name_en": "Deep Frying Oil",
    "name_tr": "Kızartma Yağı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9016.webp"
  },
  "item_9061": {
    "name_en": "Cream",
    "name_tr": "Krema",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9061.webp"
  },
  "item_7303": {
    "name_en": "Onion",
    "name_tr": "Soğan",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7303.webp"
  },
  "item_7319": {
    "name_en": "Rose",
    "name_tr": "Gül",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7319.webp"
  },
  "item_7302": {
    "name_en": "Garlic",
    "name_tr": "Sarımsak",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7302.webp"
  },
  "item_7921": {
    "name_en": "Chicken Meat",
    "name_tr": "Tavuk Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7921.webp"
  },
  "item_7301": {
    "name_en": "Pepper",
    "name_tr": "Biber",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7301.webp"
  },
  "item_7908": {
    "name_en": "Lizard Meat",
    "name_tr": "Kertenkele Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7908.webp"
  },
  "item_8210": {
    "name_en": "Rockfish",
    "name_tr": "Kayabalığı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_8210.webp"
  },
  "item_7918": {
    "name_en": "Fragrant Jerky",
    "name_tr": "Kokulu Pastırma",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7918.webp"
  },
  "item_7348": {
    "name_en": "Cinnamon",
    "name_tr": "Tarçın",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7348.webp"
  },
  "item_8501": {
    "name_en": "Dried Mudskipper",
    "name_tr": "Kurutulmuş Bataklık Balığı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_8501.webp"
  },
  "item_6201": {
    "name_en": "Deer Blood",
    "name_tr": "Geyik Kanı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_6201.webp"
  },
  "item_9726": {
    "name_en": "Blue Whale Meat",
    "name_tr": "Mavi Balina Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9726.webp"
  },
  "item_8509": {
    "name_en": "Dried Saurel",
    "name_tr": "Kurutulmuş Karagöz",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_8509.webp"
  },
  "item_7026": {
    "name_en": "Coconut",
    "name_tr": "Hindistan Cevizi",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7026.webp"
  },
  "item_7304": {
    "name_en": "Strawberry",
    "name_tr": "Çilek",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7304.webp"
  },
  "item_8201": {
    "name_en": "Mudskipper",
    "name_tr": "Bataklık Balığı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_8201.webp"
  },
  "item_9731": {
    "name_en": "Soft Whale Meat",
    "name_tr": "Yumuşak Balina Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9731.webp"
  },
  "item_9735": {
    "name_en": "Fugitive Khalk's Horn",
    "name_tr": "Kaçak Khalk'ın Boynuzu",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9735.webp"
  },
  "item_7016": {
    "name_en": "Date Palm",
    "name_tr": "Hurma",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7016.webp"
  },
  "item_7923": {
    "name_en": "Lion Meat",
    "name_tr": "Aslan Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7923.webp"
  },
  "item_7020": {
    "name_en": "Nutmeg",
    "name_tr": "Küçük Hindistan Cevizi",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7020.webp"
  },
  "item_7106": {
    "name_en": "Teff Flour",
    "name_tr": "Teff Unu",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7106.webp"
  },
  "item_7206": {
    "name_en": "Teff Flour Dough",
    "name_tr": "Teff Hamuru",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7206.webp"
  },
  "item_7311": {
    "name_en": "Tomato",
    "name_tr": "Domates",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7311.webp"
  },
  "item_7924": {
    "name_en": "Scorpion Meat",
    "name_tr": "Akrep Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7924.webp"
  },
  "item_7018": {
    "name_en": "Fig",
    "name_tr": "İncir",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7018.webp"
  },
  "item_7021": {
    "name_en": "Freekeh",
    "name_tr": "Fereke",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7021.webp"
  },
  "item_7922": {
    "name_en": "Snake Meat",
    "name_tr": "Yılan Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7922.webp"
  },
  "item_7019": {
    "name_en": "Star Anise",
    "name_tr": "Yıldız Anason",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7019.webp"
  },
  "item_6515": {
    "name_en": "Oyster",
    "name_tr": "İstiridye",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_6515.webp"
  },
  "item_7101": {
    "name_en": "Wheat Flour",
    "name_tr": "Buğday Unu",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7101.webp"
  },
  "item_6520": {
    "name_en": "Dried Pearl Oyster Flesh",
    "name_tr": "Kurutulmuş İnci İstiridye Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_6520.webp"
  },
  "item_7017": {
    "name_en": "Pistachio",
    "name_tr": "Fıstık",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7017.webp"
  },
  "item_7022": {
    "name_en": "Teff",
    "name_tr": "Teff",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7022.webp"
  },
  "item_6516": {
    "name_en": "Shrimp",
    "name_tr": "Karides",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_6516.webp"
  },
  "item_7312": {
    "name_en": "Paprika",
    "name_tr": "Paprika",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7312.webp"
  },
  "item_6511": {
    "name_en": "Lobster",
    "name_tr": "Istakoz",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_6511.webp"
  },
  "item_5515": {
    "name_en": "Rainbow Button Mushroom",
    "name_tr": "Gökkuşağı Kültür Mantarı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_5515.webp"
  },
  "item_7913": {
    "name_en": "Wolf Meat",
    "name_tr": "Kurt Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7913.webp"
  },
  "item_9279": {
    "name_en": "Full-bodied Makgeolli",
    "name_tr": "Yoğun Makgeolli",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9279.webp"
  },
  "item_7958": {
    "name_en": "Ground Bird Meat",
    "name_tr": "Kıyılmış Kuş Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7958.webp"
  },
  "item_7001": {
    "name_en": "Wheat",
    "name_tr": "Buğday",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7001.webp"
  },
  "item_7955": {
    "name_en": "Marmot Meat",
    "name_tr": "Marmot Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7955.webp"
  },
  "item_7954": {
    "name_en": "Yak Meat",
    "name_tr": "Yak Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7954.webp"
  },
  "item_7956": {
    "name_en": "Llama Meat",
    "name_tr": "Lama Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7956.webp"
  },
  "item_5532": {
    "name_en": "Bracken",
    "name_tr": "Eğrelti Otu",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_5532.webp"
  },
  "item_9319": {
    "name_en": "Savory Stir-Fried Bracken",
    "name_tr": "Taze Eğrelti Otu Kavurması",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9319.webp"
  },
  "item_54003": {
    "name_en": "Lump of Raw Sugar",
    "name_tr": "Ham Şeker Yumağı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_54003.webp"
  },
  "item_7905": {
    "name_en": "Pork",
    "name_tr": "Domuz Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7905.webp"
  },
  "item_9009": {
    "name_en": "Raw Sugar",
    "name_tr": "Ham Şeker",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9009.webp"
  },
  "item_9431": {
    "name_en": "Smoked Sausage",
    "name_tr": "Füme Sosis",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9431.webp"
  },
  "item_9326": {
    "name_en": "Blood Red Delotia Pudding",
    "name_tr": "Delotia Kanlı Puding",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9326.webp"
  },
  "item_5548": {
    "name_en": "Mesima",
    "name_tr": "Mesima Mantarı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_5548.webp"
  },
  "item_5544": {
    "name_en": "Chanterelle",
    "name_tr": "Şanterel Mantarı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_5544.webp"
  },
  "item_7003": {
    "name_en": "Potato",
    "name_tr": "Patates",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7003.webp"
  },
  "item_7362": {
    "name_en": "Special Citron",
    "name_tr": "Özel Ağaç Kavunu",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7362.webp"
  },
  "item_7360": {
    "name_en": "Citron",
    "name_tr": "Ağaç Kavunu",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7360.webp"
  },
  "item_7361": {
    "name_en": "High-quality Citron",
    "name_tr": "Yüksek Kalite Ağaç Kavunu",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7361.webp"
  },
  "item_9370": {
    "name_en": "High-quality Eilton Sandwich",
    "name_tr": "Yüksek Kalite Eilton Sandviçi",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9370.webp"
  },
  "item_9352": {
    "name_en": "Sour Citron Cider",
    "name_tr": "Ekşi Ağaç Kavunu Şarabı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9352.webp"
  },
  "item_9069": {
    "name_en": "Translucent Ice",
    "name_tr": "Saydam Buz",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9069.webp"
  },
  "item_9350": {
    "name_en": "Aromatic Chanterelle Risotto",
    "name_tr": "Derin Kokulu Şanterel Mantarı Risotto",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9350.webp"
  },
  "item_820121": {
    "name_en": "High-quality Napa Cabbage",
    "name_tr": "Yüksek Kalite Napa Lahanası",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820121.webp"
  },
  "item_820122": {
    "name_en": "Special Napa Cabbage",
    "name_tr": "Özel Napa Lahanası",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820122.webp"
  },
  "item_820120": {
    "name_en": "Napa Cabbage",
    "name_tr": "Napa Lahanası",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820120.webp"
  },
  "item_820123": {
    "name_en": "Radish",
    "name_tr": "Turp",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820123.webp"
  },
  "item_820124": {
    "name_en": "High-quality Radish",
    "name_tr": "Yüksek Kalite Turp",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820124.webp"
  },
  "item_820125": {
    "name_en": "Special Radish",
    "name_tr": "Özel Turp",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820125.webp"
  },
  "item_9073": {
    "name_en": "Bean Sprouts",
    "name_tr": "Fasulye Filizi",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9073.webp"
  },
  "item_820126": {
    "name_en": "Perilla",
    "name_tr": "Perilla",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820126.webp"
  },
  "item_9077": {
    "name_en": "Red Pepper Powder",
    "name_tr": "Kırmızı Toz Biber",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9077.webp"
  },
  "item_820130": {
    "name_en": "Special Rice",
    "name_tr": "Özel Pirinç",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820130.webp"
  },
  "item_9024": {
    "name_en": "Spring Water",
    "name_tr": "Mineralli Su",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9024.webp"
  },
  "item_820129": {
    "name_en": "High-quality Rice",
    "name_tr": "Yüksek Kalite Pirinç",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820129.webp"
  },
  "item_820117": {
    "name_en": "Rice",
    "name_tr": "Pirinç",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820117.webp"
  },
  "item_9076": {
    "name_en": "Soybean Paste",
    "name_tr": "Soya Ezmesi",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9076.webp"
  },
  "item_9075": {
    "name_en": "Soy Sauce",
    "name_tr": "Soya Sosu",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9075.webp"
  },
  "item_9083": {
    "name_en": "Mungbean",
    "name_tr": "Maş Fasulyesi",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9083.webp"
  },
  "item_9072": {
    "name_en": "Perilla Oil",
    "name_tr": "Perilla Yağı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9072.webp"
  },
  "item_9082": {
    "name_en": "Buckwheat",
    "name_tr": "Karabuğday",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9082.webp"
  },
  "item_820118": {
    "name_en": "Rice Flour",
    "name_tr": "Pirinç Unu",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820118.webp"
  },
  "item_9023": {
    "name_en": "Matsul",
    "name_tr": "Matsul",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9023.webp"
  },
  "item_9021": {
    "name_en": "Corn Oil",
    "name_tr": "Mısır Yağı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9021.webp"
  },
  "item_820114": {
    "name_en": "Jujube",
    "name_tr": "Hünnap",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820114.webp"
  },
  "item_820116": {
    "name_en": "Silver Apricot",
    "name_tr": "Gümüş Kayısı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820116.webp"
  },
  "item_9080": {
    "name_en": "Red Bean",
    "name_tr": "Kırmızı Fasulye",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9080.webp"
  },
  "item_820104": {
    "name_en": "Goosefoot Leaf",
    "name_tr": "Kazayağı Yaprağı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820104.webp"
  },
  "item_9008": {
    "name_en": "Sun-Dried Salt",
    "name_tr": "Güneşte Kurutulmuş Tuz",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9008.webp"
  },
  "item_9300": {
    "name_en": "Thick Freekeh Snake Stew",
    "name_tr": "Yoğun Fereke Yılan Yahnisi",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9300.webp"
  },
  "item_9292": {
    "name_en": "Tea with Strong Scent",
    "name_tr": "Yoğun Kokulu Çay",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9292.webp"
  },
  "item_9022": {
    "name_en": "Cottonseed Oil",
    "name_tr": "Pamuk Yağı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9022.webp"
  },
  "item_7335": {
    "name_en": "Special Pepper",
    "name_tr": "Özel Biber",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7335.webp"
  },
  "item_7323": {
    "name_en": "High-quality Pepper",
    "name_tr": "Yüksek Kalite Biber",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7323.webp"
  },
  "item_9276": {
    "name_en": "Refined Oatmeal",
    "name_tr": "İşlenmiş Yulaf Ezmesi",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9276.webp"
  },
  "item_820816": {
    "name_en": "Steaming Cooked Rice",
    "name_tr": "Buharda Pişmiş Pirinç Pilavı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820816.webp"
  },
  "item_820832": {
    "name_en": "Crispy Nurungji",
    "name_tr": "Çıtır Kavrulmuş Pirinç",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_820832.webp"
  },
  "item_7703": {
    "name_en": "High-quality Cooking Honey",
    "name_tr": "Yüksek Kalite Pişirme Balı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7703.webp"
  },
  "item_7701": {
    "name_en": "Wild Beehive",
    "name_tr": "Yabani Arı Kovanı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_7701.webp"
  },
  "item_9299": {
    "name_en": "Spongy Teff Bread",
    "name_tr": "Delikli Teff Ekmeği",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9299.webp"
  },
  "item_9295": {
    "name_en": "Tangy Honey Wine",
    "name_tr": "Keskin Bal Şarabı",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9295.webp"
  },
  "item_9732": {
    "name_en": "Crocodile Meat",
    "name_tr": "Timsah Eti",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9732.webp"
  },
  "item_9282": {
    "name_en": "Chewy Cheese Gratin",
    "name_tr": "Kaşar Peyniri Graten",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9282.webp"
  },
  "item_9290": {
    "name_en": "High-quality Ham Sandwich",
    "name_tr": "Yüksek Kalite Jambonlu Sandviç",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9290.webp"
  },
  "item_9277": {
    "name_en": "Smooth Milk Tea",
    "name_tr": "Yumuşak Sütlü Çay",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9277.webp"
  },
  "item_9448": {
    "name_en": "Bloody Dark Pudding",
    "name_tr": "Kanlı Siyah Puding",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9448.webp"
  },
  "item_9305": {
    "name_en": "Classic Couscous",
    "name_tr": "Geleneksel Kuskus",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9305.webp"
  },
  "item_9310": {
    "name_en": "Chilled Coconut Cocktail",
    "name_tr": "Dondurulmuş Hindistan Cevizi Kokteyli",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9310.webp"
  },
  "item_9478": {
    "name_en": "Golden Butter-roasted Lobster",
    "name_tr": "Altın Tereyağında Kavrulmuş Istakoz",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9478.webp"
  },
  "item_9317": {
    "name_en": "Sweet Rainbow Button Mushroom Sandwich",
    "name_tr": "Tatlı Gökkuşağı Kültür Mantarı Sandviç",
    "tier": "raw",
    "skill": "cooking",
    "recipe": null,
    "icon": "icons/item_9317.webp"
  }
}
};
