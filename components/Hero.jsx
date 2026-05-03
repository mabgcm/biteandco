export default function Hero() {
  return (
    <section id="hero" className="hero section light-background">
      <div className="container">
        <div className="row gy-4 justify-content-center justify-content-lg-between align-items-center">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
            <h1 className="hero-title">
              Homemade Meals in Barrie &amp; Simcoe from
              <br className="d-block d-lg-none" />
              <span className="hero-brand">Bite &amp; Co</span>
            </h1>
            <p className="hero-copy mt-3">
              100% home made Turkish meals, desserts, bakery items, and halal dishes. Serving around Barrie and Simcoe with limited home-kitchen availability.
            </p>
            <div className="d-flex justify-content-center justify-content-lg-start">
              <a href="sms:14372196444" className="btn btn-danger btn-lg">Contact to Order</a>
            </div>
          </div>
          <div className="col-lg-5 order-1 order-lg-2 hero-img">
            <img src="/assets/img/menu/tiramisu.png" className="img-fluid animated" alt="Homemade tiramisu from Bite & Co" />
          </div>
        </div>
      </div>
    </section>
  );
}
