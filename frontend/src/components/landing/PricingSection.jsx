export default function PricingSection() {
  const plans = [
    {
      name: "Starter Plan",
      units: "Up to 100 units",
      monthly: "5,000",
      quarterly: "14,250",
      yearly: "54,000",
      highlighted: false,
    },
    {
      name: "Basic Plan",
      units: "Up to 250 units",
      monthly: "10,000",
      quarterly: "28,500",
      yearly: "108,000",
      highlighted: true,
    },
    {
      name: "Standard Plan",
      units: "Up to 650 units",
      monthly: "20,000",
      quarterly: "57,000",
      yearly: "216,000",
      highlighted: false,
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#fafbfb] border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#085a27] tracking-tight mb-4">
            Choose Your Package
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-600 font-medium">
            Starter (100 units), Basic (250 units), Standard (650 units). Beyond that, <a href="#" className="underline hover:text-[#085a27]">talk to sales.</a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4">
          {plans.map((plan, i) => (
            <div 
               key={i} 
               className={`flex flex-col bg-white rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1 relative ${plan.highlighted ? 'border-2 border-[#0e803c] shadow-xl shadow-emerald-900/5' : 'border border-slate-200 shadow-sm'}`}
            >
               {plan.highlighted && (
                  <div className="absolute -top-3.5 left-8 px-3 py-1 bg-emerald-50 text-[#0e803c] rounded-full text-[12px] font-bold tracking-wider uppercase border border-emerald-200">
                     Recommended
                  </div>
               )}

               <div className="mb-8">
                  <h3 className="text-[17px] font-bold text-slate-800 mb-1">{plan.name}</h3>
                  <p className="text-[14px] text-slate-500 font-medium pb-6 border-b border-slate-100">{plan.units}</p>
                  
                  <div className="mt-6 flex items-baseline">
                     <span className="text-[16px] font-bold text-slate-500 mr-1.5">KES</span>
                     <span className="text-4xl font-black text-[#085a27] tracking-tight">{plan.monthly}</span>
                     <span className="text-[14px] font-medium text-slate-500 ml-1">/ Month</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[13px] font-medium text-slate-500">
                     <div>Quarterly: KES {plan.quarterly}</div>
                     <div>Yearly: KES {plan.yearly}</div>
                  </div>
               </div>

               <div className="mt-auto">
                  <p className="text-[14px] text-slate-600 font-medium mb-6">{plan.units}</p>
                  <button className="w-full py-3.5 bg-[#085a27] text-white rounded-xl font-bold text-[15px] hover:bg-[#06421c] transition shadow-md shadow-emerald-900/10">
                     Select Plan
                  </button>
               </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
            <p className="text-[15px] text-slate-500 font-medium">
               Need more than 650 units? <a href="#" className="text-[#085a27] font-bold underline hover:text-[#06421c]">Talk to sales.</a>
            </p>
        </div>

      </div>
    </section>
  );
}
