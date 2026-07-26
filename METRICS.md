# Metrics

## Product outcome

プロダクト固有の成功を測る。ページビューや登録数だけで成功としない。新しい追跡Cookieを足す前に、中核jobで自然に生じる業務データから集計できないか確認する。

各プロダクトは、公開前に次の5段階を具体的なDB状態へ割り当てる。

| Stage           | Meaning                        | Example                      |
| --------------- | ------------------------------ | ---------------------------- |
| `signed_up`     | 所有者が登録した               | Better Authのuser row        |
| `activated`     | 中核作業の器を作った           | アルバム、受信箱、募集を作成 |
| `value_created` | 他者へ渡せる価値を入れた       | 写真追加、公開、回答募集     |
| `job_completed` | 実利用者が中核jobを完了した    | 原本DL、投稿受信、日程確定   |
| `returned`      | 別の日または別案件で再利用した | 2件目作成、複数日受信        |

## Required ratios

- Activation: `activated / signed_up`
- Value creation: `value_created / activated`
- Completion: `job_completed / value_created`
- Return: `returned / job_completed`
- Seven-day new users and completed jobs

## Operator contract

- `npm run metrics`を用意し、本番集計をJSONで標準出力する。
- 出力は`generated_at`、`service`、`environment`、`funnel`、`rates`を持つ。
- メールアドレス、表示名、URL slug、本文、ファイル名、IP、個別IDを出力しない。
- 分母0の比率は0とし、失敗や欠測を成功扱いしない。
- サービス画面へ検証条件を載せない。判断条件は`EXPERIMENT.md`と公開Issue、操作画面は利用者のjobに集中させる。
- 生ログは公開しない。公開結果は集計し、少数セルや自由記述から個人を推測できないようにする。
