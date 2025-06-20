import React, { useState } from "react";
import { X, Trash2, AlertTriangle, Loader } from "lucide-react";
import { deleteLease } from "../../utils/api";

const DeleteLeaseModal = ({ lease, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      await deleteLease(lease._id);
      onSuccess();
    } catch (error) {
      console.error("Error deleting lease:", error);
      setError(error.response?.data?.message || "Failed to delete lease");
    } finally {
      setLoading(false);
    }
  };

  if (!lease) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Delete Lease
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <p className="text-gray-700">
              Are you sure you want to delete this lease? This action cannot be
              undone.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tenant:</span>
                <span className="text-sm font-medium text-gray-900">
                  {lease.tenant?.name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Unit:</span>
                <span className="text-sm font-medium text-gray-900">
                  Unit {lease.unit?.number || lease.unit?.name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Rent Amount:</span>
                <span className="text-sm font-medium text-gray-900">
                  ${lease.rentAmount?.toLocaleString() || "0"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="text-sm font-medium text-gray-900">
                  {lease.status || "Unknown"}
                </span>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-700">
                  <p className="font-medium">This will also:</p>
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    <li>Remove the lease reference from the tenant</li>
                    <li>Mark the unit as vacant</li>
                    <li>Permanently delete all lease data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Delete Lease</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLeaseModal;
