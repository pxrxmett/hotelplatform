import React, { useState, useEffect } from 'react'
import { Calendar, Users, Edit2, Trash2, Search } from 'lucide-react'

const BookingManagement = () => {
  const [bookings, setBookings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    // Load bookings from localStorage (in a real app, this would be an API call)
    const loadedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    setBookings(loadedBookings)
  }, [])

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // Update booking status
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      )
      
      // Save to localStorage
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))
      setBookings(updatedBookings)
    }
  }

  const handleModify = (bookingId) => {
    // Implement modify functionality
    console.log('Modify booking:', bookingId)
  }

  const filteredBookings = bookings
    .filter(booking => 
      (filterStatus === 'all' || booking.status === filterStatus) &&
      (booking.id.includes(searchTerm) || 
       booking.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Bookings</h2>
        
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="all">All Bookings</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.map(booking => (
          <div 
            key={booking.id}
            className={`border rounded-lg p-4 ${
              booking.status === 'cancelled' ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{booking.roomType}</h3>
                <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
              </div>
              <div className="flex gap-2">
                {booking.status !== 'cancelled' && (
                  <>
                    <button
                      onClick={() => handleModify(booking.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <div>
                  <p className="text-xs">Check-in</p>
                  <p className="text-sm font-medium">{booking.checkIn}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <div>
                  <p className="text-xs">Check-out</p>
                  <p className="text-sm font-medium">{booking.checkOut}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={16} />
                <div>
                  <p className="text-xs">Guests</p>
                  <p className="text-sm font-medium">
                    {booking.guests.adults} Adults, {booking.guests.children} Children
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Status</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No bookings found
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingManagement