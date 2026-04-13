import { useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

export default function SEOContentAndFAQs() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How does Rentora simplify accounting?",
      a: "Our system automatically categorizes your rental income and expenses, making tax season and Schedule E preparation effortless for any portfolio size."
    },
    {
      q: "What benefits do landlords receive beyond management?",
      a: "Landlords gain direct access to our live marketplace, where their vacant units are highlighted to verified visitors, significantly reducing vacancy rates."
    },
    {
      q: "Can I manage everything from one place?",
      a: "Yes. From listing your properties to tracking rent collection and managing portfolio scaling—Rentora provides a single digital command center."
    },
    {
      q: "How secure is my financial data?",
      a: "Security is our foundation. We use multi-layer encryption and strict role-based access control to ensure that your financial data remains private and secure."
    }
  ];

  return (
    <section className="py-24 bg-white" id="faqs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SEO Text Block */}
        <div className="prose prose-slate max-w-none mb-24 text-center max-w-4xl mx-auto">
           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-8">
             The Definitive Property Management System
           </h2>
           <p className="text-[16px] text-slate-600 leading-relaxed mb-6 font-medium text-left">
              Rentora is the definitive property management system, designed to simplify every aspect of rental operations for landlords and agencies. As a comprehensive rental management system, it unites rent collection, lease administration, maintenance tracking, financial reporting, tenant communications, and document storage under one intuitive dashboard.
           </p>
           <p className="text-[16px] text-slate-600 leading-relaxed mb-6 font-medium text-left">
              In today's dynamic real estate market, keeping track of rent payments, lease renewals, and maintenance tasks across multiple properties can become overwhelming. Our property management system automates automated payment receipts, sends timely reminders, and issues digital acknowledgements instantly — improving cash flow and tenant experience.
           </p>
           <p className="text-[16px] text-slate-600 leading-relaxed font-medium text-left">
              Rentora centralizes your portfolio — occupancy rates, lease expiries, arrears, and maintenance — on a single screen. Custom dashboards highlight the metrics that matter to you, powering smarter decisions on pricing, upkeep, and growth. Maintenance moves from reactive to proactive: tenants submit requests with photos, you assign vendors, track progress, and keep everyone informed.
           </p>
        </div>

        {/* FAQs */}
        <div>
           <div className="mb-12">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
               Frequently Asked Questions
             </h2>
             <p className="text-[15px] text-slate-500 font-medium">
               Everything about Rentora for landlords and managers.
             </p>
           </div>

           <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-300">
                   <button 
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-6 bg-white hover:bg-[#f9fafb] transition-colors text-left"
                   >
                      <span className="font-bold text-[16px] text-slate-800">{faq.q}</span>
                      {openFaq === index ? (
                         <RiSubtractLine className="h-5 w-5 text-slate-400 flex-shrink-0 ml-4" />
                      ) : (
                         <RiAddLine className="h-5 w-5 text-slate-400 flex-shrink-0 ml-4" />
                      )}
                   </button>
                   {openFaq === index && (
                      <div className="p-6 pt-0 bg-white">
                         <p className="text-[15px] text-slate-600 font-medium leading-relaxed">
                            {faq.a}
                         </p>
                      </div>
                   )}
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}
