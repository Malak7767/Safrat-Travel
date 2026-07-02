import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/safrat_blue_transparent.png';
const NAV = [
  { label: 'Dashboard', icon: '▦', active: true, section: 'workspace' },
  { label: 'Bookings', icon: '📋', badge: '24', section: 'workspace' },
  { label: 'Inquiries', icon: '💬', badge: '8', badgeNew: true, section: 'workspace' },
  { label: 'Suppliers', icon: '🏨', section: 'workspace' },
  { label: 'Customers', icon: '👥', section: 'workspace' },
  { label: 'Reports', icon: '📊', section: 'analytics' },
  { label: 'Notifications', icon: '🔔', section: 'notifications' },
  { label: 'AI Automation', icon: '🤖', live: true, section: 'analytics' },
]

export default function AdminSidebar({ activeNav, setActiveNav, user, onLogout }) {
  const navigate = useNavigate()

  const handleNav = (n) => {
    setActiveNav(n.label)
    if (n.label === 'Dashboard') navigate('/admin')
    if (n.label === 'Bookings') navigate('/bookings')
    if (n.label === 'Inquiries') navigate('/inquiries') 
    if (n.label === 'Suppliers') navigate('/suppliers')
    if (n.label === 'Customers') navigate('/customers')
    if (n.label === 'Reports') navigate('/reports')
    if (n.label === 'Notifications') navigate('/admin/notifications')
    if (n.label === 'AI Automation') navigate('/ai-automation')
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
       <a className="nav-logo" href="#">
                <img src={logo} alt="Safrat Travel Logo" className="nav-logo-img" />
               </a>
        <div>
          
          
        </div>
      </div>

      <div className="admin-nav">
        <p className="admin-nav__label">Workspace</p>
        {NAV.filter(n => n.section === 'workspace').map(n => (
          <button
            key={n.label}
            className={`admin-nav__item ${activeNav === n.label ? 'admin-nav__item--active' : ''}`}
            onClick={() => handleNav(n)}
          >
            <span className="admin-nav__icon">{n.icon}</span>
            <span className="admin-nav__text">{n.label}</span>
            {n.badge && (
              <span className={`admin-nav__badge ${n.badgeNew ? 'admin-nav__badge--new' : ''}`}>
                {n.badge}{n.badgeNew ? ' new' : ''}
              </span>
            )}
          </button>
        ))}

         <p className="admin-nav__label" style={{ marginTop: 20 }}>Analytics</p>
{NAV.filter(n => n.section === 'analytics' || n.section === 'notifications').map(n => (
          <button
            key={n.label}
            className={`admin-nav__item ${activeNav === n.label ? 'admin-nav__item--active' : ''}`}
            onClick={() => handleNav(n)}
          >
            <span className="admin-nav__icon">{n.icon}</span>
            <span className="admin-nav__text">{n.label}</span>
            {n.live && <span className="admin-nav__live"/>}
          </button>
        ))}
      </div>

      <div className="admin-sidebar__footer">
        <button className="admin-nav__item" onClick={onLogout}>
          <span className="admin-nav__icon">⚙️</span>
          <span className="admin-nav__text">Settings</span>
        </button>
        <div className="admin-agent">
          <div className="admin-agent__avatar">SM</div>
          <div>
            <p className="admin-agent__name">{user?.name || 'Sarah Mitchell'}</p>
            <p className="admin-agent__role">Senior Agent</p>
          </div>
          <button className="admin-agent__logout" onClick={onLogout} title="Logout">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2M9 10l3-3-3-3M12 7H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}