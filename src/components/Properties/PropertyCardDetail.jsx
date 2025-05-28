import { X } from "lucide-react";
import React from "react";

const PropertyCardDetail = ({ property, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 ">
          <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
          <button
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
                  <label className="text-sm font-medium text-gray-500">
                    Name
                  </label>
                  <p className="text-gray-900">{property.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Address
                  </label>
                  <p className="text-gray-900">{property.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <div className="mt-1">
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-[#DBFCE7]">
                      {property.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Type
                  </label>
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
                  <label className="text-sm font-medium text-gray-500">
                    Current Tenant
                  </label>
                  <p className="text-gray-900">
                    {property.tenant || "No tenant assigned"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Rent
                  </label>
                  <p className="text-gray-900">{property.rent}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Lease Start
                  </label>
                  <p className="text-gray-900">
                    {property.leaseStart || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Lease End
                  </label>
                  <p className="text-gray-900">{property.leaseEnd || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6  flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Edit Property</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardDetail;
