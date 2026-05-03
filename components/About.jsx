export default function About() {
  return (
    <>
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>About Us</h2>
            <p className="fs-4" style={{ fontSize: '1.1rem' }}>Home made dishes, prepared with love and care for customers around Barrie and Simcoe.</p>
          </div>
          <div className="row gy-4">
            <div className="col-lg-6 position-relative about-img" style={{ backgroundImage: 'url(/assets/img/about.jpg)' }}>
              <div className="overlay-text">
                <h2 className="text-white">Contact to Order</h2>
                <p className="fs-4">Please contact us at least one day before your preferred date.</p>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <div className="content ps-0 ps-lg-5">
                <p className="fs-5">
                  At <strong>Bite &amp; Co</strong>, we believe in real food, made the way we serve our own family. Every dish is 100% home made in our home kitchen, using authentic recipes and mostly organic the best ingredients. We never compromise on quality, so we keep our capacity limited.
                </p>
                <p className="fs-5">
                  All our dishes are made only when you order, so you get them fresh from our oven, never reheated or pre-made. We serve around Barrie and Simcoe, and we take orders at least one day in advance. Availability is not always guaranteed, but we can work with you to set up a date.
                </p>
                <ul className="fs-5">
                  <li><i className="bi bi-check2-all"></i> 100% home made and authentic</li>
                  <li><i className="bi bi-check2-all"></i> Made to order, never pre-cooked</li>
                  <li><i className="bi bi-check2-all"></i> Serving around Barrie and Simcoe only</li>
                  <li><i className="bi bi-check2-all"></i> Limited home-kitchen availability</li>
                  <li><i className="bi bi-check2-all"></i> Please contact us at least one day before</li>
                  <li><i className="bi bi-check2-all"></i> Delivery fee is not included in menu prices</li>
                </ul>
                <p className="fs-4">
                  Taste the difference of real, home made food. Contact us to schedule your order date.
                </p>
                <a href="#menu" className="btn btn-danger btn-lg">See Our Menu</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="why-us section light-background">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4">
              <div className="why-box">
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>Why Choose Bite &amp; Co?</h3>
                <p className="fs-5">Because you deserve food made with the same care we give our own family, prepared in limited batches from our home kitchen.</p>
                <div className="text-center">
                  <a href="#about" className="more-btn"><span>Learn More</span> <i className="bi bi-chevron-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-8 d-flex align-items-stretch">
              <div className="row gy-4">
                <div className="col-xl-4">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-emoji-smile"></i>
                    <h4>Truly Home Made</h4>
                    <p className="fs-5">Every dish is prepared in our home kitchen, so availability is limited by what we can make well.</p>
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-lightning-charge"></i>
                    <h4>Fresh &amp; Scheduled</h4>
                    <p className="fs-5">We ask for orders at least one day before and can help set up a date that works.</p>
                  </div>
                </div>
                <div className="col-xl-4">
                  <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i className="bi bi-stars"></i>
                    <h4>Local Service Area</h4>
                    <p className="fs-5">We currently serve only around Barrie and the Simcoe area. Delivery fee is separate.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
