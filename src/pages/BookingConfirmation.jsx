import React, { useEffect, useState } from 'react'
import { Check, Download, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BookingConfirmation = () => {
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    const bookingData = localStorage.getItem('currentBooking')
    if (!bookingData) {
      navigate('/rooms')
      return
    }
    setBooking(JSON.parse(bookingData))
  }, [navigate])

  if (!booking) return null

  return (
    <>
      {/* Print Styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #print-content, #print-content * {
              visibility: visible;
            }
            #print-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none;
            }
            .print-only {
              display: block !important;
            }
          }
        `}
      </style>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div id="print-content" className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            {/* Logo - Hidden on screen, visible when printing */}
            <div className="print-only hidden mb-8">
              <img 
                src="/images/logo.png" 
                alt="Hotel Logo" 
                className="h-16 mx-auto"
              />
              <div className="text-center mt-4 text-gray-600">
                <p>123 Beach Road, Koh Samui</p>
                <p>Thailand, 84320</p>
                <p>Tel: +66 123 456 789</p>
              </div>
              <hr className="my-6 border-gray-200" />
            </div>

            {/* Success Icon - Hidden when printing */}
            <div className="no-print text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-semibold mb-4">Booking Confirmed!</h1>
              <p className="text-gray-600 mb-8">
                Thank you for choosing our hotel. A confirmation email has been sent to {booking.email}
              </p>
            </div>

            {/* Print Heading - Only visible when printing */}
            <div className="print-only hidden text-center mb-8">
              <h1 className="text-2xl font-semibold">Booking Confirmation</h1>
              <p className="text-gray-600 mt-2">Confirmation Date: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Booking Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-4">Booking Details</h2>
              <div className="space-y-3">
                <p><span className="text-gray-500">Booking ID:</span> {booking.id}</p>
                <p><span className="text-gray-500">Room:</span> {booking.roomType}</p>
                <p><span className="text-gray-500">Check-in:</span> {booking.checkIn}</p>
                <p><span className="text-gray-500">Check-out:</span> {booking.checkOut}</p>
                <p><span className="text-gray-500">Guests:</span> {booking.guests.adults} Adults, {booking.guests.children} Children</p>
                <p><span className="text-gray-500">Total Amount:</span> {booking.amount}</p>
              </div>
            </div>

            {/* Print Footer - Only visible when printing */}
            <div className="print-only hidden text-center text-sm text-gray-600 mt-12">
              <hr className="mb-6 border-gray-200" />
              <p>Thank you for choosing Talaysai Hotel</p>
              <p>For any inquiries, please contact us at info@talaysaihotel.com</p>
              <p className="mt-4">www.talaysaihotel.com</p>
            </div>

            {/* Action Buttons - Hidden when printing */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 px-6 py-2 
                         border border-gray-300 rounded-lg hover:bg-gray-50 
                         transition-colors"
              >
                <Download size={20} />
                Download Receipt
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 px-6 py-2 
                         bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                         transition-colors"
              >
                <Home size={20} />
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingConfirmation