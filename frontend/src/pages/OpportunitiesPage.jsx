import { useEffect, useState } from "react";
import axios from "axios";

const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/opportunities",
        );
        setOpportunities(res.data?.opportunities || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Available Opportunities</h1>

      {loading ? (
        <p>Loading...</p>
      ) : opportunities.length === 0 ? (
        <p>No opportunities found.</p>
      ) : (
        <div className="grid gap-6">
          {opportunities.map((opp) => (
            <div
              key={opp._id}
              className="group rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-emerald-900/50 dark:bg-emerald-950/60"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left Side */}
                <div>
                  <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                    {opp.title}
                  </h3>

                  <p className="mt-1 text-sm text-emerald-800/70 dark:text-emerald-200/70">
                    {opp.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {opp.required_skills?.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 text-xs text-emerald-700 dark:text-emerald-300">
                    📍 {opp.location}
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-start md:items-end gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      opp.status === "closed"
                        ? "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300"
                        : opp.status === "in-progress"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300"
                          : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300"
                    }`}
                  >
                    {opp.status || "Open"}
                  </span>

                  <button className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OpportunitiesPage;
