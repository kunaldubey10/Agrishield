'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaLeaf, FaWater, FaBug, FaChartLine, FaWifi, FaCamera, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa'

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Farming Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming traditional farming with cutting-edge technology and IoT solutions
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <FaLeaf className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Crop Monitoring
            </h3>
            <p className="text-gray-600">
              Real-time monitoring of crop health and growth patterns
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <FaWater className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Smart Irrigation
            </h3>
            <p className="text-gray-600">
              Automated water management based on soil moisture and weather data
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <FaBug className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Pest Control
            </h3>
            <p className="text-gray-600">
              Early detection and management of pests and diseases
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <FaChartLine className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Market Analysis
            </h3>
            <p className="text-gray-600">
              Stay updated with market trends and prices
            </p>
          </motion.div>
        </div>

        {/* IoT Services Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            IoT-Enabled Smart Farming Solutions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FaWifi className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Smart Irrigation Network
                  </h3>
                  <p className="text-gray-600">
                    Our IoT sensors create a comprehensive network across your fields, monitoring:
                  </p>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li>• Soil moisture levels in real-time</li>
                    <li>• Weather conditions and forecasts</li>
                    <li>• Water usage optimization</li>
                    <li>• Automated irrigation scheduling</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FaCamera className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Advanced NDVI Monitoring
                  </h3>
                  <p className="text-gray-600">
                    State-of-the-art camera technology for precise vegetation analysis:
                  </p>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li>• High-resolution spectral imaging</li>
                    <li>• Real-time vegetation health monitoring</li>
                    <li>• Early stress detection</li>
                    <li>• Growth pattern analysis</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started with IoT Solutions
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 7667494346</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">dubeykunal07kd@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">NIET, Greater Noida</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FaLinkedin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">LinkedIn</h3>
                  <a 
                    href="https://www.linkedin.com/in/kunal-dubey10" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700"
                  >
                    linkedin.com/in/kunal-dubey10
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 