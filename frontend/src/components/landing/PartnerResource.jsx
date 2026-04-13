import { 
  RiFilePaper2Line, 
  RiUserSearchLine, 
  RiAlarmWarningLine,
  RiPieChartLine 
} from "react-icons/ri";

export default function PartnerResource() {
  const points = [
    {
      title: "Rent invoicing & receipts",
      desc: "Stay organized with clear billing and payment records.",
      icon: RiFilePaper2Line,
    },
    {
      title: "Tenant profiles & tracking",
      desc: "Keep leases, contacts, and history in one place.",
      icon: RiUserSearchLine,
    },
    {
      title: "Reminders & follow-ups",
      desc: "Reduce late payments with timely notifications.",
      icon: RiAlarmWarningLine,
    },
    {
      title: "Reports & statements",
      desc: "Get fast insights on income, arrears, and performance.",
      icon: RiPieChartLine,
    },
  ];

  return (
    <section className="py-20 bg-[#085a27] text-white relative overflow-hidden">
      
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 opacity-10 background-pattern-radial pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Bold message */}
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 text-emerald-300 rounded-full text-[11px] font-bold tracking-wide uppercase mb-6 border border-emerald-400/20">
               <span>Rentora OS</span>
            </div>
            
            {/* Reduced from 5xl to 3xl/4xl */}
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-5">
              Need a clean, modern platform to track rent & manage tenants?
            </h2>
            <p className="text-[15px] sm:text-[16px] text-emerald-50/90 mb-8 font-medium max-w-md leading-relaxed">
              Rentora is built to keep day-to-day operations simple for landlords and property managers. Stay perfectly on top of arrears.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
               <button className="px-6 py-3 bg-white text-[#085a27] rounded-xl font-bold text-[14px] hover:bg-slate-50 transition shadow-lg">
                  Create an account
               </button>
               <button className="px-6 py-3 border border-white/30 text-white rounded-xl font-bold text-[14px] hover:bg-white/10 transition">
                  Explore features
               </button>
            </div>
          </div>

          {/* Right Column: Key Points */}
          <div className="bg-slate-900/40 backdrop-blur-md p-6 sm:p-8 rounded-[24px] border border-white/10 shadow-2xl">
            <div className="space-y-6">
               {points.map((pt, i) => (
                 <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="bg-emerald-500/20 p-3 rounded-lg mr-4 mb-3 sm:mb-0 shrink-0 border border-emerald-400/20">
                       <pt.icon className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div>
                       <h3 className="text-[16px] font-bold text-white mb-0.5">{pt.title}</h3>
                       <p className="text-[13px] text-emerald-100/70 font-medium">{pt.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
