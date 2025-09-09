import { Routes, Route, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import StudentDashboard from './pages/StudentDashboard'
import CourseListPage from './pages/CourseListPage'
import CourseDetailPage from './pages/CourseDetailPage'
import CreateCoursePage from './pages/CreateCoursePage'
import UserManagementPage from './pages/UserManagementPage'
import StudentListPage from './pages/StudentListPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

// Components
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoadingSpinner from './components/common/LoadingSpinner'
import ErrorBoundary from './components/common/ErrorBoundary'

// Hooks
import { useAuth } from './context/AuthContext'

function App() {
  console.log('App component is rendering')
  
  try {
    const { user, loading } = useAuth()
    console.log('Auth state:', { user, loading })

    if (loading) {
      console.log('App is in loading state')
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      )
    }

    console.log('App is rendering main content')

    return (
      <ErrorBoundary>
        <Helmet>
          <title>LMS Platform - Learning Management System</title>
          <meta name="description" content="Empowering Digital Learning with our comprehensive Learning Management System" />
        </Helmet>
        
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/student/*"
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard"
              element={
                user ? (
                  <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            
            {/* Course Routes */}
            <Route path="/courses" element={<CourseListPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin/courses/create"
              element={
                <ProtectedRoute requiredRole="admin">
                  <CreateCoursePage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <UserManagementPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/students"
              element={
                <ProtectedRoute requiredRole="admin">
                  <StudentListPage />
                </ProtectedRoute>
              }
            />
            
            {/* Profile Route */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </ErrorBoundary>
    )
  } catch (error) {
    console.error('Error in App component:', error)
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#fef2f2', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', color: '#dc2626', marginBottom: '1rem' }}>
            Error in App Component
          </h1>
          <p style={{ color: '#991b1b' }}>
            {error.message}
          </p>
        </div>
      </div>
    )
  }
}

export default App