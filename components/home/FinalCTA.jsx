export default function FinalCTA({ content, orderHref }) {
  return (
    <section className="shop-final-cta">
      <h2>{content.headline}</h2>
      <a href={orderHref} className="shop-button shop-button-light">{content.ctaLabel}</a>
    </section>
  );
}
