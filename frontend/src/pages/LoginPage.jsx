import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import GoogleAuth from '../components/auth/GoogleAuth'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: 'admin',
    password: 'admin123'
  })
  const [loginType, setLoginType] = useState('traditional') // 'traditional' or 'google'

  // Determine if this is admin or student login based on URL params or state
  const userType = location.state?.userType || new URLSearchParams(location.search).get('type') || 'student'

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  // Handle URL parameters for OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const refresh = urlParams.get('refresh')
    const isNew = urlParams.get('isNew') === 'true'

    if (token && refresh) {
      handleOAuthCallback(token, refresh, isNew)
    }
  }, [])

  const handleOAuthCallback = async (token, refreshToken, isNew) => {
    setLoading(true)
    try {
      const result = await login(token, refreshToken, isNew)
      if (result.success) {
        navigate(from, { replace: true })
      }
    } catch (error) {
      toast.error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = (user) => {
    toast.success(`Welcome ${user.name}!`)
    navigate(from, { replace: true })
  }

  const handleGoogleError = (error) => {
    toast.error(`Login failed: ${error}`)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTraditionalLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Use the real backend API for authentication
      const response = await authService.login(formData.username, formData.password)
      
      if (response.success) {
        // Store tokens and login
        const result = await login(
          response.data.tokens.accessToken, 
          response.data.tokens.refreshToken, 
          false
        )
        
        if (result.success) {
          toast.success(`Welcome back, ${response.data.user.name}!`)
          navigate(from, { replace: true })
        } else {
          toast.error('Login failed. Please try again.')
        }
      } else {
        toast.error(response.message || 'Login failed. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        userType === 'admin' 
          ? 'bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
      }`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="spinner w-16 h-16" />
          </div>
          <p className={userType === 'admin' ? 'text-gray-300' : 'text-gray-600'}>
            Completing your login...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      userType === 'admin' 
        ? 'bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className={`p-8 rounded-2xl shadow-2xl ${
          userType === 'admin' 
            ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
            : 'bg-white shadow-xl'
        }`}>
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                userType === 'admin' 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-800' 
                  : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
              }`}>
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className={`text-2xl font-bold bg-clip-text text-transparent ${
                userType === 'admin' 
                  ? 'bg-gradient-to-r from-gray-400 to-white' 
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
              }`}>
                Gnanam AI
              </span>
            </Link>
            
            <h2 className={`text-3xl font-bold mb-2 ${
              userType === 'admin' ? 'text-white' : 'text-gray-900'
            }`}>
              {userType === 'admin' ? 'Admin Portal' : 'Welcome Back'}
            </h2>
            <p className={userType === 'admin' ? 'text-gray-300' : 'text-gray-600'}>
              {userType === 'admin' 
                ? 'Access the administrative dashboard' 
                : 'Sign in to your account to continue learning'
              }
            </p>
          </div>

          {/* Login Type Toggle */}
          <div className={`flex rounded-lg p-1 mb-6 ${
            userType === 'admin' 
              ? 'bg-white/10 backdrop-blur-sm' 
              : 'bg-gray-100'
          }`}>
            <button
              type="button"
              onClick={() => setLoginType('traditional')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                loginType === 'traditional'
                  ? userType === 'admin'
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'bg-white text-indigo-600 shadow-sm'
                  : userType === 'admin'
                    ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Username & Password
            </button>
            <button
              type="button"
              onClick={() => setLoginType('google')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                loginType === 'google'
                  ? userType === 'admin'
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'bg-white text-indigo-600 shadow-sm'
                  : userType === 'admin'
                    ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Google Sign-In
            </button>
          </div>

          {/* Traditional Login Form */}
          {loginType === 'traditional' && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleTraditionalLogin}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className={`block text-sm font-medium mb-2 ${
                    userType === 'admin' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Username or Email
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                      userType === 'admin'
                        ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-400 focus:border-gray-400'
                        : 'border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                    placeholder="Enter username (admin) or email (student@test.com)"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className={`block text-sm font-medium mb-2 ${
                    userType === 'admin' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                      userType === 'admin'
                        ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-400 focus:border-gray-400'
                        : 'border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  userType === 'admin'
                    ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white hover:from-gray-700 hover:to-gray-900 focus:ring-gray-400'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  userType === 'admin' ? 'Access Admin Portal' : 'Sign In'
                )}
              </button>

              <div className="text-center">
                <div className={`rounded-lg p-3 ${
                  userType === 'admin'
                    ? 'bg-white/10 border border-white/20'
                    : 'bg-blue-50 border border-blue-200'
                }`}>
                  <p className={`text-sm font-medium mb-2 ${
                    userType === 'admin' ? 'text-gray-300' : 'text-blue-800'
                  }`}>
                    Demo Credentials:
                  </p>
                  <div className={`space-y-2 text-xs ${
                    userType === 'admin' ? 'text-gray-300' : 'text-blue-700'
                  }`}>
                    <div>
                      <span className="font-medium">Admin:</span> 
                      <span className={`font-mono px-2 py-1 rounded ml-1 ${
                        userType === 'admin' ? 'bg-white/20 text-white' : 'bg-blue-100'
                      }`}>
                        admin
                      </span> / 
                      <span className={`font-mono px-2 py-1 rounded ml-1 ${
                        userType === 'admin' ? 'bg-white/20 text-white' : 'bg-blue-100'
                      }`}>
                        admin123
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Student:</span> 
                      <span className={`font-mono px-2 py-1 rounded ml-1 ${
                        userType === 'admin' ? 'bg-white/20 text-white' : 'bg-blue-100'
                      }`}>
                        student@test.com
                      </span> / 
                      <span className={`font-mono px-2 py-1 rounded ml-1 ${
                        userType === 'admin' ? 'bg-white/20 text-white' : 'bg-blue-100'
                      }`}>
                        student123
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.form>
          )}

          {/* Google Auth */}
          {loginType === 'google' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <GoogleAuth
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Secure authentication powered by Google
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Features */}
          <div className="mt-8 space-y-4">
            <h3 className={`text-lg font-semibold text-center ${
              userType === 'admin' ? 'text-white' : 'text-gray-900'
            }`}>
              {userType === 'admin' ? 'Admin Features:' : "What you'll get:"}
            </h3>
            <ul className={`space-y-2 text-sm ${
              userType === 'admin' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {userType === 'admin' ? (
                <>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Manage courses, users, and content
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    View analytics and user insights
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    System configuration and settings
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure administrative access
                  </li>
                </>
              ) : (
                <>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Access to all courses and learning materials
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Track your learning progress and achievements
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Secure, role-based access control
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mobile-responsive design for learning anywhere
              </li>
                </>
              )}
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            {userType === 'student' && (
              <p className={`text-sm mb-2 ${
                userType === 'admin' ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Create one here
                </Link>
              </p>
            )}
            <Link
              to="/"
              className={`text-sm font-medium mt-2 inline-block ${
                userType === 'admin' 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-indigo-600 hover:text-indigo-500'
              }`}
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className={`text-xs ${
            userType === 'admin' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            By signing in, you agree to our{' '}
            <a href="#" className={`hover:underline ${
              userType === 'admin' 
                ? 'text-gray-300 hover:text-white' 
                : 'text-indigo-600 hover:text-indigo-500'
            }`}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className={`hover:underline ${
              userType === 'admin' 
                ? 'text-gray-300 hover:text-white' 
                : 'text-indigo-600 hover:text-indigo-500'
            }`}>
              Privacy Policy
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
