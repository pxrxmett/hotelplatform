import React, { useState } from 'react'
import { Star, Filter, Search } from 'lucide-react'

const Reviews = () => {
  const [filterType, setFilterType] = useState('Relevance')
  const [searchTerm, setSearchTerm] = useState('')

  // Sample reviews data (replace with Google Places API data)
  const reviews = [
    {
      author_name: 'Aaron Karabegovic',
      rating: 5,
      relative_time_description: '2 years ago',
      text: 'Great place to stay right on the beach. Very helpful and friendly staff. The owner went out of her way many times to help us arrange other aspects of our visit to the...',
      profile_photo_url: null,
      author_url: '#',
      review_count: '34 reviews',
      type: 'Holiday | Couple'
    },
    // Add more reviews here
  ]

  const filterOptions = [
    { label: 'Relevance', count: null },
    { label: 'beach', count: 57 },
    { label: 'dorm', count: 34 },
    { label: 'elevator', count: 11 }
  ]

  const sortOptions = ['Relevance', 'Newest', 'Highest', 'Lowest']

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Rating Overview */}
        <div className="flex items-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">4.5</div>
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5"
                  fill={star <= 4.5 ? '#FCD34D' : 'none'}
                  stroke={star <= 4.5 ? '#FCD34D' : '#D1D5DB'}
                />
              ))}
            </div>
            <div className="text-gray-500">(289)</div>
          </div>
          <div className="flex-grow">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2 mb-1">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{
                      width: `${rating === 5 ? '70' : rating === 4 ? '20' : '10'}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search reviews"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter size={16} />
              Filter
            </button>
            {filterOptions.map((option, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg transition-colors
                  ${filterType === option.label 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-white border hover:bg-gray-50'}`}
                onClick={() => setFilterType(option.label)}
              >
                {option.label} {option.count && `${option.count}`}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex gap-2">
            {sortOptions.map((option, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg transition-colors
                  ${filterType === option 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-white border hover:bg-gray-50'}`}
                onClick={() => setFilterType(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                  {review.author_name[0]}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{review.author_name}</h3>
                      <p className="text-sm text-gray-500">{review.review_count}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {review.relative_time_description}
                    </div>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        fill={i < review.rating ? '#FCD34D' : 'none'}
                        stroke={i < review.rating ? '#FCD34D' : '#D1D5DB'}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{review.type}</p>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews