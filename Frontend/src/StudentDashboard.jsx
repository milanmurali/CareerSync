import React, { useState, useEffect } from 'react';
import {
  User,
  FileText,
  Calendar,
  LogOut,
  Eye,
  Star,
  Clock,
  Video,
  MapPin,
  Menu,
  X,
} from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function CareerSyncDashboard() {

  const navigate = useNavigate();
  const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("name") || "Guest";


  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);


  // Device Detection
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const isMobile = windowWidth < 768;
  const isSmall = windowWidth < 640;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${BACKEND_HOST}/jobs/student-dashboard/${userId}`);
      setDashboardData(response.data);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      const msg = err?.response?.data?.message || err?.message || "Failed to load dashboard";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };


  // Loading and Error
  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;


  // Dashboard Data
  const profile = dashboardData?.profile || {};
  const stats = {
    applied: dashboardData?.stats?.applied || 0,
    interviews: dashboardData?.upcomingInterviews?.length || 0,
    totalApplications: dashboardData?.stats?.totalApplications || 0
  };
  const upcomingInterviews = dashboardData?.upcomingInterviews || [];
  const recentApplications = dashboardData?.recentApplications || [];

  return (
    <div className="minh-screen bg-gray-50 flex">

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
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-md hover:bg-gray-100">
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
            <a onClick={handleLogout} className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg cursor-pointer">
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
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1 rounded-md hover:bg-gray-100">
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900" style={{ fontFamily: 'serif' }}>CareerSync</h1>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-8 h-8 p-1 rounded-full" />
              <span className="text-sm font-medium text-gray-900 hidden sm:inline">{username}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden mb-6 lg:mb-8">
            <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-row justify-between items-center'}`}>
              <div className={isMobile ? 'text-center' : ''}>
                <h2 className={`font-bold mb-2 ${isSmall ? 'text-lg' : 'text-xl lg:text-2xl'}`}>
                  Welcome back, {username}!
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
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{stats.applied}</div>
              <div className="text-xs lg:text-sm text-gray-600">Applied Jobs</div>
            </div>
            <div className="bg-white rounded-xl p-4 lg:p-6 text-center">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-3">
                <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{stats.interviews}</div>
              <div className="text-xs lg:text-sm text-gray-600">Interviews</div>
            </div>
            <div className="bg-white rounded-xl p-4 lg:p-6 text-center">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-3">
                <Star className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{profile.profileScore || 0}%</div>
              <div className="text-xs lg:text-sm text-gray-600">Profile Score</div>
            </div>
            <div className="bg-white rounded-xl p-4 lg:p-6 text-center col-span-2 lg:col-span-1">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-3">
                <Star className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-600" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{profile.rating || 0}</div>
              <div className="text-xs lg:text-sm text-gray-600">Rating</div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Recent Applications */}
            <div className="bg-white rounded-xl p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4 lg:mb-6">Recent Applications</h3>
              <div className="space-y-4">
                {recentApplications.map(app => (
                  <div key={app._id} className="flex items-center space-x-3 lg:space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">{app.title?.[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm lg:text-base truncate">{app.title}</div>
                      <div className="text-xs lg:text-sm text-gray-600 truncate">{app.companyName}</div>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex-shrink-0">
                      {app.interviews?.[0]?.status || "Applied"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-white rounded-xl p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4 lg:mb-6">Upcoming Interviews</h3>
              <div className="space-y-4">
                {upcomingInterviews.map(interview => (
                  <div key={interview.jobId} className="border border-gray-200 rounded-lg p-3 lg:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <div className="mb-2 sm:mb-0">
                        <div className="font-medium text-gray-900 text-sm lg:text-base">{interview.title}</div>
                        <div className="text-xs lg:text-sm text-gray-600">{interview.companyName}</div>
                      </div>
                      <div className="text-xs text-green-600">{interview.date}</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span>{interview.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span>{interview.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Video className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span>{interview.mode}</span>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base">
                      Join Interview
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
