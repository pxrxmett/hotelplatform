import React from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Home as HomeIcon, BedDouble, Info, Phone, Calendar } from 'lucide-react'
import Navigation from './components/layout/Navigation'
import Hero from './components/home/Hero'
import Facilities from './components/home/Facilities'
import RoomsList from './components/home/RoomsList'
import Footer from './components/layout/Footer'
import Reviews from './components/home/Reviews'
import Rooms from './pages/Rooms'
import Booking from './pages/Booking'
import BookingConfirmation from './pages/BookingConfirmation'

const HomePage = () => (
  <>
    <Hero />
    <Facilities />
    <RoomsList />
    <Reviews />
    <Footer />
  </>
)

const About = () => (
  <div className="container mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8">About Us</h1>
  </div>
)

const Contact = () => (
  <div className="container mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
  </div>
)

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const bottomNavItems = [
    { icon: HomeIcon, label: 'Home', path: '/' },
    { icon: BedDouble, label: 'Rooms', path: '/rooms' },
    { icon: Info, label: 'About', path: '/about' },
    { icon: Phone, label: 'Contact', path: '/contact' }
  ]

  const handleBookNow = () => {
    navigate('/rooms')
  }

  // Check if current page is booking related
  const isBookingRelatedPage = location.pathname.includes('/booking')

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Navigation />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/confirmation" element={<BookingConfirmation />} />
        </Routes>
      </main>

      {/* Floating Action Button (FAB) for Booking */}
      {!isBookingRelatedPage && (
        <button
          onClick={handleBookNow}
          className="fixed right-4 bottom-20 md:hidden z-50 bg-blue-600 text-white 
                   p-4 rounded-full shadow-lg hover:bg-blue-700 
                   transition-all duration-200 hover:scale-105
                   active:scale-95"
          aria-label="Book Now"
        >
          <Calendar size={24} />
        </button>
      )}

      {/* Mobile Bottom Navigation */}
      {!isBookingRelatedPage && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40 shadow-lg">
          <div className="grid grid-cols-4 h-16">
            {bottomNavItems.map((item, index) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <a
                  key={index}
                  href={item.path}
                  className={`flex flex-col items-center justify-center space-y-1
                           transition-colors duration-200 relative
                           ${isActive 
                             ? 'text-blue-600' 
                             : 'text-gray-600 hover:text-blue-600'}`}
                >
                  <Icon size={20} />
                  <span className="text-xs font-medium">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                                  w-8 h-0.5 bg-blue-600 rounded-t-full" />
                  )}
                </a>
              )
            })}
          </div>
        </nav>
      )}
    </div>
  )
}

export default App