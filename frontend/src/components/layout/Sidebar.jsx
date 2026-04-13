import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
  HomeIcon,
  BuildingOfficeIcon,
  UsersIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  WrenchScrewdriverIcon,
  CreditCardIcon,
  CalendarIcon,
  DocumentIcon,
  ChatBubbleLeftEllipsisIcon,
  Square3Stack3DIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const { role, user, logout } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = {
    ADMIN: [
      { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
      { name: "Properties", path: "/properties", icon: BuildingOfficeIcon },
      { name: "Units", path: "/units", icon: Square3Stack3DIcon },
      { name: "Landlords", path: "/landlords", icon: UsersIcon },
      { name: "Tenants", path: "/tenants", icon: UserGroupIcon },
    ],
    LANDLORD: [
      { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
      { name: "My Properties", path: "/properties", icon: BuildingOfficeIcon },
      { name: "Units", path: "/units", icon: Square3Stack3DIcon },
      { name: "My Tenants", path: "/tenants", icon: UserGroupIcon },
    ],
    TENANT: [
      { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
      { name: "Find Houses", path: "/units", icon: MagnifyingGlassIcon },
      // { name: "Payments", path: "/payments", icon: CreditCardIcon },
      // { name: "Bookings", path: "/bookings", icon: CalendarIcon },
      // { name: "Maintenance", path: "/maintenance", icon: WrenchScrewdriverIcon },
      // { name: "Documents", path: "/documents", icon: DocumentIcon },
    ],
  };

  const systemItems = role === "ADMIN" ? [
    { name: "User Management", path: "/user-management", icon: UserGroupIcon },
    // { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
  ] : [];

  const currentMenuItems = menuItems[role] || [];

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        key={item.name}
        to={item.path}
        className={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 group ${
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        <item.icon className={`h-5 w-5 mr-3 transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
        {item.name}
      </Link>
    );
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-100 min-h-screen flex flex-col shrink-0 sticky top-0">
      <div className="p-8">
        <div className="flex items-center space-x-3 group px-2 mb-2">
          <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 40 40" className="w-full h-full text-slate-900 fill-current">
              <path d="M20 4L4 16H8V32H32V16H36L20 4Z" className="opacity-10 text-emerald-500" />
              <path d="M20 4L4 16H36L20 4Z" />
              <text x="50%" y="75%" textAnchor="middle" className="text-[18px] font-black fill-slate-900">R</text>
            </svg>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white">🔑</div>
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-emerald-500 transition-colors">Rentora</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
        <div>
          <div className="space-y-1">
            {currentMenuItems.map((item) => <NavItem key={item.name} item={item} />)}
          </div>
        </div>

        {systemItems.length > 0 && (
          <div>
            <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">System</p>
            <div className="space-y-1">
              {systemItems.map((item) => <NavItem key={item.name} item={item} />)}
            </div>
          </div>
        )}
      </nav>

      <div className="p-6 border-t border-gray-50 bg-gray-50/30">
        <div className="flex items-center space-x-4 mb-6 px-2">
          <div className="h-10 w-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold overflow-hidden">
             {user?.name?.charAt(0) || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-gray-900 truncate uppercase tracking-tight">{user?.name || "Admin User"}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{role === 'ADMIN' ? 'Super Admin' : role.toLowerCase()}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-sm font-bold text-gray-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3 transition-colors group-hover:text-red-600" />
          Logout
        </button>
      </div>
    </aside>
  );
}
