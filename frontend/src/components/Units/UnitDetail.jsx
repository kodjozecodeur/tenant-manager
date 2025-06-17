import React from "react";

const UnitDetail = ({ unit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 ">
          <h2 className="text-2xl font-bold text-gray-900">Unit Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">Close</span>×
          </button>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              {unit.unitName}{" "}
              <span className="text-xs text-gray-500">({unit.code})</span>
            </h3>
            <p className="text-gray-600 mb-1">
              Property: {unit.property?.name || "-"}
            </p>
            <p className="text-gray-600 mb-1">Rent: ${unit.rent}</p>
            <p className="text-gray-600 mb-1">Size: {unit.size || "-"} sq ft</p>
            <p className="text-gray-600 mb-1">
              Lease Terms: {unit.leaseTerms || "-"}
            </p>
            <p className="text-gray-500 text-sm mb-2">{unit.description}</p>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Photos</h4>
            <div className="flex flex-wrap gap-2">
              {unit.photos && unit.photos.length > 0 ? (
                unit.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`Unit Photo ${idx + 1}`}
                    className="w-24 h-24 object-cover rounded border"
                  />
                ))
              ) : (
                <span className="text-gray-500">No photos available</span>
              )}
            </div>
          </div>
          <div className="flex justify-end">
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

export default UnitDetail;
