import { useEffect, useState } from 'react';

function getNextIndex(currentIndex, totalItems) {
  if (totalItems <= 1) return currentIndex;
  return (currentIndex + 1) % totalItems;
}

export default function HomeHero({ hero, orderHref, images = [] }) {
  const heroImages = images.length > 0 ? images : [{ src: hero.image, alt: hero.alt }];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = heroImages[activeImageIndex] || heroImages[0];

  useEffect(() => {
    if (heroImages.length <= 1) return undefined;

    const delay = 1000 + Math.random() * 1000;
    const timeoutId = window.setTimeout(() => {
      setActiveImageIndex(currentIndex => getNextIndex(currentIndex, heroImages.length));
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [activeImageIndex, heroImages.length]);

  return (
    <section id="hero" className="shop-hero">
      <div className="shop-hero-copy">
        {hero.badge ? <span className="shop-badge">{hero.badge}</span> : null}
        <h1>{hero.headline}</h1>
        <div className="shop-hero-lines">
          {hero.lines.map(line => <p key={line}>{line}</p>)}
        </div>
        <a href={orderHref} className="shop-button shop-button-red">{hero.ctaLabel}</a>
      </div>
      <div className="shop-hero-image">
        <img key={activeImage.src} src={activeImage.src} alt={activeImage.alt} />
      </div>
    </section>
  );
}
