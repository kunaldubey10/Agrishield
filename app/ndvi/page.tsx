'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaChartLine, FaInfoCircle } from 'react-icons/fa';
import NDVIMap from '@/components/NDVIMap';

export default function NDVIPage() {
  const [selectedArea, setSelectedArea] = useState<[number, number][]>([]);
  const [ndviData, setNdviData] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAreaSelect = (coordinates: [number, number][]) => {
    setSelectedArea(coordinates);
    if (coordinates.length > 0) {
      fetchNDVIData(coordinates);
    } else {
      setNdviData(null);
    }
  };

  const fetchNDVIData = async (coordinates: [number, number][]) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call to fetch NDVI data
      // In a real application, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock NDVI data (0 to 1 scale)
      const mockNdvi = Math.random();
      setNdviData(mockNdvi);
    } catch (err) {
      setError('Failed to fetch NDVI data. Please try again.');
      console.error('Error fetching NDVI data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getNdviColor = (value: number) => {
    if (value < 0.2) return 'bg-red-500';
    if (value < 0.4) return 'bg-orange-500';
    if (value < 0.6) return 'bg-yellow-500';
    if (value < 0.8) return 'bg-green-500';
    return 'bg-emerald-500';
  };

  const getNdviStatus = (value: number) => {
    if (value < 0.2) return 'Poor';
    if (value < 0.4) return 'Fair';
    if (value < 0.6) return 'Good';
    if (value < 0.8) return 'Very Good';
    return 'Excellent';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">NDVI Analysis</h1>
        <p className="text-gray-600">
          Select an area on the map to analyze its Normalized Difference Vegetation Index (NDVI).
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-lg shadow-lg p-4">
            <NDVIMap onAreaSelect={handleAreaSelect} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaLeaf className="mr-2 text-green-500" />
              NDVI Analysis
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 flex items-center">
                <FaInfoCircle className="mr-2" />
                {error}
              </div>
            ) : ndviData !== null ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">NDVI Value:</span>
                  <span className="font-semibold">{ndviData.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Vegetation Status:</span>
                  <span className={`font-semibold ${getNdviColor(ndviData)} text-white px-3 py-1 rounded-full`}>
                    {getNdviStatus(ndviData)}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getNdviColor(ndviData)}`}
                      style={{ width: `${ndviData * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-8">
                Select an area on the map to view NDVI data
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaChartLine className="mr-2 text-blue-500" />
              NDVI Scale
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">0.0 - 0.2</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full">Poor</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">0.2 - 0.4</span>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full">Fair</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">0.4 - 0.6</span>
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full">Good</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">0.6 - 0.8</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full">Very Good</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">0.8 - 1.0</span>
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full">Excellent</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 