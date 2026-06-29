import { useState } from 'react'
import './ItineraryPanel.css'

const STATUS = {
  confirmed: { label: 'Confirmed', cls: 'itin-badge--green' },
  pending:   { label: 'Pending',   cls: 'itin-badge--amber' },
  building:  { label: 'Building',  cls: 'itin-badge--purple' },
}

const SUPPLIER_ICONS = {
  'Swiss Air':      '✈️',
  'British Airways':'✈️',
  'Private car':    '🚗',
  'Guided tour':    '🧭',
  'Equipment incl.':'🎒',
  'Private chef':   '👨‍🍳',
  'Wine pairing':   '🍷',
  'Glacier Express':'🚂',
}

export default function ItineraryPanel({ trip, onBookNow, onMyBookings, itineraryData }) {
  const [openDays, setOpenDays] = useState([1, 2, 3, 4])
  const toggle = (id) => setOpenDays(p =>
    p.includes(id) ? p.filter(d => d !== id) : [...p, id]
  )
  const days = itineraryData?.days || []
const activeTrip = itineraryData?.trip || trip
  return (
    <div className="itin-panel">

      {/* Header */}
      <div className="itin-panel__header">
        <div className="itin-panel__header-top">
          <h3 className="itin-panel__title">Live Itinerary</h3>
          <span className="itin-badge itin-badge--purple itin-building">
            <span className="building-dot"/>
            Building
          </span>
        </div>
        <p className="itin-panel__sub">{activeTrip?.title || 'No trip selected'}</p>
      </div>

      {/* Progress */}
      <div className="itin-progress">
        <div className="itin-progress__top">
          <span className="itin-progress__label">Completion</span>
          <span className="itin-progress__pct">62%</span>
        </div>
        <div className="itin-progress__bar">
          <div className="itin-progress__fill" style={{ width: '62%' }}/>
        </div>
        <div className="itin-progress__stats">
          <div className="itin-stat">
            <span className="itin-stat__val">{activeTrip?.budget || '$14.2k'}</span>
            <span className="itin-stat__label">Total</span>
          </div>
          <div className="itin-stat__divider"/>
          <div className="itin-stat">
            <span className="itin-stat__val">12</span>
            <span className="itin-stat__label">Activities</span>
          </div>
          <div className="itin-stat__divider"/>
          <div className="itin-stat">
            <span className="itin-stat__val">3</span>
            <span className="itin-stat__label">Transfers</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="itin-timeline">
        {days.map((day, idx) => {
  const isOpen = openDays.includes(day.id)
  const s = STATUS[day.status]
  const isLast = idx === days.length - 1

          return (
            <div key={day.id} className="itin-day">

              {/* Timeline dot + line */}
              <div className="itin-day__track">
                <div className={`itin-day__dot itin-day__dot--${day.status}`}>
                  {day.status === 'confirmed' && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5 3.5-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {day.status === 'pending' && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="5" r="2" fill="#fff"/>
                    </svg>
                  )}
                  {day.status === 'building' && (
                    <span className="dot-pulse"/>
                  )}
                </div>
                {!isLast && <div className="itin-day__line"/>}
              </div>

              {/* Day content */}
              <div className="itin-day__content">
                <button className="itin-day__header" onClick={() => toggle(day.id)}>
                  <div className="itin-day__header-left">
                    <span className="itin-day__label">{day.day}</span>
                    <span className={`itin-badge ${s.cls}`}>{s.label}</span>
                  </div>
                  <svg className={`itin-chevron ${isOpen ? 'itin-chevron--open' : ''}`} width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <h4 className="itin-day__title">{day.title}</h4>

                {isOpen && (
                  <div className="itin-activities">
                    {day.activities.map(act => (
                      <div key={act.id} className="itin-activity">
                        <p className="itin-activity__detail">{act.detail}</p>
                        <div className="itin-activity__tags">
                          {act.tags.map(tag => (
                            <span key={tag} className="itin-tag">
                              <span className="itin-tag__icon">{SUPPLIER_ICONS[tag] || '📌'}</span>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                    {day.status === 'building' && (
                      <div className="itin-generating">
                        <span/><span/><span/>
                        <p>AI generating activities…</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="itin-panel__footer">
        <button className="itin-footer-btn">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 10h9M6.5 2v6M3.5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Export PDF
        </button>
        <button className="itin-footer-btn" onClick={onMyBookings}>
  📋 My Bookings
</button>
        <button className="itin-book-btn" onClick={onBookNow}>Book now →</button>
      </div>

    </div>
  )
}