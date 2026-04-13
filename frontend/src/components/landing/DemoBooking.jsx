import { RiCheckLine } from "react-icons/ri";

export default function DemoBooking() {
  return (
    <>
      {/* Banner CTA */}
      <section className="bg-[#085a27] py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
         <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            You didn’t become a landlord to be a bookkeeper.
         </h2>
         <p className="text-emerald-100 font-medium text-lg mb-8 max-w-2xl mx-auto">
            Grow your portfolio — let Rentora handle rent, accounting & reporting.
         </p>
         <button className="px-8 py-3.5 bg-white text-[#085a27] rounded-full font-bold text-[15px] shadow-lg shadow-emerald-900/50 hover:bg-emerald-50 transition">
            Get Started Free
         </button>
      </section>

      {/* Demo Booking Section */}
      <section className="py-24 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           
           <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                 See Rentora in Action
              </h2>
              <p className="text-[17px] text-slate-600 font-medium max-w-3xl leading-relaxed mb-6">
                 Explore our product on your own or book a guided walkthrough with our onboarding team. We will help you discover how Rentora simplifies rent collection, communication, and reporting.
              </p>
              <div className="flex space-x-4">
                 <button className="px-6 py-2.5 bg-[#0e803c] text-white rounded-full font-medium text-[15px] hover:bg-[#085a27] transition shadow-md shadow-emerald-500/20">
                    Launch the Live Demo
                 </button>
                 <button className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-full font-medium text-[15px] hover:border-[#0e803c] hover:text-[#0e803c] transition">
                    Register Now
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-[#f4f8f6] rounded-[32px] p-8 lg:p-12 border border-slate-100">
              
              {/* Left: What to expect */}
              <div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-8">What to expect</h3>
                 <ul className="space-y-6">
                    <li className="flex items-start">
                       <RiCheckLine className="h-6 w-6 text-[#0e803c] mr-3 shrink-0" />
                       <span className="text-[15px] text-slate-700 font-medium leading-relaxed">
                          Hands-on tour of rent automation, tenant communications, and financial reporting.
                       </span>
                    </li>
                    <li className="flex items-start">
                       <RiCheckLine className="h-6 w-6 text-[#0e803c] mr-3 shrink-0" />
                       <span className="text-[15px] text-slate-700 font-medium leading-relaxed">
                          Answers to your specific questions from a product specialist.
                       </span>
                    </li>
                    <li className="flex items-start">
                       <RiCheckLine className="h-6 w-6 text-[#0e803c] mr-3 shrink-0" />
                       <span className="text-[15px] text-slate-700 font-medium leading-relaxed">
                          Guidance on migrating data and setting up your first properties.
                       </span>
                    </li>
                 </ul>
              </div>

              {/* Right: Opt-in Form */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100">
                 <h4 className="text-xl font-bold text-slate-900 mb-2">Request a demo presentation</h4>
                 <p className="text-[13px] text-slate-500 font-medium mb-6">
                    Tell us about your portfolio and we will reach out within one business day to schedule a personalised session. Provide at least an email address or phone number so we can confirm your session.
                 </p>
                 <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <input type="text" placeholder="First Name" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#0e803c] focus:ring-1 focus:ring-[#0e803c]" />
                       <input type="text" placeholder="Last Name" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#0e803c] focus:ring-1 focus:ring-[#0e803c]" />
                    </div>
                    <input type="email" placeholder="Email Address" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#0e803c] focus:ring-1 focus:ring-[#0e803c]" />
                    <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#0e803c] focus:ring-1 focus:ring-[#0e803c]" />
                    <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-500 focus:outline-none focus:border-[#0e803c] focus:ring-1 focus:ring-[#0e803c] bg-white">
                       <option value="">Portfolio Size</option>
                       <option value="1-10">1 - 10 Units</option>
                       <option value="11-50">11 - 50 Units</option>
                       <option value="50+">50+ Units</option>
                    </select>
                    <button type="button" className="w-full py-3 mt-2 bg-[#0e803c] text-white rounded-lg font-bold text-[14px] hover:bg-[#085a27] transition shadow-md shadow-emerald-500/20">
                       Request Presentation
                    </button>
                 </form>
              </div>

           </div>
        </div>
      </section>
    </>
  );
}
