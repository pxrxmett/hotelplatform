import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    room: null,
    dates: {
      checkIn: null,
      checkOut: null
    },
    guests: {
      adults: 1,
      children: 0
    },
    customerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    totalPrice: 0
  });

  const updateBooking = (field, value) => {
    setBooking(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <BookingContext.Provider value={{ booking, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);

export default BookingContext;