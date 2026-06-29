import './TripCard.css'

export default function TripCard({ trip }) {
  if (!trip) return null
  return (
    <div className="trip-card">
      <div className="trip-card__image-wrap">
        <img
          src={trip.image}
          alt={trip.title}
          className="trip-card__image"
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="trip-card__image-overlay" />
        <div className="trip-card__price-badge">
          <span className="trip-card__price-label">EST. TOTAL</span>
          <span className="trip-card__price-value">{trip.budget}</span>
        </div>
      </div>
      <div className="trip-card__body">
        <p className="trip-card__location">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <circle cx="5.5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M5.5 10C5.5 10 2 7 2 4.5a3.5 3.5 0 017 0C9 7 5.5 10 5.5 10z" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          {trip.destination}
        </p>
        <h3 className="trip-card__title">{trip.title}</h3>
        <div className="trip-card__stats">
          <div className="trip-card__stat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1.5" y="3" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M5 1.5v3M11 1.5v3M1.5 7h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="trip-card__stat-label">Duration</span>
            <span className="trip-card__stat-val">{trip.days} Days</span>
          </div>
          <div className="trip-card__stat-divider"/>
          <div className="trip-card__stat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 13h10M8 3a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M2.5 13c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="trip-card__stat-label">Lodging</span>
            <span className="trip-card__stat-val">{trip.tags[0]}</span>
          </div>
          <div className="trip-card__stat-divider"/>
          <div className="trip-card__stat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2l1.5 3.5L13 6l-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-.5L8 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
            <span className="trip-card__stat-label">Activities</span>
            <span className="trip-card__stat-val">12 Planned</span>
          </div>
        </div>
      </div>
    </div>
  )
}