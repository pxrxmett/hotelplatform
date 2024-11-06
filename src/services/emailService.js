// This would typically be in your backend, but for demonstration we'll use EmailJS
import emailjs from '@emailjs/browser';

class EmailService {
  static async sendConfirmationEmail(bookingDetails) {
    try {
      // Initialize EmailJS with your user ID
      emailjs.init("YOUR_USER_PUBLIC_KEY");

      const templateParams = {
        to_email: bookingDetails.email,
        to_name: bookingDetails.name,
        booking_id: bookingDetails.id,
        room_type: bookingDetails.roomType,
        check_in: bookingDetails.checkIn,
        check_out: bookingDetails.checkOut,
        guests: `${bookingDetails.guests.adults} Adults, ${bookingDetails.guests.children} Children`,
        total_amount: bookingDetails.amount,
        hotel_name: 'Talaysai Hotel',
        hotel_address: '123 Beach Road, Koh Samui, Thailand',
        hotel_phone: '+66 123 456 789',
        hotel_email: 'contact@talaysaihotel.com'
      };

      const response = await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams
      );

      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

export default EmailService;