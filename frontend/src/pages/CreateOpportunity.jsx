import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/axiosClient";
import toast from "react-hot-toast";

const CreateOpportunity = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    duration: "",
    location: "",
    status: "open",
  });
  const [loading, setLoading] = useState(false);

  //  FIXED handleChange
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  CONNECTED TO BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.requiredSkills ||
      !formData.duration ||
      !formData.location
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await apiClient.post("/opportunities", {
        title: formData.title,
        description: formData.description,
        required_skills: formData.requiredSkills,
        duration: formData.duration,
        location: formData.location,
        status: formData.status,
      });

      toast.success("Opportunity created successfully");

      navigate("/dashboard/ngo");
    } catch (error) {
      toast.error(error.response?.data?.message || "Creation failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-black flex justify-center py-16 px-4">
      <div
        className="w-full max-w-3xl 
      bg-white dark:bg-emerald-950/70
      backdrop-blur-md
      border border-emerald-200/60 dark:border-emerald-900/60
      rounded-3xl
      shadow-2xl
      p-12
      transition-all duration-300"
      >
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-emerald-100">
            Create Opportunity
          </h1>
          <p className="text-sm text-gray-500 dark:text-emerald-300 mt-3">
            Add opportunity details for volunteers to discover and apply.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Title */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-emerald-200">
              Opportunity Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl
              border border-gray-300 dark:border-emerald-800
              bg-white dark:bg-emerald-900/40
              text-gray-900 dark:text-emerald-100
              shadow-sm
              focus:ring-2 focus:ring-emerald-500
              focus:shadow-emerald-500/20 focus:shadow-md
              outline-none transition-all duration-200"
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-emerald-200">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl
              border border-gray-300 dark:border-emerald-800
              bg-white dark:bg-emerald-900/40
              text-gray-900 dark:text-emerald-100
              shadow-sm
              focus:ring-2 focus:ring-emerald-500
              focus:shadow-emerald-500/20 focus:shadow-md
              outline-none transition-all duration-200 resize-none"
            />
            <p className="text-xs text-gray-400 dark:text-emerald-400">
              Briefly describe responsibilities, expectations, and impact.
            </p>
          </div>

          {/* Grid Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Location */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-emerald-200">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl
                border border-gray-300 dark:border-emerald-800
                bg-white dark:bg-emerald-900/40
                text-gray-900 dark:text-emerald-100
                shadow-sm
                focus:ring-2 focus:ring-emerald-500
                focus:shadow-emerald-500/20 focus:shadow-md
                outline-none transition-all duration-200"
              />
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-emerald-200">
                Duration <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="duration"
                placeholder="e.g. 2 weeks"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl
                border border-gray-300 dark:border-emerald-800
                bg-white dark:bg-emerald-900/40
                text-gray-900 dark:text-emerald-100
                shadow-sm
                focus:ring-2 focus:ring-emerald-500
                focus:shadow-emerald-500/20 focus:shadow-md
                outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-emerald-200">
              Required Skills <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="requiredSkills"
              placeholder="Separate skills with commas"
              value={formData.requiredSkills}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl
              border border-gray-300 dark:border-emerald-800
              bg-white dark:bg-emerald-900/40
              text-gray-900 dark:text-emerald-100
              shadow-sm
              focus:ring-2 focus:ring-emerald-500
              focus:shadow-emerald-500/20 focus:shadow-md
              outline-none transition-all duration-200"
            />
          </div>

          {/* Status */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-emerald-200">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl
              border border-gray-300 dark:border-emerald-800
              bg-white dark:bg-emerald-900/40
              text-gray-900 dark:text-emerald-100
              shadow-sm
              focus:ring-2 focus:ring-emerald-500
              outline-none transition-all duration-200"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl
              bg-gradient-to-r from-emerald-600 to-green-500
              hover:from-emerald-500 hover:to-green-400
              disabled:opacity-50 disabled:cursor-not-allowed
              text-white font-semibold tracking-wide
              shadow-lg hover:shadow-emerald-500/30
              transition-all duration-300"
            >
              {loading ? "Creating Opportunity..." : "Create Opportunity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOpportunity;
