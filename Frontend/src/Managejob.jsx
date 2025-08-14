import React, { useState } from 'react';
import { 
  Menu,
  X,
  Plus,
  Download,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Building,
  FileText,
  LayoutDashboard,
  UserCheck,
  Briefcase,
  LogOut
} from 'lucide-react';

export default function ManageJobsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  // Mock job data
  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc',
      location: 'San Francisco, CA',
      status: 'Active',
      featured: true,
      category: 'Software Development',
      salary: 'USD 80,000 - 120,000 annually',
      posted: '1/15/2024',
      applications: 45,
      views: 324,
      applyRate: '14%'
    },
    {
      id: 2,
      title: 'Marketing Coordinator',
      company: 'Brand Solutions',
      location: 'Chicago, IL',
      status: 'Draft',
      featured: false,
      category: 'Marketing & Communications',
      salary: 'USD 20 - 30 hourly',
      posted: '1/14/2024',
      applications: 0,
      views: 0,
      applyRate: '0%'
    },
    {
      id: 3,
      title: 'Sales Representative',
      company: 'Growth Corp',
      location: 'Miami, FL',
      status: 'Active',
      featured: false,
      category: 'Sales & Customer Success',
      salary: 'USD 50,000 - 75,000 annually',
      posted: '1/13/2024',
      applications: 34,
      views: 298,
      applyRate: '11%'
    },
    {
      id: 4,
      title: 'Data Analyst Intern',
      company: 'Analytics Pro',
      location: 'San Francisco, CA',
      status: 'Active',
      featured: false,
      category: 'Data Science & Analytics',
      salary: 'USD 25 - 35 hourly',
      posted: '1/12/2024',
      applications: 89,
      views: 567,
      applyRate: '16%'
    },
    {
      id: 5,
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'Los Angeles, CA',
      status: 'Paused',
      featured: false,
      category: 'UI/UX Design',
      salary: 'USD 70,000 - 95,000 annually',
      posted: '1/10/2024',
      applications: 23,
      views: 189,
      applyRate: '12%'
    },
    {
      id: 6,
      title: 'Project Manager',
      company: 'Enterprise Solutions',
      location: 'Boston, MA',
      status: 'Expired',
      featured: true,
      category: 'Business & Management',
      salary: 'USD 90,000 - 130,000 annually',
      posted: '12/15/2023',
      applications: 67,
      views: 432,
      applyRate: '16%'
    }
  ]);

  const stats = {
    totalJobs: 6,
    activeJobs: 3,
    totalApplications: 258,
    avgApplyRate: '14%'
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
            
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Student Verification</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Post Job</span>
            </a>
            
            <a href="#" className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-3 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base">
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const JobCard = ({ job }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{job.title}</h3>
              {job.featured && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-1">
              <Building className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{job.company}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
            <button className="p-1 rounded-md hover:bg-gray-100">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs sm:text-sm">
          <div>
            <div className="text-gray-600">Category:</div>
            <div className="font-medium text-gray-900 truncate">{job.category}</div>
          </div>
          <div>
            <div className="text-gray-600">Posted:</div>
            <div className="font-medium text-gray-900">{job.posted}</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-xs sm:text-sm text-gray-600">Salary:</div>
          <div className="font-semibold text-gray-900 text-sm sm:text-base">{job.salary}</div>
        </div>
        
        <div className="flex justify-between items-center text-xs sm:text-sm mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-blue-600 font-medium">{job.applications} Applications</span>
            <span className="text-gray-600">{job.views} Views</span>
            <span className="text-orange-600 font-medium">{job.applyRate} Apply Rate</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center justify-center space-x-1">
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button className="bg-red-100 text-red-600 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors text-sm">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
              {job.featured && (
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center space-x-1">
                <Building className="w-4 h-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <div className="text-sm text-gray-600">Category:</div>
            <div className="font-medium text-gray-900">{job.category}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Salary:</div>
            <div className="font-medium text-gray-900">{job.salary}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Posted:</div>
            <div className="font-medium text-gray-900">{job.posted}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm">
            <span className="text-blue-600 font-medium">{job.applications} Applications</span>
            <span className="text-gray-600">{job.views} Views</span>
            <span className="text-orange-600 font-medium">{job.applyRate} Apply Rate</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>View</span>
            </button>
            <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button className="bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center space-x-2">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <button 
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Jobs</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Manage your job postings, track applications, and analyze performance</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center space-x-1 sm:space-x-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export Data</span>
                <span className="sm:hidden">Export</span>
              </button>
              <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-1 sm:space-x-2">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Post New Job</span>
                <span className="sm:hidden">Post Job</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <StatCard
              title="Total Jobs"
              value={stats.totalJobs}
              icon={FileText}
              color="bg-blue-500"
            />
            <StatCard
              title="Active Jobs"
              value={stats.activeJobs}
              icon={Briefcase}
              color="bg-green-500"
            />
            <StatCard
              title="Total Applications"
              value={stats.totalApplications}
              icon={Users}
              color="bg-purple-500"
            />
            <StatCard
              title="Avg. Apply Rate"
              value={stats.avgApplyRate}
              icon={TrendingUp}
              color="bg-orange-500"
            />
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search jobs by title, company, or keywords..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Paused</option>
                    <option>Expired</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>All Categories</option>
                    <option>Software Development</option>
                    <option>Marketing & Communications</option>
                    <option>Sales & Customer Success</option>
                    <option>Data Science & Analytics</option>
                    <option>UI/UX Design</option>
                    <option>Business & Management</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
                
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Clear Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-600">
              Showing 6 jobs
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <span>Designed by</span>
              <span className="ml-2 font-medium">Readly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}