import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Tv, Coffee, Wifi, Bath, Users, ChevronRight, Star } from 'lucide-react'

const Rooms = () => {
  const navigate = useNavigate()

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      price: '2,500',
      capacity: '2 Adults',
      rating: 4.8,
      reviews: 124,
      amenities: [
        { icon: Wifi, label: 'Free Wifi' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Coffee, label: 'Coffee Maker' },
        { icon: Bath, label: 'Private Bath' }
      ]
    },
    {
      id: 2,
      name: 'Superior Room',
      price: '3,500',
      capacity: '2 Adults, 1 Child',
      rating: 4.9,
      reviews: 89,
      amenities: [
        { icon: Wifi, label: 'Free Wifi' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Coffee, label: 'Coffee Maker' },
        { icon: Bath, label: 'Private Bath' }
      ]
    },
    {
      id: 3,
      name: 'Family Room',
      price: '4,500',
      capacity: '4 Adults',
      rating: 4.7,
      reviews: 76,
      amenities: [
        { icon: Wifi, label: 'Free Wifi' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Coffee, label: 'Coffee Maker' },
        { icon: Bath, label: 'Private Bath' }
      ]
    }
  ]

  const handleBookNow = (room) => {
    // Store selected room in localStorage
    localStorage.setItem('selectedRoom', JSON.stringify(room))
    // Navigate to booking page
    navigate('/booking')
  }

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
            <select className="w-full p-3 border border-gray-200 rounded-lg">
              <option>All Room Types</option>
              <option>Deluxe Room</option>
              <option>Superior Room</option>
              <option>Family Room</option>
            </select>
            <select className="w-full p-3 border border-gray-200 rounded-lg">
              <option>Any Capacity</option>
              <option>2 Adults</option>
              <option>2 Adults, 1 Child</option>
              <option>4 Adults</option>
            </select>
            <select className="w-full p-3 border border-gray-200 rounded-lg">
              <option>Any Price</option>
              <option>2,000 - 3,000</option>
              <option>3,000 - 4,000</option>
              <option>4,000+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Room Listings */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Room Image */}
              <div className="relative">
                <img 
                  src={`/images/room${room.id}.png`}
                  alt={room.name}
                  className="w-full h-64 object-cover"
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
                
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Users size={16} />
                  <span className="text-sm">{room.capacity}</span>
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
                    <p className="text-xl font-bold text-blue-600">{room.price}</p>
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
      </div>
    </div>
  )
}

export default Rooms