import { useState } from 'react'
import './NewAutomation.css'

const ICON_OPTIONS = ['🤖', '💬', '📄', '🏨', '📧', '⭐', '📊', '🔔', '⏱️', '✈️', '💰', '🎯']
const COLOR_OPTIONS = [
  { hex: '#3B82F6', name: 'Blue' },
  { hex: '#8B5CF6', name: 'Purple' },
  { hex: '#10B981', name: 'Green' },
  { hex: '#F59E0B', name: 'Amber' },
  { hex: '#EF4444', name: 'Red' },
  { hex: '#0EA5E9', name: 'Sky' },
  { hex: '#B45309', name: 'Brown' },
  { hex: '#06B6D4', name: 'Cyan' },
]
const CATEGORIES = ['Inquiries', 'Quotes', 'Suppliers', 'Customers', 'Reports']

export default function NewAutomationModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [trigger, setTrigger] = useState('')
  const [category, setCategory] = useState('Inquiries')
  const [icon, setIcon] = useState('🤖')
  const [color, setColor] = useState('#3B82F6')
  const [enabled, setEnabled] = useState(true)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!title.trim()) e.title = 'Rule name is required'
    if (!desc.trim()) e.desc = 'Description is required'
    if (!trigger.trim()) e.trigger = 'Trigger condition is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleCreate = () => {
    if (!validate()) return
    onCreate({
      id: Date.now(),
      icon,
      title: title.trim(),
      desc: desc.trim(),
      enabled,
      category,
      trigger: trigger.trim(),
      runs: 0,
      successRate: '—',
      color,
    })
  }

  return (
    <div className="nam-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="nam-modal">

        <div className="nam-header">
          <div>
            <h3 className="nam-header__title">New Automation</h3>
            <p className="nam-header__sub">Create a custom AI rule for your agency workflow</p>
          </div>
          <button className="nam-close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="nam-body">

          {/* Icon + color picker */}
          <div className="nam-field">
            <label className="nam-label">Icon & color</label>
            <div className="nam-icon-preview" style={{ background: color + '18', color }}>
              {icon}
            </div>
            <div className="nam-icon-grid">
              {ICON_OPTIONS.map(ic => (
                <button
                  key={ic}
                  className={`nam-icon-opt ${icon === ic ? 'nam-icon-opt--active' : ''}`}
                  onClick={() => setIcon(ic)}
                >
                  {ic}
                </button>
              ))}
            </div>
            <div className="nam-color-grid">
              {COLOR_OPTIONS.map(c => (
                <button
                  key={c.hex}
                  className={`nam-color-opt ${color === c.hex ? 'nam-color-opt--active' : ''}`}
                  style={{ background: c.hex }}
                  onClick={() => setColor(c.hex)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Rule name */}
          <div className="nam-field">
            <label className="nam-label">Rule name</label>
            <input
              className={`nam-input ${errors.title ? 'nam-input--error' : ''}`}
              placeholder="e.g. Auto-respond to VIP inquiries"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            {errors.title && <span className="nam-error">{errors.title}</span>}
          </div>

          {/* Description */}
          <div className="nam-field">
            <label className="nam-label">Description</label>
            <textarea
              className={`nam-textarea ${errors.desc ? 'nam-input--error' : ''}`}
              placeholder="Describe what this automation does..."
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={2}
            />
            {errors.desc && <span className="nam-error">{errors.desc}</span>}
          </div>

          {/* Trigger */}
          <div className="nam-field">
            <label className="nam-label">Trigger condition</label>
            <input
              className={`nam-input ${errors.trigger ? 'nam-input--error' : ''}`}
              placeholder="e.g. New inquiry received"
              value={trigger}
              onChange={e => setTrigger(e.target.value)}
            />
            {errors.trigger && <span className="nam-error">{errors.trigger}</span>}
          </div>

          {/* Category */}
          <div className="nam-field">
            <label className="nam-label">Category</label>
            <div className="nam-cat-grid">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  className={`nam-cat-opt ${category === c ? 'nam-cat-opt--active' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Enabled toggle */}
          <div className="nam-field nam-field--row">
            <div>
              <label className="nam-label">Activate immediately</label>
              <p className="nam-hint">Rule starts running as soon as you create it</p>
            </div>
            <button className={`nam-toggle ${enabled ? 'nam-toggle--on' : ''}`} onClick={() => setEnabled(e => !e)}>
              <span className="nam-toggle__knob"/>
            </button>
          </div>

        </div>

        <div className="nam-footer">
          <button className="nam-btn nam-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="nam-btn nam-btn--primary" onClick={handleCreate}>Create Automation</button>
        </div>

      </div>
    </div>
  )
}