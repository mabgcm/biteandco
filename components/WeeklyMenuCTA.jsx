export default function WeeklyMenuCTA() {
  return (
    <section id="weekly-menu" className="menu section light-background">
      <div className="container section-title">
        <h2>Weekly Menu</h2>
        <p><span>Upcoming</span> <span className="description-title">Home Made Meals</span></p>
      </div>
      <div className="container">
        <div className="tab-content">
          <div className="tab-pane fade active show">
            <div className="tab-header text-center">
              <p>Schedule</p>
              <h3>Plan Ahead</h3>
            </div>
            <div className="text-center">
              <p className="fs-4">
                Order the upcoming menu of the day for one or more people. We serve around Barrie and Simcoe with limited home-kitchen availability.
              </p>
              <a href="/weekly-menu" className="btn btn-danger btn-lg">Order Weekly Meals</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
