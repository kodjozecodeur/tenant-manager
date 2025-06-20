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
      // Send name, email, and phoneNumber (property/unit/lease are optional)
      const payload = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
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
      toast.error(
        error.response?.data?.errors?.[0]?.msg || "Failed to add tenant"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4 ">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-50 shadow-lg w-full max-w-md relative">
        <div className="mb-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Add New Tenant</h2>
          <p className="text-gray-600">Enter the tenant details below</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <div className="w-full max-w-sm min-w-[200px]">
              <label htmlFor="" className="block mb-2 text-sm text-slate-600">
                Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label htmlFor="" className="block mb-2 text-sm text-slate-600">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <label htmlFor="" className="block mb-2 text-sm text-slate-600">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
              )}
            </div>
            {/* <div className="w-full max-w-sm min-w-[200px]">
              <label htmlFor="" className="block mb-2 text-sm text-slate-600">
                Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div> */}
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
