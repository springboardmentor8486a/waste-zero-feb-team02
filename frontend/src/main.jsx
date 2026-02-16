import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { useAppStore } from './store/useAppStore'
import { applyThemeToDocument } from './store/slices/themeSlice'

applyThemeToDocument(useAppStore.getState().theme)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
