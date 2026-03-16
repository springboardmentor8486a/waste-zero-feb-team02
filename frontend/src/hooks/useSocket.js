import { useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import { useAppStore } from "../store/useAppStore";
import { toast } from "react-hot-toast";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

export const useSocket = () => {
  const { isAuthenticated, currentUser, addNotification } = useAppStore();

  const handleNewNotification = useCallback((data) => {
    const { message, type, title } = data;
    
    // Add to store
    addNotification({
      id: Date.now(),
      title: title || "New Notification",
      message,
      type, // 'match' | 'message'
      isRead: false,
      createdAt: new Date().toISOString(),
    });

    // Show toast
    toast.success(`${title || "New notification"}: ${message}`, {
      duration: 5000,
      position: "top-right",
    });
  }, [addNotification]);

  useEffect(() => {
    if (!isAuthenticated || !currentUser) return;

    const socket = io(SOCKET_URL, {
      query: { userId: currentUser._id },
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on("new_match", (data) => {
      handleNewNotification({ ...data, type: "match", title: "New Match!" });
    });

    socket.on("new_message", (data) => {
      handleNewNotification({ ...data, type: "message", title: "New Message" });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, currentUser, handleNewNotification]);
};
