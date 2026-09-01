import React, { useState, useMemo } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { 
  BuildingStorefrontIcon, 
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function StallMatrix({ units = [], properties = [], propertyName = "Commercial Plaza" }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState('ALL'); // 'ALL' | number
  const [selectedFloor, setSelectedFloor] = useState('ALL'); // 'ALL' | 'Ground' | '1st' | '2nd' | '3rd'
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'paid' | 'overdue' | 'vacant'

  // Refinement #5: Debounce search input by 300ms
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filter units by selected property first
  const propertyUnits = useMemo(() => {
    if (selectedPropertyId === 'ALL') return units;
    return units.filter(u => String(u.propertyId) === String(selectedPropertyId));
  }, [units, selectedPropertyId]);

  // Group units by floor & status
  const filteredUnits = useMemo(() => {
    return propertyUnits.filter((unit) => {
      // Name or code search matching
      const matchesSearch = !debouncedSearch || 
        unit.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        unit.tenants?.[0]?.name?.toLowerCase().includes(debouncedSearch.toLowerCase());

      // Status filter matching
      const unitStatus = unit.status === 'available' ? 'vacant' : (unit.invoices?.some(i => i.status === 'overdue') ? 'overdue' : 'paid');
      const matchesStatus = statusFilter === 'ALL' || unitStatus === statusFilter;

      // Floor matching (Extract floor from unit name e.g., "G-12", "F1-04", "F2-10")
      const name = unit.name || '';
      let floorGroup = 'Ground';
      if (name.startsWith('1') || name.toLowerCase().includes('f1') || name.toLowerCase().includes('1st')) floorGroup = '1st';
      if (name.startsWith('2') || name.toLowerCase().includes('f2') || name.toLowerCase().includes('2nd')) floorGroup = '2nd';
      if (name.startsWith('3') || name.toLowerCase().includes('f3') || name.toLowerCase().includes('3rd')) floorGroup = '3rd';

      const matchesFloor = selectedFloor === 'ALL' || floorGroup === selectedFloor;

      return matchesSearch && matchesStatus && matchesFloor;
    });
  }, [propertyUnits, debouncedSearch, statusFilter, selectedFloor]);

  // Statistics calculation for selected property
  const stats = useMemo(() => {
    const total = propertyUnits.length;
    const vacant = propertyUnits.filter(u => u.status === 'available').length;
    const occupied = total - vacant;
    const overdue = propertyUnits.filter(u => u.invoices?.some(i => i.status === 'overdue')).length;
    const paid = Math.max(0, occupied - overdue);
    return { total, vacant, occupied, overdue, paid };
  }, [propertyUnits]);

  // Dynamic Header Title
  const activeTitle = useMemo(() => {
    if (selectedPropertyId === 'ALL') return "All Properties & Plazas";
    const found = properties.find(p => String(p.id) === String(selectedPropertyId));
    return found ? found.name : propertyName;
  }, [selectedPropertyId, properties, propertyName]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
      {/* Header & Stats Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <BuildingStorefrontIcon className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{activeTitle} — Stall Matrix</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">Real-time floor-by-floor stall occupancy and payment status</p>
        </div>

        {/* Legend / Counter Badges */}
        <div className="flex items-center space-x-3 text-xs font-bold">
          <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
            <span>Paid ({stats.paid})</span>
          </div>

          <div className="px-3 py-1.5 bg-rose-50 text-rose-700 rounded-xl border border-rose-200 flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></span>
            <span>Overdue ({stats.overdue})</span>
          </div>

          <div className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-xl border border-amber-200 flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
            <span>Vacant ({stats.vacant})</span>
          </div>
        </div>
      </div>

      {/* Filter Bar (Search Debounced + Floor & Status Pills) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar with Refinement #5 Debounce */}
        <div className="relative w-full sm:w-72">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search stall code or tenant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Property Selector */}
          {properties.length > 0 && (
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="px-3 py-2 bg-indigo-50 border border-indigo-200 text-indigo-900 font-extrabold rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="ALL">All Properties & Plazas</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  🏢 {p.name}
                </option>
              ))}
            </select>
          )}

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="ALL">All Statuses</option>
            <option value="paid">🟢 Paid Only</option>
            <option value="overdue">🔴 Overdue Only</option>
            <option value="vacant">🟡 Vacant Only</option>
          </select>

          {/* Floor Filter */}
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="ALL">All Floors</option>
            <option value="Ground">Ground Floor</option>
            <option value="1st">1st Floor</option>
            <option value="2nd">2nd Floor</option>
            <option value="3rd">3rd Floor</option>
          </select>
        </div>
      </div>

      {/* Interactive Matrix Grid */}
      {filteredUnits.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-sm font-medium">
          No stalls match your filter search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredUnits.map((unit) => {
            const isAvailable = unit.status === 'available';
            const isOverdue = unit.invoices?.some(i => i.status === 'overdue');

            // Color coding calculation
            let cardBg = "bg-emerald-50 border-emerald-200 text-emerald-900 hover:border-emerald-400";
            let badgeBg = "bg-emerald-500 text-white";
            let statusText = "PAID";

            if (isAvailable) {
              cardBg = "bg-amber-50/60 border-amber-200 text-amber-900 hover:border-amber-400";
              badgeBg = "bg-amber-500 text-white";
              statusText = "VACANT";
            } else if (isOverdue) {
              cardBg = "bg-rose-50 border-rose-200 text-rose-900 hover:border-rose-400";
              badgeBg = "bg-rose-600 text-white";
              statusText = "OVERDUE";
            }

            return (
              <div
                key={unit.id}
                className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer hover:shadow-md ${cardBg}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-sm tracking-tight">{unit.name}</span>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider ${badgeBg}`}>
                    {statusText}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] font-bold opacity-80 truncate">
                    {isAvailable ? "Available to Rent" : (unit.tenants?.[0]?.name || "Tenant Occupied")}
                  </p>
                  <p className="text-xs font-black">
                    KES {unit.price?.toLocaleString()}
                    <span className="text-[10px] font-normal opacity-70"> /mo</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
