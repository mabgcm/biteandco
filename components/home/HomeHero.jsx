export default function HomeHero({ hero, orderHref }) {
  return (
    <section id="hero" className="shop-hero">
      <div className="shop-hero-copy">
        {hero.badge ? <span className="shop-badge">{hero.badge}</span> : null}
        <h1>{hero.headline}</h1>
        <div className="shop-hero-lines">
          {hero.lines.map(line => <p key={line}>{line}</p>)}
        </div>
        <a href={orderHref} className="shop-button shop-button-dark">{hero.ctaLabel}</a>
      </div>
      <div className="shop-hero-image">
        <img src={hero.image} alt={hero.alt} />
      </div>
    </section>
  );
}
