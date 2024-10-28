const GOOGLE_API_KEY = 'YOUR_API_KEY'
const PLACE_ID = 'YOUR_PLACE_ID' // Get this from Google Places API

export const fetchGoogleReviews = async () => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`
    )
    const data = await response.json()
    return data.result.reviews
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}