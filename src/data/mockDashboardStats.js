// src/data/mockDashboardStats.js
// Mock dashboard stats for the dashboard summary cards
import {
  Building2,
  Users,
  Home,
  AlertCircle,
  DollarSign,
  Calendar,
} from "lucide-react";

export const mockDashboardStats = [
  {
    title: "Total Properties",
    value: "24",
    icon: Building2,
  },
  {
    title: "Total Tenants",
    value: "89",
    icon: Users,
  },
  {
    title: "Occupied Properties",
    value: "21",
    icon: Home,
  },
  {
    title: "Vacant Properties",
    value: "3",
    icon: AlertCircle,
  },
  {
    title: "Rent Collected",
    value: "$45,230",
    icon: DollarSign,
  },
  {
    title: "Leases Ending Soon",
    value: "7",
    icon: Calendar,
  },
];
