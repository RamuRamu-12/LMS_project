const { User } = require('../models');
const { generateTokenPair, verifyToken } = require('../utils/jwt');
const logger = require('../utils/logger');
const { AppError } = require('../middleware/errorHandler');

/**
 * Traditional username/password login
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      throw new AppError('Username and password are required', 400);
    }
    
    // Check for hardcoded admin credentials
    if (username === 'admin' && password === 'admin123') {
      // Create or find admin user
      let user = await User.findOne({ where: { email: 'admin@aishani.com' } });
      
      if (!user) {
        user = await User.create({
          name: 'Admin User',
          email: 'admin@aishani.com',
          role: 'admin',
          password: 'admin123', // Will be hashed by the model hook
          is_active: true,
          last_login: new Date()
        });
        logger.info('Admin user created');
      } else {
        // Ensure admin user is always active when logging in
        await user.update({ 
          is_active: true,
          last_login: new Date() 
        });
        logger.info('Admin user status updated to active');
      }
      
      // Generate tokens
      const tokens = generateTokenPair(user);
      
      logger.info(`Admin user ${user.email} logged in via traditional auth`);
      
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: user.getPublicProfile(),
          tokens
        }
      });
    } else {
      // Check for student login with email/password
      const user = await User.findOne({ where: { email: username } });
      
      if (!user) {
        throw new AppError('Invalid username or password', 401);
      }
      
      // Check if user has a password set
      if (!user.password) {
        throw new AppError('Password not set for this account. Please use Google login or contact admin.', 401);
      }
      
      // Verify password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new AppError('Invalid username or password', 401);
      }
      
      // Check if user is active
      if (!user.is_active) {
        throw new AppError('Account is deactivated', 401);
      }
      
      // Update last login
      await user.update({ last_login: new Date() });
      
      // Generate tokens
      const tokens = generateTokenPair(user);
      
      logger.info(`User ${user.email} logged in via traditional auth`);
      
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: user.getPublicProfile(),
          tokens
        }
      });
    }
  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};

/**
 * Google OAuth callback handler
 */
const googleCallback = async (req, res, next) => {
  try {
    const { user, isNewUser } = req.user;
    
    // Generate tokens
    const tokens = generateTokenPair(user);
    
    // Update last login and ensure user is active
    await user.update({ 
      last_login: new Date(),
      is_active: true
    });
    
    logger.info(`User ${user.email} ${isNewUser ? 'registered' : 'logged in'} via Google OAuth`);
    
    // Redirect to frontend with tokens
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${tokens.accessToken}&refresh=${tokens.refreshToken}&isNew=${isNewUser}`;
    
    res.redirect(redirectUrl);
  } catch (error) {
    logger.error('Google OAuth callback error:', error);
    next(error);
  }
};

/**
 * Refresh access token
 */
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      throw new AppError('Refresh token required', 400);
    }
    
    // Verify refresh token
    const decoded = verifyToken(refreshToken);
    const user = await User.findByPk(decoded.id);
    
    if (!user || !user.is_active) {
      throw new AppError('Invalid refresh token', 401);
    }
    
    // Generate new tokens
    const tokens = generateTokenPair(user);
    
    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: tokens
    });
  } catch (error) {
    logger.error('Token refresh error:', error);
    next(error);
  }
};

/**
 * Logout user
 */
const logout = async (req, res, next) => {
  try {
    // In a more sophisticated implementation, you might:
    // 1. Add the token to a blacklist
    // 2. Store the blacklist in Redis
    // 3. Check blacklist on each request
    
    logger.info(`User ${req.user.email} logged out`);
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    next(error);
  }
};

/**
 * Get current user profile
 */
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['google_id'] }
    });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    res.json({
      success: true,
      message: 'User profile retrieved successfully',
      data: {
        user: user.getPublicProfile()
      }
    });
  } catch (error) {
    logger.error('Get current user error:', error);
    next(error);
  }
};

/**
 * Update user profile
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, email, avatar, preferences } = req.body;
    const userId = req.user.id;
    
    // Check if email is being changed and if it's already taken
    if (email && email !== req.user.email) {
      const existingUser = await User.findByEmail(email);
      if (existingUser && existingUser.id !== userId) {
        throw new AppError('Email already in use', 400);
      }
    }
    
    // Update user
    const updatedUser = await User.findByPk(userId);
    await updatedUser.update({
      name: name || updatedUser.name,
      email: email || updatedUser.email,
      avatar: avatar || updatedUser.avatar,
      preferences: preferences || updatedUser.preferences
    });
    
    logger.info(`User ${updatedUser.email} updated profile`);
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: updatedUser.getPublicProfile()
      }
    });
  } catch (error) {
    logger.error('Update profile error:', error);
    next(error);
  }
};

/**
 * Get authentication status
 */
const getAuthStatus = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.json({
        success: true,
        data: {
          isAuthenticated: false,
          user: null
        }
      });
    }
    
    res.json({
      success: true,
      data: {
        isAuthenticated: true,
        user: req.user.getPublicProfile()
      }
    });
  } catch (error) {
    logger.error('Get auth status error:', error);
    next(error);
  }
};

module.exports = {
  login,
  googleCallback,
  refreshToken,
  logout,
  getCurrentUser,
  updateProfile,
  getAuthStatus
};
