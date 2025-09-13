import { createContext, type ReactNode, useState } from "react";

interface AuthContext {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContext | undefined>(undefined);
const LOCAL_STORAGE_KEY = "token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(LOCAL_STORAGE_KEY)
  );

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
