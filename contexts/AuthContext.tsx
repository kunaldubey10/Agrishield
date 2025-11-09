'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { 
  User, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    try {
      // Check if Firebase is properly configured
      if (!auth || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'AIzaSyEXAMPLE123') {
        throw new Error('Firebase is not properly configured. Please check your .env.local file.')
      }
      
      const result = await signInWithPopup(auth, googleProvider)
      console.log('Successfully signed in:', result.user.email)
    } catch (error: any) {
      console.error('Error signing in with Google:', error)
      
      // Provide user-friendly error messages
      let errorMessage = 'Failed to sign in with Google. '
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage += 'The sign-in popup was closed before completing the sign-in.'
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage += 'The sign-in popup was blocked by your browser. Please allow popups for this site.'
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage += 'This domain is not authorized for OAuth operations. Please add this domain to your Firebase Console.'
      } else if (error.code === 'auth/invalid-api-key') {
        errorMessage += 'Invalid Firebase API key. Please check your configuration.'
      } else if (error.message?.includes('not properly configured')) {
        errorMessage = error.message
      } else {
        errorMessage += error.message || 'Please try again.'
      }
      
      throw new Error(errorMessage)
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

