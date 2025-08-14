import React, { useState } from 'react';
import { 
  Menu,
  X,
  Search,
  ChevronDown,
  ChevronLeft,
  Users,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Download,
  Filter,
  LayoutDashboard,
  UserCheck,
  Briefcase,
  Building,
  LogOut
} from 'lucide-react';

export default function StudentVerificationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Applications');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock student data
  const [students] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      university: 'Stanford University',
      major: 'Computer Science',
      graduationYear: 2024,
      status: 'pending',
      avatar: 'S',
      avatarColor: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@college.edu',
      university: 'MIT',
      major: 'Data Science',
      graduationYear: 2025,
      status: 'pending',
      avatar: 'M',
      avatarColor: 'bg-teal-500'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.wilson@university.edu',
      university: 'Harvard University',
      major: 'Business Administration',
      graduationYear: 2024,
      status: 'under_review',
      avatar: 'E',
      avatarColor: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      email: 'david.rodriguez@tech.edu',
      university: 'Carnegie Mellon',
      major: 'Software Engineering',
      graduationYear: 2024,
      status: 'verified',
      avatar: 'D',
      avatarColor: 'bg-green-500'
    },
    {
      id: 5,
      name: 'Lisa Park',
      email: 'lisa.park@university.edu',
      university: 'UC Berkeley',
      major: 'Marketing',
      graduationYear: 2025,
      status: 'rejected',
      avatar: 'L',
      avatarColor: 'bg-red-500'
    }
  ]);

  const stats = {
    totalApplications: 5,
    pendingReview: 2,
    underReview: 1,
    verified: 1,
    rejected: 1
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          label: 'PENDING',
          color: 'bg-orange-100 text-orange-800',
          icon: Clock,
          iconColor: 'text-orange-600'
        };
      case 'under_review':
        return {
          label: 'UNDER REVIEW',
          color: 'bg-blue-100 text-blue-800',
          icon: Eye,
          iconColor: 'text-blue-600'
        };
      case 'verified':
        return {
          label: 'VERIFIED',
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case 'rejected':
        return {
          label: 'REJECTED',
          color: 'bg-red-100 text-red-800',
          icon: XCircle,
          iconColor: 'text-red-600'
        };
      default:
        return {
          label: 'UNKNOWN',
          color: 'bg-gray-100 text-gray-800',
          icon: AlertCircle,
          iconColor: 'text-gray-600'
        };
    }
  };

  const filterStudents = () => {
    let filtered = students;

    // Filter by status
    if (activeFilter !== 'All Applications') {
      const statusMap = {
        'Pending Review': 'pending',
        'Under Review': 'under_review',
        'Verified': 'verified',
        'Rejected': 'rejected'
      };
      filtered = filtered.filter(student => student.status === statusMap[activeFilter]);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
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
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">CS</span>
              </div>
              <span className="font-bold text-lg text-blue-600">Career Sync</span>
            </div>
            <button 
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 sm:px-4 py-4 overflow-y-auto">
          <div className="space-y-1 sm:space-y-2">
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Dashboard</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-3 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base">
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
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-3 sm:p-4 border-t border-gray-200">
          <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-red-50 hover:text-red-600 px-3 py-2.5 rounded-lg transition-colors text-sm sm:text-base">
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Logout</span>
          </a>
        </div>
      </div>
    </>
  );

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-2">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900">{value}</div>
      </div>
      <div className="text-xs sm:text-sm text-gray-600">{title}</div>
    </div>
  );

  const StudentCard = ({ student }) => {
    const statusConfig = getStatusConfig(student.status);
    const StatusIcon = statusConfig.icon;

    return (
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${student.avatarColor} rounded-full flex items-center justify-center text-white font-semibold`}>
                {student.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{student.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{student.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button className="p-1 rounded-md hover:bg-gray-100">
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3 mb-4 text-xs sm:text-sm">
            <div>
              <div className="text-gray-600">University:</div>
              <div className="font-medium text-gray-900">{student.university}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-gray-600">Major:</div>
                <div className="font-medium text-gray-900">{student.major}</div>
              </div>
              <div>
                <div className="text-gray-600">Graduation Year:</div>
                <div className="font-medium text-gray-900">{student.graduationYear}</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color} flex items-center space-x-1`}>
              <StatusIcon className={`w-3 h-3 ${statusConfig.iconColor}`} />
              <span>{statusConfig.label}</span>
            </span>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className={`w-12 h-12 ${student.avatarColor} rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0`}>
                {student.avatar}
              </div>
              
              <div className="flex-1 min-w-0 grid grid-cols-4 gap-6">
                <div>
                  <div className="font-semibold text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-600">{student.email}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">University</div>
                  <div className="font-medium text-gray-900">{student.university}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Major</div>
                  <div className="font-medium text-gray-900">{student.major}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Graduation Year</div>
                  <div className="font-medium text-gray-900">{student.graduationYear}</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 ml-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color} flex items-center space-x-2`}>
                <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
                <span>{statusConfig.label}</span>
              </span>
              
              <div className="relative">
                <button className="p-1 rounded-md hover:bg-gray-100">
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredStudents = filterStudents();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-3">
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-md hidden sm:block">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Student Verification</h1>
              <p className="text-sm text-gray-600 hidden sm:block">Review and verify student applications to ensure platform integrity.</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
            <StatCard
              title="Total Applications"
              value={stats.totalApplications}
              icon={Users}
              color="bg-blue-500"
            />
            <StatCard
              title="Pending Review"
              value={stats.pendingReview}
              icon={Clock}
              color="bg-orange-500"
            />
            <StatCard
              title="Under Review"
              value={stats.underReview}
              icon={Eye}
              color="bg-blue-500"
            />
            <StatCard
              title="Verified"
              value={stats.verified}
              icon={CheckCircle}
              color="bg-green-500"
            />
            <StatCard
              title="Rejected"
              value={stats.rejected}
              icon={XCircle}
              color="bg-red-500"
            />
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-wrap items-center gap-1 p-2">
              {['All Applications', 'Pending Review', 'Under Review', 'Verified', 'Rejected'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or university..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Student List */}
          <div className="space-y-3 sm:space-y-4">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))
            ) : (
              <div className="bg-white rounded-xl p-8 sm:p-12 text-center shadow-sm border border-gray-100">
                <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No students found</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {searchTerm 
                    ? `No students match your search for "${searchTerm}"`
                    : `No students in the ${activeFilter} category`
                  }
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredStudents.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 space-y-3 sm:space-y-0">
              <div className="text-sm text-gray-600">
                Showing {filteredStudents.length} of {stats.totalApplications} applications
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <span>Designed by</span>
                <span className="ml-2 font-medium">Readly</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}