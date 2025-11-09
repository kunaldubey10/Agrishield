'use client'

import { useState } from 'react'
import { FaSeedling, FaWater, FaSun } from 'react-icons/fa'

const CropTips = () => {
  const [tips] = useState([
    {
      id: 1,
      title: 'Optimal Planting Time',
      description: 'Plant your crops during the early morning or late afternoon to avoid heat stress.',
      icon: <FaSeedling className="h-6 w-6" />,
    },
    {
      id: 2,
      title: 'Water Management',
      description: 'Water your crops in the early morning to minimize evaporation loss.',
      icon: <FaWater className="h-6 w-6" />,
    },
    {
      id: 3,
      title: 'Sunlight Requirements',
      description: 'Ensure your crops get at least 6-8 hours of direct sunlight daily.',
      icon: <FaSun className="h-6 w-6" />,
    },
  ])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Crop Tips</h2>
      <div className="space-y-4">
        {tips.map((tip) => (
          <div key={tip.id} className="flex items-start space-x-4">
            <div className="text-primary-600 mt-1">{tip.icon}</div>
            <div>
              <h3 className="font-medium">{tip.title}</h3>
              <p className="text-gray-600 text-sm">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a
          href="/crop-info"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          View More Tips →
        </a>
      </div>
    </div>
  )
}

export default CropTips 