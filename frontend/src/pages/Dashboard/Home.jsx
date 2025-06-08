import React from "react";
import StatsCard from "../../components/Dashboard/StatsCard";
// import { assets } from "../../assets/assets";
import OccupancyChart from "../../components/Dashboard/OccupancyChart";
import LeasesChart from "../../components/Dashboard/LeasesChart";
import LeasesExpirationList from "../../components/Dashboard/LeasesExpirationList";
import RentPaymentsTable from "../../components/Dashboard/RentPaymentsTable";
// import { mockDashboardStats } from "../../data/mockDashboardStats";
// import { mockOccupancyData } from "../../data/mockOccupancyData";
// import { mockLeasesEndingData } from "../../data/mockLeasesEndingData";
// import { mockPayments } from "../../data/mockPayments";
// import { mockExpirations } from "../../data/mockExpirations";

const Home = () => {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"></div>
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
