import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { 
  BellIcon, 
  QuestionMarkCircleIcon, 
  MagnifyingGlassIcon,
  Bars3Icon
} from "@heroicons/react/24/outline";

export default function Navbar({ setSidebarOpen }) {
  const { role, user } = useContext(AuthContext);

  return (
    <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20 shadow-xs">
      <div className="flex items-center flex-1 max-w-2xl">
        <button 
          className="mr-4 p-2 text-slate-500 rounded-xl lg:hidden hover:bg-slate-100 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div className="relative group w-full hidden sm:block">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text"
            placeholder="Search properties, plaza stalls, landlords, or tenants..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 placeholder:text-slate-400 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 ml-4 sm:ml-8">
        <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full"></span>
        </button>
        <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition">
          <QuestionMarkCircleIcon className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-slate-200 mx-2"></div>
        <Link to="/profile" className="flex items-center space-x-3 hover:opacity-80 transition cursor-pointer">
          <div className="w-9 h-9 bg-indigo-600 text-white font-bold rounded-xl flex items-center justify-center text-sm shadow-sm shrink-0">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-extrabold text-slate-900 leading-tight">{user?.name || "Account"}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{role}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
