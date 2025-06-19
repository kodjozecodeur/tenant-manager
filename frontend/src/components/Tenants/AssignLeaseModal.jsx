import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUnits } from "../../utils/unitApi";
import axios from "axios";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AssignLeaseModal = ({ tenant, isOpen, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unitsLoading, setUnitsLoading] = useState();
  useEffect(() => {
    if (isOpen) {
      console.log("Modal opened, fetching units...");
      setUnitsLoading(true);
      // Fetch available vacant units
      getUnits()
        .then((data) => {
          console.log("Fetched units:", data);
          // Filter only vacant units
          const availableUnits = data.filter((u) => u.status === "vacant");
          console.log("Available vacant units:", availableUnits);
          setUnits(availableUnits);
        })
        .catch((err) => {
          console.error("Error fetching units:", err);
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            "Failed to load available units";
          toast.error(`Error loading units: ${errorMessage}`);
        })
        .finally(() => {
          setUnitsLoading(false);
        });
    }
  }, [isOpen]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        tenant: tenant._id,
        unit: data.unit,
        startDate: data.startDate,
        endDate: data.endDate,
        rentAmount: Number(data.rentAmount),
        status: "active",
      };

      await axios.post(`${API_BASE_URL}/leases`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success("Lease assigned successfully!");
      reset();
      onSuccess?.();
      onClose();

      // Redirect to leases page
      navigate("/dashboard/leases");
    } catch (error) {
      console.error("Error creating lease:", error);
      toast.error(error.response?.data?.message || "Failed to assign lease");
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;

  // Check if tenant already has a lease
  const hasExistingLease = tenant?.lease || tenant?.unit;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Assign Lease to {tenant?.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {hasExistingLease && (
          <div className="mb-4 text-amber-600 bg-amber-50 p-3 rounded-md text-sm">
            <strong>Warning:</strong> This tenant already has an active lease or
            unit assignment. Assigning a new lease will override the existing
            assignment.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Unit S            <select
              {...register("unit", { required: "Please select a unit" })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29A073] focus:border-transparent"
              disabled={unitsLoading}
            >              <option value="">
                {unitsLoading ? "Loading units..." : "Choose an available unit"}
              </option>
              {units.map((unit) => (
                <option key={unit._id} value={unit._id}>
                  {unit.unitName} (${unit.rent}/month)
                </option>
              ))}
            </select>it.unitName} (${unit.rent}/month)
                </option>
              ))}
            </select>
            {errors.unit && (
              <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lease Start Date *
            </label>
            <input
              type="date"
              {...register("startDate", { required: "Start date is required" })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29A073] focus:border-transparent"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>
          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lease End Date *
            </label>
            <input
              type="date"
              {...register("endDate", { required: "End date is required" })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29A073] focus:border-transparent"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>
          {/* Rent Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Rent Amount *
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("rentAmount", {
                required: "Rent amount is required",
                min: { value: 0, message: "Rent amount must be positive" },
              })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29A073] focus:border-transparent"
            />
            {errors.rentAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rentAmount.message}
              </p>
            )}
          </div>{" "}
          {/* Show message if no units available or loading */}
          {!unitsLoading && units.length === 0 && (
            <div className="text-amber-600 bg-amber-50 p-3 rounded-md text-sm">
              No vacant units available. Please add units or make existing units
              vacant first.
            </div>
          )}
          {unitsLoading && (
            <div className="text-blue-600 bg-blue-50 p-3 rounded-md text-sm">
              Loading available units...
            </div>
          )}
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || units.length === 0}
              className="px-4 py-2 bg-[#29A073] text-white rounded-md hover:bg-[#1f7a5c] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Assigning..." : "Assign Lease"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignLeaseModal;
