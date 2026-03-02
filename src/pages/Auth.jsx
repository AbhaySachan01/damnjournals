import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import toast from 'react-hot-toast';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // States
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Signup success ke baad dikhane ke liye
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- 1. NORMAL LOGIN/SIGNUP ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const url = `${API_BASE_URL}/api/auth${endpoint}`;

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include"
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      if (isLogin) {
        toast.success("Welcome back!");
        navigate(from, { replace: true });
        window.location.reload(); 
      } else {
        // Signup success logic
        toast.success("Verification email sent!");
        setIsSubmitted(true); // Ab yahan ye sahi se kaam karega
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. GOOGLE LOGIN ---
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const response = await fetch(`${API_BASE_URL}/api/auth/google`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: user.displayName, 
          email: user.email, 
          image: user.photoURL 
        }),
        credentials: "include"
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      toast.success("Google Login Successful!");
      navigate(from, { replace: true });
      window.location.reload();
    } catch (error) {
      toast.error(error.code === 'auth/popup-closed-by-user' ? "Login cancelled" : "Google Auth Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const showEmail = isLogin || formData.name.trim().length > 2;
  const showPassword = formData.email.includes('@') && formData.email.includes('.');

  return (
    <div className="min-h-screen bg-[#FFFAF0] flex flex-col justify-center items-center px-4 font-serif relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#DAA520] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#2F4F4F] opacity-10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-white p-10 rounded-sm shadow-xl border border-gray-100 relative z-10">
        
        {isSubmitted ? (
          // --- SUCCESS VIEW ---
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <div className="text-6xl mb-6">📧</div>
            <h2 className="text-2xl font-bold text-[#2F4F4F] mb-4 uppercase tracking-widest">Verify Your Email</h2>
            
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setIsLogin(true);
                setFormData({ name: '', email: '', password: '' });
              }} 
              className="text-[#DAA520] font-bold underline hover:text-[#b8860b] transition-colors uppercase text-xs tracking-widest"
            >
              Go to Login
            </button>
          </div>
        ) : (
          // --- FORM VIEW ---
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#2F4F4F] uppercase tracking-[0.15em] mb-2">
                {isLogin ? 'Welcome Back' : 'Join the Club'}
              </h2>
              <p className="text-gray-500 italic text-sm">
                {isLogin ? 'Continue your journaling journey.' : 'Start your mindful writing experience.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${!isLogin ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Kabir Singh" className="w-full border-b-2 border-gray-200 focus:border-[#DAA520] bg-transparent py-2 outline-none text-[#2F4F4F] transition-colors" />
              </div>

              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showEmail ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full border-b-2 border-gray-200 focus:border-[#DAA520] bg-transparent py-2 outline-none text-[#2F4F4F] transition-colors" />
              </div>

              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${showPassword ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full border-b-2 border-gray-200 focus:border-[#DAA520] bg-transparent py-2 outline-none text-[#2F4F4F] transition-colors" />
                {isLogin && (
                  <div className="flex justify-end mt-2">
                    <Link to="/forgot-password" size="sm" className="text-xs text-gray-500 hover:text-[#DAA520]">Forgot Password?</Link>
                  </div>
                )}
              </div>

              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${formData.password.length > 0 ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <button type="submit" disabled={isLoading} className="w-full bg-[#2F4F4F] text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#1a2e2e] transition duration-300 disabled:bg-gray-400">
                  {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
              </div>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-bold tracking-widest">Or</span></div>
            </div>

            <button onClick={handleGoogleLogin} disabled={isLoading} className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-md hover:bg-gray-50 transition font-bold text-xs uppercase tracking-widest disabled:opacity-50">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" alt="google" />
              Continue with Google
            </button>

            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already part of the club? "}
                <button onClick={() => { setIsLogin(!isLogin); setFormData({ name: '', email: '', password: '' }); }} className="text-[#DAA520] font-bold hover:underline transition-all">
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;