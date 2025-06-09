import React from "react";

const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-2xl w-full max-w-sm">
      <div className="flex items-start space-x-4">
        {/* Icon Container */}
        <div className="flex-shrink-0">
          <div
            className={`w-12 h-12 ${color} rounded-full flex items-center justify-center`}
          >
            {Icon && <Icon className="w-6 h-6 text-white" />}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
