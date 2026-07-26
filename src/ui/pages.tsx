import { product } from "../config/product";
import { Layout } from "./layout";

export function HomePage() {
  return (
    <Layout>
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">{product.name}</p>
          <h1>{product.headline}</h1>
          <p class="lead">{product.description}</p>
          <div class="actions">
            <a class="button primary" href="#product">
              はじめる
            </a>
            <a class="button secondary" href="/privacy">
              プライバシー
            </a>
          </div>
        </div>
        <div class="product-preview" aria-label="サービスの操作イメージ" id="product">
          <div class="preview-window">
            <div class="preview-bar">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="preview-body">
              <aside aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </aside>
              <div class="preview-content" aria-hidden="true">
                <span class="preview-title"></span>
                <span class="preview-line"></span>
                <div class="preview-cards">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span class="preview-action"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="product-flow" aria-label="使い方">
        <article>
          <span>1</span>
          <div>
            <h2>始める</h2>
            <p>最初の入力を迷わせない。</p>
          </div>
        </article>
        <article>
          <span>2</span>
          <div>
            <h2>完了する</h2>
            <p>中核の仕事をここで終える。</p>
          </div>
        </article>
        <article>
          <span>3</span>
          <div>
            <h2>結果を受け取る</h2>
            <p>次に必要な状態が残る。</p>
          </div>
        </article>
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
          サービス提供と品質改善に必要な最小限のデータだけを扱います。
          収集する項目、保持期間、削除方法をこのページへ明記します。
        </p>
      </article>
    </Layout>
  );
}
