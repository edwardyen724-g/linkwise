import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: { email: string } | null;
  signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const signIn = async (email: string, password: string) => {
    // Simulated signIn process
    setUser({ email });
  };

  return <AuthContext.Provider value={{ user, signIn }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
