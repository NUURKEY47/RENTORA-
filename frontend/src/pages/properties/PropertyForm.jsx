import { useState, useContext, useEffect } from "react";
import { createProperty, updateProperty, getCategories } from "../../api/propertyService";
import { getLandlords } from "../../api/landlordService";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { BuildingOfficeIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function PropertyForm({ property, onClose, onSuccess }) {
  const { role } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    categoryId: "",
    landlordId: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [landlords, setLandlords] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    if (property) {
      setFormData({
        name: property.name || "",
        location: property.location || "",
        categoryId: property.categoryId || "",
        landlordId: property.landlordId || "",
        description: property.description || "",
      });
    }

    if (role === "ADMIN") {
      fetchLandlords();
    }
  }, [property, role]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchLandlords = async () => {
    try {
      const res = await getLandlords();
      setLandlords(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Failed to fetch landlords:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId) {
      toast.error("Please select a category");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        location: formData.location,
        categoryId: parseInt(formData.categoryId, 10),
      };

      if (formData.landlordId) {
        payload.landlordId = parseInt(formData.landlordId, 10);
      }

      if (formData.description) {
        payload.description = formData.description;
      }

      if (property) {
        await updateProperty(property.id, payload);
        toast.success("Property updated successfully!");
      } else {
        await createProperty(payload);
        toast.success("Property created successfully!");
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
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between shrink-0 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BuildingOfficeIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-extrabold tracking-tight">
              {property ? "Edit Property / Plaza" : "Add Property / Plaza"}
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
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Property / Plaza Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Amal Plaza or Azure Heights"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Eastleigh 1st Ave"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {role === "ADMIN" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Assigned Landlord / Agent (Optional)
              </label>
              <select
                name="landlordId"
                value={formData.landlordId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
              >
                <option value="">-- Unassigned --</option>
                {landlords.map((landlord) => (
                  <option key={landlord.id} value={landlord.id}>
                    {landlord.name} ({landlord.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional property details..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
              rows={3}
            />
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
              {loading ? "Processing..." : property ? "Update Property" : "Create Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
