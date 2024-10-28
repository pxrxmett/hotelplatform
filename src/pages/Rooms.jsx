import React, { useState } from 'react'
import { Tv, Coffee, Wifi, Bath, Users, ChevronRight, Star, ChevronDown } from 'lucide-react'

const CustomSelect = ({ options, placeholder, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 px-4 bg-white border border-gray-200 rounded-lg flex items-center justify-between
                 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={18} className="text-gray-400" />}
          <span className={`${selected ? 'text-gray-900' : 'text-gray-500'}`}>
            {selected || placeholder}
          </span>
        </div>
        <ChevronDown 
          size={18} 
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg
                      overflow-hidden transform transition-all duration-200 origin-top">
          {options.map((option, index) => (
            <button
              key={index}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3
                       transition-colors duration-150
                       text-gray-700 hover:text-blue-600"
              onClick={() => {
                setSelected(option)
                setIsOpen(false)
              }}
            >
              {Icon && <Icon size={18} className="text-gray-400" />}
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const Rooms = () => {
  const rooms = [
    {
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

  const filters = [
    {
      placeholder: 'Room Type',
      icon: Bath,
      options: ['All Rooms', 'Deluxe Room', 'Superior Room', 'Family Room']
    },
    {
      placeholder: 'Capacity',
      icon: Users,
      options: ['Any Capacity', '2 Adults', '2 Adults, 1 Child', '4 Adults']
    },
    {
      placeholder: 'Price Range',
      icon: ChevronRight,
      options: ['Any Price', '2,000 - 3,000', '3,000 - 4,000', '4,000+']
    }
  ]

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
            {filters.map((filter, index) => (
              <CustomSelect 
                key={index}
                placeholder={filter.placeholder}
                options={filter.options}
                icon={filter.icon}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Room Listings */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Room Image */}
              <div className="relative">
                <img 
                  src={`/images/room${index + 1}.png`}
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
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
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