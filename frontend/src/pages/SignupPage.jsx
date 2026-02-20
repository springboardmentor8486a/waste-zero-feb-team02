import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import ThemeControl from "../components/theme/ThemeControl";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "volunteer",
  location: "",
  bio: "",
  skills: "",
};

const SignupPage = () => {
  const signup = useAppStore((state) => state.signup);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const authLoading = useAppStore((state) => state.authLoading);
  const authError = useAppStore((state) => state.authError);
  const clearAuthError = useAppStore((state) => state.clearAuthError);

  const [formState, setFormState] = useState(initialFormState);
  const [successMessage, setSuccessMessage] = useState("");
  const [localError, setLocalError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/dashboard/volunteer" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    clearAuthError();
    setLocalError("");
    setSuccessMessage("");
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setLocalError("");

    if (formState.password !== formState.confirmPassword) {
      setLocalError("Password and confirm password do not match.");
      return;
    }

    const payload = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      password: formState.password,
      role: formState.role,
      location: formState.location.trim() || undefined,
      bio: formState.bio.trim() || undefined,
      skills:
        formState.role === "volunteer"
          ? formState.skills
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : undefined,
    };

    const result = await signup(payload);
    if (!result.success) return;

    setSuccessMessage(
      result.data?.message ??
        "Registration successful. You can verify email after login.",
    );
    setFormState(initialFormState);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 px-4 py-8 dark:from-emerald-950 dark:via-slate-950 dark:to-emerald-900">
      <div className="absolute right-4 top-4">
        <ThemeControl compact />
      </div>

      <div className="w-full max-w-2xl rounded-3xl border border-emerald-200/70 bg-white/90 p-8 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/60">
        <h1 className="mb-2 text-3xl font-extrabold text-emerald-950 dark:text-emerald-100">
          Create WasteZero Account
        </h1>
        <p className="mb-6 text-sm text-emerald-900/70 dark:text-emerald-100/70">
          Signup as a volunteer or NGO and start contributing.
        </p>

        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="sm:col-span-1">
            <span className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Name
            </span>
            <input
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />
          </label>

          <label className="sm:col-span-1">
            <span className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Role
            </span>
            <select
              name="role"
              value={formState.role}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="volunteer">Volunteer</option>
              <option value="NGO">NGO</option>
            </select>
          </label>

          <label className="sm:col-span-1">
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

          <label className="sm:col-span-1">
            <span className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Location
            </span>
            <input
              name="location"
              value={formState.location}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>

          <label className="sm:col-span-1">
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

          <label className="sm:col-span-1">
            <span className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Confirm Password
            </span>
            <input
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />
          </label>

          {formState.role === "volunteer" && (
            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Skills (comma separated)
              </span>
              <input
                name="skills"
                value={formState.skills}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
          )}

          <label className="sm:col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Bio
            </span>
            <textarea
              rows={3}
              name="bio"
              value={formState.bio}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>

          {(localError || authError) && (
            <p className="sm:col-span-2 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-900/25 dark:text-rose-300">
              {localError || authError}
            </p>
          )}

          {successMessage && (
            <div className="sm:col-span-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              <p>{successMessage}</p>
            </div>
          )}

          <button
            disabled={authLoading}
            type="submit"
            className="sm:col-span-2 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {authLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-emerald-600">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
