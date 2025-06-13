import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getTenants } from "../../utils/api";
import { getUnits } from "../../utils/unitApi";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AddLeaseCard = ({ onClose, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [tenants, setTenants] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch tenants and units
    getTenants().then((data) => setTenants(data));
    getUnits().then((data) => setUnits(data));
  }, []);

  // Filter only tenants not currently assigned to a lease (no active lease)
  const availableTenants = tenants.filter((t) => !t.unit && !t.lease);
  // Filter only vacant units
  const availableUnits = units.filter((u) => u.status === "vacant");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        tenant: data.tenant,
        unit: data.unit,
        startDate: data.startDate,
        endDate: data.endDate,
        rentAmount: Number(data.rentAmount),
        status: "active",
      };
      await axios.post(`${API_BASE_URL}/leases`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Lease created successfully!");
      reset();
      onSuccess?.();
      onClose();
    } catch {
      toast.error("Failed to create lease");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4 ">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-50 shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Create New Lease</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Tenant</label>
            <select
              {...register("tenant", { required: "Tenant is required" })}
              className="w-full border rounded p-2"
              defaultValue=""
            >
              <option value="" disabled>
                Select Tenant
              </option>
              {availableTenants.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.tenant && (
              <p className="text-red-500 text-sm">{errors.tenant.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Unit</label>
            <select
              {...register("unit", { required: "Unit is required" })}
              className="w-full border rounded p-2"
              defaultValue=""
            >
              <option value="" disabled>
                Select Unit
              </option>
              {availableUnits.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.unitName}
                </option>
              ))}
            </select>
            {errors.unit && (
              <p className="text-red-500 text-sm">{errors.unit.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <input
              type="date"
              {...register("startDate", { required: "Start date is required" })}
              className="w-full border rounded p-2"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">End Date</label>
            <input
              type="date"
              {...register("endDate", { required: "End date is required" })}
              className="w-full border rounded p-2"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Monthly Rent</label>
            <input
              type="number"
              {...register("rentAmount", {
                required: "Rent amount is required",
                min: 0,
              })}
              className="w-full border rounded p-2"
            />
            {errors.rentAmount && (
              <p className="text-red-500 text-sm">
                {errors.rentAmount.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {loading ? "Creating..." : "Create Lease"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeaseCard;
