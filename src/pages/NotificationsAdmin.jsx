import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import './NotificationsAdmin.css'

const NOTIFICATIONS = [
 
 
 
]

const TABS = ['All', 'Unread', 'Payments', 'Bookings', 'AI', 'Suppliers', 'Flights', 'Clients']

export default function NotificationsAdmin({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('Notifications')
  const [activeTab, setActiveTab] = useState('All')
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const navigate = useNavigate()

  const unreadCount = notifications.filter(n => n.unread).length

  const filtered = notifications.filter(n => {
    if (activeTab === 'All') return true
    if (activeTab === 'Unread') return n.unread
    return n.tag === activeTab
  })

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n))
  }

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
            <h1 className="admin-topbar__title">
              Notifications
              {unreadCount > 0 && (
                <span className="notif-count-badge">{unreadCount} new</span>
              )}
            </h1>
            <p className="admin-topbar__sync">
              <span className="sync-dot"/>
              Live updates · Last synced just now
            </p>
          </div>
          <div className="admin-topbar__actions">
            <button className="admin-btn admin-btn--ghost" onClick={markAllRead}>
              Mark all read
            </button>
          </div>
        </div>

        <div className="admin-content">
          <div className="notif-admin-wrap">

            {/* Tabs */}
            <div className="notif-admin-tabs">
              {TABS.map(tab => (
                <button
                  key={tab}
                  className={`notif-admin-tab ${activeTab === tab ? 'notif-admin-tab--active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {tab === 'Unread' && unreadCount > 0 && (
                    <span className="notif-tab-badge">{unreadCount}</span>
                  )}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="notif-admin-list">
              {filtered.length === 0 && (
                <div className="notif-admin-empty">
                  <span>🔔</span>
                  <p>No notifications in this category</p>
                </div>
              )}
              {filtered.map(n => (
                <div
                  key={n.id}
                  className={`notif-admin-item ${n.unread ? 'notif-admin-item--unread' : ''}`}
                  onClick={() => markRead(n.id)}
                >
                  <div
                    className="notif-admin-item__icon"
                    style={{ background: n.bg, color: n.color }}
                  >
                    {n.icon}
                  </div>

                  <div className="notif-admin-item__body">
                    <div className="notif-admin-item__top">
                      <p className="notif-admin-item__title">{n.title}</p>
                      <span className="notif-admin-item__time">{n.time}</span>
                      {n.unread && <span className="notif-admin-item__dot"/>}
                    </div>
                    <p className="notif-admin-item__desc">{n.desc}</p>
                    <span
                      className="notif-admin-item__tag"
                      style={{ background: n.bg, color: n.color }}
                    >
                      {n.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}