import React from "react";
import { PlusIcon } from "lucide-react";
import PropertyCard from "../../components/Properties/PropertyCard";
import PropertyCardDetail from "../../components/Properties/PropertyCardDetail";
import AddPropertyCard from "../../components/Properties/AddPropertyCard";
import { getProperties } from "../../utils/api";

const Properties = () => {
  const [properties, setProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const fetchProperties = () => {
    setLoading(true);
    getProperties()
      .then((data) => {
        setProperties(data);
        setError(null);
      })
      .catch((err) => setError(err.message || "Failed to load properties"))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    setLoading(true);
    getProperties()
      .then((data) => {
        setProperties(data);
        setError(null);
      })
      .catch((err) => setError(err.message || "Failed to load properties"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
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
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading properties...
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : properties.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No properties found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={setSelectedProperty}
            />
          ))}
        </div>
      )}
      {selectedProperty && (
        <PropertyCardDetail
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
      {showAddModal && (
        <AddPropertyCard
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchProperties}
        />
      )}
    </div>
  );
};

export default Properties;
