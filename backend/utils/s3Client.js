const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.AWS_S3_BUCKET;

/**
 * Upload file to S3
 * @param {Object} file - Multer file object
 * @param {String} folder - S3 folder path
 * @returns {Object} Upload result with URL and key
 */
const uploadFile = async (file, folder = 'uploads') => {
  try {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    const key = `${folder}/${fileName}`;

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
      Metadata: {
        originalName: file.originalname,
        uploadedAt: new Date().toISOString()
      }
    };

    const result = await s3.upload(uploadParams).promise();
    
    return {
      success: true,
      url: result.Location,
      key: key,
      bucket: BUCKET_NAME,
      fileName: fileName,
      originalName: file.originalname
    };
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error('Failed to upload file to S3');
  }
};

/**
 * Delete file from S3
 * @param {String} key - S3 object key
 * @returns {Object} Delete result
 */
const deleteFile = async (key) => {
  try {
    const deleteParams = {
      Bucket: BUCKET_NAME,
      Key: key
    };

    await s3.deleteObject(deleteParams).promise();
    
    return {
      success: true,
      message: 'File deleted successfully'
    };
  } catch (error) {
    console.error('S3 Delete Error:', error);
    throw new Error('Failed to delete file from S3');
  }
};

/**
 * Generate signed URL for private file access
 * @param {String} key - S3 object key
 * @param {Number} expiresIn - URL expiration time in seconds (default: 3600)
 * @returns {String} Signed URL
 */
const getSignedUrl = async (key, expiresIn = 3600) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Expires: expiresIn
    };

    const signedUrl = await s3.getSignedUrlPromise('getObject', params);
    return signedUrl;
  } catch (error) {
    console.error('S3 Signed URL Error:', error);
    throw new Error('Failed to generate signed URL');
  }
};

/**
 * Check if file exists in S3
 * @param {String} key - S3 object key
 * @returns {Boolean} True if file exists
 */
const fileExists = async (key) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key
    };

    await s3.headObject(params).promise();
    return true;
  } catch (error) {
    if (error.statusCode === 404) {
      return false;
    }
    throw error;
  }
};

/**
 * Get file metadata from S3
 * @param {String} key - S3 object key
 * @returns {Object} File metadata
 */
const getFileMetadata = async (key) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key
    };

    const result = await s3.headObject(params).promise();
    
    return {
      size: result.ContentLength,
      contentType: result.ContentType,
      lastModified: result.LastModified,
      metadata: result.Metadata
    };
  } catch (error) {
    console.error('S3 Metadata Error:', error);
    throw new Error('Failed to get file metadata');
  }
};

/**
 * List files in S3 folder
 * @param {String} prefix - S3 folder prefix
 * @param {Number} maxKeys - Maximum number of keys to return
 * @returns {Array} List of file objects
 */
const listFiles = async (prefix = '', maxKeys = 1000) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix,
      MaxKeys: maxKeys
    };

    const result = await s3.listObjectsV2(params).promise();
    
    return result.Contents.map(item => ({
      key: item.Key,
      size: item.Size,
      lastModified: item.LastModified,
      etag: item.ETag
    }));
  } catch (error) {
    console.error('S3 List Error:', error);
    throw new Error('Failed to list files');
  }
};

/**
 * Copy file within S3
 * @param {String} sourceKey - Source file key
 * @param {String} destinationKey - Destination file key
 * @returns {Object} Copy result
 */
const copyFile = async (sourceKey, destinationKey) => {
  try {
    const copyParams = {
      Bucket: BUCKET_NAME,
      CopySource: `${BUCKET_NAME}/${sourceKey}`,
      Key: destinationKey
    };

    await s3.copyObject(copyParams).promise();
    
    return {
      success: true,
      message: 'File copied successfully',
      newKey: destinationKey
    };
  } catch (error) {
    console.error('S3 Copy Error:', error);
    throw new Error('Failed to copy file');
  }
};

module.exports = {
  uploadFile,
  deleteFile,
  getSignedUrl,
  fileExists,
  getFileMetadata,
  listFiles,
  copyFile
};
