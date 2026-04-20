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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderAdminDashboard = () => (
    <div className="p-8 space-y-10 bg-gray-50/30 min-h-screen">
      <header className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
           <p className="text-gray-400 font-bold text-sm mt-1 uppercase tracking-wider">Real-time analytics for your real estate portfolio.</p>
        </div>
      </header>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Total Properties" 
          value={dashboardData?.properties || 0} 
          trend={0}
          isPositive={true}
          icon={BuildingOfficeIcon} 
          iconColor="text-blue-600 bg-blue-50"
        />
        <KpiCard 
          title="Total Units" 
          value={dashboardData?.units || 0} 
          trend={0}
          isPositive={true}
          icon={HomeIcon} 
          iconColor="text-purple-600 bg-purple-50"
        />
        <KpiCard 
          title="Active Landlords" 
          value={dashboardData?.landlords || 0} 
          trend={0}
          isPositive={true}
          icon={UsersIcon} 
          iconColor="text-orange-600 bg-orange-50"
        />
        <KpiCard 
          title="Active Tenants" 
          value={dashboardData?.tenants || 0} 
          trend={0}
          isPositive={true}
          icon={UserIcon} 
          iconColor="text-green-600 bg-green-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Recent Transactions Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm shadow-gray-50 overflow-hidden lg:col-span-3">
         <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Recent Transactions</h3>
            <Link to="/finance" className="text-xs font-bold text-blue-600 uppercase tracking-wider hover:underline transition">View Ledger</Link>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">
                  <tr>
                    <th className="px-8 py-5">Tenant</th>
                    <th className="px-8 py-5">Property</th>
                    <th className="px-8 py-5">Date</th>
                    <th className="px-8 py-5">Amount</th>
                    <th className="px-8 py-5 text-right">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {dashboardData?.recentTransactions?.length > 0 ? (
                    dashboardData.recentTransactions.map((t, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition">
                         <td className="px-8 py-5 flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                               {t.user?.name?.charAt(0) || "U"}
                            </div>
                            <span className="text-sm font-bold text-gray-900">{t.user?.name || "Guest"}</span>
                         </td>
                         <td className="px-8 py-5 text-sm text-gray-500 font-medium">
                            {t.invoice?.unit?.property?.name || "N/A"}
                         </td>
                         <td className="px-8 py-5 text-sm text-gray-400 font-bold uppercase tracking-tighter">
                            {new Date(t.paymentDate).toLocaleDateString()}
                         </td>
                         <td className="px-8 py-5 text-sm font-bold text-gray-900">${t.amount?.toLocaleString()}</td>
                         <td className="px-8 py-5 text-right">
                            <span className={`inline-flex px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider ${
                              t.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                               {t.status}
                            </span>
                         </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-8 py-10 text-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                        No transactions recorded yet
                      </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  </div>
  );

  const renderLandlordDashboard = () => (
    <div className="p-8 space-y-10 bg-gray-50/30 min-h-screen">
      <header className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
           <p className="text-gray-400 font-medium text-sm mt-1 uppercase tracking-wider">Welcome back, here's what's happening with your portfolio today.</p>
        </div>
        <Link 
          to="/properties" 
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Property
        </Link>
      </header>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Total Properties" 
          value={dashboardData?.propertiesCount || 0} 
          trend={0}
          isPositive={true}
          icon={BuildingOfficeIcon} 
          iconColor="text-blue-600 bg-blue-50"
        />
        <KpiCard 
          title="Total Units" 
          value={dashboardData?.unitsCount || 0} 
          trend={0}
          isPositive={true}
          icon={KeyIcon} 
          iconColor="text-purple-600 bg-purple-50"
        />
        <KpiCard 
          title="Active Tenants" 
          value={dashboardData?.tenantsCount || 0} 
          trend={0}
          isPositive={true}
          icon={UsersIcon} 
          iconColor="text-orange-600 bg-orange-50"
        />
        <KpiCard 
          title="Occupancy Rate" 
          value={dashboardData?.unitsCount > 0 ? ((dashboardData.occupiedUnitsCount / dashboardData.unitsCount) * 100).toFixed(1) + '%' : '0%'} 
          trend={0}
          isPositive={true}
          icon={ChartBarIcon} 
          iconColor="text-green-600 bg-green-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Bookings Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm shadow-gray-50 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <div className="flex items-center space-x-2">
               <DocumentChartBarIcon className="h-5 w-5 text-blue-600" />
               <h3 className="text-lg font-bold text-gray-900 tracking-tight">Pending Bookings</h3>
            </div>
            <Link to="/bookings" className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline transition">View All</Link>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                   <tr>
                     <th className="px-8 py-5">Property / Unit</th>
                     <th className="px-8 py-5">Tenant</th>
                     <th className="px-8 py-5">Check-in</th>
                     <th className="px-8 py-5 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {/* Cleaned up: No hardcoded rows */}
                   <tr>
                      <td colSpan="4" className="px-8 py-10 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                         No pending bookings at this time
                      </td>
                   </tr>
                </tbody>
             </table>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm shadow-gray-50 flex flex-col">
          <div className="flex items-center space-x-2 mb-8">
             <ChartBarIcon className="h-5 w-5 text-blue-600 rotate-90" />
             <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Activity</h3>
          </div>
          <div className="flex-1 space-y-8 relative flex flex-col items-center justify-center">
             <div className="absolute left-4 top-2 bottom-0 w-px bg-gray-100"></div>
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center px-4">
                No recent activity to display
             </p>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <section>
         <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
               <BuildingOfficeIcon className="h-5 w-5 text-blue-600" />
               <h3 className="text-lg font-bold text-gray-900 tracking-tight">Featured Properties</h3>
            </div>
            <Link to="/properties" className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline transition">View Portfolio</Link>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dashboardData?.properties?.length > 0 ? (
              dashboardData.properties.slice(0, 3).map((p, i) => (
                <PropertyCard 
                  key={p.id}
                  image={`https://images.unsplash.com/photo-${i === 0 ? '1545324418-cc1a3fa10c00' : i === 1 ? '1605276374104-dee2a0ed3cd6' : '1512917774080-9991f1c4c750'}?auto=format&fit=crop&w=800&q=80`}
                  title={p.name}
                  location={p.location}
                  units={p.units?.length || 0}
                  occupancy={p.units?.length > 0 ? Math.floor((p.units.filter(u => u.tenants?.length > 0).length / p.units.length) * 100) : 0}
                  status={p.units?.length > 0 && p.units.every(u => u.tenants?.length > 0) ? "FULL" : "VACANCIES"}
                />
              ))
            ) : (
                <div className="col-span-full py-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center text-center">
                  <BuildingOfficeIcon className="h-10 w-10 text-gray-300 mb-4" />
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your portfolio is currently empty</p>
                  <Link to="/properties" className="mt-4 text-xs font-bold text-blue-600 uppercase tracking-wide hover:underline">Add your first property →</Link>
                </div>
            )}
         </div>
      </section>
    </div>
  );

  const renderTenantDashboard = () => (
    <div className="p-8 space-y-10 bg-gray-50/30 min-h-screen">
      <header className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome home, {user?.name?.split(' ')[0] || 'Guest'}</h1>
           <p className="text-gray-400 font-medium text-sm mt-1 uppercase tracking-wider">Here's what's happening with your property today.</p>
        </div>
      </header>

      {/* Top Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TenantMetricCard 
          title="Rent Status" 
          value={dashboardData?.invoices?.length > 0 ? (dashboardData.invoices[0].status === 'PAID' ? 'Paid' : 'Unpaid') : "N/A"} 
          icon={CheckCircleIcon} 
          iconColor="text-green-600 bg-green-50"
        />
        <TenantMetricCard 
          title="Active Bookings" 
          value={dashboardData?.bookingsCount || 0} 
          icon={CalendarIcon} 
          iconColor="text-blue-600 bg-blue-50"
        />
        <TenantMetricCard 
          title="Invoices" 
          value={dashboardData?.invoicesCount || 0} 
          icon={ExclamationTriangleIcon} 
          iconColor="text-orange-600 bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Unit & Bookings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Unit Details Card */}
          <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm flex flex-col md:flex-row">
            <div className="p-8 flex-1">
               <div className="flex items-center space-x-2 mb-6 text-blue-600">
                  <BuildingOfficeIcon className="h-5 w-5" />
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Unit Details</h3>
               </div>
               
               {dashboardData?.unit ? (
                 <div className="space-y-4 mb-8">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-lg">Active Lease</span>
                    <h4 className="text-2xl font-bold text-gray-900 leading-tight">
                        {dashboardData.unit.name}, {dashboardData.unit.property?.name}
                    </h4>
                    <p className="text-sm font-semibold text-gray-400">{dashboardData.unit.size || 'N/A'} • {dashboardData.unit.property?.location}</p>
                 </div>
               ) : (
                 <div className="py-8">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No active lease found</p>
                 </div>
               )}

               <div className="flex space-x-3">
                  <Link to="/units" className="px-6 py-2.5 bg-blue-600 text-white text-[10px] font-bold rounded-xl uppercase tracking-wider hover:bg-blue-700 transition shadow-lg shadow-blue-100">Browse Units</Link>
               </div>
            </div>
            <div className="md:w-64 h-48 md:h-auto overflow-hidden relative">
               <img 
                  src={dashboardData?.unit?.image1 || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"} 
                  className="w-full h-full object-cover" 
                  alt="Unit View"
               />
            </div>
          </div>

          {/* Active Bookings Grid */}
          <div className="space-y-6">
             <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">Active Bookings</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dashboardData?.bookings?.length > 0 ? (
                  dashboardData.bookings.map((b, i) => (
                    <BookingCard 
                      key={b.id}
                      title={`Booking #${b.id}`} 
                      date={new Date(b.startDate).toLocaleDateString()} 
                      status={b.status} 
                      icon={ClockIcon}
                    />
                  ))
                ) : (
                   <div className="col-span-full py-10 bg-gray-50 border border-dashed border-gray-200 rounded-3xl flex items-center justify-center">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">No active bookings</p>
                   </div>
                )}
             </div>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="space-y-8">
          {/* Upcoming Rent Widget */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">Current Rent</h3>
                   <p className="text-xs font-semibold text-gray-400">Monthly invoice</p>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-bold text-gray-900 leading-none">
                     ${dashboardData?.unit?.price?.toLocaleString() || '0'}
                   </p>
                </div>
             </div>
             <div className="space-y-4">
                <Link to="/finance" className="block w-full py-3.5 text-center bg-blue-600 text-white text-[10px] font-bold rounded-xl uppercase tracking-wider hover:bg-blue-700 transition shadow-lg shadow-blue-100">View Invoices</Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {role === "ADMIN" && renderAdminDashboard()}
      {role === "LANDLORD" && renderLandlordDashboard()}
      {role === "TENANT" && renderTenantDashboard()}
    </div>
  );
}

function TenantMetricCard({ title, value, icon: Icon, iconColor }) {
  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center space-x-5 group hover:shadow-lg transition-all duration-300">
      <div className={`p-4 rounded-[20px] transition-transform group-hover:scale-110 ${iconColor}`}>
         <Icon className="h-6 w-6" />
      </div>
      <div>
         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
         <p className="text-xl font-bold text-gray-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function BookingCard({ title, date, status, icon: Icon }) {
  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition">
       <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-gray-50 rounded-xl text-blue-600">
             <Icon className="h-5 w-5" />
          </div>
          <span className={`px-3 py-1 rounded-lg text-[8px] font-bold tracking-widest uppercase ${status === "CONFIRMED" ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
             {status}
          </span>
       </div>
       <h4 className="text-sm font-bold text-gray-900 mb-1">{title}</h4>
       <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{date}</p>
    </div>
  );
}

function KpiCard({ title, value, trend, isPositive, icon: Icon, iconColor }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm shadow-gray-50 flex flex-col justify-between group hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3.5 rounded-2xl ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={`flex items-center space-x-1 text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          <span className="tracking-widest">{isPositive ? '↑' : '↓'} +{trend}%</span>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{title}</p>
        <p className="text-3xl font-bold text-gray-900 tracking-tight">{value.toString().toLocaleString()}</p>
      </div>
    </div>
  );
}

function PropertyCard({ image, title, location, units, occupancy, status }) {
  return (
    <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
       <div className="relative h-60 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
          <div className="absolute top-6 right-6">
             <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold tracking-widest uppercase ${status === "FULL" ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {status}
             </span>
          </div>
       </div>
       <div className="p-8">
          <h4 className="text-xl font-bold text-gray-900 tracking-tight mb-1">{title}</h4>
          <div className="flex items-center text-gray-400 text-xs font-semibold uppercase tracking-widest mb-8">
             <HomeIcon className="h-4 w-4 mr-1.5" />
             {location}
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Units</p>
                <p className="text-lg font-bold text-gray-900">{units} Units</p>
             </div>
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Occupancy</p>
                <p className="text-lg font-bold text-gray-900">{occupancy}%</p>
             </div>
          </div>
       </div>
    </div>
  );
}
