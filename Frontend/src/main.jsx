import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CareerSyncLogin from './Signin'
import CareerSyncDashboard from './StudentDashboard'
import CareerSyncAdminDashboard from './Admindashboard'
import AddJob from './Addjob'
import ManageJobsPage from './Managejob'
import StudentVerificationPage from './Studentverification'
import CareerSyncSignup from './Signup' // Import the Signup component
import { Link, useNavigate } from "react-router-dom";

createRoot(document.getElementById('root')).render(


  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CareerSyncLogin />} />
      <Route path="/login" element={<CareerSyncLogin />} />
      <Route path="/signup" element={<CareerSyncSignup />} />

      <Route path="/dashboard" element={<CareerSyncDashboard />} />


      <Route path="/admindashboard" element={<CareerSyncAdminDashboard />} />
      <Route path="/addjob" element={<AddJob />} />
      <Route path="/managejob" element={<ManageJobsPage />} />
      <Route path="/verification" element={<StudentVerificationPage />} />
    </Routes>
  </BrowserRouter>
)