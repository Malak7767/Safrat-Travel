import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import './InquiryPage.css'
import '../pages/AdminDashboard.css'

const INQUIRIES = [
  {
    id: 1,
    name: 'Jinan Hasan',
    avatar: 'JH',
    avatarColor: '#3B82F6',
    trip: 'Honeymoon Package',
    destination: 'Malé, Maldives',
    dates: 'Aug 20 – Aug 26, 2025',
    budget: '$9,850',
    status: 'Quoting',
    agent: 'Layla K.',
    agentAvatar: 'LK',
    guests: 2,
    created: 'Jun 12, 2025',
    phone: '+44 7700 900123',
    email: 'jina.hasan@email.com',
    aiScore: 94,
    notes: 'Client prefers overwater bungalows. Anniversary trip — wants something special. Flexible on dates by ±3 days.',
    timeline: [
      { icon: '🤖', text: 'AI generated Maldives package quote', time: '2 hours ago', color: '#8B5CF6' },
      { icon: '📧', text: 'Initial inquiry received via website', time: 'Jun 12, 09:14', color: '#3B82F6' },
    ],
    tags: ['Honeymoon', 'Luxury', 'Beach'],
  },
  {
    id: 2,
    name: ' Jad Wehbi',
    avatar: 'JW',
    avatarColor: '#8B5CF6',
    trip: 'Tokyo Business',
    destination: 'Tokyo, Japan',
    dates: 'Sep 10 – Sep 14, 2025',
    budget: '$5,400',
    status: 'Confirmed',
    agent: 'Priya S.',
    agentAvatar: 'PS',
    guests: 1,
    created: 'Jun 10, 2025',
    phone: '+44 7700 900456',
    email: 'jad.wehbi@email.com',
    aiScore: 88,
    notes: 'Business trip. Needs hotel near Shinjuku. Prefers direct flights only. Corporate billing.',
    timeline: [
      { icon: '✅', text: 'Booking confirmed · Payment received', time: '1 day ago', color: '#10B981' },
      { icon: '📄', text: 'PDF proposal sent to client', time: 'Jun 11, 14:30', color: '#3B82F6' },
      { icon: '📧', text: 'Inquiry received via email', time: 'Jun 10, 08:00', color: '#64748B' },
    ],
    tags: ['Business', 'Solo', 'Corporate'],
  },
  {
    id: 3,
    name: 'Joyce Allam',
    avatar: 'JA',
    avatarColor: '#F59E0B',
    trip: 'Amalfi Family',
    destination: 'Amalfi, Italy',
    dates: 'Jul 18 – Jul 28, 2025',
    budget: '$12,400',
    status: 'Pending',
    agent: 'Layla K.',
    agentAvatar: 'LK',
    guests: 4,
    created: 'Jun 8, 2025',
    phone: '+44 7700 900789',
    email: 'joyce.allam@gmail.com',
    aiScore: 76,
    notes: 'Family of 4 including 2 kids (ages 8 and 11). Needs child-friendly activities. Villa preferred over hotel.',
    timeline: [
      { icon: '⏳', text: 'Awaiting client response on villa options', time: '3 days ago', color: '#F59E0B' },
      { icon: '📄', text: 'Quote sent — 3 villa options', time: 'Jun 9, 11:00', color: '#3B82F6' },
      { icon: '📧', text: 'Inquiry received', time: 'Jun 8, 16:45', color: '#64748B' },
    ],
    tags: ['Family', 'Villa', 'Italy'],
  },
  {
    id: 4,
    name: 'Rafic Younes',
    avatar: 'RY',
    avatarColor: '#EC4899',
    trip: 'Kyoto Cherry Blossom',
    destination: 'Kyoto, Japan',
    dates: 'Apr 1 – Apr 6, 2026',
    budget: '$7,200',
    status: 'Quoting',
    agent: 'Dana R.',
    agentAvatar: 'DR',
    guests: 2,
    created: 'Jun 14, 2025',
    phone: '+44 7700 900321',
    email: 'rafic.younes@email.com',
    aiScore: 91,
    notes: 'Cultural focus — temples, tea ceremonies, traditional ryokan. No modern hotels. Cherry blossom season is key.',
    timeline: [
      { icon: '🤖', text: 'AI building Kyoto cultural itinerary', time: '30 min ago', color: '#8B5CF6' },
      { icon: '📧', text: 'Inquiry received via chat widget', time: 'Jun 14, 10:22', color: '#64748B' },
    ],
    tags: ['Cultural', 'Couple', 'Japan'],
  },
  {
    id: 5,
    name: 'Daniel Achebe',
    avatar: 'DA',
    avatarColor: '#10B981',
    trip: 'Patagonia Trek',
    destination: 'Patagonia, Argentina',
    dates: 'Nov 3 – Nov 14, 2025',
    budget: '$18,600',
    status: 'Review',
    agent: 'Priya S.',
    agentAvatar: 'PS',
    guests: 3,
    created: 'Jun 6, 2025',
    phone: '+44 7700 900654',
    email: 'daniel.achebe@email.com',
    aiScore: 82,
    notes: 'Adventure trekking group of 3. Needs specialist gear coordination. Remote lodge bookings required.',
    timeline: [
      { icon: '⚠️', text: 'Manager review required — high value package', time: '5 hours ago', color: '#EF4444' },
      { icon: '📄', text: 'Draft quote under review', time: 'Jun 13, 09:00', color: '#F59E0B' },
      { icon: '📧', text: 'Inquiry received', time: 'Jun 6, 14:00', color: '#64748B' },
    ],
    tags: ['Adventure', 'Group', 'Trek'],
  },
  {
    id: 6,
    name: 'Safa Nakhle',
    avatar: 'SN',
    avatarColor: '#06B6D4',
    trip: 'Paris Luxury Weekend',
    destination: 'Paris, France',
    dates: 'Jul 4 – Jul 7, 2025',
    budget: '$4,200',
    status: 'Quoting',
    agent: 'Dana R.',
    agentAvatar: 'DR',
    guests: 2,
    created: 'Jun 15, 2025',
    phone: '+33 6 12 34 56 78',
    email: 'sofia.laurent@email.com',
    aiScore: 89,
    notes: 'Luxury weekend. Interested in Michelin-star dining experiences and private museum tours.',
    timeline: [
      { icon: '🤖', text: 'AI sourcing luxury Paris experiences', time: '1 hour ago', color: '#8B5CF6' },
      { icon: '📧', text: 'Inquiry received via referral', time: 'Jun 15, 08:30', color: '#64748B' },
    ],
    tags: ['Luxury', 'Couple', 'City'],
  },
]

const STATUS_CLS = {
  Quoting: 'status--amber',
  Confirmed: 'status--green',
  Pending: 'status--grey',
  Review: 'status--red',
}

const STATUS_ICON = {
  Quoting: '◐',
  Confirmed: '✓',
  Pending: '○',
  Review: '⚠',
}

const FILTERS = ['All', 'Quoting', 'Confirmed', 'Pending', 'Review']

export default function InquiryPage({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('Inquiries')
  const [selected, setSelected] = useState(INQUIRIES[0])
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = INQUIRIES.filter(inq => {
    const matchFilter = filter === 'All' || inq.status === filter
    const matchSearch = inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.destination.toLowerCase().includes(search.toLowerCase()) ||
      inq.trip.toLowerCase().includes(search.toLowerCase())
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
            <h1 className="admin-topbar__title">Inquiries</h1>
            <p className="admin-topbar__sync">
              <span className="sync-dot"/>
              47 total · 12 AI-managed · Updated just now
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
              New Inquiry
            </button>
          </div>
        </div>

        {/* Body — list + panel */}
        <div className="inq-body">

          {/* LEFT — list */}
          <div className="inq-list-col">

            {/* Stats row */}
            <div className="inq-stats">
              {[
                { label: 'Total', value: '47', color: '#3B82F6' },
                { label: 'Quoting', value: '18', color: '#F59E0B' },
                { label: 'Confirmed', value: '14', color: '#10B981' },
                { label: 'Pending', value: '9', color: '#94A3B8' },
                { label: 'Review', value: '6', color: '#EF4444' },
              ].map(s => (
                <div key={s.label} className="inq-stat">
                  <span className="inq-stat__val" style={{ color: s.color }}>{s.value}</span>
                  <span className="inq-stat__lbl">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Search + filters */}
            <div className="inq-controls">
              <div className="inq-search">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input
                  placeholder="Search name, destination..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="inq-filters">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    className={`inq-filter-btn ${filter === f ? 'inq-filter-btn--active' : ''}`}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="inq-list">
              {filtered.map(inq => (
                <div
                  key={inq.id}
                  className={`inq-item ${selected?.id === inq.id ? 'inq-item--active' : ''}`}
                  onClick={() => setSelected(inq)}
                >
                  <div className="inq-item__avatar" style={{ background: inq.avatarColor }}>
                    {inq.avatar}
                  </div>
                  <div className="inq-item__body">
                    <div className="inq-item__top">
                      <p className="inq-item__name">{inq.name}</p>
                      <span className={`inq-status ${STATUS_CLS[inq.status]}`}>
                        {STATUS_ICON[inq.status]} {inq.status}
                      </span>
                    </div>
                    <p className="inq-item__trip">{inq.trip}</p>
                    <div className="inq-item__meta">
                      <span>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <circle cx="5" cy="4" r="1.8" stroke="currentColor" strokeWidth="1"/>
                          <path d="M5 9C5 9 2 6.5 2 4a3 3 0 016 0C8 6.5 5 9 5 9z" stroke="currentColor" strokeWidth="1"/>
                        </svg>
                        {inq.destination}
                      </span>
                      <span>{inq.budget}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="inq-empty">
                  <p>No inquiries match your search</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — detail panel */}
          {selected && (
            <div className="inq-panel">

              {/* Panel header */}
              <div className="inq-panel__header">
                <div className="inq-panel__client">
                  <div className="inq-panel__avatar" style={{ background: selected.avatarColor }}>
                    {selected.avatar}
                  </div>
                  <div>
                    <h2 className="inq-panel__name">{selected.name}</h2>
                    <p className="inq-panel__trip">{selected.trip}</p>
                  </div>
                </div>
                <div className="inq-panel__header-right">
                  <span className={`inq-status inq-status--lg ${STATUS_CLS[selected.status]}`}>
                    {STATUS_ICON[selected.status]} {selected.status}
                  </span>
                  <button className="admin-btn admin-btn--primary">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Send Quote
                  </button>
                </div>
              </div>

              <div className="inq-panel__body">

                {/* Key info cards */}
                <div className="inq-info-grid">
                  {[
                    { label: 'Destination', value: selected.destination, icon: '📍' },
                    { label: 'Travel Dates', value: selected.dates, icon: '📅' },
                    { label: 'Budget', value: selected.budget, icon: '💰' },
                    { label: 'Guests', value: `${selected.guests} guest${selected.guests > 1 ? 's' : ''}`, icon: '👥' },
                  ].map(info => (
                    <div key={info.label} className="inq-info-card">
                      <span className="inq-info-card__icon">{info.icon}</span>
                      <div>
                        <p className="inq-info-card__label">{info.label}</p>
                        <p className="inq-info-card__value">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI score + agent */}
                <div className="inq-panel__row">

                  {/* AI Score */}
                  <div className="inq-ai-card">
                    <div className="inq-ai-card__top">
                      <div className="inq-ai-icon">🤖</div>
                      <div>
                        <p className="inq-ai-card__label">AI Match Score</p>
                        <p className="inq-ai-card__val">{selected.aiScore}%</p>
                      </div>
                      <div className="inq-ai-ring">
                        <svg width="48" height="48" viewBox="0 0 48 48">
                          <circle cx="24" cy="24" r="20" fill="none" stroke="#F1F5F9" strokeWidth="4"/>
                          <circle
                            cx="24" cy="24" r="20"
                            fill="none"
                            stroke={selected.aiScore >= 90 ? '#10B981' : selected.aiScore >= 75 ? '#3B82F6' : '#F59E0B'}
                            strokeWidth="4"
                            strokeDasharray={`${(selected.aiScore / 100) * 125.6} 125.6`}
                            strokeLinecap="round"
                            transform="rotate(-90 24 24)"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="inq-ai-card__desc">AI confidence in package recommendations</p>
                  </div>

                  {/* Agent */}
                  <div className="inq-agent-card">
                    <p className="inq-agent-card__label">Assigned Agent</p>
                    <div className="inq-agent-card__agent">
                      <div className="table-avatar" style={{ background: '#64748B', width: 38, height: 38, fontSize: 13 }}>
                        {selected.agentAvatar}
                      </div>
                      <div>
                        <p className="inq-agent-card__name">{selected.agent}</p>
                        <p className="inq-agent-card__role">Travel Consultant</p>
                      </div>
                    </div>
                    <div className="inq-agent-card__contact">
                      <button className="inq-contact-btn">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 3h8v6a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM2 3l4 3.5L10 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Message
                      </button>
                      <button className="inq-contact-btn">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 2h2l1 2.5-1.5 1a6 6 0 003.5 3.5l1-1.5L11 8.5v2A1.5 1.5 0 019.5 12 9.5 9.5 0 011 2.5 1.5 1.5 0 012.5 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Call
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact info */}
                <div className="inq-contact-card">
                  <p className="inq-section-title">Client Contact</p>
                  <div className="inq-contact-rows">
                    <div className="inq-contact-row">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 3h9v7a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM2 3l4.5 4L11 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{selected.email}</span>
                    </div>
                    <div className="inq-contact-row">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2.5 2h2l1 2.5-1.5 1a6 6 0 003.5 3.5l1-1.5L11 8.5v2A1.5 1.5 0 019.5 11 9.5 9.5 0 011 1.5 1.5 1.5 0 012.5 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      <span>{selected.phone}</span>
                    </div>
                    <div className="inq-contact-row">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <rect x="1" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M4 1v2M9 1v2M1 6h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      <span>Inquiry received {selected.created}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="inq-tags-wrap">
                  {selected.tags.map(tag => (
                    <span key={tag} className="inq-tag">{tag}</span>
                  ))}
                </div>

                {/* Notes */}
                <div className="inq-notes-card">
                  <p className="inq-section-title">Agent Notes</p>
                  <p className="inq-notes-text">{selected.notes}</p>
                  <button className="inq-notes-add">+ Add note</button>
                </div>

                {/* Timeline */}
                <div className="inq-timeline">
                  <p className="inq-section-title">Activity Timeline</p>
                  {selected.timeline.map((t, i) => (
                    <div key={i} className="inq-timeline-item">
                      <div className="inq-timeline-icon" style={{ background: t.color + '18', color: t.color }}>
                        {t.icon}
                      </div>
                      <div className="inq-timeline-body">
                        <p className="inq-timeline-text">{t.text}</p>
                        <p className="inq-timeline-time">{t.time}</p>
                      </div>
                      {i < selected.timeline.length - 1 && (
                        <div className="inq-timeline-line"/>
                      )}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="inq-panel__actions">
                  <button className="admin-btn admin-btn--ghost" style={{ flex: 1 }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 2v7M3.5 6l3 3 3-3M2 11h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Export PDF
                  </button>
                  <button className="admin-btn admin-btn--ghost" style={{ flex: 1 }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M9 1H4a1 1 0 00-1 1v9a1 1 0 001 1h6a1 1 0 001-1V4L9 1zM9 1v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Convert to Booking
                  </button>
                  <button className="admin-btn admin-btn--primary" style={{ flex: 1 }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Send Quote
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}