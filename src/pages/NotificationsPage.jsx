// NotificationsPage.jsx
import React, { useState } from 'react';
import './NotificationsPage.css';

const INITIAL_NOTIFS = [
  { id: 1, type: 'confirmed', icon: '✓', title: 'Booking Confirmed', desc: 'Swiss Alps Luxury Escape · Flight <strong>ZRH → ZMT</strong> has been confirmed by Swiss Air.', time: '2 min ago', unread: true },
  { id: 2, type: 'ai', icon: '✦', title: 'AI Itinerary Ready', desc: 'Your Maldives Honeymoon itinerary is fully generated. <strong>11 segments</strong> · AI score 94%.', time: '15 min ago', unread: true },
  { id: 3, type: 'pending', icon: '⏳', title: 'Supplier Response Needed', desc: 'Amalfi Family Summer — <strong>Villa Treville</strong> is awaiting payment confirmation.', time: '1 hour ago', unread: true },
  { id: 4, type: 'update', icon: '↻', title: 'Flight Update', desc: 'Your <strong>BA0197</strong> departure time changed from 07:15 → 08:00. Itinerary updated.', time: '3 hours ago', unread: false },
  { id: 5, type: 'promo', icon: '✦', title: 'AI Recommendation', desc: 'Based on your Kyoto trip, Safrat AI found a <strong>cherry blossom festival</strong> package — 94% match.', time: 'Yesterday', unread: false },
  { id: 6, type: 'confirmed', icon: '🏨', title: 'Hotel Secured', desc: '<strong>Canaves Oia Epitome</strong> confirmed for Jun 7–13 · Suite with caldera view.', time: 'Yesterday', unread: false },
];

const FILTERS = ['All', 'Unread', 'Confirmed', 'AI', 'Updates'];

export default function NotificationsPage({ onBack }) {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const [activeFilter, setActiveFilter] = useState('All');

  const unreadCount = notifs.filter(n => n.unread).length;

  const handleMarkRead = (id) => {
    setNotifs(prev =>
      prev.map(n =>
        n.id === id ? { ...n, unread: false } : n
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifs(prev =>
      prev.map(n => ({ ...n, unread: false }))
    );
  };

  const getFilteredNotifs = () => {
    if (activeFilter === 'All') return notifs;
    if (activeFilter === 'Unread') return notifs.filter(n => n.unread);
    // map filter name to type (lowercase)
    const typeMap = {
      'Confirmed': 'confirmed',
      'AI': 'ai',
      'Updates': 'update',
    };
    const type = typeMap[activeFilter];
    return type ? notifs.filter(n => n.type === type) : notifs;
  };

  const filtered = getFilteredNotifs();

  return (
    <div className="notif-page">
      <header className="notif-page__header">
        <button className="notif-back" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div className="notif-page__title-group">
          <h2 className="notif-page__title">Notifications</h2>
          <span className="notif-page__badge" style={{ background: unreadCount > 0 ? '#E11D6B' : 'var(--color-ink-muted)' }}>
            {unreadCount > 0 ? `${unreadCount} new` : 'All read'}
          </span>
        </div>

        <div className="notif-page__actions">
          <button className="notif-action-btn notif-action-btn--primary" onClick={handleMarkAllRead}>
            Mark all read
          </button>
          <button className="notif-action-btn" onClick={() => alert('Settings')}>
            ⋮
          </button>
        </div>
      </header>

      <div className="notif-page__filters">
        {FILTERS.map(filter => {
          const isActive = activeFilter === filter;
          let count = 0;
          if (filter === 'All') count = notifs.length;
          else if (filter === 'Unread') count = unreadCount;
          else {
            const typeMap = { 'Confirmed': 'confirmed', 'AI': 'ai', 'Updates': 'update' };
            const type = typeMap[filter];
            count = notifs.filter(n => n.type === type).length;
          }
          const isUnreadFilter = filter === 'Unread';
          return (
            <button
              key={filter}
              className={`filter-tab ${isActive ? 'filter-tab--active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              <span className={`filter-tab__count ${isUnreadFilter && unreadCount > 0 ? 'filter-tab__count--unread' : ''}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="notif-page__body">
        {filtered.length === 0 ? (
          <div className="notif-empty">
            <div className="notif-empty__icon">🔔</div>
            <div className="notif-empty__title">No notifications</div>
            <div className="notif-empty__desc">You're all caught up!</div>
          </div>
        ) : (
          <div className="notif-list">
            {filtered.map(n => (
              <div
                key={n.id}
                className={`notif-item ${n.unread ? 'notif-item--unread' : ''} notif-item--type-${n.type}`}
              >
                <div className="notif-item__icon-wrap">{n.icon}</div>
                <div className="notif-item__body">
                  <div className="notif-item__top">
                    <span className="notif-item__title">{n.title}</span>
                    <span className="notif-item__time">{n.time}</span>
                  </div>
                  <p className="notif-item__desc" dangerouslySetInnerHTML={{ __html: n.desc }} />
                </div>
                {n.unread && <div className="notif-item__dot" />}
                {n.unread && (
                  <button
                    className="notif-item__mark-read"
                    onClick={() => handleMarkRead(n.id)}
                  >
                    Mark read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}