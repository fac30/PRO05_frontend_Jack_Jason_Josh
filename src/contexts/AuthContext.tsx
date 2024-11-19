import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:5187/auth/status", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch auth status");
      }

      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
      setUsername(data.username);
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      setUsername(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    checkAuthStatus(); // Refresh the auth status
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        loading,
        login,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
