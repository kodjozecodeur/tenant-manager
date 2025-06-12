import React from "react";
import { Calculator, Calendar, MapPin, Users, Wrench } from "lucide-react";
import { mockTenants } from "../../data/mockTenants";

// Accept props as an object and destructure property from props
const PropertyCard = ({ property, onClick }) => {
  // Find tenant name by tenantId
  const tenant = property.tenantId
    ? mockTenants.find((t) => t.id === property.tenantId)
    : null;
  return (
    <button
      type="button"
      onClick={() => onClick(property)}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow cursor-pointer text-left w-full"
    >
      <img
        src={
          (property.photos &&
            property.photos.length > 0 &&
            property.photos[0]) ||
          property.image ||
          "https://via.placeholder.com/300x200"
        }
        alt={property.name || "Property"}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {property.name || "House 1"}
          </h3>
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
              property.status === "vacant"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {property.status || "taken"}
          </span>
        </div>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm truncate">
            {property.address || "123 Roadhouse"}
          </span>
        </div>
        {/* Show linked units */}
        <div className="mb-2">
          <span className="text-xs font-medium text-gray-500">Units:</span>
          {property.units && property.units.length > 0 ? (
            <ul className="ml-2 list-disc list-inside">
              {property.units.map((unit) => (
                <li key={unit._id || unit.id} className="text-xs text-gray-700">
                  {unit.unitName}
                </li>
              ))}
            </ul>
          ) : (
            <span className="ml-2 text-xs text-gray-400">
              No units available
            </span>
          )}
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{property.lastUpdated || "Updated"}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {tenant ? tenant.name : "No tenant"}
            </span>
          </div>
          <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <Calculator className="w-4 h-4 mr-1" />
            <span className="text-sm">
              ${property.rentAmount?.toLocaleString() || "-"}/month
            </span>
          </div>
          <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <Wrench className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.type || "maintenance"}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default PropertyCard;
