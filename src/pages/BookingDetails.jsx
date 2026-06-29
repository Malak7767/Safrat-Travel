import { useState } from 'react'
import './BookingDetails.css'
import k1 from'../assets/images/kyoto4.jpg';
import k2 from'../assets/images/k2.jpg';
const BOOKING = {
  destination: 'Kyoto',
  hero: k1,
  subtitle: 'Honeymoon Package · 6 nights · 2 guests',
  dates: 'Aug 20 – Aug 26, 2025',
  total: '$5,600',
  status: 'Quoting',
  aiScore: 94,
  flights: [
    { icon: '✈️', route: 'London Heathrow → Velana Intl', code: 'BA0197', date: 'Wed Aug 20 · 07:15', class: 'Business Class', status: 'Seats held', price: '$3,200', statusCls: 'cb-tag--blue' },
    { icon: '✈️', route: 'Velana Intl → London Heathrow', code: 'BA0198', date: 'Tue Aug 26 · 11:30', class: 'Business Class', status: 'Pending', price: '$3,200', statusCls: 'cb-tag--amber' },
  ],
  hotel: {
    name: 'Soneva Jani',
    image: k2,
    type: 'Water Villa · Over-ocean bungalow',
    nights: '5 nights · Aug 20 – Aug 26',
    rating: 4.9,
    price: '$4,200',
    amenities: ['Private pool', 'Butler service', 'Spa access', 'All-inclusive'],
  },
  activities: [
    { icon: '🤿', name: 'Private Snorkelling Expedition', detail: 'House Reef · 3h · Marine biologist guide', price: '$320', status: 'Booked', statusCls: 'cb-tag--green' },
    { icon: '💆', name: 'Couples Spa Ritual', detail: '90-min · Coconut & lemongrass · AI recommended', price: '$680', status: 'AI Pick', statusCls: 'cb-tag--purple', isAI: true },
    { icon: '🚤', name: 'Sunset Dolphin Cruise', detail: 'Private catamaran · 2h · Champagne included', price: '$290', status: 'Optional', statusCls: 'cb-tag--grey' },
  ],
  breakdown: [
    { icon: '✈️', label: 'Flights (2 persons, return)', amount: '$6,400' },
    { icon: '🏨', label: 'Soneva Jani · 5 nights', amount: '$4,200' },
    { icon: '🚤', label: 'Transfers & seaplane', amount: '$960' },
    { icon: '🤿', label: 'Activities & experiences', amount: '$680' },
  ],
}

export default function BookingDetails({ onBack, onPay, booking }) {
  const [activeTab, setActiveTab] = useState('overview')
  const bookingData = booking || BOOKING

  return (
    <div className="cb">

      {/* ── Hero ── */}
      <div className="cb-hero">
        <img src={bookingData.hero} alt={bookingData.destination} className="cb-hero__img" onError={e => e.target.style.display='none'}/>
        <div className="cb-hero__overlay"/>

        <button className="cb-hero__back" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <div className="cb-hero__content">
          <div className="cb-hero__ai">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/><path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
            AI Score {bookingData.aiScore}% match
          </div>
          <h1 className="cb-hero__title">{bookingData.destination}</h1>
          <p className="cb-hero__sub">{bookingData.subtitle}</p>
          <div className="cb-hero__meta">
            <span>📅 {bookingData.dates}</span>
            <span className="cb-hero__status">● {bookingData.status}</span>
          </div>
        </div>

        <div className="cb-hero__price-card">
          <p className="cb-hero__price-label">Total package</p>
          <p className="cb-hero__price">{bookingData.total}</p>
          <button className="cb-confirm-btn-hero" onClick={onPay}>Confirm & Book →</button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="cb-tabs">
        {['overview', 'flights', 'hotel', 'activities'].map(tab => (
          <button
            key={tab}
            className={`cb-tab ${activeTab === tab ? 'cb-tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'overview' && '📋 '}
            {tab === 'flights' && '✈️ '}
            {tab === 'hotel' && '🏨 '}
            {tab === 'activities' && '🎯 '}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="cb-body">

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="cb-overview">

            {/* Quick stats */}
            <div className="cb-stats">
              <div className="cb-stat">
                <span className="cb-stat__icon">✈️</span>
                <span className="cb-stat__val">2</span>
                <span className="cb-stat__lbl">Flights</span>
              </div>
              <div className="cb-stat">
                <span className="cb-stat__icon">🏨</span>
                <span className="cb-stat__val">5</span>
                <span className="cb-stat__lbl">Nights</span>
              </div>
              <div className="cb-stat">
                <span className="cb-stat__icon">🎯</span>
                <span className="cb-stat__val">3</span>
                <span className="cb-stat__lbl">Activities</span>
              </div>
              <div className="cb-stat">
                <span className="cb-stat__icon">⭐</span>
                <span className="cb-stat__val">5★</span>
                <span className="cb-stat__lbl">Hotel</span>
              </div>
            </div>

            {/* AI note */}
            <div className="cb-ai-note">
              <div className="cb-ai-note__icon">🤖</div>
              <div>
                <p className="cb-ai-note__title">AI-curated for you</p>
                <p className="cb-ai-note__desc">This itinerary was personalised based on your preferences — honeymoon, luxury, beach, private experiences. Safrat AI matched {bookingData.aiScore}% of your ideal trip criteria.</p>
              </div>
            </div>

            {/* Cost breakdown */}
            <div className="cb-card">
              <h3 className="cb-card__title">💰 Cost Breakdown</h3>
                {bookingData.breakdown.map(item => (
                <div key={item.label} className="cb-breakdown-row">
                  <div className="cb-breakdown-left">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <span className="cb-breakdown-amount">{item.amount}</span>
                </div>
              ))}
              <div className="cb-breakdown-total">
                <span>Total</span>
                <strong>{bookingData.total}</strong>
              </div>
            </div>

            <button className="cb-confirm-btn" onClick={onPay}>✓ Confirm & Book All — {bookingData.total}</button>
          </div>
        )}

        {/* FLIGHTS */}
        {activeTab === 'flights' && (
          <div className="cb-section">
            <h3 className="cb-section__title">Your Flights</h3>
            {bookingData.flights.map((f, i) => (
              <div key={i} className="cb-flight-card">
                <div className="cb-flight-card__header">
                  <span className="cb-flight-num">{i === 0 ? 'Outbound' : 'Return'}</span>
                  <span className={`cb-tag ${f.statusCls}`}>{f.status}</span>
                </div>
                <div className="cb-flight-card__body">
                  <div className="cb-flight-route">
                    <span className="cb-flight-icon">{f.icon}</span>
                    <div>
                      <p className="cb-flight-route__main">{f.route}</p>
                      <p className="cb-flight-route__sub">{f.code} · {f.date}</p>
                      <p className="cb-flight-route__class">{f.class}</p>
                    </div>
                  </div>
                  <div className="cb-flight-price">
                    <p className="cb-flight-price__val">{f.price}</p>
                    <p className="cb-flight-price__lbl">per person</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* HOTEL */}
        {activeTab === 'hotel' && (
          <div className="cb-section">
            <h3 className="cb-section__title">Your Hotel</h3>
            <div className="cb-hotel-card">
              <div className="cb-hotel-card__img">
                <img src={bookingData.hotel.image} alt={bookingData.hotel.name} onError={e => e.target.style.display='none'}/>
                <div className="cb-hotel-rating">⭐ {bookingData.hotel.rating}</div>
              </div>
              <div className="cb-hotel-card__body">
                <div className="cb-hotel-card__top">
                  <div>
                    <h4 className="cb-hotel-name">{bookingData.hotel.name}</h4>
                    <p className="cb-hotel-type">{bookingData.hotel.type}</p>
                    <p className="cb-hotel-nights">{bookingData.hotel.nights}</p>
                  </div>
                  <div className="cb-hotel-price">
                    <p className="cb-hotel-price__val">{bookingData.hotel.price}</p>
                    <p className="cb-hotel-price__lbl">total stay</p>
                  </div>
                </div>
                <div className="cb-hotel-amenities">
                  {bookingData.hotel.amenities.map(a => (
                    <span key={a} className="cb-amenity">✓ {a}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVITIES */}
        {activeTab === 'activities' && (
          <div className="cb-section">
            <h3 className="cb-section__title">Activities & Experiences</h3>
            {bookingData.activities.map((act, i) => (
              <div key={i} className={`cb-activity-card ${act.isAI ? 'cb-activity-card--ai' : ''}`}>
                {act.isAI && (
                  <div className="cb-activity-ai-bar">
                    🤖 AI Recommended · {bookingData.aiScore}% match for your preferences
                  </div>
                )}
                <div className="cb-activity-card__body">
                  <span className="cb-activity-icon">{act.icon}</span>
                  <div className="cb-activity-info">
                    <p className="cb-activity-name">{act.name}</p>
                    <p className="cb-activity-detail">{act.detail}</p>
                  </div>
                  <div className="cb-activity-right">
                    <span className={`cb-tag ${act.statusCls}`}>{act.status}</span>
                    <p className="cb-activity-price">{act.price}</p>
                    {act.status === 'Optional' && (
                      <button className="cb-add-btn">+ Add</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}