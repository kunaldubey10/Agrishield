'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaTemperatureHigh, FaWind, FaTint, FaCloud } from 'react-icons/fa'

export default function Weather() {
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      )
      const data = await response.json()
      if (data.cod === 200) {
        setWeatherData(data)
      } else {
        setError('City not found. Please try again.')
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      fetchWeather(location.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Weather Forecast
          </h1>
          <p className="text-xl text-gray-600">
            Get real-time weather updates for your location
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city name"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {weatherData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Current Weather
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaTemperatureHigh className="h-6 w-6 text-primary-600 mr-4" />
                    <div>
                      <p className="text-gray-600">Temperature</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {weatherData.main.temp}°C
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaWind className="h-6 w-6 text-primary-600 mr-4" />
                    <div>
                      <p className="text-gray-600">Wind Speed</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {weatherData.wind.speed} m/s
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaTint className="h-6 w-6 text-primary-600 mr-4" />
                    <div>
                      <p className="text-gray-600">Humidity</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {weatherData.main.humidity}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaCloud className="h-6 w-6 text-primary-600 mr-4" />
                    <div>
                      <p className="text-gray-600">Cloud Coverage</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {weatherData.clouds.all}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Additional Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Weather Condition</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {weatherData.weather[0].description}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pressure</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {weatherData.main.pressure} hPa
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Visibility</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {weatherData.visibility / 1000} km
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 