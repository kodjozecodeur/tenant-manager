import React from "react";

const colorMap = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
  total: "bg-gray-100 text-gray-700",
};

const PaymentStatsCard = ({ title, value, type = "total" }) => (
  <div
    className={`rounded-lg p-4 shadow border ${
      colorMap[type] || colorMap.total
    } flex flex-col items-center`}
  >
    <div className="text-lg font-semibold mb-1">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export default PaymentStatsCard;
