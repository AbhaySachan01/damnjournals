import React, { useEffect, useState, useRef } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying');
  
  // Ek flag banayenge check karne ke liye ki API call ho chuki hai ya nahi
  const hasFetched = useRef(false); 

  useEffect(() => {
    // Agar API pehle hi call ho chuki hai, toh yahin se wapas laut jao
    if (hasFetched.current) return;
    
    // API call hone se pehle flag ko true kar do
    hasFetched.current = true;

    const verifyUserEmail = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        
        const response = await fetch(`${API_BASE_URL}/api/auth/verify/${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Verification failed');
        }

        setStatus('success');
        toast.success('Email Verified Successfully!');
      } catch (error) {
        setStatus('error');
        toast.error(error.message);
      }
    };

    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-[70vh] bg-[#FFFAF0] flex flex-col justify-center items-center px-4 font-serif">
      <div className="w-full max-w-md bg-white p-10 rounded-sm shadow-xl border border-gray-100 text-center">
        
        {status === 'verifying' && (
          <div>
            <h2 className="text-2xl font-bold text-[#2F4F4F] mb-4 uppercase tracking-wider">Verifying...</h2>
            <p className="text-gray-500 italic">Please wait while we verify your email.</p>
            {/* Chota sa loader */}
            <div className="mt-6 flex justify-center">
              <div className="w-8 h-8 border-4 border-[#DAA520] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-[#2F4F4F] mb-4 uppercase tracking-wider">Verified!</h2>
            <p className="text-gray-500 italic mb-8">Your email has been successfully verified. Welcome to Damn Journals!</p>
            <Link 
              to="/auth" 
              className="bg-[#2F4F4F] text-white px-8 py-3 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#1a2e2e] transition duration-300"
            >
              Go to Login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-[#2F4F4F] mb-4 uppercase tracking-wider">Link Expired</h2>
            <p className="text-gray-500 italic mb-8">This verification link is invalid or has expired.</p>
            <Link 
              to="/auth" 
              className="bg-[#DAA520] text-white px-8 py-3 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#b8860b] transition duration-300"
            >
              Back to Signup
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;