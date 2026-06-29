import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import './ReportsPage.css'
import '../pages/AdminDashboard.css'

const PERIODS = ['This Week', 'This Month', 'This Quarter', 'This Year']

const METRICS = [
  { label: 'Total Revenue', value: '$2.4M', change: '+22.1%', up: true, icon: '💰', color: '#10B981', light: 'rgba(16,185,129,0.08)' },
  { label: 'Total Bookings', value: '284', change: '+8.2%', up: true, icon: '📋', color: '#3B82F6', light: 'rgba(59,130,246,0.08)' },
  { label: 'Conversion Rate', value: '38.4%', change: '+4.1%', up: true, icon: '📈', color: '#8B5CF6', light: 'rgba(139,92,246,0.08)' },
  { label: 'Avg Trip Value', value: '$8,450', change: '-2.3%', up: false, icon: '✈️', color: '#F59E0B', light: 'rgba(245,158,11,0.08)' },
]

const MONTHLY = [
  { month: 'Jan', revenue: 180000, bookings: 22 },
  { month: 'Feb', revenue: 210000, bookings: 26 },
  { month: 'Mar', revenue: 195000, bookings: 24 },
  { month: 'Apr', revenue: 240000, bookings: 30 },
  { month: 'May', revenue: 280000, bookings: 35 },
  { month: 'Jun', revenue: 320000, bookings: 40 },
  { month: 'Jul', revenue: 350000, bookings: 44 },
  { month: 'Aug', revenue: 290000, bookings: 36 },
  { month: 'Sep', revenue: 260000, bookings: 32 },
  { month: 'Oct', revenue: 300000, bookings: 38 },
  { month: 'Nov', revenue: 340000, bookings: 42 },
  { month: 'Dec', revenue: 230000, bookings: 15 },
]

const DESTINATIONS = [
  { rank: 1, name: 'Maldives', region: 'South Asia', bookings: 42, revenue: '$412,000', avg: '$9,800', growth: '+18%', up: true },
  { rank: 2, name: 'Kyoto, Japan', region: 'East Asia', bookings: 38, revenue: '$285,000', avg: '$7,500', growth: '+24%', up: true },
  { rank: 3, name: 'Amalfi Coast', region: 'Europe', bookings: 35, revenue: '$378,000', avg: '$10,800', growth: '+12%', up: true },
  { rank: 4, name: 'Santorini', region: 'Europe', bookings: 30, revenue: '$225,000', avg: '$7,500', growth: '+9%', up: true },
  { rank: 5, name: 'Patagonia', region: 'South America', bookings: 18, revenue: '$320,000', avg: '$17,800', growth: '-3%', up: false },
  { rank: 6, name: 'Tokyo', region: 'East Asia', bookings: 28, revenue: '$152,000', avg: '$5,400', growth: '+31%', up: true },
  { rank: 7, name: 'Bali', region: 'South East Asia', bookings: 24, revenue: '$168,000', avg: '$7,000', growth: '+6%', up: true },
]

const AGENTS = [
  { name: 'Layla K.', avatar: 'LK', color: '#3B82F6', role: 'Senior Agent', bookings: 94, revenue: '$820,000', conversion: '42%', avgValue: '$8,723', rating: 4.9 },
  { name: 'Priya S.', avatar: 'PS', color: '#8B5CF6', role: 'Senior Agent', bookings: 88, revenue: '$760,000', conversion: '39%', avgValue: '$8,636', rating: 4.8 },
  { name: 'Dana R.', avatar: 'DR', color: '#10B981', role: 'Agent', bookings: 62, revenue: '$520,000', conversion: '35%', avgValue: '$8,387', rating: 4.7 },
  { name: 'Tom W.', avatar: 'TW', color: '#F59E0B', role: 'Junior Agent', bookings: 40, revenue: '$300,000', conversion: '28%', avgValue: '$7,500', rating: 4.5 },
]

function RevenueBar({ data }) {
  const max = Math.max(...data.map(d => d.revenue))
  return (
    <div className="rep-bar-chart">
      {data.map(d => (
        <div key={d.month} className="rep-bar-col">
          <div className="rep-bar-wrap">
            <div
              className="rep-bar"
              style={{ height: `${(d.revenue / max) * 100}%` }}
            >
              <div className="rep-bar-tooltip">
                ${(d.revenue / 1000).toFixed(0)}k · {d.bookings} bookings
              </div>
            </div>
          </div>
          <p className="rep-bar-label">{d.month}</p>
        </div>
      ))}
    </div>
  )
}

export default function ReportsPage({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('Reports')
  const [period, setPeriod] = useState('This Year')
  const [activeTab, setActiveTab] = useState('destinations')

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
            <h1 className="admin-topbar__title">Reports & Analytics</h1>
            <p className="admin-topbar__sync">
              <span className="sync-dot"/>
              Live data · Last updated just now
            </p>
          </div>
          <div className="admin-topbar__actions">
            <div className="rep-periods">
              {PERIODS.map(p => (
                <button
                  key={p}
                  className={`rep-period-btn ${period === p ? 'rep-period-btn--active' : ''}`}
                  onClick={() => setPeriod(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <button className="admin-btn admin-btn--ghost">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 2v7M3.5 6l3 3 3-3M2 11h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export PDF
            </button>
            <button className="admin-btn admin-btn--ghost">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 2h9v9H2zM5 2v9M2 5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        <div className="admin-content">

          {/* Metric cards */}
          <div className="rep-metrics">
            {METRICS.map(m => (
              <div key={m.label} className="rep-metric-card" style={{ '--m-color': m.color, '--m-light': m.light }}>
                <div className="rep-metric-card__top">
                  <div className="rep-metric-card__icon">
                    {m.icon}
                  </div>
                  <span className={`rep-change ${m.up ? 'rep-change--up' : 'rep-change--down'}`}>
                    {m.up ? '↑' : '↓'} {m.change}
                  </span>
                </div>
                <p className="rep-metric-card__value">{m.value}</p>
                <p className="rep-metric-card__label">{m.label}</p>
                <p className="rep-metric-card__period">vs previous {period.toLowerCase()}</p>
              </div>
            ))}
          </div>

          {/* Revenue chart */}
          <div className="rep-card">
            <div className="rep-card__header">
              <div>
                <h3 className="rep-card__title">Monthly Revenue Overview</h3>
                <p className="rep-card__sub">Revenue and bookings by month · {period}</p>
              </div>
              <div className="rep-chart-legend">
                <div className="rep-legend-item">
                  <span style={{ background: '#3B82F6' }}/>
                  Revenue
                </div>
              </div>
            </div>
            <RevenueBar data={MONTHLY}/>
            <div className="rep-bar-summary">
              <div className="rep-bar-summary__item">
                <p className="rep-bar-summary__val">$2.4M</p>
                <p className="rep-bar-summary__lbl">Total Revenue YTD</p>
              </div>
              <div className="rep-bar-summary__item">
                <p className="rep-bar-summary__val">284</p>
                <p className="rep-bar-summary__lbl">Total Bookings</p>
              </div>
              <div className="rep-bar-summary__item">
                <p className="rep-bar-summary__val">$350k</p>
                <p className="rep-bar-summary__lbl">Best Month (Jul)</p>
              </div>
              <div className="rep-bar-summary__item">
                <p className="rep-bar-summary__val">$195k</p>
                <p className="rep-bar-summary__lbl">Lowest Month (Mar)</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="rep-card">
            <div className="rep-tabs">
              <button
                className={`rep-tab ${activeTab === 'destinations' ? 'rep-tab--active' : ''}`}
                onClick={() => setActiveTab('destinations')}
              >
                Top Destinations
              </button>
              <button
                className={`rep-tab ${activeTab === 'agents' ? 'rep-tab--active' : ''}`}
                onClick={() => setActiveTab('agents')}
              >
                Agent Performance
              </button>
            </div>

            {/* Destinations table */}
            {activeTab === 'destinations' && (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Destination</th>
                      <th>Region</th>
                      <th>Bookings</th>
                      <th>Revenue</th>
                      <th>Avg Value</th>
                      <th>Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DESTINATIONS.map(d => (
                      <tr key={d.rank}>
                        <td>
                          <div className={`rep-rank ${d.rank <= 3 ? 'rep-rank--top' : ''}`}>
                            {d.rank}
                          </div>
                        </td>
                        <td>
                          <p className="table-client__name">{d.name}</p>
                        </td>
                        <td className="table-dates">{d.region}</td>
                        <td>
                          <div className="rep-booking-bar">
                            <div
                              className="rep-booking-bar__fill"
                              style={{ width: `${(d.bookings / 42) * 100}%` }}
                            />
                            <span>{d.bookings}</span>
                          </div>
                        </td>
                        <td className="table-budget">{d.revenue}</td>
                        <td className="table-dates">{d.avg}</td>
                        <td>
                          <span className={`rep-growth ${d.up ? 'rep-growth--up' : 'rep-growth--down'}`}>
                            {d.up ? '↑' : '↓'} {d.growth}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Agents table */}
            {activeTab === 'agents' && (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Agent</th>
                      <th>Role</th>
                      <th>Bookings</th>
                      <th>Revenue</th>
                      <th>Conversion</th>
                      <th>Avg Value</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AGENTS.map((a, i) => (
                      <tr key={a.name}>
                        <td>
                          <div className="table-client">
                            <div className="table-avatar" style={{ background: a.color }}>
                              {a.avatar}
                            </div>
                            <p className="table-client__name">{a.name}</p>
                          </div>
                        </td>
                        <td className="table-dates">{a.role}</td>
                        <td>
                          <div className="rep-booking-bar">
                            <div
                              className="rep-booking-bar__fill"
                              style={{ width: `${(a.bookings / 94) * 100}%`, background: a.color }}
                            />
                            <span>{a.bookings}</span>
                          </div>
                        </td>
                        <td className="table-budget">{a.revenue}</td>
                        <td>
                          <span className="rep-conversion">{a.conversion}</span>
                        </td>
                        <td className="table-dates">{a.avgValue}</td>
                        <td>
                          <div className="rep-rating">
                            <span className="rep-rating__star">★</span>
                            <span className="rep-rating__val">{a.rating}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Bottom row */}
          <div className="rep-bottom-row">

            {/* Trip type breakdown */}
            <div className="rep-card rep-card--half">
              <div className="rep-card__header">
                <h3 className="rep-card__title">Bookings by Trip Type</h3>
              </div>
              <div className="rep-breakdown">
                {[
                  { label: 'Luxury & Beach', pct: 38, val: '108', color: '#3B82F6' },
                  { label: 'Cultural & City', pct: 24, val: '68', color: '#8B5CF6' },
                  { label: 'Family', pct: 18, val: '51', color: '#10B981' },
                  { label: 'Adventure', pct: 12, val: '34', color: '#F59E0B' },
                  { label: 'Business', pct: 8, val: '23', color: '#64748B' },
                ].map(item => (
                  <div key={item.label} className="rep-breakdown-row">
                    <div className="rep-breakdown-info">
                      <span className="rep-breakdown-dot" style={{ background: item.color }}/>
                      <span className="rep-breakdown-label">{item.label}</span>
                      <span className="rep-breakdown-val">{item.val}</span>
                    </div>
                    <div className="rep-breakdown-bar">
                      <div
                        className="rep-breakdown-fill"
                        style={{ width: `${item.pct}%`, background: item.color }}
                      />
                    </div>
                    <span className="rep-breakdown-pct">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="rep-card rep-card--half">
              <div className="rep-card__header">
                <h3 className="rep-card__title">Key Performance Indicators</h3>
              </div>
              <div className="rep-kpis">
                {[
                  { label: 'Inquiry to Quote Rate', value: '82%', desc: '47 of 57 inquiries quoted' },
                  { label: 'Quote to Booking Rate', value: '38.4%', desc: '109 of 284 quotes converted' },
                  { label: 'AI-Managed Inquiries', value: '26%', desc: '12 of 47 handled by AI' },
                  { label: 'Avg Response Time', value: '2.4h', desc: 'Across all channels' },
                  { label: 'Client Satisfaction', value: '4.8/5', desc: 'Based on 142 reviews' },
                  { label: 'Supplier Fulfillment', value: '96%', desc: '18 of 22 confirmed on time' },
                ].map(k => (
                  <div key={k.label} className="rep-kpi-row">
                    <div className="rep-kpi-left">
                      <p className="rep-kpi-label">{k.label}</p>
                      <p className="rep-kpi-desc">{k.desc}</p>
                    </div>
                    <p className="rep-kpi-value">{k.value}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}