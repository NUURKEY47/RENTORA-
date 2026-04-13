import { 
  RiUser3Fill, 
  RiNotification4Fill, 
  RiMessage3Fill,
  RiFolder2Fill,
  RiPieChart2Fill,
  RiServiceFill
} from "react-icons/ri";

export default function TenantManagement() {
  const tenants = [
    {
      title: "Digital Onboarding",
      desc: "Move tenants in with verifiable digital IDs, automated background checks, and instant ledger creation.",
      icon: RiUser3Fill,
    },
    {
      title: "Automated Cadence",
      desc: "Customizable SMS and Email drip sequences for approaching rent deadlines and upcoming lease expiries.",
      icon: RiNotification4Fill,
    },
    {
      title: "Unified Messaging inbox",
      desc: "Replace WhatsApp chaos. All tenant requests, inquiries, and complaints live in a structured CRM.",
      icon: RiMessage3Fill,
    },
    {
      title: "The Secure Vault",
      desc: "Bank-level encryption for signed leases, move-in inspection photos, and compliance permits.",
      icon: RiFolder2Fill,
    },
    {
      title: "Predictive Analytics",
      desc: "Identify early-warning signs of arrears based on historical payment behavior across units.",
      icon: RiPieChart2Fill,
    },
    {
      title: "24/7 Concierge",
      desc: "Route emergency repair requests directly to pre-trusted vendors based on the tenant's exact location.",
      icon: RiServiceFill,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 mb-10 lg:mb-0">
             {/* Scaled down from text-5xl to text-3xl md:text-4xl */}
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-5">
               Deliver a Flawless <br className="hidden lg:block"/><span className="text-[#0e803c]">Tenant Experience.</span>
             </h2>
             <p className="text-[15px] sm:text-[16px] text-slate-600 font-medium leading-relaxed mb-8 max-w-lg">
               Modern tenants expect a consumer-grade digital experience. From the first digital signature to their final deposit return, keep everything flawlessly transparent.
             </p>
             <button className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-[14px] hover:bg-slate-800 transition shadow-lg">
                Explore the Tenant Portal
             </button>
          </div>

          <div className="lg:col-span-7">
             <div className="space-y-3">
                {tenants.map((feature, i) => (
                  <div key={i} className="group relative flex items-start p-5 bg-white hover:bg-[#fafbfb] border border-slate-100 rounded-xl transition duration-300 shadow-sm hover:shadow-md">
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-transparent group-hover:bg-[#0e803c] rounded-r-full transition-colors"></div>
                     <div className="mr-5 bg-[#f4f8f6] p-2.5 rounded-lg shrink-0">
                       <feature.icon className="h-5 w-5 text-[#0e803c]" />
                     </div>
                     <div>
                       <h3 className="text-[16px] font-bold text-slate-900 mb-1">{feature.title}</h3>
                       <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                          {feature.desc}
                       </p>
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
