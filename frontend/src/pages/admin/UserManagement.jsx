import { useState, useEffect } from "react";
import { getAllUsers } from "../../api/userService";
import {
  UsersIcon,
  KeyIcon,
  UserPlusIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [stats, setStats] = useState({
    total: 0,
    landlords: 0,
    tenants: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      const allUsers = res.data?.data || res.data || [];
      setUsers(allUsers);
      
      // Calculate stats
      setStats({
        total: allUsers.length,
        landlords: allUsers.filter(u => u.role === 'LANDLORD').length,
        tenants: allUsers.filter(u => u.role === 'TENANT').length
      });
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter.toUpperCase();
    const matchesStatus = statusFilter === "All" || user.status === statusFilter.toLowerCase();
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 bg-gray-50/30 min-h-screen">
      <header className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
           <p className="text-gray-400 font-bold text-sm mt-1 uppercase tracking-wider">Manage system access for landlords, tenants, and admins</p>
        </div>
        <div className="flex space-x-3">
           <button className="flex items-center px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition shadow-sm">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Export
           </button>
           <button className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition shadow-lg shadow-blue-100">
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Add User
           </button>
        </div>
      </header>

      {/* User Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SmallStatCard title="Total Users" value={stats.total} trend={0} isPositive={true} icon={UsersIcon} iconColor="text-blue-600 bg-blue-50" />
        <SmallStatCard title="Active Landlords" value={stats.landlords} trend={0} isPositive={true} icon={KeyIcon} iconColor="text-orange-600 bg-orange-50" />
        <SmallStatCard title="Active Tenants" value={stats.tenants} trend={0} isPositive={true} icon={UsersIcon} iconColor="text-green-600 bg-green-50" />
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm shadow-gray-50 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[250px] relative">
           <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
           <input 
              type="text" 
              placeholder="Search by name, email, or ID..."
              className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-100 placeholder:text-gray-400 outline-none transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
           />
        </div>
        <select 
          className="bg-gray-50 border-none rounded-2xl px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider outline-none focus:ring-2 focus:ring-blue-100"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
           <option>All Roles</option>
           <option>Admin</option>
           <option>Landlord</option>
           <option>Tenant</option>
        </select>
        <select 
          className="bg-gray-50 border-none rounded-2xl px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider outline-none focus:ring-2 focus:ring-blue-100"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
           <option>All Status</option>
           <option>Active</option>
           <option>Pending</option>
           <option>Inactive</option>
        </select>
        <button className="flex items-center px-6 py-3 bg-gray-50 text-gray-500 rounded-2xl font-bold text-sm hover:bg-gray-100 transition">
           <FunnelIcon className="h-5 w-5 mr-2" />
           More Filters
        </button>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm shadow-gray-50 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">
                  <tr>
                    <th className="px-8 py-6 w-10"><input type="checkbox" className="rounded" /></th>
                    <th className="px-8 py-6">User</th>
                    <th className="px-8 py-6">Role</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6">Properties</th>
                    <th className="px-8 py-6">Last Login</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/20 transition group">
                       <td className="px-8 py-6"><input type="checkbox" className="rounded" /></td>
                       <td className="px-8 py-6">
                          <div className="flex items-center space-x-4">
                             <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-gray-900 leading-none mb-1">{user.name}</p>
                                <p className="text-xs font-medium text-gray-400">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <RoleBadge role={user.role} />
                       </td>
                       <td className="px-8 py-6">
                          <StatusBadge status={user.status} />
                       </td>
                       <td className="px-8 py-6 text-sm font-bold text-gray-500 tracking-tight">
                          {user.role === 'LANDLORD' ? `${user._count?.properties || 0} Properties` : user.role === 'TENANT' ? (user.unitId ? '1 Unit' : '0 Units') : '-'}
                       </td>
                       <td className="px-8 py-6 text-sm font-semibold text-gray-400">
                          {user.lastLogin ? formatDateAgo(user.lastLogin) : 'Never'}
                       </td>
                       <td className="px-8 py-6 text-right">
                          <button className="p-2 text-gray-300 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition">
                             <EllipsisVerticalIcon className="h-5 w-5" />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="p-8 border-t border-gray-50 flex justify-between items-center bg-gray-50/20">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
               Showing <span className="text-gray-900">1 to {filteredUsers.length}</span> of {users.length} results
            </p>
            <div className="flex space-x-2">
               <button className="px-6 py-2 bg-white border border-gray-200 text-gray-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-50 transition disabled:opacity-50" disabled>Previous</button>
               <button className="px-6 py-2 bg-white border border-gray-200 text-gray-900 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-50 transition">Next</button>
            </div>
         </div>
      </div>
    </div>
  );
}

function SmallStatCard({ title, value, trend, isPositive, icon: Icon, iconColor }) {
  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm shadow-gray-50 flex items-center justify-between group hover:shadow-lg transition-all duration-300">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{title}</p>
        <div className="flex items-baseline space-x-2">
           <span className="text-3xl font-bold text-gray-900 tracking-tight">{value.toLocaleString()}</span>
           <span className={`text-[10px] font-bold tracking-wider uppercase ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              ↗ {trend}%
           </span>
        </div>
      </div>
      <div className={`p-4 rounded-2xl ${iconColor} transform group-hover:scale-110 transition`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
}

function RoleBadge({ role }) {
  const styles = {
    ADMIN: "bg-purple-100 text-purple-600",
    LANDLORD: "bg-blue-100 text-blue-600",
    TENANT: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${styles[role] || styles.TENANT}`}>
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    active: "bg-green-100 text-green-600",
    pending: "bg-orange-100 text-orange-600",
    inactive: "bg-red-100 text-red-600",
  };
  const colors = {
    active: "bg-green-500",
    pending: "bg-orange-500",
    inactive: "bg-red-500",
  };
  const s = status?.toLowerCase() || "active";
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[s]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors[s]} mr-2 animate-pulse`}></span>
      {s}
    </span>
  );
}

function formatDateAgo(date) {
  const diff = new Date() - new Date(date);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}
