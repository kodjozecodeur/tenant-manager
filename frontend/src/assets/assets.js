import logo from "./logo-site.svg";
import background from "./background.jpg";
import google from "./google.svg";
import house_1 from "./house_1.jpg";
import {
  House,
  Building2,
  Users,
  FileSearch,
  Cog,
  Wallet,
  UserRoundCog,
  HouseIcon,
} from "lucide-react";

export const assets = {
  logo,
  background,
  google,
  house_1,
  sidebarItems: [
    { name: "Dashboard", icon: House, path: "" },
    { name: "Properties", icon: Building2, path: "properties" },
    { name: "Units", icon: HouseIcon, path: "units" },
    { name: "Tenants", icon: Users, path: "tenants" },
    { name: "Leases", icon: FileSearch, path: "leases" },
    { name: "Maintenance", icon: Cog, path: "maintenance" },
    { name: "Payments", icon: Wallet, path: "payments" },
    { name: "Settings", icon: UserRoundCog, path: "settings" },
  ],
};
