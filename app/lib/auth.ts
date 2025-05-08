"use client"

import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists (client-side only)
if (typeof window !== "undefined") {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const auth = {
  async login({ usernameOrEmail, password }: LoginCredentials) {
    try {
      const response = await axiosInstance.post("/signin", {
        usernameOrEmail,
        password,
      });
      if (response.data.accessToken) {
        console.log("setting token", response.data.accessToken);
        localStorage.setItem("token", response.data.accessToken);
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  async register(data: RegisterData) {
    try {
      const response = await axiosInstance.post("/signup", data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  logout() {
    localStorage.removeItem("token");
  },

  isAuthenticated() {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  },
};

export default auth;
