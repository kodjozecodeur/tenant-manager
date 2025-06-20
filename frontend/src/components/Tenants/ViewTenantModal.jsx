import React from "react";

const ViewTenantModal = ({ tenant, onClose }) => {
  if (!tenant) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-50 shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-2">Tenant Details</h2>
        <p className="text-gray-600 mb-4">Basic information</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Name</label>
            <p className="text-gray-900 font-medium">{tenant.name || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <p className="text-gray-900 font-medium">{tenant.email || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Phone Number</label>
            <p className="text-gray-900 font-medium">
              {tenant.phoneNumber || "N/A"}
            </p>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Status</label>
            <p
              className={`font-medium ${
                tenant.status ? "text-green-600" : "text-gray-500"
              }`}
            >
              {tenant.status ? "Active" : "Inactive"}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTenantModal;
