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
    </div>
  );
};

export default ProfilePage;
