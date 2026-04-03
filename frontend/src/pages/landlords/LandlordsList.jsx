import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getLandlords, deleteLandlord } from "../../api/landlordService";
import toast from "react-hot-toast";
import LandlordForm from "./LandlordForm";
import { PlusIcon, UserIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function LandlordsList() {
  const { role } = useContext(AuthContext);
  const [landlords, setLandlords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLandlord, setEditingLandlord] = useState(null);

  useEffect(() => {
    fetchLandlords();
  }, []);

  const fetchLandlords = async () => {
    setLoading(true);
    try {
      const res = await getLandlords();
      setLandlords(res.data?.data || res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load landlords");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingLandlord(null);
    setShowForm(true);
  };

  const handleEdit = (landlord) => {
    setEditingLandlord(landlord);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this landlord?")) return;
    try {
      await deleteLandlord(id);
      toast.success("Landlord deleted successfully");
      fetchLandlords();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete landlord");
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchLandlords();
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Landlords Management</h1>
          {role === "ADMIN" && (
            <button
              onClick={handleCreateNew}
              className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Landlord
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">All Landlords</h2>
            <p className="text-sm text-gray-500 mt-1">
              View and manage property owners and their account details.
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading landlords...</div>
          ) : landlords.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No landlords found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Managed By</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {landlords.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <UserIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          {l.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{l.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {l.manager ? l.manager.name : "System"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(l)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition"
                            title="Edit"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(l.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition"
                            title="Delete"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
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
        <LandlordForm
          landlord={editingLandlord}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </>
  );
}
