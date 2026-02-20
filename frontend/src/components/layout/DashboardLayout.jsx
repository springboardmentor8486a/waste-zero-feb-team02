import { Bell, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi";
import { useAppStore } from "../../store/useAppStore";
import { getApiErrorMessage } from "../../utils/apiError";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.currentUser);
  const logout = useAppStore((state) => state.logout);
  const loadCurrentUser = useAppStore((state) => state.loadCurrentUser);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationNotice, setVerificationNotice] = useState("");

  const dashboardPath =
    user?.role === "NGO" ? "/dashboard/ngo" : "/dashboard/volunteer";
  const needsEmailVerification = Boolean(user && !user.emailVerified);

  useEffect(() => {
    if (!mobileSidebarOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileSidebarOpen]);

  const handleLogout = () => {
    logout();
    setMobileSidebarOpen(false);
    navigate("/login", { replace: true });
  };

  const handleSidebarSelection = () => {
    setMobileSidebarOpen(false);
  };

  const handleStartEmailVerification = async () => {
    setVerificationNotice("");
    setVerificationLoading(true);

    try {
      const data = await userApi.requestEmailVerification();
      const verificationLink = data?.verificationLink;

      if (verificationLink) {
        window.location.assign(verificationLink);
        return;
      }

      setVerificationNotice(
        data?.message ??
          "Verification started. Please check your email for the link.",
      );
    } catch (error) {
      setVerificationNotice(
        getApiErrorMessage(error, "Unable to start email verification."),
      );
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleRefreshVerificationStatus = async () => {
    setVerificationNotice("");
    await loadCurrentUser();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-emerald-100 dark:from-emerald-950 dark:via-slate-950 dark:to-emerald-900">
      <div className="mx-auto flex min-h-screen max-w-425">
        <aside className="hidden w-72 shrink-0 md:block">
          <div className="sticky top-0 h-screen p-4">
            <DashboardSidebar
              user={user}
              dashboardPath={dashboardPath}
              onLogout={handleLogout}
              onSelect={handleSidebarSelection}
            />
          </div>
        </aside>

        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute inset-0 bg-slate-900/50"
              aria-label="Close sidebar backdrop"
            />
            <div className="relative h-full w-[86%] max-w-[320px] p-3">
              <DashboardSidebar
                user={user}
                dashboardPath={dashboardPath}
                onLogout={handleLogout}
                onSelect={handleSidebarSelection}
              />
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-emerald-200/70 bg-emerald-100/75 backdrop-blur dark:border-emerald-900/45 dark:bg-emerald-950/55">
            <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen((prev) => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-white/80 text-emerald-700 md:hidden dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200"
                aria-label="Toggle sidebar"
              >
                {mobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              <div className="relative flex-1">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700/70 dark:text-emerald-300/70"
                />
                <input
                  type="text"
                  placeholder="Search pickups, opportunities..."
                  className="w-full rounded-full border border-emerald-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-emerald-900 outline-none transition focus:border-emerald-500 dark:border-emerald-800 dark:bg-emerald-950/75 dark:text-emerald-100"
                />
              </div>

              <button
                type="button"
                aria-label="Notifications"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-white/80 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200"
              >
                <Bell size={18} />
              </button>
            </div>

            {needsEmailVerification && (
              <div className="border-t border-amber-300/70 bg-amber-50 px-4 py-3 sm:px-6 lg:px-8 dark:border-amber-700/60 dark:bg-amber-900/20">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Your email is not verified. Click verify to start email verification.
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleRefreshVerificationStatus}
                      className="rounded-full border border-amber-400 px-4 py-1.5 text-xs font-semibold text-amber-800 transition hover:bg-amber-100 dark:border-amber-600 dark:text-amber-200 dark:hover:bg-amber-900/40"
                    >
                      Refresh Status
                    </button>
                    <button
                      type="button"
                      onClick={handleStartEmailVerification}
                      disabled={verificationLoading}
                      className="rounded-full bg-amber-500 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {verificationLoading ? "Starting..." : "Verify Email"}
                    </button>
                  </div>
                </div>

                {verificationNotice && (
                  <p className="mt-2 text-xs text-amber-800 dark:text-amber-300">
                    {verificationNotice}
                  </p>
                )}
              </div>
            )}
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
