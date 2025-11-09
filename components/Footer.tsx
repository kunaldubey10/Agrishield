import Link from 'next/link'
import { FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-400">AgriShield</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Empowering farmers with AI-powered solutions for smarter agriculture. 
              Your one-stop platform for disease detection, crop monitoring, and market insights.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://x.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors" 
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors" 
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/kunal-dubey10" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors" 
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/disease-detection" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                  Disease Detection
                </Link>
              </li>
              <li>
                <Link href="/ndvi-analysis" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                  NDVI Analysis
                </Link>
              </li>
              <li>
                <Link href="/market-prices" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                  Market Prices
                </Link>
              </li>
              <li>
                <Link href="/crop-information" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                  Crop Information
                </Link>
              </li>
              <li>
                <Link href="/agri-updates" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                  Agricultural Updates
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/learn-more" className="text-gray-300 hover:text-green-400 transition-colors">
                  Learn More
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-green-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  API Access
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-green-400 flex-shrink-0" />
                <a href="mailto:dubeykunal07kd@gmail.com" className="hover:text-green-400 transition-colors">
                  dubeykunal07kd@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-green-400 flex-shrink-0" />
                <a href="tel:+917667494346" className="hover:text-green-400 transition-colors">
                  +91 7667494346
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-green-400 flex-shrink-0" />
                <span>Knowledge Park 3, Greater Noida, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center md:text-left text-gray-400 text-sm">
              © {new Date().getFullYear()} AgriShield. All rights reserved. | Built with ❤️ for farmers
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-green-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
