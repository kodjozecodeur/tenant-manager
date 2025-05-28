import React from "react";
import TenantCard from "../../components/Tenants/TenantCard";
import { assets } from "../../assets/assets";
import TenantCardDetail from "../../components/Tenants/TenantCardDetail";

const Tenants = () => {
  //track selected tenant card
  const [selectedTenant, setSelectedTenant] = React.useState(null);
  return (
    <div>
      {/* tenant grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assets.mockTenants.map((tenant) => (
          <TenantCard
            key={tenant.id}
            tenant={tenant}
            onClick={setSelectedTenant}
          />
        ))}
      </div>
      {/* Modal for selected tenant details */}
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
