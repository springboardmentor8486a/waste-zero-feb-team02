import { create } from 'zustand'
import { createThemeSlice } from './slices/themeSlice'
import { createAuthSlice } from './slices/authSlice'
import { createUserSlice } from './slices/userSlice'
import { setAccessTokenSyncHandler } from '../api/axiosClient'

export const useAppStore = create((set, get) => ({
  ...createThemeSlice(set, get),
  ...createAuthSlice(set, get),
  ...createUserSlice(set, get),
}))

setAccessTokenSyncHandler((accessToken) => {
  const state = useAppStore.getState()

  if (!accessToken) {
    state.clearAuthSession()
    state.clearCurrentUser()
    return
  }

  state.syncAccessToken(accessToken)
})

