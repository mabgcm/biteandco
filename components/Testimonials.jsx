import { useState } from 'react';

const testimonials = [
  {
    name: 'Teresita',
    role: 'Barrie Resident',
    text: 'Well...I just receive a very very delicious Tiramisu made by Tugce. I have to say: Is absolutely Yummy Yummy Yummy and I like it very very much. They were super punctual and deliver the cake at the exact time they told me. Our communication was good and clear during the whole process, the price is outstanding and the item description was the same as what I receive. I REALLY REALLY RECOMMEND BUYING FROM TUGCE.'
  },
  {
    name: 'Ali',
    role: 'Barrie Resident',
    text: 'It was really delicious. The dishes came warm. The rice meatballs were very good. I will definitely order again. Delivery was very fast. Thank you.'
  },
  {
    name: 'Deol',
    role: 'Barrie Resident',
    text: ''
  },
  {
    name: 'Mopeth',
    role: 'Barrie Resident',
    text: ''
  },
  {
    name: 'Mark',
    role: 'Barrie Resident',
    text: ''
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className="testimonials section light-background">
      <div className="container section-title">
        <h2>TESTIMONIALS</h2>
        <p>What Our Customers <span className="description-title">Say About Us</span></p>
      </div>
      <div className="container">
        <div className="swiper init-swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="testimonial-item">
                <div className="row gy-4 justify-content-center">
                  <div className="col-lg-6">
                    <div className="testimonial-content">
                      {testimonial.text ? (
                        <p>
                          <i className="bi bi-quote quote-icon-left"></i>
                          <span>{testimonial.text}</span>
                          <i className="bi bi-quote quote-icon-right"></i>
                        </p>
                      ) : null}
                      <h3>{testimonial.name}</h3>
                      <h4>{testimonial.role}</h4>
                      <div className="stars">
                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 text-center">
                    <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" className="img-fluid testimonial-img" alt={`${testimonial.name} testimonial avatar`} loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
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
        <a href="https://www.facebook.com/marketplace/profile/100004979716268/" target="_blank" rel="noopener noreferrer" className="btn btn-danger btn-lg">
          See More Reviews on Facebook
        </a>
      </div>
    </section>
  );
}
