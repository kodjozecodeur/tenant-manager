import React from "react";

const AddPropertyCard = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4 ">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      {/* modal content */}
      <div className="bg-white rounded-lg p-6 z-50 shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
        {/* simple form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Property Name"
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full border rounded p-2"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyCard;
