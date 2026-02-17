import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const VerifyEmail = () => {
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');

        if (!token) {
            setStatus('error');
            setMessage('No verification token found.');
            return;
        }

        const verify = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/verify-email?token=${token}`);
                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    setMessage(data.message || 'Your email has been successfully verified.');
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Verification failed. The link may be expired or invalid.');
                }
            } catch (error) {
                setStatus('error');
                setMessage('A network error occurred. Please try again later.');
            }
        };

        verify();
    }, [location]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col items-center text-center">
                    {status === 'verifying' && (
                        <>
                            <div className="mb-4 text-indigo-600">
                                <Loader2 size={64} className="animate-spin" />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Verifying your email</h1>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">Please wait while we confirm your email address...</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="mb-4 text-emerald-500">
                                <CheckCircle size={64} />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Email Verified!</h1>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">{message}</p>
                            <Link
                                to="/login"
                                className="mt-8 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                            >
                                Go to Login
                            </Link>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="mb-4 text-rose-500">
                                <XCircle size={64} />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Verification Failed</h1>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">{message}</p>
                            <div className="mt-8 flex w-full flex-col gap-3">
                                <Link
                                    to="/login"
                                    className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                                >
                                    Back to Login
                                </Link>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                >
                                    Try again
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
