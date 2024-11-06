class BookingHandler {
  async createBooking(bookingData) {
    try {
      if (!bookingData) {
        throw new Error('Booking data is required');
      }

      const bookingId = 'BK' + Date.now();
      const booking = {
        id: bookingId,
        ...bookingData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));

      return booking;
    } catch (error) {
      console.error('Booking creation failed:', error);
      throw new Error('Failed to create booking. Please try again.');
    }
  }

  async processPayment(bookingId, paymentDetails) {
    try {
      if (!bookingId) {
        throw new Error('Booking ID is required');
      }

      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);

      if (bookingIndex === -1) {
        throw new Error('Booking not found');
      }

      const updatedBooking = {
        ...bookings[bookingIndex],
        status: 'confirmed',
        paymentStatus: 'completed',
        paymentDetails: {
          ...paymentDetails,
          timestamp: new Date().toISOString()
        }
      };

      bookings[bookingIndex] = updatedBooking;
      localStorage.setItem('bookings', JSON.stringify(bookings));
      localStorage.setItem('currentBooking', JSON.stringify(updatedBooking));

      return updatedBooking;
    } catch (error) {
      console.error('Payment processing failed:', error);
      throw new Error('Payment processing failed. Please try again.');
    }
  }

  async getBookings() {
    try {
      return JSON.parse(localStorage.getItem('bookings') || '[]');
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      return [];
    }
  }

  async getBooking(bookingId) {
    try {
      if (!bookingId) {
        throw new Error('Booking ID is required');
      }

      const bookings = await this.getBookings();
      const booking = bookings.find(booking => booking.id === bookingId);
      
      if (!booking) {
        throw new Error('Booking not found');
      }

      return booking;
    } catch (error) {
      console.error('Failed to fetch booking:', error);
      throw new Error('Failed to fetch booking details. Please try again.');
    }
  }

  getCurrentBooking() {
    try {
      const currentBooking = localStorage.getItem('currentBooking');
      return currentBooking ? JSON.parse(currentBooking) : null;
    } catch (error) {
      console.error('Failed to get current booking:', error);
      return null;
    }
  }

  clearCurrentBooking() {
    localStorage.removeItem('currentBooking');
  }
}

export default new BookingHandler();