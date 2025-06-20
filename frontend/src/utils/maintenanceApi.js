// src/utils/maintenanceApi.js
import axios from "axios";
import { API_BASE_URL, getAuthHeaders } from "./api";

/**
 * Fetch all maintenance requests
 * @returns {Promise<Array>} List of maintenance requests
 */
export async function getRequests() {
  const res = await axios.get(`${API_BASE_URL}/maintenance`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Create a new maintenance request
 * @param {Object} requestData
 * @returns {Promise<Object>} Created maintenance request
 */
export async function addRequest(requestData) {
  const res = await axios.post(`${API_BASE_URL}/maintenance`, requestData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Update a maintenance request
 * @param {string} id
 * @param {Object} updateData
 * @returns {Promise<Object>} Updated request
 */
export async function updateRequest(id, updateData) {
  const res = await axios.put(`${API_BASE_URL}/maintenance/${id}`, updateData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

/**
 * Delete a maintenance request
 * @param {string} id
 * @returns {Promise<Object>} Deletion response
 */
export async function deleteRequest(id) {
  const res = await axios.delete(`${API_BASE_URL}/maintenance/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
