# Web Product Starter

Cloudflare Workers、Hono、Hono JSX、Vite+を標準に、実利用で仮説を検証するための公開Webプロダクトテンプレートです。

## Principles

- 元のユーザーjobを、このサービスだけで完了できる入口を作る。
- 成功条件、失敗条件、期限を実装前に決める。
- 認証、永続化、アップロード、非同期処理は必要な場合だけ追加する。
- request pathの依存は、Cloudflare Workersで動くuniversal ESM/Web API実装を選ぶ。
- ユーザーデータ、秘密値、通報内容をGitへ保存しない。
- 30日以内に継続、変更、停止を判断する。

## Local development

Node.jsはfnmで管理し、Vite+によるランタイム管理は無効にします。

```powershell
vp env off
vp install
vp dev
```

`vp`をまだ導入していない環境では、固定済みのnpm scriptsも使えます。

```powershell
npm ci
npm run check
npm test
npm run build
```

## Create a product

GitHubではこのリポジトリをTemplate repositoryとして設定し、各プロダクトを独立リポジトリとして生成します。生成後は`src/config/product.ts`、`EXPERIMENT.md`、`PRIVACY.md`を対象プロダクト向けに更新してください。

ローカルでは安全なコピー生成スクリプトを使えます。既存ディレクトリは上書きしません。
生成先へファクトリー専用の`scripts/`と`templates/`はコピーせず、プロダクト向けREADMEへ差し替えます。

```powershell
.\scripts\new-product.ps1 `
  -Slug "creator-inbox" `
  -Name "Creator Inbox" `
  -Description "創作者が、お題・感想・質問を安心して受け取るための公開検証。"
```

## Deployment

`wrangler.jsonc`の名前、互換日付、必要なBindingsを確認してから、CIと同じ検査を通します。

```powershell
npm run deploy
```

本番公開前に、Cloudflareアカウント、データ保持、削除経路、通報窓口を確認します。初回deploy後は実URLで主要jobを完了し、依存ライブラリのWorkers実行互換性も確認します。選択基準は[STACK.md](./STACK.md)を参照してください。
