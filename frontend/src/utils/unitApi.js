// src/utils/unitApi.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getUnits() {
  const res = await axios.get(`${API_BASE_URL}/units`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

export async function createUnit(unitData) {
  const res = await axios.post(`${API_BASE_URL}/units`, unitData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

export async function getUnitById(unitId) {
  const res = await axios.get(`${API_BASE_URL}/units/${unitId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

export async function updateUnit(unitId, unitData) {
  const res = await axios.put(`${API_BASE_URL}/units/${unitId}`, unitData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

export async function deleteUnit(unitId) {
  const res = await axios.delete(`${API_BASE_URL}/units/${unitId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
