import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'
import AdminSidebar from '../components/AdminSidebar'
import { useCountUp } from '../hooks/useCountUp'   // ← adjust path if needed

const INQUIRIES = [
  { id: 1, name: 'Jina Hasan',   trip: 'Honeymoon Package',     destination: 'Malé, Maldives', dates: 'Aug 20 – Aug 26', budget: '$9,850',  status: 'Quoting',   agent: 'Layla K.', avatar: 'JH', agentAvatar: 'LK', avatarColor: '#4c7ec9' },
  { id: 2, name: 'Jad Wehbi',    trip: 'Tokyo Business',        destination: 'Tokyo, Japan',   dates: 'Sep 10 – Sep 14', budget: '$5,400',  status: 'Confirmed', agent: 'Priya S.', avatar: 'JW', agentAvatar: 'PS', avatarColor: '#cfd305' },
  { id: 3, name: 'Joyce Allam',  trip: 'Amalfi Family',         destination: 'Amalfi, Italy',  dates: 'Jul 18 – Jul 28', budget: '$12,400', status: 'Pending',   agent: 'Layla K.', avatar: 'JA', agentAvatar: 'LK', avatarColor: '#4c7ec9' },
  { id: 4, name: 'Rafic Younes', trip: 'Kyoto Cherry Blossom',  destination: 'Kyoto, Japan',   dates: 'Apr 1 – Apr 6',   budget: '$7,200',  status: 'Quoting',   agent: 'Dana R.',  avatar: 'RY', agentAvatar: 'DR', avatarColor: '#cfd305' },
]

// ─── KPI values (edit here to change targets) ───────────────────
const KPI = {
  boeing:  { target: 548,  prefix: '$', delay: 100 },
  airbus:  { target: 620,  prefix: '$', delay: 250 },
  flights: { target: 850,  prefix: '',  delay: 400 },
}


function PlaneGold() {
  return (
    <svg viewBox="-18 -18 125 78" style={{ width: '100%', maxWidth: 160, height: 'auto', overflow: 'visible', display: 'block' }}>
      <g transform="rotate(-8, 40, 30)">
        <ellipse cx="40" cy="30" rx="42" ry="10" fill="white"/>
        <path d="M78 30 Q92 30 95 29 Q92 32 78 32 Z" fill="white"/>
        <path d="M-2 30 Q-10 29 -14 27 Q-10 31 -2 32 Z" fill="#ddd"/>
        <path d="M72 26 Q80 24 88 25 Q87 27 80 28 Q72 28 72 26Z" fill="#B8D4E8"/>
        <path d="M30 31 Q20 55 5 72 L15 72 Q28 55 38 33 Z" fill="white" stroke="#e0e0e0" strokeWidth="0.5"/>
        <path d="M30 29 Q20 5 5 -10 L15 -10 Q28 7 38 27 Z" fill="white" stroke="#e0e0e0" strokeWidth="0.5"/>
        <path d="M15 72 Q8 74 5 72 Q8 68 15 72Z" fill="#3B82F6"/>
        <path d="M15 -10 Q8 -12 5 -10 Q8 -6 15 -10Z" fill="#3B82F6"/>
        <path d="M-2 26 Q-8 14 -12 8 L-6 10 Q-4 18 0 26 Z" fill="#1E4D8C"/>
        <path d="M-2 28 Q-10 34 -18 38 L-14 40 Q-8 36 0 30 Z" fill="white" stroke="#e0e0e0" strokeWidth="0.5"/>
        <path d="M-2 32 Q-10 26 -18 22 L-14 20 Q-8 24 0 30 Z" fill="white" stroke="#e0e0e0" strokeWidth="0.5"/>
        <ellipse cx="22" cy="52" rx="12" ry="5" fill="#e8e8e8"/>
        <ellipse cx="22" cy="52" rx="4" ry="5" fill="#ccc"/>
        <rect x="10" y="50" width="24" height="4" rx="2" fill="#e8e8e8"/>
        <ellipse cx="22" cy="8" rx="12" ry="5" fill="#e8e8e8"/>
        <ellipse cx="22" cy="8" rx="4" ry="5" fill="#ccc"/>
        <rect x="10" y="6" width="24" height="4" rx="2" fill="#e8e8e8"/>
        <rect x="48" y="27" width="6" height="4" rx="1.5" fill="#B8D4E8" opacity="0.9"/>
        <rect x="58" y="27" width="6" height="4" rx="1.5" fill="#B8D4E8" opacity="0.9"/>
        <rect x="68" y="27" width="5" height="4" rx="1.5" fill="#B8D4E8" opacity="0.9"/>
        <path d="M-2 34 Q30 35 78 34 L78 35 Q30 36 -2 35 Z" fill="#3B82F6" opacity="0.6"/>
      </g>
    </svg>
  )
}

function PlaneTeal() {
  return (
    <svg viewBox="-18 -20 135 80" style={{ width: '100%', maxWidth: 170, height: 'auto', overflow: 'visible', display: 'block' }}>
      <g transform="rotate(-8, 40, 30)">
        <ellipse cx="40" cy="30" rx="44" ry="11" fill="white"/>
        <path d="M80 30 Q95 30 98 29.5 Q95 32 80 32 Z" fill="white"/>
        <path d="M-4 30 Q-12 29 -16 27 Q-12 31 -4 32 Z" fill="#ddd"/>
        <path d="M74 25 Q82 23 90 24 Q89 27 82 28 Q74 25Z" fill="#9BC4DE"/>
        <path d="M28 32 Q16 58 0 76 L10 77 Q26 59 36 34 Z" fill="white" stroke="#ddd" strokeWidth="0.5"/>
        <path d="M28 28 Q16 4 0 -14 L10 -14 Q26 3 36 26 Z" fill="white" stroke="#ddd" strokeWidth="0.5"/>
        <path d="M10 77 Q3 80 0 77 Q3 73 10 77Z" fill="#8BA888"/>
        <path d="M10 -14 Q3 -17 0 -14 Q3 -10 10 -14Z" fill="#8BA888"/>
        <path d="M-4 25 Q-10 12 -14 5 L-8 7 Q-6 17 -2 25 Z" fill="#8BA888"/>
        <path d="M-4 27 Q-12 33 -20 37 L-16 39 Q-10 35 -2 29 Z" fill="white" stroke="#ddd" strokeWidth="0.5"/>
        <path d="M-4 33 Q-12 27 -20 23 L-16 21 Q-10 25 -2 31 Z" fill="white" stroke="#ddd" strokeWidth="0.5"/>
        <ellipse cx="20" cy="54" rx="13" ry="5.5" fill="#e0e0e0"/>
        <ellipse cx="20" cy="54" rx="4.5" ry="5.5" fill="#c8c8c8"/>
        <rect x="7" y="52" width="26" height="4" rx="2" fill="#e0e0e0"/>
        <ellipse cx="20" cy="6" rx="13" ry="5.5" fill="#e0e0e0"/>
        <ellipse cx="20" cy="6" rx="4.5" ry="5.5" fill="#c8c8c8"/>
        <rect x="7" y="4" width="26" height="4" rx="2" fill="#e0e0e0"/>
        <rect x="46" y="27" width="6" height="4" rx="1.5" fill="#9BC4DE" opacity="0.85"/>
        <rect x="56" y="27" width="6" height="4" rx="1.5" fill="#9BC4DE" opacity="0.85"/>
        <rect x="66" y="27" width="6" height="4" rx="1.5" fill="#9BC4DE" opacity="0.85"/>
        <rect x="76" y="27" width="5" height="4" rx="1.5" fill="#9BC4DE" opacity="0.85"/>
        <path d="M-4 34 Q30 35 80 34 L80 35.5 Q30 36.5 -4 35.5 Z" fill="#8BA888" opacity="0.7"/>
      </g>
    </svg>
  )
}

function GlobeRoutes() {
  return (
    <svg viewBox="-48 -48 96 96" style={{ width: 88, height: 88, overflow: 'visible', display: 'block' }}>
      <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <circle cx="0" cy="0" r="40" fill="rgba(255,255,255,0.04)"/>
      <ellipse cx="0" cy="0" rx="40" ry="12" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <ellipse cx="0" cy="-14" rx="35" ry="10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
      <ellipse cx="0" cy="14" rx="35" ry="10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
      <line x1="-40" y1="0" x2="40" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <line x1="0" y1="-40" x2="0" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      <path d="M-28 -10 Q0 -38 28 -8" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3,2"/>
      <path d="M-32 5 Q-5 28 30 10" fill="none" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="3,2"/>
      <path d="M-20 18 Q10 -5 35 0" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2,3"/>
      <circle cx="-28" cy="-10" r="3" fill="#3B82F6"/>
      <circle cx="28" cy="-8" r="3" fill="#3B82F6"/>
      <circle cx="-32" cy="5" r="2.5" fill="#93C5FD"/>
      <circle cx="30" cy="10" r="2.5" fill="#93C5FD"/>
      <circle cx="-20" cy="18" r="2" fill="rgba(255,255,255,0.5)"/>
      <circle cx="35" cy="0" r="2" fill="rgba(255,255,255,0.5)"/>
      <g transform="translate(0,-22) rotate(25)">
        <ellipse cx="0" cy="0" rx="7" ry="2" fill="white"/>
        <path d="M4 0 Q7 0 8 -0.3 Q7 0.8 4 0.8Z" fill="white"/>
        <path d="M-1 0 Q-3 3 -5 5 L-3 5 Q-1 3 1 0.5Z" fill="rgba(255,255,255,0.8)"/>
        <path d="M-1 0.5 Q-3 -2 -5 -4 L-3 -4 Q-1 -2 1 0Z" fill="rgba(255,255,255,0.8)"/>
        <path d="M-4 0.2 Q-5.5 1.5 -7 2 L-6 2.5 Q-4.5 2 -3.5 0.5Z" fill="rgba(255,255,255,0.6)"/>
        <path d="M-4 0.3 Q-5.5 -0.9 -7 -1.4 L-6 -1.8 Q-4.5 -1.4 -3.5 0Z" fill="rgba(255,255,255,0.6)"/>
      </g>
    </svg>
  )
}

function BarChart() {
  const months = ['Jan','Feb','Mar','Apr','May','Jun']
  const a = [4,5,4,6,5,7]
  const b = [3,4,5,4,6,7]
  const max = 8
  return (
    <svg viewBox="0 0 260 140" width="100%" style={{overflow:'visible'}}>
      {[2,4,6,8].map(v => {
        const y = 110 - (v/max)*100
        return <line key={v} x1="20" y1={y} x2="250" y2={y} stroke="#e8e4d9" strokeWidth="1"/>
      })}
      {months.map((m,i) => {
        const x = 30 + i*38
        const ha = (a[i]/max)*100, hb = (b[i]/max)*100
        return (
          <g key={m}>
            <rect x={x-9} y={110-ha} width="9" height={ha} rx="3" fill="#1E4D8C"/>
            <rect x={x+1} y={110-hb} width="9" height={hb} rx="3" fill="#3B82F6"/>
            <text x={x} y="126" fontSize="9" fill="#9A9A8A" textAnchor="middle" fontFamily="Inter,sans-serif">{m}</text>
          </g>
        )
      })}
      {[2,4,6,8].map(v => {
        const y = 110-(v/max)*100
        return <text key={v} x="14" y={y+3} fontSize="8" fill="#9A9A8A" textAnchor="end" fontFamily="Inter,sans-serif">{v}</text>
      })}
    </svg>
  )
}

function DonutChart() {
  const slices = [
    { pct: 0.40, color: '#1E4D8C', label: 'Economy' },
    { pct: 0.35, color: '#3B82F6', label: 'Business' },
    { pct: 0.25, color: '#93C5FD', label: 'First' },
  ]
  const r = 44, cx = 60, cy = 70, stroke = 20
  let cumulative = 0
  const circumference = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 220 140" width="100%">
      {slices.map((s, i) => {
        const rotation = cumulative * 360 - 90
        cumulative += s.pct
        return (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${circumference * s.pct} ${circumference * (1 - s.pct)}`}
            style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${cx}px ${cy}px` }}
          />
        )
      })}
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="9" fill="#1E4D8C" fontWeight="700" fontFamily="Inter,sans-serif">Flight</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#1E4D8C" fontWeight="700" fontFamily="Inter,sans-serif">Share</text>
      {slices.map((s, i) => (
        <g key={i}>
          <circle cx="130" cy={30 + i * 32} r="5" fill={s.color}/>
          <text x="142" y={34 + i * 32} fontSize="9" fill="#5A5A4A" fontFamily="Inter,sans-serif">{s.label}</text>
          <text x="215" y={34 + i * 32} fontSize="9" fill="#1E4D8C" fontWeight="600" textAnchor="end" fontFamily="Inter,sans-serif">{Math.round(s.pct * 100)}%</text>
        </g>
      ))}
    </svg>
  )
}

function WaveChart() {
  const months = ['Jan','Feb','Mar','Apr','May']
  const W = 340, H = 110, PAD = 20
  const lineA = [3.0, 2.5, 3.8, 3.2, 4.8]
  const lineB = [2.8, 3.5, 2.0, 4.2, 3.0]
  const maxV = 6

  const toPath = (data) => {
    const pts = data.map((v,i) => ({
      x: PAD + (i/(data.length-1))*(W-PAD*2),
      y: H - PAD - ((v/maxV)*(H-PAD*2))
    }))
    return pts.map((p,i) => {
      if (i===0) return `M${p.x},${p.y}`
      const prev = pts[i-1]; const cpx = (prev.x+p.x)/2
      return `C${cpx},${prev.y} ${cpx},${p.y} ${p.x},${p.y}`
    }).join(' ')
  }
  const toArea = (data) => {
    const pts = data.map((v,i) => ({
      x: PAD + (i/(data.length-1))*(W-PAD*2),
      y: H - PAD - ((v/maxV)*(H-PAD*2))
    }))
    const line = pts.map((p,i) => {
      if(i===0) return `M${p.x},${p.y}`
      const prev = pts[i-1]; const cpx = (prev.x+p.x)/2
      return `C${cpx},${prev.y} ${cpx},${p.y} ${p.x},${p.y}`
    }).join(' ')
    return `${line} L${pts[pts.length-1].x},${H-PAD} L${pts[0].x},${H-PAD} Z`
  }
  const tipPts = lineA.map((v,i) => ({
    x: PAD + (i/(lineA.length-1))*(W-PAD*2),
    y: H - PAD - ((v/maxV)*(H-PAD*2))
  }))
  const tipX = tipPts[3].x, tipY = tipPts[3].y

  return (
    <svg viewBox={`0 0 ${W} ${H+24}`} width="100%" style={{overflow:'visible'}}>
      {[2,4,6].map(v => {
        const y = H - PAD - ((v/maxV)*(H-PAD*2))
        return (
          <g key={v}>
            <line x1={PAD} y1={y} x2={W-PAD} y2={y} stroke="#e8e4d9" strokeWidth="1"/>
            <text x={PAD-4} y={y+3} fontSize="8" fill="#9A9A8A" textAnchor="end" fontFamily="Inter,sans-serif">{v}</text>
          </g>
        )
      })}
      {months.map((m,i) => {
        const x = PAD + (i/(months.length-1))*(W-PAD*2)
        return <text key={m} x={x} y={H+16} fontSize="9" fill="#9A9A8A" textAnchor="middle" fontFamily="Inter,sans-serif">{m}</text>
      })}
      <path d={toArea(lineA)} fill="#3B82F6" fillOpacity="0.1"/>
      <path d={toArea(lineB)} fill="#8BA888" fillOpacity="0.1"/>
      <path d={toPath(lineA)} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
      <path d={toPath(lineB)} fill="none" stroke="#8BA888" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x={tipX-30} y={tipY-38} width="62" height="26" rx="8" fill="#1E4D8C"/>
      <text x={tipX+1} y={tipY-21} fontSize="9" fill="white" textAnchor="middle" fontWeight="700" fontFamily="Inter,sans-serif">3500</text>
      <text x={tipX+1} y={tipY-11} fontSize="8" fill="rgba(255,255,255,0.7)" textAnchor="middle" fontFamily="Inter,sans-serif">Passengers</text>
      <line x1={tipX} y1={tipY-12} x2={tipX} y2={tipY-4} stroke="#1E4D8C" strokeWidth="1.5"/>
      <circle cx={tipX} cy={tipY} r="4" fill="#1E4D8C"/>
      <circle cx={tipX} cy={tipY} r="7" fill="#1E4D8C" fillOpacity="0.2"/>
    </svg>
  )
}


export default function AdminDashboard({ user, onLogout, onSelectBooking }) {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const navigate = useNavigate()

  // ── Counter values (count up on mount) ──────────────────────
  const boeing  = useCountUp(KPI.boeing.target,  1400, KPI.boeing.delay)
  const airbus  = useCountUp(KPI.airbus.target,  1400, KPI.airbus.delay)
  const flights = useCountUp(KPI.flights.target, 1400, KPI.flights.delay)

  return (
    <div className="admin">
      <AdminSidebar activeNav={activeNav} setActiveNav={setActiveNav} user={user} onLogout={onLogout}/>

      <div className="admin-main">
        {/* Topbar */}
        <div className="admin-topbar">
          <div>
            <h1 className="admin-topbar__title">Operations Dashboard</h1>
            <p className="admin-topbar__sync"><span className="sync-dot"/>Real-time sync · Last updated just now</p>
          </div>
          <div className="admin-topbar__actions">
            <div className="admin-search-wrap">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input className="admin-search-input" placeholder="Search anything..." />
            </div>
            <button className="admin-btn admin-btn--ghost">Export</button>
            <button className="admin-btn admin-btn--logout" onClick={() => { onLogout?.(); navigate('/') }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2M9 10l3-3-3-3M12 7H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Logout
            </button>
            <button className="admin-notif" onClick={() => navigate('/admin/notifications')}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 2a4.5 4.5 0 00-4.5 4.5v2.8l-.9.9h10.8l-.9-.9V6.5A4.5 4.5 0 007.5 2zM6 12.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="admin-notif__dot">3</span>
            </button>
          </div>
        </div>

        <div className="admin-content">

          {/* ── KPI flight cards ── */}
          <div className="kpi-grid">

            {/* Card 1 — Gold */}
            <div className="kpi-card kpi-card--gold">
              <div className="kpi-card__text">
                <p className="kpi-card__eyebrow">Boeing 787</p>
                <div className="kpi-card__value">${boeing.toLocaleString()}</div>
                <p className="kpi-card__sub">47 Active Inquiries · 12 AI-managed</p>
                <div className="kpi-card__bar"><div className="kpi-card__bar-fill" style={{width:'68%'}}/></div>
              </div>
              <div className="kpi-card__visual"><PlaneGold /></div>
            </div>

            {/* Card 2 — Teal */}
            <div className="kpi-card kpi-card--teal">
              <div className="kpi-card__text">
                <p className="kpi-card__eyebrow">Airbus 811</p>
                <div className="kpi-card__value">${airbus.toLocaleString()}</div>
                <p className="kpi-card__sub">284 Total Bookings · YTD</p>
                <div className="kpi-card__bar"><div className="kpi-card__bar-fill" style={{width:'84%'}}/></div>
              </div>
              <div className="kpi-card__visual"><PlaneTeal /></div>
            </div>

            {/* Card 3 — Dark + Globe */}
            <div className="kpi-card kpi-card--dark">
              <div className="kpi-card__text">
                <p className="kpi-card__eyebrow">Total Flights</p>
                <div className="kpi-card__value">{flights.toLocaleString()}</div>
                <p className="kpi-card__sub">All confirmed routes · Revenue $2.4M</p>
                <div className="kpi-card__bar"><div className="kpi-card__bar-fill" style={{width:'100%'}}/></div>
              </div>
              <div className="kpi-card__visual kpi-card__visual--globe"><GlobeRoutes /></div>
            </div>

          </div>

          {/* ── Mid row: Last Trips + Stats ── */}
          <div className="admin-mid-row">
            <div className="admin-card trips-card">
              <div className="admin-card__header">
                <div>
                  <h3 className="admin-card__title">Last Trips</h3>
                  <p className="admin-card__sub">Overview of latest month</p>
                </div>
                <button className="admin-btn admin-btn--ghost admin-btn--sm">View all</button>
              </div>
              <table className="trips-table">
                <thead>
                  <tr>
                    <th>Members</th><th>Flight</th><th>Total Members</th><th>Ticket Price</th>
                  </tr>
                </thead>
                <tbody>
                  {INQUIRIES.map(inq => (
                    <tr key={inq.name} onClick={() => { onSelectBooking(inq.name); navigate('/booking') }} style={{ cursor: 'pointer' }}>
                      <td>
                        <div className="trip-member">
                          <div className="trip-avatar" style={{background: inq.avatarColor}}>{inq.avatar}</div>
                          <div>
                            <p className="trip-name">{inq.name}</p>
                            <p className="trip-email">{inq.name.toLowerCase().replace(' ','.')}@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="trip-flight">{inq.destination.split(',')[0]}</td>
                      <td><span className="trip-members-badge" style={{background: inq.avatarColor}}>{2 + (inq.id % 4)}</span></td>
                      <td className="trip-price">{inq.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="admin-card stats-card">
              <div className="admin-card__header">
                <h3 className="admin-card__title">Statistics</h3>
                <div className="chart-legend-row">
                  <span><i style={{background:'#0335a1'}}/>Bookings</span>
                  <span><i style={{background:'#0991c7'}}/>Quotes</span>
                </div>
              </div>
              <BarChart />
            </div>
          </div>

          {/* ── Bottom row: Donut + Wave + Activity ── */}
          <div className="admin-bot-row">
            <div className="admin-card donut-card">
              <div className="admin-card__header">
                <h3 className="admin-card__title">Flights Share</h3>
              </div>
              <DonutChart />
            </div>
            <div className="admin-card wave-card">
              <div className="admin-card__header">
                <div>
                  <h3 className="admin-card__title">Flights Schedule</h3>
                  <p className="admin-card__sub">Passenger volume trends</p>
                </div>
                <div className="chart-legend-row">
                  <span><i style={{background:'#3B82F6'}}/>Outbound</span>
                  <span><i style={{background:'#93C5FD'}}/>Inbound</span>
                </div>
              </div>
              <WaveChart />
            </div>
            <div className="admin-card activity-card">
              <div className="admin-card__header">
                <h3 className="admin-card__title">Live Activity</h3>
                <span className="activity-live-dot">● LIVE</span>
              </div>
              <div className="activity-list">
                {[
                  { icon: '🤖', text: 'AI quoted James · Maldives',      time: '2m',  color: '#C9A84C' },
                  { icon: '✅', text: 'Marcus Webb confirmed Tokyo',       time: '14m', color: '#2D4A3E' },
                  { icon: '✈️', text: 'BA confirmed seats · SAF-2049',    time: '28m', color: '#8BA888' },
                  { icon: '💬', text: 'New inquiry · Santorini · 2 guests',time: '45m', color: '#C9A84C' },
                  { icon: '📄', text: 'PDF sent · Oliver Beaumont',        time: '1h',  color: '#2D4A3E' },
                  { icon: '⚠️', text: 'Supplier overdue · Hotel Bali',    time: '2h',  color: '#c0392b' },
                ].map((item, i) => (
                  <div key={i} className="activity-item">
                    <div className="activity-item__icon" style={{background: item.color+'20', color: item.color}}>{item.icon}</div>
                    <div className="activity-item__body">
                      <p className="activity-item__text">{item.text}</p>
                      <p className="activity-item__time">{item.time} ago</p>
                    </div>
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