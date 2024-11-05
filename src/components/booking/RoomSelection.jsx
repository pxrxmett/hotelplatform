import React from 'react'
import { useBooking } from '../../contexts/BookingContext'
import { Users, Star, ChevronRight, Wifi, Tv, Coffee, Bath } from 'lucide-react'

const RoomSelection = () => {
  const { updateBooking, setCurrentStep } = useBooking()

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      price: '2,500',
      capacity: '2 Adults',
      rating: 4.8,
      reviews: 124,
      image: '/images/room1.png',
      amenities: [
        { icon: Wifi, label: 'Free Wifi' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Coffee, label: 'Coffee Maker' },
        { icon: Bath, label: 'Private Bath' }
      ]
    },
    // Add more rooms...
  ]

  const handleRoomSelect = (room) => {
    updateBooking('room', room)
    setCurrentStep(2)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms.map((room) => (
        <div key={room.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img 
            src={room.image}
            alt={room.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{room.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{room.rating}</span>
                  <span className="text-gray-500">({room.reviews})</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">per night</p>
                <p className="text-xl font-bold text-blue-600">{room.price}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <amenity.icon size={16} className="text-gray-400" />
                  <span className="text-sm">{amenity.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleRoomSelect(room)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg
                       hover:bg-blue-600 transition-colors flex items-center 
                       justify-center gap-2"
            >
              Select Room
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RoomSelection