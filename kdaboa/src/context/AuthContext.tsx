import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import api from '../api/api'; 

interface User {
  nome_usuario?: string;
  email?: string;
  foto?: string;
  tipo?: string; 
  sub?: number;
  status?: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => Promise<User | null>; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('is_logged_in'));
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const logout = useCallback(() => {
    localStorage.removeItem('is_logged_in');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
   
  }, []);

  const login = async (): Promise<User | null> => {
    localStorage.setItem('is_logged_in', 'true');
    setIsAuthenticated(true);

    try {
     
      const response = await api.get<User>('/auth/dados', { withCredentials: true });
      const userData = response.data;

      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      }
      
      throw new Error("Dados do usuário não recebidos da API.");

    } catch (error) {
      console.error('Falha ao buscar dados do usuário. Deslogando...', error);

      logout();
      return null; 
    }
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