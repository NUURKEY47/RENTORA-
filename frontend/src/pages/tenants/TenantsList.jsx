import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllTenants, deleteTenant } from "../../api/tenantService";
import toast from "react-hot-toast";
import TenantForm from "./TenantForm";
import { PlusIcon, UserIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function TenantsList() {
  const { role } = useContext(AuthContext);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("all");

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const res = await getAllTenants();
      setTenants(res.data?.data || res.data || []);
      setError(null);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load tenants";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const filteredTenants = tenants.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProperty = propertyFilter === "all" || t.unit?.propertyId.toString() === propertyFilter;
    return matchesSearch && matchesProperty;
  });

  const uniqueProperties = Array.from(new Set(tenants.map(t => t.unit?.propertyId))).map(id => {
    return tenants.find(t => t.unit?.propertyId === id)?.unit?.property;
  }).filter(p => p);

  const handleCreateNew = () => {
    setEditingTenant(null);
    setShowForm(true);
  };

  const handleEdit = (tenant) => {
    setEditingTenant(tenant);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tenant? The unit will become available.")) return;
    try {
      await deleteTenant(id);
      toast.success("Tenant deleted successfully");
      fetchTenants();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete tenant");
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchTenants();
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Tenants Management
          </h1>
          {(role === "ADMIN" || role === "LANDLORD") && (
            <button
              onClick={handleCreateNew}
              className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Tenant
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50/50 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">All Tenants</h2>
                <p className="text-sm text-gray-500 mt-1">Manage tenants and their unit assignments.</p>
              </div>
              <div className="flex items-center space-x-2 text-sm font-medium">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {filteredTenants.length} Tenants Found
                </span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search name or email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white shadow-sm font-medium"
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
              >
                <option value="all">All Properties</option>
                {uniqueProperties.map(p => (
                  <option key={p.id} value={p.id.toString()}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Loading tenants...
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-600">{error}</div>
          ) : tenants.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No tenants yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Assigned Unit
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredTenants.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <UserIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          {t.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{t.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {t.unit ? (
                          <Link
                            to="/units"
                            className="text-blue-600 hover:underline"
                          >
                            {t.unit.name}
                          </Link>
                        ) : (
                          "Unassigned"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {t.phone || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold rounded-full w-fit uppercase ${
                              t.unit
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {t.unit ? "Assigned" : "Unassigned"}
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold rounded-full w-fit uppercase ${
                              t.status === "active"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {t.status || "Active"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        {(role === "ADMIN" || role === "LANDLORD") && (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(t)}
                              className="p-2 text-gray-400 hover:text-blue-600 transition"
                              title="Edit"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(t.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition"
                              title="Delete"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
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
