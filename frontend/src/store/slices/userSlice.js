import { userApi } from "../../api/userApi";
import { getApiErrorMessage } from "../../utils/apiError";

export const createUserSlice = (set) => ({
  currentUser: null,
  userLoading: false,
  userError: null,

  setCurrentUser: (user) => set({ currentUser: user }),

  clearCurrentUser: () => set({ currentUser: null, userError: null }),

  loadCurrentUser: async () => {
    set({ userLoading: true, userError: null });

    try {
      const user = await userApi.getProfile();
      set({ currentUser: user });
      return user;
    } catch (error) {
      const message = getApiErrorMessage(error, "Unable to load user profile.");
      set({ userError: message });
      throw error;
    } finally {
      set({ userLoading: false });
    }
  },

  updateCurrentUser: async (payload) => {
    set({ userLoading: true, userError: null });

    try {
      const data = await userApi.updateProfile(payload);
      const updatedUser = data?.user ?? payload;
      set((state) => ({
        currentUser: state.currentUser
          ? { ...state.currentUser, ...updatedUser }
          : updatedUser,
      }));
      return { success: true, data };
    } catch (error) {
      const message = getApiErrorMessage(error, "Unable to update profile.");
      set({ userError: message });
      return { success: false, message };
    } finally {
      set({ userLoading: false });
    }
  },
});
