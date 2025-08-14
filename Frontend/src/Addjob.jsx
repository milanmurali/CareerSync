import React, { useState } from 'react';
import { 
  ArrowLeft,
  Info,
  DollarSign,
  FileText,
  List,
  Users,
  Award,
  Gift,
  Mail,
  Plus,
  X,
  Menu,
  LayoutDashboard,
  UserCheck,
  Briefcase,
  Building,
  LogOut,
  Calendar
} from 'lucide-react';

export default function JobPostingForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobCategory: 'Software Development',
    jobType: 'Full-time',
    workMode: 'Remote',
    experienceLevel: 'Entry Level',
    minSalary: '',
    maxSalary: '',
    currency: 'USD',
    period: 'Annually',
    description: '',
    requirements: [''],
    responsibilities: [''],
    skills: [''],
    benefits: [''],
    contactEmail: '',
    companyWebsite: '',
    applicationDeadline: '',
    companyDescription: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
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
            
            <a href="#" className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-3 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base">
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

  const SectionHeader = ({ icon: Icon, title, step }) => (
    <div className="flex items-center space-x-3 mb-4 sm:mb-6">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
      </div>
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h2>
        {step && <p className="text-xs sm:text-sm text-gray-500">Step {step}</p>}
      </div>
    </div>
  );

  const FormField = ({ label, required, children, className = "" }) => (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );

  const ArrayField = ({ label, field, placeholder, addText }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="space-y-2">
        {formData[field].map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleArrayChange(field, index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            {formData[field].length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(field, index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(field)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{addText}</span>
        </button>
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
          <div className="flex items-center space-x-3">
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-md">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Post New Job</h1>
              <p className="text-sm text-gray-600 hidden sm:block">Create and publish a new job opportunity for students</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
            
            {/* Basic Information */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeader icon={Info} title="Basic Information" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <FormField label="Job Title" required>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </FormField>

                <FormField label="Company Name" required>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="e.g. TechCorp Inc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </FormField>

                <FormField label="Location" required>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g. New York, NY or Remote"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </FormField>

                <FormField label="Job Category">
                  <select
                    value={formData.jobCategory}
                    onChange={(e) => handleInputChange('jobCategory', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  >
                    <option>Software Development</option>
                    <option>Data Science</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                  </select>
                </FormField>

                <FormField label="Job Type">
                  <select
                    value={formData.jobType}
                    onChange={(e) => handleInputChange('jobType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </FormField>

                <FormField label="Work Mode">
                  <select
                    value={formData.workMode}
                    onChange={(e) => handleInputChange('workMode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  >
                    <option>Remote</option>
                    <option>On-site</option>
                    <option>Hybrid</option>
                  </select>
                </FormField>

                <FormField label="Experience Level">
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  >
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior Level</option>
                    <option>Executive</option>
                  </select>
                </FormField>
              </div>
            </div>

            {/* Salary Information */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeader icon={DollarSign} title="Salary Information" />
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <FormField label="Minimum Salary">
                  <input
                    type="number"
                    value={formData.minSalary}
                    onChange={(e) => handleInputChange('minSalary', e.target.value)}
                    placeholder="50000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </FormField>

                <FormField label="Maximum Salary">
                  <input
                    type="number"
                    value={formData.maxSalary}
                    onChange={(e) => handleInputChange('maxSalary', e.target.value)}
                    placeholder="80000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </FormField>

                <FormField label="Currency">
                  <select
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>INR</option>
                  </select>
                </FormField>

                <FormField label="Period">
                  <select
                    value={formData.period}
                    onChange={(e) => handleInputChange('period', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  >
                    <option>Annually</option>
                    <option>Monthly</option>
                    <option>Hourly</option>
                  </select>
                </FormField>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeader icon={FileText} title="Job Description" />
              
              <FormField label="Description" required>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the role, company culture, and what makes this opportunity exciting..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none text-sm sm:text-base"
                />
                <div className="text-right text-xs text-gray-500 mt-1">0/500</div>
              </FormField>
            </div>

            {/* Requirements and Responsibilities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <SectionHeader icon={List} title="Requirements" />
                <ArrayField 
                  label="Requirements" 
                  field="requirements"
                  placeholder="e.g. Bachelor's degree in Computer Science"
                  addText="Add Requirement"
                />
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <SectionHeader icon={Users} title="Responsibilities" />
                <ArrayField 
                  label="Responsibilities" 
                  field="responsibilities"
                  placeholder="e.g. Develop and maintain web applications"
                  addText="Add Responsibility"
                />
              </div>
            </div>

            {/* Skills and Benefits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <SectionHeader icon={Award} title="Required Skills" />
                <ArrayField 
                  label="Required Skills" 
                  field="skills"
                  placeholder="e.g. React, Node.js, TypeScript"
                  addText="Add Skill"
                />
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <SectionHeader icon={Gift} title="Benefits & Perks" />
                <ArrayField 
                  label="Benefits & Perks" 
                  field="benefits"
                  placeholder="e.g. Health insurance, Flexible hours"
                  addText="Add Benefit"
                />
              </div>
            </div>

            {/* Contact & Additional Information */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeader icon={Mail} title="Contact & Additional Information" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <FormField label="Contact Email" required>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="hiring@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </FormField>

                <FormField label="Company Website">
                  <input
                    type="url"
                    value={formData.companyWebsite}
                    onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                    placeholder="https://company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </FormField>

                <FormField label="Application Deadline" required>
                  <input
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </FormField>
              </div>

              <FormField label="Company Description" className="mt-4 sm:mt-6">
                <textarea
                  value={formData.companyDescription}
                  onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                  placeholder="Tell us about your company culture, mission, and what makes it a great place to work..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none text-sm sm:text-base"
                />
                <div className="text-right text-xs text-gray-500 mt-1">0/300</div>
              </FormField>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-4 sm:pt-6">
              <div className="text-xs text-gray-500 flex items-center">
                <span>Designed by</span>
                <span className="ml-2 font-medium">Readly</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base">
                  Save as Draft
                </button>
                <button className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base">
                  Preview Job Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}