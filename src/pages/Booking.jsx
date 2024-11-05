import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ChevronLeft, CreditCard, Lock } from 'lucide-react';
import PaymentProcessor from '../components/sections/PaymentProcessor';
import EmailService from '../services/EmailService';

const Booking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('details'); // 'details' or 'payment'
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: {
      adults: 1,
      children: 0
    },
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const roomData = localStorage.getItem('selectedRoom');
    if (!roomData) {
      navigate('/rooms');
      return;
    }
    setSelectedRoom(JSON.parse(roomData));
  }, [navigate]);

  const calculateTotal = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const pricePerNight = parseInt(selectedRoom?.price.replace(/[^0-9]/g, ''));
    return nights * pricePerNight;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentComplete = async (paymentDetails) => {
    try {
      const bookingDetails = {
        id: 'BK' + Date.now(),
        roomType: selectedRoom.name,
        ...bookingData,
        paymentDetails,
        amount: calculateTotal(),
        status: 'confirmed',
        timestamp: new Date().toISOString()
      };

      await EmailService.sendConfirmation(bookingDetails);

      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      localStorage.setItem('bookings', JSON.stringify([...existingBookings, bookingDetails]));
      localStorage.setItem('currentBooking', JSON.stringify(bookingDetails));

      navigate('/booking/confirmation');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('There was an error processing your booking. Please try again.');
    }
  };

  if (!selectedRoom) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => (step === 'payment' ? setStep('details') : navigate(-1))}
          className="flex items-center gap-2 text-gray-600 mb-8"
        >
          <ChevronLeft size={20} />
          {step === 'payment' ? 'Back to Details' : 'Back'}
        </button>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">{selectedRoom.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-gray-600">
                <p>Price per night</p>
                <p className="text-xl font-bold text-blue-600">{selectedRoom.price}</p>
              </div>
              <div className="text-gray-600">
                <p>Total nights</p>
                <p className="text-xl font-bold">
                  {bookingData.checkIn && bookingData.checkOut
                    ? Math.ceil(
                        (new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) /
                          (1000 * 60 * 60 * 24)
                      )
                    : 0}
                </p>
              </div>
              <div className="text-gray-600">
                <p>Total amount</p>
                <p className="text-xl font-bold text-blue-600">{calculateTotal()}</p>
              </div>
            </div>
          </div>

          {step === 'details' ? (
            <form onSubmit={handleSubmitDetails} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
              <div>
                <label htmlFor="checkIn" className="block text-gray-700">
                  Check-In Date
                </label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={bookingData.checkIn}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="checkOut" className="block text-gray-700">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={bookingData.checkOut}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={bookingData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors mt-8"
              >
                Continue to Payment
              </button>
            </form>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Payment Details</h3>
              <PaymentProcessor amount={calculateTotal()} onPaymentComplete={handlePaymentComplete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
