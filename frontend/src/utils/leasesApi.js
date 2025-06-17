import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
export async function getLeases() {
  const res = await axios.get(`${API_BASE_URL}/leases`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
export async function createLease(leaseData) {
  const res = await axios.post(`${API_BASE_URL}/leases`, leaseData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
export async function getLeaseById(leaseId) {
  const res = await axios.get(`${API_BASE_URL}/leases/${leaseId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
export async function updateLease(leaseId, leaseData) {
  const res = await axios.put(`${API_BASE_URL}/leases/${leaseId}`, leaseData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
export async function deleteLease(leaseId) {
  const res = await axios.delete(`${API_BASE_URL}/leases/${leaseId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
export async function getLeaseUnits(leaseId) {
  const res = await axios.get(`${API_BASE_URL}/leases/${leaseId}/units`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
