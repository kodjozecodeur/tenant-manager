import { Calendar, DollarSign, Mail, Phone } from "lucide-react";
import React from "react";

const TenantList = ({ tenants, loading, error, onView, onEdit, onDelete }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!tenants || tenants.length === 0) {
    return <div>No tenants found</div>;
  }
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Name
          </th>
          <th scope="col" class="px-6 py-3">
            Email
          </th>
          <th scope="col" class="px-6 py-3">
            Phone
          </th>
          <th scope="col" class="px-6 py-3">
            Status
          </th>
          <th scope="col" class="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {tenants.map((tenant) => (
          <tr
            key={tenant._id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <td className="p-2">{tenant.name}</td>
            <td className="p-2">{tenant.contact}</td>
            <td className="p-2">{tenant.phone}</td>
            <td className="p-2">
              {tenant.status ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-gray-500">Inactive</span>
              )}
            </td>
            <td className="p-2 space-x-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => onView(tenant)}
              >
                View
              </button>
              <button
                className="text-yellow-600 hover:underline"
                onClick={() => onEdit(tenant)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => onDelete(tenant._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TenantList;
