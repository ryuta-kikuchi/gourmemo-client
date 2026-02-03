"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";

type Review = {
  author: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  tags: string[];
};

type Restaurant = {
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

const restaurants: Restaurant[] = [
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

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function RestaurantDetail({ params }: PageProps) {
  const { slug } = use(params);
  const restaurant = restaurants.find((r) => r.slug === slug);

  if (!restaurant) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-slate-50 text-slate-900">
        <div className="mx-auto w-full max-w-3xl px-6 py-16">
          <p className="text-sm text-slate-500">該当する店舗が見つかりません。</p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
          >
            一覧に戻る
          </Link>
        </div>
      </main>
    );
  }

  const [reviews, setReviews] = useState(restaurant.reviews);
  const [form, setForm] = useState({
    author: "",
    rating: "",
    title: "",
    body: "",
    tags: [] as string[],
  });
  const [tagFilter, setTagFilter] = useState("");

  const tagOptions = [
    "ひとり",
    "会食",
    "作業可",
    "回転速い",
    "行列少なめ",
    "コスパ",
    "和食",
    "洋食",
    "カフェ",
    "ヘルシー",
  ];

  const tagPopularity: Record<string, number> = {
    ひとり: 10,
    コスパ: 9,
    回転速い: 8,
    行列少なめ: 7,
    作業可: 6,
    会食: 5,
    和食: 4,
    洋食: 3,
    カフェ: 2,
    ヘルシー: 1,
  };

  const normalizeText = (value: string) =>
    value
      .normalize("NFKC")
      .replace(/[\u30a1-\u30f6]/g, (char) =>
        String.fromCharCode(char.charCodeAt(0) - 0x60)
      );

  const filteredTags = useMemo(() => {
    const trimmed = tagFilter.trim();
    const normalizedFilter = normalizeText(trimmed);
    const filtered = tagOptions.filter((tag) =>
      normalizedFilter
        ? normalizeText(tag).includes(normalizedFilter)
        : true
    );

    if (!normalizedFilter) {
      return [...filtered].sort((a, b) => {
        const scoreDiff = (tagPopularity[b] ?? 0) - (tagPopularity[a] ?? 0);
        if (scoreDiff !== 0) return scoreDiff;
        return a.localeCompare(b, "ja");
      });
    }

    return filtered;
  }, [tagFilter, tagOptions]);

  const reviewCount = reviews.length;

  const averageRating = useMemo(() => {
    if (reviewCount === 0) return "0.0";
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviewCount).toFixed(1);
  }, [reviewCount, reviews]);

  const sortedReviews = useMemo(
    () =>
      [...reviews].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [reviews]
  );

  const buckets = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    const rounded = Math.floor(review.rating) as keyof typeof buckets;
    const key = Math.min(5, Math.max(1, rounded)) as keyof typeof buckets;
    buckets[key] += 1;
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.rating) {
      return;
    }

    const ratingValue = Number(form.rating);
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const date = `${yyyy}/${mm}/${dd}`;

    const newReview: Review = {
      author: form.author || "匿名",
      date,
      rating: Number.isNaN(ratingValue) ? 4.0 : ratingValue,
      title: form.title || "タイトル未入力",
      body: form.body || "コメントはあとで追加予定。",
      tags: form.tags.length > 0 ? form.tags : ["タグ未設定"],
    };

    setReviews((current) => [newReview, ...current]);
    setForm({ author: "", rating: "", title: "", body: "", tags: [] });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
          >
            ← 一覧に戻る
          </Link>
          <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
            ★ {restaurant.rating}
          </span>
        </div>

        <header className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {restaurant.area} ・ {restaurant.price} ・ 最終訪問{" "}
                {restaurant.visited}
              </p>
              <h1 className="mt-2 text-3xl font-semibold">{restaurant.name}</h1>
            </div>
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-400 md:w-56">
              写真（任意）エリア
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">用途の雰囲気</p>
            <p className="mt-2 text-lg font-semibold">{restaurant.mood}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">おすすめポイント</p>
            <p className="mt-2 text-sm text-slate-700">{restaurant.recommend}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">タグ</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {restaurant.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">レビュー投稿（モック）</h2>
          <p className="mt-2 text-sm text-slate-500">
            入力して送信すると、この場でレビュー一覧に追加されます。
          </p>
          <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-slate-600">
                投稿者
                <input
                  type="text"
                  value={form.author}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      author: event.target.value,
                    }))
                  }
                  placeholder="例: 山田"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-600">
                評価
                <select
                  value={form.rating}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      rating: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700"
                  required
                >
                  <option value="" disabled>
                    評価を選ぶ
                  </option>
                  <option value="5.0">5.0</option>
                  <option value="4.5">4.5</option>
                  <option value="4.0">4.0</option>
                  <option value="3.5">3.5</option>
                  <option value="3.0">3.0</option>
                  <option value="2.5">2.5</option>
                  <option value="2.0">2.0</option>
                  <option value="1.5">1.5</option>
                  <option value="1.0">1.0</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-slate-600">
              タイトル
              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                placeholder="例: 並ばず入れた"
                className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-slate-600">
              コメント
              <textarea
                value={form.body}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    body: event.target.value,
                  }))
                }
                placeholder="例: 回転が早くて短時間ランチに良い。"
                rows={4}
                className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-slate-600">
              タグ（選択）
              <input
                type="text"
                value={tagFilter}
                onChange={(event) => setTagFilter(event.target.value)}
                placeholder="タグを絞り込み"
                className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700"
              />
              <div className="flex flex-wrap gap-2">
                {filteredTags.map((tag) => {
                  const isSelected = form.tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          tags: isSelected
                            ? current.tags.filter((t) => t !== tag)
                            : [...current.tags, tag],
                        }))
                      }
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        isSelected
                          ? "border-amber-300 bg-amber-100 text-amber-900"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
              >
                投稿する
              </button>
            </div>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">レビュー</h2>
              <p className="text-sm text-slate-500">
                {reviewCount}件のレビュー / 平均 {averageRating}
              </p>
            </div>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
              新しい順
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">
                評価の分布（仮）
              </p>
              <div className="mt-3 flex flex-col gap-2 text-xs text-slate-500">
                {[5, 4, 3, 2, 1].map((score) => {
                  const count = buckets[score as keyof typeof buckets];
                  const percentage = reviewCount
                    ? Math.round((count / reviewCount) * 100)
                    : 0;
                  return (
                    <div key={score} className="flex items-center gap-2">
                      <span className="w-8 text-right">{score}★</span>
                      <div className="h-2 flex-1 rounded-full bg-white">
                        <div
                          className="h-2 rounded-full bg-amber-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-10 text-right">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-400">
              集計コメント欄（例:「ランチ利用が多い」など）
            </div>
          </div>

          <div className="mt-4 grid gap-4">
            {sortedReviews.map((review) => (
              <article
                key={`${review.author}-${review.date}`}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      {review.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {review.author} ・ {review.date}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                    ★ {review.rating}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-700">{review.body}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">このお店を使うとき</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
              仕事の合間にさっと行ける
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
              同僚を連れて行きやすい
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
