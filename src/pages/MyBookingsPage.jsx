import { useState } from 'react'
import './MyBookingsPage.css'

const STATUS_MAP = {
  confirmed: { label: 'Confirmed', cls: 'mb-status--green' },
  upcoming:  { label: 'Upcoming',  cls: 'mb-status--blue'  },
  completed: { label: 'Completed', cls: 'mb-status--grey'  },
}

export default function MyBookingsPage({ onBack, bookings = [] }) {
  const [activeTab, setActiveTab] = useState('all')

  const allBookings = [
    ...bookings,
    
  ]

  const filtered = activeTab === 'all'
    ? allBookings
    : allBookings.filter(b => b.status === activeTab)

  return (
    <div className="mb-page">
      <div className="mb-header">
        <button className="mb-back" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <div>
          <h2 className="mb-header__title">My Bookings</h2>
          <p className="mb-header__sub">{allBookings.length} trips · {allBookings.filter(b => b.status === 'upcoming' || b.status === 'confirmed').length} upcoming</p>
        </div>
      </div>

      <div className="mb-tabs">
        {['all', 'confirmed', 'upcoming', 'completed'].map(t => (
          <button key={t} className={`mb-tab ${activeTab === t ? 'mb-tab--active' : ''}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
            <span className="mb-tab-count">{t === 'all' ? allBookings.length : allBookings.filter(b => b.status === t).length}</span>
          </button>
        ))}
      </div>

      <div className="mb-body">
        {filtered.length === 0 ? (
          <div className="mb-empty">
            <span>🧳</span>
            <p>No bookings yet</p>
            <span className="mb-empty__sub">Your confirmed trips will appear here</span>
          </div>
        ) : (
          <div className="mb-list">
            {filtered.map(b => {
              const s = STATUS_MAP[b.status] || STATUS_MAP.confirmed
              return (
                <div key={b.id} className="mb-card">
                  <div className="mb-card__img">
                    <img src={b.image} alt={b.destination} onError={e => e.target.style.display='none'}/>
                    <span className={`mb-status ${s.cls}`}>{s.label}</span>
                  </div>
                  <div className="mb-card__body">
                    <div className="mb-card__top">
                      <div>
                        <p className="mb-card__ref">{b.id}</p>
                        <h3 className="mb-card__dest">{b.destination}</h3>
                        <p className="mb-card__dates">📅 {b.dates}</p>
                      </div>
                      <div className="mb-card__price">
                        <span className="mb-card__total">{b.total}</span>
                        <span className="mb-card__paid">Paid {b.paidOn}</span>
                      </div>
                    </div>
                    <div className="mb-card__details">
                      <span>🏨 {b.hotel}</span>
                      <span>✈️ {b.airline}</span>
                      <span>🌙 {b.nights} nights</span>
                      <span>👥 {b.guests} guest{b.guests > 1 ? 's' : ''}</span>
                    </div>
                    <div className="mb-card__actions">
                      <button className="mb-btn mb-btn--ghost">View details</button>
                      <button className="mb-btn mb-btn--ghost">Download PDF</button>
                      {b.status === 'upcoming' && (
                        <button className="mb-btn mb-btn--primary">Check in online</button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}