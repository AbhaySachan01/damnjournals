import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Wait for auth check

  return user && user.isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;