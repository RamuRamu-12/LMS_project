import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import VideoPlayer from './VideoPlayer'
import PDFViewer from './PDFViewer'
import { FiFile, FiPlay, FiEye } from 'react-icons/fi'

const StudentChapterView = ({ chapter }) => {
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
    <div className="h-full flex flex-col">
      {/* Chapter Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{chapter.title}</h2>
            {chapter.description && (
              <p className="text-gray-600 mt-1">{chapter.description}</p>
            )}
          </div>
          
          {/* View Mode Toggle */}
          {(hasVideo || hasPDF) && (
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {hasVideo && (
                  <button
                    onClick={() => setViewMode('video')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'video'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <FiPlay className="w-4 h-4" />
                    <span>Video</span>
                  </button>
                )}
                {hasPDF && (
                  <button
                    onClick={() => setViewMode('pdf')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'pdf'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <FiEye className="w-4 h-4" />
                    <span>PDF</span>
                  </button>
                )}
              </div>
              
              {/* Content Status Indicator */}
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                {hasVideo && hasPDF && (
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>1 video</span>
                    <span>,</span>
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <span>1 PDF</span>
                  </span>
                )}
                {hasVideo && !hasPDF && (
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>1 video available</span>
                  </span>
                )}
                {!hasVideo && hasPDF && (
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <span>1 PDF available</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chapter Content */}
      <div className="flex-1 overflow-hidden">
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
          <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="text-center">
              <FiFile className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Available</h3>
              <p className="text-gray-600">
                {!hasVideo && !hasPDF 
                  ? 'This chapter doesn\'t have any content yet.'
                  : viewMode === 'video' 
                    ? 'This chapter doesn\'t have video content yet.'
                    : 'This chapter doesn\'t have PDF content yet.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Chapter Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>Chapter {chapter.chapter_order}</span>
            {chapter.duration_minutes && (
              <span>{Math.floor(chapter.duration_minutes / 60)}h {chapter.duration_minutes % 60}m</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {hasVideo && hasPDF ? 'Video + PDF' :
               hasVideo ? 'Video' : 
               hasPDF ? 'PDF' : 'No Content'}
            </span>
            <span className="text-xs text-gray-400">
              {hasVideo && hasPDF ? '2 content types' :
               hasVideo || hasPDF ? '1 content type' : 'No content'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentChapterView
