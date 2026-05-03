import { useEffect, useMemo, useState } from 'react';
import ImageLightbox from './ImageLightbox';
import contact from '../data/contact.json';
import weeklyMenu from '../data/weeklyMenu.json';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getNextWeekDates() {
  const today = new Date();
  const nextMonday = new Date(today);
  const day = today.getDay();
  const daysUntilNextMonday = ((8 - day) % 7) || 7;
  nextMonday.setDate(today.getDate() + daysUntilNextMonday);
  nextMonday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(nextMonday);
    date.setDate(nextMonday.getDate() + index);
    return date;
  });
}

function formatDate(date) {
  return date.toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric'
  });
}

function formatFullDate(date) {
  return date.toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

function formatList(value) {
  if (Array.isArray(value)) return value.join(', ');
  return value;
}

export default function WeeklyMealPlan() {
  const [quantities, setQuantities] = useState({});
  const [showError, setShowError] = useState(false);
  const [nextWeekDates, setNextWeekDates] = useState([]);

  const weeklyMealsByDay = useMemo(() => {
    return weeklyMenu.reduce((meals, item) => {
      if (!item.day) return meals;
      const day = item.day.trim();
      if (!meals[day]) meals[day] = [];
      meals[day].push(item);
      return meals;
    }, {});
  }, []);

  const totalMeals = Object.values(quantities).reduce((total, quantity) => total + quantity, 0);
  const dateRange = nextWeekDates.length > 0
    ? `${formatDate(nextWeekDates[0])} - ${formatDate(nextWeekDates[nextWeekDates.length - 1])}`
    : 'Next week';
  const selectedMeals = nextWeekDates
    .flatMap((date) => {
      const day = dayNames[date.getDay()];
      const meals = weeklyMealsByDay[day] || [];
      return meals.map(meal => ({
        day,
        meal,
        quantity: quantities[meal.id] || 0
      }));
    })
    .filter(item => item.meal && item.quantity > 0);
  const totalPrice = selectedMeals.reduce((total, item) => total + (item.quantity * Number(item.meal.price || 0)), 0);

  useEffect(() => {
    setNextWeekDates(getNextWeekDates());
  }, []);

  const updateQuantity = (mealId, value) => {
    setShowError(false);
    const quantity = Math.max(0, Number(value) || 0);
    setQuantities(currentQuantities => ({
      ...currentQuantities,
      [mealId]: quantity
    }));
  };

  const changeQuantity = (mealId, change) => {
    const currentQuantity = quantities[mealId] || 0;
    updateQuantity(mealId, currentQuantity + change);
  };

  const orderMessage = useMemo(() => {
    const mealLines = selectedMeals.map(item => `- ${item.day}: ${item.quantity} x ${item.meal.name} ($${Number(item.meal.price || 0).toFixed(2)} each)`);

    return [
      'Hi Bite & Co, I would like to request next week\'s meals:',
      ...mealLines,
      `Estimated total: $${totalPrice.toFixed(2)}`,
      '',
      'I understand this is a request only. Please confirm availability, schedule the order, and send payment details if accepted.'
    ].join('\n');
  }, [selectedMeals, totalPrice]);

  const orderRequestHref = `${contact.smsHref}?&body=${encodeURIComponent(orderMessage)}`;

  const handleOrder = () => {
    if (totalMeals === 0) {
      setShowError(true);
      return;
    }

    window.location.href = orderRequestHref;
  };

  return (
    <section id="weekly-meal-plan" className="weekly-shop menu section light-background">
      <div className="container section-title">
        <h2>Weekly Menu</h2>
        <p><span>Next Week&apos;s</span> <span className="description-title">Home Made Meals</span></p>
      </div>

      <div className="container">
        <div className="weekly-shop-header">
          <div>
            <p className="weekly-shop-eyebrow">One week calendar</p>
            <h3>Order the Menu of the Day</h3>
            <p className="weekly-shop-note">Select meals for next week only. Choose how many people you are ordering for each day.</p>
          </div>
          <div className="weekly-shop-range">
            <span>Next week</span>
            <strong>{dateRange}</strong>
          </div>
        </div>

        {totalMeals > 0 ? (
          <div className="weekly-shop-sticky-total" aria-live="polite">
            <div>
              <span>{totalMeals} meals selected</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <a href="#weekly-order-summary" className="btn btn-danger btn-sm">Review Order</a>
          </div>
        ) : null}

        <div className="weekly-shop-layout">
          <div className="weekly-shop-products" aria-label="Next week's menu">
            {nextWeekDates.map((date) => {
              const day = dayNames[date.getDay()];
              const meals = weeklyMealsByDay[day] || [];

              if (meals.length === 0) {
                return (
                  <article className="weekly-shop-card is-unavailable" key={day}>
                    <div className="weekly-shop-date">
                      <span>{day.slice(0, 3)}</span>
                      <strong>{formatDate(date)}</strong>
                    </div>

                    <div className="weekly-shop-image">
                      <i className="bi bi-calendar2-x" aria-hidden="true"></i>
                    </div>

                    <div className="weekly-shop-info">
                      <p className="weekly-shop-full-date">{formatFullDate(date)}</p>
                      <h4>Meal to be announced</h4>
                      <p>Contact us to confirm availability for this day.</p>
                      <div className="weekly-shop-meta">
                        <span>Weekly menu</span>
                      </div>
                    </div>

                    <div className="weekly-shop-actions">
                      <span className="weekly-shop-unavailable">Unavailable</span>
                    </div>
                  </article>
                );
              }

              return meals.map((meal, mealIndex) => {
                const quantity = quantities[meal.id] || 0;
                const price = Number(meal.price || 0);

                return (
                  <article className="weekly-shop-card" key={meal.id}>
                    <div className="weekly-shop-date">
                      <span>{mealIndex === 0 ? day.slice(0, 3) : 'Also'}</span>
                      <strong>{formatDate(date)}</strong>
                    </div>

                    <div className="weekly-shop-image">
                      {meal.photo ? (
                        <ImageLightbox
                          src={meal.photo}
                          alt={meal.alt || meal.name}
                          title={meal.englishName ? `${meal.name} (${meal.englishName})` : meal.name}
                          triggerClassName="weekly-shop-image-trigger"
                        />
                      ) : (
                        <i className="bi bi-card-image" aria-hidden="true"></i>
                      )}
                    </div>

                    <div className="weekly-shop-info">
                      <p className="weekly-shop-full-date">{formatFullDate(date)}</p>
                      <div className="weekly-shop-title">
                        <h4>{meal.englishName ? `${meal.name} (${meal.englishName})` : meal.name}</h4>
                        <button type="button" className="weekly-info-button" aria-label={`More details about ${meal.name}`}>
                          i
                          <span className="weekly-info-popup" role="tooltip">
                            {meal.englishName ? (
                              <span>
                                <strong>English name</strong>
                                <span>{meal.englishName}</span>
                              </span>
                            ) : null}
                            {meal.comesWith ? (
                              <span>
                                <strong>Comes with</strong>
                                <span>{formatList(meal.comesWith)}</span>
                              </span>
                            ) : null}
                            {meal.optional ? (
                              <span>
                                <strong>Optional</strong>
                                <span>{formatList(meal.optional)}</span>
                              </span>
                            ) : null}
                            {meal.ingredients ? (
                              <span>
                                <strong>Ingredients</strong>
                                <span>{formatList(meal.ingredients)}</span>
                              </span>
                            ) : null}
                            {meal.nutrition ? (
                              <span>
                                <strong>Nutrition</strong>
                                <span>
                                  {meal.nutrition.calories}
                                  {meal.nutrition.protein ? `, Protein: ${meal.nutrition.protein}` : ''}
                                  {meal.nutrition.carbs ? `, Carbs: ${meal.nutrition.carbs}` : ''}
                                  {meal.nutrition.fat ? `, Fat: ${meal.nutrition.fat}` : ''}
                                </span>
                              </span>
                            ) : null}
                          </span>
                        </button>
                      </div>
                      <p>{meal.description}</p>
                      {meal.comesWith ? <p className="weekly-shop-comes-with">Comes with: {formatList(meal.comesWith)}</p> : null}
                      <div className="weekly-shop-meta">
                        <span>${price.toFixed(2)}/person</span>
                        {quantity > 0 ? <strong>{quantity} selected</strong> : null}
                      </div>
                    </div>

                    <div className="weekly-shop-actions">
                      <label htmlFor={`weekly-${meal.id}`}>People</label>
                      <div className="weekly-quantity">
                        <button
                          type="button"
                          onClick={() => changeQuantity(meal.id, -1)}
                          disabled={quantity === 0}
                          aria-label={`Decrease people for ${meal.name}`}
                        >
                          -
                        </button>
                        <input
                          id={`weekly-${meal.id}`}
                          type="number"
                          min="0"
                          step="1"
                          value={quantity}
                          onChange={(event) => updateQuantity(meal.id, event.target.value)}
                          aria-label={`Number of people for ${meal.name}`}
                        />
                        <button
                          type="button"
                          onClick={() => changeQuantity(meal.id, 1)}
                          aria-label={`Increase people for ${meal.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                );
              });
            })}
          </div>

          <aside id="weekly-order-summary" className="weekly-shop-summary" aria-label="Order summary">
            <div className="weekly-shop-summary-inner">
              <p className="weekly-shop-eyebrow">Order summary</p>
              <h3>Your Week</h3>
              <div className="weekly-shop-summary-list">
                {selectedMeals.length > 0 ? selectedMeals.map(item => (
                  <div className="weekly-shop-summary-row" key={item.meal.id}>
                    <span>{item.day}</span>
                    <strong>{item.quantity} x {item.meal.name}</strong>
                  </div>
                )) : (
                  <p className="weekly-shop-empty">No meals selected yet.</p>
                )}
              </div>
              <div className="weekly-shop-total">
                <span>{totalMeals} meals</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
              <p className="weekly-shop-highlight">Free delivery in Barrie for orders over $70 in total.</p>
              <p className="weekly-shop-discount">Prices are set per dish in the weekly menu.</p>
              <p className="weekly-shop-limits">This is a request, not a confirmed order. We confirm availability first, then send payment details after accepting.</p>
              {showError ? <p className="text-danger mb-3">Please add at least one meal for one person.</p> : null}
              <button type="button" className="btn btn-danger btn-lg w-100" onClick={handleOrder}>
                Send Order Request
              </button>
              <a href={contact.messengerUrl} className="btn btn-outline-danger btn-lg w-100 mt-2" target="_blank" rel="noopener noreferrer">
                Message on Facebook
              </a>
              <p className="weekly-shop-limits">Limited home kitchen availability around Barrie and Simcoe. Orders are scheduled one week in advance.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
