export default function WeeklyMeals({ meals, onOrder }) {
  return (
    <section id="weekly" className="shop-section shop-weekly">
      <div className="shop-section-heading shop-section-heading-row">
        <h2>This Week&apos;s Meals</h2>
        <a href="/weekly-menu" className="shop-text-link">View Full Menu</a>
      </div>
      <div className="shop-weekly-row" tabIndex="0" aria-label="This week's meals">
        {meals.map(meal => (
          <article className="shop-weekly-card" key={meal.id}>
            <button type="button" className="shop-weekly-image" onClick={() => onOrder(meal)} aria-label={`View ${meal.name} details`}>
              <img src={meal.photo || meal.image} alt={meal.alt || meal.name} loading="lazy" />
            </button>
            <div>
              {meal.day ? <span>{meal.day}</span> : null}
              <h3>{meal.name}</h3>
              <strong>${Number(meal.price).toFixed(2)}</strong>
              <button type="button" className="shop-order-link" onClick={() => onOrder(meal)}>Order <span aria-hidden="true">→</span></button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
