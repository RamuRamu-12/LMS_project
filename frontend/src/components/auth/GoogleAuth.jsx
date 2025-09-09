import { useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'

const GoogleAuth = ({ onSuccess, onError }) => {
  const { login } = useAuth()
  const googleButtonRef = useRef(null)

  useEffect(() => {
    // Initialize Google Sign-In
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      })

      if (googleButtonRef.current) {
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'continue_with',
          shape: 'rectangular'
        })
      }
    }
  }, [])

  const handleCredentialResponse = async (response) => {
    try {
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]))
      
      // For now, we'll simulate a successful login
      // In a real app, you'd send this to your backend for verification
      const mockUser = {
        id: 1,
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
        role: 'student' // Default role, can be changed by admin
      }

      const mockTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      }

      const result = await login(mockTokens.accessToken, mockTokens.refreshToken, false)
      
      if (result.success) {
        onSuccess?.(result.user)
      } else {
        onError?.(result.error)
      }
    } catch (error) {
      console.error('Google auth error:', error)
      onError?.(error.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div ref={googleButtonRef} className="w-full" />
    </motion.div>
  )
}

export default GoogleAuth
