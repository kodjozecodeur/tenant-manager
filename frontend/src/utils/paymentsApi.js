import axios from "axios";
import { API_BASE_URL, getAuthHeaders } from "./api";

export async function getPayments() {
  const res = await axios.get(`${API_BASE_URL}/payments`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

export async function addPayment(paymentData) {
  const res = await axios.post(`${API_BASE_URL}/payments`, paymentData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

export async function updatePayment(id, updateData) {
  const res = await axios.put(`${API_BASE_URL}/payments/${id}`, updateData, {
    headers: getAuthHeaders(),
  });
  return res.data;
}

export async function deletePayment(id) {
  const res = await axios.delete(`${API_BASE_URL}/payments/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
}
