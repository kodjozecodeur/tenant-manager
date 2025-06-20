import React from "react";
import { X, User, Home, Calendar, DollarSign, FileText } from "lucide-react";

const ViewLeaseModal = ({ lease, onClose }) => {
  if (!lease) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "active":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "terminated":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Lease Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tenant Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Tenant Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">
                  {lease.tenant?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  {lease.tenant?.email || "No email provided"}
                </p>
              </div>
            </div>

            {/* Unit Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Home className="w-5 h-5 mr-2 text-blue-600" />
                Unit Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">
                  Unit {lease.unit?.number || lease.unit?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  {lease.unit?.name && lease.unit?.name !== lease.unit?.number
                    ? lease.unit.name
                    : "No additional unit info"}
                </p>
              </div>
            </div>
          </div>

          {/* Lease Terms */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Lease Terms
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Start Date */}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(lease.startDate)}
                    </p>
                  </div>
                </div>

                {/* End Date */}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">End Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(lease.endDate)}
                    </p>
                  </div>
                </div>

                {/* Rent Amount */}
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Monthly Rent</p>
                    <p className="font-medium text-gray-900">
                      ${lease.rentAmount?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={getStatusBadge(lease.status)}>
                  {lease.status || "Unknown"}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">
              Additional Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Created:</span>
                  <span className="ml-2 text-gray-900">
                    {lease.createdAt ? formatDate(lease.createdAt) : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="ml-2 text-gray-900">
                    {lease.updatedAt ? formatDate(lease.updatedAt) : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewLeaseModal;
