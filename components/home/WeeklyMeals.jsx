export default function WeeklyMeals({ meals }) {
  return (
    <section id="weekly" className="shop-section shop-weekly">
      <div className="shop-section-heading shop-section-heading-row">
        <h2>This Week&apos;s Meals</h2>
        <a href="/weekly-menu" className="shop-text-link">View Full Menu</a>
      </div>
      <div className="shop-weekly-row" tabIndex="0" aria-label="This week's meals">
        {meals.map(meal => (
          <article className="shop-weekly-card" key={meal.id}>
            <a href="/weekly-menu" className="shop-weekly-link" aria-label={`View weekly menu for ${meal.name}`}>
              <span className="shop-weekly-image" aria-hidden="true">
                <img src={meal.photo || meal.image} alt="" loading="lazy" />
              </span>
              <span className="shop-weekly-body">
                {meal.day ? <span className="shop-weekly-day">{meal.day}</span> : null}
                <h3>{meal.name}</h3>
                <strong>${Number(meal.price).toFixed(2)}</strong>
                <span className="shop-order-link">Order <span aria-hidden="true">→</span></span>
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
