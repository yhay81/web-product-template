# Metrics

## Product outcome

プロダクト固有の成功を測る。ページビューや登録数だけで成功としない。

| Event                | Meaning                          | Personal data |
| -------------------- | -------------------------------- | ------------- |
| `job_started`        | 利用者が中核作業を開始した       | No            |
| `job_completed`      | 利用者が中核作業を完了した       | No            |
| `return_visit`       | 同じ匿名化主体が再利用した       | Pseudonymous  |
| `feedback_submitted` | 任意の検証フィードバックを送った | Optional      |

## Required ratios

- Completion rate: `job_completed / job_started`
- Activation rate:
- Retention:
- Migration intent:
- Willingness to pay:

生ログは公開しない。公開する検証結果は集計し、少数セルや自由記述から個人を推測できないようにする。
