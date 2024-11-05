import React, { useState } from 'react'
import { useBooking } from '../../contexts/BookingContext'
import { CreditCard, Lock, ChevronLeft, Calendar, User, Mail, Phone, Check } from 'lucide-react'

const Confirmation = () => {
  const { bookingData, setCurrentStep } = useBooking()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  })

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      setPaymentStatus('success')
      // Send confirmation email
      await sendConfirmationEmail(bookingData)
    } catch (error) {
      setPaymentStatus('failed')
    } finally {
      setIsProcessing(false)
    }
  }

  if (paymentStatus === 'success') {
    return <SuccessState bookingData={bookingData} />
  }

  if (paymentStatus === 'failed') {
    return <FailureState onRetry={() => setPaymentStatus(null)} />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Booking Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-6">Booking Summary</h3>
          
          {/* Room Details */}
          <div className="mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">{bookingData.room.name}</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
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
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="text-gray-400" size={18} />
              <div>
                <p className="text-sm text-gray-500">Guest</p>
                <p className="font-medium">
                  {bookingData.contactInfo.firstName} {bookingData.contactInfo.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-gray-400" size={18} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{bookingData.contactInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-gray-400" size={18} />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{bookingData.contactInfo.phone}</p>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mt-6 pt-6 border-t">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Room Rate</span>
                <span>{bookingData.room.price} × {calculateNights()} nights</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-blue-600">{bookingData.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-6">Payment Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => setPaymentDetails({
                    ...paymentDetails,
                    cardNumber: e.target.value
                  })}
                  className="w-full p-3 pl-10 border border-gray-200 rounded-lg"
                  placeholder="1234 5678 9012 3456"
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Card Holder Name</label>
              <input
                type="text"
                value={paymentDetails.cardHolder}
                onChange={(e) => setPaymentDetails({
                  ...paymentDetails,
                  cardHolder: e.target.value
                })}
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Expiry Date</label>
                <input
                  type="text"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails({
                    ...paymentDetails,
                    expiryDate: e.target.value
                  })}
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">CVV</label>
                <div className="relative">
                  <input
                    type="password"
                    maxLength="3"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails({
                      ...paymentDetails,
                      cvv: e.target.value
                    })}
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="123"
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 
                         transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Booking
                    <Lock size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SuccessState = ({ bookingData }) => (
  <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <Check className="w-8 h-8 text-green-500" />
    </div>
    <h2 className="text-2xl font-semibold mb-4">Booking Confirmed!</h2>
    <p className="text-gray-600 mb-6">
      Thank you for choosing Talaysai Hotel. A confirmation email has been sent to {bookingData.contactInfo.email}
    </p>
    <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
      <h3 className="font-semibold mb-4">Booking Details</h3>
      <div className="space-y-2">
        <p><span className="text-gray-500">Booking ID:</span> #{generateBookingId()}</p>
        <p><span className="text-gray-500">Check-in:</span> {bookingData.checkIn.toLocaleDateString()}</p>
        <p><span className="text-gray-500">Check-out:</span> {bookingData.checkOut.toLocaleDateString()}</p>
        <p><span className="text-gray-500">Room:</span> {bookingData.room.name}</p>
      </div>
    </div>
    <div className="space-x-4">
      <button 
        onClick={() => window.print()}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Print Confirmation
      </button>
    </div>
  </div>
)

const FailureState = ({ onRetry }) => (
  <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <X className="w-8 h-8 text-red-500" />
    </div>
    <h2 className="text-2xl font-semibold mb-4">Payment Failed</h2>
    <p className="text-gray-600 mb-6">
      We couldn't process your payment. Please try again or use a different payment method.
    </p>
    <button
      onClick={onRetry}
      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
    >
      Try Again
    </button>
  </div>
)

const calculateNights = (checkIn, checkOut) => {
  const diffTime = checkOut - checkIn
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const generateBookingId = () => {
  return 'BK' + Date.now().toString().slice(-8)
}

export default Confirmation