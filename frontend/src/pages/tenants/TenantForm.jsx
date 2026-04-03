import { useState, useEffect } from "react";
import { createTenant, updateTenant } from "../../api/tenantService";
import { getAllUnits } from "../../api/unitService";
import { getAllProperties } from "../../api/propertyService";
import toast from "react-hot-toast";

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

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] flex flex-col overflow-hidden transform transition-all scale-100">
        <div className="bg-blue-600 px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-white">
            {tenant ? "Edit Tenant Profile" : "Onboard New Tenant"}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition text-2xl focus:outline-none px-2">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Password {tenant && "(Leave blank to keep)"}
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm"
                required={!tenant}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm"
                placeholder="+1 234 567 890"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">ID / Passport Number</label>
              <input
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm"
                placeholder="ID123456"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Occupation</label>
              <input
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm"
                placeholder="Software Engineer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contract / Documents URL</label>
            <input
              name="contract"
              value={formData.contract}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none text-sm"
              placeholder="https://example.com/lease-agreement.pdf"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Unit Assignment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">1. Building</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-sm"
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                >
                  <option value="all">All Buildings</option>
                  {properties.map(p => (
                    <option key={p.id} value={p.id.toString()}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  2. Select Unit {tenant?.unit?.name && `(Current: ${tenant.unit.name})`}
                </label>
                <select
                  name="unitId"
                  value={formData.unitId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white text-sm"
                >
                  <option value="">Choose Unit</option>
                  {units
                    .filter(u => selectedPropertyId === "all" || u.propertyId.toString() === selectedPropertyId)
                    .map((u) => (
                      <option key={u.id} value={u.id} disabled={u.status === "occupied" && u.id !== tenant?.unitId}>
                        {u.name} - {u.status} {u.id === tenant?.unitId ? "(Current)" : ""}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 shrink-0 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-10 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-100 text-sm ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Saving..." : tenant ? "Update Resident" : "Complete Onboarding"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
