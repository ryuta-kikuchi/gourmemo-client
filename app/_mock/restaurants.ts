export type Review = {
  author: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  tags: string[];
};

export type Restaurant = {
  slug: string;
  name: string;
  area: string;
  price: string;
  rating: number;
  tags: string[];
  note: string;
  visited: string;
  mood: string;
  recommend: string;
  reviews: Review[];
};

export const restaurants: Restaurant[] = [
  {
    slug: "ramen-ame",
    name: "らーめん 雨",
    area: "虎ノ門",
    price: "¥¥",
    rating: 4.5,
    tags: ["ラーメン", "ランチ", "回転速い"],
    note: "スープが軽くて午後も眠くならない。行列は11:45前が狙い目。",
    visited: "2026/02/01",
    mood: "ひとり・短時間",
    recommend: "初めてなら醤油、卓上の柚子胡椒が合う。",
    reviews: [
      {
        author: "佐藤",
        date: "2026/02/01",
        rating: 4.5,
        title: "午後も眠くならない味",
        body: "スープが軽めで胃もたれしない。回転早いので短時間ランチに最適。",
        tags: ["回転速い", "一人向け"],
      },
      {
        author: "鈴木",
        date: "2026/01/24",
        rating: 4.0,
        title: "並ぶなら11:30前",
        body: "ピークを外せば待ち時間少なめ。味玉が当たりだった。",
        tags: ["並び注意", "味玉"],
      },
    ],
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
    mood: "会食・ゆっくり",
    recommend: "コースの肉料理が安定。時間に余裕を。",
    reviews: [
      {
        author: "田中",
        date: "2026/01/28",
        rating: 4.2,
        title: "会食で安心",
        body: "席が広くて会話しやすい。接客も安定していた。",
        tags: ["会食", "予約推奨"],
      },
      {
        author: "小林",
        date: "2026/01/20",
        rating: 3.8,
        title: "肉料理は良い",
        body: "味は良いが提供まで少し時間がかかった。",
        tags: ["時間に余裕"],
      },
      {
        author: "伊藤",
        date: "2026/01/18",
        rating: 4.0,
        title: "落ち着いた雰囲気",
        body: "照明が落ち着いていて会話がしやすい。",
        tags: ["雰囲気良い"],
      },
    ],
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
    mood: "作業・軽め",
    recommend: "窓際は電源あり。混む時間を避けると快適。",
    reviews: [
      {
        author: "山本",
        date: "2026/01/30",
        rating: 3.7,
        title: "打ち合わせ向き",
        body: "静かで話しやすい。電源席は早めに埋まる。",
        tags: ["作業可", "電源"],
      },
      {
        author: "高橋",
        date: "2026/01/22",
        rating: 3.9,
        title: "抹茶ラテが良い",
        body: "甘さ控えめで飲みやすい。おやつに丁度いい。",
        tags: ["甘味", "カフェ"],
      },
    ],
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
    mood: "バランス・健康",
    recommend: "日替わりの焼き魚が当たりの日は早めが安心。",
    reviews: [
      {
        author: "中村",
        date: "2026/02/02",
        rating: 4.4,
        title: "午後に効く定食",
        body: "脂が重くなくて午後も集中できた。",
        tags: ["ヘルシー", "定食"],
      },
      {
        author: "斎藤",
        date: "2026/01/29",
        rating: 4.1,
        title: "日替わりが当たり",
        body: "焼き魚がふっくら。小鉢も良い。",
        tags: ["日替わり", "小鉢"],
      },
    ],
  },
];

export const tagOptions = [
  "ラーメン",
  "ランチ",
  "回転速い",
  "洋食",
  "会食",
  "予約推奨",
  "カフェ",
  "作業可",
  "甘味",
  "和食",
  "定食",
  "ヘルシー",
  "並び注意",
  "味玉",
  "雰囲気良い",
  "電源",
  "一人向け",
  "時間に余裕",
  "日替わり",
  "小鉢",
];
