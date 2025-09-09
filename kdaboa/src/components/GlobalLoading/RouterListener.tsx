import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';

// rotas onde o loading deve aparecer
const loadingRoutes = ['/', '/search', '/profile', '/view-event'];

export const RouteListener = () => {
  const location = useLocation();
  const { setLoading } = useLoading();

  useEffect(() => {
    if (loadingRoutes.includes(location.pathname)) {
      setLoading(true); // mostra o loading
      const timer = setTimeout(() => setLoading(false), 300); // efeito decorativo
      return () => clearTimeout(timer);
    }
    // para as outras rotas, não faz nada
  }, [location.pathname]);

  return null;
};
