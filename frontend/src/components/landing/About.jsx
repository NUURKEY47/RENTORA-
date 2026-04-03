import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function About() {
  const curators = [
    {
      name: "Marcus Thorne",
      title: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Elena Vance",
      title: "CTO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Julian Ross",
      title: "Head of Product",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sarah Chen",
      title: "VP, Institutional Sales",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="lg:flex items-center gap-20">
          <div className="lg:w-1/2">
             <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-lg mb-6 inline-block">Our Vision</span>
             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
                The Architectural <span className="text-blue-600 italic">Intelligence</span> for the Built World.
             </h2>
             <p className="text-lg text-gray-500 font-medium leading-relaxed">
                RealApi is modernizing the real estate industry by treating data as infrastructure. We build the architectural software that bridges the gap between physical spaces and digital insights.
             </p>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
             <div className="relative rounded-[32px] overflow-hidden group">
                <img                     src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" 
                    className="w-full h-[400px] object-cover transition duration-700 group-hover:scale-105" 
                    alt="Intelligence"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">The Curators</h3>
        <p className="text-gray-500 font-medium mb-12">Our team combines decades of experience in urban planning, software engineering, and asset management.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {curators.map((c, i) => (
             <div key={i} className="group">
                <div className="aspect-square relative rounded-3xl overflow-hidden mb-6 filter grayscale hover:grayscale-0 transition duration-500 border border-gray-100">
                   <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">{c.name}</h4>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{c.title}</p>
             </div>
           ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-50 pt-32 pb-32">
         <div className="bg-blue-600 rounded-[48px] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-[120px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
               <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg mb-8 inline-block backdrop-blur-md">Join our Journey</span>
               <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
                  Building the Future of <br /> <span className="italic">Property Data.</span>
               </h2>
               <p className="text-lg text-blue-100 font-medium leading-relaxed mb-12">
                  Our mission is to architect a more transparent, efficient real estate ecosystem through open data and high-performance software. We're just getting started.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <button className="w-full sm:w-auto px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold text-sm tracking-wider uppercase hover:bg-gray-50 transition shadow-2xl shadow-blue-800/10">Follow our Story</button>
                  <button className="w-full sm:w-auto px-10 py-4 bg-blue-700 text-white border border-white/10 rounded-2xl font-bold text-sm tracking-wider uppercase hover:bg-blue-800 transition">View Core Roadmap</button>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-50 pt-32 pb-32">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
               <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Institutional Inquiries</h3>
               <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none transition" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Organization</label>
                        <input type="text" placeholder="Real Estate Invest Co." className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none transition" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                     <input type="email" placeholder="john@company.com" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none transition" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
                     <textarea placeholder="Tell us about your data needs..." className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-sm font-medium h-32 focus:ring-2 focus:ring-blue-100 outline-none transition resize-none"></textarea>
                  </div>
                  <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-sm tracking-wider uppercase hover:bg-blue-700 transition shadow-xl shadow-blue-100">Submit Inquiry</button>
               </form>
            </div>
            
            <div className="space-y-12">
               <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight text-center lg:text-left">Headquarters</h3>
                  <div className="space-y-4 max-w-sm mx-auto lg:mx-0">
                     <div className="flex items-center space-x-4">
                        <MapPinIcon className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">One World Trade Center, New York</span>
                     </div>
                     <div className="flex items-center space-x-4">
                        <PhoneIcon className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-bold text-gray-500 tracking-wider font-mono">+1 (212) 555-0199</span>
                     </div>
                  </div>
               </div>
               <div className="h-[400px] w-full rounded-[32px] overflow-hidden border border-gray-100 shadow-2xl relative grayscale opacity-90 hover:grayscale-0 transition duration-700">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Map" />
                  <div className="absolute inset-0 bg-blue-600/5 mix-blend-multiply"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <div className="h-6 w-6 bg-blue-600 rounded-full border-4 border-white shadow-2xl animate-pulse"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}
