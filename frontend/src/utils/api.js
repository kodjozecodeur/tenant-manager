// src/utils/api.js
// Axios-based API utility for backend integration

import axios from "axios";

// Base URL for API requests (from env or fallback to localhost)
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Helper: Get Authorization headers if token exists in localStorage
 * @returns {Object} Headers object with Authorization if token is present
 */
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Fetch all tenants
 * @returns {Promise<Array>} List of tenants
 */
export async function getTenants() {
  const res = await axios.get(`${API_BASE_URL}/tenants`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Fetch all properties
 * @returns {Promise<Array>} List of properties
 */
export async function getProperties() {
  const res = await axios.get(`${API_BASE_URL}/properties`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * create a new property
 * @param {Object} propertyData - Property details
 * @returns {Promise<Object>} Created property
 */
export async function createProperty(propertyData) {
  const res = await axios.post(`${API_BASE_URL}/properties`, propertyData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * get a single property by ID
 * @param {string} propertyId - ID of the property
 * @returns {Promise<Object>} Property details
 */
export async function getPropertyById(propertyId) {
  const res = await axios.get(`${API_BASE_URL}/properties/${propertyId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Update an existing property
 * @param {string} propertyId - ID of the property to update
 * @param {Object} propertyData - Updated property details
 * @returns {Promise<Object>} Updated property

 */
export async function updateProperty(propertyId, propertyData) {
  const res = await axios.put(
    `${API_BASE_URL}/properties/${propertyId}`,
    propertyData,
    {
      headers: getAuthHeaders(),
    }
  );
  return res.data;
}

/**
 * Delete a property by ID
 * @param {string} propertyId - ID of the property to delete
 * @returns {Promise<Object>} Response confirming deletion
 */
export async function deleteProperty(propertyId) {
  const res = await axios.delete(`${API_BASE_URL}/properties/${propertyId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

// Example for future expansion:
// export async function getMaintenanceRequests() {
//   const res = await axios.get(`${API_BASE_URL}/maintenance`, {
//     headers: getAuthHeaders(),
//   });
//   return res.data;
// }

/**
 * User login
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} { token }
 */
export async function login(email, password) {
  const res = await axios.post(`${API_BASE_URL}/login`, { email, password });
  return res.data;
}

/**
 * Fetch dashboard statistics
 * @returns {Promise<Object>} { totalProperties, totalTenants, occupiedProperties, vacantProperties }
 */
export async function getDashboardStats() {
  const res = await axios.get(`${API_BASE_URL}/dashboard/dashboard-stats`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

// Axios interceptor: Auto-logout on 401 Unauthorized
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * Fetch 5 most recent payments
 * @returns {Promise<Array>} Array of recent payments
 */
export async function getRecentPayments() {
  const res = await axios.get(`${API_BASE_URL}/payments/recent`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Fetch leases expiring within 30 days
 * @returns {Promise<Array>} Array of expiring leases
 */
export async function getExpiringLeases() {
  const res = await axios.get(`${API_BASE_URL}/leases/expiring-soon`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Logout helper: Remove token and redirect to login
 */
export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
