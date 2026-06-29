import { useState, useRef, useEffect } from 'react'

import TripCard from './TripCard'
import { CHAT_MESSAGES, AI_RESPONSES, TRIPS, KYOTO_ITINERARY_DAYS, TRIP_CHAT_MESSAGES } from '../data'
import './ChatPanel.css'

const WELCOME_MESSAGES = [
  {
    id: 1,
    role: 'ai',
    text: "Hello! 👋 I'm Safrat, your personal AI travel concierge.\n\nTell me where you dream of going — destination, dates, budget, travel style — and I'll build a fully personalised itinerary for you.",
  },
]

/* ─── Language detection ─────────────────────────────────── */
const isArabic = (text) => /[\u0600-\u06FF]/.test(text)
const isFrench = (text) => /\b(je|je veux|bonjour|salut|voyage|partir|aller|cherche|vacances|séjour|hôtel|plage|montagne|romantique|famille|culture)\b/i.test(text)

/* ─── Arabic responses ───────────────────────────────────── */
const ARABIC_RESPONSES = {
  default: {
    text: "أهلاً! 👋 أنا سفرات، مساعدك الشخصي للسفر.\n\nأخبرني أين تحلم بالسفر — الوجهة، التواريخ، الميزانية، وأسلوب سفرك — وسأبني لك خطة رحلة متكاملة.",
    tripCard: null,
  },
  beach: {
    text: "اختيار رائع! 🌊 سنتوريني في اليونان وجهة حالمة تجمع بين الشواطئ الصافية والغروب الأسطوري.\n\nأقوم الآن بالبحث عن أفضل الفنادق الفاخرة لك...\n\n**✓ كانافيس أويا إيبيتوم** - 5 ليالٍ بإطلالة على البحر\n**✓ طيران الإمارات** - درجة رجال الأعمال\n**✓ جولة خاصة في القرى التقليدية**\n\nالتكلفة الإجمالية المتوقعة: **$8,500**",
    tripCard: null,
  },
  mountain: {
    text: "خيار مميز! 🏔️ جبال الألب السويسرية في يوليو رائعة للمغامرة.\n\nأبحث لك عن أفضل المنتجعات الجبلية الفاخرة...\n\n**✓ منتجع زيرمات الفاخر** - 8 ليالٍ\n**✓ الخطوط السويسرية** - درجة الأعمال\n**✓ جولات مع مرشد خاص يومياً**\n\nالتكلفة الإجمالية المتوقعة: **$14,200**",
    tripCard: 1,
  },
  romantic: {
    text: "ما أجمل هذا! 💑 الساحل الأمالفي في إيطاليا وجهة رومانسية لا تُنسى.\n\nأقوم بإعداد تجربة مخصصة للأزواج...\n\n**✓ فيلا تريفيل أمالفي** - 6 ليالٍ على المنحدر\n**✓ عشاء خاص على الشاطئ تحت النجوم**\n**✓ جولة بالقارب على طول الساحل**\n\nالتكلفة الإجمالية المتوقعة: **$11,200**",
    tripCard: null,
  },
  family: {
    text: "رائع! 👨‍👩‍👧‍👦 رحلة عائلية لا تُنسى تنتظركم.\n\nأبحث عن أفضل الوجهات المناسبة للعائلات...\n\n**✓ فندق 5 نجوم مع نادٍ للأطفال**\n**✓ أنشطة ترفيهية يومية للجميع**\n**✓ وجبات متنوعة تناسب الأطفال**\n\nالتكلفة الإجمالية المتوقعة: **$12,400**",
    tripCard: 2,
  },
  cultural: {
    text: "اختيار ثقافي رائع! 🏯 كيوتو مدينة التاريخ والجمال.\n\nأجهز لك تجربة ثقافية أصيلة...\n\n**✓ جولات المعابد التاريخية**\n**✓ تجربة حفل الشاي الياباني الأصيل**\n**✓ مرشد خاص يتحدث العربية**\n\nالتكلفة الإجمالية المتوقعة: **$7,200**",
    tripCard: 4,
  },
}

/* ─── French responses ───────────────────────────────────── */
const FRENCH_RESPONSES = {
  default: {
    text: "Bonjour! 👋 Je suis Safrat, votre conseiller voyage IA personnel.\n\nDites-moi où vous rêvez d'aller — destination, dates, budget, style de voyage — et je construirai un itinéraire entièrement personnalisé pour vous.",
    tripCard: null,
  },
  beach: {
    text: "Excellent choix! 🌊 Santorin en Grèce est une destination de rêve avec ses plages cristallines et ses couchers de soleil légendaires.\n\nJe recherche les meilleurs hôtels de luxe pour vous...\n\n**✓ Canaves Oia Epitome** - 5 nuits avec vue sur la caldeira\n**✓ Swiss Air** - Classe Affaires\n**✓ Transfert privé en bateau**\n\nCoût total estimé: **$8,500**",
    tripCard: null,
  },
  mountain: {
    text: "Magnifique! 🏔️ Les Alpes suisses en juillet sont parfaites pour l'aventure.\n\nJe recherche les meilleurs lodges de montagne pour vous...\n\n**✓ Resort de luxe à Zermatt** - 8 nuits\n**✓ Swiss Air** - Classe Affaires\n**✓ Guide privé chaque jour**\n\nCoût total estimé: **$14,200**",
    tripCard: 1,
  },
  romantic: {
    text: "Quelle belle idée! 💑 La Côte Amalfitaine en Italie est la destination romantique par excellence.\n\nJe prépare une expérience sur mesure pour vous deux...\n\n**✓ Villa Treville Amalfi** - 6 nuits sur la falaise\n**✓ Dîner privé sur la plage sous les étoiles**\n**✓ Croisière privée le long de la côte**\n\nCoût total estimé: **$11,200**",
    tripCard: null,
  },
  family: {
    text: "Parfait! 👨‍👩‍👧‍👦 Un voyage en famille inoubliable vous attend.\n\nJe recherche les meilleures destinations familiales...\n\n**✓ Hôtel 5 étoiles avec club enfants**\n**✓ Activités quotidiennes pour toute la famille**\n**✓ Menus adaptés aux enfants**\n\nCoût total estimé: **$12,400**",
    tripCard: 2,
  },
  cultural: {
    text: "Excellent choix culturel! 🏯 Kyoto, la ville de l'histoire et de la beauté japonaise.\n\nJe prépare une expérience culturelle authentique...\n\n**✓ Visites des temples historiques**\n**✓ Cérémonie du thé japonaise traditionnelle**\n**✓ Guide privé francophone**\n\nCoût total estimé: **$7,200**",
    tripCard: 4,
  },
}

/* ─── Response selectors ─────────────────────────────────── */
function getArabicResponse(text) {
  if (text.includes('شاطئ') || text.includes('سنتوريني') || text.includes('يونان') || text.includes('بحر') || text.includes('مالديف') || text.includes('جزيرة')) return ARABIC_RESPONSES.beach
  if (text.includes('جبل') || text.includes('الب') || text.includes('سويسر') || text.includes('تسلق') || text.includes('مغامرة')) return ARABIC_RESPONSES.mountain
  if (text.includes('رومانسي') || text.includes('شهر عسل') || text.includes('زوج') || text.includes('حب') || text.includes('امالفي')) return ARABIC_RESPONSES.romantic
  if (text.includes('عائلة') || text.includes('أطفال') || text.includes('عيال')) return ARABIC_RESPONSES.family
  if (text.includes('ثقافة') || text.includes('كيوتو') || text.includes('يابان') || text.includes('تاريخ') || text.includes('معبد')) return ARABIC_RESPONSES.cultural
  return ARABIC_RESPONSES.default
}

function getFrenchResponse(text) {
  const l = text.toLowerCase()
  if (l.includes('plage') || l.includes('santorin') || l.includes('mer') || l.includes('île') || l.includes('grèce') || l.includes('grec')) return FRENCH_RESPONSES.beach
  if (l.includes('montagne') || l.includes('alpes') || l.includes('suisse') || l.includes('randonnée') || l.includes('ski')) return FRENCH_RESPONSES.mountain
  if (l.includes('romantique') || l.includes('lune de miel') || l.includes('couple') || l.includes('amour') || l.includes('amalfi')) return FRENCH_RESPONSES.romantic
  if (l.includes('famille') || l.includes('enfants') || l.includes('kids')) return FRENCH_RESPONSES.family
  if (l.includes('culture') || l.includes('kyoto') || l.includes('japon') || l.includes('histoire') || l.includes('temple')) return FRENCH_RESPONSES.cultural
  return FRENCH_RESPONSES.default
}

function getAIResponse(text) {
  if (isArabic(text)) return getArabicResponse(text)
  if (isFrench(text)) return getFrenchResponse(text)
  const l = text.toLowerCase()
  if (l.includes('beach') || l.includes('maldiv') || l.includes('island')) return AI_RESPONSES.beach
  if (l.includes('mountain') || l.includes('alps') || l.includes('hik') || l.includes('swiss')) return AI_RESPONSES.mountain
  if (l.includes('romantic') || l.includes('honeymoon') || l.includes('couple')) return AI_RESPONSES.romantic
  if (l.includes('family') || l.includes('kids') || l.includes('children')) return AI_RESPONSES.family
  if (l.includes('cultur') || l.includes('kyoto') || l.includes('japan') || l.includes('museum')) return AI_RESPONSES.cultural
  return AI_RESPONSES.default
}

/* ─── Text parser with RTL support ──────────────────────── */
function parseAIText(text, arabic = false) {
  return text.split('\n\n').map((para, i) => {
    const isHighlight = i === 0
    const parts = para.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>
      }
      return part
    })
    return (
      <p
        key={i}
        className={isHighlight ? 'ai-para--highlight' : ''}
        style={arabic ? { direction: 'rtl', textAlign: 'right', fontFamily: "'Tajawal', sans-serif" } : {}}
      >
        {parts}
      </p>
    )
  })
}

/* ─── Component ──────────────────────────────────────────── */
export default function ChatPanel({ trip, onBookNow, onItineraryUpdate }) {
  const [messages, setMessages] = useState(
  trip ? (TRIP_CHAT_MESSAGES[trip.id] || CHAT_MESSAGES) : WELCOME_MESSAGES
)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = async (text) => {
  if (!text.trim() || typing) return
  setMessages(prev => [...prev, { id: Date.now(), role: 'user', text }])
  setInput('')
  setTyping(true)
  await new Promise(r => setTimeout(r, 1600))
  const response = getAIResponse(text)

  // ── Trigger live itinerary if cultural/Kyoto ──
  const isKyoto =
    text.includes('كيوتو') || text.includes('معبد') || text.includes('يابان') ||
    text.toLowerCase().includes('kyoto') || text.toLowerCase().includes('temple') ||
    text.toLowerCase().includes('japan') || text.toLowerCase().includes('kyoto') ||
    text.toLowerCase().includes('culture') ||
    (isFrench(text) && (text.toLowerCase().includes('kyoto') || text.toLowerCase().includes('temple') || text.toLowerCase().includes('japon')))

  if (isKyoto) {
    setTimeout(() => {
      onItineraryUpdate?.({ days: KYOTO_ITINERARY_DAYS, trip: TRIPS[4] })
    }, 800)
  }

  setMessages(prev => [...prev, {
    id: Date.now() + 1,
    role: 'ai',
    text: response.text,
    tripCard: response.tripCard,
  }])
  setTyping(false)
}

  return (
    <div className="chat-panel">

      {/* Topbar */}
      <div className="chat-topbar">
        <div className="chat-topbar__left">
          <div className="chat-topbar__avatar">S</div>
          <div>
            <p className="chat-topbar__name">{trip?.title || 'New Conversation'}</p>
            <p className="chat-topbar__sub">Safrat AI · Responding</p>
          </div>
        </div>
        <div className="chat-topbar__center">
          <div className="chat-topbar__live">
            <span className="live-dot"/>
            Real-time automation active
          </div>
        </div>
        <div className="chat-topbar__right">
          <button className="topbar-icon-btn">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 4h11M4 7.5h7M6 11h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
          </button>
          <button className="topbar-icon-btn">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7.5 5v2.5l2 1.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </button>
          <div className="chat-topbar__user">
            <span>Malak S.</span>
            <div className="chat-topbar__useravatar">MS</div>
          </div>
        </div>
      </div>

      {/* Trip hero */}
      {trip && (
        <div className="trip-hero">
          <img src={trip.image} alt={trip.destination} className="trip-hero__img" onError={e => { e.target.style.display = 'none' }}/>
          <div className="trip-hero__overlay"/>
          <div className="trip-hero__content">
            <p className="trip-hero__location">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="4.5" r="2" stroke="white" strokeWidth="1.2"/><path d="M5.5 10C5.5 10 2 7 2 4.5a3.5 3.5 0 017 0C9 7 5.5 10 5.5 10z" stroke="white" strokeWidth="1.2"/></svg>
              {trip.destination}
            </p>
            <h2 className="trip-hero__title">{trip.title}</h2>
            <div className="trip-hero__stats">
              <div className="trip-hero__stat">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1.5" stroke="white" strokeWidth="1.1"/><path d="M4 1v2M8 1v2M1 5.5h10" stroke="white" strokeWidth="1.1" strokeLinecap="round"/></svg>
                <span>Duration</span><strong>{trip.days} Days</strong>
              </div>
              <div className="trip-hero__stat">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 10h6M6 2a2 2 0 100 4 2 2 0 000-4z" stroke="white" strokeWidth="1.1" strokeLinecap="round"/><path d="M2.5 10c0-2.2 1.8-4 3.5-4s3.5 1.8 3.5 4" stroke="white" strokeWidth="1.1" strokeLinecap="round"/></svg>
                <span>Lodging</span><strong>{trip.tags[0]}</strong>
              </div>
              <div className="trip-hero__stat">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.2 2.5L10 4l-2 2 .5 3L6 8l-2.5 1 .5-3L2 4l2.8-.5L6 1z" stroke="white" strokeWidth="1.1" strokeLinejoin="round"/></svg>
                <span>Activities</span><strong>12 Planned</strong>
              </div>
              <div className="trip-hero__price">{trip.budget}</div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="chat-messages">
        <div className="chat-date-sep">Today, 11:31</div>

        {messages.map(msg => {
          const arabic = isArabic(msg.text)
          return (
            <div key={msg.id} className={`chat-msg chat-msg--${msg.role}`}>
              {msg.role === 'ai' && <div className="msg-avatar msg-avatar--ai">S</div>}
              {msg.role === 'user' && <div className="msg-avatar msg-avatar--user">SM</div>}

              <div className="msg-content">
                <div className={`msg-bubble msg-bubble--${msg.role}`}>
                  {msg.role === 'ai'
                    ? parseAIText(msg.text, arabic)
                    : (
                      <p style={arabic ? { direction: 'rtl', textAlign: 'right', fontFamily: "'Tajawal', sans-serif" } : {}}>
                        {msg.text}
                      </p>
                    )
                  }
                </div>
                {msg.role === 'ai' && msg.tripCard !== null && msg.tripCard !== undefined && (
                  <TripCard trip={TRIPS[msg.tripCard]} />
                )}
              </div>
            </div>
          )
        })}

        {typing && (
          <div className="chat-msg chat-msg--ai">
            <div className="msg-avatar msg-avatar--ai">S</div>
            <div className="msg-content">
              <div className="msg-bubble msg-bubble--ai msg-bubble--typing">
                <span/><span/><span/>
              </div>
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <div className="chat-input-wrap">
          <textarea
            className="chat-input"
            placeholder="Ask Safrat anything · Add a day, swap hotel, check flights…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
            rows={1}
          />
          <div className="chat-input-right">
            <span className="chat-ai-badge">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1"/><path d="M3.5 5.5h4M5.5 3.5v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
              AI Command
            </span>
            <button
              className={`chat-send ${input.trim() ? 'chat-send--active' : ''}`}
              onClick={() => send(input)}
              disabled={!input.trim() || typing}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M9 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}