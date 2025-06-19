import React, { useEffect, useState } from "react";
import PaymentsTable from "../../components/Payments/PaymentsTable";
import AddPaymentModal from "../../components/Payments/AddPaymentModal";
import EditPaymentModal from "../../components/Payments/EditPaymentModal";
import ViewPaymentModal from "../../components/Payments/ViewPaymentModal";
import PaymentStatsCard from "../../components/Payments/PaymentStatsCard";
import {
  getPayments,
  addPayment,
  updatePayment,
  deletePayment,
} from "../../utils/paymentsApi";
import { getTenants } from "../../utils/api";
import { toast } from "react-toastify";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(null);
  const [showView, setShowView] = useState(null);
  const [tenants, setTenants] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [p, t] = await Promise.all([getPayments(), getTenants()]);
      setPayments(p);
      setTenants(t);
    } catch {
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (data) => {
    try {
      await addPayment(data);
      toast.success("Payment added");
      setShowAdd(false);
      fetchData();
    } catch {
      toast.error("Failed to add payment");
    }
  };

  const handleEdit = async (data) => {
    try {
      await updatePayment(data._id, data);
      toast.success("Payment updated");
      setShowEdit(null);
      fetchData();
    } catch {
      toast.error("Failed to update payment");
    }
  };

  const handleDelete = async (payment) => {
    if (!window.confirm("Delete this payment?")) return;
    try {
      await deletePayment(payment._id);
      toast.success("Payment deleted");
      fetchData();
    } catch {
      toast.error("Failed to delete payment");
    }
  };

  // Payment stats
  const paid = payments.filter(
    (p) => p.status?.toLowerCase() === "paid"
  ).length;
  const pending = payments.filter(
    (p) => p.status?.toLowerCase() === "pending"
  ).length;
  const failed = payments.filter(
    (p) => p.status?.toLowerCase() === "failed"
  ).length;
  const total = payments.length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setShowAdd(true)}
        >
          Add Payment
        </button>
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 mb-6">
        <PaymentStatsCard title="Paid" value={paid} type="paid" />
        <PaymentStatsCard title="Pending" value={pending} type="pending" />
        <PaymentStatsCard title="Failed" value={failed} type="failed" />
        <PaymentStatsCard title="Total" value={total} type="total" />
      </div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <PaymentsTable
          payments={payments}
          onView={setShowView}
          onEdit={setShowEdit}
          onDelete={handleDelete}
        />
      )}
      {showAdd && (
        <AddPaymentModal
          tenants={tenants}
          onSave={handleAdd}
          onClose={() => setShowAdd(false)}
        />
      )}
      {showEdit && (
        <EditPaymentModal
          payment={showEdit}
          tenants={tenants}
          onSave={handleEdit}
          onClose={() => setShowEdit(null)}
        />
      )}
      {showView && (
        <ViewPaymentModal
          payment={showView}
          onClose={() => setShowView(null)}
        />
      )}
    </div>
  );
};

export default Payments;
