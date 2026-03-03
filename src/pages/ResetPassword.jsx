import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_BASE_URL}/api/auth/reset-password/${token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            if (res.ok) {
                toast.success("Password updated! Please login.");
                navigate('/auth');
            } else {
                toast.error("Invalid or expired token");
            }
        } catch (err) {
            toast.error("Error resetting password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFAF0]">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-xl max-w-sm w-full border border-gray-100">
                <h2 className="text-xl font-bold mb-6 text-[#2F4F4F] text-center uppercase tracking-widest">New Password</h2>
                <input 
                    type="password" placeholder="Enter new password" required 
                    className="w-full border-b-2 py-2 mb-4 outline-none focus:border-[#DAA520]"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-[#2F4F4F] text-white py-3 font-bold uppercase text-xs tracking-widest">Update Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;