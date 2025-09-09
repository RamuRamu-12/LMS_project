import { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { courseService } from '../services/courseService'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import CourseFilters from '../components/course/CourseFilters'
import CourseList from '../components/course/CourseList'

const CourseListPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    difficulty: '',
    rating: ''
  })

  const { data: coursesData, isLoading, error } = useQuery(
    ['courses', filters],
    () => {
      // Filter out empty parameters
      const params = {
        limit: 20
      }
      
      if (filters.search && filters.search.trim()) {
        params.q = filters.search
      }
      if (filters.category) {
        params.category = filters.category
      }
      if (filters.difficulty) {
        params.difficulty = filters.difficulty
      }
      if (filters.rating) {
        params.rating = filters.rating
      }
      
      return courseService.getCourses(params)
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000
    }
  )

  const courses = coursesData?.data?.courses || []

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Our Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover a wide range of courses designed to help you learn and grow. 
              From beginner to advanced levels, we have something for everyone.
            </p>
          </motion.div>

          {/* Filters */}
          <CourseFilters 
            onFilterChange={handleFilterChange}
            filters={filters}
          />

          {/* Courses List */}
          <CourseList 
            courses={courses}
            isLoading={isLoading}
            error={error}
            showInstructor={true}
            showRating={true}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CourseListPage
