export default function TargetAudience() {
  const audiences = [
    { title: "Individual Landlords", label: "Solo investor" },
    { title: "Property Managers", label: "Portfolio builder" },
    { title: "Real Estate Agencies", label: "Institutional broker" },
    { title: "Diaspora Landlords", label: "Remote supervision" },
    { title: "HOA Committees", label: "Community living" },
    { title: "Facility Managers", label: "Operational giants" },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Scaled down text-5xl to text-3xl md:text-4xl */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Scales tightly with your ambition.
        </h2>
        <p className="text-[15px] sm:text-[16px] text-slate-400 font-medium mb-12 max-w-2xl mx-auto">
          Whether you manage a single duplex or a massive distributed housing portfolio, our architecture bends to your specific requirements.
        </p>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {audiences.map((aud, i) => (
            <div key={i} className="flex flex-col items-center bg-white/5 border border-white/10 hover:bg-white/10 transition-colors px-5 py-3 rounded-full cursor-default">
               <span className="text-[15px] font-bold text-white mb-0.5">{aud.title}</span>
               <span className="text-[11px] font-medium text-emerald-400 uppercase tracking-widest">{aud.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
