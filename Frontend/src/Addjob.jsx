import React, { useState } from "react";

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
  Calendar,
  SidebarOpen
} from 'lucide-react';



export default function AddJob() {
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [minCGPA, setMinCGPA] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const API_BASE = import.meta.env.BACKEND_HOST || "https://careersync-39yq.onrender.com/";

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    const jobData = {
      companyName,
      title,
      description,
      requiredSkills: requiredSkills.split(",").map((skill) => skill.trim()),
      minCGPA: parseFloat(minCGPA),
      location,
      type,
    };

    try {
      const res = await fetch(`${API_BASE}/jobs/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create job.");
      } else {
        setSuccess("Job created successfully!");
        // Clear form fields
        setCompanyName("");
        setTitle("");
        setDescription("");
        setRequiredSkills("");
        setMinCGPA("");
        setLocation("");
        setType("");
      }
    } catch (err) {
      console.error("Error creating job:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const Sidebar = ({ sidebarOpen, setSidebarOpen }) => (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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
        <nav className="flex-1 px-3 sm:px-4 py-4 overflow-y-auto">
          <div className="space-y-1 sm:space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 rounded-lg transition-colors text-sm sm:text-base"
            >
              <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 rounded-lg transition-colors text-sm sm:text-base"
            >
              <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Student Verification</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-3 py-2.5 rounded-lg font-medium text-sm sm:text-base"
            >
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Post Job</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 rounded-lg transition-colors text-sm sm:text-base"
            >
              <Building className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Manage Jobs</span>
            </a>
          </div>
        </nav>
        <div className="p-3 sm:p-4 border-t border-gray-200">
          <a
            href="#"
            className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-red-50 hover:text-red-600 px-3 py-2.5 rounded-lg transition-colors text-sm sm:text-base"
          >
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
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
              <p className="text-sm text-gray-600 hidden sm:block">
                Create and publish a new job opportunity for students
              </p>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </FormField>

                <FormField label="Company Name" required>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. TechCorp Inc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </FormField>

                <FormField label="Location" required>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. New York, NY or Remote"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </FormField>

                <FormField label="Job Type">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </FormField>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeader icon={FileText} title="Job Description" />

              <FormField label="Description" required>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the role, company culture, and what makes this opportunity exciting..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none text-sm sm:text-base"
                />
              </FormField>
            </div>

            {/* Required Skills */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeader icon={Award} title="Required Skills" />
              <FormField label="Required Skills (comma-separated)" required>
                <input
                  type="text"
                  value={requiredSkills}
                  onChange={(e) => setRequiredSkills(e.target.value)}
                  placeholder="e.g., React, Node.js, TypeScript"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </FormField>
            </div>

            {/* Minimum CGPA */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <SectionHeader icon={List} title="Minimum CGPA" />
              <FormField label="Minimum CGPA" required>
                <input
                  type="number"
                  value={minCGPA}
                  onChange={(e) => setMinCGPA(e.target.value)}
                  placeholder="Enter minimum CGPA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </FormField>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                {loading ? "Creating Job..." : "Create Job"}
              </button>
            </div>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}