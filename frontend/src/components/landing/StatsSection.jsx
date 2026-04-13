import { 
  RiHotelFill, 
  RiTeamFill, 
  RiExchangeDollarFill,
  RiCheckDoubleFill
} from "react-icons/ri";

export default function StatsSection() {
  const stats = [
    {
      icon: RiHotelFill,
      value: "10K+",
      label: "Supervised Units"
    },
    {
      icon: RiTeamFill,
      value: "50K+",
      label: "Satisfied Residents"
    },
    {
      icon: RiExchangeDollarFill,
      value: "$100M+",
      label: "Revenue Processed"
    },
    {
      icon: RiCheckDoubleFill,
      value: "99.99%",
      label: "System Reliability"
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-100 shadow-sm relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#f8faf9] p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-slate-50 transition duration-300 border border-slate-100">
               <stat.icon className="h-6 w-6 text-[#0e803c] mb-4" />
               <h3 className="text-xl md:text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
               <p className="text-[13px] text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
