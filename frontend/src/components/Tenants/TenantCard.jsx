import { Calendar, DollarSign, Mail, Phone } from "lucide-react";
import React from "react";
import { mockProperties } from "../../data/mockProperties";

const TenantCard = ({ tenant, onClick }) => {
  if (!tenant) return null;
  const property = tenant.propertyId
    ? mockProperties.find((p) => p.id === tenant.propertyId)
    : null;
  return (
    <div className="w-full  bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header with name and status */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {tenant?.name || "Unknown"}
        </h2>
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            tenant.rentStatus === "active"
              ? "bg-green-100 text-green-800"
              : tenant.rentStatus === "ending_soon"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {tenant.rentStatus || "Unknown"}
        </span>
      </div>

      {/* Property info */}
      <p className="text-gray-600 mb-6">
        {property ? property.name : "Unknown"}
      </p>

      {/* Contact and details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-3 text-gray-400" />
          <span>{tenant.email || "Unknown"}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-3 text-gray-400" />
          <span>{tenant.phone || "Unknown"}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-3 text-gray-400" />
          <span>Move-In: {tenant.moveInDate || "Unknown"}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <DollarSign className="w-4 h-4 mr-3 text-gray-400" />
          <span>${tenant.rentAmount?.toLocaleString() || "Unknown"}/month</span>
        </div>
      </div>

      {/* View Details button */}
      <button
        type="button"
        onClick={() => onClick(tenant)}
        className="w-full cursor-pointer py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
      >
        View Details
      </button>
    </div>
  );
};

export default TenantCard;
