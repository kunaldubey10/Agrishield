'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaUser } from 'react-icons/fa'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'

interface NavItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Disease Detection', path: '/disease-detection' },
    { name: 'NDVI Analysis', path: '/ndvi-analysis' },
    { name: 'Market Prices', path: '/market-prices' },
    { name: 'Agri Updates', path: '/agri-updates' },
    { name: 'Weather', path: '/weather' },
  ]

  return (
    <nav className={`bg-white shadow-lg fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-16 h-16 transition-transform group-hover:scale-105">
                <Image
                  src="/Logo.png"
                  alt="AgriShield Logo"
                  fill
                  className="rounded-lg object-contain"
                  priority
                />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">AgriShield</span>
                <p className="text-xs text-gray-500">Smart Farming Solutions</p>
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                prefetch={true}
                className="text-gray-700 hover:text-green-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-green-50 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="/profile"
              className="ml-4 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
            >
              <FaUser />
              {user ? 'Profile' : 'Sign In'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            {user && (
              <Link href="/profile" className="text-green-600">
                <FaUser className="h-5 w-5" />
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white animate-slideDown">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                prefetch={true}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!user && (
              <Link
                href="/profile"
                className="block px-4 py-3 rounded-lg text-base font-medium bg-green-600 text-white hover:bg-green-700 transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
