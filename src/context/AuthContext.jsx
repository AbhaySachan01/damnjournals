import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // API URL logic ko clean rakhte hain
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const fetchUser = async () => {
        try {
            // credentials: 'include' zaroori hai cookie fetch karne ke liye
            const res = await fetch(`${API_BASE_URL}/api/auth/me`, { 
                credentials: 'include' 
            });
            
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error("Fetch User Error:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // AuthContext.jsx ke andar logout function:

const logout = async () => {
        try {
            // credentials: 'include' BOHOT ZAROORI HAI, iske bina cookie backend tak nahi jayegi
            const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include', 
            });

            if (response.ok) {
                console.log("Logged out successfully from server");
            } else {
                console.error("Server failed to logout");
            }
        } catch (err) {
            console.error("Logout API Error:", err);
        } finally {
            // 1. Pehle React state se user hatao
            setUser(null);
            
            // 2. Thoda wait karo (500ms) taaki browser background me cookie uda sake, phir redirect karo
            setTimeout(() => {
                window.location.replace('/'); // replace use kar rahe hain taaki back button se wapas profile pe na jaye
            }, 500); 
        }
    };


    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout, refreshUser: fetchUser }}>
            {/* Jab tak loading true hai, tab tak children render mat karo (Prevents flicker) */}
            {!loading ? children : (
                <div className="min-h-screen flex items-center justify-center bg-[#FFFAF0]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2F4F4F]"></div>
                </div>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);