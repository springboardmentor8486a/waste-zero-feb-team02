import { useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import ThemeControl from "../components/theme/ThemeControl";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const login = useAppStore((state) => state.login);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const currentUser = useAppStore((state) => state.currentUser);
  const authLoading = useAppStore((state) => state.authLoading);
  const authError = useAppStore((state) => state.authError);
  const clearAuthError = useAppStore((state) => state.clearAuthError);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const signupSuccessMessage = location.state?.signupSuccessMessage;

  const redirectPath = useMemo(() => {
    if (currentUser?.role === "NGO") return "/dashboard/ngo";
    return "/dashboard/volunteer";
  }, [currentUser?.role]);

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    clearAuthError();
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await login({
      email: formState.email.trim(),
      password: formState.password,
    });

    if (!result.success) return;

    const requestedPath = location.state?.from;
    if (requestedPath) {
      navigate(requestedPath, { replace: true });
      return;
    }

    navigate(result.user?.role === "NGO" ? "/dashboard/ngo" : "/dashboard/volunteer", {
      replace: true,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 px-4 py-8 dark:from-emerald-950 dark:via-slate-950 dark:to-emerald-900">
      <div className="absolute right-4 top-4">
        <ThemeControl compact />
      </div>

      <div className="w-full max-w-md rounded-3xl border border-emerald-200/70 bg-white/90 p-8 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/60">
        <h1 className="mb-2 text-3xl font-extrabold text-emerald-950 dark:text-emerald-100">
          Welcome Back
        </h1>
        <p className="mb-6 text-sm text-emerald-900/70 dark:text-emerald-100/70">
          Login to continue your WasteZero journey.
        </p>

        {signupSuccessMessage && (
          <p className="mb-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            {signupSuccessMessage}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Email
            </span>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Password
            </span>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />
          </label>

          {authError && (
            <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-900/25 dark:text-rose-300">
              {authError}
            </p>
          )}

          <button
            disabled={authLoading}
            type="submit"
            className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {authLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          New to WasteZero?{" "}
          <Link to="/signup" className="font-semibold text-emerald-600">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
