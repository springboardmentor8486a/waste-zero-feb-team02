export const createNotificationSlice = (set, get) => ({
  notifications: [],
  unreadCount: 0,
  notificationLoading: false,
  notificationError: null,

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: (notificationId) => {
    set((state) => {
      const updatedNotifications = state.notifications.map((n) =>
        n.id === notificationId ? { ...n, isRead: true } : n
      );
      const newUnreadCount = updatedNotifications.filter((n) => !n.isRead).length;
      return {
        notifications: updatedNotifications,
        unreadCount: newUnreadCount,
      };
    });
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));
  },

  clearNotifications: () => {
    set({ notifications: [], unreadCount: 0 });
  },

  setNotifications: (notifications) => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    set({ notifications, unreadCount });
  },

  // Mock fetch for now
  fetchNotifications: async () => {
    set({ notificationLoading: true, notificationError: null });
    try {
      // In a real scenario, this would call notificationApi.getNotifications()
      // const data = await notificationApi.getNotifications();
      // get().setNotifications(data);
      
      // Simulating empty initial notifications
      set({ notificationLoading: false });
    } catch (error) {
      set({ 
        notificationError: "Failed to fetch notifications", 
        notificationLoading: false 
      });
    }
  },
});
