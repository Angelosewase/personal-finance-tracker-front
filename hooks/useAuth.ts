import { useState } from "react";
import api from "@/lib/axios";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
        const result = await api.post("/auth/login", {
        email,
        password,
      });

      if ((result as any)?.error) {
        setError((result as any).error);
        return false;
      }

      return true;
    } catch (err) {
      setError('An unexpected error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
  };

  const refreshToken = async () => {
    try {
      const response = await api.post("/auth/refresh-token");
      return response.data;
    } catch (err) {
      console.error("Token refresh failed", err);
      await logout();
      return null;
    }
  };

  const register = async (params:{
    
  }) => {
    try{
      const response  = await api.post ("/auth/register", params)
    }
  }

  return {
    login,
    logout,
    refreshToken,
    isLoading,
    error,
  };
};
