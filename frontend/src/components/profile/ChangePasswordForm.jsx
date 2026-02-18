import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { userApi } from "../../api/userApi";
import { getApiErrorMessage } from "../../utils/apiError";

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordForm = () => {
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState({ type: "", text: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNotice({ type: "", text: "" });
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotice({ type: "", text: "" });

    if (formState.newPassword.length < 6) {
      setNotice({
        type: "error",
        text: "Password must be at least 6 characters long.",
      });
      return;
    }

    if (formState.newPassword !== formState.confirmPassword) {
      setNotice({ type: "error", text: "New passwords do not match." });
      return;
    }

    setLoading(true);

    try {
      const data = await userApi.changePassword({
        currentPassword: formState.currentPassword,
        newPassword: formState.newPassword,
      });

      setNotice({
        type: "success",
        text: data?.message ?? "Password updated successfully.",
      });
      setFormState(initialState);
    } catch (error) {
      const statusCode = error?.response?.status;
      const fallbackMessage =
        statusCode === 404
          ? "Password endpoint is not configured on the backend yet."
          : "Unable to change password.";

      setNotice({
        type: "error",
        text: getApiErrorMessage(error, fallbackMessage),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-emerald-200/70 bg-white/90 p-6 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/60 sm:p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-emerald-950 dark:text-emerald-100">
          Change Password
        </h2>
        <p className="mt-1 text-sm text-emerald-900/70 dark:text-emerald-100/70">
          Update your password to secure your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <label className="block">
          <span className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900/80 dark:text-emerald-100/80">
            <LockKeyhole size={15} />
            Current Password
          </span>
          <input
            type="password"
            name="currentPassword"
            value={formState.currentPassword}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-950 outline-none transition focus:border-emerald-500 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-50"
          />
        </label>

        <label className="block">
          <span className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900/80 dark:text-emerald-100/80">
            <LockKeyhole size={15} />
            New Password
          </span>
          <input
            type="password"
            name="newPassword"
            value={formState.newPassword}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-950 outline-none transition focus:border-emerald-500 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-50"
          />
        </label>

        <p className="text-xs text-emerald-900/60 dark:text-emerald-100/60">
          Password must be at least 6 characters long.
        </p>

        <label className="block">
          <span className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900/80 dark:text-emerald-100/80">
            <LockKeyhole size={15} />
            Confirm New Password
          </span>
          <input
            type="password"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-950 outline-none transition focus:border-emerald-500 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-50"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-emerald-600 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>

      {notice.text && (
        <p
          className={`mt-4 rounded-xl px-3 py-2 text-sm ${
            notice.type === "success"
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/45 dark:text-emerald-200"
              : "bg-rose-100 text-rose-800 dark:bg-rose-900/35 dark:text-rose-200"
          }`}
        >
          {notice.text}
        </p>
      )}
    </section>
  );
};

export default ChangePasswordForm;
