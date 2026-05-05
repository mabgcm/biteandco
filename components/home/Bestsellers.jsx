import ProductCard from './ProductCard';

export default function Bestsellers({ products, onOrder }) {
  return (
    <section id="shop" className="shop-section shop-bestsellers">
      <div className="shop-section-heading">
        <h2>Shop Popular Meals</h2>
      </div>
      <div className="shop-product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onOrder={onOrder} />
        ))}
      </div>
    </section>
  );
}
