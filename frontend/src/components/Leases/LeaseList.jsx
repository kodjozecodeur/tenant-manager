import React, { useState, useEffect } from "react";
import {
  Calendar,
  DollarSign,
  Edit,
  Eye,
  User,
  Trash2,
  Loader,
  AlertCircle,
} from "lucide-react";
import { getLeases } from "../../utils/api";
import AddLeaseCard from "./AddLeaseCard";
import ViewLeaseModal from "./ViewLeaseModal";
import EditLeaseModal from "./EditLeaseModal";
const LeaseList = () => {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddLease, setShowAddLease] = useState(false);
  const [selectedLease, setSelectedLease] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Fetch leases from API
  useEffect(() => {
    fetchLeases();
  }, []);

  const fetchLeases = async () => {
    try {
      setLoading(true);
      const data = await getLeases();
      setLeases(data);
    } catch (error) {
      console.error("Error fetching leases:", error);
      setError("Failed to load leases");
    } finally {
      setLoading(false);
    }
  };

  //get status badge color based on lease status
  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "active":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "terminated":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleViewLease = (lease) => {
    setSelectedLease(lease);
    setViewModalOpen(true);
  };

  const handleEditLease = (lease) => {
    setSelectedLease(lease);
    setEditModalOpen(true);
  };

  const handleDeleteLease = (lease) => {
    setSelectedLease(lease);
    setDeleteModalOpen(true);
  };

  const handleModalSuccess = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedLease(null);
    fetchLeases(); // Refresh the list
  };

  const handleModalClose = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedLease(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading leases...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <AlertCircle className="w-8 h-8 text-red-600" />
        <span className="ml-2 text-red-600">{error}</span>
        <button
          onClick={fetchLeases}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Leases</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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

      {leases.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No leases found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
            <div>Tenant & Property</div>
            <div>Lease Period</div>
            <div>Monthly Rent</div>
            <div>Status</div>
            <div>Actions</div>
            <div></div>
          </div>

          {/* Table Rows */}
          {leases.map((lease) => (
            <div
              key={lease._id}
              className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
            >
              {/* Tenant & Property */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {lease.tenant?.name || "Unknown Tenant"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Unit {lease.unit?.number || lease.unit?.name || "N/A"}
                  </div>
                </div>
              </div>

              {/* Lease Period */}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-900">
                    {formatDate(lease.startDate)}
                  </div>
                  <div className="text-sm text-gray-500">
                    to {formatDate(lease.endDate)}
                  </div>
                </div>
              </div>

              {/* Monthly Rent */}
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">
                    ${lease.rentAmount?.toLocaleString() || "0"}
                  </div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center">
                <span className={getStatusBadge(lease.status)}>
                  {lease.status || "Unknown"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleViewLease(lease)}
                  className="flex items-center space-x-1 px-2 py-1.5 text-sm text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleEditLease(lease)}
                  className="flex items-center space-x-1 px-2 py-1.5 text-sm text-green-600 hover:text-green-900 hover:bg-green-50 rounded-md transition-colors"
                  title="Edit Lease"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteLease(lease)}
                  className="flex items-center space-x-1 px-2 py-1.5 text-sm text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete Lease"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {viewModalOpen && (
        <ViewLeaseModal lease={selectedLease} onClose={handleModalClose} />
      )}

      {editModalOpen && (
        <EditLeaseModal
          lease={selectedLease}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      )}

      {deleteModalOpen && (
        <DeleteLeaseModal
          lease={selectedLease}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
};

export default LeaseList;
