import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { login } from "../../api/authService";
import toast from "react-hot-toast";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(email, password);
      const { token, role, name } = response.data;
      authLogin(token, role, name);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side - Architectural Banner & Testimonial */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1973')",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 8V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V8L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="12" cy="10.5" r="2.5" stroke="white" strokeWidth="2" />
                <path d="M10.5 13L9.5 17.5H14.5L13.5 13" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-tight">Rentora<span className="text-indigo-400">.</span></span>
          </div>

          {/* Testimonial Quote */}
          <div>
            <blockquote className="text-2xl font-medium italic leading-relaxed max-w-xl text-slate-200">
              "Rentora has transformed how we manage our properties and commercial plaza stalls. The seamless integration and M-Pesa automated rent tracking is unmatched."
            </blockquote>
            <div className="mt-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                N
              </div>
              <div>
                <p className="font-bold text-white text-base">Nuurkey A.</p>
                <p className="text-indigo-200 text-sm">
                  Property & Plaza Manager, UrbanEstates Nairobi
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-slate-400 text-xs">
            © 2026 Rentora Technologies. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo Header */}
          <div className="flex lg:hidden items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <BuildingOfficeIcon className="h-6 w-6" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900">Rentora</span>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Sign in to Rentora
            </h1>
            <p className="text-slate-500 text-sm mt-2 mb-8">
              Please enter your details to access your dashboard.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="pl-11 w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition font-medium text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <Link to="/privacy" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-11 pr-11 w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition font-medium text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl text-white font-bold text-sm tracking-wide bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 shadow-lg shadow-indigo-600/30 transition duration-200 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing In..." : "SIGN IN"}
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-600 font-medium">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 font-bold hover:text-indigo-800 transition"
                >
                  Create an Account
                </Link>
              </p>
            </div>
          </div>

          {/* Legal Footer Links */}
          <div className="mt-8 text-center text-xs text-slate-400 space-x-4">
            <Link to="/privacy" className="hover:text-slate-600 transition">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-600 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
