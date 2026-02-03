## 使用技術

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Docker / Docker Compose

## 🚀 開発環境の立ち上げ

### 必要なもの

- Docker
- Docker Compose

### 手順

1. このリポジトリをクローン

```bash
git clone https://your-repo-url.git
cd your-repo-folder
```

2. 開発用コンテナを起動
```bash
docker compose up
```

3. ブラウザで確認
http://localhost:3000 にアクセス

### TIPS: AIエージェントを使った運用方法
#### 作業フロー
PR 駆動 + Preview Deploy のサイクルで開発を進める

1. Issue 作成
2. AI が実装して PR 作成
3. Vercel Preview で確認
4. PR コメントで修正指示
5. AI が追コミット
6. OKならマージ

#### 依頼文テンプレ
AI_DEV_GUIDE.md を確認の上、Issue #<番号> を実装してPRを作成してください。
PR本文に確認ポイントとPreview確認手順を書いてください。