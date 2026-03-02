import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiClient } from "../api/axiosClient";
import toast from "react-hot-toast";

const EditOpportunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    duration: "",
    location: "",
    status: "open",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  //  Fetch opportunity from backend
  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const res = await apiClient.get(`/opportunities/${id}`);

        setFormData({
          title: res.data.title,
          description: res.data.description,
          requiredSkills: res.data.required_skills.join(", "),
          duration: res.data.duration,
          location: res.data.location,
          status: res.data.status,
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOpportunity();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  Update API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await apiClient.put(`/opportunities/${id}`, {
        title: formData.title,
        description: formData.description,
        required_skills: formData.requiredSkills,
        duration: formData.duration,
        location: formData.location,
        status: formData.status,
      });

      toast.success("Opportunity updated successfully");
      navigate("/dashboard/ngo");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  //  Delete API
  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await apiClient.delete(`/opportunities/${id}`);
      navigate("/dashboard/ngo");
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-emerald-700 dark:text-emerald-300">
        Loading opportunity...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-emerald-950 dark:via-slate-950 dark:to-emerald-900 flex justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-emerald-950/70 backdrop-blur-md border border-emerald-200/60 dark:border-emerald-900/60 rounded-3xl shadow-2xl p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-emerald-100">
            Edit Opportunity
          </h1>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
              formData.status === "open"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-800/40 dark:text-emerald-300"
                : "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300"
            }`}
          >
            {formData.status}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-emerald-200">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-emerald-800 bg-white dark:bg-emerald-900/40 text-gray-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-emerald-200">
              Description
            </label>
            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-emerald-800 bg-white dark:bg-emerald-900/40 text-gray-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-emerald-200">
              Required Skills (comma separated)
            </label>
            <input
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-emerald-800 bg-white dark:bg-emerald-900/40 text-gray-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition"
            />
            {formData.requiredSkills && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.requiredSkills.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-800/40 dark:text-emerald-300"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Duration & Location Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-emerald-200">
                Duration
              </label>
              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-emerald-800 bg-white dark:bg-emerald-900/40 text-gray-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-emerald-200">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-emerald-800 bg-white dark:bg-emerald-900/40 text-gray-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-emerald-200">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-emerald-800 bg-white dark:bg-emerald-900/40 text-gray-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none transition"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-emerald-900/40">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-emerald-700 text-gray-700 dark:text-emerald-200 hover:bg-gray-100 dark:hover:bg-emerald-900/40 transition"
            >
              Cancel
            </button>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold shadow-lg hover:shadow-emerald-500/30 transition disabled:opacity-60"
              >
                {updating ? "Updating..." : "Update"}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2.5 rounded-xl border border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOpportunity;
