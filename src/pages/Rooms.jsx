import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tv, Coffee, Wifi, Bath, Users, ChevronRight, Star, Search, Filter } from 'lucide-react';

const Rooms = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: 'all',
    capacity: 'any',
    priceRange: 'any'
  });
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      description: 'Perfect for couples or solo travelers, featuring modern amenities and comfortable furnishings.',
      price: 2500,
      priceRange: '2000-3000',
      capacity: {
        adults: 2,
        children: 0
      },
      rating: 4.8,
      reviews: 124,
      size: '32 sqm',
      amenities: [
        { icon: Wifi, label: 'Free Wifi' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Coffee, label: 'Coffee Maker' },
        { icon: Bath, label: 'Private Bath' }
      ],
      images: ['/images/room1.png']
    },
    {
      id: 2,
      name: 'Superior Room',
      description: 'Spacious room with additional amenities, perfect for small families or extended stays.',
      price: 3500,
      priceRange: '3000-4000',
      capacity: {
        adults: 2,
        children: 1
      },
      rating: 4.9,
      reviews: 89,
      size: '40 sqm',
      amenities: [
        { icon: Wifi, label: 'Free Wifi' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Coffee, label: 'Coffee Maker' },
        { icon: Bath, label: 'Private Bath' }
      ],
      images: ['/images/room2.png']
    },
    {
      id: 3,
      name: 'Family Room',
      description: 'Large suite ideal for families, featuring separate living area and multiple beds.',
      price: 4500,
      priceRange: '4000+',
      capacity: {
        adults: 4,
        children: 2
      },
      rating: 4.7,
      reviews: 76,
      size: '55 sqm',
      amenities: [
        { icon: Wifi, label: 'Free Wifi' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Coffee, label: 'Coffee Maker' },
        { icon: Bath, label: 'Private Bath' }
      ],
      images: ['/images/room3.png']
    }
  ];

  useEffect(() => {
    filterRooms();
  }, [filters]);

  const filterRooms = () => {
    setIsLoading(true);
    let filtered = [...rooms];

    if (filters.type !== 'all') {
      filtered = filtered.filter(room => room.name === filters.type);
    }

    if (filters.capacity !== 'any') {
      const [adults, children] = filters.capacity.split(',').map(num => parseInt(num));
      filtered = filtered.filter(room => 
        room.capacity.adults >= adults && 
        room.capacity.children >= (children || 0)
      );
    }

    if (filters.priceRange !== 'any') {
      filtered = filtered.filter(room => room.priceRange === filters.priceRange);
    }

    setFilteredRooms(filtered);
    setIsLoading(false);
  };

  const handleBookNow = (room) => {
    // Create booking data with necessary information
    const bookingData = {
      roomId: room.id,
      roomType: room.name,
      price: room.price,
      capacity: room.capacity,
      checkIn: null, // Will be set in booking form
      checkOut: null, // Will be set in booking form
      guests: {
        adults: room.capacity.adults,
        children: room.capacity.children
      },
      totalAmount: room.price, // Base price, will be updated based on nights
      status: 'pending'
    };

    // Store booking data
    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    
    // Navigate to booking page with data
    navigate('/booking', { state: { bookingData } });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Rooms</h1>
          <p className="text-xl font-light text-blue-100">
            Choose from our selection of comfortable and luxurious rooms
          </p>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Room Type</label>
              <select 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="all">All Room Types</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.name}>{room.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Capacity</label>
              <select 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.capacity}
                onChange={(e) => setFilters(prev => ({ ...prev, capacity: e.target.value }))}
              >
                <option value="any">Any Capacity</option>
                <option value="2,0">2 Adults</option>
                <option value="2,1">2 Adults, 1 Child</option>
                <option value="4,2">4 Adults, 2 Children</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Price Range</label>
              <select 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.priceRange}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
              >
                <option value="any">Any Price</option>
                <option value="2000-3000">฿2,000 - ฿3,000</option>
                <option value="3000-4000">฿3,000 - ฿4,000</option>
                <option value="4000+">฿4,000+</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Room Listings */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No rooms found matching your criteria</div>
            <button
              onClick={() => setFilters({ type: 'all', capacity: 'any', priceRange: 'any' })}
              className="text-blue-500 hover:text-blue-600"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div 
                key={room.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Room Image */}
                <div className="relative group">
                  <img 
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{room.rating}</span>
                      <span className="text-sm text-gray-500">({room.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h2>
                  <p className="text-gray-600 text-sm mb-4">{room.description}</p>
                  
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span className="text-sm">
                        {room.capacity.adults} Adults
                        {room.capacity.children > 0 && `, ${room.capacity.children} Children`}
                      </span>
                    </div>
                    <div className="text-sm">
                      {room.size}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {room.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-600">
                        <amenity.icon size={16} className="text-gray-400" />
                        <span className="text-sm">{amenity.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">per night</p>
                      <p className="text-xl font-bold text-blue-600">{formatPrice(room.price)}</p>
                    </div>
                    <button 
                      onClick={() => handleBookNow(room)}
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg 
                               hover:bg-blue-600 transition-colors 
                               flex items-center gap-2"
                    >
                      Book Now
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;