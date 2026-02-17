import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User as UserIcon, Sun, Moon } from 'lucide-react';

const Layout = ({ children }) => {
    const { user, logout, theme, toggleTheme } = useAppStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const dashboardLink = user?.role === 'NGO' ? '/dashboard/ngo' : '/dashboard/volunteer';

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-200">
                {/* Navbar */}
                <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4">
                        <div className="flex items-center gap-8">
                            <NavLink to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                WasteZero
                            </NavLink>

                            <div className="hidden md:flex items-center gap-6">
                                <NavLink
                                    to={dashboardLink}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'
                                        }`
                                    }
                                >
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

                            <div className="flex items-center gap-3">
                                <div className="hidden sm:block text-right">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">{user?.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{user?.role}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                                >
                                    <LogOut size={16} />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <main className="py-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
