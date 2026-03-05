import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createThemeSlice } from "./slices/themeSlice";
import { createAuthSlice } from "./slices/authSlice";
import { createUserSlice } from "./slices/userSlice";
import { setAccessTokenSyncHandler } from "../api/axiosClient";
import { createOpportunitySlice } from "./slices/opportunitySlice";

export const useAppStore = create(
  persist(
    (set, get) => ({
      ...createThemeSlice(set, get),
      ...createAuthSlice(set, get),
      ...createUserSlice(set, get),
      ...createOpportunitySlice(set),
      globalSearch: "",
      setGlobalSearch: (value) => set({ globalSearch: value }),
    }),
    {
      name: "wastezero-storage",
    },
  ),
);

setAccessTokenSyncHandler((accessToken) => {
  const state = useAppStore.getState();

  if (!accessToken) {
    state.clearAuthSession();
    state.clearCurrentUser();
    return;
  }

  state.syncAccessToken(accessToken);
});
