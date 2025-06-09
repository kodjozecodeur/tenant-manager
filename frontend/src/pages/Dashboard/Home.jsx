import React, { useEffect, useState } from "react";
import StatsCard from "../../components/Dashboard/StatsCard";
import OccupancyChart from "../../components/Dashboard/OccupancyChart";
import LeasesChart from "../../components/Dashboard/LeasesChart";
import LeasesExpirationList from "../../components/Dashboard/LeasesExpirationList";
import RentPaymentsTable from "../../components/Dashboard/RentPaymentsTable";
import { getDashboardStats } from "../../utils/api";
import { Building, Users, CheckCircle, XCircle } from "lucide-react";

const Home = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setStats).catch(console.error);
  }, []);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats && (
          <>
            <StatsCard
              title="Total Properties"
              value={stats.totalProperties}
              icon={Building}
              color="bg-blue-500"
            />
            <StatsCard
              title="Total Tenants"
              value={stats.totalTenants}
              icon={Users}
              color="bg-green-500"
            />
            <StatsCard
              title="Occupied Properties"
              value={stats.occupiedProperties}
              icon={CheckCircle}
              color="bg-yellow-500"
            />
            <StatsCard
              title="Vacant Properties"
              value={stats.vacantProperties}
              icon={XCircle}
              color="bg-red-500"
            />
          </>
        )}
      </div>
      {/* stats cards */}

      {/* occupancy chart and lease chart */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <OccupancyChart />
        <LeasesChart />
      </div>
      {/* leases expiration list and rent payments table */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <RentPaymentsTable />
        <LeasesExpirationList />
      </div>
    </div>
  );
};

export default Home;
