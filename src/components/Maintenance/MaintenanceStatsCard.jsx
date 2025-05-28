import React from "react";

const MaintenanceStatsCard = ({ title, value, icon: Icon, stat }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-500">{title}</div>
          <div className="text-lg font-semibold text-gray-900">{value}</div>
        </div>
        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
          <Icon className={`w-6 h-6 ${stat.iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default MaintenanceStatsCard;
