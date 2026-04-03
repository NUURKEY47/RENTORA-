import { 
  ChatBubbleLeftRightIcon, 
  PresentationChartLineIcon, 
  AcademicCapIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function Services() {
  const services = [
    {
      title: "Institutional Advisory",
      desc: "Custom data strategies for high-volume portfolios. We help you transition from legacy systems to our automated infrastructure.",
      icon: PresentationChartLineIcon,
    },
    {
      title: "Strategic Asset Management",
      desc: "Our human experts work alongside the software to provide quarterly performance audits and portfolio optimization advice.",
      icon: AcademicCapIcon,
    },
    {
      title: "Technical Consulting",
      desc: "Bespoke API development and 24/7 technical oversight for global property tech firms requiring extreme uptime.",
      icon: ChatBubbleLeftRightIcon,
    },
  ];

  return (
    <section id="services" className="py-32 bg-gray-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_100%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex items-center justify-between gap-20">
          <div className="lg:w-1/2 mb-16 lg:mb-0">
             <span className="px-3 py-1 bg-blue-600/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-lg mb-6 inline-block border border-blue-500/20">The Human Element</span>
             <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
                Expert <span className="text-blue-500">Consulting.</span> <br />
                Institutional Scale.
             </h2>
             <p className="text-lg text-gray-400 font-medium leading-relaxed mb-10">
                Beyond our software, we provide elite advisory services for firms that require a human touch in their digital transformation.
             </p>
             <button className="flex items-center text-sm font-bold text-white uppercase tracking-widest group">
                Download Service Deck <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-2 transition" />
             </button>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 gap-6">
             {services.map((s, i) => (
               <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition group cursor-pointer">
                  <div className="flex items-center space-x-6">
                     <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-900/20 group-hover:scale-110 transition">
                        <s.icon className="h-6 w-6" />
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                        <p className="text-sm font-medium text-gray-400 leading-relaxed">{s.desc}</p>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
