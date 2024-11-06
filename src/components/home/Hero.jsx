import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Building2, Users, Calendar, ChevronDown } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [bookingData, setBookingData] = useState({
    roomType: '',
    guests: {
      adults: '',
      children: '0'
    },
    checkIn: '',
    checkOut: '',
  });

  const [errors, setErrors] = useState({});

  const formFields = [
    {
      label: 'Room type',
      icon: Building2,
      type: 'select',
      options: [
        { name: 'Deluxe Room', price: 2500, capacity: { adults: 2, children: 0 } },
        { name: 'Superior Room', price: 3500, capacity: { adults: 2, children: 1 } },
        { name: 'Family Room', price: 4500, capacity: { adults: 4, children: 2 } }
      ]
    },
    {
      label: 'Person',
      icon: Users,
      type: 'select',
      options: ['1', '2', '3', '4', '5', '6']
    },
    {
      label: 'Check in',
      icon: Calendar,
      type: 'date'
    },
    {
      label: 'Check out',
      icon: Calendar,
      type: 'date'
    }
  ];

  const validateBooking = () => {
    const newErrors = {};
    
    if (!bookingData.roomType) {
      newErrors.roomType = 'Please select a room type';
    }
    
    if (!bookingData.guests.adults) {
      newErrors.guests = 'Please select number of guests';
    }
    
    if (!bookingData.checkIn) {
      newErrors.checkIn = 'Please select check-in date';
    }
    
    if (!bookingData.checkOut) {
      newErrors.checkOut = 'Please select check-out date';
    }

    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      if (checkOut <= checkIn) {
        newErrors.checkOut = 'Check-out date must be after check-in date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = () => {
    if (!validateBooking()) {
      return;
    }

    const selectedRoom = formFields[0].options.find(room => room.name === bookingData.roomType);
    
    // Create booking data
    const booking = {
      roomType: bookingData.roomType,
      price: selectedRoom.price,
      capacity: selectedRoom.capacity,
      guests: {
        adults: parseInt(bookingData.guests.adults),
        children: 0
      },
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      status: 'pending',
      totalAmount: selectedRoom.price // Will be updated based on nights in booking page
    };

    // Store booking data
    localStorage.setItem('pendingBooking', JSON.stringify(booking));

    // Navigate to booking page
    navigate('/booking', { state: { bookingData: booking } });
  };

  const formatPersonText = (value) => {
    return `${value} ${parseInt(value) === 1 ? 'Person' : 'Persons'}`;
  };

  const CustomSelect = ({ field, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
      const value = typeof option === 'object' ? option.name : option;
      setBookingData(prev => ({
        ...prev,
        [field.label === 'Room type' ? 'roomType' : 
         field.label === 'Person' ? 'guests' : '']: 
         field.label === 'Person' ? { ...prev.guests, adults: value } : value
      }));
      setErrors(prev => ({ ...prev, [field.label.toLowerCase()]: '' }));
      setIsOpen(false);
      setActiveDropdown(null);
    };

    const displayText = field.label === 'Room type' ? bookingData.roomType :
                       field.label === 'Person' ? (bookingData.guests.adults ? 
                         formatPersonText(bookingData.guests.adults) : '') : '';

    return (
      <div className="relative">
        <label className="flex items-center gap-2 text-gray-600 text-sm mb-2 font-inter">
          <field.icon size={16} />
          {field.label}
        </label>
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setActiveDropdown(isOpen ? null : index);
          }}
          className={`w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex items-center justify-between font-inter
            ${errors[field.label.toLowerCase()] ? 'border-red-500' : 'border-gray-200'}`}
        >
          <span className={displayText ? 'text-gray-900' : 'text-gray-500'}>
            {displayText || `Select ${field.label.toLowerCase()}`}
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          />
        </button>

        {errors[field.label.toLowerCase()] && (
          <p className="text-red-500 text-sm mt-1">{errors[field.label.toLowerCase()]}</p>
        )}

        {isOpen && activeDropdown === index && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto py-1">
            {field.options.map((option, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors duration-150 font-inter ${
                  (typeof option === 'object' ? option.name : option) === 
                  (field.label === 'Room type' ? bookingData.roomType : bookingData.guests.adults)
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 font-normal'
                }`}
              >
                {typeof option === 'object' ? option.name : 
                 field.label === 'Person' ? formatPersonText(option) : option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="container py-12 font-inter">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {/* Main Content */}
          <div className="space-y-4">
            <h2 className="text-blue-600 font-light text-4xl italic">
              TALAYSAI
            </h2>
            <h1 className="text-5xl font-bold leading-tight">
              Hotel for every<br />
              moment rich in<br />
              emotion
            </h1>
            <p className="text-gray-600">
              Every moment feels like the first time<br />
              in paradise view
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBooking}
              className="bg-blue-500 text-white px-6 py-2.5 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Book now
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors duration-200">
              <div className="bg-white p-2 rounded-full shadow-md">
                <Play size={20} />
              </div>
              Take a tour
            </button>
          </div>

          {/* Booking Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {formFields.map((field, index) => (
                <div key={index}>
                  {field.type === 'select' ? (
                    <CustomSelect field={field} index={index} />
                  ) : (
                    <div>
                      <label className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                        <field.icon size={16} />
                        {field.label}
                      </label>
                      <input
                        type="date"
                        className={`w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                          ${errors[field.label.toLowerCase().replace(' ', '')] ? 'border-red-500' : 'border-gray-200'}`}
                        min={field.label === 'Check out' && bookingData.checkIn ? 
                          bookingData.checkIn : 
                          new Date().toISOString().split('T')[0]}
                        value={bookingData[field.label.toLowerCase().replace(' ', '')]}
                        onChange={(e) => {
                          setBookingData(prev => ({
                            ...prev,
                            [field.label.toLowerCase().replace(' ', '')]: e.target.value
                          }));
                          setErrors(prev => ({
                            ...prev,
                            [field.label.toLowerCase().replace(' ', '')]: ''
                          }));
                        }}
                      />
                      {errors[field.label.toLowerCase().replace(' ', '')] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[field.label.toLowerCase().replace(' ', '')]}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button 
              onClick={handleBooking}
              className="w-full bg-blue-500 text-white px-6 py-2.5 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <img
            src="/images/room-view.png"
            alt="Paradise View"
            className="w-full h-[600px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;