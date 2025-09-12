import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://54.255.245.115:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Reduced timeout to 5 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // List of routes that don't need authentication
    const publicRoutes = [
      '/auth/register',
      '/auth/login',
      '/auth/google',
      '/auth/google/callback',
      '/auth/refresh',
      '/courses/categories',
      '/courses?', // Public course listing
      '/courses/search',
      '/courses/popular',
      '/courses/top-rated',
      '/courses/', // Course logo routes
      '/courses/logo'
    ]
    
    // Check if this is a public route
    const isPublicRoute = publicRoutes.some(route => config.url?.includes(route))
    
    // Only add token for non-public routes
    if (!isPublicRoute) {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken
          })

          if (response.data.success) {
            const { accessToken, refreshToken: newRefreshToken } = response.data.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', newRefreshToken)

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            return api(originalRequest)
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        // Clear tokens and redirect to login
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export { api }
export default api
