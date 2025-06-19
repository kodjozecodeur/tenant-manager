import React, { useState } from "react";

const EditMaintenanceModal = ({ request, onSave, onClose }) => {
  const [form, setForm] = useState({
    status: request.status,
    priority: request.priority,
    description: request.description,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...request, ...form });
  };

  if (!request) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Maintenance Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block font-medium">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
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
    </div>
  );
};

export default EditMaintenanceModal;
