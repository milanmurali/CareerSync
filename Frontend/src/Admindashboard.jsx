import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
  Users,
  UserCheck,
  Briefcase,
  Building,
  FileText,
  TrendingUp,
  TrendingDown,
  Clock,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  MoreHorizontal,
  Activity,
  Calendar,
  MapPin,
  DollarSign,
  Menu,
  X
} from 'lucide-react';

// API Configuration
const API_BASE_URL = `http://localhost:6969`;

// Mock API functions (replace with actual API calls)
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Return mock data for demonstration
    return getMockData(endpoint);
  }
};

const getMockData = (endpoint) => {
  const mockData = {
    '/api/stats': {
      totalStudents: 2847,
      totalStudentsChange: 12.3,
      activeJobs: 156,
      activeJobsChange: 8.1,
      applicationsToday: 89,
      applicationsTodayChange: 15.2,
      pendingVerifications: 23,
      pendingVerificationsChange: -4.5,
    },
    '/api/applications/category': [
      { category: 'Software Developer', applications: 485, color: '#3B82F6' },
      { category: 'Data Analyst', applications: 320, color: '#10B981' },
      { category: 'UI/UX Designer', applications: 275, color: '#8B5CF6' },
      { category: 'Marketing Specialist', applications: 198, color: '#F59E0B' },
      { category: 'Project Manager', applications: 165, color: '#EF4444' },
      { category: 'Business Analyst', applications: 142, color: '#06B6D4' },
    ],
    '/api/recent-activities': [
      { id: 1, type: 'application', user: 'Sarah Johnson', action: 'applied for Software Developer position', time: '2 minutes ago', icon: 'user', color: 'green' },
      { id: 2, type: 'job', user: 'System', action: 'New job posted: Senior UX Designer at TechCorp', time: '15 minutes ago', icon: 'briefcase', color: 'blue' },
      { id: 3, type: 'verification', user: 'Alex Chen', action: 'Student verification completed', time: '1 hour ago', icon: 'check', color: 'green' },
      { id: 4, type: 'application', user: 'Michael Brown', action: 'applied for Data Analyst position', time: '2 hours ago', icon: 'user', color: 'green' },
      { id: 5, type: 'update', user: 'System', action: 'Job requirements updated for Marketing Specialist', time: '3 hours ago', icon: 'edit', color: 'orange' },
      { id: 6, type: 'registration', user: 'Emma Wilson', action: 'New student registration', time: '4 hours ago', icon: 'user-plus', color: 'purple' },
    ]
  };
  return mockData[endpoint] || {};
};

export default function CareerSyncAdminDashboard() {
  const [stats, setStats] = useState({});
  const [applicationData, setApplicationData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, categoryData, activitiesData] = await Promise.all([
        apiCall('/api/stats'),
        apiCall('/api/applications/category'),
        apiCall('/api/recent-activities')
      ]);
      
      setStats(statsData);
      setApplicationData(categoryData);
      setRecentActivities(activitiesData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color, suffix = '' }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className={`flex items-center text-xs sm:text-sm font-medium ${
          change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {change >= 0 ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-gray-600">{title}</div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getIconComponent = () => {
      switch (activity.icon) {
        case 'user': return Users;
        case 'briefcase': return Briefcase;
        case 'check': return CheckCircle;
        case 'edit': return FileText;
        case 'user-plus': return UserCheck;
        default: return Activity;
      }
    };
    
    const Icon = getIconComponent();
    
    return (
      <div className="flex items-start space-x-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-${activity.color}-100 flex-shrink-0`}>
          <Icon className={`w-3 h-3 sm:w-4 sm:h-4 text-${activity.color}-600`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-900 leading-tight">{activity.action}</p>
          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
        </div>
      </div>
    );
  };

  const Sidebar = () => (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 lg:border-b-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">CS</span>
              </div>
              <span className="font-bold text-lg sm:text-xl text-gray-900">Career Sync</span>
            </div>
            <button 
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Admin Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 sm:px-4 py-4 overflow-y-auto">
          <div className="space-y-1 sm:space-y-2">
            <a href="#" className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-3 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base">
              <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Dashboard</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Student Verification</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Post Job</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              <Building className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Manage Jobs</span>
            </a>

            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>User Management</span>
            </a>

            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Reports</span>
            </a>
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-3 sm:p-4 border-t border-gray-200">
          <div className="space-y-1">
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 rounded-lg transition-colors text-sm sm:text-base">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Settings</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-red-50 hover:text-red-600 px-3 py-2.5 rounded-lg transition-colors text-sm sm:text-base">
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1 hidden sm:block">Welcome back! Here's what's happening with your platform.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="lg:hidden p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              change={stats.totalStudentsChange}
              icon={Users}
              color="bg-blue-500"
            />
            
            <StatCard
              title="Active Jobs"
              value={stats.activeJobs}
              change={stats.activeJobsChange}
              icon={Briefcase}
              color="bg-green-500"
            />
            
            <StatCard
              title="Applications Today"
              value={stats.applicationsToday}
              change={stats.applicationsTodayChange}
              icon={FileText}
              color="bg-purple-500"
            />
            
            <StatCard
              title="Pending Verifications"
              value={stats.pendingVerifications}
              change={stats.pendingVerificationsChange}
              icon={Clock}
              color="bg-orange-500"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Applications by Category */}
            <div className="xl:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Applications by Category</h3>
                <button className="text-blue-600 text-xs sm:text-sm hover:text-blue-700 font-medium">View All</button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                    {applicationData.reduce((sum, item) => sum + item.applications, 0).toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Total Applications</div>
                </div>

                {applicationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{item.category}</span>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">{item.applications}</div>
                      <div className="text-xs text-gray-500">
                        {((item.applications / applicationData.reduce((sum, i) => sum + i.applications, 0)) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Activities</h3>
                <button className="text-blue-600 text-xs sm:text-sm hover:text-blue-700 font-medium">View All</button>
              </div>

              <div className="space-y-1 max-h-64 sm:max-h-96 overflow-y-auto">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <button 
                onClick={() => apiCall('/api/jobs', { method: 'POST' })}
                className="flex flex-col sm:flex-row items-center sm:space-x-3 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mb-2 sm:mb-0">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="font-medium text-blue-900 text-xs sm:text-sm text-center sm:text-left">Post New Job</span>
              </button>

              <button 
                onClick={() => apiCall('/api/students/verify')}
                className="flex flex-col sm:flex-row items-center sm:space-x-3 p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mb-2 sm:mb-0">
                  <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="font-medium text-green-900 text-xs sm:text-sm text-center sm:text-left">Verify Students</span>
              </button>

              <button 
                onClick={() => apiCall('/api/applications')}
                className="flex flex-col sm:flex-row items-center sm:space-x-3 p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mb-2 sm:mb-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="font-medium text-purple-900 text-xs sm:text-sm text-center sm:text-left">View Applications</span>
              </button>

              <button 
                onClick={() => apiCall('/api/reports')}
                className="flex flex-col sm:flex-row items-center sm:space-x-3 p-3 sm:p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mb-2 sm:mb-0">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="font-medium text-orange-900 text-xs sm:text-sm text-center sm:text-left">View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}