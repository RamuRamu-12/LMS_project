const fetch = require('node-fetch');
const logger = require('../utils/logger');

/**
 * Proxy PDF content to avoid CORS issues
 */
const proxyPDF = async (req, res, next) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'PDF URL is required'
      });
    }

    // Validate URL
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid PDF URL'
      });
    }

    // Fetch the PDF content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
    }

    // Set appropriate headers
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    });

    // Stream the PDF content
    response.body.pipe(res);

    logger.info(`PDF proxied successfully: ${url}`);
  } catch (error) {
    logger.error('PDF proxy error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load PDF',
      error: error.message
    });
  }
};

/**
 * Get PDF info without downloading the full content
 */
const getPDFInfo = async (req, res, next) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'PDF URL is required'
      });
    }

    // Validate URL
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid PDF URL'
      });
    }

    // Make a HEAD request to get PDF info
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`PDF not accessible: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');
    const lastModified = response.headers.get('last-modified');

    res.json({
      success: true,
      data: {
        url,
        accessible: true,
        contentType,
        contentLength: contentLength ? parseInt(contentLength) : null,
        lastModified,
        size: contentLength ? `${(parseInt(contentLength) / 1024 / 1024).toFixed(2)} MB` : 'Unknown'
      }
    });

    logger.info(`PDF info retrieved: ${url}`);
  } catch (error) {
    logger.error('PDF info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get PDF info',
      error: error.message
    });
  }
};

module.exports = {
  proxyPDF,
  getPDFInfo
};
