import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AddTenantCard = ({ onClose, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Only send name and contact (property/unit/lease are optional)
      const payload = {
        name: data.name,
        contact: data.contact,
      };
      await axios.post(`${API_BASE_URL}/tenants`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Tenant added successfully!");
      reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add tenant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4 ">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-50 shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Add New Tenant</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
              className="w-full border rounded p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Contact Info (email or phone)"
              {...register("contact", { required: "Contact is required" })}
              className="w-full border rounded p-2"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact.message}</p>
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
              {loading ? "Adding..." : "Add Tenant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTenantCard;
