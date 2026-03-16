import { useState } from "react";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
import ProfileDetailsForm from "../components/profile/ProfileDetailsForm";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-4xl font-extrabold text-emerald-950 dark:text-emerald-50">
          My Profile
        </h1>
        <p className="mt-2 text-base text-emerald-900/70 dark:text-emerald-100/70">
          Manage your account information and settings.
        </p>
      </section>

      <div className="inline-flex rounded-full bg-emerald-100 p-1 dark:bg-emerald-900/45">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            activeTab === "profile"
              ? "bg-emerald-500 text-white"
              : "text-emerald-800 hover:bg-emerald-200/80 dark:text-emerald-100 dark:hover:bg-emerald-800/60"
          }`}
        >
          Profile
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("password")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            activeTab === "password"
              ? "bg-emerald-500 text-white"
              : "text-emerald-800 hover:bg-emerald-200/80 dark:text-emerald-100 dark:hover:bg-emerald-800/60"
          }`}
        >
          Password
        </button>
      </div>

      {activeTab === "profile" ? <ProfileDetailsForm /> : <ChangePasswordForm />}

      {/* Mock Notification Trigger for Verification */}
      <div className="mt-12 rounded-2xl border border-dashed border-emerald-300 p-6 dark:border-emerald-700">
        <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
          Verification Tools (Mock)
        </h3>
        <p className="mb-4 text-sm text-emerald-700/70 dark:text-emerald-300/70">
          Since the backend WebSocket is not yet implemented, use these buttons to
          test the notification system.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              const { addNotification } = useAppStore.getState();
              addNotification({
                id: Date.now(),
                title: "New Match!",
                message: "A new opportunity matches your skills.",
                type: "match",
                isRead: false,
                createdAt: new Date().toISOString(),
              });
              import("react-hot-toast").then((m) =>
                m.toast.success("New Match notification triggered!"),
              );
            }}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500"
          >
            Trigger Match Notification
          </button>
          <button
            onClick={() => {
              const { addNotification } = useAppStore.getState();
              addNotification({
                id: Date.now(),
                title: "New Message",
                message: "You have a new message from WasteZero Team.",
                type: "message",
                isRead: false,
                createdAt: new Date().toISOString(),
              });
              import("react-hot-toast").then((m) =>
                m.toast.success("New Message notification triggered!"),
              );
            }}
            className="rounded-lg border border-emerald-600 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-200 dark:hover:bg-emerald-900/30"
          >
            Trigger Message Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
