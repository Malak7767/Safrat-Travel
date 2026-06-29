import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ChatPanel from './components/ChatPanel'
import ItineraryPanel from './components/ItineraryPanel'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import BookingDetail from './pages/BookingDetail'
import InquiryPage from './pages/InquiryPage'
import NotificationsPage from './pages/NotificationsPage'
import BookingDetails from './pages/BookingDetails'
import SuppliersPage from './pages/SuppliersPage'
import CustomerPage from "./pages/CustomerPage"
import ReportsPage from './pages/ReportsPage'
import AIAutomationPage from './pages/AIAutomationPage'
import MyBookingsPage from './pages/MyBookingsPage'
import PaymentModal from './components/PaymentModal'
import NotificationsAdmin from './pages/NotificationsAdmin'
import { TRIPS, KYOTO_ITINERARY_DAYS, ITINERARY_DATA, TRIP_CHAT_MESSAGES, ADMIN_BOOKINGS, BOOKING_DETAILS } from './data'
import './styles/global.css'
import './App.css'

function ChatLayout({ onLogout }) {
  const [activeTrip, setActiveTrip] = useState(TRIPS[0])
  const [chatKey, setChatKey] = useState(0)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [view, setView] = useState('chat')
  const [showPayment, setShowPayment] = useState(false)      // ← was missing
  const [paidBookings, setPaidBookings] = useState([])       // ← was missing
  const [itineraryData, setItineraryData] = useState({
    days: ITINERARY_DATA[1],
    trip: TRIPS[0]
  })

  const effectiveTrip = activeTrip || itineraryData?.trip || null
  const activeBooking = BOOKING_DETAILS[effectiveTrip?.id] || null
  const bookingToUse = activeBooking || (effectiveTrip ? BOOKING_DETAILS[effectiveTrip.id] || {
    destination: effectiveTrip.destination,
    hero: effectiveTrip.image,
    subtitle: `${effectiveTrip?.tags?.[0] || 'Luxury'} Package · ${effectiveTrip?.days || 6} nights · ${effectiveTrip?.guests || 2} guests`,
    dates: effectiveTrip.dates,
    total: effectiveTrip.budget || '$0',
    status: effectiveTrip.status || 'Pending',
  } : null)

  const handleNewTrip = () => {
    setActiveTrip(null)
    setChatKey(k => k + 1)
    setView('chat')
    setItineraryData(null)
  }

  const handleSelectTrip = (trip) => {
    setActiveTrip(trip)
    setChatKey(k => k + 1)
    setView('chat')
    setItineraryData({ days: ITINERARY_DATA[trip.id], trip })
  }

  const handlePaymentSuccess = () => {
    const bookingSource = bookingToUse || {
      destination: 'Malé, Maldives',
      dates: '',
      nights: 6,
      guests: 2,
      total: '$0',
      subtitle: 'Luxury Package · 6 nights · 2 guests',
    }

    const totalVal = (bookingSource.total && bookingSource.total !== '$0') ? bookingSource.total : (effectiveTrip?.budget || '$0')

    const newBooking = {
      id: `SAF-${Math.floor(Math.random() * 9000) + 1000}`,
      destination: bookingSource.destination,
      image: bookingSource.hero || bookingSource.image || (effectiveTrip?.image) || activeTrip?.image || '',
      dates: bookingSource.dates,
      nights: bookingSource.nights || effectiveTrip?.days || 6,
      guests: bookingSource.guests || effectiveTrip?.guests || 2,
      total: totalVal,
      status: 'confirmed',
      hotel: typeof bookingSource.hotel === 'string' ? bookingSource.hotel : (bookingSource.hotel?.name || 'Soneva Jani'),
      airline: bookingSource.airline || 'British Airways',
      paidOn: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      subtitle: bookingSource.subtitle,
    }

    setPaidBookings(prev => [newBooking, ...prev])
    setShowPayment(false)
    setView('mybookings')
  }

  return (
    <div className="app">
      <Sidebar
        activeTrip={activeTrip}
        onSelectTrip={handleSelectTrip}
        onNewTrip={handleNewTrip}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
        onLogout={onLogout}
        onNotifications={() => setView('notifications')}
        notifCount={3}
      />

      <div className="app__center">
        {view === 'chat' && (
          <ChatPanel
            key={chatKey}
            trip={activeTrip}
            onBookNow={() => setView('booking')}
            onItineraryUpdate={setItineraryData}
          />
        )}
        {view === 'notifications' && (
          <NotificationsPage onBack={() => setView('chat')} />
        )}
        {view === 'booking' && (
          <BookingDetails
              onBack={() => setView('chat')}
              onPay={() => setShowPayment(true)}
              booking={bookingToUse}
            />
        )}
        {view === 'mybookings' && (                
          <MyBookingsPage
            onBack={() => setView('chat')}
            bookings={paidBookings}
          />
        )}
      </div>

      <div className="app__right">
        <ItineraryPanel
          trip={activeTrip}
          onBookNow={() => setView('booking')}
          onMyBookings={() => setView('mybookings')}  
          itineraryData={itineraryData}
        />
      </div>

      {/* Payment modal */}
      {showPayment && (
        <PaymentModal
          booking={bookingToUse || {
            destination: 'Malé, Maldives',
            subtitle: 'Luxury · 6 nights',
            total: '$0',
          }}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}
export default function App() {
  const [user, setUser] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null) // ← moved here

  const handleLogin = (userData) => setUser(userData)
  const handleLogout = () => setUser(null)
  const handleSelectBooking = (name) => setSelectedBooking(ADMIN_BOOKINGS[name])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            user
              ? <Navigate to={user.role === 'admin' ? '/admin' : '/chat'} replace />
              : <LoginPage onLogin={handleLogin} />
          }
        />

        <Route
          path="/chat"
          element={
            user
              ? <ChatLayout onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/admin"
          element={
            user?.role === 'admin'
              ? <AdminDashboard
                  user={user}
                  onLogout={handleLogout}
                  onSelectBooking={handleSelectBooking}
                />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/booking"
          element={
            user?.role === 'admin'
              ? <BookingDetail
                  booking={selectedBooking}
                  user={user}
                  onLogout={handleLogout}
                />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/suppliers"
          element={<SuppliersPage user={user} onLogout={handleLogout} />}
        />

        <Route
          path="/customers"
          element={<CustomerPage user={user} onLogout={handleLogout} />}
        />

        <Route
          path="/inquiries"
          element={<InquiryPage user={user} onLogout={handleLogout} />}
        />

        <Route
          path="/reports"
          element={<ReportsPage user={user} onLogout={handleLogout} />}
        />

        <Route
          path="/ai-automation"
          element={<AIAutomationPage user={user} onLogout={handleLogout} />}
        />
        <Route
  path="/admin/notifications"
  element={
    user?.role === 'admin'
      ? <NotificationsAdmin user={user} onLogout={handleLogout} />
      : <Navigate to="/login" replace />
  }
/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}