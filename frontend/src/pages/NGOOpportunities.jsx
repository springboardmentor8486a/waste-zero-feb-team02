import { apiClient } from "../api/axiosClient";
import { useEffect, useState, useCallback } from "react";
import { LayoutList, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useAppStore } from "../store/useAppStore";

const NGOOpportunities = () => {
  const user = useAppStore((state) => state.currentUser);

  const [opportunities, setOpportunities] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const globalSearch = useAppStore((state) => state.globalSearch);

  const fetchOpportunities = useCallback(async () => {
    if (!user?._id) return;

    setLoading(true);

    try {
      const res = await apiClient.get("/opportunities");

      const myOpportunities = res.data.opportunities.filter(
        (op) => op.ngo_id?._id === user?._id,
      );

      setOpportunities(
        myOpportunities.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        ),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await apiClient.delete(`/opportunities/${deleteId}`);
      toast.success("Deleted successfully");
      fetchOpportunities();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  const searchValue = globalSearch.trim().toLowerCase();

  const filteredOpportunities = opportunities
    .filter((op) => {
      if (!searchValue) return true;

      return (
        op.title?.toLowerCase().includes(searchValue) ||
        op.location?.toLowerCase().includes(searchValue)
      );
    })
    .filter((op) => {
      if (filterStatus === "all") return true;
      return op.status === filterStatus;
    });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <LayoutList size={22} />
        My Opportunities
      </h1>

      <div className="flex gap-3">
        {["all", "open", "closed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
              filterStatus === status
                ? status === "open"
                  ? "bg-emerald-600 text-white shadow-md"
                  : status === "closed"
                    ? "bg-rose-600 text-white shadow-md"
                    : "bg-emerald-500 text-white shadow-md"
                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-800/60"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredOpportunities.length === 0 ? (
        <p>No opportunities found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {filteredOpportunities.map((op) => (
            <div
              key={op._id}
              className="group relative rounded-3xl border 
      border-emerald-200 dark:border-emerald-900/40
      bg-white dark:bg-emerald-950/50
      p-6 shadow-sm hover:shadow-xl 
      transition-all duration-300 hover:-translate-y-1"
            >
              <span
                className={`absolute top-5 right-5 px-3 py-1 text-xs font-semibold rounded-full ${
                  op.status === "open"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300"
                }`}
              >
                {op.status.toUpperCase()}
              </span>
              <h3 className="text-lg font-bold text-gray-800 dark:text-emerald-100 pr-16">
                {op.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-emerald-300">
                📍 {op.location}
              </p>
              <p className="mt-3 text-xs text-gray-400 dark:text-emerald-400">
                Created on {new Date(op.createdAt).toLocaleDateString()}
              </p>

              {/* Skills */}
              {op.required_skills?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {op.required_skills.slice(0, 4).map((skill, index) => (
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

              <div className="mt-5 border-t border-gray-100 dark:border-emerald-900/40 pt-4 flex justify-end gap-3">
                <Link
                  to={`/dashboard/ngo/edit/${op._id}`}
                  className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium rounded-lg 
    bg-blue-50 text-blue-600 hover:bg-blue-100 
    dark:bg-blue-900/30 dark:text-blue-300 transition"
                >
                  <Pencil size={14} />
                  Edit
                </Link>

                <button
                  onClick={() => setDeleteId(op._id)}
                  className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium rounded-lg 
    bg-rose-50 text-rose-600 hover:bg-rose-100 
    dark:bg-rose-900/30 dark:text-rose-300 transition"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80">
            <p>Are you sure you want to delete this opportunity?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setDeleteId(null)}>Cancel</button>
              <button onClick={handleDelete} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NGOOpportunities;
