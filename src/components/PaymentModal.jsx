import { useState } from 'react'
import './PaymentModal.css'

export default function PaymentModal({ booking, onClose, onSuccess }) {
  const [step, setStep] = useState('card') // 'card' | 'confirm' | 'success'
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const formatCard = (val) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
  const formatExpiry = (val) => val.replace(/\D/g, '').replace(/^(.{2})/, '$1/').slice(0, 5)

  const validate = () => {
    const e = {}
    if (card.number.replace(/\s/g, '').length < 16) e.number = 'Invalid card number'
    if (!card.name.trim()) e.name = 'Name required'
    if (card.expiry.length < 5) e.expiry = 'Invalid expiry'
    if (card.cvv.length < 3) e.cvv = 'Invalid CVV'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePay = async () => {
    if (!validate()) return
    setStep('confirm')
  }

  const handleConfirm = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setLoading(false)
    setStep('success')
  }

  return (
    <div className="pm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pm-modal">

        {/* Header */}
        <div className="pm-header">
          <div className="pm-header__left">
            <div className="pm-header__icon">🔒</div>
            <div>
              <p className="pm-header__title">Secure Payment</p>
              <p className="pm-header__sub">256-bit SSL encrypted</p>
            </div>
          </div>
          {step !== 'success' && (
            <button className="pm-close" onClick={onClose}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Booking summary */}
        {step !== 'success' && (
          <div className="pm-summary">
            <div className="pm-summary__left">
              <p className="pm-summary__dest">{booking?.destination || 'Malé, Maldives'}</p>
              <p className="pm-summary__sub">{booking?.subtitle || 'Honeymoon Package · 6 nights · 2 guests'}</p>
            </div>
            <div className="pm-summary__price">
              <span className="pm-summary__total">{booking?.total || '$9,850'}</span>
              <span className="pm-summary__label">Total</span>
            </div>
          </div>
        )}

        {/* Step: Card entry */}
        {step === 'card' && (
          <div className="pm-body">
            <div className="pm-card-preview">
              <div className="pm-card-preview__chip">💳</div>
              <p className="pm-card-preview__number">{card.number || '•••• •••• •••• ••••'}</p>
              <div className="pm-card-preview__bottom">
                <span>{card.name || 'CARD HOLDER'}</span>
                <span>{card.expiry || 'MM/YY'}</span>
              </div>
            </div>

            <div className="pm-fields">
              <div className="pm-field">
                <label className="pm-label">Card number</label>
                <input
                  className={`pm-input ${errors.number ? 'pm-input--error' : ''}`}
                  placeholder="1234 5678 9012 3456"
                  value={card.number}
                  onChange={e => setCard(p => ({ ...p, number: formatCard(e.target.value) }))}
                  maxLength={19}
                />
                {errors.number && <span className="pm-error">{errors.number}</span>}
              </div>
              <div className="pm-field">
                <label className="pm-label">Cardholder name</label>
                <input
                  className={`pm-input ${errors.name ? 'pm-input--error' : ''}`}
                  placeholder="John Smith"
                  value={card.name}
                  onChange={e => setCard(p => ({ ...p, name: e.target.value.toUpperCase() }))}
                />
                {errors.name && <span className="pm-error">{errors.name}</span>}
              </div>
              <div className="pm-field-row">
                <div className="pm-field">
                  <label className="pm-label">Expiry date</label>
                  <input
                    className={`pm-input ${errors.expiry ? 'pm-input--error' : ''}`}
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={e => setCard(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                    maxLength={5}
                  />
                  {errors.expiry && <span className="pm-error">{errors.expiry}</span>}
                </div>
                <div className="pm-field">
                  <label className="pm-label">CVV</label>
                  <input
                    className={`pm-input ${errors.cvv ? 'pm-input--error' : ''}`}
                    placeholder="•••"
                    type="password"
                    value={card.cvv}
                    onChange={e => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    maxLength={4}
                  />
                  {errors.cvv && <span className="pm-error">{errors.cvv}</span>}
                </div>
              </div>
            </div>

            <div className="pm-accepted">
              <span>Accepted:</span>
              {['VISA', 'MC', 'AMEX', 'APPLE PAY'].map(c => (
                <span key={c} className="pm-card-badge">{c}</span>
              ))}
            </div>

            <button className="pm-pay-btn" onClick={handlePay}>
              Review payment — {booking?.total || '$9,850'}
            </button>
          </div>
        )}

        {/* Step: Confirm */}
        {step === 'confirm' && (
          <div className="pm-body">
            <div className="pm-confirm-info">
              <div className="pm-confirm-row">
                <span>Card</span>
                <span>•••• •••• •••• {card.number.slice(-4)}</span>
              </div>
              <div className="pm-confirm-row">
                <span>Name</span>
                <span>{card.name}</span>
              </div>
              <div className="pm-confirm-row pm-confirm-row--total">
                <span>Total charge</span>
                <strong>{booking?.total || '$9,850'}</strong>
              </div>
            </div>
            <p className="pm-confirm-note">By confirming, you agree to our booking terms. This charge will appear as <strong>Safrat Travel</strong> on your statement.</p>
            <button className="pm-pay-btn" onClick={handleConfirm} disabled={loading}>
              {loading ? (
                <span className="pm-loading"><span/><span/><span/> Processing...</span>
              ) : (
                `Confirm & Pay ${booking?.total || '$9,850'}`
              )}
            </button>
            <button className="pm-back-btn" onClick={() => setStep('card')}>← Back to card details</button>
          </div>
        )}

        {/* Step: Success */}
        {step === 'success' && (
          <div className="pm-success">
            <div className="pm-success__icon">✅</div>
            <h3 className="pm-success__title">Payment Successful!</h3>
            <p className="pm-success__sub">Your booking is confirmed. A confirmation email has been sent.</p>
            <div className="pm-success__details">
              <div className="pm-success__row">
                <span>Booking ref</span>
                <strong>SAF-{Math.floor(Math.random() * 9000) + 1000}</strong>
              </div>
              <div className="pm-success__row">
                <span>Amount paid</span>
                <strong>{booking?.total || '$9,850'}</strong>
              </div>
              <div className="pm-success__row">
                <span>Destination</span>
                <strong>{booking?.destination || 'Malé, Maldives'}</strong>
              </div>
            </div>
            <button className="pm-pay-btn" onClick={onSuccess}>View in My Bookings →</button>
          </div>
        )}

      </div>
    </div>
  )
}