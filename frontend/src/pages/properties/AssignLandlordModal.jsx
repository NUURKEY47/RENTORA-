import { useState, useEffect } from "react";
import { getLandlords } from "../../api/landlordService";
import { assignLandlord } from "../../api/propertyService";
import { XMarkIcon, UserIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between shrink-0 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BuildingOfficeIcon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-extrabold tracking-tight">Assign Landlord / Agent</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Assigning a landlord/agent to <span className="font-bold text-slate-900">{property.name}</span> grants them full management access over this property.
          </p>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Select Landlord</label>
            {loading ? (
              <div className="py-6 text-center text-xs font-bold text-slate-400">Loading landlords...</div>
            ) : (
              <div className="grid gap-2 max-h-60 overflow-y-auto pr-1">
                {landlords.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLandlord(l.id)}
                    className={`flex items-center p-3.5 border rounded-xl transition text-left ${
                      selectedLandlord === l.id 
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100' 
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center mr-3 shrink-0 ${
                      selectedLandlord === l.id ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      <UserIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 text-sm truncate">{l.name}</div>
                      <div className="text-xs text-slate-500 truncate">{l.email}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky Actions Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl transition uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={submitting}
            className={`flex-1 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/25 uppercase tracking-wider ${
              submitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Assigning..." : "Confirm Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
}
