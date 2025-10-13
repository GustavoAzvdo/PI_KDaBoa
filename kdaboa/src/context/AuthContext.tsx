import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  nome?: string;
  foto?: string;
  cargo?: string; // opcional (ex: 'gerente' | 'funcionario')
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
  const [user, setUser] = useState<User | null>(null);

  const login = (userData?: User) => {
    localStorage.setItem('is_logged_in', 'true');
    if (userData) localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData || null);
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
