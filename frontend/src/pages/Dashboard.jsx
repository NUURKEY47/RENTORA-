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
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  PlusIcon,
  UserPlusIcon,
  DocumentChartBarIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  LinkIcon,
  ClockIcon,
  LightBulbIcon,
  WrenchScrewdriverIcon,
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
          value={dashboardData?.stats?.totalProperties?.value || 0} 
          trend={dashboardData?.stats?.totalProperties?.trend || 0}
          isPositive={dashboardData?.stats?.totalProperties?.isPositive}
          icon={BuildingOfficeIcon} 
          iconColor="text-blue-600 bg-blue-50"
        />
        <KpiCard 
          title="Total Units" 
          value={dashboardData?.stats?.totalUnits?.value || 0} 
          trend={dashboardData?.stats?.totalUnits?.trend || 0}
          isPositive={dashboardData?.stats?.totalUnits?.isPositive}
          icon={HomeIcon} 
          iconColor="text-purple-600 bg-purple-50"
        />
        <KpiCard 
          title="Active Landlords" 
          value={dashboardData?.stats?.activeLandlords?.value || 0} 
          trend={dashboardData?.stats?.activeLandlords?.trend || 0}
          isPositive={dashboardData?.stats?.activeLandlords?.isPositive}
          icon={UsersIcon} 
          iconColor="text-orange-600 bg-orange-50"
        />
        <KpiCard 
          title="Active Tenants" 
          value={dashboardData?.stats?.activeTenants?.value || 0} 
          trend={dashboardData?.stats?.activeTenants?.trend || 0}
          isPositive={dashboardData?.stats?.activeTenants?.isPositive}
          icon={UserIcon} 
          iconColor="text-green-600 bg-green-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm shadow-gray-50 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Portfolio Growth</h3>
            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider outline-none transition hover:bg-gray-100">
               <option>Last 12 Months</option>
               <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[300px] flex items-end justify-between px-2 pt-4">
             {dashboardData?.portfolioGrowth?.map((data, i) => (
               <div key={i} className="flex flex-col items-center group relative flex-1">
                  <div className="absolute -top-10 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition shadow-xl pointer-events-none z-10">
                    {data.value}%
                  </div>
                  <div 
                    className={`w-full max-w-[32px] rounded-t-lg transition-all duration-500 hover:opacity-80 ${i % 3 === 0 ? 'bg-blue-600 shadow-lg shadow-blue-100' : 'bg-blue-200'}`} 
                    style={{ height: `${data.value * 2.5}px` }}
                  ></div>
                  <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{data.month}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Side Panel: Actions & Storage */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm shadow-gray-50">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Quick Management</h3>
            <div className="space-y-3">
              <QuickAction to="/properties" label="Add Property" icon={PlusIcon} color="blue" />
              <QuickAction to="/user-management" label="Invite User" icon={UserPlusIcon} color="white" />
              <QuickAction to="/reports" label="Run Reports" icon={DocumentChartBarIcon} color="white" />
            </div>
          </div>

          <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100/50">
             <h3 className="text-[10px] font-bold text-blue-800 uppercase tracking-wider mb-4">Storage Usage</h3>
             <div className="space-y-4">
                <div className="w-full bg-blue-100 h-2.5 rounded-full overflow-hidden">
                   <div className="bg-blue-500 h-full w-[65%] rounded-full shadow-lg shadow-blue-100 transition-all duration-1000"></div>
                </div>
                <div className="flex justify-between items-baseline">
                   <p className="text-[10px] font-bold text-blue-900/60 uppercase">6.5 GB of 10 GB used</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm shadow-gray-50 overflow-hidden">
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
                  {dashboardData?.recentTransactions?.map((t, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition">
                       <td className="px-8 py-5 flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                             {t.tenant.charAt(0)}
                          </div>
                          <span className="text-sm font-bold text-gray-900">{t.tenant}</span>
                       </td>
                       <td className="px-8 py-5 text-sm text-gray-500 font-medium">{t.property}</td>
                       <td className="px-8 py-5 text-sm text-gray-400 font-bold uppercase tracking-tighter">
                          {new Date(t.date).toLocaleDateString()}
                       </td>
                       <td className="px-8 py-5 text-sm font-bold text-gray-900">${t.amount.toLocaleString()}</td>
                       <td className="px-8 py-5 text-right">
                          <span className="inline-flex px-3 py-1 text-[10px] font-bold rounded-lg bg-green-100 text-green-700 uppercase tracking-wider">
                             {t.status}
                          </span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
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
          trend={2}
          isPositive={true}
          icon={KeyIcon} 
          iconColor="text-purple-600 bg-purple-50"
        />
        <KpiCard 
          title="Active Tenants" 
          value={42} 
          trend={1}
          isPositive={true}
          icon={UsersIcon} 
          iconColor="text-orange-600 bg-orange-50"
        />
        <KpiCard 
          title="Occupancy Rate" 
          value="87.5%" 
          trend={2}
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
                   <BookingRow 
                      property="Skyline Towers" 
                      unit="Unit 402B" 
                      tenant="Anna Jenkins" 
                      date="Oct 24, 2023" 
                   />
                   <BookingRow 
                      property="Maple Gardens" 
                      unit="Suite 12" 
                      tenant="Mark Thompson" 
                      date="Oct 28, 2023" 
                   />
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
          <div className="flex-1 space-y-8 relative">
             <div className="absolute left-4 top-2 bottom-0 w-px bg-gray-100"></div>
             <ActivityItem 
                icon={CurrencyDollarIcon} 
                iconColor="bg-green-100 text-green-600" 
                title="Rent Paid - Unit 201" 
                detail="$1,450.00 received from Sarah K." 
                time="2 HOURS AGO" 
             />
             <ActivityItem 
                icon={DocumentChartBarIcon} 
                iconColor="bg-blue-100 text-blue-600" 
                title="Lease Signed" 
                detail="New lease signed for Harbor View Apt 4." 
                time="5 HOURS AGO" 
             />
             <ActivityItem 
                icon={HomeIcon} 
                iconColor="bg-red-100 text-red-600" 
                title="Maintenance Request" 
                detail="Plumbing issue reported in Unit 102." 
                time="YESTERDAY" 
             />
          </div>
          <button className="mt-8 w-full py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-400 uppercase tracking-widest hover:bg-gray-50 transition shadow-sm">
             Load More Activity
          </button>
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
            {dashboardData?.properties?.slice(0, 3).map((p, i) => (
              <PropertyCard 
                key={p.id}
                image={`https://images.unsplash.com/photo-${i === 0 ? '1545324418-cc1a3fa10c00' : i === 1 ? '1605276374104-dee2a0ed3cd6' : '1512917774080-9991f1c4c750'}?auto=format&fit=crop&w=800&q=80`}
                title={p.name}
                location={p.location}
                units={p.units.length}
                occupancy={Math.floor(80 + Math.random() * 20)}
                status={p.units.length > 5 ? "STABLE" : "2 VACANCIES"}
              />
            ))}
            {/* Fill with dummy if no real properties */}
            {(!dashboardData?.properties || dashboardData?.properties.length === 0) && (
              <>
                <PropertyCard 
                  image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
                  title="Skyline Towers"
                  location="Downtown Financial District"
                  units={24}
                  occupancy={100}
                  status="STABLE"
                />
                <PropertyCard 
                  image="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80"
                  title="Maple Gardens"
                  location="North Maple Suburb"
                  units={16}
                  occupancy={88}
                  status="2 VACANCIES"
                />
              </>
            )}
         </div>
      </section>
    </div>
  );

  const renderTenantDashboard = () => (
    <div className="p-8 space-y-10 bg-gray-50/30 min-h-screen">
      <header className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome home, {user?.name?.split(' ')[0] || 'Alex'}</h1>
           <p className="text-gray-400 font-medium text-sm mt-1 uppercase tracking-wider">Here's what's happening with your property today.</p>
        </div>
      </header>

      {/* Top Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TenantMetricCard 
          title="Rent Status" 
          value="Paid for Oct" 
          icon={CheckCircleIcon} 
          iconColor="text-green-600 bg-green-50"
        />
        <TenantMetricCard 
          title="Next Booking" 
          value="In 3 days" 
          icon={CalendarIcon} 
          iconColor="text-blue-600 bg-blue-50"
        />
        <TenantMetricCard 
          title="Lease Ends" 
          value="Jan 15, 2025" 
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
                  <span className="flex-1"></span>
                  <Link to="/units" className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline transition">Manage All</Link>
               </div>
               
               <div className="space-y-4 mb-8">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-lg">Active Lease</span>
                  <h4 className="text-2xl font-bold text-gray-900 leading-tight">Apartment 4B, Sunset Heights</h4>
                  <p className="text-sm font-semibold text-gray-400">2 Bedroom, 1 Bathroom • 1,200 sq.ft</p>
                  <div className="flex flex-wrap gap-4 pt-2">
                     <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <MapPinIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                        San Francisco, CA
                     </div>
                     <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <LinkIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                        Keyless Entry
                     </div>
                  </div>
               </div>

               <div className="flex space-x-3">
                  <button className="px-6 py-2.5 bg-blue-600 text-white text-[10px] font-bold rounded-xl uppercase tracking-wider hover:bg-blue-700 transition shadow-lg shadow-blue-100">View Lease</button>
                  <button className="px-6 py-2.5 bg-white border border-gray-100 text-gray-900 text-[10px] font-bold rounded-xl uppercase tracking-wider hover:bg-gray-50 transition">Unit Tour</button>
               </div>
            </div>
            <div className="md:w-64 h-48 md:h-auto overflow-hidden relative">
               <img 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" 
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
                <BookingCard 
                  title="Rooftop Pool Access" 
                  date="Saturday, Oct 21 • 2:00 PM - 4:00 PM" 
                  status="CONFIRMED" 
                  icon={ClockIcon}
                />
                <BookingCard 
                  title="Conference Room B" 
                  date="Monday, Oct 23 • 10:00 AM - 11:30 AM" 
                  status="PENDING" 
                  icon={KeyIcon}
                />
             </div>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="space-y-8">
          {/* Upcoming Rent Widget */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
             <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">Upcoming Rent</h3>
                  <p className="text-xs font-semibold text-gray-400">Due Nov 1st, 2023</p>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-bold text-gray-900 leading-none">$2,850.00</p>
                   <p className="text-[10px] font-bold text-green-500 uppercase flex items-center justify-end mt-1">AUTO-PAY ON <CheckCircleIcon className="h-3 w-3 ml-1" /></p>
                </div>
             </div>
             <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-8">
                <div className="bg-blue-600 h-full w-[80%] rounded-full shadow-lg shadow-blue-100"></div>
             </div>
             <div className="space-y-4">
                <button className="w-full py-3.5 bg-blue-600 text-white text-[10px] font-bold rounded-xl uppercase tracking-wider hover:bg-blue-700 transition shadow-lg shadow-blue-100">Pay Now</button>
                <button className="w-full py-3.5 bg-white border border-gray-100 text-gray-400 text-[10px] font-bold rounded-xl uppercase tracking-wider hover:bg-gray-50 transition">View Invoices</button>
             </div>
          </div>

          {/* Recent Requests Widget */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recent Requests</h3>
                <PlusIcon className="h-5 w-5 text-gray-400 cursor-pointer hover:text-blue-600 transition" />
             </div>
             <div className="space-y-6">
                <RequestItem 
                  title="Kitchen Sink Leak" 
                  id="#8291" 
                  status="Scheduled for Tomorrow" 
                  icon={WrenchScrewdriverIcon} 
                  color="bg-orange-100 text-orange-600"
                />
                <RequestItem 
                  title="Hallway Light Replace" 
                  status="Completed Oct 12" 
                  icon={LightBulbIcon} 
                  color="bg-gray-100 text-gray-400"
                />
             </div>
             <button className="w-full mt-8 py-3 text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline transition">See all history</button>
          </div>

          {/* Community Map Widget */}
          <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer">
             <div className="h-40 relative">
                <img                     src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" 
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition duration-500" 
                    alt="Community Map"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="h-8 w-8 bg-blue-600 rounded-full border-4 border-white shadow-xl animate-pulse"></div>
                </div>
             </div>
             <div className="p-6">
                <h4 className="text-sm font-bold text-gray-900 tracking-tight mb-1">Sunset Heights Community</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">4 upcoming community events</p>
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

function RequestItem({ title, id, status, icon: Icon, color }) {
  return (
    <div className="flex items-center space-x-4">
       <div className={`p-3 rounded-2xl ${color}`}>
          <Icon className="h-5 w-5" />
       </div>
       <div>
          <p className="text-sm font-bold text-gray-900 leading-tight">
             {title} {id && <span className="text-gray-400 font-medium ml-1">Ticket {id}</span>}
          </p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{status}</p>
       </div>
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

function BookingRow({ property, unit, tenant, date }) {
  return (
    <tr className="hover:bg-gray-50/50 transition border-b border-gray-50 last:border-0 font-medium">
       <td className="px-8 py-6">
          <p className="text-sm font-bold text-gray-900 leading-none mb-1.5">{property}</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{unit}</p>
       </td>
       <td className="px-8 py-6 flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 overflow-hidden border-2 border-white shadow-sm">
             <div className="bg-blue-400 w-full h-full flex items-center justify-center text-white">{tenant.charAt(0)}</div>
          </div>
          <span className="text-sm font-semibold text-gray-900">{tenant}</span>
       </td>
       <td className="px-8 py-6 text-sm text-gray-900 font-semibold">{date}</td>
       <td className="px-8 py-6 text-right">
          <div className="flex justify-end space-x-2">
             <button className="px-4 py-2 bg-blue-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest hover:bg-blue-700 transition">Approve</button>
             <button className="px-4 py-2 bg-white border border-gray-100 text-gray-400 text-[10px] font-bold rounded-lg uppercase tracking-widest hover:bg-gray-50 transition">Decline</button>
          </div>
       </td>
    </tr>
  );
}

function ActivityItem({ icon: Icon, iconColor, title, detail, time }) {
  return (
    <div className="flex items-start space-x-4 relative z-10 group">
       <div className={`p-2 rounded-xl border-4 border-white shadow-sm group-hover:scale-110 transition shrink-0 ${iconColor}`}>
          <Icon className="h-5 w-5" />
       </div>
       <div className="pt-0.5">
          <p className="text-sm font-bold text-gray-900 leading-tight mb-1">{title}</p>
          <p className="text-xs font-semibold text-gray-400 leading-relaxed mb-1.5">{detail}</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{time}</p>
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
             <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold tracking-widest uppercase ${status === "STABLE" ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
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

function QuickAction({ to, label, icon: Icon, color }) {
  const styles = {
    blue: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100",
    white: "bg-white text-gray-700 border border-gray-100 hover:bg-gray-50",
  };
  return (
    <Link to={to} className={`flex items-center justify-between px-6 py-4 rounded-2xl transition font-bold text-sm ${styles[color]}`}>
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-3" />
        {label}
      </div>
      <ChevronRightIcon className="h-4 w-4" />
    </Link>
  );
}
