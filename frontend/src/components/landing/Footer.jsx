import { Link } from "react-router-dom";

export function PublicFooter() {
  return (
    <footer className="bg-white border-t border-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div>
            <div className="flex items-center space-x-3 mb-2">
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg pointer-events-none">R</div>
               <span className="text-xl font-bold text-gray-900 tracking-tight">Rentora</span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center md:text-left">© 2024 Rentora. Architecting the future of real estate data.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
             <a href="#" className="hover:text-blue-600 transition">Documentation</a>
             <a href="#" className="hover:text-blue-600 transition">API Status</a>
             <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
             <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
             <a href="#" className="hover:text-blue-600 transition">Github</a>
             <a href="#" className="hover:text-blue-600 transition">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
