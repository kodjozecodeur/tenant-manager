import React from "react";

const ViewMaintenanceModal = ({ request, onClose }) => {
  if (!request) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          Maintenance Request Details
        </h2>
        <div className="mb-2">
          <strong>Tenant:</strong> {request.tenant?.name}
        </div>
        <div className="mb-2">
          <strong>Unit:</strong> {request.unit?.unitName}
        </div>
        <div className="mb-2">
          <strong>Issue:</strong> {request.issueType}
        </div>
        <div className="mb-2">
          <strong>Description:</strong> {request.description}
        </div>
        <div className="mb-2">
          <strong>Date Reported:</strong> {request.reportedDate}
        </div>
        <div className="mb-2">
          <strong>Priority:</strong> {request.priority}
        </div>
        <div className="mb-2">
          <strong>Status:</strong> {request.status}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewMaintenanceModal;
