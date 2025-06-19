import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import MaintenanceStatsCard from "../../components/Maintenance/MaintenanceStatsCard";
import MaintenanceList from "../../components/Maintenance/MaintenanceList";
import {
  getRequests,
  addRequest,
  updateRequest,
} from "../../utils/maintenanceApi";
import { getTenants, getProperties } from "../../utils/api";

const Maintenance = () => {
  const [requests, setRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showAdd, setShowAdd] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [tenants, setTenants] = React.useState([]);
  const [properties, setProperties] = React.useState([]);

  const { register, handleSubmit, reset } = useForm();
  const {
    register: regEdit,
    handleSubmit: subEdit,
    reset: resetEdit,
  } = useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reqs, tnts, props] = await Promise.all([
        getRequests(),
        getTenants(),
        getProperties(),
      ]);
      setRequests(reqs);
      setTenants(tnts);
      setProperties(props);
      setError(null);
    } catch (e) {
      setError(e.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const onAdd = async (data) => {
    try {
      await addRequest(data);
      toast.success("Request added");
      reset();
      setShowAdd(false);
      fetchData();
    } catch (e) {
      toast.error(e.message || "Add failed");
    }
  };

  const onEditSubmit = async (data) => {
    try {
      await updateRequest(selected._id, data);
      toast.success("Request updated");
      resetEdit();
      setShowEdit(false);
      fetchData();
    } catch (e) {
      toast.error(e.message || "Update failed");
    }
  };

  const handleEdit = (req) => {
    setSelected(req);
    resetEdit(req);
    setShowEdit(true);
  };

  const stats = [
    {
      title: "Pending",
      value: requests.filter((r) => r.status === "Pending").length,
      color: "blue",
    },
    {
      title: "In Progress",
      value: requests.filter((r) => r.status === "In Progress").length,
      color: "yellow",
    },
    {
      title: "Completed",
      value: requests.filter((r) => r.status === "Completed").length,
      color: "green",
    },
    { title: "Total", value: requests.length, color: "gray" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Maintenance Requests
        </h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setShowAdd(true)}
        >
          New Request
        </button>
      </div>
      <div className="grid gap-4 grid-cols-4 mb-6">
        {stats.map((s, i) => (
          <MaintenanceStatsCard
            key={i}
            title={s.title}
            value={s.value}
            color={s.color}
          />
        ))}
      </div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <MaintenanceList
          requests={requests}
          onEdit={handleEdit}
          onChange={fetchData}
        />
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            className="bg-white p-6 rounded shadow w-96"
            onSubmit={handleSubmit(onAdd)}
          >
            <h2 className="text-xl mb-4">New Maintenance Request</h2>
            <select {...register("tenant")} className="mb-2 w-full p-2 border">
              <option value="">Select Tenant</option>
              {tenants.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
            <select {...register("unit")} className="mb-2 w-full p-2 border">
              <option value="">Select Unit</option>
              {properties
                .flatMap((p) => p.units || [])
                .map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.unitName}
                  </option>
                ))}
            </select>
            <select
              {...register("issueType")}
              className="mb-2 w-full p-2 border"
            >
              <option value="">Issue Type</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Heating</option>
              <option>Appliances</option>
              <option>Other</option>
            </select>
            <textarea
              {...register("description")}
              placeholder="Description"
              className="mb-2 w-full p-2 border"
            />
            <select
              {...register("priority")}
              className="mb-4 w-full p-2 border"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2"
                onClick={() => setShowAdd(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      {showEdit && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            className="bg-white p-6 rounded shadow w-96"
            onSubmit={subEdit(onEditSubmit)}
          >
            <h2 className="text-xl mb-4">Edit Request</h2>
            <select {...regEdit("status")} className="mb-2 w-full p-2 border">
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <input
              {...regEdit("technician")}
              placeholder="Technician"
              className="mb-2 w-full p-2 border"
            />
            <textarea
              {...regEdit("notes")}
              placeholder="Internal Notes"
              className="mb-4 w-full p-2 border"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
