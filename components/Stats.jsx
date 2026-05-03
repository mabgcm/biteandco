export default function Stats() {
  return (
    <section id="stats" className="stats section dark-background">
      <img src="/assets/img/stats-bg.jpg" alt="" />
      <div className="container position-relative">
        <div className="row gy-4">
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span className="with-plus">200</span>
              <p className="fs-5">Home Made Meals Prepared</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span className="with-percent">75</span>
              <p className="fs-5">Limited Home Kitchen</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span>1</span>
              <p className="fs-5">Day Advance Notice</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span>10</span>
              <p className="fs-5">Authentic Recipes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
