import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const AssignLeaseModal = ({ tenant, units, onClose, tenantId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  // Defensive checks
  const hasUnits = Array.isArray(units) && units.length > 0;
  const tenantName = tenant && tenant.name ? tenant.name : "Unknown Tenant";

  let unitOptions;
  try {
    unitOptions = hasUnits
      ? units.map((unit) => (
          <option key={unit._id} value={unit._id}>
            {unit.name || unit.unitNumber || unit.unitName || "Unnamed Unit"}
          </option>
        ))
      : null;
  } catch {
    unitOptions = null;
  }

  const onFormSubmit = async (data) => {
    setError(null);
    if (!tenantId) {
      setError("Tenant ID is missing.");
      toast.error("Tenant ID is missing.");
      return;
    }
    if (!data.unitId) {
      setError("Unit is required.");
      toast.error("Unit is required.");
      return;
    }
    if (!data.startDate || !data.endDate) {
      setError("Start and end dates are required.");
      toast.error("Start and end dates are required.");
      return;
    }
    if (new Date(data.endDate) <= new Date(data.startDate)) {
      setError("End date must be after start date.");
      toast.error("End date must be after start date.");
      return;
    }
    if (!data.monthlyRent || Number(data.monthlyRent) <= 0) {
      setError("Monthly rent must be positive.");
      toast.error("Monthly rent must be positive.");
      return;
    }
    if (!data.securityDeposit || Number(data.securityDeposit) < 0) {
      setError("Security deposit must be zero or positive.");
      toast.error("Security deposit must be zero or positive.");
      return;
    }
    if (!data.paymentFrequency) {
      setError("Payment frequency is required.");
      toast.error("Payment frequency is required.");
      return;
    }
    try {
      const payload = {
        unit: data.unitId,
        tenant: tenantId,
        startDate: data.startDate,
        endDate: data.endDate,
        rentAmount: Number(data.monthlyRent),
        securityDeposit: Number(data.securityDeposit),
        paymentFrequency: data.paymentFrequency,
        status: "active",
      };
      await axios.post(`${API_BASE_URL}/leases`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Lease assigned successfully");
      reset();
      onClose();
      navigate("/leases");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to assign lease"
      );
      toast.error(error.response?.data?.message || "Failed to assign lease");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-50 shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-1">Assign Lease</h2>
        <p className="text-gray-600 mb-4">
          Assign a lease to <strong>{tenantName}</strong>
        </p>
        {!hasUnits ? (
          <div className="text-red-600 text-sm mb-4">
            No available units to assign. Please add or free up a unit first.
          </div>
        ) : null}
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Unit</label>
            <select
              {...register("unitId", { required: "Please select a unit" })}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              disabled={!hasUnits}
            >
              <option value="">Select a unit</option>
              {unitOptions}
            </select>
            {errors.unitId && (
              <p className="text-sm text-red-600">{errors.unitId.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm text-gray-700">Start Date</label>
              <input
                type="date"
                {...register("startDate", {
                  required: "Start date is required",
                })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.startDate && (
                <p className="text-sm text-red-600">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-gray-700">End Date</label>
              <input
                type="date"
                {...register("endDate", { required: "End date is required" })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.endDate && (
                <p className="text-sm text-red-600">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm text-gray-700">
                Monthly Rent
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="e.g. 500"
                {...register("monthlyRent", {
                  required: "Monthly rent is required",
                  min: { value: 1, message: "Monthly rent must be positive" },
                })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.monthlyRent && (
                <p className="text-sm text-red-600">
                  {errors.monthlyRent.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-gray-700">
                Security Deposit
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="e.g. 100"
                {...register("securityDeposit", {
                  required: "Deposit is required",
                  min: {
                    value: 0,
                    message: "Deposit must be zero or positive",
                  },
                })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.securityDeposit && (
                <p className="text-sm text-red-600">
                  {errors.securityDeposit.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">
              Payment Frequency
            </label>
            <select
              {...register("paymentFrequency", {
                required: "Select a frequency",
              })}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select frequency</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annually">Annually</option>
            </select>
            {errors.paymentFrequency && (
              <p className="text-sm text-red-600">
                {errors.paymentFrequency.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-black text-white rounded"
            >
              {isSubmitting ? "Assigning..." : "Assign Lease"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignLeaseModal;
