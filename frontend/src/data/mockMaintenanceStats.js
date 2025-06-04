// src/data/mockMaintenanceStats.js
// Mock stats for maintenance dashboard
import { FileText, Clock, Settings, AlertCircle } from "lucide-react";

export const mockMaintenanceStats = [
  {
    title: "Total Requests",
    value: "5",
    icon: FileText,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Open",
    value: "2",
    icon: Clock,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    title: "In Progress",
    value: "2",
    icon: Settings,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "High Priority",
    value: "2",
    icon: AlertCircle,
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
  },
];
