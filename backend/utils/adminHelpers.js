/**
 * Helper function to check if a user is an admin owner
 * @param {Object} user - The user object to check
 * @returns {boolean} - True if the user is an admin owner, false otherwise
 */
export function isOwnerAdmin(user) {
  // Check if user has isOwner flag set to true
  if (user?.isOwner === true) {
    return true;
  }
  
  // Check if user has admin role (case-insensitive)
  if (user?.role && user.role.toLowerCase() === 'admin') {
    return true;
  }
  
  // Check if user's email matches the OWNER_EMAIL environment variable
  const ownerEmail = process.env.OWNER_EMAIL?.toLowerCase();
  if (ownerEmail && user?.email?.toLowerCase() === ownerEmail) {
    return true;
  }
  
  return false;
}

export default isOwnerAdmin;