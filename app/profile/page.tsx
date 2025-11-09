'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEdit, FaSave, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLock, FaSignOutAlt, FaLeaf, FaCalendarAlt, FaTractor, FaGoogle } from 'react-icons/fa'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export default function Profile() {
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '+91 ',
    location: '',
    farmSize: '',
    crops: [] as string[],
    experience: '',
    specializations: [] as string[],
    farmHistory: '',
    currentProjects: [] as string[]
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // Load user profile from Firebase or local storage
      setProfile(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || '',
        profileImage: user.photoURL || ''
      }))
      
      // Load additional profile data from localStorage
      const savedProfile = localStorage.getItem(`profile_${user.uid}`)
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile)
          setProfile(prev => ({ ...prev, ...parsed }))
        } catch (e) {
          console.error('Error loading profile:', e)
        }
      }
    }
  }, [user])

  const handleSave = () => {
    if (user) {
      // Save profile to localStorage (in production, save to database)
      localStorage.setItem(`profile_${user.uid}`, JSON.stringify(profile))
      setIsEditing(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
    } catch (error) {
      console.error('Error signing in:', error)
      alert('Failed to sign in with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-green-600 text-3xl" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome to AgriShield
                </h1>
                <p className="text-gray-600 mb-8">
                  Sign in to access your profile and personalized features
                </p>
              </div>
              
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                ) : (
                  <>
                    <FaGoogle className="text-xl text-red-500" />
                    Sign in with Google
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 mt-4">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="relative">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || 'Profile'}
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg">
                  <FaTractor className="text-green-600 text-4xl" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.displayName || profile.name || 'Farmer'}</h1>
              <p className="text-green-100 mb-2">{user.email}</p>
              {profile.location && (
                <p className="text-green-100 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  {profile.location}
                </p>
              )}
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <FaSignOutAlt />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Profile Information</h2>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                <FaSave /> Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                <FaEdit /> Edit Profile
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaUser className="mr-2" /> Name
              </label>
              {isEditing ? (
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Enter your name"
                />
              ) : (
                <p className="text-gray-900 p-2 bg-gray-50 rounded">{profile.name || user.displayName || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaEnvelope className="mr-2" /> Email
              </label>
              <p className="text-gray-900 p-2 bg-gray-50 rounded">{user.email}</p>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaPhone className="mr-2" /> Phone
              </label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+91 9876543210"
                />
              ) : (
                <p className="text-gray-900 p-2 bg-gray-50 rounded">{profile.phone || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaMapMarkerAlt className="mr-2" /> Location
              </label>
              {isEditing ? (
                <Input
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="City, State"
                />
              ) : (
                <p className="text-gray-900 p-2 bg-gray-50 rounded">{profile.location || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Farm Size</label>
              {isEditing ? (
                <Input
                  value={profile.farmSize}
                  onChange={(e) => setProfile({ ...profile, farmSize: e.target.value })}
                  placeholder="e.g., 5 acres"
                />
              ) : (
                <p className="text-gray-900 p-2 bg-gray-50 rounded">{profile.farmSize || 'Not set'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FaCalendarAlt className="mr-2" /> Experience
              </label>
              {isEditing ? (
                <Input
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                  placeholder="e.g., 10 years"
                />
              ) : (
                <p className="text-gray-900 p-2 bg-gray-50 rounded">{profile.experience || 'Not set'}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaLeaf className="mr-2" /> Crops
            </label>
            {isEditing ? (
              <Input
                value={profile.crops.join(', ')}
                onChange={(e) => setProfile({ ...profile, crops: e.target.value.split(',').map(c => c.trim()).filter(c => c) })}
                placeholder="Wheat, Rice, Cotton (comma separated)"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.crops.length > 0 ? (
                  profile.crops.map((crop, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full"
                    >
                      <FaLeaf className="text-green-600" />
                      {crop}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No crops added</p>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Additional Info Card */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Account Type</span>
              <span className="font-semibold text-gray-900">Free</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Member Since</span>
              <span className="font-semibold text-gray-900">
                {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Last Sign In</span>
              <span className="font-semibold text-gray-900">
                {user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
