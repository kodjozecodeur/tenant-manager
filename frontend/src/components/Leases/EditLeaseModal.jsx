import React, { useState, useEffect } from "react";
import { X, Save, Loader } from "lucide-react";
import { updateLease, getTenants, getUnits } from "../../utils/api";

const EditLeaseModal = ({ lease, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    tenant: "",
    unit: "",
    startDate: "",
    endDate: "",
    rentAmount: "",
    status: "active",
  });
  const [tenants, setTenants] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (lease) {
      setFormData({
        tenant: lease.tenant?._id || "",
        unit: lease.unit?._id || "",
        startDate: lease.startDate
          ? new Date(lease.startDate).toISOString().split("T")[0]
          : "",
        endDate: lease.endDate
          ? new Date(lease.endDate).toISOString().split("T")[0]
          : "",
        rentAmount: lease.rentAmount || "",
        status: lease.status || "active",
      });
    }
  }, [lease]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tenantsData, unitsData] = await Promise.all([
          getTenants(),
          getUnits(),
        ]);
        setTenants(tenantsData);
        setUnits(unitsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load required data");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      if (
        !formData.tenant ||
        !formData.unit ||
        !formData.startDate ||
        !formData.endDate ||
        !formData.rentAmount
      ) {
        throw new Error("All fields are required");
      }

      // Validate date logic
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        throw new Error("End date must be after start date");
      }

      // Validate rent amount
      if (parseFloat(formData.rentAmount) <= 0) {
        throw new Error("Rent amount must be greater than 0");
      }

      const leaseData = {
        ...formData,
        rentAmount: parseFloat(formData.rentAmount),
      };

      await updateLease(lease._id, leaseData);
      onSuccess();
    } catch (error) {
      console.error("Error updating lease:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update lease"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!lease) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Lease</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Tenant Selection */}
          <div>
            <label
              htmlFor="tenant"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tenant *
            </label>
            <select
              id="tenant"
              name="tenant"
              value={formData.tenant}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant._id} value={tenant._id}>
                  {tenant.name} - {tenant.email}
                </option>
              ))}
            </select>
          </div>

          {/* Unit Selection */}
          <div>
            <label
              htmlFor="unit"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Unit *
            </label>
            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a unit</option>
              {units.map((unit) => (
                <option key={unit._id} value={unit._id}>
                  Unit {unit.number} - {unit.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Start Date *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                End Date *
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Rent Amount */}
          <div>
            <label
              htmlFor="rentAmount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Monthly Rent Amount *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="rentAmount"
                name="rentAmount"
                value={formData.rentAmount}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="terminated">Terminated</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Update Lease</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLeaseModal;
