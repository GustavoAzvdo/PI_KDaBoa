import { createContext, useContext, useState, ReactNode } from 'react';
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('is_logged_in'));

  const login = () => {
   
    localStorage.setItem('is_logged_in', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('is_logged_in');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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