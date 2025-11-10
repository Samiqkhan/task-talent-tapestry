import { useAuth } from '../hooks/use-Auth'; // Ensure this path is correct, or update to the correct path
import { Navigate, Outlet } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Renders the child route (e.g., Admin page)
};

export default ProtectedRoute;