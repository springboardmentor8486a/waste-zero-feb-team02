import { apiClient } from "../api/axiosClient";
import { useEffect, useState } from "react";
import { Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

const NGODashboard = () => {
  const user = useAppStore((state) => state.currentUser);
  const [recentOpportunities, setRecentOpportunities] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await apiClient.get("/opportunities");

        const myOps = res.data.opportunities
          .filter((op) => op.ngo_id?._id === user?._id)
          .slice(0, 3);

        setRecentOpportunities(myOps);
      } catch (error) {
        console.error(error);
      }
    };

    if (user?._id) fetchRecent();
  }, [user?._id]);
  return (
    <div
      className="min-h-screen bg-gradient-to-br 
      from-emerald-50 via-white to-emerald-100 
      dark:from-emerald-950 dark:via-slate-950 dark:to-emerald-900 
      p-6 space-y-6"
    >
      {/* Header */}
      <section
        className="rounded-3xl border 
        border-emerald-200 dark:border-emerald-900/50
        bg-white dark:bg-emerald-950/60 
        p-6 shadow-sm"
      >
        <h1 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100">
          NGO Dashboard
        </h1>
        <p className="mt-2 text-emerald-700 dark:text-emerald-300">
          Managing opportunities for {user?.name ?? "your organization"}.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Profile */}
        <section
          className="space-y-4 rounded-3xl border 
          border-emerald-200 dark:border-emerald-900/50
          bg-white dark:bg-emerald-950/60 
          p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
            Organization Profile
          </h2>

          <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-emerald-300">
            <Mail size={15} /> {user?.email}
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-emerald-300">
            <MapPin size={15} /> {user?.location || "Location not added"}
          </p>

          <p
            className="rounded-xl bg-emerald-50 dark:bg-emerald-900/40 
            p-3 text-sm text-emerald-700 dark:text-emerald-200"
          >
            {user?.bio ||
              "Add a short bio for volunteers to understand your mission."}
          </p>

          <Link
            to="/profile"
            className="inline-flex rounded-full border 
              border-emerald-500 dark:border-emerald-400
              px-4 py-2 text-xs font-semibold 
              text-emerald-700 dark:text-emerald-200
              hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
          >
            Edit Organization Profile
          </Link>
        </section>

        {/* Right Side */}
        <div className="space-y-6 xl:col-span-2">
          {/* Create */}
          <Link
            to="/dashboard/ngo/create"
            className="block rounded-3xl border border-dashed 
              border-emerald-300 dark:border-emerald-800
              bg-white dark:bg-emerald-950/60
              p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
              Create Opportunity
            </h2>
            <p className="mt-2 text-emerald-700 dark:text-emerald-300">
              Publish new opportunities and invite volunteers.
            </p>
          </Link>

          <section className="rounded-3xl border border-emerald-200/70 dark:border-emerald-900/50 bg-white/90 dark:bg-emerald-950/60 p-6 shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
                Recent Opportunities
              </h2>

              <Link
                to="/dashboard/ngo/opportunities"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition"
              >
                View All →
              </Link>
            </div>

            {recentOpportunities.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-emerald-300">
                No opportunities yet.
              </p>
            ) : (
              <div className="space-y-4">
                {recentOpportunities.map((op) => (
                  <div
                    key={op._id}
                    className="group flex items-center justify-between rounded-2xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-900/20 px-5 py-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-emerald-100 group-hover:text-emerald-600 transition">
                        {op.title}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-emerald-400 mt-1">
                        📍 {op.location}
                      </p>

                      {/* Skills */}
                      {op.required_skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {op.required_skills
                            .slice(0, 4)
                            .map((skill, index) => (
                              <span
                                key={index}
                                className="text-xs px-2.5 py-1 rounded-full 
        bg-emerald-100 text-emerald-700 
        dark:bg-emerald-800/40 dark:text-emerald-300"
                              >
                                {skill}
                              </span>
                            ))}

                          {op.required_skills.length > 4 && (
                            <span
                              className="text-xs px-2.5 py-1 rounded-full 
        bg-gray-200 text-gray-600 
        dark:bg-gray-700 dark:text-gray-300"
                            >
                              +{op.required_skills.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full capitalize transition ${
                        op.status === "open"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-800/40 dark:text-emerald-300"
                          : "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300"
                      }`}
                    >
                      {op.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
