import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  loading: boolean;
  userId: string | null;
  error: string | null;
  login: () => void;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuthStatus = async () => {
    try {
      console.log("Checking auth status..."); // Debug log
      const response = await fetch("http://localhost:5187/auth/status", {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Auth status response:", response.status); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Auth status error:", errorText); // Debug log
        throw new Error(errorText || "Failed to fetch auth status");
      }

      const data = await response.json();
      console.log("Auth status data:", data); // Debug log
      setUserId(data.id);
      setIsAuthenticated(data.isAuthenticated);
      setUsername(data.username);
      setError(null);
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      setUsername(null);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to check authentication status"
      );
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
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        loading,
        error,
        login,
        logout,
        checkAuthStatus,
        userId,
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
