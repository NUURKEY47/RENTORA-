import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      target: "Developer",
      features: ["Up to 1,000 API calls / mo", "Standard market data", "Public community support"],
      button: "Get Started",
    },
    {
      name: "Professional",
      price: "$249",
      target: "Institutional",
      features: ["Unlimited historical data", "Real-time listing alerts", "Predictive market insights", "Priority email support"],
      button: "Join Pro Waitlist",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      target: "Strategic",
      features: ["Dedicated data engineers", "Custom API endpoints", "SLA & On-prem options"],
      button: "Contact Sales",
    },
  ];

  return (
    <section className="py-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6">
          Architectural Precision <br />
          <span className="text-blue-600">For Every Scale.</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-500 font-medium">
          Institutional-grade real estate data infrastructure. Transparent tiers designed for individual investors and global enterprises alike.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {tiers.map((tier, i) => (
             <div key={i} className={`bg-white rounded-[32px] p-10 border ${tier.popular ? 'border-blue-600 border-2 shadow-2xl relative' : 'border-gray-100 shadow-sm'} transition-transform hover:-translate-y-2`}>
                {tier.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Most Popular
                  </span>
                )}
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">{tier.target}</p>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="flex items-baseline space-x-1 mb-8">
                   <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                   {tier.price !== "Custom" && <span className="text-gray-400 font-medium font-sm">/ month</span>}
                </div>
                <div className="space-y-4 mb-10">
                   {tier.features.map((f, j) => (
                     <div key={j} className="flex items-center space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-blue-600 shrink-0" />
                        <span className="text-sm font-medium text-gray-600">{f}</span>
                     </div>
                   ))}
                </div>
                <button className={`w-full py-4 rounded-xl font-bold text-sm transition ${tier.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-900 border border-gray-100 hover:bg-gray-100'}`}>
                   {tier.button}
                </button>
             </div>
           ))}
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-48 pb-32">
         <h3 className="text-3xl font-bold text-gray-900 text-center mb-16 tracking-tight">Curated Answers</h3>
         <div className="space-y-4">
            <FaqItem question="How accurate is your market data?" answer="Our data is sourced directly from institutional feeds and audited daily. We maintain a 99.8% accuracy rate across all active listings." />
            <FaqItem question="Can I upgrade or downgrade my tier later?" answer="Yes, you can change your plan at any time through your dashboard. Pro-rated adjustments will be applied to your next billing cycle." />
            <FaqItem question="What does 'Unlimited Historical Data' include?" answer="Professional members get access to our full 10-year archive of property transactions and price movements." />
            <FaqItem question="Do you offer discounts for non-profits?" answer="Yes, we support urban planning research. Contact our sales team for educational and non-profit pricing." />
         </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300">
       <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-8 py-6 flex items-center justify-between text-left group"
       >
          <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">{question}</span>
          <span className={`text-blue-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </span>
       </button>
       {isOpen && (
         <div className="px-8 pb-8 text-sm font-medium text-gray-500 leading-relaxed animate-in slide-in-from-top-2">
            {answer}
         </div>
       )}
    </div>
  );
}
