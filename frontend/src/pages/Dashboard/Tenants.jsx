import React from "react";
import TenantCard from "../../components/Tenants/TenantCard";
import TenantCardDetail from "../../components/Tenants/TenantCardDetail";
import AddTenantCard from "../../components/Tenants/AddTenantCard";
import { getTenants } from "../../utils/api";

const Tenants = () => {
  const [tenants, setTenants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedTenant, setSelectedTenant] = React.useState(null);
  const [showAddTenant, setShowAddTenant] = React.useState(false);

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

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setShowAddTenant(true)}
        >
          + Add Tenant
        </button>
      </div>
      {showAddTenant && (
        <AddTenantCard
          onClose={() => setShowAddTenant(false)}
          onSuccess={() => setShowAddTenant(false)}
        />
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center py-10 text-gray-500">
            Loading tenants...
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-10 text-red-500">
            {error}
          </div>
        ) : tenants.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-400">
            No tenants found.
          </div>
        ) : (
          tenants.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              onClick={setSelectedTenant}
            />
          ))
        )}
      </div>
      {selectedTenant && (
        <TenantCardDetail
          tenant={selectedTenant}
          onClose={() => setSelectedTenant(null)}
        />
      )}
    </div>
  );
};

export default Tenants;
