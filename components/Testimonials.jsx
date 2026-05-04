import { useEffect, useState } from 'react';
import testimonialsData from '../data/testimonials.json';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { section, items: testimonials } = testimonialsData;
  const goToPrevious = () => {
    setActiveIndex((currentIndex) => (
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    ));
  };
  const goToNext = () => {
    setActiveIndex((currentIndex) => (
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
    ));
  };

  useEffect(() => {
    const autoSlideTimer = setInterval(goToNext, 5000);

    return () => clearInterval(autoSlideTimer);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="testimonials section light-background">
      <div className="container section-title">
        <h2>{section.eyebrow}</h2>
        <p>{section.title} <span className="description-title">{section.highlight}</span></p>
      </div>
      <div className="container">
        <div className="swiper init-swiper">
          <div className="testimonials-slider-viewport">
            <div
              className="swiper-wrapper testimonials-slider-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div className="swiper-slide testimonials-slide" key={`${testimonial.name}-${testimonial.date}`}>
                  <div className="testimonial-item">
                    <div className="row gy-4 justify-content-center">
                      <div className="col-lg-8">
                        <div className="testimonial-content">
                          {testimonial.text ? (
                            <p>
                              <i className="bi bi-quote quote-icon-left"></i>
                              <span>{testimonial.text}</span>
                              <i className="bi bi-quote quote-icon-right"></i>
                            </p>
                          ) : null}
                          <div className="testimonial-author">
                            <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" className="testimonial-img" alt={`${testimonial.name} testimonial avatar`} loading="lazy" />
                            <div>
                              <h3>{testimonial.name}</h3>
                              <h4>{testimonial.date}</h4>
                            </div>
                          </div>
                          <div className="stars">
                            {Array.from({ length: testimonial.rating }).map((_, index) => (
                              <i className="bi bi-star-fill" key={index}></i>
                            ))}
                          </div>
                          {testimonial.notable?.length ? (
                            <div className="testimonial-notable">
                              Notable: {testimonial.notable.join(' · ')}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="testimonial-controls">
            <button type="button" className="testimonial-control" aria-label="Show previous review" onClick={goToPrevious}>
              <i className="bi bi-chevron-left"></i>
            </button>
            <button type="button" className="testimonial-control" aria-label="Show next review" onClick={goToNext}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
          <div className="swiper-pagination">
            {testimonials.map((item, index) => (
              <span
                key={item.name}
                className={`swiper-pagination-bullet ${index === activeIndex ? 'swiper-pagination-bullet-active' : ''}`}
                role="button"
                tabIndex="0"
                aria-label={`Show ${item.name} review`}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') setActiveIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
        <a href={section.ctaUrl} target="_blank" rel="noopener noreferrer" className="btn btn-danger btn-lg">
          {section.ctaLabel}
        </a>
      </div>
    </section>
  );
}
