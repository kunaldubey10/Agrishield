'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaArrowLeft, FaGoogle } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signInWithGoogle } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Here you would typically call your authentication API
      // For demo purposes, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/profile')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')

    try {
      await signInWithGoogle()
      router.push('/profile')
    } catch (err: any) {
      console.error('Google sign-in error:', err)
      setError(err.message || 'Failed to sign in with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 flex items-center mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Sign In
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle className="text-xl text-red-500" />
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900"
                  required
                />
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900"
                  required
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-primary-600 hover:text-primary-700"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 