export default function ValueStrip({ items }) {
  return (
    <section className="shop-value-strip" aria-label="Bite & Co food values">
      {items.map(item => (
        <div className="shop-value-item" key={item.label}>
          <i className={`bi ${item.icon}`} aria-hidden="true" />
          <span>{item.label}</span>
        </div>
      ))}
    </section>
  );
}
