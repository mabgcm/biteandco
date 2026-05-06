import ProductCard from './ProductCard';

const categories = [
  { id: 'main', label: 'Main Dishes' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'bakery', label: 'Bakery' },
  { id: 'snacks', label: 'Snacks' }
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
              className="shop-category-row"
              tabIndex="0"
              aria-label={category.label}
            >
              {category.products.map(product => (
                <ProductCard key={product.id} product={product} onOrder={onOrder} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
