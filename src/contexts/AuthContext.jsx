import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// สร้าง constant สำหรับ API URL
const API_BASE_URL = 'http://localhost:4000/auth'

// สร้าง initial context value
const initialAuthContext = {
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false
}

const AuthContext = createContext(initialAuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // ตรวจสอบว่ามีข้อมูลผู้ใช้ใน localStorage หรือไม่
    const savedUser = localStorage.getItem('user')
    console.log(savedUser)
    return savedUser ? JSON.parse(savedUser) : null

  })
  const navigate = useNavigate()

  // สร้าง axios instance สำหรับการเรียก API
  const authApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  
  

  // เพิ่ม interceptor สำหรับจัดการ error
  authApi.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        logout()
      }
      return Promise.reject(error)
    }
  )

  const login = useCallback(async (email, password) => {
    try {
      const response = await authApi.post('/login', { email, password })
      const userData = response.data

      // บันทึกข้อมูลผู้ใช้ลง localStorage
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)

      // ถ้ามี token ให้เพิ่มเข้าไปใน axios headers
      if (userData.token) {
        authApi.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
      }

      return userData
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
      throw new Error(errorMessage)
    }
  }, [])

  const logout = useCallback(() => {
    // ลบข้อมูลผู้ใช้จาก localStorage
    localStorage.removeItem('user')
    // ลบ token ออกจาก axios headers
    delete authApi.defaults.headers.common['Authorization']
    setUser(null)
    navigate('/login')
  }, [navigate])

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}