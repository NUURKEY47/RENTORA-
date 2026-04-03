export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
         <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-10 border border-blue-100 shadow-sm shadow-blue-50">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Next-Gen Data Infrastructure
         </div>
         
         <h1 className="text-5xl lg:text-8xl font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight max-w-5xl mx-auto">
            Your Real Estate Operations, <br />
            <span className="text-blue-600 italic">Automated.</span>
         </h1>
         
         <p className="text-xl text-gray-500 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
            Scale your property portfolio with high-performance APIs powered by Node.js, Prisma, and Express. Experience the speed of institutional-grade real estate automation.
         </p>
         
         <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-24 max-w-xl mx-auto">
            <div className="w-full relative">
               <input 
                  type="email" 
                  placeholder="Enter your business email" 
                  className="w-full px-8 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-sm focus:ring-2 focus:ring-blue-100 outline-none transition"
               />
            </div>
            <button className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-wider shadow-2xl shadow-blue-300 hover:bg-blue-700 transition transform hover:-translate-y-1">
               Access the Engine
            </button>
         </div>

         {/* Tech Stack Ribbon */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <TechCard name="Node.js" role="RUNTIME" image="https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png" />
            <TechCard name="Prisma" role="ORM ENGINE" image="https://raw.githubusercontent.com/prisma/prisma/main/packages/sdk/src/images/prisma-logo.png" />
            <TechCard name="Express" role="FRAMEWORK" image="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg" />
            <TechCard name="PostgreSQL" role="DATABASE" image="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" />
         </div>
      </div>
    </section>
  );
}

function TechCard({ name, role, image }) {
  return (
    <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 flex flex-col items-center justify-center group hover:bg-white hover:shadow-xl transition-all duration-300">
       <div className="h-12 w-12 mb-4 flex items-center justify-center group-hover:scale-110 transition">
          <img src={image} alt={name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0" />
       </div>
       <h4 className="text-sm font-bold text-gray-900 mb-1">{name}</h4>
       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{role}</p>
    </div>
  );
}
