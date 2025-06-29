import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getExpiringLeases } from "../../utils/api";

const LeasesExpirationList = () => {
  const [leasesExp, setLeasesExp] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch data from api
  useEffect(() => {
    getExpiringLeases().then((data) => {
      setLeasesExp(data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="border border-gray-200 bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        Upcoming Lease Expirations
      </h2>
      <p className="text-sm text-gray-500 mb-4">Next 30 days</p>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-gray-500 text-center">Loading ...</div>
        ) : leasesExp.length === 0 ? (
          <div className="text-gray-500 text-center">
            No upcoming leases expiration
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Tenant Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Property
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Expiration date
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Days left
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {leasesExp.map((lease, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {lease.tenant.name}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {lease.property.name}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {lease.expirationDate}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        lease.daysLeft === 0
                          ? "bg-red-100 text-red-700"
                          : lease.daysLeft <= 7
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {lease.daysLeft} days left
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

export default LeasesExpirationList;
