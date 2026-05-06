export default function Desserts({ products, onOrder }) {
  return (
    <section id="desserts" className="shop-section shop-weekly">
      <div className="shop-section-heading shop-section-heading-row">
        <h2>Desserts</h2>
        <a href="/menu" className="shop-text-link">View Full Menu</a>
      </div>
      <div className="shop-weekly-row" tabIndex="0" aria-label="Dessert items">
        {products.map(product => (
          <article className="shop-weekly-card" key={product.id}>
            <button type="button" className="shop-weekly-link shop-category-product-button" onClick={() => onOrder(product)} aria-label={`View ${product.name} details`}>
              <span className="shop-weekly-image" aria-hidden="true">
                <img src={product.image || product.photo} alt="" loading="lazy" />
              </span>
              <span className="shop-weekly-body">
                <span className="shop-weekly-day">Desserts</span>
                <h3>{product.name}</h3>
                <strong>{product.priceDisplay?.[0] || `$${Number(product.price).toFixed(2)}`}</strong>
                <span className="shop-order-link">Order <span aria-hidden="true">→</span></span>
              </span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
