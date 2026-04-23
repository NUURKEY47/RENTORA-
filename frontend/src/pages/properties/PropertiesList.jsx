import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllProperties, deleteProperty } from "../../api/propertyService";
import toast from "react-hot-toast";
import PropertyForm from "./PropertyForm";
import AssignLandlordModal from "./AssignLandlordModal";
import { PlusIcon, BuildingOfficeIcon, PencilIcon, TrashIcon, MapPinIcon, UserPlusIcon } from "@heroicons/react/24/outline";

export default function PropertiesList() {
  const { role } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [assigningProperty, setAssigningProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await getAllProperties();
      setProperties(res.data?.data || res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingProperty(null);
    setShowForm(true);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property? It must have no units associated.")) return;
    try {
      await deleteProperty(id);
      toast.success("Property deleted successfully");
      fetchProperties();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete property");
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchProperties();
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Properties Management</h1>
          {(role === "ADMIN" || role === "LANDLORD") && (
            <button
              onClick={handleCreateNew}
              className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Property
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">All Properties</h2>
            <p className="text-sm text-gray-500 mt-1">Manage all your real estate assets here.</p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading properties...</div>
          ) : properties.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No properties found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Property</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Landlord</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {properties.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mr-3 border border-blue-100">
                            <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-bold">{p.name}</div>
                            <div className="text-xs text-gray-400">ID: {p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                          {p.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {p.category?.name || "Standard"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {p.landlord ? (
                          <div className="flex items-center text-blue-700 font-medium bg-blue-50 px-2.5 py-1 rounded-full w-fit border border-blue-100">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                            {p.landlord.name}
                          </div>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-400 border border-gray-200 uppercase tracking-wider">
                            Unassigned
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {(role === "ADMIN" || role === "LANDLORD") && (
                          <div className="flex justify-end space-x-2">
                             {role === "ADMIN" && (
                               <button 
                                 onClick={() => setAssigningProperty(p)} 
                                 className="p-2 text-gray-400 hover:text-emerald-600 transition" 
                                 title="Assign Landlord"
                               >
                                 <UserPlusIcon className="h-5 w-5" />
                               </button>
                             )}
                             <button onClick={() => handleEdit(p)} className="p-2 text-gray-400 hover:text-blue-600 transition" title="Edit">
                               <PencilIcon className="h-5 w-5" />
                             </button>
                             <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-600 transition" title="Delete">
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
        <PropertyForm
          property={editingProperty}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
      {assigningProperty && (
        <AssignLandlordModal
          property={assigningProperty}
          onClose={() => setAssigningProperty(null)}
          onSuccess={() => {
            setAssigningProperty(null);
            fetchProperties();
          }}
        />
      )}
    </>
  );
}
