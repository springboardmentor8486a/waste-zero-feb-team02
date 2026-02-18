import axios from "axios";
import {
  clearStoredAuth,
  getStoredAuth,
  setStoredAuth,
} from "../utils/storage";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let syncAccessToken = null;

export const setAccessTokenSyncHandler = (handler) => {
  syncAccessToken = handler;
};

apiClient.interceptors.request.use((config) => {
  const { accessToken } = getStoredAuth();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const statusCode = error?.response?.status;

    if (statusCode !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const { refreshToken } = getStoredAuth();
    if (!refreshToken) {
      clearStoredAuth();
      if (syncAccessToken) syncAccessToken(null);
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await refreshClient.post("/refresh-token", {
        refreshToken,
      });

      const nextAccessToken = response?.data?.accessToken;
      if (!nextAccessToken) {
        throw new Error("Access token not received");
      }

      const current = getStoredAuth();
      setStoredAuth({
        accessToken: nextAccessToken,
        refreshToken: current.refreshToken,
      });
      if (syncAccessToken) syncAccessToken(nextAccessToken);

      originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      clearStoredAuth();
      if (syncAccessToken) syncAccessToken(null);
      return Promise.reject(refreshError);
    }
  },
);
