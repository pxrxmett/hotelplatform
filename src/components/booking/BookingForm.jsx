import React, { useState } from 'react'
import { Users, Calendar, ChevronRight } from 'lucide-react'
import DatePicker from './DatePicker'

const BookingForm = ({ onSubmit, selectedRoom }) => {
  const [formData, setFormData] = useState({
    guests: {
      adults: 2,
      children: 0
    },
    checkIn: null,
    checkOut: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGuestChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      guests: {
        ...prev.guests,
        [type]: parseInt(value)
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      roomType: selectedRoom?.name
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Selected Room Summary */}
      {selectedRoom && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Selected Room</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-800">{selectedRoom.name}</p>
              <p className="text-sm text-gray-600">{selectedRoom.capacity}</p>
            </div>
            <p className="text-xl font-bold text-blue-600">{selectedRoom.price}</p>
          </div>
        </div>
      )}

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DatePicker
          label="Check-in Date"
          selected={formData.checkIn}
          onChange={(date) => setFormData(prev => ({ ...prev, checkIn: date }))}
          minDate={new Date()}
          placeholderText="Select check-in date"
        />
        <DatePicker
          label="Check-out Date"
          selected={formData.checkOut}
          onChange={(date) => setFormData(prev => ({ ...prev, checkOut: date }))}
          minDate={formData.checkIn}
          placeholderText="Select check-out date"
        />
      </div>

      {/* Guests */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <select
              value={formData.guests.adults}
              onChange={(e) => handleGuestChange('adults', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg"
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={formData.guests.children}
              onChange={(e) => handleGuestChange('children', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg"
            >
              {[0, 1, 2].map(num => (
                <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-200 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-200 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-200 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-200 rounded-lg"
            required
          />
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
          rows="3"
          className="w-full p-3 border border-gray-200 rounded-lg"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg 
                 hover:bg-blue-600 transition-all duration-300 
                 flex items-center justify-center gap-2"
      >
        Complete Booking
        <ChevronRight size={16} />
      </button>
    </form>
  )
}

export default BookingForm