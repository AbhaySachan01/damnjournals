import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Save } from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useAuth(); // AuthContext se user lo
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data); // Context update karo
        localStorage.setItem('userInfo', JSON.stringify(data)); // Localstorage update
        toast.success("Profile Updated Successfully!");
        setPassword(''); // Form clear
        setConfirmPassword('');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white shadow-xl rounded-2xl border border-gray-50">
      <div className="text-center mb-8">
        <div className="bg-[#2F4F4F] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
          <User size={32} />
        </div>
        <h2 className="text-2xl font-serif uppercase tracking-widest text-[#2F4F4F]">User Profile</h2>
        <p className="text-xs text-gray-400 mt-2 uppercase tracking-tighter">Manage your personal information</p>
      </div>

      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Full Name</label>
          <div className="relative">
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#2F4F4F] outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <User className="absolute left-3 top-3.5 text-gray-300" size={18} />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Email Address</label>
          <div className="relative">
            <input 
              type="email" 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#2F4F4F] outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="absolute left-3 top-3.5 text-gray-300" size={18} />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">New Password (Leave blank to keep current)</label>
          <div className="relative mb-4">
            <input 
              type="password" 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#2F4F4F] outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="absolute left-3 top-3.5 text-gray-300" size={18} />
          </div>
          <div className="relative">
            <input 
              type="password" 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#2F4F4F] outline-none"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Lock className="absolute left-3 top-3.5 text-gray-300" size={18} />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#2F4F4F] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#1a2e2e] transition-all flex items-center justify-center gap-2"
        >
          {loading ? 'Updating...' : <><Save size={16} /> Update Profile</>}
        </button>
      </form>
    </div>
  );
};

export default Profile;