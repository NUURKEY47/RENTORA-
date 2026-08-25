import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
  HomeIcon,
  BuildingOfficeIcon,
  UsersIcon,
  UserGroupIcon,
  ArrowLeftOnRectangleIcon,
  Square3Stack3DIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
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
    ],
  };

  const systemItems = role === "ADMIN" ? [
    { name: "User Management", path: "/user-management", icon: UserGroupIcon },
  ] : [];

  const currentMenuItems = menuItems[role] || [];

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        key={item.name}
        to={item.path}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 group ${
          isActive
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
            : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
        }`}
      >
        <item.icon className={`h-5 w-5 mr-3 transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
        {item.name}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 text-slate-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex flex-col h-full ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Brand Header */}
        <div className="p-6 lg:p-8 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 8V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V8L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="12" cy="10.5" r="2.5" stroke="white" strokeWidth="2" />
                <path d="M10.5 13L9.5 17.5H14.5L13.5 13" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">Rentora<span className="text-indigo-400">.</span></span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
          <div>
            <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Navigation</p>
            <div className="space-y-1">
              {currentMenuItems.map((item) => <NavItem key={item.name} item={item} />)}
            </div>
          </div>

          {systemItems.length > 0 && (
            <div>
              <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">System</p>
              <div className="space-y-1">
                {systemItems.map((item) => <NavItem key={item.name} item={item} />)}
              </div>
            </div>
          )}
        </nav>

        {/* User Profile Card Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-3 mb-5 px-2">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shadow-md shrink-0">
               {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name || "User"}</p>
              <span className="inline-block px-2 py-0.5 text-[10px] font-extrabold text-indigo-300 bg-indigo-950/80 rounded border border-indigo-800/50 uppercase tracking-wider">
                {role === 'ADMIN' ? 'Super Admin' : role}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2.5 text-xs font-bold text-slate-400 rounded-xl hover:bg-rose-500/10 hover:text-rose-400 transition duration-200 group"
          >
            <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2.5 transition-colors group-hover:text-rose-400" />
            LOG OUT
          </button>
        </div>
      </aside>
    </>
  );
}
