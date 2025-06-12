import { X } from "lucide-react";
import React from "react";

const PropertyCardDetail = ({ property, onClose }) => {
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
            src={
              (property.photos &&
                property.photos.length > 0 &&
                property.photos[0]) ||
              property.image ||
              "https://via.placeholder.com/600x400"
            }
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
                    Description
                  </span>
                  <p className="text-gray-900">{property.description || "-"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Type
                  </span>
                  <p className="text-gray-900 capitalize">{property.type}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Created By
                  </span>
                  <p className="text-gray-900">
                    {property.createdBy?.name || "-"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Photos</h3>
              <div className="flex flex-wrap gap-2">
                {property.photos && property.photos.length > 0 ? (
                  property.photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`Property Photo ${idx + 1}`}
                      className="w-24 h-24 object-cover rounded border"
                    />
                  ))
                ) : (
                  <span className="text-gray-500">No photos available</span>
                )}
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
