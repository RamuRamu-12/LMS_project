import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useQuery } from 'react-query'
import { enrollmentService } from '../services/enrollmentService'
import { courseService } from '../services/courseService'
import Header from '../components/common/Header'
import LoadingSpinner from '../components/common/LoadingSpinner'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    location: user?.location || ''
  })

  // Fetch user statistics
  const { data: enrollmentsData, isLoading: enrollmentsLoading } = useQuery(
    'user-enrollments',
    () => enrollmentService.getMyEnrollments(),
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000
    }
  )

  const { data: coursesData, isLoading: coursesLoading } = useQuery(
    'user-courses',
    () => courseService.getCourses({ limit: 100 }),
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000
    }
  )

  const enrollments = enrollmentsData?.data?.enrollments || []
  const courses = coursesData?.data?.courses || []

  // Calculate statistics
  const stats = {
    totalEnrolled: enrollments.length,
    completedCourses: enrollments.filter(e => e.status === 'completed').length,
    inProgressCourses: enrollments.filter(e => e.status === 'in-progress').length,
    totalHours: enrollments.reduce((sum, e) => sum + (e.course?.estimatedDuration || 0), 0),
    averageProgress: enrollments.length > 0 
      ? Math.round(enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length)
      : 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user context
      updateUser({ ...user, ...formData })
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      phone: user?.phone || '',
      location: user?.location || ''
    })
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'stats', name: 'Statistics', icon: '📊' },
    { id: 'achievements', name: 'Achievements', icon: '🏆' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Enhanced Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                        alt={user.name}
                        className="w-20 h-20 rounded-full border-4 border-white/30 shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </motion.div>
              <div>
                      <h1 className="text-3xl font-bold">{user.name}</h1>
                      <p className="text-indigo-100 text-lg">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-purple-500/30 text-purple-100'
                            : 'bg-blue-500/30 text-blue-100'
                        }`}>
                          {user.role === 'admin' ? '👑 Admin' : '🎓 Student'}
                        </span>
                        <span className="text-sm text-indigo-200">
                          Member since {new Date().getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="mt-4 lg:mt-0 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-all duration-300"
                    >
                      ✏️ Edit Profile
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex space-x-0">
                {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="text-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative inline-block"
                        >
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                      alt={user.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-100"
                          />
                          <button className="absolute bottom-2 right-2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
                            📷
                          </button>
                        </motion.div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{user.name}</h3>
                        <p className="text-gray-500 mb-3">{user.email}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-center text-sm text-gray-600">
                            <span className="mr-2">📧</span>
                            {user.email}
                          </div>
                          <div className="flex items-center justify-center text-sm text-gray-600">
                            <span className="mr-2">📱</span>
                            {formData.phone || 'Not provided'}
                          </div>
                          <div className="flex items-center justify-center text-sm text-gray-600">
                            <span className="mr-2">📍</span>
                            {formData.location || 'Not provided'}
                          </div>
                        </div>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={handleCancel}
                              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <LoadingSpinner size="sm" />
                              <span className="ml-2">Saving...</span>
                            </div>
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
              )}

              {activeTab === 'stats' && (
                <div className="space-y-6">
                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                    >
                      <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.totalEnrolled}</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                    >
                      <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Completed</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.completedCourses}</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                    >
                      <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-lg">
                          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">In Progress</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.inProgressCourses}</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                    >
                      <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Total Hours</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Progress Chart */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Overall Progress</span>
                          <span>{stats.averageProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stats.averageProgress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Achievement Cards */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-4 border border-gray-200 rounded-lg text-center"
                      >
                        <div className="text-4xl mb-2">🎓</div>
                        <h4 className="font-semibold text-gray-900">First Course</h4>
                        <p className="text-sm text-gray-600">Complete your first course</p>
                        <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                          stats.completedCourses > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {stats.completedCourses > 0 ? 'Unlocked' : 'Locked'}
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-4 border border-gray-200 rounded-lg text-center"
                      >
                        <div className="text-4xl mb-2">🔥</div>
                        <h4 className="font-semibold text-gray-900">Streak Master</h4>
                        <p className="text-sm text-gray-600">Study for 7 days in a row</p>
                        <div className="mt-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          Locked
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-4 border border-gray-200 rounded-lg text-center"
                      >
                        <div className="text-4xl mb-2">⭐</div>
                        <h4 className="font-semibold text-gray-900">Top Performer</h4>
                        <p className="text-sm text-gray-600">Complete 5 courses</p>
                        <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                          stats.completedCourses >= 5 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {stats.completedCourses >= 5 ? 'Unlocked' : 'Locked'}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-4">
                      <div className="flex items-center justify-between py-4 border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-lg mr-4">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
                    <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
                  </div>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Change
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between py-4 border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="p-2 bg-green-100 rounded-lg mr-4">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Enable
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between py-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-red-100 rounded-lg mr-4">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Delete Account</h4>
                    <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                  </div>
                        </div>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          Delete
                        </button>
                      </div>
                </div>
              </div>
            </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage
