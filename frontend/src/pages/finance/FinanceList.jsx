import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getAllInvoices } from '../../api/invoiceService';
import InvoiceFormModal from './InvoiceFormModal';
import toast from 'react-hot-toast';
import { 
  DocumentTextIcon, 
  PlusIcon, 
  BanknotesIcon, 
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

export default function FinanceList() {
  const { role } = useContext(AuthContext);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchInvoices();
  }, [statusFilter]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const params = statusFilter !== 'ALL' ? { status: statusFilter } : {};
      const res = await getAllInvoices(params);
      setInvoices(res.data?.data || res.data || []);
    } catch (err) {
      toast.error('Failed to load invoice records');
    } finally {
      setLoading(false);
    }
  };

  // Stats calculation
  const totalBilled = invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const paidCount = invoices.filter(i => i.status === 'PAID').length;
  const pendingCount = invoices.filter(i => i.status === 'PENDING').length;
  const overdueCount = invoices.filter(i => i.status === 'OVERDUE').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Finance & Rent Invoices</h1>
          <p className="text-slate-500 text-sm mt-1">Issue digital rent bills, track tenant debt, and monitor payments.</p>
        </div>

        {(role === 'ADMIN' || role === 'LANDLORD') && (
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/25 shrink-0"
          >
            <PlusIcon className="h-4 w-4 stroke-[3]" />
            <span>Issue Rent Invoice</span>
          </button>
        )}
      </div>

      {/* Summary Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <BanknotesIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Billed</p>
            <p className="text-lg font-black text-slate-900">KES {totalBilled.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircleIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paid Bills</p>
            <p className="text-lg font-black text-emerald-600">{paidCount} Invoices</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <ClockIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Bills</p>
            <p className="text-lg font-black text-amber-600">{pendingCount} Invoices</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <ExclamationCircleIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overdue Bills</p>
            <p className="text-lg font-black text-rose-600">{overdueCount} Invoices</p>
          </div>
        </div>
      </div>

      {/* Filter & Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">All Rent Bills</h2>

          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-4 w-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">🟡 Pending</option>
              <option value="PAID">🟢 Paid</option>
              <option value="OVERDUE">🔴 Overdue</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 font-medium">Loading rent invoices...</div>
        ) : invoices.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-medium">No rent invoices issued yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Invoice ID</th>
                  <th className="py-4 px-6">Tenant Recipient</th>
                  <th className="py-4 px-6">Unit / Stall</th>
                  <th className="py-4 px-6">Amount (KES)</th>
                  <th className="py-4 px-6">Due Date</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium">
                {invoices.map((inv) => {
                  let badge = "bg-amber-50 text-amber-700 border-amber-200";
                  if (inv.status === "PAID") badge = "bg-emerald-50 text-emerald-700 border-emerald-200";
                  if (inv.status === "OVERDUE") badge = "bg-rose-50 text-rose-700 border-rose-200";

                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-6 font-mono font-bold text-indigo-600">#INV-{inv.id}</td>
                      <td className="py-4 px-6 font-bold text-slate-900">{inv.user?.name || "Tenant"}</td>
                      <td className="py-4 px-6 font-semibold text-slate-700">
                        {inv.unit?.name || "Stall/Unit"} ({inv.unit?.property?.name || "Property"})
                      </td>
                      <td className="py-4 px-6 font-black text-slate-900">KES {inv.amount?.toLocaleString()}</td>
                      <td className="py-4 px-6 text-slate-500">{new Date(inv.dueDate).toLocaleDateString()}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold border uppercase tracking-wider ${badge}`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <InvoiceFormModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchInvoices}
        />
      )}
    </div>
  );
}
