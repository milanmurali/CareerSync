import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CareerSyncLogin from './Signin'
import CareerSyncDashboard from './StudentDashboard'
import CareerSyncAdminDashboard from './Admindashboard'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/signin" element={<CareerSyncLogin/>}/>
    <Route path="/stddashboard" element={<CareerSyncDashboard/>}/>
    <Route path="/admindashboard" element={<CareerSyncAdminDashboard/>}/>
  
  </Routes>
  </BrowserRouter>
)
