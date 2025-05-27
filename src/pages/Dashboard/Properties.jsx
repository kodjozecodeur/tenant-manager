import { PlusIcon } from "lucide-react";
import React from "react";
import PropertyCard from "../../components/Properties/PropertyCard";
import { assets } from "../../assets/assets";

const Properties = () => {
  return (
    <div>
      {/* title and add button here */}
      <div className="flex justify-between items-center bg-white p-4 ">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Properties
        </h1>
        <button
          type="submit"
          className="bg-[#29A073] text-white px-4 py-2 rounded-md inline-flex items-center gap-2 order-2"
        >
          <PlusIcon />
          Add Property
        </button>
      </div>
      {/* property grid goes here */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assets.mockProperties.map((property, idx) => (
          <PropertyCard key={idx} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Properties;
