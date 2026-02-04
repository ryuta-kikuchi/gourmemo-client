import Link from "next/link";

import { fields, filters, highlights, restaurants } from "./_mock/home";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm tracking-wide text-slate-500">
              社内向け 食レポ共有
            </p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight">
              GourMemo
            </h1>
          </div>
          <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <span className="text-sm text-slate-400">検索</span>
            <div className="h-3 w-px bg-slate-200" />
            <span className="text-sm text-slate-500">
              店名・エリア・用途で探す
            </span>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <span
              key={filter}
              className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-800"
            >
              {filter}
            </span>
          ))}
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {restaurants.map((r) => (
            <Link key={r.name} href={`/restaurants/${r.slug}`}>
              <article className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{r.name}</h2>
                    <p className="text-sm text-slate-500">
                      {r.area} ・ {r.price} ・ {r.visited}
                    </p>
                  </div>
                  <div className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
                    ★ {r.rating}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-700">{r.note}</p>
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-400">
                  写真（任意）エリア
                </div>
              </article>
            </Link>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">投稿テンプレ（仮）</h3>
          <p className="mt-2 text-sm text-slate-500">
            まだ要件未確定なので、まずは最低限の入力項目だけ仮置き。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {fields.map((field) => (
              <span
                key={field}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
              >
                {field}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
