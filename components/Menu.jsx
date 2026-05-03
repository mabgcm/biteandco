import { useEffect, useMemo, useState } from 'react';
import ImageLightbox from './ImageLightbox';
import contact from '../data/contact.json';
import menuItems from '../data/menu.json';

const categories = [
  { id: 'main', label: 'Main Dishes' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'bakery', label: 'Bakery' },
  { id: 'snacks', label: 'Snacks' }
];

const timeSlots = [
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM'
];

function parsePrice(priceLine) {
  const match = priceLine.match(/\$([\d.]+)/);
  return match ? Number(match[1]) : 0;
}

function getDateInputValue(daysFromToday) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  date.setHours(0, 0, 0, 0);
  return date.toISOString().slice(0, 10);
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('main');
  const [quantities, setQuantities] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [earliestDate, setEarliestDate] = useState('');
  const [requestedDate, setRequestedDate] = useState('');
  const [requestedTime, setRequestedTime] = useState('');

  const activeCategoryLabel = categories.find(category => category.id === activeCategory)?.label || 'Menu';
  const itemsByCategory = useMemo(() => {
    return categories.reduce((groups, category) => {
      groups[category.id] = menuItems.filter(item => item.category === category.id);
      return groups;
    }, {});
  }, []);
  const selectedItems = useMemo(() => {
    return menuItems
      .map((item) => {
        const quantity = quantities[item.id] || 0;
        const optionIndex = selectedOptions[item.id] || 0;
        const priceLine = item.priceDisplay[optionIndex] || item.priceDisplay[0];
        return {
          item,
          quantity,
          priceLine,
          unitPrice: parsePrice(priceLine)
        };
      })
      .filter(selection => selection.quantity > 0);
  }, [quantities, selectedOptions]);
  const totalItems = selectedItems.reduce((total, selection) => total + selection.quantity, 0);
  const totalPrice = selectedItems.reduce((total, selection) => total + (selection.quantity * selection.unitPrice), 0);

  useEffect(() => {
    setEarliestDate(getDateInputValue(2));
  }, []);

  const updateQuantity = (itemId, value) => {
    setErrorMessage('');
    const quantity = Math.max(0, Number(value) || 0);
    setQuantities(currentQuantities => ({
      ...currentQuantities,
      [itemId]: quantity
    }));
  };

  const changeQuantity = (itemId, change) => {
    const currentQuantity = quantities[itemId] || 0;
    updateQuantity(itemId, currentQuantity + change);
  };

  const updateOption = (itemId, optionIndex) => {
    setSelectedOptions(currentOptions => ({
      ...currentOptions,
      [itemId]: Number(optionIndex)
    }));
  };

  const orderMessage = useMemo(() => {
    const itemLines = selectedItems.map(selection => (
      `- ${selection.quantity} x ${selection.item.name} (${selection.priceLine})`
    ));

    return [
      'Hi Bite & Co, I would like to request these regular menu items:',
      ...itemLines,
      `Requested date/time: ${requestedDate} at ${requestedTime}`,
      `Estimated total: $${totalPrice.toFixed(2)}`,
      '',
      'I understand this is a request only. Please confirm availability, schedule the order, and send payment details if accepted.'
    ].join('\n');
  }, [requestedDate, requestedTime, selectedItems, totalPrice]);

  const orderRequestHref = `${contact.smsHref}?&body=${encodeURIComponent(orderMessage)}`;

  const handleOrder = () => {
    if (totalItems === 0) {
      setErrorMessage('Please add at least one menu item.');
      return;
    }

    if (!requestedDate || !requestedTime) {
      setErrorMessage('Please choose a date and time for your request.');
      return;
    }

    window.location.href = orderRequestHref;
  };

  return (
    <section id="menu" className="menu section">
      <div className="container section-title">
        <h2>Our Menu</h2>
        <p><span>Our</span> <span className="description-title">Home Made Dishes</span></p>
      </div>
      <div className="container">
        <ul className="nav nav-tabs d-flex justify-content-center">
          {categories.map(category => (
            <li className="nav-item" key={category.id}>
              <a
                href={`#menu-${category.id}`}
                className={`nav-link ${activeCategory === category.id ? 'active show' : ''}`}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveCategory(category.id);
                }}
              >
                <h4>{category.label}</h4>
              </a>
            </li>
          ))}
        </ul>

        {totalItems > 0 ? (
          <div className="weekly-shop-sticky-total menu-order-sticky-total" aria-live="polite">
            <div>
              <span>{totalItems} menu selections</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <a href="#regular-menu-order-summary" className="btn btn-danger btn-sm">Review Order</a>
          </div>
        ) : null}

        <div className="tab-content">
          {categories.map(category => (
            <div
              className={`tab-pane fade ${activeCategory === category.id ? 'active show' : ''}`}
              id={`menu-${category.id}`}
              key={category.id}
            >
              {activeCategory === category.id && (
                <>
                  <div className="tab-header text-center">
                    <p>Menu</p>
                    <h3>{activeCategoryLabel}</h3>
                  </div>
                  <div className="row gy-5">
                    {itemsByCategory[category.id].map(item => (
                      <div className="col-lg-4 menu-item" key={item.id}>
                        <ImageLightbox
                          src={item.image}
                          alt={item.alt || item.name}
                          title={item.name}
                          triggerClassName="menu-image-button"
                          imageClassName="menu-img img-fluid"
                        />
                        <h4>{item.name}</h4>
                        <p className="ingredients">{item.ingredients.join(', ')}</p>
                        {item.description ? <p>{item.description}</p> : null}
                        <p className="price">
                          {item.priceDisplay.map((priceLine, index) => (
                            <span key={priceLine}>
                              {index > 0 ? <br /> : null}
                              {priceLine}
                            </span>
                          ))}
                        </p>
                        <div className="menu-order-controls">
                          <label htmlFor={`menu-option-${item.id}`}>Choose size</label>
                          <select
                            id={`menu-option-${item.id}`}
                            value={selectedOptions[item.id] || 0}
                            onChange={(event) => updateOption(item.id, event.target.value)}
                          >
                            {item.priceDisplay.map((priceLine, index) => (
                              <option value={index} key={priceLine}>{priceLine}</option>
                            ))}
                          </select>
                          <label htmlFor={`menu-quantity-${item.id}`}>Quantity</label>
                          <div className="weekly-quantity menu-quantity">
                            <button
                              type="button"
                              onClick={() => changeQuantity(item.id, -1)}
                              disabled={(quantities[item.id] || 0) === 0}
                              aria-label={`Decrease quantity for ${item.name}`}
                            >
                              -
                            </button>
                            <input
                              id={`menu-quantity-${item.id}`}
                              type="number"
                              min="0"
                              step="1"
                              value={quantities[item.id] || 0}
                              onChange={(event) => updateQuantity(item.id, event.target.value)}
                              aria-label={`Quantity for ${item.name}`}
                            />
                            <button
                              type="button"
                              onClick={() => changeQuantity(item.id, 1)}
                              aria-label={`Increase quantity for ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div id="regular-menu-order-summary" className="menu-order-summary">
          <p className="weekly-shop-eyebrow">Order request</p>
          <h3>Your Menu Request</h3>
          <div className="weekly-shop-summary-list">
            {selectedItems.length > 0 ? selectedItems.map(selection => (
              <div className="weekly-shop-summary-row" key={selection.item.id}>
                <span>{selection.quantity} x</span>
                <strong>{selection.item.name} ({selection.priceLine})</strong>
              </div>
            )) : (
              <p className="weekly-shop-empty">No regular menu items selected yet.</p>
            )}
          </div>
          <div className="weekly-shop-total">
            <span>{totalItems} selections</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <p className="weekly-shop-highlight">Free delivery in Barrie for orders over $70 total and minimum 2 days.</p>
          <div className="menu-schedule-request">
            <div>
              <label htmlFor="regular-menu-date">Preferred date</label>
              <input
                id="regular-menu-date"
                type="date"
                min={earliestDate}
                value={requestedDate}
                onChange={(event) => {
                  setErrorMessage('');
                  setRequestedDate(event.target.value);
                }}
              />
              <p>Earliest available date: {earliestDate || '2 days from today'}</p>
            </div>
            <div>
              <label htmlFor="regular-menu-time">Preferred time</label>
              <select
                id="regular-menu-time"
                value={requestedTime}
                onChange={(event) => {
                  setErrorMessage('');
                  setRequestedTime(event.target.value);
                }}
              >
                <option value="">Select a time window</option>
                {timeSlots.map(slot => (
                  <option value={slot} key={slot}>{slot}</option>
                ))}
              </select>
              <p>Final availability is confirmed after we review your request.</p>
            </div>
          </div>
          <p className="weekly-shop-limits">This is a request, not a confirmed order. We confirm availability first, then send payment details after accepting.</p>
          {errorMessage ? <p className="text-danger mb-3">{errorMessage}</p> : null}
          <div className="d-grid gap-2 d-sm-flex justify-content-center">
            <button type="button" className="btn btn-danger btn-lg" onClick={handleOrder}>
              Send Menu Request
            </button>
            <a href={contact.messengerUrl} className="btn btn-outline-danger btn-lg" target="_blank" rel="noopener noreferrer">
              Message on Facebook
            </a>
          </div>
          <p className="weekly-shop-limits mt-3 mb-0">Limited home kitchen availability around Barrie and Simcoe. Please contact us to schedule.</p>
        </div>
      </div>
    </section>
  );
}
