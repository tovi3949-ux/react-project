import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authStore';

export const ProtectedRoute = ({ isAllowed, children }: { isAllowed: boolean; children: React.ReactNode }) => {
  const user = useAuth((state) => state.user)
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!isAllowed) {
    console.log(user.role);
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};