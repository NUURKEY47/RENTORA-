import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getProfile, updateProfile, changePassword } from '../api/userService';
import toast from 'react-hot-toast';
import { 
  UserIcon, 
  KeyIcon, 
  EnvelopeIcon, 
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  const { user, login: authLogin } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security'
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Profile Form State
  const [profileData, setProfileData] = useState({ name: '', email: '', role: '' });

  // Security Form State
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await getProfile();
      const userData = res.data?.data || res.data;
      setProfileData({
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || ''
      });
    } catch (err) {
      toast.error('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  // Password Strength Calculation Helper (Refinement #3)
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

  const strength = getPasswordStrength(passwordData.newPassword);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await updateProfile({ name: profileData.name, email: profileData.email });
      const updated = res.data?.data || res.data;
      // Update global context so Navbar avatar updates name instantly
      if (user?.token) {
        authLogin(user.token, updated.role || profileData.role, updated.name || profileData.name);
      }
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    // Instant Client-Side Password Regex Check (0ms latency)
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(passwordData.newPassword)) {
      toast.error("New password must be at least 8 characters long and include a number and special character");
      return;
    }

    setSavingPassword(true);
    try {
      await changePassword(passwordData.oldPassword, passwordData.newPassword);
      toast.success("Password changed successfully!");
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Loading user profile details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your personal profile details and security credentials.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-4 px-2 text-sm font-bold flex items-center space-x-2 border-b-2 transition ${
            activeTab === 'profile'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <UserIcon className="h-5 w-5" />
          <span>Profile Details</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-4 px-2 text-sm font-bold flex items-center space-x-2 border-b-2 transition ${
            activeTab === 'security'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <KeyIcon className="h-5 w-5" />
          <span>Security & Password</span>
        </button>
      </div>

      {/* Tab 1: Profile Details Form */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
          <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none text-sm transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none text-sm transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Account Role
              </label>
              <input
                type="text"
                value={profileData.role}
                disabled
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-500 text-sm cursor-not-allowed uppercase"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={savingProfile}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/25 disabled:opacity-70"
              >
                {savingProfile ? "Saving Changes..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Security & Password Form */}
      {activeTab === 'security' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
          <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none text-sm transition"
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
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none text-sm transition"
                required
              />

              {/* Password Strength Bar (Refinement #3) */}
              {passwordData.newPassword && (
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
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none text-sm transition"
                required
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={savingPassword}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/25 disabled:opacity-70"
              >
                {savingPassword ? "Updating Password..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
