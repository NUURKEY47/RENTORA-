import { useState, useEffect } from "react";
import { createUnit, updateUnit } from "../../api/unitService";
import { getAllProperties } from "../../api/propertyService";
import toast from "react-hot-toast";

export default function UnitForm({ unit, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    status: "available",
    propertyId: "",
    size: "",
    description: "",
    image1: "",
  });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await getAllProperties();
        setProperties(res.data?.data || res.data || []);
      } catch (err) {
        toast.error("Failed to load properties");
      }
    };
    fetchProperties();

    if (unit) {
      setFormData({
        name: unit.name || "",
        price: unit.price || "",
        status: unit.status || "available",
        propertyId: unit.propertyId || "",
        size: unit.size || "",
        description: unit.description || "",
        image1: unit.image1 || "",
      });
    }
  }, [unit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        propertyId: parseInt(formData.propertyId, 10),
      };

      if (unit) {
        await updateUnit(unit.id, payload);
        toast.success("Unit updated successfully!");
      } else {
        await createUnit(payload);
        toast.success("Unit created successfully!");
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
            {unit ? "Edit Unit" : "Add New Unit"}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition text-2xl focus:outline-none">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Unit Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none"
                placeholder="e.g. A101"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Monthly Price</label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none"
                placeholder="2000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Size/Type</label>
              <input
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none"
                placeholder="e.g. 2 Bedroom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none appearance-none"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Property</label>
            <select
              name="propertyId"
              value={formData.propertyId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none appearance-none"
              required
            >
              <option value="">Select a Property</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.location})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Unit Photo URL</label>
            <input
              name="image1"
              value={formData.image1}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none"
              rows={2}
              placeholder="Brief description of the unit's features..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium">
              Cancel
            </button>
            <button type="submit" disabled={loading} className={`px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-100 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
              {loading ? "Saving..." : unit ? "Update Unit" : "Create Unit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
