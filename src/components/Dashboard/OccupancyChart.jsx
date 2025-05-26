import React from "react";
import { assets } from "../../assets/assets";
import {
  Cell,
  Legend,
  Pie,
  ResponsiveContainer,
  Tooltip,
  PieChart,
} from "recharts";

const OccupancyChart = () => {
  return (
    <div className="border border-gray-200 bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        Property Occupancy
      </h2>
      <p className="text-sm text-gray-500 mb-4">Current occupancy status</p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={250} height={250}>
          <Pie
            data={assets.occupancyData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {assets.occupancyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}`, name]}
            contentStyle={{ fontSize: "14px" }}
          />
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value, entry) => `${value} (${entry.payload.value})`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OccupancyChart;
