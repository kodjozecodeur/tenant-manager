import React from "react";
import LeaseList from "../../components/Leases/LeaseList";

const Leases = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Leases</h1>
      <div>
        <LeaseList />
      </div>
    </div>
  );
};

export default Leases;
