import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import adminService from "../api/adminService";
import { getLandlordDashboard } from "../api/landlordService";
import { getTenantDashboard } from "../api/tenantService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  KeyIcon,
  UsersIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  PlusIcon,
  DocumentChartBarIcon,
  CheckCircleIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  BanknotesIcon,
  CreditCardIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const { role, user } = useContext(AuthContext);

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [role]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      if (role === "ADMIN") {
        const res = await adminService.getDashboardStats();
        setDashboardData(res.data?.data);
      } else if (role === "LANDLORD") {
        const res = await getLandlordDashboard();
        setDashboardData(res.data?.data || res.data);
      } else if (role === "TENANT") {
        const res = await getTenantDashboard();
        setDashboardData(res.data?.data || res.data);
      }
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // --- 1. SUPER ADMIN DASHBOARD ---
  const renderAdminDashboard = () => (
    <div className="p-6 sm:p-10 space-y-8 bg-slate-50 min-h-screen">
      <header className="flex justify-between items-end">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            System Administration
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Real-time portfolio metrics, user accounts, and financial transactions.
          </p>
        </div>
      </header>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Properties"
          value={dashboardData?.properties || 0}
          icon={BuildingOfficeIcon}
          iconColor="text-indigo-600 bg-indigo-50"
        />
        <KpiCard
          title="Total Units / Stalls"
          value={dashboardData?.units || 0}
          icon={HomeIcon}
          iconColor="text-purple-600 bg-purple-50"
        />
        <KpiCard
          title="Active Landlords"
          value={dashboardData?.landlords || 0}
          icon={UsersIcon}
          iconColor="text-amber-600 bg-amber-50"
        />
        <KpiCard
          title="Active Tenants"
          value={dashboardData?.tenants || 0}
          icon={UserIcon}
          iconColor="text-emerald-600 bg-emerald-50"
        />
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BanknotesIcon className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Recent M-Pesa & Rent Transactions
            </h3>
          </div>
          <Link
            to="/units"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
          >
            View All Units →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Property / Stall</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {dashboardData?.recentTransactions?.length > 0 ? (
                dashboardData.recentTransactions.map((t, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                        {t.user?.name?.charAt(0) || "U"}
                      </div>
                      <span className="font-bold text-slate-900">{t.user?.name || "Guest User"}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {t.invoice?.unit?.property?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-semibold text-xs">
                      {new Date(t.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      KES {t.amount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex px-2.5 py-1 text-[10px] font-extrabold rounded-md uppercase tracking-wider ${
                        t.status === "COMPLETED" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                    No transactions recorded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- 2. LANDLORD / AGENT DASHBOARD ---
  const renderLandlordDashboard = () => (
    <div className="p-6 sm:p-10 space-y-8 bg-slate-50 min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Property & Plaza Management
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Welcome back! Here's your portfolio performance today.
          </p>
        </div>
        <Link
          to="/properties"
          className="flex items-center justify-center px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/25"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Property / Plaza
        </Link>
      </header>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="My Properties"
          value={dashboardData?.propertiesCount || 0}
          icon={BuildingOfficeIcon}
          iconColor="text-indigo-600 bg-indigo-50"
        />
        <KpiCard
          title="Total Units / Stalls"
          value={dashboardData?.unitsCount || 0}
          icon={KeyIcon}
          iconColor="text-purple-600 bg-purple-50"
        />
        <KpiCard
          title="Active Tenants"
          value={dashboardData?.tenantsCount || 0}
          icon={UsersIcon}
          iconColor="text-amber-600 bg-amber-50"
        />
        <KpiCard
          title="Occupancy Rate"
          value={
            dashboardData?.unitsCount > 0
              ? ((dashboardData.occupiedUnitsCount / dashboardData.unitsCount) * 100).toFixed(1) + "%"
              : "0%"
          }
          icon={ChartBarIcon}
          iconColor="text-emerald-600 bg-emerald-50"
        />
      </div>

      {/* Featured Portfolio Properties */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            My Featured Buildings & Plazas
          </h3>
          <Link to="/properties" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition">
            View All Properties →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData?.properties?.length > 0 ? (
            dashboardData.properties.slice(0, 3).map((p, i) => (
              <PropertyCard
                key={p.id}
                image={p.image1 || `https://images.unsplash.com/photo-${i === 0 ? "1545324418-cc1a3fa10c00" : i === 1 ? "1605276374104-dee2a0ed3cd6" : "1512917774080-9991f1c4c750"}?auto=format&fit=crop&w=800&q=80`}
                title={p.name}
                location={p.location}
                units={p.units?.length || 0}
                occupancy={
                  p.units?.length > 0
                    ? Math.floor((p.units.filter((u) => u.tenants?.length > 0).length / p.units.length) * 100)
                    : 0
                }
                status={p.units?.length > 0 && p.units.every((u) => u.tenants?.length > 0) ? "FULL" : "VACANCIES"}
              />
            ))
          ) : (
            <div className="col-span-full py-12 bg-white border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <BuildingOfficeIcon className="h-10 w-10 text-slate-300 mb-3" />
              <p className="text-sm font-bold text-slate-400">Your portfolio is currently empty</p>
              <Link to="/properties" className="mt-3 text-xs font-bold text-indigo-600 hover:underline">
                + Add your first property or plaza
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  // --- 3. TENANT / SHOPKEEPER DASHBOARD ---
  const renderTenantDashboard = () => (
    <div className="p-6 sm:p-10 space-y-8 bg-slate-50 min-h-screen">
      <header className="flex justify-between items-end">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Tenant Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Welcome back, {user?.name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Manage your rental unit, review rent statements, and pay via M-Pesa.
          </p>
        </div>
      </header>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TenantMetricCard
          title="Rent Payment Status"
          value={
            dashboardData?.invoices?.length > 0
              ? dashboardData.invoices[0].status === "PAID"
                ? "Paid 🟢"
                : "Rent Due 🔴"
              : "Active"
          }
          icon={CheckCircleIcon}
          iconColor="text-emerald-600 bg-emerald-50"
        />
        <TenantMetricCard
          title="Active Lease"
          value={dashboardData?.unit?.name || "Assigned Unit"}
          icon={HomeIcon}
          iconColor="text-indigo-600 bg-indigo-50"
        />
        <TenantMetricCard
          title="Monthly Billing"
          value={dashboardData?.unit?.price ? `KES ${dashboardData.unit.price.toLocaleString()}` : "Contact Agent"}
          icon={CreditCardIcon}
          iconColor="text-amber-600 bg-amber-50"
        />
      </div>

      {/* Unit Details & Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
            <BuildingOfficeIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">My Rental Unit / Shop Details</h3>
            <p className="text-xs font-semibold text-slate-400">Current Occupied Space</p>
          </div>
        </div>

        {dashboardData?.unit ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded">Active Tenancy</span>
              <h4 className="text-2xl font-bold text-slate-900 mt-2">{dashboardData.unit.name}</h4>
              <p className="text-sm font-semibold text-slate-500 mt-1">{dashboardData.unit.property?.name} • {dashboardData.unit.property?.location}</p>
              <p className="text-xs text-slate-400 mt-2 font-medium">Monthly Rent: <strong className="text-slate-900">KES {dashboardData.unit.price?.toLocaleString()}</strong></p>
            </div>
            <div className="flex items-center justify-end">
              <Link to="/units" className="px-6 py-3 bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-indigo-700 transition shadow-md">
                View Available Units
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-sm font-bold text-slate-400">No active unit assigned yet</p>
            <Link to="/units" className="mt-3 inline-block text-xs font-bold text-indigo-600 hover:underline">
              Browse Available Listed Properties →
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      {role === "ADMIN" && renderAdminDashboard()}
      {role === "LANDLORD" && renderLandlordDashboard()}
      {role === "TENANT" && renderTenantDashboard()}
    </div>
  );
}

function KpiCard({ title, value, icon: Icon, iconColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
      <div className={`p-3.5 rounded-xl ${iconColor}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-extrabold text-slate-900 mt-0.5">{value.toString().toLocaleString()}</p>
      </div>
    </div>
  );
}

function TenantMetricCard({ title, value, icon: Icon, iconColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
      <div className={`p-3.5 rounded-xl ${iconColor}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-xl font-extrabold text-slate-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function PropertyCard({ image, title, location, units, occupancy, status }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition duration-200">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
          status === "FULL" ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"
        }`}>
          {status}
        </span>
      </div>
      <div className="p-6">
        <h4 className="text-lg font-bold text-slate-900 truncate">{title}</h4>
        <p className="text-xs font-medium text-slate-400 mb-4">{location}</p>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Units</span>
            <span className="font-extrabold text-slate-900 text-base">{units}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Occupancy</span>
            <span className="font-extrabold text-slate-900 text-base">{occupancy}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
