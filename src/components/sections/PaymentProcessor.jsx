import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Calendar } from 'lucide-react';
import BookingHandler from '../../services/BookingHandler';

const PaymentProcessor = ({ booking, onPaymentComplete }) => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  if (!booking) {
    return (
      <div className="max-w-md mx-auto bg-red-50 text-red-600 p-4 rounded-lg">
        No booking data available. Please select a room first.
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
  };

  const processPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    
    try {
      // Create initial booking record
      const newBooking = {
        ...booking,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const savedBooking = await BookingHandler.createBooking(newBooking);

      // Validate card details
      const cardNumber = paymentDetails.cardNumber.replace(/\s/g, '');
      if (cardNumber.length !== 16) {
        throw new Error('Invalid card number');
      }

      if (!paymentDetails.cardHolder.trim()) {
        throw new Error('Card holder name is required');
      }

      // Process payment
      const paymentResult = {
        success: true,
        transactionId: 'TX' + Date.now(),
        cardLast4: cardNumber.slice(-4),
        cardHolder: paymentDetails.cardHolder,
        amount: booking.totalAmount,
        timestamp: new Date().toISOString()
      };

      // Save payment details with booking
      const confirmedBooking = await BookingHandler.processPayment(savedBooking.id, {
        ...paymentResult,
        cardDetails: {
          last4: cardNumber.slice(-4),
          holder: paymentDetails.cardHolder
        }
      });

      // Call success callback
      if (onPaymentComplete) {
        onPaymentComplete(confirmedBooking);
      }

      // Store confirmed booking and navigate to confirmation
      localStorage.setItem('currentBooking', JSON.stringify(confirmedBooking));
      navigate(`/booking-confirmation/${confirmedBooking.id}`);

    } catch (error) {
      setError(error.message || 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Booking Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-600">Room:</span> {booking.roomType}</p>
            <p><span className="text-gray-600">Check-in:</span> {booking.checkIn}</p>
            <p><span className="text-gray-600">Check-out:</span> {booking.checkOut}</p>
            <p className="font-semibold">Total: ${booking.totalAmount}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-6">Payment Details</h3>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={processPayment} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={formatCardNumber(paymentDetails.cardNumber)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 16) {
                    handleInputChange({ target: { name: 'cardNumber', value } });
                  }
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1234 5678 9012 3456"
                required
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Holder Name
            </label>
            <input
              type="text"
              name="cardHolder"
              value={paymentDetails.cardHolder}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) {
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2);
                      }
                      handleInputChange({ target: { name: 'expiryDate', value } });
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="MM/YY"
                  required
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 3) {
                      handleInputChange({ target: { name: 'cvv', value } });
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123"
                  maxLength="3"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 
                     rounded-lg text-white transition-colors
                     ${isProcessing 
                       ? 'bg-gray-400 cursor-not-allowed' 
                       : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <Lock size={20} />
                Pay ${booking.totalAmount}
              </>
            )}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Your payment information is processed securely
        </p>
      </div>
    </div>
  );
};

export default PaymentProcessor;