// BDO Helper — reçete verisi (otomatik üretildi)
//
// Kaynak: bdocodex.com
//   - "item_1399" (Ahenk Öz İksiri) ve 5 ara "Öz İksir" (item_1389/1391/1393/1395/1397) +
//     "item_820936" (Büyülü Katalizör): bdocodex item/recipe sayfalarından elle doğrulandı
//     (bu özel kombinasyon tarifleri normal Simya beceri tablosunda YER ALMAZ).
//   - Geri kalan ~321 madde: bdocodex "Alchemy Recipes" tablosundaki (209 reçete) TÜM
//     kayıtlar, sitenin kendi tooltip API'sinden (tip.php) çekilen resmi İngilizce ve
//     Türkçe isimlerle birlikte otomatik olarak derlendi. Bu, oyundaki simya ile
//     üretilebilen HER maddeyi kapsar (iksir, reaktif, kristal, boya vb.).
//   - "icon": her maddenin bdocodex ikonu, yerel icons/ klasöründe barındırılıyor
//     (bdocodex'e hotlink yapmamak için indirilip repoya eklendi).
//
// Her item: { name_en, name_tr, tier, recipe, note_tr, note_en, source_tr, source_en, icon }
//   recipe: { output_qty, ingredients:[{item, qty}] } | null
//   recipe === null  ->  ham madde / taban malzeme (üretilmez; toplanır/avlanır/satın alınır)
//   tier: "final" | "mid" | "craftable" | "raw"  -> "Ne üretmek istiyorsun" listesinde gruplama
//   note_tr/note_en: RNG üretim aralığı veya bilinen istisna notu (varsa)
//   source_tr/source_en: bazı ham maddeler için nasıl elde edildiği bilgisi (varsa)
//   icon: yerel görsel dosya yolu (site köküne göre, örn. "icons/item_1399.webp")
//
// Simya tarifleri RNG'li üretir (temel/garanti miktar + şansla bonus adet/üst-tier ürün).
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
    "icon": "icons/item_1399.webp"
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
    "icon": "icons/item_1389.webp"
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
    "icon": "icons/item_1391.webp"
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
    "icon": "icons/item_1393.webp"
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
    "icon": "icons/item_1395.webp"
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
    "icon": "icons/item_1397.webp"
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
    "icon": "icons/item_664.webp"
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
    "icon": "icons/item_668.webp"
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
    "icon": "icons/item_670.webp"
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
    "icon": "icons/item_672.webp"
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
    "icon": "icons/item_674.webp"
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
    "icon": "icons/item_676.webp"
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
    "icon": "icons/item_678.webp"
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
    "icon": "icons/item_680.webp"
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
    "icon": "icons/item_682.webp"
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
    "icon": "icons/item_684.webp"
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
    "icon": "icons/item_686.webp"
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
    "icon": "icons/item_688.webp"
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
    "icon": "icons/item_690.webp"
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
    "icon": "icons/item_692.webp"
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
    "icon": "icons/item_694.webp"
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
    "icon": "icons/item_696.webp"
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
    "icon": "icons/item_698.webp"
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
    "icon": "icons/item_700.webp"
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
    "icon": "icons/item_702.webp"
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
    "icon": "icons/item_704.webp"
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
    "icon": "icons/item_706.webp"
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
    "icon": "icons/item_708.webp"
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
    "icon": "icons/item_710.webp"
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
    "icon": "icons/item_712.webp"
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
    "icon": "icons/item_714.webp"
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
    "icon": "icons/item_716.webp"
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
    "icon": "icons/item_718.webp"
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
    "icon": "icons/item_720.webp"
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
    "icon": "icons/item_722.webp"
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
    "icon": "icons/item_724.webp"
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
    "icon": "icons/item_726.webp"
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
    "icon": "icons/item_728.webp"
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
    "icon": "icons/item_729.webp"
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
    "icon": "icons/item_730.webp"
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
    "icon": "icons/item_4076.webp"
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
    "icon": "icons/item_4481.webp"
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
    "icon": "icons/item_4684.webp"
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
    "icon": "icons/item_5202.webp"
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
    "icon": "icons/item_5204.webp"
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
    "icon": "icons/item_5206.webp"
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
    "icon": "icons/item_5208.webp"
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
    "icon": "icons/item_5210.webp"
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
    "icon": "icons/item_5214.webp"
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
    "icon": "icons/item_5216.webp"
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
    "icon": "icons/item_5301.webp"
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
    "icon": "icons/item_5302.webp"
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
    "icon": "icons/item_5603.webp"
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
    "icon": "icons/item_5604.webp"
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
    "icon": "icons/item_6183.webp"
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
    "icon": "icons/item_6351.webp"
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
    "icon": "icons/item_6352.webp"
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
    "icon": "icons/item_6353.webp"
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
    "icon": "icons/item_6354.webp"
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
    "icon": "icons/item_6355.webp"
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
    "icon": "icons/item_6601.webp"
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
    "icon": "icons/item_6602.webp"
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
    "icon": "icons/item_6603.webp"
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
    "icon": "icons/item_6604.webp"
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
    "icon": "icons/item_6605.webp"
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
    "icon": "icons/item_15101.webp"
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
    "icon": "icons/item_15102.webp"
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
    "icon": "icons/item_15103.webp"
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
    "icon": "icons/item_15104.webp"
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
    "icon": "icons/item_15105.webp"
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
    "icon": "icons/item_15106.webp"
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
    "icon": "icons/item_15107.webp"
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
    "icon": "icons/item_15108.webp"
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
    "icon": "icons/item_15109.webp"
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
    "icon": "icons/item_15110.webp"
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
    "icon": "icons/item_15111.webp"
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
    "icon": "icons/item_15112.webp"
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
    "icon": "icons/item_15113.webp"
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
    "icon": "icons/item_15114.webp"
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
    "icon": "icons/item_15115.webp"
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
    "icon": "icons/item_15116.webp"
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
    "icon": "icons/item_15117.webp"
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
    "icon": "icons/item_15118.webp"
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
    "icon": "icons/item_15119.webp"
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
    "icon": "icons/item_15121.webp"
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
    "icon": "icons/item_15122.webp"
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
    "icon": "icons/item_15123.webp"
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
    "icon": "icons/item_15124.webp"
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
    "icon": "icons/item_15126.webp"
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
    "icon": "icons/item_15127.webp"
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
    "icon": "icons/item_15128.webp"
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
    "icon": "icons/item_15129.webp"
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
    "icon": "icons/item_15130.webp"
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
    "icon": "icons/item_15131.webp"
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
    "icon": "icons/item_15132.webp"
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
    "icon": "icons/item_15133.webp"
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
    "icon": "icons/item_15134.webp"
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
    "icon": "icons/item_15136.webp"
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
    "icon": "icons/item_15137.webp"
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
    "icon": "icons/item_15138.webp"
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
    "icon": "icons/item_15139.webp"
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
    "icon": "icons/item_15146.webp"
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
    "icon": "icons/item_15147.webp"
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
    "icon": "icons/item_15148.webp"
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
    "icon": "icons/item_15149.webp"
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
    "icon": "icons/item_15150.webp"
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
    "icon": "icons/item_42398.webp"
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
    "icon": "icons/item_42402.webp"
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
    "icon": "icons/item_575.webp"
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
    "icon": "icons/item_732.webp"
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
    "icon": "icons/item_734.webp"
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
    "icon": "icons/item_735.webp"
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
    "icon": "icons/item_748.webp"
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
    "icon": "icons/item_761.webp"
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
    "icon": "icons/item_753.webp"
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
    "icon": "icons/item_749.webp"
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
    "icon": "icons/item_762.webp"
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
    "icon": "icons/item_771.webp"
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
    "icon": "icons/item_6606.webp"
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
    "icon": "icons/item_15120.webp"
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
    "icon": "icons/item_781.webp"
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
    "icon": "icons/item_740.webp"
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
    "icon": "icons/item_777.webp"
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
    "icon": "icons/item_773.webp"
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
    "icon": "icons/item_15125.webp"
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
    "icon": "icons/item_42413.webp"
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
    "icon": "icons/item_9734.webp"
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
    "icon": "icons/item_54032.webp"
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
    "icon": "icons/item_782.webp"
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
    "icon": "icons/item_45201.webp"
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
    "icon": "icons/item_15156.webp"
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
    "icon": "icons/item_1152.webp"
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
    "icon": "icons/item_1155.webp"
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
    "icon": "icons/item_1156.webp"
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
    "icon": "icons/item_1157.webp"
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
    "icon": "icons/item_1161.webp"
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
    "icon": "icons/item_9779.webp"
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
    "icon": "icons/item_5606.webp"
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
    "icon": "icons/item_1178.webp"
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
    "icon": "icons/item_5125.webp"
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
    "icon": "icons/item_1180.webp"
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
    "icon": "icons/item_1184.webp"
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
    "icon": "icons/item_1188.webp"
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
    "icon": "icons/item_1200.webp"
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
    "icon": "icons/item_5140.webp"
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
    "icon": "icons/item_5198.webp"
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
    "icon": "icons/item_65741.webp"
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
    "icon": "icons/item_766001.webp"
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
    "icon": "icons/item_766011.webp"
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
    "icon": "icons/item_766021.webp"
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
    "icon": "icons/item_766031.webp"
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
    "icon": "icons/item_9733.webp"
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
    "icon": "icons/item_699.webp"
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
    "icon": "icons/item_5121.webp"
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
    "icon": "icons/item_15668.webp"
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
    "icon": "icons/item_1409.webp"
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
    "icon": "icons/item_1413.webp"
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
    "icon": "icons/item_1411.webp"
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
    "tier": "raw",
    "recipe": null,
    "icon": "icons/item_9057.webp"
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
  }
}
};
