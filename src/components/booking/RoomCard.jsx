import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Tv, Coffee, Wifi, Bath, Users, Star, ChevronRight } from 'lucide-react'

const RoomCard = ({ room }) => {
  const navigate = useNavigate()

  const handleBookNow = () => {
    // Store room details in localStorage for booking process
    localStorage.setItem('selectedRoom', JSON.stringify(room))
    // Navigate to booking page
    navigate('/booking')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Room Image */}
      <div className="relative">
        <img 
          src={room.image}
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
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{room.name}</h3>
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <Users size={16} />
              <span className="text-sm">{room.capacity}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">per night</p>
            <p className="text-xl font-bold text-blue-600">{room.price}</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {room.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-600">
              <amenity.icon size={16} className="text-gray-400" />
              <span className="text-sm">{amenity.label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleBookNow}
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg 
                   hover:bg-blue-600 transition-all duration-300 
                   flex items-center justify-center gap-2 
                   transform hover:-translate-y-1"
        >
          Book Now
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default RoomCard