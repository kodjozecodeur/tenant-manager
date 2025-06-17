import React from "react";
import { Calendar, DollarSign, Edit, Eye, Trash } from "lucide-react";
import AddLeaseCard from "./AddLeaseCard";
import ViewLeaseModal from "./ViewLeaseModal";
import EditLeaseModal from "./EditLeaseModal";
import { getLeases, deleteLease, updateLease } from "../../utils/leasesApi";

const LeaseList = () => {
  const [leases, setLeases] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showAddLease, setShowAddLease] = React.useState(false);
  const [selectedLease, setSelectedLease] = React.useState(null);
  const [viewModal, setViewModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);

  const fetchLeases = async () => {
    setLoading(true);
    try {
      const data = await getLeases();
      setLeases(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch leases");
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeases();
  }, []);

  const handleDelete = async (leaseId) => {
    if (!window.confirm("Are you sure you want to delete this lease?")) return;
    try {
      await deleteLease(leaseId);
      setLeases((prev) => prev.filter((l) => l._id !== leaseId));
    } catch (err) {
      alert(err.message || "Failed to delete lease");
    }
  };

  const handleEditSave = async (updatedLease) => {
    try {
      await updateLease(updatedLease._id, updatedLease);
      setLeases((prev) =>
        prev.map((l) => (l._id === updatedLease._id ? updatedLease : l))
      );
      setEditModal(false);
    } catch (err) {
      alert(err.message || "Failed to update lease");
    }
  };

  const getRemainingDays = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    return Math.floor((end - now) / (1000 * 60 * 60 * 24));
  };

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 text-xs font-semibold rounded-full";
    if (status === "active") return `${base} bg-green-100 text-green-800`;
    if (status === "ending-soon")
      return `${base} bg-yellow-100 text-yellow-800`;
    return `${base} bg-gray-100 text-gray-500`;
  };

  if (loading) return <div className="p-4">Loading leases...</div>;
  if (error) return <div className="text-red-600 p-4">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowAddLease(true)}
        >
          + New Lease
        </button>
      </div>

      {showAddLease && (
        <AddLeaseCard
          onClose={() => setShowAddLease(false)}
          onSuccess={() => {
            setShowAddLease(false);
            fetchLeases();
          }}
        />
      )}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
            <tr>
              <th className="px-6 py-4">Unit</th>
              <th className="px-6 py-4">Tenant</th>
              <th className="px-6 py-4">Lease Period</th>
              <th className="px-6 py-4">Rent</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leases.map((lease) => (
              <tr key={lease._id}>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {typeof lease.unit === "object" && lease.unit !== null
                    ? lease.unit.code || "-"
                    : typeof lease.unit === "string"
                    ? lease.unit
                    : "-"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold uppercase">
                      {lease.tenant?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "?"}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {lease.tenant?.name || "Unknown"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {lease.tenant?.email || ""}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex flex-col">
                    <span>
                      {new Date(lease.startDate).toLocaleDateString()} -{" "}
                      {new Date(lease.endDate).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-gray-400">
                      {getRemainingDays(lease.endDate)} days remaining
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="font-semibold text-gray-900">
                    ${lease.rentAmount}/mo
                  </div>
                  <div className="text-xs text-gray-500">
                    Deposit: ${lease.deposit || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={getStatusBadge(lease.status)}>
                    {lease.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex space-x-3 items-center">
                  <button
                    onClick={() => {
                      setSelectedLease(lease);
                      setViewModal(true);
                    }}
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLease(lease);
                      setEditModal(true);
                    }}
                  >
                    <Edit className="w-4 h-4 text-yellow-600" />
                  </button>
                  <button onClick={() => handleDelete(lease._id)}>
                    <Trash className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewModal && (
        <ViewLeaseModal
          lease={selectedLease}
          onClose={() => setViewModal(false)}
        />
      )}
      {editModal && (
        <EditLeaseModal
          lease={selectedLease}
          onClose={() => setEditModal(false)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default LeaseList;
