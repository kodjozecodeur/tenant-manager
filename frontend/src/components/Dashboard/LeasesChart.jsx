import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const LeasesChart = ({ data }) => {
  return (
    <div className="border border-gray-200 bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        Leases Expiration
      </h2>
      <p className="text-sm text-gray-500 mb-4">Next 6 months</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Expiring Leases" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeasesChart;
