// src/utils/api.js
// Axios-based API utility for backend integration

import axios from "axios";

// Base URL for API requests (from env or fallback to localhost)
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Configure axios defaults for CORS with credentials
axios.defaults.withCredentials = true;

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export { API_BASE_URL, getAuthHeaders };

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
  const res = await api.get(`/tenants`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Fetch all properties
 * @returns {Promise<Array>} List of properties
 */
export async function getProperties() {
  const res = await api.get(`/properties`, {
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
  const res = await api.post(`/properties`, propertyData, {
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
  const res = await api.get(`/properties/${propertyId}`, {
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
  const res = await api.put(
    `/properties/${propertyId}`,
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
  const res = await api.delete(`/properties/${propertyId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * User login
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} { token }
 */
export async function login(email, password) {
  const res = await api.post(`/login`, { email, password });
  return res.data;
}

/**
 * Fetch dashboard statistics
 * @returns {Promise<Object>} { totalProperties, totalTenants, occupiedProperties, vacantProperties }
 */
export async function getDashboardStats() {
  const res = await api.get(`/dashboard/dashboard-stats`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

// Axios interceptor: Auto-logout on 401 Unauthorized
api.interceptors.response.use(
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
  const res = await api.get(`/payments/recent`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Fetch all leases
 * @returns {Promise<Array>} Array of all leases
 */
export async function getLeases() {
  const res = await api.get(`/leases`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Fetch a single lease by ID
 * @param {string} leaseId - The lease ID
 * @returns {Promise<Object>} Lease details
 */
export async function getLeaseById(leaseId) {
  const res = await api.get(`/leases/${leaseId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Create a new lease
 * @param {Object} leaseData - Lease details
 * @returns {Promise<Object>} Created lease
 */
export async function createLease(leaseData) {
  const res = await api.post(`/leases`, leaseData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Update an existing lease
 * @param {string} leaseId - The lease ID
 * @param {Object} leaseData - Updated lease details
 * @returns {Promise<Object>} Updated lease
 */
export async function updateLease(leaseId, leaseData) {
  const res = await api.put(`/leases/${leaseId}`, leaseData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Delete a lease
 * @param {string} leaseId - The lease ID
 * @returns {Promise<Object>} Success message
 */
export async function deleteLease(leaseId) {
  const res = await api.delete(`/leases/${leaseId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Fetch leases expiring within 30 days
 * @returns {Promise<Array>} Array of expiring leases
 */
export async function getExpiringLeases() {
  const res = await api.get(`/leases/expiring-soon`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Fetch all units
 * @returns {Promise<Array>} List of units
 */
export async function getUnits() {
  const res = await api.get(`/units`, {
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

/**
 * Get current user profile
 * @returns {Promise<Object>} User profile data
 */
export async function getUserProfile() {
  const res = await api.get(`/users/me`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Update current user profile
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} Updated user profile
 */
export async function updateUserProfile(userData) {
  const res = await api.put(`/users/me`, userData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Get user settings
 * @returns {Promise<Object>} User settings data
 */
export async function getUserSettings() {
  const res = await api.get(`/settings`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Update user settings
 * @param {Object} settingsData - Updated settings data
 * @returns {Promise<Object>} Updated settings
 */
export async function updateUserSettings(settingsData) {
  const res = await api.put(`/settings`, settingsData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Update user password
 * @param {Object} passwordData - Password change data
 * @returns {Promise<Object>} Success message
 */
export async function updatePassword(passwordData) {
  const res = await api.put(
    `/settings/password`,
    passwordData,
    {
      headers: getAuthHeaders(),
    }
  );
  return res.data;
}