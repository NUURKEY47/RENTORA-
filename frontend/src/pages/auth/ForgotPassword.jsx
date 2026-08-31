import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword, resetPassword } from '../../api/userService';
import toast from 'react-hot-toast';
import { EnvelopeIcon, KeyIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ForgotPassword() {
  const [step, setStep] = useState('request'); // 'request' | 'reset'
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Real-time password strength helper
  const getPasswordStrength = (pass) => {
    if (!pass) return { text: "", color: "bg-slate-200", width: "w-0" };
    const hasNum = /\d/.test(pass);
    const hasSpecial = /[!@#$%^&*]/.test(pass);

    if (pass.length < 8 || !hasNum || !hasSpecial) {
      return { text: "Weak (Requires 8+ chars, 1 number & 1 special char)", color: "bg-rose-500", width: "w-1/3" };
    }
    if (pass.length < 12) {
      return { text: "Medium", color: "bg-amber-500", width: "w-2/3" };
    }
    return { text: "Strong", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = getPasswordStrength(newPassword);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      toast.success(res.message || "Reset token generated successfully!");
      if (res.data?.resetToken) {
        setToken(res.data.resetToken); // For testing / direct workflow
      }
      setStep('reset');
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to request password reset");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error("New password must be at least 8 characters long and include a number and special character");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(token, newPassword);
      toast.success(res.message || "Password reset successfully! Please log in.");
      window.location.href = '/login';
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 w-full max-w-md p-8">
        <Link to="/login" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-indigo-600 mb-6 transition">
          <ArrowLeftIcon className="h-4 w-4 mr-1.5" /> Back to Sign In
        </Link>

        <div className="mb-6">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
            <KeyIcon className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {step === 'request' ? "Forgot Password?" : "Reset Your Password"}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
            {step === 'request' 
              ? "Enter your account email address and we'll generate a secure password reset token." 
              : "Enter your reset token and new password credentials below."}
          </p>
        </div>

        {step === 'request' ? (
          <form onSubmit={handleRequestSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/25 disabled:opacity-75"
            >
              {loading ? "Generating Link..." : "Request Reset Link"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Reset Token
              </label>
              <input
                type="text"
                placeholder="Enter reset token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Min 8 chars, 1 number & 1 special char"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                required
              />
              {newPassword && (
                <div className="mt-2">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`}></div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 mt-1 block">{strength.text}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/25 disabled:opacity-75"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
