import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import './CustomerPage.css'
import '../pages/AdminDashboard.css'

const CUSTOMERS = [
  {
    id: 1,
    name: 'James Thornton',
    avatar: 'JT',
    avatarColor: '#3B82F6',
    email: 'james.thornton@email.com',
    phone: '+44 7700 900123',
    location: 'London, UK',
    tier: 'VIP',
    joined: 'Mar 2022',
    lastTrip: 'Maldives · Aug 2025',
    totalSpent: '$24,300',
    totalTrips: 3,
    avgTrip: '$8,100',
    repeatRate: '100%',
    preferences: ['Luxury', 'Beach', 'Honeymoon', 'Overwater Villas'],
    agent: { name: 'Layla K.', avatar: 'LK' },
    notes: 'Prefers overwater bungalows. Always books anniversary trips. Very responsive via email. Never haggles on price.',
    bookings: [
      { id: 'SAF-2049', trip: 'Honeymoon · Maldives', date: 'Aug 2025', amount: '$9,850', status: 'Quoting' },
      { id: 'SAF-1823', trip: 'Anniversary · Santorini', date: 'Jun 2024', amount: '$7,200', status: 'Confirmed' },
      { id: 'SAF-1201', trip: 'Honeymoon · Bali', date: 'Mar 2022', amount: '$7,250', status: 'Confirmed' },
    ],
  },
  {
    id: 2,
    name: 'Marcus Webb',
    avatar: 'MW',
    avatarColor: '#8B5CF6',
    email: 'marcus.webb@corp.com',
    phone: '+44 7700 900456',
    location: 'Manchester, UK',
    tier: 'Regular',
    joined: 'Jan 2024',
    lastTrip: 'Tokyo · Sep 2025',
    totalSpent: '$10,800',
    totalTrips: 2,
    avgTrip: '$5,400',
    repeatRate: '100%',
    preferences: ['Business', 'Solo', 'City Breaks', 'Direct Flights Only'],
    agent: { name: 'Priya S.', avatar: 'PS' },
    notes: 'Corporate client. Always needs hotel near business district. Prefers direct flights only. Corporate billing required.',
    bookings: [
      { id: 'SAF-2050', trip: 'Business · Tokyo', date: 'Sep 2025', amount: '$5,400', status: 'Confirmed' },
      { id: 'SAF-1750', trip: 'Business · New York', date: 'Feb 2024', amount: '$5,400', status: 'Confirmed' },
    ],
  },
  {
    id: 3,
    name: 'Oliver Beaumont',
    avatar: 'OB',
    avatarColor: '#F59E0B',
    email: 'o.beaumont@gmail.com',
    phone: '+44 7700 900789',
    location: 'Bristol, UK',
    tier: 'Regular',
    joined: 'Jun 2023',
    lastTrip: 'Amalfi · Jul 2025',
    totalSpent: '$18,600',
    totalTrips: 2,
    avgTrip: '$9,300',
    repeatRate: '100%',
    preferences: ['Family', 'Villa', 'Italy', 'Child-Friendly'],
    agent: { name: 'Layla K.', avatar: 'LK' },
    notes: 'Family of 4, kids aged 8 and 11. Prefers villas over hotels. Needs child-friendly activities. Books summer holidays.',
    bookings: [
      { id: 'SAF-2051', trip: 'Family · Amalfi Coast', date: 'Jul 2025', amount: '$12,400', status: 'Pending' },
      { id: 'SAF-1650', trip: 'Family · Tuscany', date: 'Aug 2023', amount: '$6,200', status: 'Confirmed' },
    ],
  },
  {
    id: 4,
    name: 'Ravi Nakamura',
    avatar: 'RN',
    avatarColor: '#EC4899',
    email: 'ravi.nakamura@email.com',
    phone: '+44 7700 900321',
    location: 'Edinburgh, UK',
    tier: 'New',
    joined: 'Jun 2025',
    lastTrip: 'Kyoto · Apr 2026',
    totalSpent: '$7,200',
    totalTrips: 1,
    avgTrip: '$7,200',
    repeatRate: 'N/A',
    preferences: ['Cultural', 'Couple', 'Japan', 'Traditional'],
    agent: { name: 'Dana R.', avatar: 'DR' },
    notes: 'First-time client. Cultural focus — temples, tea ceremonies, ryokan. Cherry blossom season is key requirement.',
    bookings: [
      { id: 'SAF-2052', trip: 'Cultural · Kyoto', date: 'Apr 2026', amount: '$7,200', status: 'Quoting' },
    ],
  },
  {
    id: 5,
    name: 'Daniel Achebe',
    avatar: 'DA',
    avatarColor: '#10B981',
    email: 'daniel.achebe@email.com',
    phone: '+44 7700 900654',
    location: 'Birmingham, UK',
    tier: 'VIP',
    joined: 'Nov 2021',
    lastTrip: 'Patagonia · Nov 2025',
    totalSpent: '$42,800',
    totalTrips: 4,
    avgTrip: '$10,700',
    repeatRate: '100%',
    preferences: ['Adventure', 'Group', 'Trekking', 'Remote Locations'],
    agent: { name: 'Priya S.', avatar: 'PS' },
    notes: 'High-value adventure client. Books group trips of 3-4 people. Specialist gear coordination needed. Remote lodge bookings.',
    bookings: [
      { id: 'SAF-2053', trip: 'Trek · Patagonia', date: 'Nov 2025', amount: '$18,600', status: 'Review' },
      { id: 'SAF-1900', trip: 'Trek · Nepal', date: 'Oct 2024', amount: '$12,400', status: 'Confirmed' },
      { id: 'SAF-1600', trip: 'Safari · Kenya', date: 'Jul 2023', amount: '$7,800', status: 'Confirmed' },
      { id: 'SAF-1300', trip: 'Trek · Iceland', date: 'Jan 2022', amount: '$4,000', status: 'Confirmed' },
    ],
  },
  {
    id: 6,
    name: 'Sofia Laurent',
    avatar: 'SL',
    avatarColor: '#06B6D4',
    email: 'sofia.laurent@email.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    tier: 'New',
    joined: 'Jun 2025',
    lastTrip: 'Paris · Jul 2025',
    totalSpent: '$4,200',
    totalTrips: 1,
    avgTrip: '$4,200',
    repeatRate: 'N/A',
    preferences: ['Luxury', 'Couple', 'City', 'Fine Dining'],
    agent: { name: 'Dana R.', avatar: 'DR' },
    notes: 'Referred by James Thornton. Interested in luxury city breaks and Michelin-star dining. High potential VIP client.',
    bookings: [
      { id: 'SAF-2054', trip: 'Luxury · Paris', date: 'Jul 2025', amount: '$4,200', status: 'Quoting' },
    ],
  },
]

const TIER_CONFIG = {
  VIP:     { cls: 'tier--vip',     label: '★ VIP',     color: '#B45309', bg: '#FFFBEB', border: '#FDE68A' },
  Regular: { cls: 'tier--regular', label: '◈ Regular', color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' },
  New:     { cls: 'tier--new',     label: '◉ New',     color: '#065F46', bg: '#ECFDF5', border: '#A7F3D0' },
}

const STATUS_CLS = {
  Quoting:   'status--amber',
  Confirmed: 'status--green',
  Pending:   'status--grey',
  Review:    'status--red',
}

const FILTERS = ['All', 'VIP', 'Regular', 'New']

const STATS = [
  { label: 'Total Customers', value: '284', icon: '👥', color: '#3B82F6', light: 'rgba(59,130,246,0.08)' },
  { label: 'VIP Clients', value: '38', icon: '★', color: '#B45309', light: 'rgba(245,158,11,0.08)' },
  { label: 'Avg Lifetime Value', value: '$8,400', icon: '💰', color: '#10B981', light: 'rgba(16,185,129,0.08)' },
  { label: 'Repeat Rate', value: '74%', icon: '🔄', color: '#8B5CF6', light: 'rgba(139,92,246,0.08)' },
]

export default function CustomerPage({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('Customers')
  const [selected, setSelected] = useState(CUSTOMERS[0])
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = CUSTOMERS.filter(c => {
    const matchFilter = filter === 'All' || c.tier === filter
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="admin">
      <AdminSidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        user={user}
        onLogout={onLogout}
      />

      <div className="admin-main">

        {/* Topbar */}
        <div className="admin-topbar">
          <div>
            <h1 className="admin-topbar__title">Customers</h1>
            <p className="admin-topbar__sync">
              <span className="sync-dot"/>
              284 total clients · 38 VIP · Updated just now
            </p>
          </div>
          <div className="admin-topbar__actions">
            <button className="admin-btn admin-btn--ghost">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 2v7M3.5 6l3 3 3-3M2 11h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export
            </button>
            <button className="admin-btn admin-btn--primary">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Add Customer
            </button>
          </div>
        </div>

        <div className="cust-body">

          {/* LEFT — list */}
          <div className="cust-list-col">

            {/* Stats */}
            <div className="cust-stats">
              {STATS.map(s => (
                <div key={s.label} className="cust-stat">
                  <div className="cust-stat__icon" style={{ background: s.light, color: s.color }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="cust-stat__val" style={{ color: s.color }}>{s.value}</p>
                    <p className="cust-stat__lbl">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Search + filters */}
            <div className="cust-controls">
              <div className="cust-search">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input
                  placeholder="Search name, email, location..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="cust-filters">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    className={`cust-filter-btn ${filter === f ? 'cust-filter-btn--active' : ''}`}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="cust-list">
              {filtered.map(c => (
                <div
                  key={c.id}
                  className={`cust-item ${selected?.id === c.id ? 'cust-item--active' : ''}`}
                  onClick={() => setSelected(c)}
                >
                  <div className="cust-item__avatar" style={{ background: c.avatarColor }}>
                    {c.avatar}
                  </div>
                  <div className="cust-item__body">
                    <div className="cust-item__top">
                      <p className="cust-item__name">{c.name}</p>
                      <span
                        className="cust-tier"
                        style={{
                          color: TIER_CONFIG[c.tier].color,
                          background: TIER_CONFIG[c.tier].bg,
                          border: `1px solid ${TIER_CONFIG[c.tier].border}`,
                        }}
                      >
                        {TIER_CONFIG[c.tier].label}
                      </span>
                    </div>
                    <p className="cust-item__location">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <circle cx="5" cy="4" r="1.8" stroke="currentColor" strokeWidth="1"/>
                        <path d="M5 9C5 9 2 6.5 2 4a3 3 0 016 0C8 6.5 5 9 5 9z" stroke="currentColor" strokeWidth="1"/>
                      </svg>
                      {c.location}
                    </p>
                    <div className="cust-item__meta">
                      <span>{c.totalTrips} trips</span>
                      <span className="cust-item__dot"/>
                      <span className="cust-item__spent">{c.totalSpent}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="cust-empty">No customers match your search</div>
              )}
            </div>
          </div>

          {/* RIGHT — detail panel */}
          {selected && (
            <div className="cust-panel">

              {/* Panel header */}
              <div className="cust-panel__header">
                <div className="cust-panel__profile">
                  <div className="cust-panel__avatar" style={{ background: selected.avatarColor }}>
                    {selected.avatar}
                  </div>
                  <div>
                    <div className="cust-panel__name-row">
                      <h2 className="cust-panel__name">{selected.name}</h2>
                      <span
                        className="cust-tier cust-tier--lg"
                        style={{
                          color: TIER_CONFIG[selected.tier].color,
                          background: TIER_CONFIG[selected.tier].bg,
                          border: `1px solid ${TIER_CONFIG[selected.tier].border}`,
                        }}
                      >
                        {TIER_CONFIG[selected.tier].label}
                      </span>
                    </div>
                    <p className="cust-panel__location">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <circle cx="5.5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.1"/>
                        <path d="M5.5 10C5.5 10 2 7 2 4.5a3.5 3.5 0 017 0C9 7 5.5 10 5.5 10z" stroke="currentColor" strokeWidth="1.1"/>
                      </svg>
                      {selected.location} · Client since {selected.joined}
                    </p>
                  </div>
                </div>
                <div className="cust-panel__actions">
                  <button className="admin-btn admin-btn--ghost">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 3h9v7a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM2 3l4.5 4L11 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Email
                  </button>
                  <button className="admin-btn admin-btn--ghost">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M9 1H4a1 1 0 00-1 1v9a1 1 0 001 1h6a1 1 0 001-1V4L9 1zM9 1v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    New Inquiry
                  </button>
                  <button className="admin-btn admin-btn--primary" onClick={() => navigate('/booking')}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    View Bookings
                  </button>
                </div>
              </div>

              <div className="cust-panel__body">

                {/* Lifetime stats */}
                <div className="cust-lifetime">
                  {[
                    { label: 'Total Spent', value: selected.totalSpent, icon: '💰', color: '#10B981' },
                    { label: 'Trips Booked', value: selected.totalTrips, icon: '✈️', color: '#3B82F6' },
                    { label: 'Avg Trip Value', value: selected.avgTrip, icon: '📊', color: '#8B5CF6' },
                    { label: 'Repeat Rate', value: selected.repeatRate, icon: '🔄', color: '#F59E0B' },
                  ].map(s => (
                    <div key={s.label} className="cust-lifetime__card">
                      <div className="cust-lifetime__icon">{s.icon}</div>
                      <p className="cust-lifetime__val" style={{ color: s.color }}>{s.value}</p>
                      <p className="cust-lifetime__lbl">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Contact + Agent row */}
                <div className="cust-row-2">

                  {/* Contact */}
                  <div className="cust-card">
                    <p className="cust-card__title">Contact Information</p>
                    <div className="cust-contact-list">
                      <div className="cust-contact-item">
                        <div className="cust-contact-icon">
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path d="M2 3h9v7a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM2 3l4.5 4L11 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="cust-contact-lbl">Email</p>
                          <p className="cust-contact-val">{selected.email}</p>
                        </div>
                      </div>
                      <div className="cust-contact-item">
                        <div className="cust-contact-icon">
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path d="M2.5 2h2l1 2.5-1.5 1a6 6 0 003.5 3.5l1-1.5L11 8.5v2A1.5 1.5 0 019.5 12 9.5 9.5 0 011 2.5 1.5 1.5 0 012.5 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="cust-contact-lbl">Phone</p>
                          <p className="cust-contact-val">{selected.phone}</p>
                        </div>
                      </div>
                      <div className="cust-contact-item">
                        <div className="cust-contact-icon">
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <circle cx="6.5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2"/>
                            <path d="M2.5 11c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="cust-contact-lbl">Location</p>
                          <p className="cust-contact-val">{selected.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assigned agent */}
                  <div className="cust-card">
                    <p className="cust-card__title">Assigned Agent</p>
                    <div className="cust-agent">
                      <div className="cust-agent__avatar">{selected.agent.avatar}</div>
                      <div>
                        <p className="cust-agent__name">{selected.agent.name}</p>
                        <p className="cust-agent__role">Travel Consultant</p>
                      </div>
                      <button className="cust-agent__msg">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 3h8v6a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM2 3l4 3.5L10 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Message
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="cust-card">
                  <p className="cust-card__title">Travel Preferences</p>
                  <div className="cust-prefs">
                    {selected.preferences.map(p => (
                      <span key={p} className="cust-pref">{p}</span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="cust-card">
                  <p className="cust-card__title">Agent Notes</p>
                  <p className="cust-notes">{selected.notes}</p>
                  <button className="cust-add-note">+ Add note</button>
                </div>

                {/* Booking history */}
                <div className="cust-card">
                  <div className="cust-card__header">
                    <p className="cust-card__title">Booking History</p>
                    <span className="cust-card__count">{selected.bookings.length} trips</span>
                  </div>
                  <div className="cust-bookings">
                    {selected.bookings.map((b, i) => (
                      <div key={b.id} className="cust-booking-row" onClick={() => navigate('/booking')}>
                        <div className="cust-booking-num">
                          <span>{i + 1}</span>
                        </div>
                        <div className="cust-booking-info">
                          <p className="cust-booking-trip">{b.trip}</p>
                          <p className="cust-booking-id">{b.id} · {b.date}</p>
                        </div>
                        <div className="cust-booking-right">
                          <p className="cust-booking-amount">{b.amount}</p>
                          <span className={`inq-status ${STATUS_CLS[b.status]}`}>{b.status}</span>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="cust-booking-arrow">
                          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}