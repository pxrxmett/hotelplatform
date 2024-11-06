import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Users, ChevronLeft, CreditCard, Lock, AlertCircle } from 'lucide-react';
import PaymentProcessor from '../components/sections/PaymentProcessor';
import BookingHandler from '../services/BookingHandler';
import EmailService from '../services/emailService';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState('details');
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: {
      adults: 1,
      children: 0
    },
    guestName: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState(null);

  // Get pending booking data from location state or localStorage
  useEffect(() => {
    const loadBookingData = () => {
      try {
        // First try to get from location state
        const stateData = location.state?.bookingData;
        if (stateData) {
          setBookingData(prev => ({ ...prev, ...stateData }));
          return;
        }

        // Then try localStorage
        const storedData = localStorage.getItem('pendingBooking');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setBookingData(prev => ({ ...prev, ...parsedData }));
          return;
        }

        // If no data found, redirect to rooms
        setError('No booking data found. Please select a room first.');
        setTimeout(() => {
          navigate('/rooms');
        }, 2000);
      } catch (err) {
        console.error('Error loading booking data:', err);
        setError('Error loading booking data. Please try again.');
      }
    };

    loadBookingData();
  }, [location, navigate]);

  const calculateTotal = () => {
    if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.price) return 0;
    
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return nights * bookingData.price;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleGuestsChange = (type, value) => {
    setBookingData(prev => ({
      ...prev,
      guests: {
        ...prev.guests,
        [type]: parseInt(value) || 0
      }
    }));
  };

  const validateDates = () => {
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      setError('Check-in date cannot be in the past');
      return false;
    }
    if (checkOut <= checkIn) {
      setError('Check-out date must be after check-in date');
      return false;
    }
    return true;
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    
    if (!validateDates()) {
      return;
    }

    try {
      const totalAmount = calculateTotal();
      const updatedBookingData = {
        ...bookingData,
        totalAmount,
        status: 'pending'
      };

      // Store updated booking data
      localStorage.setItem('pendingBooking', JSON.stringify(updatedBookingData));
      setBookingData(updatedBookingData);
      setStep('payment');
    } catch (err) {
      setError('Failed to process booking details. Please try again.');
    }
  };

  const handlePaymentComplete = async (paymentDetails) => {
    try {
      const finalBookingData = {
        ...bookingData,
        id: 'BK' + Date.now(),
        status: 'confirmed',
        totalAmount: calculateTotal(),
        paymentDetails,
        timestamp: new Date().toISOString()
      };

      // Process the booking
      const confirmedBooking = await BookingHandler.processPayment(finalBookingData.id, {
        ...paymentDetails,
        amount: finalBookingData.totalAmount
      });

      // Send confirmation email
      await EmailService.sendConfirmation(confirmedBooking);

      // Clear pending booking
      localStorage.removeItem('pendingBooking');

      // Navigate to confirmation
      navigate(`/booking-confirmation/${confirmedBooking.id}`);
    } catch (error) {
      setError('Failed to process payment. Please try again.');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Booking Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/rooms')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Rooms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => step === 'payment' ? setStep('details') : navigate('/rooms')}
          className="flex items-center gap-2 text-gray-600 mb-8 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft size={20} />
          {step === 'payment' ? 'Back to Details' : 'Back to Rooms'}
        </button>

        <div className="max-w-3xl mx-auto">
          {/* Booking Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">{bookingData.roomType}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-gray-600">
                <p className="text-sm">Price per night</p>
                <p className="text-xl font-bold text-blue-600">
                  {new Intl.NumberFormat('th-TH', {
                    style: 'currency',
                    currency: 'THB'
                  }).format(bookingData.price)}
                </p>
              </div>
              <div className="text-gray-600">
                <p className="text-sm">Total nights</p>
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
                <p className="text-sm">Total amount</p>
                <p className="text-xl font-bold text-blue-600">
                  {new Intl.NumberFormat('th-TH', {
                    style: 'currency',
                    currency: 'THB'
                  }).format(calculateTotal())}
                </p>
              </div>
            </div>
          </div>

          {step === 'details' ? (
            <form onSubmit={handleSubmitDetails} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={handleInputChange}
                    min={bookingData.checkIn}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adults
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={bookingData.capacity?.adults || 4}
                    value={bookingData.guests.adults}
                    onChange={(e) => handleGuestsChange('adults', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Children
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={bookingData.capacity?.children || 2}
                    value={bookingData.guests.children}
                    onChange={(e) => handleGuestsChange('children', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Guest Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="guestName"
                  value={bookingData.guestName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg
                         hover:bg-blue-700 transition-colors mt-8
                         flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                Continue to Payment
              </button>
            </form>
          ) : (
            <PaymentProcessor 
              booking={bookingData}
              onPaymentComplete={handlePaymentComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;