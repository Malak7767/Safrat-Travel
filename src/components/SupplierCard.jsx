import "./SupplierCard.css";

export default function SupplierCard({ supplier }) {
  return (
    <div className="supplier-card">

      <div className="supplier-image">
        <img src={supplier.image} alt={supplier.name} />

        <div className="overlay">
          <div className="logo" style={{ background: supplier.color }}>
            {supplier.logo}
          </div>

          <span className={`status ${supplier.status}`}>
            {supplier.status}
          </span>
        </div>
      </div>

      <div className="supplier-body">

        <h3>{supplier.name}</h3>

        <p>
          {supplier.flag} {supplier.country} • {supplier.category}
        </p>

        <div className="rating">⭐ {supplier.rating}</div>

        <div className="stats">
          <div>{supplier.bookings} <small>Bookings</small></div>
          <div>{supplier.revenue} <small>Revenue</small></div>
        </div>

        <div className="tags">
          {supplier.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <button className="btn">View Details</button>

      </div>
    </div>
  );
}