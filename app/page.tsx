'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaLeaf, FaWater, FaBug, FaChartLine, FaCloudSun, FaNewspaper, FaSatellite, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import WeatherWidget from '@/components/WeatherWidget'

const agriculturalNews = [
  {
    id: 1,
    title: 'New Climate-Resistant Crop Varieties Developed',
    description: 'Scientists have developed new crop varieties that can withstand extreme weather conditions.',
    date: '2024-03-15',
    source: 'Agricultural Research Journal'
  },
  {
    id: 2,
    title: 'Government Announces New Farming Subsidies',
    description: 'New subsidies announced for farmers adopting sustainable farming practices.',
    date: '2024-03-14',
    source: 'Ministry of Agriculture'
  },
  {
    id: 3,
    title: 'Smart Farming Technology Revolution',
    description: 'How AI and IoT are transforming traditional farming methods.',
    date: '2024-03-13',
    source: 'Tech in Agriculture'
  }
]

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-block bg-white bg-opacity-20 rounded-full p-4 mb-6">
                <FaLeaf className="text-6xl text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Welcome to AgriShield
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Your comprehensive farming companion powered by AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/learn-more"
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Learn More
                <FaArrowRight />
              </Link>
              <Link
                href="/disease-detection"
                className="bg-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl border-2 border-white border-opacity-30"
              >
                Try Disease Detection
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Weather and News Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <FaCloudSun className="text-green-600 mr-2 text-xl" />
              <h2 className="text-2xl font-semibold text-gray-900">Current Weather</h2>
            </div>
            <WeatherWidget />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <FaNewspaper className="text-green-600 mr-2 text-xl" />
              <h2 className="text-2xl font-semibold text-gray-900">Agricultural News</h2>
            </div>
            <div className="space-y-4">
              {agriculturalNews.map((news) => (
                <div key={news.id} className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold text-gray-900">{news.title}</h3>
                  <p className="text-gray-600 mt-1">{news.description}</p>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <span>{news.date}</span>
                    <span>{news.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">Our Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Empowering farmers with cutting-edge technology and data-driven insights
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group cursor-pointer"
            >
              <Link href="/crop-information" className="block">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-green-50">
                  <Image
                    src="/crop-information/wheat.jpg"
                    alt="Crop Information"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <FaLeaf className="text-green-600 text-xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800 group-hover:text-green-600">Crop Information</h3>
                <p className="text-gray-600">Access detailed information about various crops, including growth requirements, best practices, and market trends.</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group cursor-pointer"
            >
              <Link href="/market-prices" className="block">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-green-50 flex items-center justify-center">
                  <div className="text-6xl text-green-200">📊</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <FaChartLine className="text-green-600 text-xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800 group-hover:text-green-600">Market Prices</h3>
                <p className="text-gray-600">Stay updated with real-time market prices for agricultural commodities and make informed selling decisions.</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group cursor-pointer"
            >
              <Link href="/agri-updates" className="block">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-green-50 flex items-center justify-center">
                  <div className="text-6xl text-green-200">📰</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <FaNewspaper className="text-green-600 text-xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800 group-hover:text-green-600">Agricultural Updates</h3>
                <p className="text-gray-600">Get the latest news and updates about agricultural policies, technologies, and industry trends.</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group cursor-pointer"
            >
              <Link href="/weather" className="block">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-green-50 flex items-center justify-center">
                  <div className="text-6xl text-green-200">☀️</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <FaCloudSun className="text-green-600 text-xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800 group-hover:text-green-600">Weather Forecast</h3>
                <p className="text-gray-600">Access accurate weather forecasts to plan your farming activities and protect your crops.</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group cursor-pointer"
            >
              <Link href="/disease-detection" className="block">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-green-50 flex items-center justify-center">
                  <div className="text-6xl text-green-200">🔬</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <FaBug className="text-green-600 text-xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800 group-hover:text-green-600">Disease Detection</h3>
                <p className="text-gray-600">Identify crop diseases early using our AI-powered detection system and take preventive measures.</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group cursor-pointer"
            >
              <Link href="/ndvi-analysis" className="block">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-green-50 flex items-center justify-center">
                  <div className="text-6xl text-green-200">🛰️</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <FaSatellite className="text-green-600 text-xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800 group-hover:text-green-600">NDVI Analysis</h3>
                <p className="text-gray-600">Monitor crop health and growth using satellite imagery and advanced vegetation index analysis.</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Trusted by farmers across India for smarter agricultural decisions
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20"
            >
              <div className="text-5xl font-bold mb-2">23+</div>
              <div className="text-green-100 text-lg">Crop Diseases Detected</div>
              <div className="text-green-200 text-sm mt-2">With AI-powered accuracy</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20"
            >
              <div className="text-5xl font-bold mb-2">95%+</div>
              <div className="text-green-100 text-lg">Detection Accuracy</div>
              <div className="text-green-200 text-sm mt-2">Industry-leading precision</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20"
            >
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-green-100 text-lg">Available Support</div>
              <div className="text-green-200 text-sm mt-2">Always here to help</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Farming?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already using AgriShield to make smarter decisions and increase their yields.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/disease-detection"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Get Started Free
                <FaArrowRight />
              </Link>
              <Link
                href="/learn-more"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 