import React from "react";
import MaintenanceStatsCard from "../../components/Maintenance/MaintenanceStatsCard";
import MaintenanceList from "../../components/Maintenance/MaintenanceList";
import { mockMaintenanceStats } from "../../data/mockMaintenanceStats";
import { getMaintenanceRequests } from "../../utils/api";

const Maintenance = () => {
  const [requests, setRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    getMaintenanceRequests()
      .then((data) => {
        setRequests(data);
        setError(null);
      })
      .catch((err) => setError(err.message || "Failed to load requests"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Maintenance Requests
      </h1>
      <div>
        <div className="grid gap-8 md:grid-cols-4 mb-6">
          {mockMaintenanceStats.map((stat, index) => (
            <MaintenanceStatsCard
              key={index}
              icon={stat.icon}
              stat={stat}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </div>
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading requests...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : requests.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No maintenance requests found.
          </div>
        ) : (
          <MaintenanceList requests={requests} />
        )}
      </div>
    </div>
  );
};

export default Maintenance;
