import React from "react";
import {
  CreditCard,
  DollarSign,
  Home,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";

const TenantCardDetail = ({ tenant, onClose }) => {
  if (!tenant) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2 text-gray-600" />
            <h1 className="text-xl font-semibold text-gray-900">
              {tenant.name || "Unknown"}
            </h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 mr-2 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Contact Information
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{tenant.email || "Unknown"}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{tenant.phone || "Unknown"}</span>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Emergency Contact
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="font-medium">
                      {tenant.emergencyContact?.name || "Unknown"}
                    </p>
                    <p>{tenant.emergencyContact?.phone || "Unknown"}</p>
                    <p>{tenant.emergencyContact?.relationship || "Unknown"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Home className="w-5 h-5 mr-2 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {tenant.propertyName || "Property Details"}
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {tenant.propertyName || "Property Name"}
                  </h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{tenant.propertyAddress || "Property Address"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-gray-600">Move-in Date</p>
                    <p className="font-medium text-gray-900">
                      {tenant.moveInDate || "Move-in Date"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lease End</p>
                    <p className="font-medium text-gray-900">
                      {tenant.leaseEndDate || "Lease End"}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-gray-600">Monthly Rent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tenant.rentAmount || "$0"}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                    ending soon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Payment History
              </h2>
            </div>

            <div className="space-y-4">
              {tenant.paymentHistory && tenant.paymentHistory.length > 0 ? (
                tenant.paymentHistory.map((payment) => (
                  <div
                    key={payment.dueDate || payment.month}
                    className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {payment.month}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Due: {payment.dueDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-lg inline-flex items-center">
                        <DollarSign className="mr-1" />
                        {payment.amount} /month
                      </p>
                      <span
                        className={`inline-block ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                          payment.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No payment history available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantCardDetail;
