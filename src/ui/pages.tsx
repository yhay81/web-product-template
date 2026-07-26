import { product } from "../config/product";
import { Layout } from "./layout";

export function HomePage() {
  return (
    <Layout>
      <section class="hero">
        <p class="eyebrow">PUBLIC VALIDATION</p>
        <h1>役に立つかを、実利用で確かめる。</h1>
        <p class="lead">{product.description}</p>
        <div class="actions">
          <a class="button primary" href="#experiment">
            検証内容を見る
          </a>
          <a class="button secondary" href="/healthz">
            稼働状態
          </a>
        </div>
      </section>
      <section class="panel" id="experiment">
        <p class="eyebrow">CURRENT EXPERIMENT</p>
        <h2>成功条件を先に公開します。</h2>
        <dl class="metrics">
          <div>
            <dt>段階</dt>
            <dd>{product.experiment.stage}</dd>
          </div>
          <div>
            <dt>期限</dt>
            <dd>{product.experiment.deadline}</dd>
          </div>
          <div>
            <dt>成功条件</dt>
            <dd>{product.experiment.success}</dd>
          </div>
        </dl>
      </section>
    </Layout>
  );
}

export function PrivacyPage() {
  return (
    <Layout title={`プライバシー | ${product.name}`}>
      <article class="prose">
        <p class="eyebrow">PRIVACY</p>
        <h1>必要なデータだけを扱います。</h1>
        <p>
          この検証版は、サービス提供と品質改善に必要な最小限のデータだけを扱います。
          実際に収集する項目、保持期間、削除方法は公開前にこのページへ明記します。
        </p>
      </article>
    </Layout>
  );
}
