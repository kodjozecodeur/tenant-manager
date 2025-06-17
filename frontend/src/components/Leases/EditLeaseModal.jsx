import React from "react";
import { useForm } from "react-hook-form";

const EditLeaseModal = ({ lease, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: lease,
  });

  React.useEffect(() => {
    reset(lease);
  }, [lease, reset]);

  const onSubmit = (data) => {
    onSave({ ...lease, ...data });
  };

  if (!lease) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-50 shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-1">Edit Lease</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Start Date</label>
            <input
              type="date"
              {...register("startDate", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.startDate && (
              <p className="text-sm text-red-600">Start date is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700">End Date</label>
            <input
              type="date"
              {...register("endDate", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.endDate && (
              <p className="text-sm text-red-600">End date is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700">Rent Amount</label>
            <input
              type="number"
              step="0.01"
              {...register("rentAmount", { required: true, min: 1 })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.rentAmount && (
              <p className="text-sm text-red-600">Rent must be positive</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700">
              Security Deposit
            </label>
            <input
              type="number"
              step="0.01"
              {...register("securityDeposit", { required: true, min: 0 })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.securityDeposit && (
              <p className="text-sm text-red-600">
                Deposit must be zero or positive
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700">
              Payment Frequency
            </label>
            <select
              {...register("paymentFrequency", { required: true })}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select frequency</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annually">Annually</option>
            </select>
            {errors.paymentFrequency && (
              <p className="text-sm text-red-600">Select a frequency</p>
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
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLeaseModal;
