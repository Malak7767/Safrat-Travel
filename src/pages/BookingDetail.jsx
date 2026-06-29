import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import './BookingDetail.css'
import '../pages/AdminDashboard.css'

import d6 from '../assets/images/d6.jpg'
import d2 from '../assets/images/d2.avif'
import d3 from '../assets/images/d3.jpg'
import d4 from '../assets/images/d4.jpg'
import d5 from '../assets/images/d5.png'

const BOOKING = {
  id: 'SAF-2049',
  client: { name: 'James Thornton', avatar: 'JT', trip: 'Honeymoon Package' },
  destination: 'Malé, Maldives',
  hero: d6,
  badge: 'HONEYMOON PACKAGE',
  dates: 'Aug 20 – Aug 26, 2025',
  nights: 6,
  guests: 2,
  route: 'London Heathrow → Velana Intl',
  status: 'Quoting',
  aiScore: 94,
  segments: 11,
  total: '$9,850',
  agent: { name: 'Dana R.', avatar: 'DR', role: 'Lead Agent' },
  costBreakdown: [
    { icon: '✈️', label: 'Flights (2 persons, return)', amount: '$6,400' },
    { icon: '🏨', label: 'Soneva Jani · 5 nights', amount: '$4,200' },
    { icon: '🚤', label: 'Transfers & seaplane', amount: '$960' },
    { icon: '🤿', label: 'Activities & experiences', amount: '$680' },
  ],
  days: [
    {
      id: 1,
      dayNum: 1,
      dayLabel: 'WED, AUG 20 · DEPARTURE',
      segments: [
        {
          id: 's1',
          time: '07:15',
          period: 'AM',
          timeLabel: 'Depart',
          image: d2,
          icon: '✈️',
          title: 'British Airways · BA0197',
          subtitle: 'London Heathrow (LHR) → Velana Intl (MLE)',
          detail: 'Business Class · 2 seats · ~10h 45m direct',
          tags: ['In-flight meals included', '2x 32kg checked'],
          price: '$3,200 / person',
          status: 'Seats held',
          statusCls: 'seg-status--blue',
        },
      ],
    },
    {
      id: 2,
      dayNum: 2,
      dayLabel: 'THU, AUG 21 · ARRIVAL',
      segments: [
        {
          id: 's2',
          time: '09:00',
          period: 'AM',
          timeLabel: 'Arrive',
          image: d3,
          icon: '🤿',
          title: 'Private Snorkelling Expedition',
          subtitle: 'Guided · House Reef · 3 hours · Equipment included',
          detail: 'Marine biologist guide · Shark & ray spotting',
          tags: [],
          price: '$320',
          status: 'Booked',
          statusCls: 'seg-status--green',
        },
        {
          id: 's3',
          time: '15:00',
          period: 'PM',
          timeLabel: '',
          image: d4,
          icon: '💆',
          title: 'Couples Spa Ritual',
          subtitle: 'Soneva Jani Spa · 90-min ritual · Coconut & lemongrass',
          detail: '"Based on couple preference data & high reviews from similar guests"',
          tags: [],
          price: '$680',
          status: 'AI Pick',
          statusCls: 'seg-status--purple',
          isAI: true,
          aiNote: 'Generated for James & partner · 94% match score',
        },
      ],
    },
    {
      id: 3,
      dayNum: '4–5',
      dayLabel: 'SAT–SUN, AUG 23–24 · LEISURE DAYS',
      isGroup: true,
      groupSummary: '3 Activities Planned',
      groupDetail: 'Dolphin cruise · Island hopping · Sunset kayak',
      confirmed: 2,
    },
    {
      id: 4,
      dayNum: 6,
      dayLabel: 'TUE, AUG 26 · DEPARTURE',
      segments: [
        {
          id: 's4',
          time: '11:30',
          period: 'AM',
          timeLabel: 'Depart',
          image: d5,
          icon: '✈️',
          title: 'Return Flight · BA0198',
          subtitle: 'Velana Intl (MLE) → London Heathrow (LHR) · Business Class',
          detail: 'Check out 10:00 · Resort transfer included',
          tags: [],
          price: '$3,200',
          status: 'Pending',
          statusCls: 'seg-status--amber',
        },
      ],
    },
  ],
}

export default function BookingDetail({ user, onLogout,booking }) {
  const [collapsed, setCollapsed] = useState({})
  const [activeNav, setActiveNav] = useState('Bookings')
  const navigate = useNavigate()
   const B = booking || BOOKING
  const toggleDay = (id) => setCollapsed(p => ({ ...p, [id]: !p[id] }))

  return (
    <div className="admin">

      <AdminSidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        user={user}
        onLogout={onLogout}
      />

      <div className="admin-main">
        <div className="bk">

          {/* ── Topbar ── */}
          <div className="bk-topbar">
            <button className="bk-back" onClick={() => navigate('/admin')}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Dashboard
            </button>

            <div className="bk-topbar__client">
              <div className="bk-client-avatar">{B.client.avatar}</div>
              <div>
                <p className="bk-client-name">{B.client.name}</p>
                <p className="bk-client-trip">{B.client.trip}</p>
              </div>
            </div>

            <div className="bk-topbar__center">
              <span className="bk-status-badge">● {B.status}</span>
              <div className="bk-price-wrap">
                <span className="bk-price-label">Total package price</span>
                <span className="bk-price">{B.total}</span>
              </div>
              <span className="bk-persons">/ {B.guests} persons</span>
            </div>

            <div className="bk-topbar__actions">
              <button className="bk-btn bk-btn--ghost">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 10h9M6.5 2v6M3.5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Export PDF
              </button>
              <button className="bk-btn bk-btn--ghost">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="10" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="3" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="10" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M4.5 5.8l3.5-2M4.5 7.2l3.5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Share
              </button>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="bk-body">

            {/* ── Hero ── */}
            <div className="bk-hero">
              <img
                src={B.hero}
                alt={B.destination}
                className="bk-hero__img"
                onError={e => e.target.style.display = 'none'}
              />
              <div className="bk-hero__overlay"/>
              <div className="bk-hero__agent">
                <div className="bk-agent-avatar">{B.agent.avatar}</div>
                <div>
                  <p className="bk-agent-name">{B.agent.name}</p>
                  <p className="bk-agent-role">{B.agent.role}</p>
                </div>
              </div>
              <div className="bk-hero__content">
                <span className="bk-hero__badge">{B.badge}</span>
                <div className="bk-hero__date">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="white" strokeWidth="1.1"/>
                    <path d="M4 1v2M8 1v2M1 5.5h10" stroke="white" strokeWidth="1.1" strokeLinecap="round"/>
                  </svg>
                  {B.dates}
                </div>
              </div>
              <div className="bk-hero__bottom">
                <h1 className="bk-hero__title">{B.destination}</h1>
                <div className="bk-hero__meta">
                  <span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 10h10M6 2a2 2 0 100 4 2 2 0 000-4z" stroke="white" strokeWidth="1.1" strokeLinecap="round"/>
                      <path d="M2 10c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="1.1" strokeLinecap="round"/>
                    </svg>
                    {B.nights} nights
                  </span>
                  <span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1l1.2 2.5L10 4l-2 2 .5 3L6 8l-2.5 1 .5-3L2 4l2.8-.5L6 1z" stroke="white" strokeWidth="1.1" strokeLinejoin="round"/>
                    </svg>
                    {B.guests} guests
                  </span>
                  <span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="4" r="2" stroke="white" strokeWidth="1.1"/>
                      <path d="M2 11c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="1.1" strokeLinecap="round"/>
                    </svg>
                    {B.route}
                  </span>
                </div>
                <div className="bk-hero__stats">
                  <div className="bk-hero__stat">
                    <span className="bk-hero__stat-val">{B.segments}</span>
                    <span className="bk-hero__stat-lbl">SEGMENTS</span>
                  </div>
                  <div className="bk-hero__stat-div"/>
                  <div className="bk-hero__stat">
                    <span className="bk-hero__stat-dot"/>
                    <span className="bk-hero__stat-val">{B.status}</span>
                    <span className="bk-hero__stat-lbl">STATUS</span>
                  </div>
                  <div className="bk-hero__stat-div"/>
                  <div className="bk-hero__stat">
                    <span className="bk-hero__stat-val ai-score">{B.aiScore}%</span>
                    <span className="bk-hero__stat-lbl">AI SCORE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Itinerary ── */}
            <div className="bk-itin">
              <div className="bk-itin__header">
                <div>
                  <h3 className="bk-itin__title">Day-by-Day Itinerary</h3>
                  <p className="bk-itin__sub">6 days · 11 segments · AI-optimised</p>
                </div>
                <div className="bk-itin__actions">
                  <button className="bk-btn bk-btn--ghost bk-btn--sm">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4h8M4 7h4M5 10h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    Collapse All
                  </button>
                  <button className="bk-btn bk-btn--outline bk-btn--sm">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    Add Segment
                  </button>
                </div>
              </div>

              {/* Days */}
              <div className="bk-days">
                {(B.days || BOOKING.days).map((day, di) => (
                  <div key={day.id} className="bk-day">
                    <div className="bk-day__track">
                      <div className="bk-day__num">
                        <span className="bk-day__num-label">DAY</span>
                        <span className="bk-day__num-val">{day.dayNum}</span>
                      </div>
                      {di < (B.days || BOOKING.days).length - 1 && <div className="bk-day__line"/>}
                    </div>

                    <div className="bk-day__content">
                      <p className="bk-day__label">{day.dayLabel}</p>

                      {/* Group day */}
                      {day.isGroup && (
                        <div className="bk-group-card">
                          <div className="bk-group-card__left">
                            <div className="bk-group-icon">🌊</div>
                            <div>
                              <p className="bk-group-title">{day.groupSummary}</p>
                              <p className="bk-group-detail">{day.groupDetail}</p>
                            </div>
                          </div>
                          <div className="bk-group-card__right">
                            <span className="seg-status seg-status--green">{day.confirmed} confirmed</span>
                            <button className="bk-btn bk-btn--ghost bk-btn--sm">Expand</button>
                          </div>
                        </div>
                      )}

                      {/* Segments */}
                      {!day.isGroup && day.segments?.map(seg => (
                        <div key={seg.id} className={`bk-seg ${seg.isAI ? 'bk-seg--ai' : ''}`}>
                          {seg.isAI && (
                            <div className="bk-seg__ai-header">
                              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1"/>
                                <path d="M3.5 5.5h4M5.5 3.5v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                              </svg>
                              AI RECOMMENDATION
                              <span className="bk-seg__ai-score">
                                Generated for {B.client.name} & partner · 94% match score
                              </span>
                            </div>
                          )}
                          <div className="bk-seg__inner">
                            <div className="bk-seg__time">
                              <span className="bk-seg__period">{seg.period}</span>
                              <span className="bk-seg__clock">{seg.time}</span>
                              {seg.timeLabel && <span className="bk-seg__timelabel">{seg.timeLabel}</span>}
                            </div>
                            <div className="bk-seg__img">
                              <img
                                src={seg.image}
                                alt={seg.title}
                                onError={e => e.target.style.display = 'none'}
                              />
                            </div>
                            <div className="bk-seg__body">
                              <div className="bk-seg__title-row">
                                <span className="bk-seg__icon">{seg.icon}</span>
                                <p className="bk-seg__title">{seg.title}</p>
                                {seg.isAI && <span className="bk-seg__aipick">AI Pick</span>}
                              </div>
                              <p className="bk-seg__subtitle">{seg.subtitle}</p>
                              <p className="bk-seg__detail">{seg.detail}</p>
                              {seg.tags.length > 0 && (
                                <div className="bk-seg__tags">
                                  {seg.tags.map(t => (
                                    <span key={t} className="bk-seg__tag">
                                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 5l2.5 2.5 3.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="bk-seg__right">
                              <span className={`seg-status ${seg.statusCls}`}>
                                {seg.status === 'Booked' ? '+ '
                                  : seg.status === 'AI Pick' ? ''
                                  : seg.status === 'Seats held' ? '+ '
                                  : '+ '}
                                {seg.status}
                              </span>
                              {seg.isAI
                                ? <button className="bk-add-btn">Add</button>
                                : <span className="bk-seg__price">{seg.price}</span>
                              }
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost breakdown */}
              <div className="bk-cost">
                <h3 className="bk-cost__title">Package Cost Breakdown</h3>
                {(B.costBreakdown || BOOKING.costBreakdown).map(item => (
                  <div key={item.label} className="bk-cost__row">
                    <div className="bk-cost__left">
                      <span className="bk-cost__icon">{item.icon}</span>
                      <span className="bk-cost__label">{item.label}</span>
                    </div>
                    <span className="bk-cost__amount">{item.amount}</span>
                  </div>
                ))}
                <div className="bk-cost__total">
                  <span>Total package</span>
                  <strong>{B.total}</strong>
                </div>
                
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}