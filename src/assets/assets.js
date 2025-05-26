import logo from "./logo-site.svg";
import background from "./background.jpg";
import google from "./google.svg";
import {
  House,
  Building2,
  Users,
  FileSearch,
  Cog,
  Wallet,
  UserRoundCog,
  Home,
  AlertCircle,
  DollarSign,
  Calendar,
} from "lucide-react";
export const assets = {
  logo,
  background,
  google,
  sidebarItems: [
    { name: "Dashboard", icon: House, path: "" },
    { name: "Properties", icon: Building2, path: "properties" },
    { name: "Tenants", icon: Users, path: "tenants" },
    { name: "Leases", icon: FileSearch, path: "leases" },
    { name: "Maintenance", icon: Cog, path: "maintenance" },
    { name: "Payments", icon: Wallet, path: "payments" },
    { name: "Settings", icon: UserRoundCog, path: "settings" },
  ],
  dashboardStats: [
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
  ],
  occupancyData: [
    { name: "Occupied", value: 21, color: "#10b981" },
    { name: "Vacant", value: 3, color: "#ef4444" },
  ],
  leasesEndingData: [
    { month: "Jan", leases: 4 },
    { month: "Feb", leases: 7 },
    { month: "Mar", leases: 3 },
  ],
  recentPayments: [
    {
      tenant: "John Smith",
      amount: "$1,200",
      date: "2024-01-15",
      status: "Paid",
    },
    {
      tenant: "Sarah Johnson",
      amount: "$950",
      date: "2024-01-14",
      status: "Paid",
    },
    {
      tenant: "Mike Davis",
      amount: "$1,100",
      date: "2024-01-13",
      status: "Pending",
    },
    {
      tenant: "Emily Brown",
      amount: "$1,350",
      date: "2024-01-12",
      status: "Paid",
    },
    {
      tenant: "David Wilson",
      amount: "$800",
      date: "2024-01-11",
      status: "Overdue",
    },
  ],
};
