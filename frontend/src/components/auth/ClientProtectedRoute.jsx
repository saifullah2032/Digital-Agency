import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ClientProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ClientProtectedRoute;
