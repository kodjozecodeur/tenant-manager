import { PlusIcon } from "lucide-react";
import React from "react";
import PropertyCard from "../../components/Properties/PropertyCard";
import { assets } from "../../assets/assets";
import PropertyCardDetail from "../../components/Properties/PropertyCardDetail";
import AddPropertyCard from "../../components/Properties/AddPropertyCard";

const Properties = () => {
  //track the selected property
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  //for add property
  const [showAddModal, setShowAddModal] = React.useState(false);

  return (
    <div>
      {/* title and add button here */}
      <div className="flex justify-between items-center bg-white p-4 ">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Properties
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#29A073] text-white px-4 py-2 rounded-md inline-flex items-center gap-2 cursor-pointer hover:bg-[#1f7a5c] transition-colors"
        >
          <PlusIcon />
          Add Property
        </button>
      </div>
      {/* property grid goes here */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assets.mockProperties.map((property, idx) => (
          <PropertyCard
            key={idx}
            property={property}
            onClick={setSelectedProperty}
          />
        ))}
      </div>
      {/* Modal for selected property details */}
      {selectedProperty && (
        <PropertyCardDetail
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
      {/* modal for add property
       */}
      {showAddModal && (
        <AddPropertyCard onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default Properties;
