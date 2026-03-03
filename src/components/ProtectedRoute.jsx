import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Jab tak auth check ho raha hai, tab tak kuch mat dikhao (ya loading spinner dikhao)
  if (loading) return <div className="h-screen flex items-center justify-center font-serif uppercase tracking-widest text-gray-400">Verifying...</div>;

  // Agar user logged in hai, toh page dikhao, warna Login page par bhej do
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;