import axios from "axios";
import { api } from "./axios";
import { User } from "@shared/types/types";
import { connectSocket, disconnectSocket } from "@/contexts/SocketContext";
import { env } from "../env";

const API_BASE_URL = env.apiUrl;

// Create axios instance with base URL
export const bareApi = axios.create({
  baseURL: API_BASE_URL,
});

export const getCurrentUser = async (): Promise<User> => {
  try {
    const res = await api.get("/auth/status");

    return res.data.user;
  } catch (error: unknown) {
    // If the token is invalid or expired, clear it
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // socket.disconnect();
    }
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const res = await bareApi.post("/auth/login", { email, password });
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);

    connectSocket();
    return res.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Login failed");
    }
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  // await api.post("/api/v1/auth/logout");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  disconnectSocket(); // Disconnect the socket
};

export const refreshToken = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  try {
    const res = await bareApi.post("/auth/refresh-token", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    return res.data;
  } catch (error) {
    console.log("Error refreshing token:", error);
    throw error;
  }
};
