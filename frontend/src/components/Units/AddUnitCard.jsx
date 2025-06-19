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
        photos = await Promise.all(
          Array.from(data.photos).map(
            (file) =>
              new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
              })
          )
        );
      }
      const payload = {
        unitName: data.unitName,
        description: data.description,
        size: data.size,
        rent: data.rent,
        leaseTerms: data.leaseTerms,
        photos,
        property: data.property,
      };
      await createUnit(payload);
      toast.success("Unit added successfully!");
      reset();
      onSuccess?.();
      onClose();
    } catch {
      toast.error("Something went wrong, try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4 ">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-50 shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Add New Unit</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Unit Name"
              {...register("unitName", { required: "Unit name is required" })}
              className="w-full border rounded p-2"
            />
            {errors.unitName && (
              <p className="text-red-500 text-sm">{errors.unitName.message}</p>
            )}
          </div>
          <div>
            <select
              {...register("property", { required: "Property is required" })}
              className="w-full border rounded p-2"
              defaultValue=""
            >
              <option value="" disabled>
                Select Property
              </option>
              {properties?.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.property && (
              <p className="text-red-500 text-sm">{errors.property.message}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              placeholder="Rent"
              {...register("rent", { required: "Rent is required", min: 0 })}
              className="w-full border rounded p-2"
            />
            {errors.rent && (
              <p className="text-red-500 text-sm">{errors.rent.message}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              placeholder="Size (sq ft)"
              {...register("size")}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <textarea
              placeholder="Description"
              {...register("description")}
              className="w-full border rounded p-2 min-h-[60px]"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Lease Terms"
              {...register("leaseTerms")}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("photos")}
              className="w-full border rounded p-2"
            />
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

export default AddUnitCard;
