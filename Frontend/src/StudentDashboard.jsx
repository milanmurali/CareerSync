import React, { useState, useEffect } from 'react';
import { 
  User, 
  FileText, 
  Calendar, 
  MessageCircle, 
  LogOut,
  Eye,
  Star,
  Heart,
  MapPin,
  Clock,
  Video,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

export default function CareerSyncDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isSmall = windowWidth < 640;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-sm border-r border-gray-200 
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">CS</span>
              </div>
              <span className="font-semibold text-gray-900">Career Sync</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <a href="#" className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
              <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                <div className="bg-blue-600 rounded-sm"></div>
                <div className="bg-blue-600 rounded-sm"></div>
                <div className="bg-blue-600 rounded-sm"></div>
                <div className="bg-blue-600 rounded-sm"></div>
              </div>
              <span className="font-medium">Dashboard</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg">
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg">
              <FileText className="w-5 h-5" />
              <span>Job Listings</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg">
              <Calendar className="w-5 h-5" />
              <span>Interview Details</span>
            </a>
          </div>
          
          <div className="mt-auto px-4 pt-8">
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900" style={{fontFamily: 'serif'}}>Career Sync</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900 hidden sm:inline">Sarah Johnson</span>
              <svg className="w-4 h-4 text-gray-500 hidden sm:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden mb-6 lg:mb-8">
            <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-row justify-between items-center'}`}>
              <div className={isMobile ? 'text-center' : ''}>
                <h2 className={`font-bold mb-2 ${isSmall ? 'text-lg' : 'text-xl lg:text-2xl'}`}>
                  Welcome back, Sarah!
                </h2>
                <p className={`text-blue-100 mb-4 ${isSmall ? 'text-sm' : 'text-base'}`}>
                  Ready to take the next step in your career journey?
                </p>
                <button className={`bg-white text-blue-600 px-4 lg:px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all transform hover:scale-105 ${isSmall ? 'text-sm' : 'text-base'} ${isMobile ? 'w-full' : ''}`}>
                  Explore Opportunities
                </button>
              </div>
              <div className={`${isSmall ? 'w-16 h-12 mx-auto' : isMobile ? 'w-20 h-16 self-center' : 'w-32 h-24'} bg-white bg-opacity-20 rounded-lg flex items-center justify-center`}>
                <div className={`${isSmall ? 'w-8 h-8' : isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-white bg-opacity-30 rounded-lg`}></div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-white rounded-xl p-4 lg:p-6 text-center">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-3">
                <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">24</div>
              <div className="text-xs lg:text-sm text-gray-600">Applied Jobs</div>
              <div className="text-xs text-green-600 mt-1">+3 this week</div>
            </div>

            <div className="bg-white rounded-xl p-4 lg:p-6 text-center">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-3">
                <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">7</div>
              <div className="text-xs lg:text-sm text-gray-600">Interviews</div>
              <div className="text-xs text-green-600 mt-1">2 upcoming</div>
            </div>

            <div className="bg-white rounded-xl p-4 lg:p-6 text-center">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-3">
                <Eye className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-600" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">156</div>
              <div className="text-xs lg:text-sm text-gray-600">Profile Views</div>
              <div className="text-xs text-green-600 mt-1">+12 this month</div>
            </div>

            <div className="bg-white rounded-xl p-4 lg:p-6 text-center">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-3">
                <Star className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">89%</div>
              <div className="text-xs lg:text-sm text-gray-600">Profile Score</div>
              <div className="text-xs text-green-600 mt-1">Excellent</div>
            </div>

            <div className="bg-white rounded-xl p-4 lg:p-6 text-center col-span-2 lg:col-span-1">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-3">
                <Star className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-600" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">4.8</div>
              <div className="text-xs lg:text-sm text-gray-600">Rating</div>
              <div className="text-xs text-green-600 mt-1">Excellent</div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Recent Applications */}
            <div className="bg-white rounded-xl p-4 lg:p-6">
              <div className="flex justify-between items-center mb-4 lg:mb-6">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">Recent Applications</h3>
                <button className="text-blue-600 text-sm hover:text-blue-700">View All</button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold text-sm">F</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm lg:text-base truncate">Frontend Developer</div>
                    <div className="text-xs lg:text-sm text-gray-600 truncate">TechCorp Solutions</div>
                    <div className="text-xs text-gray-500">Applied 2 days ago</div>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex-shrink-0">Under Review</span>
                </div>

                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-semibold text-sm">U</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm lg:text-base truncate">UX Designer</div>
                    <div className="text-xs lg:text-sm text-gray-600 truncate">DesignHub Agency</div>
                    <div className="text-xs text-gray-500">Applied 5 days ago</div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex-shrink-0">Interview</span>
                </div>

                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-semibold text-sm">B</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm lg:text-base truncate">Business Analyst</div>
                    <div className="text-xs lg:text-sm text-gray-600 truncate">FinanceFirst Ltd</div>
                    <div className="text-xs text-gray-500">Applied 1 week ago</div>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex-shrink-0">Applied</span>
                </div>
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-white rounded-xl p-4 lg:p-6">
              <div className="flex justify-between items-center mb-4 lg:mb-6">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">Upcoming Interviews</h3>
                <button className="text-blue-600 text-sm hover:text-blue-700">View All</button>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-3 lg:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div className="mb-2 sm:mb-0">
                      <div className="font-medium text-gray-900 text-sm lg:text-base">Senior Developer Position</div>
                      <div className="text-xs lg:text-sm text-gray-600">Innovate Tech Inc.</div>
                    </div>
                    <div className="text-xs text-green-600">Today</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span>Dec 15, 2024</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span>2:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Video className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span>Video Call</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base">
                    Join Interview
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-3 lg:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div className="mb-2 sm:mb-0">
                      <div className="font-medium text-gray-900 text-sm lg:text-base">Marketing Coordinator</div>
                      <div className="text-xs lg:text-sm text-gray-600">BrandBoost Marketing</div>
                    </div>
                    <div className="text-xs text-blue-600">Next Week</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span>Dec 18, 2024</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span>10:30 AM</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span>On-site</span>
                    </div>
                  </div>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm lg:text-base">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="mt-6 lg:mt-8">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4 lg:mb-6">Recommended Jobs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="bg-white rounded-xl p-4 lg:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-lg"></div>
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Full Stack Developer</h4>
                <div className="text-sm text-gray-600 mb-1">StartupXYZ</div>
                <div className="text-xs lg:text-sm text-gray-500 mb-4 flex items-center">
                  <MapPin className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
                  <span className="truncate">San Francisco, CA • Remote</span>
                </div>
                <div className="text-base lg:text-lg font-bold text-gray-900 mb-4">$85k - $120k</div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base">
                  Apply Now
                </button>
              </div>

              <div className="bg-white rounded-xl p-4 lg:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 bg-teal-500 rounded"></div>
                  </div>
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Product Manager</h4>
                <div className="text-sm text-gray-600 mb-1">HealthTech Solutions</div>
                <div className="text-xs lg:text-sm text-gray-500 mb-4 flex items-center">
                  <MapPin className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
                  <span className="truncate">Boston, MA • Hybrid</span>
                </div>
                <div className="text-base lg:text-lg font-bold text-gray-900 mb-4">$95k - $130k</div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base">
                  Apply Now
                </button>
              </div>

              <div className="bg-white rounded-xl p-4 lg:p-6 relative md:col-span-2 lg:col-span-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-lg"></div>
                  <Heart className="w-5 h-5 text-blue-500 cursor-pointer" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Data Analyst</h4>
                <div className="text-sm text-gray-600 mb-1">EduTech Platform</div>
                <div className="text-xs lg:text-sm text-gray-500 mb-4 flex items-center">
                  <MapPin className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
                  <span className="truncate">Austin, TX • Remote</span>
                </div>
                <div className="text-base lg:text-lg font-bold text-gray-900 mb-4">$70k - $95k</div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}