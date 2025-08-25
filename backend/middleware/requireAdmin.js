import User from "../models/user.js";
import { isOwnerAdmin } from "../utils/adminHelpers.js";

/**
 * Middleware to check if user is admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export async function requireAdmin(req, res, next) {
  try {
    // Add logging to identify why access is denied
    console.log("requireAdmin check - req.user:", req.user);
    
    // Get the full user object from database to check role
    const user = await User.findById(req.user._id);
    
    if (!user) {
      console.log("requireAdmin: User not found");
      return res.status(401).json({ message: "User not found" });
    }
    
    // Check if user is admin using the helper function
    const isAdmin = isOwnerAdmin(user);
    console.log("requireAdmin: isAdmin =", isAdmin, "user.role =", user.role, "user.email =", user.email);
    
    if (isAdmin) {
      // Attach full user object to request for downstream use
      req.user = user;
      return next();
    }
    
    return res.status(403).json({
      message: "Access denied. Admin only.",
      userRole: user.role,
      userId: user._id,
      userEmail: user.email
    });
  } catch (error) {
    console.error("requireAdmin error:", error);
    return res.status(500).json({ message: "Server error during admin check" });
  }
}

export default requireAdmin;