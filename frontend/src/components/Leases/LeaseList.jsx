import React from "react";
// import { assets } from "../../assets/assets";
import { Calendar, DollarSign, Edit, Eye, User } from "lucide-react";
import { mockTenants } from "../../data/mockTenants";
import AddLeaseCard from "./AddLeaseCard";

const LeaseList = () => {
  //get status badge color based on lease status
  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    if (status === "active") {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    if (status === "ending-soon") {
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
    return baseClasses;
  };

  const [showAddLease, setShowAddLease] = React.useState(false);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setShowAddLease(true)}
        >
          + New Lease
        </button>
      </div>
      {showAddLease && (
        <AddLeaseCard
          onClose={() => setShowAddLease(false)}
          onSuccess={() => setShowAddLease(false)}
        />
      )}
      {/* list of leases */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
          <div>Tenant & Property</div>
          <div>Lease Period</div>
          <div>Monthly Rent</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {/* Table Rows */}
        {mockTenants.map((tenant) => (
          <div
            key={tenant.id}
            className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
          >
            {/* Tenant & Property */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{tenant.name}</div>
                <div className="text-sm text-gray-500">
                  {tenant.propertyName}
                </div>
                <div className="text-xs text-gray-400">
                  {/* {tenant.propertyType} */}
                </div>
              </div>
            </div>

            {/* Lease Period */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-sm text-gray-900">{tenant.moveInDate}</div>
                <div className="text-sm text-gray-500">
                  to {tenant.leaseEndDate}
                </div>
              </div>
            </div>

            {/* Monthly Rent */}
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">
                  ${tenant.rentAmount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <span className={getStatusBadge(tenant.rentStatus)}>
                {tenant.rentStatus}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
              <button
                type="button"
                className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaseList;
