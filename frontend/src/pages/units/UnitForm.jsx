import { useState, useEffect } from "react";
import { createUnit, updateUnit } from "../../api/unitService";
import { getAllProperties } from "../../api/propertyService";
import toast from "react-hot-toast";
import { HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
        unitType: unit.unitType || "stall",
        listingType: unit.listingType || "rent",
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
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between shrink-0 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <HomeIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-extrabold tracking-tight">
              {unit ? "Edit Unit / Stall" : "Add Unit / Stall"}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Unit / Stall Code
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Stall G-14 or Apt 101"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Monthly Price (KES)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 45000"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Unit / Space Type
              </label>
              <select
                name="unitType"
                value={formData.unitType || "stall"}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
              >
                <option value="stall">Commercial Stall</option>
                <option value="shop">Retail Shop</option>
                <option value="office">Office Suite</option>
                <option value="apartment">Residential Apartment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Listing Model
              </label>
              <select
                name="listingType"
                value={formData.listingType || "rent"}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
              >
                <option value="rent">For Rent (Monthly)</option>
                <option value="sale">For Sale (Outright)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Property / Plaza
              </label>
              <select
                name="propertyId"
                value={formData.propertyId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
                required
              >
                <option value="">Select Property</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.location})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
              >
                <option value="available">Available / Vacant</option>
                <option value="occupied">Occupied</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Size / Dimensions (Optional)
            </label>
            <input
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="e.g. 650 sqft or Ground Floor Retail"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Image URL (Optional)
            </label>
            <input
              name="image1"
              value={formData.image1}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Stall or apartment details..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition outline-none font-medium text-slate-900 text-sm"
              rows={2}
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
              {loading ? "Processing..." : unit ? "Update Unit" : "Create Unit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
