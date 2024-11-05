import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingHandler from '../services/BookingHandler';

const BookNow = ({ room }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const bookingData = {
        room,
        dates: {
          checkIn: new Date(),
          checkOut: new Date(Date.now() + 86400000) // Next day
        },
        guests: {
          adults: 2,
          children: 0
        }
      };

      const booking = await BookingHandler.createBooking(bookingData);
      
      // Navigate to booking confirmation page
      navigate(`/booking/confirmation/${booking.id}`);
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      
      <button
        onClick={handleBooking}
        disabled={isLoading}
        className={`w-full px-4 py-2 rounded-lg 
                   transition-colors duration-200
                   flex items-center justify-center gap-2
                   ${isLoading 
                     ? 'bg-gray-400 cursor-not-allowed' 
                     : 'bg-blue-500 hover:bg-blue-600'
                   } text-white`}
      >
        {isLoading ? (
          <>
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            Processing...
          </>
        ) : (
          'Book Now'
        )}
      </button>
    </div>
  );
};

export default BookNow;