import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/user/DashboardUser'
import CreateReport from './pages/user/createReport'
import UserReports from './pages/user/getUserReports'
import AdminDashboard from './pages/admin/DashboardAdmin'
import TechnicianDashboard from './pages/technician/DashboardTechnician'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/errorBoundary'
import AdminReports from './pages/admin/admineMannage'
// import AdminUsers from './pages/admin/adminMannagerUser'
import AssignedReportsPage from './pages/technician/AssignedReports' // ต้อง import หน้า AssignedReportsPage

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Layout และ Routes หลัก */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              
              {/* Protected User Routes */}
              <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="create-report" element={<CreateReport />} />
                <Route path="reports" element={<UserReports />} />
              </Route>

              {/* Protected Admin Routes */}
       
                <Route path="admin/dashboard" element={<AdminDashboard />} />
                <Route path="admin/ManageCases" element={<AdminReports />} />
                {/* <Route path="admin/manage-users" element={<AdminUsers />} /> */}
              </Route>

              {/* Protected Technician Routes */}
                <Route path="technician/dashboard" element={<TechnicianDashboard />} />
                <Route path="technician/assigned-reports" element={<AssignedReportsPage />} />
              {/* </Route> */}
            {/* </Route> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
