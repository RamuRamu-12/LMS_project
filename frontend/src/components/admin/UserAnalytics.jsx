import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { userService } from '../../services/userService'
import { useAuth } from '../../context/AuthContext'

const UserAnalytics = () => {
  const { user, isAuthenticated } = useAuth()
  
  const { data: usersData, isLoading, error } = useQuery(
    'admin-users-analytics',
    () => userService.getUsers(),
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      enabled: isAuthenticated && user?.role === 'admin'
    }
  )

  // Debug logging
  console.log('UserAnalytics - user:', user)
  console.log('UserAnalytics - isAuthenticated:', isAuthenticated)
  console.log('UserAnalytics - usersData:', usersData)
  console.log('UserAnalytics - error:', error)

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="card p-6">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
          <p className="text-gray-600 mb-4">You need admin privileges to view user analytics.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card p-6">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading analytics</h3>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <div className="text-sm text-gray-500 mb-4">
            <p>Error details: {JSON.stringify(error, null, 2)}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const users = usersData?.data?.users || []
  
  // Debug logging
  console.log('UserAnalytics - users array:', users)
  console.log('UserAnalytics - users length:', users.length)
  
  // Calculate analytics - focus on students only
  const totalUsers = users.length
  const adminUsers = users.filter(user => user.role === 'admin').length
  const studentUsers = users.filter(user => user.role === 'student').length
  const activeStudents = users.filter(user => user.role === 'student' && user.is_active).length
  
  console.log('UserAnalytics - calculated stats:', {
    totalUsers,
    adminUsers,
    studentUsers,
    activeStudents
  })
  
  // Recent student registrations (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recentStudentRegistrations = users.filter(user => 
    user.role === 'student' && new Date(user.created_at) >= sevenDaysAgo
  ).length
  
  // Students who logged in recently (last 24 hours)
  const oneDayAgo = new Date()
  oneDayAgo.setDate(oneDayAgo.getDate() - 1)
  const recentStudentLogins = users.filter(user => 
    user.role === 'student' && user.last_login && new Date(user.last_login) >= oneDayAgo
  ).length
  
  // Students who never logged in
  const studentsNeverLoggedIn = users.filter(user => 
    user.role === 'student' && !user.last_login
  ).length

  const stats = [
    {
      title: 'Total Students',
      value: studentUsers,
      change: `+${recentStudentRegistrations} this week`,
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.083 12.083 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      title: 'Active Students',
      value: activeStudents,
      change: `${studentUsers > 0 ? Math.round((activeStudents / studentUsers) * 100) : 0}% of students`,
      changeType: 'neutral',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Total Users',
      value: totalUsers,
      change: `${adminUsers} admin${adminUsers !== 1 ? 's' : ''}`,
      changeType: 'neutral',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      title: 'Recent Student Logins',
      value: recentStudentLogins,
      change: 'Last 24 hours',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-xs mt-1 ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.title === 'Total Users' ? 'bg-blue-100 text-blue-600' :
                stat.title === 'Active Users' ? 'bg-green-100 text-green-600' :
                stat.title === 'Students' ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Activity</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New student registrations this week</span>
              <span className="font-semibold text-green-600">+{recentStudentRegistrations}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Students who never logged in</span>
              <span className="font-semibold text-orange-600">{studentsNeverLoggedIn}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Admin accounts</span>
              <span className="font-semibold text-purple-600">{adminUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active students</span>
              <span className="font-semibold text-blue-600">{activeStudents}</span>
            </div>
          </div>
        </motion.div>

        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Student Registrations</h3>
          <div className="space-y-3">
            {users
              .filter(user => user.role === 'student')
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 5)
              .map((user, index) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    student
                  </span>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UserAnalytics
