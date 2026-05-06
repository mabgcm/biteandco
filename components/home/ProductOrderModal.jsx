import { useEffect, useMemo, useState } from 'react';
import contact from '../../data/contact.json';

function parsePrice(priceLine, fallbackPrice) {
  const match = String(priceLine || '').match(/\$([\d.]+)/);
  if (match) return Number(match[1]);
  return Number(fallbackPrice) || 0;
}

function getPriceOptions(product) {
  if (product.priceDisplay?.length) return product.priceDisplay;
  if (product.price) return [`$${Number(product.price).toFixed(2)}`];
  return ['Price to confirm'];
}

export default function ProductOrderModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [optionIndex, setOptionIndex] = useState(0);
  const image = product?.image || product?.photo;
  const priceOptions = useMemo(() => product ? getPriceOptions(product) : [], [product]);
  const selectedPrice = priceOptions[optionIndex] || priceOptions[0] || '';
  const unitPrice = parsePrice(selectedPrice, product?.price);
  const total = unitPrice * quantity;

  useEffect(() => {
    if (!product) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, product]);

  useEffect(() => {
    setQuantity(1);
    setOptionIndex(0);
  }, [product?.id]);

  if (!product) return null;

  const detailRows = [
    product.day ? { label: 'Day', value: product.day } : null,
    product.comesWith?.length ? { label: 'Comes with', value: product.comesWith.join(', ') } : null,
    product.ingredients?.length ? { label: 'Ingredients', value: product.ingredients.join(', ') } : null
  ].filter(Boolean);

  const orderMessage = [
    'Hi Bite & Co, I would like to order:',
    `Product: ${product.name}`,
    product.day ? `Day: ${product.day}` : null,
    `Option: ${selectedPrice}`,
    `Quantity: ${quantity}`,
    unitPrice ? `Estimated total: $${total.toFixed(2)}` : null,
    '',
    'Please confirm availability and pickup/delivery details.'
  ].filter(line => line !== null).join('\n');

  const orderHref = `${contact.smsHref}?&body=${encodeURIComponent(orderMessage)}`;

  return (
    <div className="shop-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="shop-product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shop-product-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="shop-modal-close" onClick={onClose} aria-label="Close product details">
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>

        <div className="shop-modal-image">
          <img src={image} alt={product.alt || product.name} />
        </div>

        <div className="shop-modal-content">
          {product.day ? <span className="shop-modal-eyebrow">{product.day}</span> : null}
          <h2 id="shop-product-modal-title">{product.name}</h2>
          {product.description ? <p className="shop-modal-description">{product.description}</p> : null}

          {detailRows.length ? (
            <dl className="shop-modal-details">
              {detailRows.map(row => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="shop-modal-controls">
            <label htmlFor="shop-product-option">Choose option</label>
            <select
              id="shop-product-option"
              value={optionIndex}
              onChange={(event) => setOptionIndex(Number(event.target.value))}
            >
              {priceOptions.map((priceOption, index) => (
                <option value={index} key={priceOption}>{priceOption}</option>
              ))}
            </select>

            <label htmlFor="shop-product-quantity">Quantity</label>
            <div className="shop-modal-quantity">
              <button
                type="button"
                onClick={() => setQuantity(current => Math.max(1, current - 1))}
                aria-label={`Decrease quantity for ${product.name}`}
              >
                -
              </button>
              <input
                id="shop-product-quantity"
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
              />
              <button
                type="button"
                onClick={() => setQuantity(current => current + 1)}
                aria-label={`Increase quantity for ${product.name}`}
              >
                +
              </button>
            </div>
          </div>

          <div className="shop-modal-summary">
            <span>{quantity} x {selectedPrice}</span>
            {unitPrice ? <strong>${total.toFixed(2)}</strong> : null}
          </div>

          <a href={orderHref} className="shop-button shop-button-dark">
            Order This Meal
          </a>
        </div>
      </section>
    </div>
  );
}
