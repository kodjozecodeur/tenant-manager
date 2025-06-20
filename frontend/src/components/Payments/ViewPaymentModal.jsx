import React from "react";

const ViewPaymentModal = ({ payment, onClose }) => {
  if (!payment) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
        <div className="mb-2">
          <strong>Tenant:</strong> {payment.tenant?.name}
        </div>
        <div className="mb-2">
          <strong>Unit:</strong> {payment.unit?.unitName}
        </div>
        <div className="mb-2">
          <strong>Lease ID:</strong> {payment.leaseId}
        </div>
        <div className="mb-2">
          <strong>Amount:</strong> ${payment.amount}
        </div>
        <div className="mb-2">
          <strong>Date:</strong> {payment.date}
        </div>
        <div className="mb-2">
          <strong>Method:</strong> {payment.method}
        </div>
        <div className="mb-2">
          <strong>Status:</strong> {payment.status}
        </div>
        <div className="mb-2">
          <strong>Notes:</strong> {payment.notes}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Close
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => window.print()}
          >
            Print/Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPaymentModal;
