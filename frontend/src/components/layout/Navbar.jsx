import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { 
  BellIcon, 
  QuestionMarkCircleIcon, 
  MagnifyingGlassIcon,
  Bars3Icon
} from "@heroicons/react/24/outline";

export default function Navbar({ setSidebarOpen }) {
  const { role } = useContext(AuthContext);

  return (
    <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
      <div className="flex items-center flex-1 max-w-2xl">
        <button 
          className="mr-4 p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div className="relative group w-full hidden sm:block">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text"
            placeholder="Search properties, landlords, or tenants..."
            className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-100 placeholder:text-gray-400 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-4 sm:ml-8">
        <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition relative group">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition">
          <QuestionMarkCircleIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
