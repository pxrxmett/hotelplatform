import React, { useState } from 'react'
import { Play, Building2, Users, Calendar, ChevronDown } from 'lucide-react'

const Hero = () => {
  const [activeDropdown, setActiveDropdown] = useState(null)

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
  ]

  const formatPersonText = (value) => {
    return `${value} ${parseInt(value) === 1 ? 'Person' : 'Persons'}`
  }

  const CustomSelect = ({ field, index }) => {
    const [selected, setSelected] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const displayText = selected 
      ? field.label === 'Person' 
        ? formatPersonText(selected) 
        : selected
      : `Select ${field.label.toLowerCase()}`

    return (
      <div className="relative">
        <label className="flex items-center gap-2 text-gray-600 text-sm mb-2 font-inter">
          <field.icon size={16} />
          {field.label}
        </label>
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen)
            setActiveDropdown(isOpen ? null : index)
          }}
          className="w-full p-2 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex items-center justify-between font-inter"
        >
          <span className={selected ? 'text-gray-900' : 'text-gray-500'}>
            {displayText}
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          />
        </button>

        {isOpen && activeDropdown === index && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto py-1">
            {field.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSelected(option)
                  setIsOpen(false)
                  setActiveDropdown(null)
                }}
                className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors duration-150 font-inter ${
                  option === selected ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 font-normal'
                }`}
              >
                {field.label === 'Person' ? formatPersonText(option) : option}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

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
            <button className="bg-blue-500 text-white px-6 py-2.5 rounded-md hover:bg-blue-600 transition-colors duration-200">
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
                        className="w-full p-2 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={field.label === 'Check out' && document.querySelector('input[type="date"]') 
                          ? document.querySelector('input[type="date"]').value 
                          : new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full bg-blue-500 text-white px-6 py-2.5 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium">
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
  )
}

export default Hero