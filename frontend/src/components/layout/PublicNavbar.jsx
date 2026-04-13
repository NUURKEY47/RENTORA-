import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { RiBuilding4Fill, RiArrowDownSLine } from "react-icons/ri";

export default function PublicNavbar() {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const solutions = [
    "Residential Management",
    "Commercial Properties",
    "Student Housing",
    "HOA & Associations"
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSolutionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-[#0e803c] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
            <RiBuilding4Fill className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold text-[#085a27] tracking-tight">Rentora</span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center space-x-8">
          
          {/* Solutions Dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button 
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              className="flex items-center space-x-1 py-2 text-[15px] font-bold text-slate-700 hover:text-[#0e803c] transition-colors"
            >
              <span>Solutions</span>
              <RiArrowDownSLine className={`h-4 w-4 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {solutionsOpen && (
              <div className="absolute top-full mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                {solutions.map(s => (
                  <button key={s} className="w-full text-left px-4 py-2.5 text-[14px] font-bold text-slate-700 hover:bg-emerald-50 hover:text-[#0e803c] transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="#marketplace" className="text-[15px] font-bold text-slate-700 hover:text-[#0e803c] transition-colors relative group py-2">
            Marketplace
          </a>

          <a href="#pricing" className="text-[15px] font-bold text-slate-700 hover:text-[#0e803c] transition-colors relative group py-2">
            Pricing
          </a>

        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <Link 
            to="/login" 
            className="hidden sm:flex px-5 py-2.5 text-slate-700 rounded-full font-bold text-[14px] hover:bg-slate-50 transition-all cursor-pointer"
          >
            Log in
          </Link>
          <a 
            href="#demo" 
            className="hidden sm:flex px-5 py-2 border-2 border-slate-200 text-slate-700 rounded-full font-bold text-[14px] hover:border-[#0e803c] hover:text-[#0e803c] transition-all cursor-pointer"
          >
            Presentation
          </a>
          <Link 
            to="/register" 
            className="px-6 py-2.5 bg-[#0e803c] text-white rounded-full font-bold text-[14px] hover:bg-[#085a27] transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            Registry
          </Link>
        </div>

      </div>
    </nav>
  );
}
