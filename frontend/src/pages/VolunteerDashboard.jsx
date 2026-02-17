import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { User, Mail, MapPin, Award, ExternalLink, ClipboardList } from 'lucide-react';

const VolunteerDashboard = () => {
    const { user } = useAppStore();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Volunteer Dashboard</h1>
                <p className="text-slate-600 dark:text-slate-400">Welcome back, {user?.name || 'Volunteer'}!</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Profile Summary */}
                <div className="md:col-span-1">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <div className="mb-6 flex flex-col items-center">
                            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <User size={48} />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{user?.name}</h2>
                            <span className="mt-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                Volunteer
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                <Mail size={18} />
                                <span className="text-sm">{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                <MapPin size={18} />
                                <span className="text-sm">{user?.location || 'Location not set'}</span>
                            </div>
                            <div>
                                <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Award size={16} /> Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {user?.skills?.length > 0 ? (
                                        user.skills.map((skill, index) => (
                                            <span key={index} className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs italic text-slate-500">No skills added yet</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {!user?.emailVerified && (
                            <div className="mt-6 rounded-xl bg-amber-50 p-4 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/30">
                                <p className="text-xs text-amber-800 dark:text-amber-400">
                                    <strong>Note:</strong> Your email is not verified yet. Please check your inbox.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Areas */}
                <div className="md:col-span-2 space-y-8">
                    {/* Action Button Section */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900 flex flex-col items-center justify-center text-center">
                        <div className="mb-4 rounded-full bg-indigo-100 p-4 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                            <ExternalLink size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">Ready to make an impact?</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
                            Start browsing through hundreds of volunteering opportunities tailored to your skills.
                        </p>
                        <button className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Available Opportunities
                        </button>
                        <p className="mt-4 text-xs font-medium text-indigo-500 uppercase tracking-wider">Coming in Milestone 2</p>
                    </div>

                    {/* My Applications Section */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <ClipboardList size={20} /> My Applications
                        </h3>
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="mb-4 text-slate-300 dark:text-slate-700">
                                <ClipboardList size={64} />
                            </div>
                            <p className="text-slate-500 dark:text-slate-400">You haven't applied to any opportunities yet.</p>
                            <button className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                                Explore opportunities
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerDashboard;
