import React from "react";
import { PlusIcon } from "lucide-react";
import PropertyCard from "../../components/Properties/PropertyCard";
import PropertyCardDetail from "../../components/Properties/PropertyCardDetail";
import AddPropertyCard from "../../components/Properties/AddPropertyCard";
import { getProperties, deleteProperty } from "../../utils/api";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const Properties = () => {
  const [properties, setProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [editProperty, setEditProperty] = React.useState(null);
  const [propertyToDelete, setPropertyToDelete] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

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
    fetchProperties();
  }, []);

  const handleEdit = (property) => {
    setEditProperty(property);
    setShowAddModal(true);
    // selectedProperty remains until modal opens
  };

  const handleDelete = (property) => {
    setPropertyToDelete(property);
  };

  const cancelDelete = () => {
    setPropertyToDelete(null);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProperty(propertyToDelete._id || propertyToDelete.id);
      toast.success("Property deleted successfully");
      setSelectedProperty(null);
      setPropertyToDelete(null);
      fetchProperties();
    } catch (err) {
      toast.error(err.message || "Failed to delete property");
    } finally {
      setIsDeleting(false);
    }
  };

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
          onEdit={() => handleEdit(selectedProperty)}
          onDeleteConfirm={() => handleDelete(selectedProperty)}
        />
      )}
      {showAddModal && (
        <AddPropertyCard
          onClose={() => {
            setShowAddModal(false);
            setEditProperty(null);
          }}
          onSuccess={() => {
            fetchProperties();
            setShowAddModal(false);
            setEditProperty(null);
          }}
          property={editProperty}
          setProperty={setEditProperty}
        />
      )}
      {propertyToDelete && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex items-center mb-4 text-yellow-700">
              <Trash2 className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">Confirm Delete</h3>
            </div>
            <p className="mb-6">
              Are you sure you want to delete '{propertyToDelete.name}'?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
