import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok) toast.success("Reset link sent to your email!");
            else toast.error(data.message);
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFAF0] px-4">
            <div className="max-w-md w-full bg-white p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-[#2F4F4F] mb-6 text-center uppercase tracking-widest">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" placeholder="Enter your email" required 
                        className="w-full border-b-2 py-2 outline-none focus:border-[#DAA520]"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" disabled={loading} className="w-full bg-[#2F4F4F] text-white py-3 uppercase text-xs tracking-widest font-bold">
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;