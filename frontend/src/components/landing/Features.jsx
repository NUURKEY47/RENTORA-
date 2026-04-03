import { 
  BuildingOfficeIcon, 
  UsersIcon, 
  UserGroupIcon, 
  CheckCircleIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  CircleStackIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function Features() {
  return (
    <div className="space-y-32 py-32">
      <Stakeholders />
      <Milestones />
      <Architecture />
    </div>
  );
}

function Stakeholders() {
  const roles = [
    {
      title: "For Admins",
      desc: "Centralize operations with robust system controls, auditing tools, and granular API permissions management.",
      features: ["Global Role Management", "Real-time Audit Logs"],
      icon: ShieldCheckIcon,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "For Landlords",
      desc: "Maximize ROI with automated lease generation, digital maintenance tracking, and financial analytics.",
      features: ["Automated Rent Collection", "Portfolio Yield Insights"],
      icon: BuildingOfficeIcon,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "For Tenants",
      desc: "Premium portal experience for hassle-free payments, instant support, and smart home integrations.",
      features: ["One-click Rent Payments", "Smart Lock Integrations"],
      icon: UsersIcon,
      color: "text-blue-600 bg-blue-50",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Designed for Every Stakeholder</h2>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">One platform, three powerful experiences tailored to the modern real estate ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roles.map((role, i) => (
          <div key={i} className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
             <div className={`w-12 h-12 rounded-2xl ${role.color} flex items-center justify-center mb-8 group-hover:scale-110 transition`}>
                <role.icon className="h-6 w-6" />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-4">{role.title}</h3>
             <p className="text-sm font-medium text-gray-500 leading-relaxed mb-8">{role.desc}</p>
             <div className="space-y-3">
                {role.features.map((f, j) => (
                  <div key={j} className="flex items-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                     <CheckCircleIcon className="h-4 w-4 mr-2 text-blue-600" />
                     {f}
                  </div>
                ))}
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Milestones() {
  const steps = [
    {
      id: "01-02",
      title: "Foundation & Type Safety",
      desc: "Initial project scaffolding using TypeScript, ESLint, and Prettier. Implementation of the core Prisma Schema to map complex real estate relationships (Listings, Transactions, Geodata).",
      code: `model Listing {\n  id        String @id @default(uuid())\n  price     Decimal\n  coordinates Json? // { lat, lng }\n}`,
      color: "bg-white border-gray-100",
    },
    {
        id: "03",
        title: "Auth & RBAC",
        desc: "Stateless JWT authentication paired with granular Role-Based Access Control to secure sensitive institutional data layers.",
        features: ["JWT", "RBAC"],
        color: "bg-blue-600 text-white border-blue-500",
    },
    {
        id: "04-05",
        title: "The Middleware Chain",
        desc: "Implementation of global error handling, rate limiting (Express-Rate-Limit), and Morgan logging for observability.",
        tags: ["RATE LIMIT", "DB VALIDATION", "HMAC"],
        color: "bg-indigo-50 border-indigo-100 text-indigo-900",
    },
    {
        id: "06-08",
        title: "CRUD Modules & Optimized Search",
        desc: "Modular controller logic for real estate entity management. Integration of search indices to allow sub-second queries across 10M+ properties.",
        color: "bg-white border-gray-100",
        showSearchIcon: true,
    },
    {
        id: "09-10",
        title: "Documentation & Stress Testing",
        desc: "Auto-generated Swagger/OpenAPI documentation and artillary load testing scripts. Ensuring the platform maintains 99.9% uptime during data ingestion spikes.",
        color: "bg-gray-900 text-white border-gray-800",
        hasButton: true,
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
         <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Development Milestones</h2>
         <p className="text-gray-500 font-medium uppercase text-[10px] tracking-widest leading-loose">The architectural blueprint of our rapid-deployment cycle.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Row 1 */}
         <div className={`lg:col-span-8 p-10 rounded-[32px] border ${steps[0].color} shadow-sm group`}>
            <div className="flex items-baseline space-x-3 mb-6">
               <span className="text-2xl font-bold text-blue-100/30 group-hover:text-blue-600 transition tracking-tighter">{steps[0].id}</span>
               <h3 className="text-xl font-bold text-gray-900">{steps[0].title}</h3>
            </div>
            <p className="text-sm font-medium text-gray-400 mb-8 max-w-xl">{steps[0].desc}</p>
            <div className="bg-gray-900 rounded-2xl p-6 font-mono text-[10px] text-blue-300 leading-relaxed overflow-hidden">
               <pre className="whitespace-pre-wrap">{steps[0].code}</pre>
            </div>
         </div>

         <div className={`lg:col-span-4 p-10 rounded-[32px] border ${steps[1].color} shadow-xl shadow-blue-100 flex flex-col justify-between`}>
            <div>
                <span className="text-2xl font-bold opacity-30 tracking-tighter mb-4 block">{steps[1].id}</span>
                <h3 className="text-xl font-bold mb-4">{steps[1].title}</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">{steps[1].desc}</p>
            </div>
            <div className="flex space-x-3 mt-8">
               <div className="p-2 bg-white/10 rounded-lg"><CpuChipIcon className="h-5 w-5" /></div>
               <div className="p-2 bg-white/10 rounded-lg"><ShieldCheckIcon className="h-5 w-5" /></div>
            </div>
         </div>

         {/* Row 2 */}
         <div className={`lg:col-span-4 p-10 rounded-[32px] border ${steps[2].color} shadow-sm`}>
            <span className="text-2xl font-bold text-indigo-200 tracking-tighter mb-4 block">{steps[2].id}</span>
            <h3 className="text-xl font-bold mb-4">{steps[2].title}</h3>
            <p className="text-sm font-medium text-indigo-900/60 leading-relaxed mb-10">{steps[2].desc}</p>
            <div className="flex flex-wrap gap-2">
               {steps[2].tags.map(tag => <span key={tag} className="px-3 py-1 bg-white border border-indigo-100 rounded-lg text-[8px] font-bold text-indigo-400">{tag}</span>)}
            </div>
         </div>

         <div className={`lg:col-span-8 p-10 rounded-[32px] border ${steps[3].color} shadow-sm flex items-center gap-12`}>
            <div className="flex-1">
               <span className="text-2xl font-bold text-gray-100 tracking-tighter mb-4 block">{steps[3].id}</span>
               <h3 className="text-xl font-bold mb-4 text-gray-900">{steps[3].title}</h3>
               <p className="text-sm font-medium text-gray-400 leading-relaxed">{steps[3].desc}</p>
            </div>
            <div className="hidden sm:flex w-48 h-32 bg-indigo-50 rounded-2xl items-center justify-center animate-pulse">
               <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600">
                  <CpuChipIcon className="h-6 w-6" />
               </div>
            </div>
         </div>

         {/* Row 3 */}
         <div className={`lg:col-span-12 p-10 rounded-[32px] border ${steps[4].color} shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-20`}>
            <div className="max-w-2xl">
               <span className="text-2xl font-bold text-gray-700 tracking-tighter mb-4 block">{steps[4].id}</span>
               <h3 className="text-xl font-bold mb-4">{steps[4].title}</h3>
               <p className="text-sm font-medium text-gray-500 leading-relaxed">{steps[4].desc}</p>
            </div>
            <button className="whitespace-nowrap px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm tracking-wider uppercase hover:bg-blue-700 transition">Explore API Docs</button>
         </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:flex items-center gap-20">
         <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">The Micro-Kernel Architecture</h2>
            <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10">
               Unlike monolithic systems, RealApi utilizes a semi-decoupled architecture where the core API logic is separated from the data processing workers. This allows for horizontal scaling of the ingestors without affecting public endpoint performance.
            </p>
            <div className="space-y-6 mb-12">
               <ArchPoint icon={CheckCircleIcon} title="Separation of Concerns" desc="Service-based controllers handle specific business domains." />
               <ArchPoint icon={CheckCircleIcon} title="Fail-Fast Middleware" desc="Validates payloads before they ever hit the database layer." />
               <ArchPoint icon={CheckCircleIcon} title="Observability First" desc="Structured logging (Pino) and OpenTelemetry integration." />
            </div>
         </div>

         <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-[48px] border border-blue-100/50 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)]"></div>
               
               <div className="space-y-4 relative z-10">
                  <ArchLayer icon={UserGroupIcon} title="Public API Gateway" desc="Auth, Rate Limiting, Logging" />
                  <div className="flex justify-center py-2 opacity-30"><ArrowRightIcon className="h-5 w-5 rotate-90" /></div>
                  <ArchLayer icon={CpuChipIcon} title="Domain Services" desc="Listings, Analytics, User Auth" />
                  <div className="flex justify-center py-2 opacity-30"><ArrowRightIcon className="h-5 w-5 rotate-90" /></div>
                  <ArchLayer icon={CircleStackIcon} title="Prisma Data Layer" desc="PostgreSQL, Redis Cache" />
               </div>

               <div className="mt-12 p-6 bg-white/60 backdrop-blur-md rounded-3xl border border-white/50">
                  <p className="text-[10px] font-bold text-blue-800/30 uppercase tracking-widest mb-1">Performance Metric</p>
                  <div className="flex items-baseline space-x-2">
                     <span className="text-3xl font-bold text-gray-900">42ms</span>
                     <span className="text-xs font-bold text-gray-400">avg. latency</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}

function ArchPoint({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-start space-x-4">
       <Icon className="h-6 w-6 text-blue-600 mt-1" />
       <div>
          <h4 className="text-sm font-bold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm font-medium text-gray-500">{desc}</p>
       </div>
    </div>
  );
}

function ArchLayer({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-white flex items-center space-x-4 hover:shadow-lg transition">
       <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
          <Icon className="h-6 w-6" />
       </div>
       <div>
          <h4 className="text-sm font-bold text-gray-900 mb-0.5">{title}</h4>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{desc}</p>
       </div>
    </div>
  );
}
