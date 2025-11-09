'use client'

import { motion } from 'framer-motion'
import { FaWater, FaBug, FaChartLine, FaLeaf } from 'react-icons/fa'

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600">
            Empowering farmers with smart agricultural solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Smart Irrigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <FaWater className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Smart Irrigation
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Optimize your water usage with our AI-powered irrigation system that:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaChartLine className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                <span className="text-gray-700">
                  Monitors soil moisture levels in real-time
                </span>
              </li>
              <li className="flex items-start">
                <FaChartLine className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                <span className="text-gray-700">
                  Automatically adjusts watering schedules based on weather forecasts
                </span>
              </li>
              <li className="flex items-start">
                <FaChartLine className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                <span className="text-gray-700">
                  Provides detailed water usage analytics
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Pest & Disease Prediction */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <FaBug className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Pest & Disease Prediction
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Protect your crops with our advanced prediction system that:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaLeaf className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                <span className="text-gray-700">
                  Uses machine learning to detect early signs of diseases
                </span>
              </li>
              <li className="flex items-start">
                <FaLeaf className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                <span className="text-gray-700">
                  Predicts potential pest infestations based on environmental factors
                </span>
              </li>
              <li className="flex items-start">
                <FaLeaf className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                <span className="text-gray-700">
                  Provides preventive measures and treatment recommendations
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 