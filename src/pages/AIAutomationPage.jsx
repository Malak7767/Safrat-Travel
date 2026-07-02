import { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import './AIAutomationPage.css'
import '../pages/AdminDashboard.css'
import NewAutomationModal from '../components/NewAutomation'
const INITIAL_RULES = [
  {
    id: 1,
    icon: '💬',
    title: 'Auto-respond to new inquiries',
    desc: 'AI sends an instant acknowledgment and gathers trip details from new leads within 60 seconds.',
    enabled: true,
    category: 'Inquiries',
    trigger: 'New inquiry received',
    runs: 284,
    successRate: '98%',
    color: '#3B82F6',
  },
  {
    id: 2,
    icon: '📄',
    title: 'Auto-generate package quotes',
    desc: 'AI builds a full itinerary and cost breakdown for standard trip requests without agent input.',
    enabled: true,
    category: 'Quotes',
    trigger: 'Inquiry details complete',
    runs: 198,
    successRate: '94%',
    color: '#8B5CF6',
  },
  {
    id: 3,
    icon: '🏨',
    title: 'Supplier availability check',
    desc: 'Automatically checks hotel and flight availability when a quote is being built.',
    enabled: true,
    category: 'Suppliers',
    trigger: 'Quote generation started',
    runs: 198,
    successRate: '91%',
    color: '#10B981',
  },
  {
    id: 4,
    icon: '📧',
    title: 'Follow-up reminder emails',
    desc: 'Sends a follow-up email if a client hasn\'t responded to a quote within 48 hours.',
    enabled: false,
    category: 'Inquiries',
    trigger: '48h no client response',
    runs: 64,
    successRate: '76%',
    color: '#F59E0B',
  },
  {
    id: 5,
    icon: '⭐',
    title: 'VIP client upgrade detection',
    desc: 'Automatically tags a client as VIP when their total spend exceeds $10,000 and notifies their agent.',
    enabled: true,
    category: 'Customers',
    trigger: 'Total spend > $10,000',
    runs: 38,
    successRate: '100%',
    color: '#B45309',
  },
  {
    id: 6,
    icon: '📊',
    title: 'Weekly performance report',
    desc: 'Generates and emails a weekly summary report to all agents every Monday at 8:00 AM.',
    enabled: false,
    category: 'Reports',
    trigger: 'Every Monday 08:00',
    runs: 12,
    successRate: '100%',
    color: '#64748B',
  },
  {
    id: 7,
    icon: '🔔',
    title: 'Overdue supplier alert',
    desc: 'Flags a supplier as overdue and notifies the agent if no confirmation received within 24 hours.',
    enabled: true,
    category: 'Suppliers',
    trigger: '24h no supplier response',
    runs: 42,
    successRate: '88%',
    color: '#EF4444',
  },
  {
    id: 8,
    icon: '🤖',
    title: 'AI match score calculation',
    desc: 'Calculates a match score for every AI-generated package based on client preferences and history.',
    enabled: true,
    category: 'Quotes',
    trigger: 'Quote generated',
    runs: 198,
    successRate: '99%',
    color: '#06B6D4',
  },
  {
  id: 9,
  icon: '⏱️',
  title: 'Line response time limitation',
  desc: 'Automatically escalates a quote to a senior agent if AI response time exceeds the set threshold.',
  enabled: true,
  category: 'Quotes',
  trigger: 'Response time > 5 min',
  runs: 27,
  successRate: '96%',
  color: '#0EA5E9',
},
]

const ACTIVITY = [
  { icon: '💬', text: 'Auto-responded to Sofia Laurent\'s Paris inquiry', time: '2 min ago', color: '#3B82F6', status: 'success' },
  { icon: '📄', text: 'Generated Kyoto package quote for Ravi Nakamura · 94% match score', time: '14 min ago', color: '#8B5CF6', status: 'success' },
  { icon: '🏨', text: 'Checked hotel availability · Soneva Jani · 5 nights confirmed', time: '28 min ago', color: '#10B981', status: 'success' },
  { icon: '🔔', text: 'Supplier alert sent · Bali hotel overdue by 6 hours', time: '1h ago', color: '#EF4444', status: 'warning' },
  { icon: '⭐', text: 'Daniel Achebe upgraded to VIP · total spend $42,800', time: '2h ago', color: '#B45309', status: 'success' },
  { icon: '📄', text: 'Generated Maldives package quote for James Thornton', time: '3h ago', color: '#8B5CF6', status: 'success' },
  { icon: '📧', text: 'Follow-up email sent to Oliver Beaumont · no response 48h', time: '5h ago', color: '#F59E0B', status: 'success' },
  { icon: '🤖', text: 'Batch match scores recalculated · 12 quotes updated', time: '6h ago', color: '#06B6D4', status: 'success' },
  { icon: '🤖', text: 'Line times limitation applied ', time: '6h ago', color: '#06B6D4', status: 'success' },
]

const CATEGORIES = ['All', 'Inquiries', 'Quotes', 'Suppliers', 'Customers', 'Reports']

const AI_STATS = [
  { label: 'Automations Active', value: '6/8', color: '#3B82F6', light: 'rgba(59,130,246,0.08)', icon: '⚡' },
  { label: 'Actions Today', value: '47', color: '#10B981', light: 'rgba(16,185,129,0.08)', icon: '✅' },
  { label: 'Avg Success Rate', value: '93.4%', color: '#8B5CF6', light: 'rgba(139,92,246,0.08)', icon: '🎯' },
  { label: 'Time Saved Today', value: '6.2h', color: '#F59E0B', light: 'rgba(245,158,11,0.08)', icon: '⏱️' },
]

export default function AIAutomationPage({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('AI Automation')
  const [rules, setRules] = useState(INITIAL_RULES)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [confirmId, setConfirmId] = useState(null)
  const [showNewModal, setShowNewModal] = useState(false)
  const toggleRule = (id) => {
    setRules(prev => prev.map(r =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ))
    setConfirmId(id)
    setTimeout(() => setConfirmId(null), 1500)
  }

   const handleCreateRule = (newRule) => {
  setRules(prev => [newRule, ...prev])
  setShowNewModal(false)
}
  const filtered = rules.filter(r =>
    categoryFilter === 'All' || r.category === categoryFilter
  )

  const activeCount = rules.filter(r => r.enabled).length

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
            <h1 className="admin-topbar__title">AI Automation</h1>
            <p className="admin-topbar__sync">
              <span className="sync-dot"/>
              {activeCount} automations active · AI engine running
            </p>
          </div>
          <div className="admin-topbar__actions">
            <div className="ai-status-pill">
              <span className="ai-status-dot"/>
              AI Engine Online
            </div>
            <button className="admin-btn admin-btn--primary" onClick={() => setShowNewModal(true)}>
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
  New Automation
</button>
          </div>
        </div>
{showNewModal && (
  <NewAutomationModal
    onClose={() => setShowNewModal(false)}
    onCreate={handleCreateRule}
  />
)}
        <div className="admin-content">

          {/* AI Stats */}
          <div className="ai-stats">
            {AI_STATS.map(s => (
              <div key={s.label} className="ai-stat-card" style={{ '--ai-color': s.color, '--ai-light': s.light }}>
                <div className="ai-stat-card__icon">{s.icon}</div>
                <p className="ai-stat-card__value">{s.value}</p>
                <p className="ai-stat-card__label">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Main content — rules + activity */}
          <div className="ai-main-row">

            {/* Rules */}
            <div className="ai-rules-col">
              <div className="rep-card">
                <div className="rep-card__header">
                  <div>
                    <h3 className="rep-card__title">Automation Rules</h3>
                    <p className="rep-card__sub">{activeCount} of {rules.length} rules enabled</p>
                  </div>
                  <div className="ai-cat-filters">
                    {CATEGORIES.map(c => (
                      <button
                        key={c}
                        className={`cust-filter-btn ${categoryFilter === c ? 'cust-filter-btn--active' : ''}`}
                        onClick={() => setCategoryFilter(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ai-rules-list">
                  {filtered.map(rule => (
                    <div key={rule.id} className={`ai-rule ${rule.enabled ? 'ai-rule--on' : 'ai-rule--off'}`}>
                      <div className="ai-rule__icon" style={{ background: rule.color + '18', color: rule.color }}>
                        {rule.icon}
                      </div>
                      <div className="ai-rule__body">
                        <div className="ai-rule__top">
                          <p className="ai-rule__title">{rule.title}</p>
                          <span className="ai-rule__cat">{rule.category}</span>
                        </div>
                        <p className="ai-rule__desc">{rule.desc}</p>
                        <div className="ai-rule__meta">
                          <span className="ai-rule__trigger">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M5 1v4l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/>
                            </svg>
                            {rule.trigger}
                          </span>
                          <span className="ai-rule__runs">
                            {rule.runs} runs
                          </span>
                          <span className={`ai-rule__rate ${parseFloat(rule.successRate) >= 90 ? 'ai-rule__rate--good' : 'ai-rule__rate--warn'}`}>
                            {rule.successRate} success
                          </span>
                        </div>
                      </div>
                      <div className="ai-rule__toggle-wrap">
                        {confirmId === rule.id && (
                          <span className="ai-rule__confirm">
                            {rule.enabled ? '✓ On' : '✗ Off'}
                          </span>
                        )}
                        <button
                          className={`ai-toggle ${rule.enabled ? 'ai-toggle--on' : ''}`}
                          onClick={() => toggleRule(rule.id)}
                          title={rule.enabled ? 'Disable automation' : 'Enable automation'}
                        >
                          <span className="ai-toggle__knob"/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity feed */}
            <div className="ai-activity-col">
              <div className="rep-card">
                <div className="rep-card__header">
                  <div>
                    <h3 className="rep-card__title">Live Activity</h3>
                    <p className="rep-card__sub">Last 24 hours</p>
                  </div>
                  <span className="activity-live-dot">● LIVE</span>
                </div>

                <div className="ai-activity-list">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="ai-activity-item">
                      <div className="ai-activity-icon" style={{ background: a.color + '18', color: a.color }}>
                        {a.icon}
                      </div>
                      <div className="ai-activity-body">
                        <p className="ai-activity-text">{a.text}</p>
                        <p className="ai-activity-time">{a.time}</p>
                      </div>
                      <div className={`ai-activity-status ai-activity-status--${a.status}`}>
                        {a.status === 'success' ? '✓' : '⚠'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI summary card */}
              <div className="rep-card ai-summary-card">
                <h3 className="rep-card__title" style={{ marginBottom: 16 }}>AI Engine Status</h3>
                <div className="ai-engine-rows">
                  {[
                    { label: 'Model', value: 'Safrat AI v2.4', status: 'online' },
                    { label: 'Response latency', value: '2.4s avg', status: 'good' },
                    { label: 'Queue', value: '3 pending', status: 'normal' },
                    { label: 'Last trained', value: '2 days ago', status: 'normal' },
                    { label: 'Uptime', value: '99.8%', status: 'good' },
                  ].map(r => (
                    <div key={r.label} className="ai-engine-row">
                      <span className="ai-engine-label">{r.label}</span>
                      <div className="ai-engine-right">
                        <span className={`ai-engine-dot ai-engine-dot--${r.status}`}/>
                        <span className="ai-engine-val">{r.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}