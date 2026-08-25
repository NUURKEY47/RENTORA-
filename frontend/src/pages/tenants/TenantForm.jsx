import { useState, useEffect } from "react";
import { createTenant, updateTenant } from "../../api/tenantService";
import { getAllUnits } from "../../api/unitService";
import { getAllProperties } from "../../api/propertyService";
import toast from "react-hot-toast";
import { UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function TenantForm({ tenant, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    unitId: "",
    idNumber: "",
    occupation: "",
    contract: "",
    status: "active",
  });
  const [units, setUnits] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await getAllUnits();
        setUnits(res.data?.data || res.data || []);
      } catch (err) {
        toast.error("Failed to load units");
      }
    };

    const fetchProperties = async () => {
      try {
        const res = await getAllProperties();
        setProperties(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Failed to load properties:", err);
      }
    };

    fetchUnits();
    fetchProperties();

    if (tenant) {
      setFormData({
        name: tenant.name || "",
        email: tenant.email || "",
        password: "",
        phone: tenant.phone || "",
        unitId: tenant.unitId || "",
        idNumber: tenant.idNumber || "",
        occupation: tenant.occupation || "",
        contract: tenant.contract || "",
        status: tenant.status || "active",
      });
    }
  }, [tenant]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData };
      if (payload.unitId) {
        payload.unitId = parseInt(payload.unitId, 10);
      } else {
        delete payload.unitId;
      }

      if (tenant) {
        if (!payload.password) delete payload.password;
        await updateTenant(tenant.id, payload);
        toast.success("Tenant updated successfully!");
      } else {
        await createTenant(payload);
        toast.success("Tenant created successfully!");
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const filteredUnits = selectedPropertyId === "all"
    ? units
    : units.filter(u => String(u.propertyId) === String(selectedPropertyId));

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between shrink-0 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-extrabold tracking-tight">
              {tenant ? "Edit Tenant Profile" : "Onboard Tenant / Trader"}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {tenant ? "New Password (optional)" : "Password"}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={tenant ? "Leave blank to keep current" : "Min 8 chars"}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
                required={!tenant}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number (for M-Pesa)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+254..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Filter Property
              </label>
              <select
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
              >
                <option value="all">All Properties</option>
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Assign Unit / Stall
              </label>
              <select
                name="unitId"
                value={formData.unitId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
              >
                <option value="">-- Unassigned --</option>
                {filteredUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.property?.name || "Property"}) - KES {u.price?.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                National ID / Alien Card
              </label>
              <input
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="e.g. 12345678"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Occupation / Business
              </label>
              <input
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="e.g. Retail Trader"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
              />
            </div>
          </div>

          {/* Sticky Bottom Actions */}
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
              className={`px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/25 ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : tenant ? "Update Tenant" : "Onboard Tenant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
