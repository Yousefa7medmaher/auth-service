import User from '../models/User.js';
import { sendResponse } from '../utils/response.js';

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return sendResponse(res, 404, { message: 'User not found' });
    }
    sendResponse(res, 200, user);
  } catch (error) {
    sendResponse(res, 500, { message: 'Server error', error: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.phone) updates.phone = req.body.phone;
    // Optionally allow email update, but usually not recommended
    // if (req.body.email) updates.email = req.body.email;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true, select: '-password' }
    );
    if (!user) {
      return sendResponse(res, 404, { message: 'User not found' });
    }
    sendResponse(res, 200, user);
  } catch (error) {
    sendResponse(res, 500, { message: 'Server error', error: error.message });
  }
};

export { getProfile, updateProfile }; 