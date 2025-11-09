'use client'

import { useState, useEffect } from 'react'
import { FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import Link from 'next/link'

const NDVIStatus = () => {
  const [ndviData, setNdviData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate fetching NDVI data
    const fetchNdviData = async () => {
      try {
        // Mock data for demonstration
        const mockData = {
          currentValue: 0.75,
          previousValue: 0.68,
          trend: 'improving',
          status: 'healthy'
        }
        setNdviData(mockData)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch NDVI data')
        setLoading(false)
      }
    }

    fetchNdviData()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-2 text-gray-700">Loading NDVI data...</p>
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Vegetation Health Status</h2>
      {ndviData && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaChartLine className="h-6 w-6 text-primary-600 mr-2" />
              <span className="text-gray-700">Current NDVI</span>
            </div>
            <span className="font-semibold text-gray-800">{ndviData.currentValue}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Trend</span>
            <div className="flex items-center">
              {ndviData.trend === 'improving' ? (
                <FaArrowUp className="h-5 w-5 text-green-500 mr-1" />
              ) : (
                <FaArrowDown className="h-5 w-5 text-red-500 mr-1" />
              )}
              <span className="font-semibold text-gray-800 capitalize">{ndviData.trend}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Status</span>
            <span className={`font-semibold ${
              ndviData.status === 'healthy' ? 'text-green-500' : 'text-red-500'
            }`}>
              {ndviData.status}
            </span>
          </div>
        </div>
      )}

      <Link
        href="/ndvi-analysis"
        className="block text-center btn-primary mt-4"
      >
        View Detailed Analysis
      </Link>
    </div>
  )
}

export default NDVIStatus 