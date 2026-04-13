import { 
  RiShieldStarLine, 
  RiHeadphoneLine, 
  RiComputerLine,
  RiDatabaseLine,
  RiRocketLine,
  RiCheckDoubleLine
} from "react-icons/ri";

export default function HeroSection() {
  return (
    <section id="platform" className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[#f8faf9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">
          
          {/* Left Column: Content */}
          <div className="flex flex-col items-start text-left max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-100/50 text-[#0a6630] rounded-full text-[13px] font-semibold mb-6 border border-emerald-200">
               <RiCheckDoubleLine className="h-4 w-4" />
               <span>Engineered for Maximum Yield</span>
            </div>
            
            <h1 className="text-5xl lg:text-[64px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-4">
               The Global Real Estate Operating System
            </h1>

            <h2 className="text-xl lg:text-2xl font-medium text-[#0a6630] mb-6">
               Intelligent Software for Elite Landlords & Managers
            </h2>
            
            <p className="text-[17px] text-slate-600 leading-relaxed mb-10">
               Eradicate manual data entry, streamline unit turnovers, and securely funnel all collection payments into a singular dynamic hub.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mb-10">
               <button className="w-full sm:w-auto px-8 py-3.5 bg-[#0e803c] text-white rounded-full font-medium text-[15px] hover:bg-[#085a27] transition shadow-lg shadow-emerald-500/20">
                  Setup Account
               </button>
               <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-700 rounded-full font-medium text-[15px] hover:text-[#0e803c] transition shadow-sm border border-slate-200">
                  View Tour
               </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[13px] font-medium text-slate-600">
               <div className="flex items-center space-x-1.5">
                  <RiShieldStarLine className="h-4 w-4 text-[#0e803c]" />
                  <span>Military-grade data protection</span>
               </div>
               <div className="flex items-center space-x-1.5">
                  <RiHeadphoneLine className="h-4 w-4 text-[#0e803c]" />
                  <span>Dedicated concierge</span>
               </div>
               <div className="flex items-center space-x-1.5">
                  <RiComputerLine className="h-4 w-4 text-[#0e803c]" />
                  <span>Cross-device compatibility</span>
               </div>
            </div>
          </div>

          {/* Right Column: Visual Graphic */}
          <div className="relative mt-8 lg:mt-0">
             <div className="relative rounded-[24px] overflow-hidden shadow-xl shadow-slate-200 border-[8px] border-white/80 backdrop-blur-md transform transition duration-700 hover:-translate-y-2 bg-white">
                <img 
                   src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80" 
                   className="w-full h-auto object-cover" 
                   alt="Rentora Dashboard Mockup"
                />
             </div>
          </div>
        </div>

        {/* Bottom Bar items */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-[13px] font-medium text-slate-500 pt-8 border-t border-slate-200/60">
           <span>Trusted by top-tier real estate operators</span>
           <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300"></div>
           <div className="flex items-center space-x-1.5">
              <RiDatabaseLine className="h-4 w-4 text-[#0e803c]" />
              <span>Immutable transaction logs</span>
           </div>
           <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300"></div>
           <div className="flex items-center space-x-1.5">
              <RiRocketLine className="h-4 w-4 text-[#0e803c]" />
              <span>Deploy in 5 minutes</span>
           </div>
        </div>

      </div>
    </section>
  );
}
