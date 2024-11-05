import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailService from '../services/EmailService';

// ... other imports and code ...

const Booking = () => {
  // ... existing state and other code ...

  const handleBookingComplete = async (paymentDetails) => {
    try {
      // Create booking object
      const bookingDetails = {
        id: 'BK' + Date.now(),
        roomType: selectedRoom.name,
        ...bookingData,
        paymentDetails,
        amount: calculateTotal(),
        status: 'confirmed',
        timestamp: new Date().toISOString()
      };

      // Save booking
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      localStorage.setItem('bookings', JSON.stringify([...existingBookings, bookingDetails]));
      localStorage.setItem('currentBooking', JSON.stringify(bookingDetails));

      // Send confirmation email
      await EmailService.sendConfirmationEmail(bookingDetails);

      // Navigate to confirmation page
      navigate('/booking/confirmation');
    } catch (error) {
      console.error('Error completing booking:', error);
      alert('There was an error processing your booking. Please try again.');
    }
  };

  // ... rest of your component code ...
};

export default Booking;