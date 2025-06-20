import React from "react";

const statusBadge = (status) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Failed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const PaymentsTable = ({ payments, onView, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 bg-white rounded-lg">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
            Tenant
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
            Unit
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
            Lease ID
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
            Amount
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
            Date
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
            Method
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
            Status
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {payments.map((p) => (
          <tr key={p._id} className="hover:bg-gray-50">
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
              {p.tenant?.name}
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
              {p.unit?.unitName}
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
              {p.leaseId}
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
              ${p.amount}
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
              {p.date}
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
              {p.method}
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm">
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusBadge(
                  p.status
                )}`}
              >
                {p.status}
              </span>
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm">
              <div className="flex space-x-2">
                <button
                  onClick={() => onView(p)}
                  className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(p)}
                  className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
        {payments.length === 0 && (
          <tr>
            <td colSpan="8" className="px-4 py-2 text-center text-gray-500">
              No payments found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default PaymentsTable;
