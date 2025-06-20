import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
export async function createTenant(tenantData) {
  const res = await axios.post(`${API_BASE_URL}/tenants`, tenantData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
export async function getTenantById(tenantId) {
  const res = await axios.get(`${API_BASE_URL}/tenants/${tenantId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
export async function updateTenant(tenantId, tenantData) {
  const res = await axios.put(
    `${API_BASE_URL}/tenants/${tenantId}`,
    tenantData,
    {
      headers: getAuthHeaders(),
    }
  );
  return res.data;
}
export async function deleteTenant(tenantId) {
  const res = await axios.delete(`${API_BASE_URL}/tenants/${tenantId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
export async function getTenantUnits(tenantId) {
  const res = await axios.get(`${API_BASE_URL}/tenants/${tenantId}/units`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
