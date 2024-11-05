import React from 'react'
import { useBooking } from '../../contexts/BookingContext'
import { User, Users, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react'

const GuestInfo = () => {
  const { bookingData, updateBooking, setCurrentStep } = useBooking()

  const handleInputChange = (field, value) => {
    updateBooking('contactInfo', {
      ...bookingData.contactInfo,
      [field]: value
    })
  }

  const handleGuestChange = (type, value) => {
    updateBooking('guests', {
      ...bookingData.guests,
      [type]: parseInt(value)
    })
  }

  const isFormValid = () => {
    const { firstName, lastName, email, phone } = bookingData.contactInfo
    return firstName && lastName && email && phone
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Booking Summary */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">Booking Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Room</p>
              <p className="font-medium">{bookingData.room.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Check-in</p>
              <p className="font-medium">
                {bookingData.checkIn.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Check-out</p>
              <p className="font-medium">
                {bookingData.checkOut.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Total</p>
              <p className="font-medium text-blue-600">{bookingData.totalPrice}</p>
            </div>
          </div>
        </div>

        {/* Guest Information Form */}
        <div className="space-y-6">
          {/* Number of Guests */}
          <div>
            <h4 className="font-medium mb-3">Number of Guests</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Adults</label>
                <select
                  value={bookingData.guests.adults}
                  onChange={(e) => handleGuestChange('adults', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg"
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Children</label>
                <select
                  value={bookingData.guests.children}
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
          <div>
            <h4 className="font-medium mb-3">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">First Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={bookingData.contactInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg"
                    required
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Last Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={bookingData.contactInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg"
                    required
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={bookingData.contactInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Phone</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={bookingData.contactInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg"
                    required
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Special Requests</label>
            <textarea
              value={bookingData.specialRequests}
              onChange={(e) => updateBooking('specialRequests', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentStep(2)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={16} />
            Back
          </button>
          <button
            onClick={() => setCurrentStep(4)}
            disabled={!isFormValid()}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg
                     ${isFormValid()
                       ? 'bg-blue-500 text-white hover:bg-blue-600'
                       : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          >
            Continue
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GuestInfo