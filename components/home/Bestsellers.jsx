const categories = [
  { id: 'desserts', label: 'Desserts' }
];

export default function Bestsellers({ products, onOrder }) {
  const groups = categories
    .map(category => ({
      ...category,
      products: products.filter(product => product.category === category.id)
    }))
    .filter(category => category.products.length > 0);

  return (
    <section id="shop" className="shop-section shop-bestsellers">
      <div className="shop-section-heading shop-section-heading-row">
        <h2>Shop Menu</h2>
        <a href="/menu" className="shop-text-link">Search All</a>
      </div>

      <div className="shop-category-groups">
        {groups.map(category => (
          <div className="shop-category-group" key={category.id}>
            <div className="shop-category-heading">
              <h3>{category.label}</h3>
              <span>{category.products.length} items</span>
            </div>
            <div
              className="shop-weekly-row"
              tabIndex="0"
              aria-label={category.label}
            >
              {category.products.map(product => {
                const image = product.image || product.photo;
                const price = product.priceDisplay?.[0] || `$${Number(product.price).toFixed(2)}`;

                return (
                  <article className="shop-weekly-card" key={product.id}>
                    <button type="button" className="shop-weekly-link shop-category-product-button" onClick={() => onOrder(product)} aria-label={`View ${product.name} details`}>
                      <span className="shop-weekly-image" aria-hidden="true">
                        <img src={image} alt="" loading="lazy" />
                      </span>
                      <span className="shop-weekly-body">
                        <span className="shop-weekly-day">{category.label}</span>
                        <h3>{product.name}</h3>
                        <strong>{price}</strong>
                        <span className="shop-order-link">Order <span aria-hidden="true">→</span></span>
                      </span>
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
