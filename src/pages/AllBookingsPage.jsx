import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import { BOOKINGS_BY_CLIENT } from '../bookingsData'
import './AllBookingsPage.css'
import './AdminDashboard.css'

const STATUS_CLS = {
  'Quoting':   'ab-status--amber',
  'Confirmed': 'ab-status--green',
  'Pending':   'ab-status--grey',
}

export default function AllBookingsPage({ user, onLogout, onSelectBooking }) {
  const [activeNav, setActiveNav] = useState('Bookings')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const navigate = useNavigate()

  const allBookings = Object.values(BOOKINGS_BY_CLIENT)

  const filtered = allBookings.filter(b => {
    const matchSearch = b.client.name.toLowerCase().includes(search.toLowerCase()) ||
      b.destination.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || b.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleOpen = (clientName) => {
    onSelectBooking(clientName)
    navigate('/booking')
  }

  return (
    <div className="admin">
      <AdminSidebar activeNav={activeNav} setActiveNav={setActiveNav} user={user} onLogout={onLogout} />

      <div className="admin-main">

        {/* Topbar */}
        <div className="admin-topbar">
          <div>
            <h1 className="admin-topbar__title">All Bookings</h1>
            <p className="admin-topbar__sync">
              <span className="sync-dot"/>
              {allBookings.length} total bookings · {allBookings.filter(b => b.status === 'Confirmed').length} confirmed
            </p>
          </div>
        </div>

        <div className="admin-content">

          {/* Filters */}
          <div className="ab-filters">
            <div className="ab-search-wrap">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M9.5 9.5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <input
                className="ab-search"
                placeholder="Search by client or destination..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="ab-status-tabs">
              {['All', 'Quoting', 'Confirmed', 'Pending'].map(s => (
                <button
                  key={s}
                  className={`ab-status-tab ${statusFilter === s ? 'ab-status-tab--active' : ''}`}
                  onClick={() => setStatusFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings grid */}
          <div className="ab-grid">
            {filtered.map(b => (
              <div key={b.id} className="ab-card" onClick={() => handleOpen(b.client.name)}>

             <div className="ab-card__img">
             <img src={b.hero} alt={b.destination} onError={e => e.target.style.display='none'} />
           </div>

            <div className="ab-card__top">
                  <div className="ab-card__client">
                    <div className="ab-avatar">{b.client.avatar}</div>
                    <div>
                      <p className="ab-card__name">{b.client.name}</p>
                      <p className="ab-card__trip">{b.client.trip}</p>
                    </div>
                  </div>
                  <span className={`ab-status ${STATUS_CLS[b.status] || 'ab-status--grey'}`}>{b.status}</span>
                </div>

                <div className="ab-card__body">
                  <p className="ab-card__dest">{b.destination}</p>
                  <p className="ab-card__dates">{b.dates}</p>

                  <div className="ab-card__meta">
                    <span>{b.nights} nights</span>
                    <span className="ab-dot"/>
                    <span>{b.guests} guests</span>
                    <span className="ab-dot"/>
                    <span>{b.segments} segments</span>
                  </div>
                </div>

                <div className="ab-card__footer">
                  <div className="ab-card__agent">
                    <div className="ab-agent-avatar">{b.agent.avatar}</div>
                    <span>{b.agent.name}</span>
                  </div>
                  <div className="ab-card__price">
                    <span className="ab-card__ai">{b.aiScore}% AI match</span>
                    <span className="ab-card__total">{b.total}</span>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="ab-empty">
                <p>No bookings match your search</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}