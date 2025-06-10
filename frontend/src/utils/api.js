// src/utils/api.js
// API utility for backend integration using axios
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper to get auth token from localStorage
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getTenants() {
  const res = await axios.get(`${API_BASE_URL}/tenants`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

export async function getProperties() {
  const res = await axios.get(`${API_BASE_URL}/properties`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

// Example: You may need to implement this endpoint in your backend
// export async function getMaintenanceRequests() {
//   const res = await axios.get(`${API_BASE_URL}/maintenance`, {
//     headers: getAuthHeaders(),
//   });
//   return res.data;
// }

// Add more API functions as needed

export async function login(email, password) {
  const res = await axios.post(`${API_BASE_URL}/login`, { email, password });
  return res.data; // { token }
}

//get dashboard stats
export async function getDashboardStats() {
  const res = await axios.get(`${API_BASE_URL}/dashboard/dashboard-stats`, {
    headers: getAuthHeaders(),
  });
  return res.data; // { totalProperties, totalTenants, occupiedProperties, vacantProperties }
}

// Automatically logout on 401 Unauthorized
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
//get 5 recent payments
export async function getRecentPayments() {
  const res = await axios.get(`${API_BASE_URL}/payments/recent`, {
    headers: getAuthHeaders(),
  });
  return res.data; // Array of recent payments
}

//get leases that will expire in 30 days
export async function getExpiringLeases() {
  const res = await axios.get(`${API_BASE_URL}/leases/expiring-soon`, {
    headers: getAuthHeaders(),
  });
  return res.data; // Array of expiring leases
}
// Logout helper
export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
