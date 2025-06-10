import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import axios from "../AxiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";

interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: {
    role_id: number;
    role_name: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing token and user data on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        try {
          // Set the token in axios headers
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Verify token by fetching user data
          const response = await axios.get("/api/user");
          const userData = response.data;

          // Update state with user data
          setUser(userData);

          // If we're on the login page, redirect to dashboard
          if (window.location.pathname === "/login") {
            navigate("/dashboard");
          }
        } catch (error) {
          // If token is invalid, clear everything
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          delete axios.defaults.headers.common["Authorization"];
          setUser(null);
          if (window.location.pathname !== "/login") {
            navigate("/login");
          }
        }
      } else {
        // No token found, redirect to login if not already there
        if (window.location.pathname !== "/login") {
          navigate("/login");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      const { token, user } = response.data;

      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Set default authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
      navigate("/dashboard");
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/logout");
      // Clear all auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      // Even if the API call fails, clear local data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
      navigate("/login");
      toast.error("Error logging out");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
