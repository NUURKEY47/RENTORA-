import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
              R
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">RealApi</span>
          </div>

          <div className="hidden md:flex items-center space-x-10 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition underline decoration-gray-100 underline-offset-4 decoration-2 hover:decoration-blue-600">
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-100 hover:bg-blue-700 transition"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
