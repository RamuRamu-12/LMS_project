import { useState } from 'react'
import { motion } from 'framer-motion'

const CourseFilters = ({ onFilterChange, filters = {} }) => {
  const [localFilters, setLocalFilters] = useState({
    category: filters.category || '',
    difficulty: filters.difficulty || '',
    rating: filters.rating || '',
    search: filters.search || ''
  })

  const categories = [
    'All Categories',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Design',
    'Business',
    'Marketing',
    'Photography',
    'Music'
  ]

  const difficulties = [
    'All Levels',
    'Beginner',
    'Intermediate',
    'Advanced'
  ]

  const ratings = [
    'All Ratings',
    '4.5 & up',
    '4.0 & up',
    '3.5 & up',
    '3.0 & up'
  ]

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      difficulty: '',
      rating: '',
      search: ''
    }
    setLocalFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(localFilters).some(value => value !== '')

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mb-6"
    >
      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Courses
          </label>
          <div className="relative">
            <input
              type="text"
              value={localFilters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search by title, instructor, or keywords..."
              className="input-field pl-10"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={localFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="input-field"
            >
              {categories.map((category) => (
                <option key={category} value={category === 'All Categories' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              value={localFilters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="input-field"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty === 'All Levels' ? '' : difficulty.toLowerCase()}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <select
              value={localFilters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="input-field"
            >
              {ratings.map((rating) => (
                <option key={rating} value={rating === 'All Ratings' ? '' : rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Actions */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center justify-between pt-4 border-t border-gray-200"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {localFilters.category && (
                <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  {localFilters.category}
                </span>
              )}
              {localFilters.difficulty && (
                <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  {localFilters.difficulty}
                </span>
              )}
              {localFilters.rating && (
                <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  {localFilters.rating}
                </span>
              )}
              {localFilters.search && (
                <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  "{localFilters.search}"
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default CourseFilters
