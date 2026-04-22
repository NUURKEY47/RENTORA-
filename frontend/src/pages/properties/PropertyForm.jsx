import { useState, useContext, useEffect } from "react";
import { createProperty, updateProperty, getCategories } from "../../api/propertyService";
import { getLandlords } from "../../api/landlordService";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

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
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all scale-100">
        <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {property ? "Edit Property" : "Add New Property"}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition text-2xl focus:outline-none">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Property Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none bg-white"
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Landlord (optional)</label>
              <select
                name="landlordId"
                value={formData.landlordId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none bg-white font-medium"
              >
                <option value="">-- Unassigned --</option>
                {landlords.map((landlord) => (
                  <option key={landlord.id} value={landlord.id}>
                    {landlord.name} ({landlord.email})
                  </option>
                ))}
              </select>

              <p className="text-[10px] text-gray-400 mt-1 italic uppercase tracking-wider pl-1">
                Selected Landlord will be assigned to this property
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description (optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium">
              Cancel
            </button>
            <button type="submit" disabled={loading} className={`px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-100 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
              {loading ? "Processing..." : property ? "Update Property" : "Create Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
