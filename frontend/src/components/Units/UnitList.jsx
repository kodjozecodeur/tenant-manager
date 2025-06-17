import React from "react";
import { getUnits } from "../../utils/unitApi";

const UnitList = ({ onAdd, onSelect }) => {
  const [units, setUnits] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    getUnits()
      .then(setUnits)
      .catch((err) => setError(err.message || "Failed to load units"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Units</h1>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Unit
        </button>
      </div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading units...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : units.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No units found.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {units.map((unit) => (
            <div
              key={unit._id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow cursor-pointer"
              onClick={() => onSelect(unit)}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {unit.unitName}{" "}
                <span className="text-xs text-gray-500">({unit.code})</span>
              </h2>
              <p className="text-gray-600 mb-1">
                Property: {unit.property?.name || "-"}
              </p>
              <p className="text-gray-600 mb-1">Rent: ${unit.rent}</p>
              <p className="text-gray-500 text-sm">{unit.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnitList;
