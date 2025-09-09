import { motion } from 'framer-motion'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { courseService } from '../services/courseService'
import { enrollmentService } from '../services/enrollmentService'
import Header from '../components/common/Header'
import LoadingSpinner from '../components/common/LoadingSpinner'
import AllCoursesModal from '../components/course/AllCoursesModal'
import toast from 'react-hot-toast'

const StudentDashboard = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: coursesData, isLoading: coursesLoading } = useQuery(
    'student-courses',
    () => courseService.getCourses({ limit: 6 }),
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000
    }
  )

  const { data: enrollmentsData, isLoading: enrollmentsLoading } = useQuery(
    'student-enrollments',
    () => enrollmentService.getMyEnrollments(),
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000
    }
  )

  // Enrollment mutation
  const enrollMutation = useMutation(
    (courseId) => courseService.enrollInCourse(courseId),
    {
      onSuccess: (response) => {
        toast.success('Successfully enrolled in course!')
        // Refresh enrollments and courses data
        queryClient.invalidateQueries('student-enrollments')
        queryClient.invalidateQueries('student-courses')
        queryClient.invalidateQueries('admin-users') // Also refresh admin data
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to enroll in course')
      }
    }
  )

  // Track which course is being enrolled
  const [enrollingCourseId, setEnrollingCourseId] = useState(null)
  
  // Modal state
  const [isAllCoursesModalOpen, setIsAllCoursesModalOpen] = useState(false)

  const isLoading = coursesLoading || enrollmentsLoading
  const courses = coursesData?.data?.courses || []
  const enrollments = enrollmentsData?.data?.enrollments || []

  // Debug logging
  console.log('Enrollments data:', enrollmentsData)
  console.log('Enrollments array:', enrollments)

  // Check if user is enrolled in a course
  const isEnrolled = (courseId) => {
    const enrolled = enrollments.some(enrollment => enrollment.course?.id === courseId)
    console.log(`Checking enrollment for course ${courseId}:`, enrolled)
    return enrolled
  }

  // Handle enrollment
  const handleEnroll = async (courseId) => {
    setEnrollingCourseId(courseId)
    try {
      await enrollMutation.mutateAsync(courseId)
      // Force refresh the data
      await queryClient.refetchQueries('student-enrollments')
      await queryClient.refetchQueries('student-courses')
    } finally {
      setEnrollingCourseId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const completedCourses = enrollments.filter(e => e.status === 'completed').length
  const inProgressCourses = enrollments.filter(e => e.status === 'in-progress').length
  const totalProgress = enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / Math.max(enrollments.length, 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Welcome Section */}
            <div className="card bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, Student!</h1>
                  <p className="text-indigo-100">Continue your learning journey and explore new courses</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <button 
                    onClick={() => navigate('/courses')}
                    className="btn-white"
                  >
                    Browse All Courses
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Enrolled Courses</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{enrollments.length}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{completedCourses}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{inProgressCourses}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Progress</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{Math.round(totalProgress)}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* My Courses */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">My Courses</h3>
                  <button 
                    onClick={() => setIsAllCoursesModalOpen(true)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {enrollments.slice(0, 3).map((enrollment, index) => (
                    <motion.div
                      key={enrollment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <img
                        src={enrollment.course?.thumbnail || `https://via.placeholder.com/60x40/6366f1/ffffff?text=${enrollment.course?.title?.charAt(0)}`}
                        alt={enrollment.course?.title}
                        className="w-15 h-10 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {enrollment.course?.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {enrollment.course?.instructor?.name}
                        </p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{enrollment.progress || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                            <div
                              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${enrollment.progress || 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate(`/courses/${enrollment.course?.id}`)}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-sm font-medium"
                      >
                        Continue
                      </button>
                    </motion.div>
                  ))}
                  
                  {enrollments.length === 0 && (
                    <div className="text-center py-8">
                      <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <p className="text-gray-500 text-sm">No courses enrolled yet</p>
                      <button 
                        onClick={() => navigate('/courses')}
                        className="btn-primary mt-3"
                      >
                        Browse Courses
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommended Courses */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recommended for You</h3>
                  <button 
                    onClick={() => setIsAllCoursesModalOpen(true)}
                    className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {courses.slice(0, 3).map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <img
                        src={course.thumbnail || `https://via.placeholder.com/60x40/6366f1/ffffff?text=${course.title?.charAt(0)}`}
                        alt={course.title}
                        className="w-15 h-10 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {course.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {course.instructor?.name}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(course.average_rating || 0)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-xs text-gray-500 ml-1">
                              ({course.total_ratings || 0})
                            </span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleEnroll(course.id)}
                        disabled={isEnrolled(course.id) || enrollingCourseId === course.id}
                        className={`btn-primary text-sm ${
                          isEnrolled(course.id) 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : enrollingCourseId === course.id 
                            ? 'opacity-50 cursor-not-allowed' 
                            : ''
                        }`}
                      >
                        {isEnrolled(course.id) 
                          ? 'Enrolled' 
                          : enrollingCourseId === course.id 
                          ? 'Enrolling...' 
                          : 'Enroll'
                        }
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-full">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Course Completed</p>
                    <p className="text-xs text-gray-500">React Fundamentals - 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New Course Enrolled</p>
                    <p className="text-xs text-gray-500">JavaScript Advanced Concepts - 1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Achievement Unlocked</p>
                    <p className="text-xs text-gray-500">First Course Completed - 3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* All Courses Modal */}
      <AllCoursesModal 
        isOpen={isAllCoursesModalOpen}
        onClose={() => setIsAllCoursesModalOpen(false)}
      />
    </div>
  )
}

export default StudentDashboard