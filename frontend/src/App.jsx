import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import VolunteerDashboard from './pages/VolunteerDashboard'
import NGODashboard from './pages/NGODashboard'
import VerifyEmail from './pages/VerifyEmail'
import { useState } from 'react'


// Placeholder Login Component for Milestone 1 Testing
const LoginPlaceholder = () => {
  const setAuth = useAppStore((state) => state.setAuth)
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  const user = useAppStore((state) => state.user)
  const [role, setRole] = useState('volunteer')

  if (isAuthenticated) {
    const redirectPath = user?.role === 'NGO' ? '/dashboard/ngo' : '/dashboard/volunteer'
    return <Navigate to={redirectPath} replace />
  }

  const handleLogin = (selectedRole) => {
    // Mock user and token
    const mockUser = {
      id: '123',
      name: selectedRole === 'volunteer' ? 'John Doe' : 'Impact Organization',
      email: selectedRole === 'volunteer' ? 'john@example.com' : 'contact@impact.org',
      role: selectedRole === 'volunteer' ? 'volunteer' : 'NGO',
      location: 'New York, NY',
      skills: selectedRole === 'volunteer' ? ['React', 'Environment', 'Teaching'] : [],
      bio: selectedRole === 'volunteer' ? 'Passionate about environmental sustainability.' : 'Working to provide education for all.',
      emailVerified: false
    }
    setAuth(mockUser, 'mock-jwt-token')
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">WasteZero Login</h1>
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-6">Select a profile to test the dashboard role-based access.</p>
          <button
            onClick={() => handleLogin('volunteer')}
            className="w-full flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50 hover:border-indigo-300 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <div className="text-left">
              <p className="font-semibold dark:text-white">Volunteer User</p>
              <p className="text-xs text-slate-500">Test volunteer dashboard</p>
            </div>
            <div className="h-4 w-4 rounded-full border-2 border-slate-300"></div>
          </button>

          <button
            onClick={() => handleLogin('NGO')}
            className="w-full flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50 hover:border-emerald-300 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <div className="text-left">
              <p className="font-semibold dark:text-white">NGO Organization</p>
              <p className="text-xs text-slate-500">Test NGO dashboard</p>
            </div>
            <div className="h-4 w-4 rounded-full border-2 border-slate-300"></div>
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const theme = useAppStore((state) => state.theme)

  return (
    <BrowserRouter>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <Routes>
          <Route path="/login" element={<LoginPlaceholder />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route
            path="/dashboard/volunteer"
            element={
              <ProtectedRoute allowedRoles={['volunteer']}>
                <Layout>
                  <VolunteerDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/ngo"
            element={
              <ProtectedRoute allowedRoles={['NGO']}>
                <Layout>
                  <NGODashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

