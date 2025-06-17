import React from "react";

const ViewLeaseModal = ({ lease, onClose }) => {
  if (!lease) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-50 shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-1">Lease Details</h2>
        <div className="text-gray-700 mb-4">
          <div>
            <strong>Tenant:</strong> {lease.tenant?.name || lease.tenant}
          </div>
          <div>
            <strong>Unit:</strong>{" "}
            {typeof lease.unit === "object" && lease.unit !== null
              ? lease.unit.code || lease.unit.name || "-"
              : typeof lease.unit === "string"
              ? lease.unit
              : "-"}
          </div>
          <div>
            <strong>Start Date:</strong> {lease.startDate}
          </div>
          <div>
            <strong>End Date:</strong> {lease.endDate}
          </div>
          <div>
            <strong>Rent Amount:</strong> ${lease.rentAmount}
          </div>
          <div>
            <strong>Security Deposit:</strong> ${lease.securityDeposit}
          </div>
          <div>
            <strong>Payment Frequency:</strong> {lease.paymentFrequency}
          </div>
          <div>
            <strong>Status:</strong> {lease.status}
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewLeaseModal;
