'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaInfoCircle, FaMousePointer, FaDrawPolygon, FaCheckCircle } from 'react-icons/fa'
import { format, subDays } from 'date-fns'

const NDVIMap = dynamic(() => import('@/components/NDVIMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

export default function NDVIAnalysis() {
  const [selectedArea, setSelectedArea] = useState<[number, number][] | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [analysisResults, setAnalysisResults] = useState<{ meanNDVI: number; date: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mapInstructions, setMapInstructions] = useState(true)

  // Auto-fill dates on mount
  useEffect(() => {
    const today = new Date()
    const thirtyDaysAgo = subDays(today, 30)
    setEndDate(format(today, 'yyyy-MM-dd'))
    setStartDate(format(thirtyDaysAgo, 'yyyy-MM-dd'))
  }, [])

  const handleAreaSelect = (coordinates: [number, number][]) => {
    if (coordinates && coordinates.length > 0) {
      setSelectedArea(coordinates)
      setError(null)
    } else {
      setSelectedArea(null)
    }
  }

  const handleQuickAnalyze = async () => {
    if (!selectedArea) {
      setError('Please select an area on the map first')
      return
    }

    if (!startDate || !endDate) {
      setError('Please select a date range')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ndvi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates: selectedArea,
          startDate,
          endDate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to analyze NDVI')
      }

      setAnalysisResults({
        meanNDVI: data.data.meanNDVI,
        date: format(new Date(data.data.date), 'MMM d, yyyy h:mm:ss a')
      })
    } catch (error) {
      console.error('Error:', error)
      setError('Error analyzing NDVI: ' + (error instanceof Error ? error.message : 'Unknown error occurred'))
    } finally {
      setLoading(false)
    }
  }

  const getNdviStatus = (value: number) => {
    if (value < 0.2) return { status: 'Poor', color: 'red', description: 'Bare soil or no vegetation' }
    if (value < 0.4) return { status: 'Fair', color: 'orange', description: 'Sparse vegetation or stressed crops' }
    if (value < 0.6) return { status: 'Good', color: 'yellow', description: 'Moderate vegetation health' }
    if (value < 0.8) return { status: 'Very Good', color: 'green', description: 'Healthy vegetation' }
    return { status: 'Excellent', color: 'emerald', description: 'Very dense and healthy vegetation' }
  }

  const ndviStatus = analysisResults ? getNdviStatus(analysisResults.meanNDVI) : null

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NDVI Analysis
          </h1>
          <p className="text-xl text-gray-600">
            Monitor your crop health with Normalized Difference Vegetation Index
          </p>
        </motion.div>

        {/* Instructions Card */}
        {mapInstructions && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <FaInfoCircle className="mr-2" />
                  How to use:
                </h3>
                <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
                  <li>Use the drawing tools on the map to select your field area</li>
                  <li>You can draw a polygon or rectangle around your field</li>
                  <li>Adjust the date range if needed (default: last 30 days)</li>
                  <li>Click "Analyze NDVI" to get vegetation health data</li>
                </ol>
              </div>
              <button
                onClick={() => setMapInstructions(false)}
                className="text-blue-600 hover:text-blue-800 ml-4"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-green-600" />
                  Select Your Field Area
                </h2>
                {selectedArea && (
                  <div className="flex items-center text-green-600 text-sm">
                    <FaCheckCircle className="mr-1" />
                    Area Selected
                  </div>
                )}
              </div>
              
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 flex items-center">
                  <FaDrawPolygon className="mr-2 text-green-600" />
                  <span>Use the polygon or rectangle tool on the map to draw around your field</span>
                </p>
              </div>

              <div className="rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">
                <NDVIMap onAreaSelect={handleAreaSelect} />
              </div>

              {selectedArea && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Selected:</strong> {selectedArea.length} point{selectedArea.length !== 1 ? 's' : ''} on the map
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Controls and Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Analysis Parameters */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-green-600" />
                Analysis Parameters
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={endDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    max={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                  />
                </div>

                <button
                  onClick={handleQuickAnalyze}
                  disabled={loading || !selectedArea || !startDate || !endDate}
                  className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all ${
                    loading || !selectedArea || !startDate || !endDate
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    'Analyze NDVI'
                  )}
                </button>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            {analysisResults && ndviStatus && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h2>
                
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {analysisResults.meanNDVI.toFixed(3)}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">NDVI Value</div>
                    <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${
                      ndviStatus.color === 'red' ? 'bg-red-500' :
                      ndviStatus.color === 'orange' ? 'bg-orange-500' :
                      ndviStatus.color === 'yellow' ? 'bg-yellow-500' :
                      ndviStatus.color === 'green' ? 'bg-green-500' :
                      'bg-emerald-500'
                    }`}>
                      {ndviStatus.status}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{ndviStatus.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 text-sm">Analysis Date</span>
                      <span className="font-semibold text-gray-900 text-sm">{analysisResults.date}</span>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-xs text-blue-800 mb-2">NDVI Scale Reference:</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between"><span>0.0 - 0.2:</span> <span className="text-red-600">Poor</span></div>
                        <div className="flex justify-between"><span>0.2 - 0.4:</span> <span className="text-orange-600">Fair</span></div>
                        <div className="flex justify-between"><span>0.4 - 0.6:</span> <span className="text-yellow-600">Good</span></div>
                        <div className="flex justify-between"><span>0.6 - 0.8:</span> <span className="text-green-600">Very Good</span></div>
                        <div className="flex justify-between"><span>0.8 - 1.0:</span> <span className="text-emerald-600">Excellent</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
