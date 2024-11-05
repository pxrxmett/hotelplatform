import React from 'react'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'

const DatePicker = ({ label, selected, onChange, minDate, maxDate, placeholderText }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="date"
          className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onChange(new Date(e.target.value))}
          min={minDate ? format(minDate, 'yyyy-MM-dd') : undefined}
          max={maxDate ? format(maxDate, 'yyyy-MM-dd') : undefined}
          value={selected ? format(selected, 'yyyy-MM-dd') : ''}
          placeholder={placeholderText}
        />
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
    </div>
  )
}

export default DatePicker