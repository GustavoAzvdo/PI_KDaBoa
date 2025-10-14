// src/context/AuthContext.jsx

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../api/api'

interface User {
  nome_usuario?: string; // Alterado de 'nome' para 'nome_usuario'
  email?: string;
  foto?: string;
  cargo?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData?: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('is_logged_in'));
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

 
  useEffect(() => {
    if (isAuthenticated) {
      api.get<User>('/auth/dados', { withCredentials: true })
        .then(res => {
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data)); 
        })
        .catch(_err => {
          console.error('Falha ao buscar dados, deslogando...');
          logout();
        });
    }
  }, [isAuthenticated]); 

  const login = (userData?: User) => {
    localStorage.setItem('is_logged_in', 'true');
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('is_logged_in');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};