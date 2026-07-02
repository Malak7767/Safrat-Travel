import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
import img1 from '../assets/images/amalfi1.jpg';
import img2 from '../assets/images/kyoto4.jpg';
import img3 from '../assets/images/mal.jpg';
import img4 from '../assets/images/g1.jpg';
import logo from '../assets/images/logos_transparent.png';
export default function LandingPage() {
  const navigate = useNavigate()
  const goToChat = () => navigate('/login')

  return (
    <div className="landing">

      {/* NAV */}
      <nav className="landing-nav">
        <a className="nav-logo" href="#">
         <img src={logo} alt="Safrat Travel Logo" className="nav-logo-img" />
        </a>
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#Capabilities">Capability</a> 
          <a href="#how-it-works">How it works</a>
          
        </div>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={goToChat}>Sign in</button>
          <button className="btn-primary" onClick={goToChat}>Get Started</button>
        </div>
      </nav>

    
{/* HERO */}
<section className="hero" id="hero">
  <div className="hero-bg-mesh"></div>
  <div className="hero-bg-glow"></div>
  <div className="hero-bg-glow2"></div>

  <div className="hero-content">
    <div className="hero-eyebrow">
      <span className="hero-eyebrow-dot"></span>
      AI-Powered Travel Intelligence
    </div>
    <h1>
      Your world.<br />
      <em>Planned by AI.</em><br />
      Executed flawlessly.
    </h1>
    <p className="hero-desc">
      Safrat Travel combines concierge-grade intelligence with agency-level automation.
      From bespoke itineraries to supplier workflows — one platform, zero friction.
    </p>
    <div className="hero-search">
      <div className="hero-search-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Ask Safrat anything..."
        onKeyDown={(e) => e.key === 'Enter' && goToChat()}
      />
      <button className="hero-search-btn" onClick={goToChat}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    <p className="hero-hint">Try: "Business trip to Tokyo, 3 nights, 5-star, near Shinjuku."</p>
    <div className="hero-social">
      <div className="hero-avatars">
        <div className="av">JL</div>
        <div className="av">MR</div>
        <div className="av">AK</div>
        <div className="av">SA</div>
      </div>
      <div className="hero-rating">
        <span className="stars">★★★★★</span> <strong>4.9</strong> · Trusted by 12,000+ travelers &amp; 800+ agencies
      </div>
    </div>
  </div>

  <div className="hero-visual">
    <div className="badge-float flight">
      <div className="badge-icon" style={{ background: 'rgba(55,138,221,0.15)' }}>✈️</div>
      <div>
        <p>Flight Confirmed</p>
        <span>LHR → KIX · Apr 14</span>
      </div>
    </div>

    <div className="chat-card">
      <div className="chat-card-glow"></div>
      <div className="chat-header">
        <div className="chat-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="chat-header-text">
          <p>Safrat AI</p>
          <span>● Active now</span>
        </div>
        <div className="chat-header-action">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
          </svg>
        </div>
      </div>

      <div className="chat-bubble-user">
        Plan a 5-day escape to Kyoto for 2, cultural focus, mid-April.
      </div>

      <div className="chat-bubble-ai-wrap">
        <div className="chat-ai-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="chat-bubble-ai">
          Perfect timing — cherry blossoms! 🌸<br />
          I've built your 5-day Kyoto itinerary with temple walks, private tea ceremony, and a Nishiki Market morning. Curating 3 hotel options now...
        </div>
      </div>

      <div className="itinerary-card">
        <div className="itinerary-card-header">
          <div className="itinerary-label">ITINERARY DRAFT</div>
          <div className="itinerary-meta">5 days · 2 guests</div>
        </div>
        <div className="itinerary-item">
          <div className="itinerary-item-icon">🏯</div>
          Day 1 — Fushimi Inari &amp; Gion Walk
        </div>
        <div className="itinerary-item">
          <div className="itinerary-item-icon">🍵</div>
          Day 2 — Arashiyama &amp; Tea Ceremony
        </div>
        <div className="more-days">··· +3 more days being generated...</div>
      </div>

      <div className="chat-typing">
        <div className="typing-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>

    <div className="badge-float hotel">
      <div className="badge-icon" style={{ background: 'rgba(29,158,117,0.15)' }}>🏨</div>
      <div>
        <p>Hotel Secured</p>
        <span>The Ritz Kyoto · 5 nights</span>
      </div>
    </div>

    <div className="hero-scroll">
      <span>Scroll to explore</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </div>
  </div>
</section>
      {/* FEATURES */}
      <section className="features" id="Capabilities">
        <div className="features-header">
          <div className="section-eyebrow eyebrow-sky">⚡ Platform Capabilities</div>
          <h2 className="section-title">Everything in <em>one intelligent platform</em></h2>
          <p className="section-subtitle">From first prompt to final boarding pass — Safrat handles the complexity so you don't have to.</p>
        </div>
        <div className="features-grid">
          <div className="feat-card dark">
            <div className="feat-icon dark-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="feat-title">24/7 AI Travel Consultant</h3>
            <p className="feat-desc">Never miss a booking window. Safrat's AI is awake when your team isn't — responding to client queries, building itineraries, and handling changes across time zones.</p>
            <div className="stat-row">
              <div className="stat-box"><div className="stat-num">2.4s</div><div className="stat-lbl">Avg. response time</div></div>
              <div className="stat-box"><div className="stat-num">98%</div><div className="stat-lbl">Query resolution rate</div></div>
              <div className="stat-box"><div className="stat-num">24/7</div><div className="stat-lbl">Always available</div></div>
            </div>
          </div>
          <div className="feat-card">
            <div className="feat-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="feat-title">Automated Quotations</h3>
            <p className="feat-desc">Generate client-ready PDF proposals in seconds. Fully branded, with live pricing from GDS systems.</p>
           <div className="quote-card">
  <div className="quote-label">Recent Quotes</div>
  <div className="quote-item">
    <div className="quote-dot sent">✓</div>
    <span>Quote #SAF-2049 <span className="quote-tag">sent</span></span>
    <div className="quote-right">
      <span className="quote-meta">2 mins ago · $4,300</span>
    </div>
  </div>
  <div className="quote-item">
    <div className="quote-dot building">●</div>
    <span>Quote #SAF-2050 <span className="quote-tag building-tag">building</span></span>
    <div className="quote-right">
      <span className="quote-meta">Bali · 7 nights · 4 pax</span>
    </div>
  </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="destinations">
        <div className="destinations-header">
          <div>
            <div className="section-eyebrow eyebrow-teal">🌍 Curated Picks</div>
            <h2 className="section-title">AI-curated <em>dream destinations</em></h2>
            <p className="section-subtitle">From prompt to passport stamp — all automated.</p>
          </div>
          <a className="dest-link" href="#">Explore all →</a>
        </div>
        <div className="destinations-grid">
          {[
  {
    img: img1,
    badge: '🏨 Hotel Secured · Villa Treville',
    name: 'Amalfi Coast',
    meta: 'Italy · 7 nights from $3,400'
  },
  {
    img: img2,
    badge: '✈️ Flight Confirmed · JAL 715',
    name: 'Kyoto',
    meta: 'Japan · 5 nights from $2,800'
  },
  {
    img: img3,
    badge: '⭐ AI Recommended · Top Pick',
    name: 'Maldives',
    meta: 'South Asia · 6 nights from $4,900'
  },
].map((d) => (
  <div key={d.name} className="dest-card" onClick={goToChat}>
    <img src={d.img} alt={d.name} className="dest-img" />
    <div className="dest-overlay">
      <div className="dest-badge">{d.badge}</div>
      <div className="dest-name">{d.name}</div>
      <div className="dest-meta">{d.meta}</div>
    </div>
  </div>
))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how" id="how-it-works">
        <div className="how-inner">
          <div>
            <div className="section-eyebrow eyebrow-gold">✦ How It Works</div>
            <h2 className="section-title">From idea to <em>boarding pass</em></h2>
            <div className="how-steps">
              {[
                { n: '01', label: 'Discovery', title: 'Describe your journey', desc: 'Type naturally — "romantic anniversary in Santorini, first week of June, no budget cap." Safrat understands context, preferences, and implied requirements.' },
                { n: '02', label: 'Curation', title: 'AI builds your itinerary', desc: 'Within seconds, Safrat cross-references real-time inventory across flights, hotels, and experiences. A curated, costed itinerary — not a list of links.' },
                { n: '03', label: 'Refinement', title: 'Adjust in conversation', desc: 'Swap the flight, upgrade the hotel, remove a day — all through natural language. The AI remembers context across the entire conversation.' },
                { n: '04', label: 'Booking', title: 'One-click confirmation', desc: 'Approve, pay, and instantly receive your full booking documentation. Flights, hotels, transfers — confirmed in one go.' },
              ].map((s, i) => (
                <div key={s.n} className={`step${i === 0 ? ' active' : ''}`}>
                  <div className="step-num">{s.n}</div>
                  {i < 3 && <div className="step-line"></div>}
                  <div className="step-body">
                    <div className="step-label">{s.label}</div>
                    <h3 className="step-title">{s.title}</h3>
                    <p className="step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="booking-preview">
            <div className="booking-img">
  <img src={img4} alt="Santorini" />
</div>
            <div className="booking-body">
              {[
                { icon: '✈️', name: 'British Airways · BA0634', sub: 'Jun 7 · 09:20 LHR → 15:40 ATH', badge: 'Confirmed', cls: 'badge-confirmed' },
                { icon: '🏨', name: 'Canaves Oia Epitome', sub: 'Jun 7–13 · 6 nights · Suite', badge: 'Secured', cls: 'badge-secured' },
                { icon: '🚗', name: 'Private Transfer · JTR Airport', sub: 'Jun 7 · Mercedes V-Class', badge: 'Booked', cls: 'badge-booked' },
              ].map((r) => (
                <div key={r.name} className="booking-row">
                  <div className="booking-row-left">
                    <div className="booking-row-icon">{r.icon}</div>
                    <div className="booking-row-text"><p>{r.name}</p><span>{r.sub}</span></div>
                  </div>
                  <span className={`booking-badge ${r.cls}`}>{r.badge}</span>
                </div>
              ))}
              <div className="booking-total">
                <span>Total package</span>
                <strong>$7,340</strong>
              </div>
              <button className="btn-confirm" onClick={goToChat}>Confirm &amp; Pay All</button>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-strip">
        <div className="reviews-strip-header">
          <div>
            <div className="section-eyebrow eyebrow-sky">⭐ Loved by travelers</div>
            <h3 className="reviews-strip-title">Real feedback from people who plan with Safrat</h3>
          </div>
          <p className="reviews-strip-subtitle">From dream vacations to complex business travel, our travelers rely on Safrat for fast, thoughtful planning.</p>
        </div>

        <div className="reviews-strip-inner">
          <div className="review-mini">
            <div className="review-card-top">
              <div className="avatars">MR</div>
              <span className="review-badge">Verified traveler</span>
            </div>
            <div className="review-content">
              <div className="review-stars">★★★★★</div>
              <p>“Safrat felt like having a personal travel concierge in my pocket — thoughtful, quick, and beautifully organized.”</p>
              <div className="review-meta">
                <strong>Maria Rossi</strong>
                <span>Paris · Honeymoon</span>
              </div>
            </div>
          </div>

          <div className="review-mini">
            <div className="review-card-top">
              <div className="avatars">AK</div>
              <span className="review-badge">Business traveler</span>
            </div>
            <div className="review-content">
              <div className="review-stars">★★★★★</div>
              <p>“We cut our planning time by nearly 80%. The itinerary was polished, accurate, and ready to send to clients.”</p>
              <div className="review-meta">
                <strong>Ahmed Khalil</strong>
                <span>Dubai · Agency Lead</span>
              </div>
            </div>
          </div>

          <div className="review-mini">
            <div className="review-card-top">
              <div className="avatars">JL</div>
              <span className="review-badge">Family trip</span>
            </div>
            <div className="review-content">
              <div className="review-stars">★★★★★</div>
              <p>“Every detail felt considered — from the hotel to the transfers. It made our family trip feel effortless.”</p>
              <div className="review-meta">
                <strong>James Liu</strong>
                <span>Singapore · Family Escape</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="cta">
        <h2>Ready to plan <em>smarter?</em></h2>
        <p>Join thousands of travelers and agencies who've already discovered how effortless travel planning can be.</p>
        <div className="cta-actions">
          <button className="btn-cta-primary" onClick={goToChat}>Get Started Free</button>
         
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-logo">
          
          Safrat Travel
        </div>
        <div className="footer-copy">© 2026 Safrat Travel. All rights reserved.</div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>

    </div>
  )
}