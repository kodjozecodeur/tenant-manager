import React, { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { updateUnit, deleteUnit } from "../../utils/unitApi";
import { toast } from "react-toastify";

const UnitCard = ({ unit, onEditSuccess, onDeleteSuccess }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    unitName: unit.unitName || "",
    size: unit.size || "",
    rent: unit.rent || "",
    description: unit.description || "",
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateUnit(unit._id, form);
      toast.success("Unit updated successfully.");
      setShowEdit(false);
      onEditSuccess && onEditSuccess();
    } catch {
      toast.error("Failed to update unit.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUnit(unit._id);
      toast.success("Unit deleted successfully.");
      setShowConfirm(false);
      onDeleteSuccess && onDeleteSuccess();
    } catch {
      toast.error("Failed to delete unit.");
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col">
      {/* Photos */}
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
        {unit.photos && unit.photos.length > 0 ? (
          <img
            src={unit.photos[0]}
            alt="Unit"
            className="w-full h-40 object-cover"
          />
        ) : (
          <span className="text-gray-400">No photo</span>
        )}
      </div>
      {/* Info */}
      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
          {unit.unitName}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          Size: {unit.size ? `${unit.size} sq ft` : "-"}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          Rent: {unit.rent ? `$${unit.rent}/month` : "-"}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          {unit.description || "No description"}
        </p>
      </div>
      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowEdit(false)}
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Unit</h2>
            <form onSubmit={handleEdit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Unit Name</label>
                <input
                  className="border rounded w-full p-2"
                  value={form.unitName}
                  onChange={(e) =>
                    setForm({ ...form, unitName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Size (sq ft)
                </label>
                <input
                  className="border rounded w-full p-2"
                  value={form.size}
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                  type="number"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Rent ($/month)
                </label>
                <input
                  className="border rounded w-full p-2"
                  value={form.rent}
                  onChange={(e) => setForm({ ...form, rent: e.target.value })}
                  type="number"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  className="border rounded w-full p-2"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this unit?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitCard;
