"use client";

import Link from "next/link";
import { use, useMemo, useState } from "react";

import {
  getPriceSummary,
  restaurants,
  tagOptions,
  type Review,
} from "../../_mock/restaurants";

const TAG_POPULARITY: Record<string, number> = Object.fromEntries(
  tagOptions.map((tag, index) => [tag, tagOptions.length - index])
);

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function RestaurantDetail({ params }: PageProps) {
  const { slug } = use(params);
  const restaurant = restaurants.find((r) => r.slug === slug);
  const displayRestaurant = restaurant ?? restaurants[0];

  const [reviews, setReviews] = useState(displayRestaurant.reviews);
  const [form, setForm] = useState({
    author: "",
    rating: "",
    spend: "",
    title: "",
    body: "",
    tags: [] as string[],
  });
  const [tagFilter, setTagFilter] = useState("");

  const priceSummary = useMemo(
    () => getPriceSummary({ ...displayRestaurant, reviews }),
    [displayRestaurant, reviews]
  );

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
        const scoreDiff = (TAG_POPULARITY[b] ?? 0) - (TAG_POPULARITY[a] ?? 0);
        if (scoreDiff !== 0) return scoreDiff;
        return a.localeCompare(b, "ja");
      });
    }

    return filtered;
  }, [tagFilter]);

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
    const spendValue = Number(form.spend);
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const date = `${yyyy}/${mm}/${dd}`;

    const newReview: Review = {
      author: form.author || "匿名",
      date,
      rating: Number.isNaN(ratingValue) ? 4.0 : ratingValue,
      spend:
        form.spend && !Number.isNaN(spendValue) ? Math.max(spendValue, 0) : undefined,
      title: form.title || "タイトル未入力",
      body: form.body || "コメントはあとで追加予定。",
      tags: form.tags.length > 0 ? form.tags : ["タグ未設定"],
    };

    setReviews((current) => [newReview, ...current]);
    setForm({ author: "", rating: "", spend: "", title: "", body: "", tags: [] });
  };

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
            ★ {displayRestaurant.rating}
          </span>
        </div>

        <header className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {displayRestaurant.area} ・ 価格帯 {priceSummary.label} ・ 最終訪問{" "}
                {displayRestaurant.visited}
              </p>
              {priceSummary.source === "reviews" && (
                <p className="mt-1 text-xs text-slate-400">
                  レビューの支払額（{priceSummary.count}件）から算出
                </p>
              )}
              <h1 className="mt-2 text-3xl font-semibold">
                {displayRestaurant.name}
              </h1>
            </div>
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-400 md:w-56">
              写真（任意）エリア
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">タグ</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {displayRestaurant.tags.map((tag) => (
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
              支払額（任意）
              <input
                type="number"
                value={form.spend}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    spend: event.target.value,
                  }))
                }
                placeholder="例: 1200"
                min={0}
                className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700"
              />
            </label>

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
                    {typeof review.spend === "number" && (
                      <p className="mt-1 text-xs text-slate-500">
                        支払額 ¥{review.spend.toLocaleString("ja-JP")}
                      </p>
                    )}
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

      </div>
    </main>
  );
}
