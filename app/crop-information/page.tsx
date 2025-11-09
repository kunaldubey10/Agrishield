'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const crops = [
  {
    id: 'rice',
    name: 'Rice',
    image: '/crop-information/rice.jpg',
    varieties: ['Basmati', 'Sona Masoori', 'Ponni', 'Swarna'],
    soilType: 'Clayey loam',
    soilPh: '5.0 - 7.0',
    sowingSeason: 'June - July',
    harvestingSeason: 'October - November',
    waterRequirement: 'High',
    fertilizer: 'NPK 20:10:10',
    pests: ['Rice stem borer', 'Brown plant hopper', 'Leaf folder'],
    diseases: ['Blast', 'Bacterial leaf blight', 'Sheath blight']
  },
  {
    id: 'wheat',
    name: 'Wheat',
    image: '/crop-information/wheat.jpg',
    varieties: ['HD 2967', 'PBW 502', 'WH 1105', 'DBW 17'],
    soilType: 'Well-drained loamy soil',
    soilPh: '6.0 - 7.5',
    sowingSeason: 'October - November',
    harvestingSeason: 'March - April',
    waterRequirement: 'Medium',
    fertilizer: 'NPK 15:15:15',
    pests: ['Aphids', 'Termites', 'Army worm'],
    diseases: ['Rust', 'Karnal bunt', 'Powdery mildew']
  },
  {
    id: 'maize',
    name: 'Maize',
    image: '/crop-information/maize.jpg',
    varieties: ['HQPM 1', 'Pioneer 30V92', 'DKC 9108', 'NK 6240'],
    soilType: 'Well-drained sandy loam',
    soilPh: '5.5 - 7.0',
    sowingSeason: 'June - July',
    harvestingSeason: 'September - October',
    waterRequirement: 'Medium',
    fertilizer: 'NPK 12:32:16',
    pests: ['Stem borer', 'Fall armyworm', 'Corn earworm'],
    diseases: ['Turcicum leaf blight', 'Common rust', 'Gray leaf spot']
  },
  {
    id: 'cotton',
    name: 'Cotton',
    image: '/crop-information/cotton.jpg',
    varieties: ['Bollgard II', 'RCH 2', 'MRC 6304', 'Ankur 3028'],
    soilType: 'Black cotton soil',
    soilPh: '6.0 - 8.0',
    sowingSeason: 'April - May',
    harvestingSeason: 'October - December',
    waterRequirement: 'High',
    fertilizer: 'NPK 20:10:10',
    pests: ['Bollworm', 'Aphids', 'Whitefly'],
    diseases: ['Fusarium wilt', 'Verticillium wilt', 'Bacterial blight']
  }
]

export default function CropInformation() {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)

  const handleCropSelect = (cropId: string) => {
    setSelectedCrop(cropId)
  }

  const selectedCropData = crops.find(crop => crop.id === selectedCrop)

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Crop Information
          </h1>
          <p className="text-xl text-gray-600">
            Select a crop to view detailed information
          </p>
        </motion.div>

        {/* Crop Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {crops.map((crop) => (
            <motion.div
              key={crop.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transform transition-all duration-300 ${
                selectedCrop === crop.id 
                  ? 'ring-4 ring-green-500 ring-offset-4 ring-offset-gray-50' 
                  : 'hover:shadow-xl'
              }`}
              onClick={() => handleCropSelect(crop.id)}
            >
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={crop.image}
                  alt={crop.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-800/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-xl font-semibold mb-1 drop-shadow-lg">{crop.name}</h3>
                    <p className="text-green-50 text-sm drop-shadow">Click to view details</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Crop Details */}
        {selectedCropData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedCropData.name} Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Basic Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Varieties
                    </label>
                    <p className="mt-2 text-gray-900 bg-white rounded-lg p-3 shadow-sm">
                      {selectedCropData.varieties.join(', ')}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Soil Type
                    </label>
                    <p className="mt-2 text-gray-900 bg-white rounded-lg p-3 shadow-sm">
                      {selectedCropData.soilType}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Soil pH
                    </label>
                    <p className="mt-2 text-gray-900 bg-white rounded-lg p-3 shadow-sm">
                      {selectedCropData.soilPh}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Growing Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sowing Season
                    </label>
                    <p className="mt-2 text-gray-900 bg-white rounded-lg p-3 shadow-sm">
                      {selectedCropData.sowingSeason}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Harvesting Season
                    </label>
                    <p className="mt-2 text-gray-900 bg-white rounded-lg p-3 shadow-sm">
                      {selectedCropData.harvestingSeason}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Water Requirement
                    </label>
                    <p className="mt-2 text-gray-900 bg-white rounded-lg p-3 shadow-sm">
                      {selectedCropData.waterRequirement}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Management
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Recommended Fertilizer
                    </label>
                    <p className="mt-2 text-gray-900 bg-white rounded-lg p-3 shadow-sm">
                      {selectedCropData.fertilizer}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Common Pests
                    </label>
                    <p className="mt-2 text-gray-900 bg-white rounded-lg p-3 shadow-sm">
                      {selectedCropData.pests.join(', ')}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Common Diseases
                    </label>
                    <p className="mt-2 text-gray-900 bg-white rounded-lg p-3 shadow-sm">
                      {selectedCropData.diseases.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 