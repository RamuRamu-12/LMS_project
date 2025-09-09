import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { courseService } from '../services/courseService'
import { enrollmentService } from '../services/enrollmentService'
import { useAuth } from '../context/AuthContext'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ChapterSidebar from '../components/course/ChapterSidebar'
import StudentChapterView from '../components/course/StudentChapterView'
import { FiAlertCircle } from 'react-icons/fi'

const CourseDetailPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [selectedChapter, setSelectedChapter] = useState(null)

  // Use course content endpoint for students, general endpoint for others
  const { data: courseData, isLoading, error } = useQuery(
    ['course', id],
    () => {
      if (user?.role === 'student') {
        return courseService.getCourseContent(id)
      } else {
        return courseService.getCourseById(id)
      }
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false
    }
  )

  // Mutation for updating progress
  const updateProgressMutation = useMutation(
    (progress) => enrollmentService.updateMyProgress(id, { progress }),
    {
      onSuccess: () => {
        // Refetch course data to get updated progress
        queryClient.invalidateQueries(['course', id])
        queryClient.invalidateQueries('student-enrollments')
      }
    }
  )

  // Handle progress update from video player
  const handleProgressUpdate = (progress) => {
    if (user?.role === 'student' && progress > 0) {
      updateProgressMutation.mutate(progress)
    }
  }

  const course = courseData?.data?.course
  const enrollment = courseData?.data?.enrollment // For enrolled students
  const chapters = course?.chapters || []

  // Set first chapter as selected when chapters are loaded
  useEffect(() => {
    if (chapters.length > 0 && !selectedChapter) {
      setSelectedChapter(chapters[0])
    }
  }, [chapters, selectedChapter])


  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Handle enrollment error
  if (error && error.message?.includes('enrolled')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Enrollment Required</h1>
            <p className="text-gray-600 mb-6">You must be enrolled in this course to access its content.</p>
            <button 
              onClick={() => window.history.back()}
              className="btn-primary"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Add safety checks for course data
  if (course && typeof course !== 'object') {
    console.error('Invalid course data structure:', course)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Course Data</h1>
            <p className="text-gray-600">The course data is not in the expected format.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
            <p className="text-gray-600">The course you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

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
            {/* Course Header */}
            <div className="card p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {course.title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      course.difficulty === 'beginner' 
                        ? 'bg-green-100 text-green-800'
                        : course.difficulty === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {course.difficulty}
                    </span>
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                      {course.category}
                    </span>
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800">
                      {course.estimated_duration || 0} hours
                    </span>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                      {course.enrollment_count || 0} students
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {course.average_rating || 0} rating
                    </span>
                  </div>

                  {/* Enrollment Status for Students */}
                  {user?.role === 'student' && enrollment && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-green-800">You're enrolled in this course</h3>
                          <p className="text-xs text-green-600">
                            Enrolled on {new Date(enrollment.enrolled_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-800">
                            Progress: {enrollment.progress || 0}%
                          </div>
                          <div className="w-24 bg-green-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${enrollment.progress || 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-6xl font-bold">
                        {course.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Course Content - Chapter-based layout for all users */}
            {chapters.length > 0 ? (
              <div className="flex h-[calc(100vh-200px)] bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Chapter Sidebar */}
                <ChapterSidebar
                  chapters={chapters}
                  selectedChapterId={selectedChapter?.id}
                  onChapterSelect={setSelectedChapter}
                  courseTitle={course.title}
                />
                
                {/* Chapter Content */}
                <div className="flex-1 overflow-y-auto">
                  <StudentChapterView 
                    chapter={selectedChapter}
                  />
                </div>
              </div>
            ) : (
              /* No chapters available */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* No Content Section */}
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Content</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Available</h3>
                      <p className="text-gray-600">
                        This course doesn't have any chapters yet. Check back later for updates.
                      </p>
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  {course.learning_objectives && course.learning_objectives.length > 0 && (
                    <div className="card p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h3>
                      <ul className="space-y-3">
                        {course.learning_objectives.map((objective, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Course Files */}
                  {course.files && course.files.length > 0 && (
                    <div className="card p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Materials</h3>
                      <div className="space-y-3">
                        {course.files.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{file.original_name}</p>
                                <p className="text-xs text-gray-500">{file.file_type.toUpperCase()}</p>
                              </div>
                            </div>
                            <button className="btn-primary text-sm px-4 py-2">
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                {/* Course Info */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{course.estimated_duration || 0} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level</span>
                      <span className="font-medium capitalize">{course.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium capitalize">{course.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students</span>
                      <span className="font-medium">{course.enrollment_count || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-medium">{course.average_rating || 0}/5</span>
                    </div>
                  </div>
                </div>

                {/* Instructor */}
                {course.instructor && (
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructor</h3>
                    <div className="flex items-center space-x-3">
                      <img
                        src={course.instructor.avatar || `https://ui-avatars.com/api/?name=${course.instructor.name}&background=6366f1&color=fff`}
                        alt={course.instructor.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{course.instructor.name}</p>
                        <p className="text-sm text-gray-500">Course Instructor</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CourseDetailPage
