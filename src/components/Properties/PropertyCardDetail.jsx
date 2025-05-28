import { X } from "lucide-react";
import React from "react";
import { mockTenants } from "../../data/mockTenants";

const PropertyCardDetail = ({ property, onClose }) => {
  const tenant = property.tenantId
    ? mockTenants.find((t) => t.id === property.tenantId)
    : null;
  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 ">
          <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <img
            src={property.image || "https://via.placeholder.com/600x400"}
            alt={property.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Property Information
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Name
                  </span>
                  <p className="text-gray-900">{property.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Address
                  </span>
                  <p className="text-gray-900">{property.address}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Status
                  </span>
                  <div className="mt-1">
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-[#DBFCE7]">
                      {property.status}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Type
                  </span>
                  <p className="text-gray-900 capitalize">{property.type}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Tenant & Lease Information
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Current Tenant
                  </span>
                  <p className="text-gray-900">
                    {tenant ? tenant.name : "No tenant assigned"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Rent
                  </span>
                  <p className="text-gray-900">
                    ${property.rentAmount?.toLocaleString() || "-"}/month
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Lease Start
                  </span>
                  <p className="text-gray-900">
                    {property.leaseStart || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Lease End
                  </span>
                  <p className="text-gray-900">{property.leaseEnd || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6  flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardDetail;
