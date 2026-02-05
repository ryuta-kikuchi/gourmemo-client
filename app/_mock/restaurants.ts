export type Review = {
  author: string;
  date: string;
  rating: number;
  spend?: number;
  title: string;
  body: string;
  tags: string[];
};

export type Restaurant = {
  slug: string;
  name: string;
  area: string;
  address: string;
  price: string;
  rating: number;
  tags: string[];
  note: string;
  visited: string;
  mood: string;
  recommend: string;
  reviews: Review[];
};

const formatYen = (value: number) => `¥${value.toLocaleString("ja-JP")}`;

export const getPriceSummary = (restaurant: Restaurant) => {
  const spends = restaurant.reviews
    .map((review) => review.spend)
    .filter((value): value is number => typeof value === "number");

  if (spends.length === 0) {
    return {
      label: restaurant.price || "価格未登録",
      count: 0,
      source: "default",
    };
  }

  const min = Math.min(...spends);
  const max = Math.max(...spends);
  const label = min === max ? formatYen(min) : `${formatYen(min)}〜${formatYen(max)}`;

  return {
    label,
    count: spends.length,
    source: "reviews",
  };
};

export const getReviewNote = (restaurant: Restaurant): string | null => {
  if (restaurant.reviews.length === 0) {
    return null;
  }

  const latestReview = [...restaurant.reviews].sort((a, b) =>
    a.date < b.date ? 1 : -1
  )[0];

  if (!latestReview) {
    return null;
  }

  return latestReview.title
    ? `${latestReview.title}：${latestReview.body}`
    : latestReview.body;
};

export const restaurants: Restaurant[] = [
  {
    slug: "ramen-ame",
    name: "らーめん 雨",
    area: "虎ノ門",
    address: "東京都港区虎ノ門1-2-3 虎ノ門プレイス 1F",
    price: "ランチ ¥1,000〜1,500",
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
        spend: 1200,
        title: "午後も眠くならない味",
        body: "スープが軽めで胃もたれしない。回転早いので短時間ランチに最適。",
        tags: ["ラーメン", "回転速い", "一人向け"],
      },
      {
        author: "鈴木",
        date: "2026/01/24",
        rating: 4.0,
        spend: 1100,
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
    address: "東京都港区新橋3-12-5 港南ビル 2F",
    price: "ディナー ¥4,000〜6,000",
    rating: 3.8,
    tags: ["洋食", "会食", "予約推奨"],
    note: "肉料理が良い。席が広めで会話しやすい。",
    visited: "2026/01/28",
    mood: "会食・ゆっくり",
    recommend: "コースの肉料理が安定。時間に余裕を。",
    reviews: [
      {
        author: "田中",
        date: "2026/01/28",
        rating: 4.0,
        spend: 5200,
        title: "会食で安心",
        body: "席が広くて会話しやすい。接客も安定していた。",
        tags: ["会食", "予約推奨"],
      },
      {
        author: "小林",
        date: "2026/01/20",
        rating: 4.0,
        spend: 4800,
        title: "肉料理は良い",
        body: "味は良いが提供まで少し時間がかかった。",
        tags: ["時間に余裕"],
      },
      {
        author: "伊藤",
        date: "2026/01/18",
        rating: 4.0,
        spend: 5600,
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
    address: "東京都港区汐留2-4-1 汐留ガーデン 1F",
    price: "カフェ ¥800〜1,200",
    rating: 4.0,
    tags: ["カフェ", "作業可", "甘味"],
    note: "静かで打ち合わせにも使える。抹茶ラテが人気。",
    visited: "2026/01/30",
    mood: "作業・軽め",
    recommend: "窓際は電源あり。混む時間を避けると快適。",
    reviews: [
      {
        author: "山本",
        date: "2026/01/30",
        rating: 3.5,
        spend: 900,
        title: "打ち合わせ向き",
        body: "静かで話しやすい。電源席は早めに埋まる。",
        tags: ["作業可", "電源"],
      },
      {
        author: "高橋",
        date: "2026/01/22",
        rating: 4.0,
        spend: 980,
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
    address: "東京都港区虎ノ門4-1-9 虎ノ門スクエア 2F",
    price: "ランチ ¥1,100〜1,600",
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
        rating: 4.5,
        spend: 1350,
        title: "午後に効く定食",
        body: "脂が重くなくて午後も集中できた。",
        tags: ["ヘルシー", "定食"],
      },
      {
        author: "斎藤",
        date: "2026/01/29",
        rating: 4.0,
        spend: 1480,
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
