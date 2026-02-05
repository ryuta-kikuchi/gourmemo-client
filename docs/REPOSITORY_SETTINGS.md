# リポジトリ設定ガイド

このドキュメントは、このリポジトリの推奨設定を記載しています。

## ブランチ保護設定

`main` ブランチは保護される必要があります。以下の手順で設定してください。

### 設定方法

1. GitHubのリポジトリページで **Settings** を開く
2. 左メニューから **Branches** を選択
3. **Branch protection rules** セクションで **Add rule** をクリック
4. **Branch name pattern** に `main` を入力

### 推奨設定

#### 必須設定
以下の設定を有効にすることを強く推奨します：

- ✅ **Require a pull request before merging**
  - mainブランチへの直接pushを防ぎ、必ずPRを経由させる
  - ✅ **Require approvals**: 1人以上のレビュー承認を必須にする
  
- ✅ **Require status checks to pass before merging**
  - ✅ **Require branches to be up to date before merging**
  - ステータスチェック: `build` (GitHub Actions CI)
  
- ✅ **Do not allow bypassing the above settings**
  - 管理者も含めて、上記ルールを適用する

#### オプション設定
プロジェクトの方針に応じて検討してください：

- **Require conversation resolution before merging**
  - PRのコメントが全て解決済みになるまでマージを防ぐ
  
- **Require linear history**
  - マージコミットを禁止し、リニアなコミット履歴を維持する（squash mergeまたはrebase mergeのみ）
  
- **Require deployments to succeed before merging**
  - デプロイ環境（Vercel Previewなど）での動作確認を必須にする

### 設定後の確認

設定後は、以下のような状態になります：

- mainブランチへの直接pushができなくなる
- PRを作成し、レビュー承認とCIの通過が必要になる
- PRのマージボタンは条件が揃わないとクリックできない

## その他の推奨設定

### General Settings

- **Default branch**: `main`
- **Allow merge commits**: プロジェクトポリシーに応じて設定
- **Allow squash merging**: ✅ 推奨（コミット履歴を整理）
- **Allow rebase merging**: プロジェクトポリシーに応じて設定
- **Automatically delete head branches**: ✅ 推奨（マージ後にブランチを自動削除）

### Collaborators and teams

- 適切なアクセス権限を設定
  - Admin: リポジトリオーナー
  - Maintain または Write: 開発メンバー
  - Read: 参照のみ必要なメンバー

## 参考リンク

- [GitHub Docs: ブランチ保護ルールについて](https://docs.github.com/ja/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Docs: ブランチ保護ルールの管理](https://docs.github.com/ja/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)
