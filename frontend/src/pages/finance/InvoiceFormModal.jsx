import { useState, useEffect } from "react";
import { createInvoice } from "../../api/invoiceService";
import { getAllUnits } from "../../api/unitService";
import { getAllTenants } from "../../api/tenantService";
import toast from "react-hot-toast";
import { DocumentTextIcon, XMarkIcon, CalendarIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default function InvoiceFormModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    amount: "",
    dueDate: "",
    userId: "",
    unitId: "",
  });
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const [unitsRes, tenantsRes] = await Promise.all([
        getAllUnits(),
        getAllTenants()
      ]);
      
      const allUnits = unitsRes.data?.data || unitsRes.data || [];
      const allTenants = tenantsRes.data?.data || tenantsRes.data || [];
      
      setUnits(allUnits);
      setTenants(allTenants);
    } catch (err) {
      toast.error("Failed to load tenants or units");
    }
  };

  const handleTenantChange = (e) => {
    const selectedUserId = e.target.value;
    if (!selectedUserId) {
      setFormData({ ...formData, userId: "", unitId: "", amount: "" });
      return;
    }

    // Find assigned unit for this tenant if any
    const tenantIdNum = parseInt(selectedUserId, 10);
    const assignedUnit = units.find(u => u.tenants?.some(t => t.id === tenantIdNum));

    if (assignedUnit) {
      setFormData({
        ...formData,
        userId: selectedUserId,
        unitId: String(assignedUnit.id),
        amount: String(assignedUnit.price || ""),
      });
      toast.success(`Auto-linked ${assignedUnit.name} (KES ${assignedUnit.price?.toLocaleString()})`);
    } else {
      setFormData({ ...formData, userId: selectedUserId });
    }
  };

  const handleChange = (e) => {
    // If unit is manually changed, auto-fill unit's price
    if (e.target.name === 'unitId') {
      const selectedUnit = units.find(u => String(u.id) === String(e.target.value));
      setFormData({ 
        ...formData, 
        unitId: e.target.value,
        amount: selectedUnit ? String(selectedUnit.price || "") : formData.amount 
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createInvoice({
        amount: parseFloat(formData.amount),
        dueDate: formData.dueDate,
        userId: parseInt(formData.userId, 10),
        unitId: parseInt(formData.unitId, 10),
      });
      toast.success("Rent invoice issued successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to issue invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between shrink-0 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <DocumentTextIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-extrabold tracking-tight">Issue Rent Invoice</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Tenant Recipient
            </label>
            <select
              name="userId"
              value={formData.userId}
              onChange={handleTenantChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none text-sm font-medium"
              required
            >
              <option value="">-- Choose Tenant --</option>
              {tenants.map((t) => {
                const assignedUnit = units.find(u => u.tenants?.some(tenant => tenant.id === t.id));
                return (
                  <option key={t.id} value={t.id} disabled={!assignedUnit}>
                    👤 {t.name} — {assignedUnit ? `Assigned to ${assignedUnit.name}` : '⚠️ (Unassigned - Assign to unit first)'}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Stall / Unit
            </label>
            <select
              name="unitId"
              value={formData.unitId}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none text-sm font-medium"
              required
            >
              <option value="">-- Choose Unit --</option>
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  🏢 {u.name} ({u.property?.name || "Property"}) - KES {u.price?.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Invoice Amount (KES)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g. 45000"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none text-sm font-medium"
                required
              />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/25 disabled:opacity-70"
            >
              {loading ? "Issuing Bill..." : "Issue Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
