import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { register } from "../../api/authService";
import toast from "react-hot-toast";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("TENANT");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { text: "", color: "bg-slate-200", width: "w-0" };
    if (pass.length < 6) return { text: "Weak", color: "bg-rose-500", width: "w-1/3" };
    if (pass.length < 10 || !/\d/.test(pass)) return { text: "Medium", color: "bg-amber-500", width: "w-2/3" };
    return { text: "Strong", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!agreed) {
      toast.error("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      const response = await register(name, email, password, role);
      const { token, role: returnedRole } = response.data || {};

      if (token && returnedRole) {
        authLogin(token, returnedRole);
        toast.success("Account created and logged in successfully!");
        navigate("/dashboard");
      } else {
        toast.success("Account created successfully! Please sign in.");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side - Architectural Banner & Features */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1973')",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[2px]"></div>
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

          {/* Value Highlights */}
          <div className="max-w-xl">
            <span className="text-xs font-bold text-indigo-300 tracking-wider uppercase bg-indigo-900/60 px-3 py-1 rounded-full border border-indigo-500/30">
              Commercial & Residential Infrastructure
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight mt-4 mb-6 leading-tight">
              Join Kenya's Premier Real Estate Platform.
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-slate-200">
                <CheckCircleIcon className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Automated M-Pesa rent invoicing & instant digital receipts</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-200">
                <CheckCircleIcon className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Commercial Plaza floor-by-floor stall & shop management</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-200">
                <CheckCircleIcon className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Verified tenant screening and monthly caretaker audit reports</span>
              </li>
            </ul>
          </div>

          {/* Footer Note */}
          <p className="text-slate-400 text-xs">
            © 2026 Rentora Technologies. Built for modern property management.
          </p>
        </div>
      </div>

      {/* Right Side - Register Form Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
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
              Create an Account
            </h1>
            <p className="text-slate-500 text-sm mt-2 mb-6">
              Get started with Rentora in less than a minute.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setRole("TENANT")}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition duration-200 ${
                      role === "TENANT"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Tenant / Shopkeeper
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("LANDLORD")}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition duration-200 ${
                      role === "LANDLORD"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Landlord / Agent
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="pl-11 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition font-medium text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
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
                    placeholder="jane@example.com"
                    className="pl-11 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition font-medium text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password & Confirm Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-11 pr-10 w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition font-medium text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-11 pr-10 w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition font-medium text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                    <span>Strength</span>
                    <span className="font-bold text-slate-700">{strength.text}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`}></div>
                  </div>
                </div>
              )}

              {/* Terms Agreement Checkbox */}
              <div className="flex items-start space-x-3 pt-2">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="agree" className="text-xs text-slate-600 leading-snug cursor-pointer">
                  I agree to the{" "}
                  <Link to="/terms" className="text-indigo-600 font-bold hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-indigo-600 font-bold hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-6 rounded-xl text-white font-bold text-sm tracking-wide bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 shadow-lg shadow-indigo-600/30 transition duration-200 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Creating Account..." : "CREATE ACCOUNT"}
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-600 font-medium">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-800 transition">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
