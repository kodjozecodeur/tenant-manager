import React, { useState, useEffect } from "react";

const AddPaymentModal = ({ tenants, onSave, onClose }) => {
  const [form, setForm] = useState({
    tenant: "",
    unit: "",
    leaseId: "",
    amount: "",
    date: "",
    method: "Cash",
    notes: "",
    status: "Paid",
  });

  useEffect(() => {
    if (form.tenant) {
      const t = tenants.find((t) => t._id === form.tenant);
      console.log("Selected tenant:", t);
      if (t && t.lease) {
        console.log("Tenant lease:", t.lease);
        console.log("Tenant lease unit:", t.lease.unit);
        setForm((f) => ({
          ...f,
          unit: t.lease.unit?._id || "",
          leaseId: t.lease._id || "",
        }));
      }
    }
  }, [form.tenant, tenants]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-4">Add Payment</h2>
        <select
          name="tenant"
          value={form.tenant}
          onChange={handleChange}
          className="mb-2 w-full p-2 border rounded"
          required
        >
          <option value="">Select Tenant</option>
          {tenants.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
        <input
          name="unit"
          value={form.unit}
          className="mb-2 w-full p-2 border rounded"
          placeholder={`Unit (debug: ${form.unit})`}
          disabled
        />
        <input
          name="leaseId"
          value={form.leaseId}
          className="mb-2 w-full p-2 border rounded"
          placeholder="Lease ID"
          disabled
        />
        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="mb-2 w-full p-2 border rounded"
          placeholder="Amount"
          type="number"
          required
        />
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          className="mb-2 w-full p-2 border rounded"
          placeholder="Date"
          type="date"
          required
        />
        <select
          name="method"
          value={form.method}
          onChange={handleChange}
          className="mb-2 w-full p-2 border rounded"
        >
          <option>Cash</option>
          <option>Bank Transfer</option>
          <option>Card</option>
          <option>Check</option>
        </select>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="mb-2 w-full p-2 border rounded"
          placeholder="Notes"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="mb-4 w-full p-2 border rounded"
        >
          <option>Paid</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPaymentModal;
