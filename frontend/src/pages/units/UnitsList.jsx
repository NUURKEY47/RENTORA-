import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllUnits, deleteUnit } from "../../api/unitService";
import toast from "react-hot-toast";
import UnitForm from "./UnitForm";
import { PlusIcon, HomeIcon, PencilIcon, TrashIcon, CurrencyDollarIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";

export default function UnitsList() {
  const { role } = useContext(AuthContext);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    setLoading(true);
    try {
      const res = await getAllUnits();
      setUnits(res.data?.data || res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load units");
    } finally {
      setLoading(false);
    }
  };

  const filteredUnits = units.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    const matchesProperty = propertyFilter === "all" || u.propertyId.toString() === propertyFilter;
    return matchesSearch && matchesStatus && matchesProperty;
  });

  const uniqueProperties = Array.from(new Set(units.map(u => u.propertyId))).map(id => {
    return units.find(u => u.propertyId === id)?.property;
  }).filter(p => p);

  const handleCreateNew = () => {
    setEditingUnit(null);
    setShowForm(true);
  };

  const handleEdit = (unit) => {
    setEditingUnit(unit);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this unit? It must be 'available'.")) return;
    try {
      await deleteUnit(id);
      toast.success("Unit deleted successfully");
      fetchUnits();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete unit");
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchUnits();
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Units Management</h1>
          {(role === "ADMIN" || role === "LANDLORD") && (
            <button
              onClick={handleCreateNew}
              className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Unit
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50/50 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">All Units</h2>
                <p className="text-sm text-gray-500 mt-1">Manage individual property units and availability.</p>
              </div>
              <div className="flex items-center space-x-2 text-sm font-medium">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {filteredUnits.length} Units Found
                </span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search unit name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <PlusIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5 rotate-45 transform" />
              </div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
              >
                <option value="all">All Properties</option>
                {uniqueProperties.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading units...</div>
          ) : units.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No units found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Unit</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Property</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredUnits.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 border ${
                            u.status === 'available' ? 'bg-green-50 border-green-100 text-green-600' : 
                            u.status === 'occupied' ? 'bg-blue-50 border-blue-100 text-blue-600' : 
                            'bg-gray-50 border-gray-100 text-gray-600'
                          }`}>
                            <HomeIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="font-bold">{u.name}</div>
                            <div className="text-xs text-gray-400 flex items-center">
                              <Square3Stack3DIcon className="h-3 w-3 mr-1" />
                              {u.size || "Standard"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {u.property?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="h-4 w-4 mr-0.5 text-gray-400" />
                          {u.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                          u.status === 'available' ? 'bg-green-100 text-green-800' : 
                          u.status === 'occupied' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {(role === "ADMIN" || role === "LANDLORD") && (
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => handleEdit(u)} className="p-2 text-gray-400 hover:text-blue-600 transition" title="Edit">
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleDelete(u.id)} className="p-2 text-gray-400 hover:text-red-600 transition" title="Delete">
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
        <UnitForm
          unit={editingUnit}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </>
  );
}
