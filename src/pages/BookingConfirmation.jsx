import React, { useEffect, useState } from 'react';
import { Check, Download, Home, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import BookingHandler from '../services/BookingHandler';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        let bookingData = await BookingHandler.getCurrentBooking();

        if (!bookingData && bookingId) {
          bookingData = await BookingHandler.getBooking(bookingId);
        }

        if (!bookingData) {
          throw new Error('Booking not found');
        }

        setBooking(bookingData);
        BookingHandler.clearCurrentBooking();
      } catch (err) {
        setError(err.message);
      }
    };

    loadBooking();
  }, [bookingId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Booking Not Found</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => navigate('/rooms')}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mx-auto"
            >
              <Home size={20} />
              Return to Rooms
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @page {
            size: A4;
            margin: 0;
          }

          @media print {
            html, body {
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;
            }

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
              width: 210mm;
              padding: 20mm;
              margin: 0;
              font-size: 12pt;
              line-height: 1.3;
              background: white;
            }

            .section-print {
              break-inside: avoid;
              page-break-inside: avoid;
              margin-bottom: 15pt;
            }

            .no-print {
              display: none !important;
            }

            .print-only {
              display: block !important;
            }

            .print-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5pt;
            }

            .print-header {
              text-align: center;
              margin-bottom: 20pt;
            }

            .print-divider {
              border-top: 1pt solid #eee;
              margin: 15pt 0;
            }

            .print-section-title {
              font-size: 14pt;
              font-weight: bold;
              margin-bottom: 10pt;
            }
          }
        `}
      </style>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div id="print-content" className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            {/* Print Header */}
            <div className="print-only hidden section-print print-header">
              <img 
                src="/images/logo.png" 
                alt="Hotel Logo" 
                className="h-16 mx-auto mb-4"
              />
              <h1 className="text-xl font-bold mb-2">BOOKING CONFIRMATION</h1>
              <p>Booking Reference: {booking.id}</p>
              <div className="mt-2">
                <p>123 Beach Road, Koh Samui</p>
                <p>Thailand, 84320</p>
                <p>Tel: +66 123 456 789</p>
              </div>
              <div className="print-divider" />
            </div>

            {/* Screen Success Message */}
            <div className="no-print text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-semibold mb-4">Booking Confirmed!</h1>
              <p className="text-gray-600">
                Thank you for choosing our hotel. A confirmation email has been sent to {booking.email}
              </p>
            </div>

            {/* Guest Information */}
            <div className="section-print">
              <h2 className="print-section-title">Guest Information</h2>
              <div className="print-row">
                <span>Name:</span>
                <span>{booking.guestName}</span>
              </div>
              <div className="print-row">
                <span>Email:</span>
                <span>{booking.email}</span>
              </div>
              <div className="print-row">
                <span>Phone:</span>
                <span>{booking.phone}</span>
              </div>
            </div>

            <div className="print-divider" />

            {/* Stay Details */}
            <div className="section-print">
              <h2 className="print-section-title">Stay Details</h2>
              <div className="print-row">
                <span>Room Type:</span>
                <span>{booking.roomType}</span>
              </div>
              <div className="print-row">
                <span>Check-in:</span>
                <span>{formatDate(booking.checkIn)}</span>
              </div>
              <div className="print-row">
                <span>Check-out:</span>
                <span>{formatDate(booking.checkOut)}</span>
              </div>
              <div className="print-row">
                <span>Guests:</span>
                <span>{booking.guests.adults} Adults, {booking.guests.children} Children</span>
              </div>
            </div>

            <div className="print-divider" />

            {/* Payment Information */}
            <div className="section-print">
              <h2 className="print-section-title">Payment Information</h2>
              <div className="print-row">
                <span>Total Amount:</span>
                <span>{formatCurrency(booking.totalAmount)}</span>
              </div>
              <div className="print-row">
                <span>Payment Status:</span>
                <span className="text-green-600">Paid</span>
              </div>
              <div className="print-row">
                <span>Transaction ID:</span>
                <span>{booking.paymentDetails?.transactionId}</span>
              </div>
              <div className="print-row">
                <span>Payment Date:</span>
                <span>{formatDate(booking.paymentDetails?.timestamp)}</span>
              </div>
            </div>

            {/* Print Footer */}
            <div className="print-only hidden section-print">
              <div className="print-divider" />
              <div className="text-center text-sm">
                <p>Thank you for choosing Talaysai Hotel</p>
                <p>For any inquiries, please contact us at info@talaysaihotel.com</p>
                <p>www.talaysaihotel.com</p>
              </div>
            </div>

            {/* Action Buttons - Screen Only */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 no-print">
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download size={20} />
                Download Receipt
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Home size={20} />
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation;