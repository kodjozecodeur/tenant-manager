// src/utils/api.js
// Simple API utility for future backend integration. For now, returns mock data with simulated delay and error handling.

import { mockTenants } from "../data/mockTenants";
import { mockProperties } from "../data/mockProperties";
import { mockPayments } from "../data/mockPayments";
import { mockMaintenanceRequests } from "../data/mockMaintenanceRequests";

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTenants() {
  await delay(500);
  return mockTenants;
}

export async function getProperties() {
  await delay(500);
  return mockProperties;
}

export async function getPayments() {
  await delay(500);
  return mockPayments;
}

export async function getMaintenanceRequests() {
  await delay(500);
  return mockMaintenanceRequests;
}

// Example for error simulation
export async function getTenantsWithError() {
  await delay(500);
  throw new Error("Failed to fetch tenants");
}
