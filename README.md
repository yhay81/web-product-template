# Web Product Starter

Cloudflare Workers、Hono、Hono JSX、Vite+を標準に、実利用で仮説を検証するための公開Webプロダクトテンプレートです。

## Principles

- 元のユーザーjobを、このサービスだけで完了できる入口を作る。
- 成功条件、失敗条件、期限を実装前に決める。
- 認証、永続化、アップロード、非同期処理は必要な場合だけ追加する。
- request pathの依存は、Cloudflare Workersで動くuniversal ESM/Web API実装を選ぶ。
- ユーザーデータ、秘密値、通報内容をGitへ保存しない。
- 正規URLは`https://<product-slug>.yhay81.com`とし、WranglerのCustom Domain設定を配信構成の正本にする。
- 認証cookieは各サービスのhostだけへ限定し、`.yhay81.com`全体で共有しない。
- ファーストビューには説明用ヒーローではなく、実際の入力・編集・結果画面を置く。
- 検証条件や運営上の判断材料はリポジトリへ置き、サービス画面へ表示しない。
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

GitHubではこのリポジトリをTemplate repositoryとして設定し、各プロダクトを独立リポジトリとして生成します。生成後は`src/config/product.ts`、`EXPERIMENT.md`、`PRIVACY.md`、`METRICS.md`を対象プロダクト向けに更新してください。サービス画面は利用者のjobと操作イメージに集中させ、検証条件や運営上の判断材料はリポジトリ側へ分離します。

ローカルでは安全なコピー生成スクリプトを使えます。既存ディレクトリは上書きしません。
生成先へファクトリー専用の`scripts/`と`templates/`はコピーせず、プロダクト向けREADMEへ差し替えます。IndexNowの所有確認キーは生成先ごとに新しく作られます。

```powershell
.\scripts\new-product.ps1 `
  -Slug "creator-inbox" `
  -Name "Creator Inbox" `
  -Description "創作者が、匿名の感想・お題・質問を安心して受け取れる受信箱。" `
  -Headline "匿名の声を、ひとつの受信箱へ。"
```

## Deployment

`wrangler.jsonc`の名前、`<product-slug>.yhay81.com`のCustom Domain、互換日付、必要なBindingsを確認してから、CIと同じ検査を通します。新規サービスは`workers.dev`を公開面にせず、正規サブドメインだけを配信します。

```powershell
npm run release:check
npm run deploy
npm run indexnow
```

本番公開前に、Cloudflareアカウント、データ保持、削除経路、通報窓口を確認します。初回deploy後は実URLで主要jobを完了し、所有確認ファイルとサイトマップを本番URLで確認してからIndexNowへ通知します。依存ライブラリのWorkers実行互換性も確認します。選択基準は[STACK.md](./STACK.md)を参照してください。
