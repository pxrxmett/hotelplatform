import React from 'react'
import { Building2, Users, Calendar } from 'lucide-react'

const BookingForm = () => {
  const formFields = [
    {
      label: 'Room type',
      icon: Building2,
      type: 'select',
      options: ['Deluxe Room', 'Superior Room', 'Family Room']
    },
    {
      label: 'Person',
      icon: Users,
      type: 'select',
      options: ['1', '2', '3', '4']
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
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {formFields.map((field, index) => (
          <div key={index}>
            <label className="flex items-center gap-2 text-gray-600 text-sm mb-2">
              <field.icon size={16} />
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select className="w-full p-2 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {field.options.map(option => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input 
                type={field.type} 
                className="w-full p-2 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            )}
          </div>
        ))}
      </div>
      <button className="w-full bg-blue-500 text-white px-6 py-2.5 rounded-md hover:bg-blue-600 transition-colors duration-200">
        Book Now
      </button>
    </div>
  )
}

export default BookingForm