import React from 'react'

const LuxuriousRooms = () => {
  const rooms = [
    {
      image: '/room1.jpg',
      roomsAvailable: 3,
      amenities: 'Television set, Extra sheets and Breakfast'
    },
    {
      image: '/room2.jpg',
      roomsAvailable: 4,
      amenities: 'Television set, Extra sheets, and Breakfast'
    },
    {
      image: '/room3.jpg',
      roomsAvailable: 5,
      amenities: 'Television set, Extra sheets'
    }
  ]

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 relative">
          Luxurious Rooms
          <span className="absolute bottom-0 left-0 w-24 h-1 bg-teal-500" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img 
                  src={room.image} 
                  alt="Room"
                  className="w-full h-64 object-cover"
                />
                <span className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {room.roomsAvailable} Rooms available
                </span>
              </div>
              <div className="p-4">
                <p className="text-gray-800">{room.amenities}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LuxuriousRooms