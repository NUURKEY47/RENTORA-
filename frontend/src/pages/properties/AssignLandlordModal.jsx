import { useState, useEffect } from "react";
import { getLandlords } from "../../api/landlordService";
import { assignLandlord } from "../../api/propertyService";
import { XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function AssignLandlordModal({ property, onClose, onSuccess }) {
  const [landlords, setLandlords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLandlord, setSelectedLandlord] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLandlords();
  }, []);

  const fetchLandlords = async () => {
    try {
      const res = await getLandlords();
      setLandlords(res.data?.data || res.data || []);
    } catch (err) {
      toast.error("Failed to load landlords");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedLandlord) {
      return toast.error("Please select a landlord");
    }

    setSubmitting(true);
    try {
      await assignLandlord(property.id, selectedLandlord);
      toast.success("Landlord assigned successfully");
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign landlord");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Assign Landlord</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-500 mb-6">
            Assigning a landlord to <span className="font-bold text-gray-900">{property.name}</span> will grant them full management rights over this property.
          </p>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Select Landlord</label>
            {loading ? (
              <div className="py-4 text-center text-gray-400">Loading landlords...</div>
            ) : (
              <div className="grid gap-2 max-h-60 overflow-y-auto pr-2">
                {landlords.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLandlord(l.id)}
                    className={`flex items-center p-4 border rounded-xl transition text-left ${
                      selectedLandlord === l.id 
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                      selectedLandlord === l.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <UserIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{l.name}</div>
                      <div className="text-xs text-gray-500">{l.email}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-200 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={submitting || !selectedLandlord}
            className="flex-1 py-2.5 text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition shadow-lg shadow-blue-200 disabled:opacity-50"
          >
            {submitting ? "Assigning..." : "Confirm Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
}
