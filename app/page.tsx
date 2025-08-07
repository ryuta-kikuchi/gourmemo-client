export default function Home() {
  const restaurants = [
    { name: "ラーメン太郎", rating: 4.5 },
    { name: "寿司花子", rating: 4.0 },
  ];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">レストラン一覧</h1>
      <ul>
        {restaurants.map((r, i) => (
          <li key={i} className="mb-2">
            <div className="text-lg font-semibold">{r.name}</div>
            <div>評価: {r.rating} ⭐</div>
          </li>
        ))}
      </ul>
    </main>
  );
}