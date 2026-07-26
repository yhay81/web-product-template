import { product } from "../config/product";
import { Layout } from "./layout";

export function HomePage() {
  return (
    <Layout>
      <section class="product-shell" id="product">
        <header class="product-heading">
          <div>
            <p class="eyebrow">{product.name}</p>
            <h1>{product.headline}</h1>
          </div>
          <p class="product-summary">{product.description}</p>
        </header>
        <div class="product-workspace" data-template-surface="replace-before-release">
          <form class="tool-panel">
            <div class="panel-heading">
              <h2>入力</h2>
              <span>未保存</span>
            </div>
            <label class="field">
              <span>内容</span>
              <textarea placeholder="ここに入力" rows={7}></textarea>
            </label>
            <fieldset>
              <legend>仕上がり</legend>
              <div class="choice-row">
                <label>
                  <input checked name="style" type="radio" />
                  <span>標準</span>
                </label>
                <label>
                  <input name="style" type="radio" />
                  <span>簡潔</span>
                </label>
              </div>
            </fieldset>
            <button class="button primary" type="button">
              作成する
            </button>
          </form>
          <section class="output-panel" aria-label="結果">
            <div class="panel-heading">
              <h2>プレビュー</h2>
              <span>自動更新</span>
            </div>
            <div class="output-canvas" aria-hidden="true">
              <div class="output-card">
                <span class="output-kicker"></span>
                <span class="output-title"></span>
                <span class="output-line"></span>
                <span class="output-line short"></span>
                <div class="output-grid">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </section>
        </div>
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
