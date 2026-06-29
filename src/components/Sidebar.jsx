import { useState } from 'react'
import { TRIPS, SAVED_DESTINATIONS } from '../data'
import './Sidebar.css'

const STATUS_BADGE = {
  building:  { label: 'AI Building', cls: 'badge-purple' },
  confirmed: { label: 'Confirmed',   cls: 'badge-green'  },
  pending:   { label: 'Pending',     cls: 'badge-amber'  },
  booked:    { label: 'Booked',      cls: 'badge-blue'   },
}

export default function Sidebar({ activeTrip, onSelectTrip, onNewTrip, collapsed, onToggle, onLogout, onNotifications, notifCount }) {
  const [search, setSearch] = useState('')
  const filtered = TRIPS.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.destination.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__top">
        <div className="sidebar__logo">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="11" fill="var(--color-blue-50)" stroke="var(--color-blue-300)" strokeWidth="1"/>
            <path d="M7 13c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="var(--color-blue-600)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <circle cx="13" cy="13" r="2.2" fill="var(--color-blue-600)"/>
          </svg>
          {!collapsed && <span className="sidebar__logo-text">Safrat <em>AI</em></span>}
        </div>
        <div className="sidebar__top-actions">
          {/* Notification bell */}
          {!collapsed && (
            <button className="sidebar__notif" onClick={onNotifications} title="Notifications">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2a5 5 0 00-5 5v3l-1 1h12l-1-1V7a5 5 0 00-5-5zM6.5 13a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              {notifCount > 0 && <span className="sidebar__notif-dot">{notifCount}</span>}
            </button>
          )}
          <button className="btn btn-ghost btn-icon sidebar__toggle" onClick={onToggle}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 4h11M2 7.5h11M2 11h11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="sidebar__new">
        <button className="btn btn-primary sidebar__new-btn" onClick={onNewTrip}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          {!collapsed && 'New Trip'}
        </button>
      </div>

      {!collapsed && (
        <div className="sidebar__search-wrap">
          <svg className="sidebar__search-icon" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M8.5 8.5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <input className="sidebar__search" placeholder="Search trips..." value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
      )}

      {!collapsed && <p className="sidebar__section-label">Active trips</p>}

      <div className="sidebar__trips">
        {filtered.map(trip => {
          const badge = STATUS_BADGE[trip.status]
          return (
            <button key={trip.id} className={`sidebar__trip ${activeTrip?.id === trip.id ? 'sidebar__trip--active' : ''}`} onClick={() => onSelectTrip(trip)}>
              <div className="sidebar__trip-img"><img src={trip.image} alt={trip.title}/></div>
              {!collapsed && (
                <div className="sidebar__trip-info">
                  <div className="sidebar__trip-top">
                    <span className="sidebar__trip-title">{trip.title}</span>
                    <span className={`badge ${badge.cls}`}>{badge.label}</span>
                  </div>
                  <p className="sidebar__trip-meta">{trip.days} days · {trip.guests} guest{trip.guests > 1 ? 's' : ''} · {trip.budget}</p>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {!collapsed && (
        <>
          <p className="sidebar__section-label">Saved destinations</p>
          <div className="sidebar__destinations">
            {SAVED_DESTINATIONS.map(d => (
              <button key={d.id} className="sidebar__dest">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <circle cx="5.5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M5.5 10C5.5 10 2 7 2 4.5a3.5 3.5 0 017 0C9 7 5.5 10 5.5 10z" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                {d.name}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="sidebar__footer">
        <button className="btn btn-ghost sidebar__pref">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
            <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          {!collapsed && 'Preferences'}
        </button>
        {/* Logout */}
        <button className="sidebar__logout" onClick={onLogout} title="Logout">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2M9 10l3-3-3-3M12 7H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  )
}