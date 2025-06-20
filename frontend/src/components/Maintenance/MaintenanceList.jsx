import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import ViewMaintenanceModal from "./ViewMaintenanceModal";
import EditMaintenanceModal from "./EditMaintenanceModal";
import { deleteRequest, updateRequest } from "../../utils/maintenanceApi";

const statusClasses = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
};
const priorityClasses = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
  Critical: "bg-red-200 text-red-900",
};

const getTableStyle =
  "min-w-full divide-y divide-gray-200 border border-gray-200 bg-white rounded-lg";
const getThStyle =
  "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase";
const getTdStyle = "px-4 py-2 whitespace-nowrap text-sm text-gray-900";

const MaintenanceList = ({ requests, onChange }) => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const filtered = useMemo(
    () =>
      requests.filter(
        (r) =>
          (filterStatus === "All" || r.status === filterStatus) &&
          (filterPriority === "All" || r.priority === filterPriority)
      ),
    [requests, filterStatus, filterPriority]
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;
    setDeletingId(id);
    await deleteRequest(id);
    setDeletingId(null);
    if (onChange) onChange();
  };

  const handleEdit = (req) => setEditModal(req);
  const handleView = (req) => setViewModal(req);

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <select
          className="p-2 border rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select
          className="p-2 border rounded"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className={getTableStyle}>
          <thead>
            <tr>
              <th className={getThStyle}>Tenant</th>
              <th className={getThStyle}>Unit</th>
              <th className={getThStyle}>Issue</th>
              <th className={getThStyle}>Date</th>
              <th className={getThStyle}>Priority</th>
              <th className={getThStyle}>Status</th>
              <th className={getThStyle}>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className={getTdStyle}>{req.tenant?.name}</td>
                <td className={getTdStyle}>{req.unit?.unitName}</td>
                <td className={getTdStyle}>{req.issueType}</td>
                <td className={getTdStyle}>
                  {format(new Date(req.reportedDate), "P")}
                </td>
                <td className={getTdStyle}>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      priorityClasses[req.priority]
                    }`}
                  >
                    {req.priority}
                  </span>
                </td>
                <td className={getTdStyle}>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusClasses[req.status]
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className={getTdStyle}>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(req)}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(req)}
                      className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                      disabled={deletingId === req._id}
                    >
                      {deletingId === req._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                  No matching requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {viewModal && (
        <ViewMaintenanceModal
          request={viewModal}
          onClose={() => setViewModal(null)}
        />
      )}
      {editModal && (
        <EditMaintenanceModal
          request={editModal}
          onSave={async (updated) => {
            await updateRequest(updated._id, updated);
            setEditModal(null);
            if (onChange) onChange();
          }}
          onClose={() => setEditModal(null)}
        />
      )}
    </div>
  );
};

export default MaintenanceList;
