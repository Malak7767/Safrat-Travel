import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import t1 from'../assets/images/download (2).jpg';
import logo from '../assets/images/logos.png';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    if (tab === 'signup' && !name) { setError('Please enter your name.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)
    if (email === 'admin@admin.com') {
  onLogin({ role: 'admin', name: 'Sarah Mitchell', email })
  navigate('/admin')
} else if (email.endsWith('@gmail.com')) {
  onLogin({ role: 'client', name: name || email.split('@')[0], email })
  navigate('/chat')
} else {
  setError('Invalid credentials. Please try again.')
}
  }

  return (
     <div className="login">

 <button
  className="login__back"
  onClick={() => navigate('/')}
>
  <span>←</span>
  <span>Back to Home</span>
</button>

      {/* Full screen background image */}
      <img
        src={t1}
        alt="Travel"
        className="login__bg-img"
      />

      {/* Dark overlay over entire page */}
      <div className="login__overlay"/>

      {/* Left side — text content */}
      <div className="login__left">
        <div className="login__logo">
        
        </div>

        <div className="login__left-content">
          <p className="login__eyebrow">✦ AI-Powered Travel</p>
          <h1 className="login__title">
            Explore<br/>Horizons
          </h1>
          <p className="login__desc">
            Where Your Dream Destinations<br/>Become Reality.
          </p>
          <p className="login__sub">
            Embark on a journey where every corner<br/>
            of the world is within your reach.
          </p>
        </div>

        <div className="login__dots">
          <span className="login__dot login__dot--active"/>
          <span className="login__dot"/>
          <span className="login__dot"/>
        </div>
      </div>

      {/* Right side — glass form panel */}
      <div className="login__right">
        <div className="login__glass">

          <div className="login__header">
            <h2 className="login__welcome">
              {tab === 'login' ? 'Welcome back' : 'Join Safrat'}
            </h2>
            <p className="login__sub-text">
              {tab === 'login'
                ? 'Sign in to continue your journey'
                : 'Start planning your next adventure'}
            </p>
          </div>

          {error && (
            <div className="login__error">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6.5 3.5v3M6.5 8.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          {tab === 'login' && (
            <div className="login__hint">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 5v3M6 3.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Use <strong>admin@admin.com</strong> to access the dashboard
            </div>
          )}

          <form className="login__form" onSubmit={handleSubmit}>

            {tab === 'signup' && (
              <div className="login__field">
                <label className="login__label">Full name</label>
                <input
                  type="text"
                  className="login__input"
                  placeholder="John Smith"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            )}

            <div className="login__field">
              <label className="login__label">Email</label>
              <input
                type="email"
                className="login__input"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="login__field">
              <div className="login__label-row">
                <label className="login__label">Password</label>
                {tab === 'login' && (
                  <button type="button" className="login__forgot">Forgot password?</button>
                )}
              </div>
              <div className="login__input-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="login__input login__input--pass"
                  placeholder="••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button type="button" className="login__eye" onClick={() => setShowPass(p => !p)}>
                  {showPass ? (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M2 2l11 11M6.2 6.3A2 2 0 009.7 9.8M3.8 3.9C2.6 4.9 1.5 6.2 1.5 7.5c0 1.5 2.5 4.5 6 4.5 1.3 0 2.5-.5 3.5-1.3M5.5 3.2C6 3.1 6.7 3 7.5 3c3.5 0 6 3 6 4.5 0 .7-.4 1.5-1 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M1.5 7.5S4 3 7.5 3 13.5 7.5 13.5 7.5 11 12 7.5 12 1.5 7.5 1.5 7.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.2"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`login__submit ${loading ? 'login__submit--loading' : ''}`}
              disabled={loading}
            >
              {loading ? <span className="login__spinner"/> : tab === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>

          </form>

          <div className="login__divider">
            <span/><p>or</p><span/>
          </div>

          <button className="login__google">
            <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <p className="login__switch">
            {tab === 'login' ? 'Are you new? ' : 'Already have an account? '}
            <button
              type="button"
              className="login__switch-btn"
              onClick={() => { setTab(tab === 'login' ? 'signup' : 'login'); setError('') }}
            >
              {tab === 'login' ? 'Create an Account' : 'Sign in'}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}