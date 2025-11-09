'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaCamera, FaUpload, FaTimes, FaExclamationCircle } from 'react-icons/fa'

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<{ disease: string; confidence: number; treatment?: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size should be less than 10MB')
        return
      }
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setPrediction(null)
      setError(null)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setShowCamera(true)
        setError(null)
      }
    } catch (err) {
      setError('Unable to access camera. Please check permissions.')
      console.error('Camera error:', err)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setShowCamera(false)
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' })
            setSelectedImage(file)
            setPreviewUrl(URL.createObjectURL(file))
            setPrediction(null)
            stopCamera()
          }
        }, 'image/jpeg', 0.95)
      }
    }
  }

  const handlePredict = async () => {
    if (!selectedImage) {
      setError('Please select an image first')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedImage)

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to get prediction')
      }

      const data = await response.json()
      setPrediction({
        disease: data.disease || data.prediction || 'Unknown',
        confidence: data.confidence || 0,
        treatment: data.treatment || 'Please consult an agricultural expert for treatment recommendations.'
      })
    } catch (err) {
      console.error('Prediction error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing the image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetDetection = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    setPrediction(null)
    setError(null)
    stopCamera()
  }

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
            🔬 AI Disease Detection
          </h1>
          <p className="text-xl text-gray-600">
            Upload an image or use your camera to detect crop diseases instantly
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: JPG, PNG, JPEG, GIF, BMP (Max 10MB)
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Upload/Camera Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Image</h2>
              
              {!showCamera ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                  {previewUrl ? (
                    <div className="relative">
                      <div className="relative h-64 mb-4">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                      <button
                        onClick={resetDetection}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="py-12">
                      <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                      <p className="text-gray-500 mb-6">
                        Drag and drop an image here, or click to select
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition-colors"
                        >
                          <FaUpload />
                          Select Image
                        </button>
                        <button
                          onClick={startCamera}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                        >
                          <FaCamera />
                          Use Camera
                        </button>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/bmp"
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="border-2 border-green-500 rounded-lg p-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={capturePhoto}
                      className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <FaCamera />
                      Capture Photo
                    </button>
                    <button
                      onClick={stopCamera}
                      className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Analysis Results</h2>
              <div className="space-y-4">
                <button
                  onClick={handlePredict}
                  disabled={!selectedImage || loading}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                    !selectedImage || loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    '🔍 Detect Disease'
                  )}
                </button>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <FaExclamationCircle className="text-red-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-red-800 mb-1">Error</h3>
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {prediction && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border-2 border-green-200 rounded-lg p-6 space-y-4"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        ✅ Detection Complete
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Disease Detected:</p>
                          <p className="text-xl font-bold text-gray-900">{prediction.disease}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Confidence Level:</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-green-600 h-3 rounded-full transition-all"
                                style={{ width: `${prediction.confidence * 100}%` }}
                              />
                            </div>
                            <p className="text-lg font-bold text-gray-900">
                              {(prediction.confidence * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                        {prediction.treatment && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-blue-900 mb-2">💡 Recommendation:</p>
                            <p className="text-sm text-blue-800">{prediction.treatment}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {!prediction && !error && !loading && (
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-gray-500">
                      Upload or capture an image and click "Detect Disease" to see results
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-2">📸 High Quality Images</h3>
            <p className="text-sm text-gray-600">
              Use clear, well-lit photos of affected plant parts for best results
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-2">🎯 AI Powered</h3>
            <p className="text-sm text-gray-600">
              Our advanced AI model can detect 23+ common crop diseases
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-2">⚡ Instant Results</h3>
            <p className="text-sm text-gray-600">
              Get disease detection results in seconds, not days
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 