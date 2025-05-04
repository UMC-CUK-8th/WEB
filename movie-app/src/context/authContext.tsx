import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getMyInfo } from "../api/auth";

interface User {
  nickname: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      return;
    }
    try {
        // 내 정보 API로 토큰 유효성 및 닉네임 확인
        const res = await getMyInfo(token);
        setIsAuthenticated(true);
        setUser({ nickname: res.data.name }); // name 필드를 nickname으로 사용
    } catch {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
        setUser(null);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("accessToken", token);
    await checkAuthStatus();
  };
  
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, refreshAuth: checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
