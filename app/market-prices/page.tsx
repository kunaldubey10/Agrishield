'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface PriceData {
  date: string
  price: number
}

interface Commodity {
  name: string
  currentPrice: number
  change: number
  history: PriceData[]
}

export default function MarketPrices() {
  const [selectedCommodity, setSelectedCommodity] = useState<string>('')
  const [commodities, setCommodities] = useState<Commodity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('http://localhost:5000/api/commodity-prices')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // Ensure commodity names are lowercase for consistency
        const normalizedData = data.map((item: Commodity) => ({
          ...item,
          name: item.name.toLowerCase()
        }))
        setCommodities(normalizedData)
        // Set first commodity as selected if none selected
        if (!selectedCommodity && normalizedData.length > 0) {
          setSelectedCommodity(normalizedData[0].name)
        }
      } catch (error) {
        console.error('Error fetching commodity prices:', error)
        setError('Failed to fetch commodity prices. Please try again later.')
        // Set mock data if the backend is not available
        // Fallback mock data
        const mockData = [
          {
            name: 'wheat',
            currentPrice: 2500,
            change: 2.5,
            history: Array.from({ length: 30 }, (_, i) => ({
              date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              price: 2500 + Math.random() * 100 - 50
            }))
          },
          {
            name: 'rice',
            currentPrice: 3000,
            change: -1.2,
            history: Array.from({ length: 30 }, (_, i) => ({
              date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              price: 3000 + Math.random() * 150 - 75
            }))
          },
          {
            name: 'cotton',
            currentPrice: 5500,
            change: 1.8,
            history: Array.from({ length: 30 }, (_, i) => ({
              date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              price: 5500 + Math.random() * 200 - 100
            }))
          },
          {
            name: 'sugarcane',
            currentPrice: 3200,
            change: -0.5,
            history: Array.from({ length: 30 }, (_, i) => ({
              date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              price: 3200 + Math.random() * 150 - 75
            }))
          },
          {
            name: 'soybean',
            currentPrice: 4200,
            change: 3.2,
            history: Array.from({ length: 30 }, (_, i) => ({
              date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              price: 4200 + Math.random() * 180 - 90
            }))
          }
        ]
        setCommodities(mockData)
        if (!selectedCommodity && mockData.length > 0) {
          setSelectedCommodity(mockData[0].name)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 300000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [])

  const selectedCommodityData = commodities.find(c => c.name === selectedCommodity)

  const chartData = {
    labels: selectedCommodityData?.history.map(item => item.date) || [],
    datasets: [
      {
        label: `${selectedCommodity} Price (₹/quintal)`,
        data: selectedCommodityData?.history.map(item => item.price) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Price History',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Market Prices</h1>
        <p className="text-lg text-gray-600 mb-8">Real-time commodity prices and market trends</p>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4" role="alert">
            <strong className="font-bold">Note: </strong>
            <span className="block sm:inline"> {error}. Showing sample data.</span>
          </div>
        )}

        {!loading && commodities.length > 0 && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
              {commodities.map((commodity) => (
                <Card 
                  key={commodity.name} 
                  className={`hover:shadow-xl transition-all cursor-pointer border-2 ${
                    selectedCommodity === commodity.name ? 'border-green-600 shadow-lg' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedCommodity(commodity.name)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg capitalize">{commodity.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">₹{commodity.currentPrice.toLocaleString()}</div>
                    <div className={`text-sm font-semibold mt-1 ${commodity.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {commodity.change >= 0 ? '↑' : '↓'} {Math.abs(commodity.change).toFixed(2)}%
                    </div>
                    <div className="text-xs text-gray-500 mt-2">per quintal</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Commodity for Detailed View
              </label>
              <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder="Select commodity" />
                </SelectTrigger>
                <SelectContent>
                  {commodities.map((commodity) => (
                    <SelectItem key={commodity.name} value={commodity.name}>
                      {commodity.name.charAt(0).toUpperCase() + commodity.name.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCommodityData && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl capitalize">{selectedCommodity} Price History (Last 30 Days)</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Current Price</div>
                        <div className="text-xl font-bold text-gray-900">₹{selectedCommodityData.currentPrice.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Change</div>
                        <div className={`text-xl font-bold ${selectedCommodityData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedCommodityData.change >= 0 ? '+' : ''}{selectedCommodityData.change.toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">30-Day High</div>
                        <div className="text-xl font-bold text-gray-900">
                          ₹{Math.max(...selectedCommodityData.history.map(h => h.price)).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">30-Day Low</div>
                        <div className="text-xl font-bold text-gray-900">
                          ₹{Math.min(...selectedCommodityData.history.map(h => h.price)).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Line data={chartData} options={chartOptions} />
                </CardContent>
              </Card>
            )}
          </>
        )}

        {!loading && commodities.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600">No market data available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
} 