class BookingHandler {
  async createBooking(bookingData) {
    try {
      // You would typically make an API call here
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const bookingId = 'BK' + Date.now();
      const booking = {
        id: bookingId,
        ...bookingData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Store in localStorage for demo purposes
      // In a real app, this would be stored in a database
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));

      return booking;
    } catch (error) {
      console.error('Booking creation failed:', error);
      throw error;
    }
  }

  async getBookings() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  }

  async getBooking(bookingId) {
    const bookings = await this.getBookings();
    return bookings.find(booking => booking.id === bookingId);
  }
}

export default new BookingHandler();