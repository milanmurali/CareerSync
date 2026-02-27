import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom";
import './index.css'
import CareerSyncLogin from './pages/login/Signin';
import CareerSyncSignup from './pages/login/Signup';
import CareerSyncDashboard from './pages/student/StudentDashboard';



createRoot(document.getElementById('root')).render(


  <BrowserRouter>
    <Routes>

      <Route path="/" element={<CareerSyncLogin/>} />
      <Route path="/signup" element={<CareerSyncSignup/>} />
      <Route path="/dashboard" element={<CareerSyncDashboard/>} />
    </Routes>
  </BrowserRouter>
)