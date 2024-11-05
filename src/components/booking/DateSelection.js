import React from 'react'
import { useBooking } from '../../contexts/BookingContext'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

const DateSelection = () => {
  const { bookingData, updateBooking, setCurrentStep } = useBooking()

  const handleDateChange = (type, date) => {
    updateBooking(type, new Date(date))
  }

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0
    const diffTime = bookingData.checkOut - bookingData.checkIn
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    const pricePerNight = parseInt(bookingData.room.price.replace(/,/g, ''))
    return (nights * pricePerNight).toLocaleString()
  }

  const handleContinue = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      updateBooking('totalPrice', calculateTotal())
      setCurrentStep(3)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Selected Room Summary */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">Selected Room</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-800">{bookingData.room.name}</p>
              <p className="text-sm text-gray-600">{bookingData.room.capacity}</p>
            </div>
            <p className="text-xl font-bold text-blue-600">{bookingData.room.price}/night</p>
          </div>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
            <div className="relative">
              <input
                type="date"
                className="w-full p-3 pl-10 border border-gray-200 rounded-lg"
                min={new Date().toISOString().split('T')[0]}
                value={bookingData.checkIn ? bookingData.checkIn.toISOString().split('T')[0] : ''}
                onChange={(e) => handleDateChange('checkIn', e.target.value)}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
            <div className="relative">
              <input
                type="date"
                className="w-full p-3 pl-10 border border-gray-200 rounded-lg"
                min={bookingData.checkIn ? new Date(bookingData.checkIn).toISOString().split('T')[0] : 
                     new Date().toISOString().split('T')[0]}
                value={bookingData.checkOut ? bookingData.checkOut.toISOString().split('T')[0] : ''}
                onChange={(e) => handleDateChange('checkOut', e.target.value)}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        {/* Stay Summary */}
        {bookingData.checkIn && bookingData.checkOut && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium mb-3">Stay Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{calculateNights()} nights</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rate per night</span>
                <span className="font-medium">{bookingData.room.price}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-blue-600">{calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={16} />
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!bookingData.checkIn || !bookingData.checkOut}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg
                     ${bookingData.checkIn && bookingData.checkOut
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

export default DateSelection