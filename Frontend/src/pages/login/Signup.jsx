import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CareerSyncSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Retrieve existing users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the email is already registered
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        setError("Email is already registered.");
        setLoading(false);
        return;
      }

      // Create a new user
      const newUser = {
        id: `user${users.length + 1}`,
        email,
        password,
        username,
        role: "student", // Default role for signup
        token: `token-${Date.now()}`,
      };

      // Save the new user to localStorage
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      setSuccess("Signup successful! Redirecting to login...");

      // Redirect to login page
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="flex-1 bg-gradient-to-br from-sky-400 via-teal-400 to-yellow-300 flex items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/30 blur-xl"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 rounded-full bg-white/20 blur-lg"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 rounded-full bg-white/25 blur-md"></div>
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <h1 className="text-6xl font-bold mb-6 leading-tight">Career Sync</h1>
          <p className="text-xl mb-8 font-medium opacity-95">
            Connecting Talent with Opportunity
          </p>
          <p className="text-lg leading-relaxed opacity-90">
            Discover your perfect career match with our AI-powered platform.
            Connect with top employers, build professional resumes, and unlock
            opportunities that align with your skills and aspirations. Your
            dream job is just a click away.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Create an Account
            </h2>

            <div className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              {/* Show errors/success */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              {/* Sign Up Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-3 px-4 rounded-lg font-medium hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>

              {/* Already have an account */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/")}
                    className="text-sky-500 hover:text-sky-600 transition-colors duration-200 cursor-pointer"
                  >
                    Log in here
                  </span>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center mb-2">
                2025 Career Sync. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}