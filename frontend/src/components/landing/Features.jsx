import { 
  RiBuilding4Fill, 
  RiGroupFill, 
  RiFileList3Fill,
  RiSettings3Fill,
  RiMoneyDollarCircleFill,
  RiBarChartBoxFill
} from "react-icons/ri";

export default function Features() {
  const bentoGrid = [
    {
      title: "Intelligent Portfolio Control",
      desc: "Supervise residential, commercial, and mixed-use structures dynamically. Adjust rent caps, utility lines, and unit statuses in real-time without refreshing.",
      icon: RiBuilding4Fill,
      className: "md:col-span-2 bg-slate-900 text-white border-0",
      titleClass: "text-white",
      descClass: "text-slate-300",
      iconClass: "text-emerald-400"
    },
    {
      title: "Verified Sync",
      desc: "Deep integration with local identity verification to secure tenant data.",
      icon: RiGroupFill,
      className: "md:col-span-1 bg-white border border-slate-200",
      titleClass: "text-slate-800",
      descClass: "text-slate-500",
      iconClass: "text-[#0e803c]"
    },
    {
      title: "Digital Leasing",
      desc: "Generate, deploy, and execute binding lease agreements via SMS or secure email links. Zero paper required.",
      icon: RiFileList3Fill,
      className: "md:col-span-1 bg-emerald-50 border border-emerald-100",
      titleClass: "text-[#085a27]",
      descClass: "text-[#0e803c]/80",
      iconClass: "text-[#085a27]"
    },
    {
      title: "Automated Reconciliation",
      desc: "Link directly to global gateways and local bank accounts. Rentora auto-identifies deposits and matches them to tenant ledgers instantly.",
      icon: RiMoneyDollarCircleFill,
      className: "md:col-span-2 bg-white border border-slate-200",
      titleClass: "text-slate-800",
      descClass: "text-slate-500",
      iconClass: "text-[#0e803c]"
    },
    {
      title: "Predictive Maintenance",
      desc: "Route work orders to vendors before tenants complain.",
      icon: RiSettings3Fill,
      className: "md:col-span-2 lg:col-span-1 bg-white border border-slate-200",
      titleClass: "text-slate-800",
      descClass: "text-slate-500",
      iconClass: "text-[#0e803c]"
    },
    {
      title: "Live Command Center",
      desc: "Transform raw ledger data into rich visual graphs, identifying revenue leaks across your entire property stack.",
      icon: RiBarChartBoxFill,
      className: "md:col-span-1 lg:col-span-2 bg-slate-50 border border-slate-200",
      titleClass: "text-slate-800",
      descClass: "text-slate-500",
      iconClass: "text-[#0e803c]"
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#fafbfb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-left mb-12">
          {/* Reduced from text-5xl to text-3xl/4xl */}
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4 max-w-2xl">
            Rentora Platform Capabilities
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-600 font-medium max-w-xl">
            A radically simplified approach to complex real estate operations. Built to scale from 1 to 10,000 units effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoGrid.map((feature, i) => (
            <div key={i} className={`p-6 md:p-8 rounded-[24px] flex flex-col justify-between transition-transform duration-500 hover:-translate-y-1 shadow-sm hover:shadow-md ${feature.className}`}>
               <div>
                  <div className={`h-12 w-12 rounded-xl mb-5 flex items-center justify-center bg-white/10 border ${feature.className.includes('bg-slate-900') ? 'border-white/10' : 'border-slate-100'}`}>
                     <feature.icon className={`h-6 w-6 ${feature.iconClass}`} />
                  </div>
                  {/* Reduced headers from 2xl to xl */}
                  <h3 className={`text-xl font-bold mb-2 ${feature.titleClass}`}>{feature.title}</h3>
                  <p className={`text-[14px] leading-relaxed font-medium ${feature.descClass}`}>
                     {feature.desc}
                  </p>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
