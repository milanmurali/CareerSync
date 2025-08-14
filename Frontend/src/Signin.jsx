import React, { useState } from 'react';

export default function CareerSyncLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');

  const handleSubmit = () => {
    console.log('Login attempt:', { email, password, role });
    // Add your login logic here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="flex-1 bg-gradient-to-br from-sky-400 via-teal-400 to-yellow-300 flex items-center justify-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/30 blur-xl"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 rounded-full bg-white/20 blur-lg"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 rounded-full bg-white/25 blur-md"></div>
        </div>
        
        <div className="relative z-10 text-white max-w-lg">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Career Sync
          </h1>
          <p className="text-xl mb-8 font-medium opacity-95">
            Connecting Talent with Opportunity
          </p>
          <p className="text-lg leading-relaxed opacity-90">
            Discover your perfect career match with our AI-powered platform. Connect with top employers, build professional resumes, and unlock opportunities that align with your skills and aspirations. Your dream job is just a click away.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Welcome Back
            </h2>

            <div className="space-y-6">
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-3 px-4 rounded-lg font-medium hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Sign In
              </button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-sky-500 hover:text-sky-600 transition-colors duration-200"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center mb-2">
                © 2025 Career Sync. All rights reserved.
              </p>
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Don't have an account?{' '}
                  <a href="#" className="text-sky-500 hover:text-sky-600 transition-colors duration-200">
                    Sign up here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}