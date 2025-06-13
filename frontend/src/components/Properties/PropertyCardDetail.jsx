import React from "react";
import { X, Pencil, Trash2 } from "lucide-react";

const PropertyCardDetail = ({ property, onClose, onEdit, onDeleteConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl relative">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <img
            src={
              property.photos?.[0] ||
              property.image ||
              "https://via.placeholder.com/600x400"
            }
            alt={property.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Property Information
              </h3>
              <div className="space-y-3">
                <Detail label="Name" value={property.name} />
                <Detail label="Address" value={property.address} />
                <Detail
                  label="Description"
                  value={property.description || "-"}
                />
                <Detail label="Type" value={property.type} />
                <Detail
                  label="Created By"
                  value={property.createdBy?.name || "-"}
                />
              </div>
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-4">Units Available</h3>
                {property.units && property.units.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.units.map((unit, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-lg shadow-sm bg-gray-50"
                      >
                        <p className="text-sm text-gray-600">Unit Number:</p>
                        <p className="font-medium text-gray-900">
                          {unit.number}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Status:</p>
                        <p
                          className={`font-semibold ${
                            unit.isAvailable ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {unit.isAvailable ? "Available" : "Occupied"}
                        </p>
                        {unit.size && (
                          <>
                            <p className="text-sm text-gray-600 mt-2">Size:</p>
                            <p className="text-gray-900">{unit.size} sq ft</p>
                          </>
                        )}
                        {unit.rent && (
                          <>
                            <p className="text-sm text-gray-600 mt-2">Rent:</p>
                            <p className="text-gray-900">${unit.rent}/month</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No units available.</p>
                )}
              </div>
            </div>

            {/* Photos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Photos</h3>
              <div className="flex flex-wrap gap-2">
                {property.photos?.length ? (
                  property.photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`Photo ${idx + 1}`}
                      className="w-24 h-24 object-cover rounded border"
                    />
                  ))
                ) : (
                  <span className="text-gray-500">No photos available</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 inline-flex items-center gap-2"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            onClick={onDeleteConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 inline-flex items-center gap-2"
          >
            <Trash2 size={16} />
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <p className="text-gray-900">{value}</p>
  </div>
);

export default PropertyCardDetail;
