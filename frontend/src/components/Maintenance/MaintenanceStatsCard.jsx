import React from "react";

const colorClasses = {
  blue: { bg: "bg-blue-100", text: "text-blue-800" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-800" },
  green: { bg: "bg-green-100", text: "text-green-800" },
  gray: { bg: "bg-gray-100", text: "text-gray-800" },
};

const MaintenanceStatsCard = ({ title, value, color = "gray" }) => {
  const { bg, text } = colorClasses[color] || colorClasses.gray;
  return (
    <div
      className={`p-4 ${bg} rounded shadow flex justify-between items-center`}
    >
      <div>
        <p className={`text-sm font-medium uppercase ${text}`}>{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default MaintenanceStatsCard;
