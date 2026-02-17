import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Building2, Mail, MapPin, PlusCircle, LayoutList, ShieldAlert } from 'lucide-react';

const NGODashboard = () => {
    const { user } = useAppStore();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">NGO Dashboard</h1>
                <p className="text-slate-600 dark:text-slate-400">Managing impact for {user?.name || 'your NGO'}.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Profile Summary */}
                <div className="md:col-span-1">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <div className="mb-6 flex flex-col items-center">
                            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                <Building2 size={48} />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white text-center">{user?.name}</h2>
                            <span className="mt-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                NGO Organization
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
                            <div className="pt-2">
                                <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Organization Bio</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {user?.bio || 'Add a bio to let volunteers know more about your organization.'}
                                </p>
                            </div>
                        </div>

                        {!user?.emailVerified && (
                            <div className="mt-6 rounded-xl bg-amber-50 p-4 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/30">
                                <div className="flex gap-2 items-start">
                                    <ShieldAlert size={16} className="text-amber-800 dark:text-amber-400 shrink-0 mt-0.5" />
                                    <p className="text-xs text-amber-800 dark:text-amber-400">
                                        <strong>Verification Pending:</strong> Please verify your email to access all NGO features.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Areas */}
                <div className="md:col-span-2 space-y-8">
                    {/* Action Button Section */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900 flex flex-col items-center justify-center text-center border-dashed border-2">
                        <div className="mb-4 rounded-full bg-emerald-100 p-4 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                            <PlusCircle size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">Need more hands?</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
                            Create a new volunteering opportunity and start matching with passionate volunteers.
                        </p>
                        <button className="rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                            Create Opportunity
                        </button>
                        <p className="mt-4 text-xs font-medium text-emerald-500 uppercase tracking-wider">Coming in Milestone 2</p>
                    </div>

                    {/* My Opportunities Section */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                        <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <LayoutList size={20} /> My Opportunities
                        </h3>
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="mb-4 text-slate-300 dark:text-slate-700">
                                <LayoutList size={64} />
                            </div>
                            <p className="text-slate-500 dark:text-slate-400">You haven't posted any opportunities yet.</p>
                            <button className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                                Get started now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NGODashboard;
