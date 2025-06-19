import React from "react";
import { useForm } from "react-hook-form";
import { createUnit } from "../../utils/unitApi";
import { toast } from "react-toastify";

const AddUnitCard = ({ onClose, onSuccess, properties }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let photos = [];
      if (data.photos && data.photos.length > 0) {
        // Limit photo uploads to 5 files
        const fileArray = Array.from(data.photos).slice(0, 5);
        photos = await Promise.all(
          fileArray.map(
            (file) =>
              new Promise((resolve, reject) => {
                // Check file size (max 5MB per file)
                if (file.size > 5 * 1024 * 1024) {
                  reject(
                    new Error(
                      `File ${file.name} is too large. Max size is 5MB.`
                    )
                  );
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
              })
          )
        );
      }

      const payload = {
        unitName: data.unitName.trim(),
        description: data.description?.trim() || "",
        size: data.size ? Number(data.size) : undefined,
        rent: Number(data.rent),
        leaseTerms: data.leaseTerms?.trim() || "",
        photos,
        property: data.property,
      };

      await createUnit(payload);
      toast.success("Unit added successfully!");
      reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error creating unit:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong, try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4 ">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-50 shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Add New Unit</h2>{" "}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Unit 101, Apartment A"
              {...register("unitName", {
                required: "Unit name is required",
                minLength: { value: 1, message: "Unit name is required" },
                maxLength: {
                  value: 100,
                  message: "Unit name cannot exceed 100 characters",
                },
                pattern: {
                  value: /^[A-Za-z0-9\s\-#]+$/,
                  message:
                    "Unit name can only contain letters, numbers, spaces, hyphens, and #",
                },
              })}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.unitName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.unitName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property *
            </label>
            <select
              {...register("property", { required: "Property is required" })}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              defaultValue=""
            >
              <option value="" disabled>
                Select Property
              </option>
              {properties?.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} - {p.address}
                </option>
              ))}
            </select>
            {errors.property && (
              <p className="text-red-500 text-sm mt-1">
                {errors.property.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Rent *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="1200.00"
                {...register("rent", {
                  required: "Rent is required",
                  min: { value: 0.01, message: "Rent must be greater than 0" },
                  max: {
                    value: 100000,
                    message: "Rent cannot exceed $100,000",
                  },
                })}
                className="w-full border border-gray-300 rounded-md p-3 pl-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            {errors.rent && (
              <p className="text-red-500 text-sm mt-1">{errors.rent.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size (sq ft)
            </label>
            <input
              type="number"
              min="0"
              placeholder="750"
              {...register("size", {
                min: { value: 0, message: "Size must be positive" },
                max: {
                  value: 10000,
                  message: "Size cannot exceed 10,000 sq ft",
                },
              })}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.size && (
              <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Brief description of the unit..."
              {...register("description", {
                maxLength: {
                  value: 500,
                  message: "Description cannot exceed 500 characters",
                },
              })}
              className="w-full border border-gray-300 rounded-md p-3 min-h-[80px] focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lease Terms
            </label>
            <input
              type="text"
              placeholder="e.g., 12 months minimum, pets allowed"
              {...register("leaseTerms", {
                maxLength: {
                  value: 200,
                  message: "Lease terms cannot exceed 200 characters",
                },
              })}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.leaseTerms && (
              <p className="text-red-500 text-sm mt-1">
                {errors.leaseTerms.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photos (Max 5 files, 5MB each)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("photos")}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: JPG, PNG, GIF. Max 5 files, 5MB each.
            </p>
          </div>{" "}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Creating..." : "Create Unit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUnitCard;
