import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import VideoPlayer from './VideoPlayer'
import PDFViewer from './PDFViewer'
import ChapterProgressTracker from './ChapterProgressTracker'
import { FiFile, FiPlay, FiEye } from 'react-icons/fi'

const StudentChapterView = ({ chapter, enrollmentId }) => {
  const [viewMode, setViewMode] = useState('video') // 'video' or 'pdf'

  // Auto-set view mode based on available content
  useEffect(() => {
    if (chapter) {
      const hasVideo = !!chapter.video_url
      const hasPDF = !!chapter.pdf_url
      
      if (hasVideo && hasPDF) {
        // If both are available, keep current selection or default to video
        setViewMode(prev => prev)
      } else if (hasVideo) {
        setViewMode('video')
      } else if (hasPDF) {
        setViewMode('pdf')
      }
    }
  }, [chapter])

  if (!chapter) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="text-center">
          <FiFile className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Chapter Selected</h3>
          <p className="text-gray-600">Select a chapter from the sidebar to view its content.</p>
        </div>
      </div>
    )
  }

  const hasVideo = !!chapter.video_url
  const hasPDF = !!chapter.pdf_url

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white to-gray-50">
      {/* Compact Content Type Selector - No duplicate title */}
      <div className="relative overflow-hidden bg-white border-b border-gray-200 px-4 py-2">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex-1">
            {/* Removed duplicate chapter title - it's already shown in sidebar */}
          </div>
          
          {/* Compact View Mode Toggle */}
          {(hasVideo || hasPDF) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="flex bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-1 shadow-sm">
                {hasVideo && (
                  <button
                    onClick={() => setViewMode('video')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      viewMode === 'video'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <FiPlay className="w-3 h-3" />
                    <span>Video</span>
                  </button>
                )}
                {hasPDF && (
                  <button
                    onClick={() => setViewMode('pdf')}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      viewMode === 'pdf'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <FiEye className="w-3 h-3" />
                    <span>PDF</span>
                  </button>
                )}
              </div>
              
              {/* Compact Content Status Indicator */}
              <div className="flex items-center space-x-2">
                {hasVideo && hasPDF && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <span className="text-xs font-medium text-red-700">1 video</span>
                    </div>
                    <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                      <span className="text-xs font-medium text-blue-700">1 PDF</span>
                    </div>
                  </div>
                )}
                {hasVideo && !hasPDF && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                    <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span className="text-xs font-medium text-red-700">1 video</span>
                  </div>
                )}
                {!hasVideo && hasPDF && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <span className="text-xs font-medium text-blue-700">1 PDF</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Large Video/Content Area */}
      <div className="flex-1 overflow-hidden bg-gradient-to-br from-white to-gray-50">
        {viewMode === 'video' && hasVideo ? (
          <VideoPlayer
            url={chapter.video_url}
            title={chapter.title}
            className="h-full w-full"
            showControls={true}
            autoplay={false}
          />
        ) : viewMode === 'pdf' && hasPDF ? (
          <PDFViewer
            pdfUrl={chapter.pdf_url}
            title={chapter.title}
            className="h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center p-12"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiFile className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Content Available</h3>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                {!hasVideo && !hasPDF 
                  ? 'This chapter doesn\'t have any content yet.'
                  : viewMode === 'video' 
                    ? 'This chapter doesn\'t have video content yet.'
                    : 'This chapter doesn\'t have PDF content yet.'}
              </p>
            </motion.div>
          </div>
        )}
      </div>

      {/* Chapter Progress Tracker - More Prominent */}
      {enrollmentId && chapter && (
        <div className="border-t-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
          <ChapterProgressTracker
            enrollmentId={enrollmentId}
            chapterId={chapter.id}
            chapterTitle={chapter.title}
            hasVideo={hasVideo}
            hasPDF={hasPDF}
          />
        </div>
      )}

    </div>
  )
}

export default StudentChapterView
