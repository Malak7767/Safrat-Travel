import { useState } from 'react'
import './SuppliersPage.css'
import AdminSidebar from '../components/AdminSidebar'
import '../pages/AdminDashboard.css'
import su1 from '../assets/images/su1.jpg'
import su2 from '../assets/images/su2.jpg'
import su3 from '../assets/images/su3.jpg'
import su4 from '../assets/images/su4.jpg'
import su5 from '../assets/images/su5.jpg'
import su6 from '../assets/images/su6.jpg'
import su7 from '../assets/images/s7.jpg'
import su8 from '../assets/images/su8.jpg'
const SUPPLIERS = [
  {
    id: 1, name: 'Soneva Jani', category: 'Hotel', country: 'Maldives', flag: '🇲🇻',
    logo: 'SJ', color: '#0891b2',
    status: 'active', tier: 'Preferred',
    image: su1,
    rating: 4.9, bookings: 34, revenue: '$142,000',
    contact: 'reservations@soneva.com', phone: '+960 656 0304',
    commission: '12%', responseTime: '< 2h',
    tags: ['Luxury', 'Overwater', 'All-inclusive'],
    lastBooking: '2 days ago',
  },
  {
    id: 2, name: 'British Airways', category: 'Airline', country: 'United Kingdom', flag: '🇬🇧',
    logo: 'BA', color: '#1d4ed8',
    status: 'active', tier: 'Corporate',
    image:su2,
    rating: 4.6, bookings: 128, revenue: '$384,000',
    contact: 'corporate@ba.com', phone: '+44 207 123 4567',
    commission: '7%', responseTime: '< 30m',
    tags: ['Business Class', 'GDS Connected', 'Global'],
    lastBooking: 'Today',
  },
  {
    id: 3, name: 'Canaves Oia Epitome', category: 'Hotel', country: 'Greece', flag: '🇬🇷',
    logo: 'CO', color: '#0f2044',
    status: 'active', tier: 'Preferred',
    image:su3,
    rating: 4.9, bookings: 21, revenue: '$98,400',
    contact: 'info@canaves.com', phone: '+30 228 607 1453',
    commission: '10%', responseTime: '< 4h',
    tags: ['Luxury', 'Boutique', 'Caldera View'],
    lastBooking: '5 days ago',
  },
  {
    id: 4, name: 'Swiss Air', category: 'Airline', country: 'Switzerland', flag: '🇨🇭',
    logo: 'LX', color: '#dc2626',
    status: 'active', tier: 'Corporate',
    image:su4,
    rating: 4.8, bookings: 76, revenue: '$228,000',
    contact: 'b2b@swiss.com', phone: '+41 848 700 700',
    commission: '8%', responseTime: '< 1h',
    tags: ['Business Class', 'Alpine Routes', 'GDS Connected'],
    lastBooking: 'Yesterday',
  },
  {
    id: 5, name: 'Maldives Seaplane Co.', category: 'Transfer', country: 'Maldives', flag: '🇲🇻',
    logo: 'MS', color: '#0891b2',
    status: 'active', tier: 'Standard',
    image:su5,
    rating: 4.7, bookings: 58, revenue: '$52,200',
    contact: 'ops@maldivesseaplane.com', phone: '+960 332 1212',
    commission: '15%', responseTime: '< 6h',
    tags: ['Seaplane', 'Private', 'Island Transfers'],
    lastBooking: '3 days ago',
  },
  {
    id: 6, name: 'Kyoto Private Tours', category: 'Experience', country: 'Japan', flag: '🇯🇵',
    logo: 'KP', color: '#b45309',
    status: 'pending', tier: 'Standard',
    image:su6,
    rating: 4.8, bookings: 12, revenue: '$18,600',
    contact: 'info@kyotoprivatetours.com', phone: '+81 75 123 4567',
    commission: '18%', responseTime: '< 12h',
    tags: ['Cultural', 'Private Guide', 'Temple Access'],
    lastBooking: '2 weeks ago',
  },
  {
    id: 7, name: 'Villa Treville Amalfi', category: 'Hotel', country: 'Italy', flag: '🇮🇹',
    logo: 'VT', color: '#059669',
    status: 'review', tier: 'Preferred',
    image:su7,
    rating: 4.8, bookings: 8, revenue: '$76,800',
    contact: 'reservations@villatreville.it', phone: '+39 089 872 3633',
    commission: '11%', responseTime: '< 8h',
    tags: ['Ultra-Luxury', 'Cliffside', 'Private Pool'],
    lastBooking: '1 week ago',
  },
  {
    id: 8, name: 'Emirates', category: 'Airline', country: 'UAE', flag: '🇦🇪',
    logo: 'EK', color: '#b91c1c',
    status: 'active', tier: 'Corporate',
    image:su8,
    rating: 4.9, bookings: 94, revenue: '$310,000',
    contact: 'trade@emirates.com', phone: '+971 4 708 1111',
    commission: '9%', responseTime: '< 45m',
    tags: ['First Class', 'Global Hub', 'GDS Connected'],
    lastBooking: 'Today',
  },
]

const CATEGORIES = ['All', 'Hotel', 'Airline', 'Transfer', 'Experience']
const TIERS = ['All tiers', 'Preferred', 'Corporate', 'Standard']

const STATUS_MAP = {
  active:  { label: 'Active',  cls: 'sp-status--green' },
  pending: { label: 'Pending', cls: 'sp-status--amber' },
  review:  { label: 'Review',  cls: 'sp-status--red' },
}

const TIER_MAP = {
  Preferred: 'sp-tier--gold',
  Corporate: 'sp-tier--blue',
  Standard:  'sp-tier--grey',
}

const CAT_ICONS = {
  Hotel: '🏨', Airline: '✈️', Transfer: '🚗', Experience: '🎯',
}

export default function SuppliersPage({ user, onLogout }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [tier, setTier] = useState('All tiers')
  const [selected, setSelected] = useState(null)
  const [view, setView] = useState('grid') // 'grid' | 'list'
  const [activeNav, setActiveNav] = useState('Suppliers')

  const filtered = SUPPLIERS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.country.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || s.category === category
    const matchTier = tier === 'All tiers' || s.tier === tier
    return matchSearch && matchCat && matchTier
  })

  const content = selected ? (
    <SupplierDetail supplier={selected} onBack={() => setSelected(null)} />
  ) : (
    <div className="sp">

      {/* ── Header ── */}
      <div className="sp-header">
        <div className="sp-header__left">
          
          <div>
            <h2 className="sp-header__title">Suppliers</h2>
            <p className="sp-header__sub">{SUPPLIERS.length} partners · {SUPPLIERS.filter(s => s.status === 'active').length} active</p>
          </div>
        </div>
        <div className="sp-header__right">
          <button className="sp-view-btn" onClick={() => setView(v => v === 'grid' ? 'list' : 'grid')}>
            {view === 'grid'
              ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
              : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            }
          </button>
          <button className="sp-add-btn">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            Add Supplier
          </button>
        </div>
      </div>
      

      {/* ── KPI strip ── */}
      <div className="sp-kpis">
        {[
          { label: 'Total suppliers', value: SUPPLIERS.length, icon: '🤝' },
          { label: 'Total revenue', value: '$1.31M', icon: '💰' },
          { label: 'Avg. commission', value: '11%', icon: '📊' },
          { label: 'Pending contracts', value: '2', icon: '⏳' },
        ].map(k => (
          <div key={k.label} className="sp-kpi">
            <span className="sp-kpi__icon">{k.icon}</span>
            <span className="sp-kpi__val">{k.value}</span>
            <span className="sp-kpi__lbl">{k.label}</span>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="sp-filters">
        <div className="sp-search-wrap">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M9.5 9.5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <input className="sp-search" placeholder="Search suppliers, countries..." value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <div className="sp-filter-tabs">
          {CATEGORIES.map(c => (
            <button key={c} className={`sp-filter-tab ${category === c ? 'sp-filter-tab--active' : ''}`} onClick={() => setCategory(c)}>
              {c !== 'All' && CAT_ICONS[c]} {c}
            </button>
          ))}
        </div>
        <select className="sp-select" value={tier} onChange={e => setTier(e.target.value)}>
          {TIERS.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* ── Grid / List ── */}
      <div className="sp-body">
        {view === 'grid' ? (
          <div className="sp-grid">
            {filtered.map(s => (
              <div key={s.id} className="sp-card" onClick={() => setSelected(s)}>
               <div className="sp-card__header">
  {s.image ? (
    <div className="sp-card__img-wrap">
      <img className="sp-card__img" src={s.image} alt={s.name} />
      <div className="sp-card__header-badges">
        <span className={`sp-status ${STATUS_MAP[s.status].cls}`}>{STATUS_MAP[s.status].label}</span>
        <span className={`sp-tier ${TIER_MAP[s.tier]}`}>{s.tier}</span>
      </div>
    </div>
  ) : (
    <>
      <div className="sp-card__logo" style={{ background: s.color + '18', color: s.color }}>
        {s.logo}
      </div>
      <div className="sp-card__header-right">
        <span className={`sp-status ${STATUS_MAP[s.status].cls}`}>{STATUS_MAP[s.status].label}</span>
        <span className={`sp-tier ${TIER_MAP[s.tier]}`}>{s.tier}</span>
      </div>
    </>
  )}
</div>
                <div className="sp-card__body">
                  <p className="sp-card__name">{s.name}</p>
                  <p className="sp-card__meta">{s.flag} {s.country} · {CAT_ICONS[s.category]} {s.category}</p>
                  <div className="sp-card__stats">
                    <div className="sp-card__stat">
                      <span className="sp-card__stat-val">{'★'.repeat(Math.floor(s.rating))} {s.rating}</span>
                      <span className="sp-card__stat-lbl">Rating</span>
                    </div>
                    <div className="sp-card__stat">
                      <span className="sp-card__stat-val">{s.bookings}</span>
                      <span className="sp-card__stat-lbl">Bookings</span>
                    </div>
                    <div className="sp-card__stat">
                      <span className="sp-card__stat-val">{s.commission}</span>
                      <span className="sp-card__stat-lbl">Commission</span>
                    </div>
                  </div>
                  <div className="sp-card__tags">
                    {s.tags.slice(0, 2).map(t => <span key={t} className="sp-tag">{t}</span>)}
                  </div>
                </div>
                <div className="sp-card__footer">
                  <span className="sp-card__last">Last booking: {s.lastBooking}</span>
                  <span className="sp-card__revenue">{s.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="sp-list">
            <div className="sp-list__header">
              <span>Supplier</span><span>Category</span><span>Status</span><span>Bookings</span><span>Revenue</span><span>Commission</span><span>Response</span><span></span>
            </div>
            {filtered.map(s => (
              <div key={s.id} className="sp-list__row" onClick={() => setSelected(s)}>
                <div className="sp-list__name">
                  <div className="sp-list__logo" style={{ background: s.color + '18', color: s.color }}>{s.logo}</div>
                  <div>
                    <p>{s.name}</p>
                    <span>{s.flag} {s.country}</span>
                  </div>
                </div>
                <span className="sp-list__cat">{CAT_ICONS[s.category]} {s.category}</span>
                <span className={`sp-status ${STATUS_MAP[s.status].cls}`}>{STATUS_MAP[s.status].label}</span>
                <span className="sp-list__val">{s.bookings}</span>
                <span className="sp-list__val sp-list__val--strong">{s.revenue}</span>
                <span className="sp-list__val">{s.commission}</span>
                <span className="sp-list__val">{s.responseTime}</span>
                <button className="sp-list__action">View →</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="admin">
      <AdminSidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        user={user}
        onLogout={onLogout}
      />

      <div className="admin-main">
        {content}
      </div>
    </div>
  )
}

function SupplierDetail({ supplier: s, onBack }) {
  const [tab, setTab] = useState('overview')
  return (
    <div className="sp-detail">
      <div className="sp-detail__topbar">
        <button className="sp-back" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All Suppliers
        </button>
        <div className="sp-detail__actions">
          <button className="sp-btn sp-btn--ghost">Edit</button>
          <button className="sp-btn sp-btn--ghost">Contract PDF</button>
          <button className="sp-btn sp-btn--primary">New Booking</button>
        </div>
      </div>

      <div className="sp-detail__hero" style={{ borderTop: `4px solid ${s.color}` }}>
        <div className="sp-detail__logo" style={{ background: s.color + '18', color: s.color }}>{s.logo}</div>
        <div className="sp-detail__info">
          <div className="sp-detail__info-top">
            <h2 className="sp-detail__name">{s.name}</h2>
            <span className={`sp-status ${STATUS_MAP[s.status].cls}`}>{STATUS_MAP[s.status].label}</span>
            <span className={`sp-tier ${TIER_MAP[s.tier]}`}>{s.tier}</span>
          </div>
          <p className="sp-detail__meta">{s.flag} {s.country} · {CAT_ICONS[s.category]} {s.category}</p>
          <div className="sp-detail__tags">
            {s.tags.map(t => <span key={t} className="sp-tag">{t}</span>)}
          </div>
        </div>
        <div className="sp-detail__kpis">
          {[
            { label: 'Total revenue', value: s.revenue },
            { label: 'Bookings', value: s.bookings },
            { label: 'Commission', value: s.commission },
            { label: 'Response time', value: s.responseTime },
          ].map(k => (
            <div key={k.label} className="sp-detail__kpi">
              <span className="sp-detail__kpi-val">{k.value}</span>
              <span className="sp-detail__kpi-lbl">{k.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sp-detail__tabs">
        {['overview', 'bookings', 'contract', 'contacts'].map(t => (
          <button key={t} className={`sp-dtab ${tab === t ? 'sp-dtab--active' : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="sp-detail__body">
        {tab === 'overview' && (
          <div className="sp-detail__overview">
            <div className="sp-info-card">
              <h4 className="sp-info-card__title">Contact details</h4>
              <div className="sp-info-row">
                <span>✉️</span><span>{s.contact}</span>
              </div>
              <div className="sp-info-row">
                <span>📞</span><span>{s.phone}</span>
              </div>
              <div className="sp-info-row">
                <span>🕐</span><span>Response time: {s.responseTime}</span>
              </div>
            </div>
            <div className="sp-info-card">
              <h4 className="sp-info-card__title">Commercial terms</h4>
              <div className="sp-info-row">
                <span>💰</span><span>Commission rate: <strong>{s.commission}</strong></span>
              </div>
              <div className="sp-info-row">
                <span>⭐</span><span>Rating: <strong>{s.rating} / 5.0</strong></span>
              </div>
              <div className="sp-info-row">
                <span>📅</span><span>Last booking: <strong>{s.lastBooking}</strong></span>
              </div>
            </div>
          </div>
        )}
        {tab === 'bookings' && (
          <div className="sp-placeholder">
            <span>📋</span>
            <p>Booking history for {s.name}</p>
            <span className="sp-placeholder__sub">{s.bookings} total bookings · {s.revenue} revenue</span>
          </div>
        )}
        {tab === 'contract' && (
          <div className="sp-placeholder">
            <span>📄</span>
            <p>Contract & SLA documents</p>
            <span className="sp-placeholder__sub">Commission agreement, terms, rate sheets</span>
          </div>
        )}
        {tab === 'contacts' && (
          <div className="sp-placeholder">
            <span>👥</span>
            <p>Key contacts at {s.name}</p>
            <span className="sp-placeholder__sub">Account managers, reservations, emergency</span>
          </div>
        )}
      </div>
    </div>
  )
}