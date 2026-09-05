import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllTenants, deleteTenant } from "../../api/tenantService";
import TenantForm from "./TenantForm";
import toast from "react-hot-toast";
import {
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function TenantsList() {
  const { role } = useContext(AuthContext);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const res = await getAllTenants();
      const list = res.data?.data || res.data || [];
      setTenants(list);
      setError(null);
    } catch (err) {
      setError("Failed to load tenants");
      toast.error("Failed to load tenants");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingTenant(null);
    setShowForm(true);
  };

  const handleEdit = (tenant) => {
    setEditingTenant(tenant);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;
    try {
      await deleteTenant(id);
      toast.success("Tenant deleted successfully");
      fetchTenants();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete tenant");
    }
  };

  const handleFormSuccess = () => {
    fetchTenants();
  };

  const uniqueProperties = Array.from(
    new Map(
      tenants
        .filter((t) => t.unit?.property)
        .map((t) => [t.unit.property.id, t.unit.property])
    ).values()
  );

  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      (t.phone && t.phone.toLowerCase().includes(search.toLowerCase()));

    const matchesProperty =
      propertyFilter === "all" ||
      (t.unit?.propertyId && t.unit.propertyId.toString() === propertyFilter);

    return matchesSearch && matchesProperty;
  });

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <UserGroupIcon className="h-7 w-7 text-indigo-600" />
              Tenants & Traders Directory
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage residents, commercial plaza stall occupants, and contact details.
            </p>
          </div>
          {(role === "ADMIN" || role === "LANDLORD") && (
            <button
              onClick={handleCreate}
              className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/25 shrink-0"
            >
              <PlusIcon className="h-4 w-4 stroke-[3]" />
              <span>Onboard New Tenant</span>
            </button>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, email or phone..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600 transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600 transition"
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
              >
                <option value="all">All Properties</option>
                {uniqueProperties.map((p) => (
                  <option key={p.id} value={p.id.toString()}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500 font-medium">
              Loading tenants...
            </div>
          ) : error ? (
            <div className="p-12 text-center text-rose-600 font-medium">{error}</div>
          ) : tenants.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-medium">
              No tenants found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Tenant Name</th>
                    <th className="py-4 px-6">Email</th>
                    <th className="py-4 px-6">Assigned Unit</th>
                    <th className="py-4 px-6">Created / Managed By</th>
                    <th className="py-4 px-6">Phone</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium">
                  {filteredTenants.map((t) => {
                    const creatorName = t.manager?.name || t.unit?.property?.landlord?.name || "Super Admin";
                    const creatorRole = t.manager?.role || (t.unit?.property?.landlord ? "LANDLORD" : "ADMIN");

                    return (
                      <tr key={t.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-4 px-6 font-bold text-slate-900">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                              <UserIcon className="h-4 w-4" />
                            </div>
                            <span>{t.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-600">{t.email}</td>
                        <td className="py-4 px-6">
                          {t.unit ? (
                            <Link
                              to="/units"
                              className="text-indigo-600 hover:underline font-extrabold"
                            >
                              {t.unit.name} ({t.unit.property?.name || "Property"})
                            </Link>
                          ) : (
                            <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">
                              Unassigned
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-extrabold text-slate-900">{creatorName}</span>
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">
                              {creatorRole}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-600">{t.phone || "-"}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold border uppercase tracking-wider ${
                            t.unit ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}>
                            {t.unit ? "Assigned" : "Unassigned"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          {(role === "ADMIN" || role === "LANDLORD") && (
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleEdit(t)}
                                className="p-1.5 text-slate-400 hover:text-indigo-600 transition rounded-lg hover:bg-slate-100"
                                title="Edit"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(t.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-slate-100"
                                title="Delete"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <TenantForm
          tenant={editingTenant}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </>
  );
}
