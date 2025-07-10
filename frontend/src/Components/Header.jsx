'use client'
import React from 'react'
import  Link from 'next/link'
function Header() {
  return (
    <div className=''>
      <header className="bg-white mt-5 mb-5">
        <div className="max-w-4xl rounded-full  shadow-[0_5px_15px_rgba(0,0,0,0.08)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 ">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8 ">
              <a href="/" className="text-gray-900 hover:text-blue-600 font-bold transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Find Jobs
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Find Talents
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                About us
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Testimonials
              </a>
            </nav>
            
            <Link href="/createjob" className="bg-gradient-to-b from-purple-600 via-purple-700 to-purple-800 text-white px-6 py-2 rounded-full font-medium transition-colors">
                Create Jobs
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
