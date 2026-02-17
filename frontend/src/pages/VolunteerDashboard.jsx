import { ClipboardList, Mail, MapPin, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

const VolunteerDashboard = () => {
  const user = useAppStore((state) => state.currentUser);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-emerald-200/70 bg-white/85 p-6 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/60">
        <h1 className="text-3xl font-extrabold text-emerald-950 dark:text-emerald-50">
          Volunteer Dashboard
        </h1>
        <p className="mt-2 text-emerald-900/70 dark:text-emerald-100/70">
          Welcome back, {user?.name ?? "Volunteer"}.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="space-y-4 rounded-3xl border border-emerald-200/70 bg-white/85 p-6 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/60">
          <h2 className="text-lg font-bold text-emerald-950 dark:text-emerald-50">
            Profile Overview
          </h2>

          <div className="space-y-2 text-sm text-emerald-900/75 dark:text-emerald-100/75">
            <p className="flex items-center gap-2">
              <Mail size={15} /> {user?.email}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={15} /> {user?.location || "Location not added"}
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.length ? (
                user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/45 dark:text-emerald-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-emerald-900/60 dark:text-emerald-100/60">
                  No skills added yet.
                </span>
              )}
            </div>
          </div>

          <Link
            to="/profile"
            className="inline-flex rounded-full border border-emerald-500 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-400 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
          >
            Edit My Profile
          </Link>

          {!user?.emailVerified && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
              <p className="flex items-start gap-2">
                <ShieldAlert size={14} className="mt-0.5" />
                Please verify your email to unlock all volunteer features.
              </p>
            </div>
          )}
        </section>

        <div className="space-y-6 xl:col-span-2">
          <section className="rounded-3xl border border-dashed border-emerald-300 bg-white/85 p-6 text-center shadow-sm dark:border-emerald-800 dark:bg-emerald-950/60">
            <h2 className="text-xl font-bold text-emerald-950 dark:text-emerald-50">
              Available Opportunities
            </h2>
            <p className="mt-2 text-emerald-900/70 dark:text-emerald-100/70">
              Browse and apply to volunteering opportunities .
            </p>
          </section>

          <section className="rounded-3xl border border-emerald-200/70 bg-white/85 p-6 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/60">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-emerald-950 dark:text-emerald-50">
              <ClipboardList size={18} />
              My Applications
            </h2>
            <p className="text-sm text-emerald-900/70 dark:text-emerald-100/70">
              You have not applied to any opportunity yet.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
