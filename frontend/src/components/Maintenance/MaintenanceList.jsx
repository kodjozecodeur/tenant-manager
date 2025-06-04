import React from "react";
import { MoreHorizontal } from "lucide-react";

const MaintenanceList = ({ requests }) => {
  const getPriorityBadge = (priority) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (priority) {
      case "High":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "Medium":
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case "Low":
        return `${baseClasses} bg-gray-100 text-gray-600`;
      default:
        return baseClasses;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Open":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "In Progress":
        return `${baseClasses} bg-black text-white`;
      case "Completed":
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return baseClasses;
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Request ID
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Property
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Reported
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Technician
            </th>
            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-50">
              <td className="py-4 px-6 text-sm font-medium text-gray-900">
                {request.id}
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
                {request.title}
              </td>
              <td className="py-4 px-6 text-sm text-gray-600">
                {request.property}
              </td>
              <td className="py-4 px-6 text-sm text-gray-600">
                {request.dateReported}
              </td>
              <td className="py-4 px-6">
                <span className={getPriorityBadge(request.priority)}>
                  {request.priority}
                </span>
              </td>
              <td className="py-4 px-6">
                <span className={getStatusBadge(request.status)}>
                  {request.status}
                </span>
              </td>
              <td className="py-4 px-6 text-sm text-gray-600">
                {request.technician}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 hover:bg-gray-100 rounded"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceList;
