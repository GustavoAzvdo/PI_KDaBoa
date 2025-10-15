import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JSX } from 'react';
import { Box, CircularProgress } from '@mui/material'; 
interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[]; //gerente ou funcionario
}

export const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {

  const { isAuthenticated, user } = useAuth();
  const location = useLocation();


  if (isAuthenticated && !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!isAuthenticated) {

    return <Navigate to="/login" state={{ from: location }} replace />;
  }
if (user && user.tipo && !allowedRoles.includes(user.tipo)) { 

    return <Navigate to="/login" replace />;
  }

  return children;
};