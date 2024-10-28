import React from 'react'
import { Wifi, Coffee, Lightbulb, Shirt, ParkingSquare } from 'lucide-react'

const Facilities = () => {
  const facilities = [
    { icon: Wifi, name: 'Wifi' },
    { icon: Coffee, name: 'Breakfast' },
    { icon: Lightbulb, name: '24/7 Light' },
    { icon: Shirt, name: 'Laundry' },
    { icon: ParkingSquare, name: 'Parking space' }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">Our Facilities</h2>
          <p className="text-gray-600">We offer modern hotel facilities for your comfort.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {facilities.map((facility, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <facility.icon className="w-8 h-8 mx-auto mb-4 text-teal-500" />
              <h3 className="text-teal-500">{facility.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Facilities