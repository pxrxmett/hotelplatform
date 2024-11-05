import React from 'react'
import { useBooking } from '../../contexts/BookingContext'
import { Check } from 'lucide-react'

const BookingSteps = () => {
  const { currentStep } = useBooking()

  const steps = [
    { number: 1, title: 'Select Room' },
    { number: 2, title: 'Choose Dates' },
    { number: 3, title: 'Guest Information' },
    { number: 4, title: 'Confirmation' }
  ]

  return (
    <div className="relative">
      <div className="flex justify-between">
        {steps.map((step) => (
          <div 
            key={step.number}
            className={`flex flex-col items-center relative z-10 
                       ${step.number <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                           border-2 transition-colors duration-300
                           ${step.number === currentStep ? 'border-blue-600 text-blue-600' : 
                             step.number < currentStep ? 'border-blue-600 bg-blue-600 text-white' : 
                             'border-gray-300'}`}
            >
              {step.number < currentStep ? (
                <Check size={20} />
              ) : (
                step.number
              )}
            </div>
            <span className="mt-2 text-sm font-medium">{step.title}</span>
          </div>
        ))}
      </div>
      {/* Progress Line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
        <div 
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default BookingSteps