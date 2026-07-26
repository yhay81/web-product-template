# Web Product Starter

Cloudflare Workers、Hono、Hono JSX、Vite+を標準に、実利用で仮説を検証するWebプロダクトです。

## Product contract

実装前または公開前に、次をプロダクト固有の内容へ更新してください。

- `src/config/product.ts`: 名前、説明、検証段階、期限、成功条件
- `EXPERIMENT.md`: 対象利用者、比較方法、成功・失敗条件
- `PRIVACY.md`: 実際に保存するデータ、保持期間、削除経路
- `SECURITY.md`: 実装済み対策、未対応の制約、非公開連絡経路
- `STACK.md`: 共通選択から外した技術と、その根拠
- `wrangler.jsonc`: Worker名、互換日付、必要なBindings

## Local development

Node.js 24はfnmで管理し、Vite+によるランタイム管理は無効にします。

```powershell
vp env off
npm ci
npm run dev
```

## Quality gate

```powershell
npm run check
npm test
npm run build
```

## Deployment

CloudflareのBindingsと秘密値を確認し、同じ品質ゲートを通してから公開します。

```powershell
npm run deploy
```

初回deploy後は実URLで主要jobを最後まで通し、Worker startup、認証、永続化、削除を確認してください。request pathへ追加する依存は、Node.js専用の`require`や`fs`ではなくWorkers互換のuniversal ESM/Web API実装を選びます。

ユーザーデータ、秘密値、通報内容、productionログをGitへ保存しないでください。
