import React from "react";
import UnitList from "../../components/Units/UnitList";
import AddUnitCard from "../../components/Units/AddUnitCard";
import UnitDetail from "../../components/Units/UnitDetail";
import { getProperties } from "../../utils/api";
import ErrorBoundary from "../../components/ErrorBoundary";

const Units = () => {
  const [showAdd, setShowAdd] = React.useState(false);
  const [selectedUnit, setSelectedUnit] = React.useState(null);
  const [properties, setProperties] = React.useState([]);

  React.useEffect(() => {
    getProperties().then(setProperties);
  }, []);

  const handleSuccess = () => {
    setShowAdd(false);
    setSelectedUnit(null);
    // Optionally, trigger a refresh in UnitList via a key or state
  };

  return (
    <ErrorBoundary>
      <div>
        <UnitList onAdd={() => setShowAdd(true)} onSelect={setSelectedUnit} />
        {showAdd && (
          <AddUnitCard
            onClose={() => setShowAdd(false)}
            onSuccess={handleSuccess}
            properties={properties}
          />
        )}
        {selectedUnit && (
          <UnitDetail
            unit={selectedUnit}
            onClose={() => setSelectedUnit(null)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Units;
