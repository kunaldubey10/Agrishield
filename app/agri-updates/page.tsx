'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FaNewspaper, FaSearch, FaClock, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa'
import Image from 'next/image'

interface NewsItem {
  title: string
  description: string
  url: string
  publishedAt: string
  source: {
    name: string
  }
  urlToImage?: string
}

export default function AgriUpdates() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [refreshing, setRefreshing] = useState(false)

  const fetchNews = async () => {
    try {
      setLoading(true)
      const query = category !== 'all' ? `${category} agriculture` : 'agriculture farming'
      const response = await fetch(`/api/agri-news?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      
      if (data.success && data.articles) {
        setNews(data.articles)
      } else {
        // Fallback to mock data
        setNews([
          {
            title: 'New Agricultural Technology Revolutionizes Farming',
            description: 'Latest innovations in farming technology are helping farmers increase yields and reduce costs.',
            url: '#',
            publishedAt: new Date().toISOString(),
            source: { name: 'AgriTech News' }
          },
          {
            title: 'Government Announces New Farming Subsidies',
            description: 'New subsidy program aims to support small-scale farmers across the country.',
            url: '#',
            publishedAt: new Date().toISOString(),
            source: { name: 'Government News' }
          },
          {
            title: 'Market Analysis: Crop Prices Expected to Rise',
            description: 'Experts predict significant price increases for major crops in the coming months.',
            url: '#',
            publishedAt: new Date().toISOString(),
            source: { name: 'Market News' }
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchNews()
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      setRefreshing(true)
      fetchNews()
    }, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [category])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchNews()
  }

  const filteredNews = news?.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  }) || []

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <FaNewspaper className="mr-3 text-green-600" />
                Agricultural Updates
              </h1>
              <p className="text-lg text-gray-600">Stay updated with the latest agricultural news and trends</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center gap-2"
            >
              {refreshing ? (
                <FaSpinner className="animate-spin" />
              ) : (
                'Refresh'
              )}
            </button>
          </div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search updates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="market">Market</SelectItem>
              <SelectItem value="policy">Policy</SelectItem>
              <SelectItem value="sustainability">Sustainability</SelectItem>
              <SelectItem value="research">Research</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <FaSpinner className="animate-spin text-4xl text-green-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading agricultural updates...</p>
            </div>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No updates found. Try adjusting your search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-xl transition-shadow cursor-pointer group">
                  {item.urlToImage && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={item.urlToImage}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          // Hide image on error
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{item.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <FaNewspaper className="mr-1" />
                        {item.source.name}
                      </span>
                      <span className="flex items-center">
                        <FaClock className="mr-1" />
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <a
                      href={item.url}
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                      <FaExternalLinkAlt className="ml-2" />
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredNews.length > 0 && (
          <div className="mt-8 text-center text-gray-600 text-sm">
            Showing {filteredNews.length} of {news.length} updates
          </div>
        )}
      </div>
    </div>
  )
}
