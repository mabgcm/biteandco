import { useMemo, useState } from 'react';
import ImageLightbox from './ImageLightbox';
import contact from '../data/contact.json';
import menuItems from '../data/menu.json';

const categories = [
  { id: 'all', label: 'All Items', icon: 'bi-grid' },
  { id: 'main', label: 'Main Dishes', icon: 'bi-egg-fried' },
  { id: 'desserts', label: 'Desserts', icon: 'bi-cake2' },
  { id: 'bakery', label: 'Bakery', icon: 'bi-basket' },
  { id: 'snacks', label: 'Snacks', icon: 'bi-stars' }
];

function parsePrice(priceLine) {
  const match = priceLine.match(/\$([\d.]+)/);
  return match ? Number(match[1]) : 0;
}

function formatCategory(categoryId) {
  return categories.find(category => category.id === categoryId)?.label || 'Menu';
}

function searchableText(item) {
  return [
    item.name,
    item.description,
    item.category,
    ...(item.ingredients || [])
  ].filter(Boolean).join(' ').toLowerCase();
}

export default function MenuShop() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [quantities, setQuantities] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const categoryCounts = useMemo(() => {
    return categories.reduce((counts, category) => {
      counts[category.id] = category.id === 'all'
        ? menuItems.length
        : menuItems.filter(item => item.category === category.id).length;
      return counts;
    }, {});
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = !normalizedQuery || searchableText(item).includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, normalizedQuery]);

  const selectedItems = useMemo(() => {
    return menuItems
      .map(item => {
        const quantity = quantities[item.id] || 0;
        const optionIndex = selectedOptions[item.id] || 0;
        const priceLine = item.priceDisplay?.[optionIndex] || item.priceDisplay?.[0] || `$${Number(item.price || 0).toFixed(2)}`;

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

  const orderMessage = useMemo(() => {
    const itemLines = selectedItems.map(selection => (
      `- ${selection.quantity} x ${selection.item.name} (${selection.priceLine})`
    ));

    return [
      'Hi Bite & Co, I would like to request these menu items:',
      ...itemLines,
      `Estimated total: $${totalPrice.toFixed(2)}`,
      '',
      'Please confirm availability, preparation timing, delivery/pickup, and payment details.'
    ].join('\n');
  }, [selectedItems, totalPrice]);

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

  const handleOrder = () => {
    if (totalItems === 0) {
      setErrorMessage('Please add at least one menu item.');
      return;
    }

    window.location.href = `${contact.smsHref}?&body=${encodeURIComponent(orderMessage)}`;
  };

  return (
    <section id="menu-shop" className="menu-shop section">
      <div className="container">
        <div className="menu-shop-header">
          <div>
            <p className="menu-shop-eyebrow">Bite & Co Menu</p>
            <h1>Shop Homemade Meals</h1>
            <p>Browse every regular menu item, filter by category, and build a request before texting us.</p>
          </div>
          <div className="menu-shop-search">
            <i className="bi bi-search" aria-hidden="true"></i>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search meals, desserts, ingredients..."
              aria-label="Search menu"
            />
          </div>
        </div>

        <div className="menu-shop-categories" aria-label="Menu categories">
          {categories.map(category => (
            <button
              type="button"
              className={activeCategory === category.id ? 'active' : ''}
              onClick={() => setActiveCategory(category.id)}
              key={category.id}
            >
              <i className={`bi ${category.icon}`} aria-hidden="true"></i>
              <span>{category.label}</span>
              <strong>{categoryCounts[category.id] || 0}</strong>
            </button>
          ))}
        </div>

        {totalItems > 0 ? (
          <div className="weekly-shop-sticky-total menu-shop-sticky-total" aria-live="polite">
            <div>
              <span>{totalItems} selections</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <a href="#menu-shop-order" className="btn btn-danger btn-sm">Review Order</a>
          </div>
        ) : null}

        <div className="menu-shop-layout">
          <div>
            <div className="menu-shop-results">
              <span>{filteredItems.length} items</span>
              {normalizedQuery ? <strong>Search: "{query.trim()}"</strong> : <strong>{formatCategory(activeCategory)}</strong>}
            </div>

            {filteredItems.length > 0 ? (
              <div className="menu-shop-grid">
                {filteredItems.map(item => {
                  const quantity = quantities[item.id] || 0;
                  const optionIndex = selectedOptions[item.id] || 0;

                  return (
                    <article className="menu-shop-card" key={item.id}>
                      <div className="menu-shop-image">
                        <ImageLightbox
                          src={item.image}
                          alt={item.alt || item.name}
                          title={item.name}
                          triggerClassName="menu-shop-image-button"
                        />
                        <span>{formatCategory(item.category)}</span>
                      </div>
                      <div className="menu-shop-body">
                        <div>
                          <h2>{item.name}</h2>
                          {item.description ? <p>{item.description}</p> : null}
                        </div>
                        {item.ingredients?.length ? (
                          <div className="menu-shop-tags" aria-label={`${item.name} ingredients`}>
                            {item.ingredients.slice(0, 5).map(ingredient => (
                              <span key={ingredient}>{ingredient}</span>
                            ))}
                          </div>
                        ) : null}
                        <div className="menu-shop-order-controls">
                          <label htmlFor={`menu-shop-option-${item.id}`}>Size</label>
                          <select
                            id={`menu-shop-option-${item.id}`}
                            value={optionIndex}
                            onChange={(event) => updateOption(item.id, event.target.value)}
                          >
                            {item.priceDisplay.map((priceLine, index) => (
                              <option value={index} key={priceLine}>{priceLine}</option>
                            ))}
                          </select>
                          <label htmlFor={`menu-shop-quantity-${item.id}`}>Qty</label>
                          <div className="weekly-quantity menu-shop-quantity">
                            <button
                              type="button"
                              onClick={() => changeQuantity(item.id, -1)}
                              disabled={quantity === 0}
                              aria-label={`Decrease quantity for ${item.name}`}
                            >
                              -
                            </button>
                            <input
                              id={`menu-shop-quantity-${item.id}`}
                              type="number"
                              min="0"
                              step="1"
                              value={quantity}
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
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="menu-shop-empty-state">
                <i className="bi bi-search" aria-hidden="true"></i>
                <h2>No matching items</h2>
                <p>Try another dish name, ingredient, or category.</p>
              </div>
            )}
          </div>

          <aside id="menu-shop-order" className="menu-shop-summary" aria-label="Menu order summary">
            <div className="menu-shop-summary-inner">
              <p className="menu-shop-eyebrow">Order request</p>
              <h2>Your Bag</h2>
              <div className="weekly-shop-summary-list">
                {selectedItems.length > 0 ? selectedItems.map(selection => (
                  <div className="weekly-shop-summary-row" key={selection.item.id}>
                    <span>{selection.quantity} x</span>
                    <strong>{selection.item.name} ({selection.priceLine})</strong>
                  </div>
                )) : (
                  <p className="weekly-shop-empty">No items selected yet.</p>
                )}
              </div>
              <div className="weekly-shop-total">
                <span>{totalItems} items</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
              <p className="weekly-shop-highlight">Free delivery in Barrie for orders over $70 total.</p>
              <p className="weekly-shop-limits">Regular menu orders are requests. We confirm timing and availability before payment.</p>
              {errorMessage ? <p className="text-danger mb-3">{errorMessage}</p> : null}
              <button type="button" className="btn btn-danger btn-lg w-100" onClick={handleOrder}>
                Send Menu Request
              </button>
              <a href={contact.messengerUrl} className="btn btn-outline-danger btn-lg w-100 mt-2" target="_blank" rel="noopener noreferrer">
                Message on Facebook
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
