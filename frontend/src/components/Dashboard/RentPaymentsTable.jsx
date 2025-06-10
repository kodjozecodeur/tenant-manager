import React, { useEffect } from "react";
import { useState } from "react";
import { getRecentPayments } from "../../utils/api";

const getStatusClass = (status) => {
  switch (status) {
    case "Paid":
      return "inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700";
    case "Pending":
      return "inline-block px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700";
    default:
      return "inline-block px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700";
  }
};

const RentPaymentsTable = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch data from api
  useEffect(() => {
    getRecentPayments().then((data) => {
      setPayments(data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="border border-gray-200 bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        Recent Rent Payments
      </h2>
      <p className="text-sm text-gray-500 mb-4">Latest payment transactions</p>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : payments.length === 0 ? (
          <div className="text-center text-gray-500">No recent payments</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Tenant Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {payments.map((payment) => (
                <tr
                  key={
                    payment.id
                      ? payment.id
                      : `${payment.tenant}-${payment.date}`
                  }
                >
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {payment.tenant}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {payment.date}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {payment.amount}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <span className={getStatusClass(payment.status)}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RentPaymentsTable;
