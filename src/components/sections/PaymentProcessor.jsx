import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contax/BookingContext';

const PaymentProcessor = () => {
  const navigate = useNavigate();
  const { bookingData, clearBookingIntent, setActiveStep } = useBooking();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear booking intent after successful payment
      clearBookingIntent();
      setActiveStep(0);
      
      // Navigate to confirmation
      navigate('/booking-confirmation');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData) {
    return navigate('/booking');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto card">
        <h2 className="text-heading">Complete Your Booking</h2>
        
        {/* Booking Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-subheading">Booking Summary</h3>
          {/* Add your booking summary display here */}
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="space-y-4">
          {/* Add your payment form fields here */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="loading-spinner" />
                Processing Payment
              </span>
            ) : (
              'Pay Now'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentProcessor;