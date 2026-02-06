
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial session check
    const storedUser = localStorage.getItem('prakura_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    // Simulation: Admin / HR / Employee accounts
    try {
      let mockUser: User | null = null;
      if (email === 'admin@prakura.in' && pass === 'admin123') {
        mockUser = { id: '1', email, role: Role.SUPER_ADMIN, firstName: 'System', lastName: 'Admin' };
      } else if (email === 'hr@prakura.in' && pass === 'hr123') {
        mockUser = { id: '2', email, role: Role.HR, firstName: 'Neha', lastName: 'Sharma' };
      } else if (email === 'emp@prakura.in' && pass === 'emp123') {
        mockUser = { id: '3', email, role: Role.EMPLOYEE, firstName: 'Rahul', lastName: 'Verma', employeeId: 'PRK-1024' };
      } else {
        throw new Error('Invalid credentials');
      }

      if (mockUser) {
        setUser(mockUser);
        localStorage.setItem('prakura_user', JSON.stringify(mockUser));
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prakura_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
