export const filters = [
  "ランチ",
  "ひとり",
  "コスパ",
  "和食",
  "カフェ",
  "行列少なめ",
];

export const restaurants = [
  {
    slug: "ramen-ame",
    name: "らーめん 雨",
    area: "虎ノ門",
    price: "¥¥",
    rating: 4.5,
    tags: ["ラーメン", "ランチ", "回転速い"],
    note: "スープが軽くて午後も眠くならない。行列は11:45前が狙い目。",
    visited: "2026/02/01",
  },
  {
    slug: "bistro-23",
    name: "港南ビストロ 23",
    area: "新橋",
    price: "¥¥¥",
    rating: 4.0,
    tags: ["洋食", "会食", "予約推奨"],
    note: "肉料理が良い。席が広めで会話しやすい。",
    visited: "2026/01/28",
  },
  {
    slug: "chaya-suzuran",
    name: "茶屋 すずらん",
    area: "汐留",
    price: "¥",
    rating: 3.8,
    tags: ["カフェ", "作業可", "甘味"],
    note: "静かで打ち合わせにも使える。抹茶ラテが人気。",
    visited: "2026/01/30",
  },
  {
    slug: "sakanato-kome-madoka",
    name: "魚と米 まどか",
    area: "虎ノ門",
    price: "¥¥",
    rating: 4.3,
    tags: ["和食", "定食", "ヘルシー"],
    note: "焼き魚の定食が安定。午後の集中力が落ちない。",
    visited: "2026/02/02",
  },
];

export const fields = [
  "店名",
  "エリア",
  "用途（ランチ/会食/作業）",
  "価格帯",
  "評価",
  "コメント",
  "写真（任意）",
];
