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
};

export const sidebarItems = [
  { name: "Dashboard", icon: House, active: true },
  { name: "Properties", icon: Building2, active: false },
  { name: "Tenants", icon: Users, active: false },
  { name: "Leases", icon: FileSearch, active: false },
  { name: "Maintenance", icon: Cog, active: false },
  { name: "Payments", icon: Wallet, active: false },
  { name: "Settings", icon: UserRoundCog, active: false },
];
