import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Helpdesk
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <span className="mr-4">{user.email}</span>
                {/* ลิงก์ไปยัง Dashboard ตามบทบาท */}
                {user.role === 'USER' && (
                  <Link
                    to="/user/dashboard"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
                  >
                    User Dashboard
                  </Link>
                )}
                {user.role === 'ADMIN' && (
                  <Link
                    to="/admin/dashboard"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {user.role === 'REPAIR_TECHNICIAN' || user.role === 'LEAD_REPAIR_TECHNICIAN' ? (
                  <Link
                    to="/technician/dashboard"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
                  >
                    Technician Dashboard
                  </Link>
                ) : null}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
