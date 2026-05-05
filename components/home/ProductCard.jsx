export default function ProductCard({ product, onOrder }) {
  const price = product.priceDisplay?.[0] || `$${Number(product.price).toFixed(2)}`;
  const image = product.image || product.photo;

  return (
    <article className="shop-product-card">
      <button type="button" className="shop-product-image" onClick={() => onOrder(product)} aria-label={`View ${product.name} details`}>
        <img src={image} alt={product.alt || product.name} loading="lazy" />
      </button>
      <div className="shop-product-body">
        <div>
          <h3>{product.name}</h3>
          {product.description ? <p>{product.description}</p> : null}
        </div>
        <div className="shop-product-action">
          <strong>{price}</strong>
          <button type="button" className="shop-order-link" onClick={() => onOrder(product)}>Order <span aria-hidden="true">→</span></button>
        </div>
      </div>
    </article>
  );
}
