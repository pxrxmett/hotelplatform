import React from 'react';

const RoomCard = ({ image, availability, amenities }) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-lg group">
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        {availability} Rooms available
      </div>
      <img 
        src={image} 
        alt={amenities} 
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <p className="text-gray-800 text-sm">{amenities}</p>
      </div>
    </div>
  );
};

const RoomsList = () => {
  const rooms = [
    {
      image: "/images/room1.png",
      availability: "3",
      amenities: "Television set, Extra sheets and Breakfast"
    },
    {
      image: "/images/room2.png",
      availability: "4",
      amenities: "Television set, Extra sheets, and Breakfast"
    },
    {
      image: "/images/room3.png",
      availability: "5",
      amenities: "Television set, Extra sheets"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">
          Luxurious Rooms
          <span className="block w-24 h-1 bg-teal-500 mt-2"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {rooms.map((room, index) => (
            <RoomCard key={index} {...room} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsList;