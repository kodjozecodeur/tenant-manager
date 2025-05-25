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
} from "lucide-react";
export const assets = {
  logo,
  background,
  google,
  sidebarItems: [
    { name: "Dashboard", icon: House, path: "/dashboard" },
    { name: "Properties", icon: Building2, path: "/properties" },
    { name: "Tenants", icon: Users, path: "/tenants" },
    { name: "Leases", icon: FileSearch, path: "/leases" },
    { name: "Maintenance", icon: Cog, path: "/maintenance" },
    { name: "Payments", icon: Wallet, path: "/payments" },
    { name: "Settings", icon: UserRoundCog, path: "/settings" },
  ],
};
