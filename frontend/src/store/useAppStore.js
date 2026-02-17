import { create } from 'zustand'
import { createCounterSlice } from './slices/counterSlice'
import { createThemeSlice } from './slices/themeSlice'
import { createAuthSlice } from './slices/authSlice'

export const useAppStore = create((set, get) => ({
  ...createThemeSlice(set, get),
  ...createCounterSlice(set),
  ...createAuthSlice(set, get),
}))

