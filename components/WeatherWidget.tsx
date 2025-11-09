'use client'

import { useState, useEffect } from 'react'
import { FaTemperatureHigh, FaWind, FaTint, FaSun, FaCloudRain } from 'react-icons/fa'

const WeatherWidget = () => {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // For demo purposes, using a default location
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data')
        }
        
        const data = await response.json()
        setWeather(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch weather data')
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-2 text-gray-700">Loading weather data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-primary-600 hover:text-primary-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!weather || !weather.main) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-700">Weather data not available</p>
      </div>
    )
  }

  // Calculate UV index (OpenWeather free tier doesn't include it, so estimate based on weather)
  const estimateUVIndex = () => {
    const cloudCover = weather.clouds?.all || 0
    const hour = new Date().getHours()
    
    // Peak UV between 10 AM and 4 PM
    if (hour >= 10 && hour <= 16) {
      // Less clouds = higher UV
      return cloudCover < 30 ? 'High (7-9)' : cloudCover < 60 ? 'Moderate (3-5)' : 'Low (0-2)'
    }
    return 'Low (0-2)'
  }

  // Calculate rainfall chance based on weather conditions
  const getRainfallChance = () => {
    const conditions = weather.weather?.[0]?.main?.toLowerCase() || ''
    if (conditions.includes('rain')) return '80-100%'
    if (conditions.includes('drizzle')) return '60-80%'
    if (conditions.includes('clouds')) {
      const cloudCover = weather.clouds?.all || 0
      return cloudCover > 70 ? '40-60%' : '10-30%'
    }
    return '0-10%'
  }

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-lg shadow-lg p-6 relative overflow-hidden">
      {/* Soft background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `
                 radial-gradient(circle at 20% 30%, #10b981 1px, transparent 1px),
                 radial-gradient(circle at 80% 70%, #14b8a6 1px, transparent 1px),
                 radial-gradient(circle at 50% 50%, #059669 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px, 60px 60px, 50px 50px'
             }}>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Current Weather</h2>
          <div className="text-4xl">
            {weather.weather?.[0]?.main === 'Clear' && '☀️'}
            {weather.weather?.[0]?.main === 'Clouds' && '☁️'}
            {weather.weather?.[0]?.main === 'Rain' && '🌧️'}
            {weather.weather?.[0]?.main === 'Drizzle' && '🌦️'}
            {weather.weather?.[0]?.main === 'Thunderstorm' && '⛈️'}
            {weather.weather?.[0]?.main === 'Snow' && '❄️'}
            {weather.weather?.[0]?.main === 'Mist' && '🌫️'}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-lg p-3 transition-all hover:bg-white/80">
            <div className="flex items-center">
              <FaTemperatureHigh className="h-6 w-6 text-red-500 mr-3" />
              <span className="text-gray-700 font-medium">Temperature</span>
            </div>
            <span className="font-bold text-gray-800 text-lg">{weather.main?.temp?.toFixed(1) || 'N/A'}°C</span>
          </div>
          
          <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-lg p-3 transition-all hover:bg-white/80">
            <div className="flex items-center">
              <FaTint className="h-6 w-6 text-blue-500 mr-3" />
              <span className="text-gray-700 font-medium">Humidity</span>
            </div>
            <span className="font-bold text-gray-800 text-lg">{weather.main?.humidity || 'N/A'}%</span>
          </div>
          
          <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-lg p-3 transition-all hover:bg-white/80">
            <div className="flex items-center">
              <FaWind className="h-6 w-6 text-cyan-600 mr-3" />
              <span className="text-gray-700 font-medium">Wind Speed</span>
            </div>
            <span className="font-bold text-gray-800 text-lg">{weather.wind?.speed?.toFixed(1) || 'N/A'} m/s</span>
          </div>

          <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-lg p-3 transition-all hover:bg-white/80">
            <div className="flex items-center">
              <FaSun className="h-6 w-6 text-yellow-500 mr-3" />
              <span className="text-gray-700 font-medium">UV Index</span>
            </div>
            <span className="font-bold text-gray-800 text-lg">{estimateUVIndex()}</span>
          </div>

          <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-lg p-3 transition-all hover:bg-white/80">
            <div className="flex items-center">
              <FaCloudRain className="h-6 w-6 text-indigo-600 mr-3" />
              <span className="text-gray-700 font-medium">Rainfall Chance</span>
            </div>
            <span className="font-bold text-gray-800 text-lg">{getRainfallChance()}</span>
          </div>
          
          <div className="text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span>📍 {weather.name}, {weather.sys?.country}</span>
              <span>🕒 {new Date(weather.dt * 1000).toLocaleTimeString()}</span>
            </div>
            <div className="mt-2 text-center font-medium text-gray-700">
              {weather.weather?.[0]?.description?.charAt(0).toUpperCase() + weather.weather?.[0]?.description?.slice(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget