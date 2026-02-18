import { useMemo, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { CheckCircle, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { userApi } from "../api/userApi";
import { useAppStore } from "../store/useAppStore";
import { getApiErrorMessage } from "../utils/apiError";

const VerifyEmail = () => {
  const location = useLocation();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const currentUser = useAppStore((state) => state.currentUser);
  const loadCurrentUser = useAppStore((state) => state.loadCurrentUser);

  const dashboardPath = useMemo(() => {
    if (currentUser?.role === "NGO") return "/dashboard/ngo";
    return "/dashboard/volunteer";
  }, [currentUser?.role]);

  const [code, setCode] = useState("");
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [status, setStatus] = useState(currentUser?.emailVerified ? "success" : "idle");
  const [message, setMessage] = useState(
    currentUser?.emailVerified
      ? "Your email is already verified."
      : location.state?.verificationNotice ||
          "Request a verification code and enter it below.",
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleRequestCode = async () => {
    setStatus("idle");
    setSendingCode(true);
    try {
      const data = await userApi.requestEmailVerification();
      setMessage(data?.message ?? "Verification code sent to your email.");
    } catch (error) {
      setStatus("error");
      setMessage(getApiErrorMessage(error, "Unable to send verification code."));
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async (event) => {
    event.preventDefault();
    setStatus("idle");
    setVerifyingCode(true);
    try {
      const data = await userApi.verifyEmailCode(code.trim());
      await loadCurrentUser();
      setStatus("success");
      setMessage(data?.message ?? "Email verified successfully.");
    } catch (error) {
      setStatus("error");
      setMessage(getApiErrorMessage(error, "Verification failed."));
    } finally {
      setVerifyingCode(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-emerald-50 via-teal-50 to-emerald-100 p-4 dark:from-emerald-950 dark:via-slate-950 dark:to-emerald-900">
      <div className="w-full max-w-md rounded-3xl border border-emerald-200/70 bg-white/90 p-8 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/60">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-emerald-950 dark:text-emerald-100">
            Verify Your Email
          </h1>
          <p className="mt-2 text-sm text-emerald-900/70 dark:text-emerald-100/70">
            We will send a 6-digit code to your registered email.
          </p>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            disabled={sendingCode || verifyingCode || currentUser?.emailVerified}
            onClick={handleRequestCode}
            className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sendingCode ? "Sending code..." : "Send Verification Code"}
          </button>

          <form onSubmit={handleVerifyCode} className="space-y-3">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">
              Verification Code
            </label>
            <input
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit code"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />
            <button
              type="submit"
              disabled={verifyingCode || sendingCode || currentUser?.emailVerified}
              className="w-full rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {verifyingCode ? "Verifying..." : "Verify Email"}
            </button>
          </form>
        </div>

        <div className="mt-5 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
          <div className="flex items-start gap-2">
            {verifyingCode || sendingCode ? (
              <Loader2 size={16} className="mt-0.5 animate-spin" />
            ) : status === "success" ? (
              <CheckCircle size={16} className="mt-0.5" />
            ) : status === "error" ? (
              <XCircle size={16} className="mt-0.5" />
            ) : (
              <ShieldCheck size={16} className="mt-0.5" />
            )}
            <p>{message}</p>
          </div>
        </div>

        <Link
          to={dashboardPath}
          className="mt-6 inline-flex w-full justify-center rounded-xl border border-emerald-300 px-6 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
