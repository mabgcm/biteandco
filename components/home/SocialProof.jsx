import { useEffect, useRef } from 'react';
import testimonialsData from '../../data/testimonials.json';

export default function SocialProof() {
  const sliderRef = useRef(null);
  const { section, items: testimonials } = testimonialsData;

  const slide = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector('.shop-testimonial-card');
    const distance = card ? card.offsetWidth + 16 : 320;
    const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 8;
    const atStart = slider.scrollLeft <= 8;

    if (direction > 0 && atEnd) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    if (direction < 0 && atStart) {
      slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
      return;
    }

    slider.scrollBy({ left: distance * direction, behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = window.setInterval(() => slide(1), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="shop-social-proof" aria-labelledby="shop-reviews-title">
      <div className="shop-section-heading shop-reviews-heading">
        <div>
          <span>{section.eyebrow}</span>
          <h2 id="shop-reviews-title">{section.title} {section.highlight}</h2>
        </div>
        <div className="shop-review-controls" aria-label="Review slider controls">
          <button type="button" onClick={() => slide(-1)} aria-label="Show previous reviews">
            <i className="bi bi-chevron-left" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => slide(1)} aria-label="Show next reviews">
            <i className="bi bi-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="shop-testimonial-slider" ref={sliderRef} tabIndex="0" aria-label="Customer reviews">
        {testimonials.map(testimonial => (
          <article className="shop-testimonial-card" key={`${testimonial.name}-${testimonial.date}`}>
            <div className="shop-testimonial-stars" aria-label={`${testimonial.rating} star review`}>
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <i className="bi bi-star-fill" key={index} aria-hidden="true" />
              ))}
            </div>
            {testimonial.text ? (
              <p>&quot;{testimonial.text}&quot;</p>
            ) : (
              <p>&quot;Fresh and delicious.&quot;</p>
            )}
            {testimonial.notable?.length ? (
              <div className="shop-testimonial-tags">
                {testimonial.notable.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}
              </div>
            ) : null}
            <footer>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.date}</span>
            </footer>
          </article>
        ))}
      </div>

      <div className="shop-reviews-cta">
        <a href={section.ctaUrl} target="_blank" rel="noopener noreferrer" className="shop-button shop-button-dark">
          {section.ctaLabel}
        </a>
      </div>
    </section>
  );
}
