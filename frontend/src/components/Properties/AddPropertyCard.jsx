import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createProperty } from "../../utils/api";

const AddPropertyCard = ({ onClose, onSuccess }) => {
  // Handle form submission
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  //onSubmit function
  const onSubmit = async (data) => {
    try {
      //call apit ot create property
      await createProperty(data);
      toast.success("Property added successfully!");
      reset(); // Reset form fields
      onSuccess?.(); // Call success callback to refresh properties list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding property:", error);
      // Handle error (e.g., show notification)
      toast.error("Failed to add property. Please try again.");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4 ">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      {/* modal content */}
      <div className="bg-white rounded-lg p-6 z-50 shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
        {/* simple form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Property Name"
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
              placeholder="Address"
              {...register("address", { required: "Address is required" })}
              className="w-full border rounded p-2"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Units"
              {...register("units", {
                required: "Number of units is required",
                min: { value: 1, message: "At least 1 unit required" },
              })}
              className="w-full border rounded p-2"
            />
            {errors.units && (
              <p className="text-red-500 text-sm">{errors.units.message}</p>
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
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyCard;
