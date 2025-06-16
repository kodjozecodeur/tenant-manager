import React, { useState } from "react";
import TenantCard from "../../components/Tenants/TenantList";
import TenantCardDetail from "../../components/Tenants/TenantCardDetail";
import AddTenantCard from "../../components/Tenants/AddTenantCard";
import { PlusIcon } from "lucide-react";
import TenantList from "../../components/Tenants/TenantList";
import { deleteTenant, getTenants } from "../../utils/tenantApi";
import { toast } from "react-toastify";
// import { getTenants } from "../../utils/api";

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //state to track selected tenant
  const [activeTenant, setActiveTenant] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [showAddTenant, setShowAddTenant] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    getTenants()
      .then((data) => {
        setTenants(data);
        setError(null);
      })
      .catch((err) => setError(err.message || "Failed to load tenants"))
      .finally(() => setLoading(false));
  }, []);
  // handle delete tenant
  const handleDelete = (tenantId) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      // Call API to delete tenant
      // Assuming deleteTenant is a function that deletes a tenant by ID
      deleteTenant(tenantId)
        .then(() => {
          setTenants(tenants.filter((tenant) => tenant._id !== tenantId));
          toast.success("Tenant deleted successfully");
        })
        .catch((err) => toast.error(err.message || "Failed to delete tenant"));
    }
  };
  // handle edit tenant
  const handleEdit = (tenant) => {
    setActiveTenant(tenant);
    setIsEditModalVisible(true);
  };
  // handle view tenant
  const handleView = (tenant) => {
    setActiveTenant(tenant);
    setIsViewModalVisible(true);
  };
  // handle add tenant
  // const handleAddTenant = (newTenant) => {
  //   setTenants((prev) => [...prev, newTenant]);
  //   toast.success("Tenant added successfully");
  //   setShowAddTenant(false);
  // };

  return (
    <div>
      <div className="flex justify-between items-center bg-white p-4 ">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Tenants</h1>
          <p className="text-gray-600">
            Manage your tenants and their information
          </p>
        </div>
        <button
          onClick={() => setShowAddTenant(true)}
          className="bg-[#29A073] text-white px-4 py-2 rounded-md inline-flex items-center gap-2 cursor-pointer hover:bg-[#1f7a5c] transition-colors"
        >
          <PlusIcon />
          Add Tenant
        </button>
      </div>
      {/* searchbar and filter by status */}
      <div className="flex items-center gap-4 p-4">
        <input
          type="text"
          placeholder="Search tenants..."
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <select className="border border-gray-300 rounded-md px-4 py-2">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      {/* Tenant List Components */}
      <div className="p-4 overflow-x-auto">
        <TenantList
          tenants={tenants}
          loading={loading}
          error={error}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      </div>
      {/* is edit modal */}
      {isEditModalVisible && (
        <EditTenantModal
          tenant={activeTenant}
          isOpen={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          onUpdate={(updatedTenant) => {
            // Optional: update state with new tenant data
            setTenants((prev) =>
              prev.map((t) => (t._id === updatedTenant._id ? updatedTenant : t))
            );
            toast.success("Tenant updated successfully");
            setIsEditModalVisible(false);
          }}
        />
      )}
      {/* view modal */}
      {isViewModalVisible && (
        <ViewTenantModal
          tenant={activeTenant}
          isOpen={isViewModalVisible}
          onClose={() => setIsViewModalVisible(false)}
        />
      )}
      {/* Add Tenant Modal */}
      {showAddTenant && (
        <AddTenantCard
          isOpen={showAddTenant}
          onClose={() => setShowAddTenant(false)}
          onAdd={(newTenant) => {
            setTenants((prev) => [...prev, newTenant]);
            toast.success("Tenant added successfully");
            setShowAddTenant(false);
          }}
        />
      )}
    </div>
  );
};

export default Tenants;
