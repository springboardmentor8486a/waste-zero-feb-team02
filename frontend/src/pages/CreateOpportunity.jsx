import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

const CreateOpportunity = () => {
  const navigate = useNavigate();
  const addOpportunity = useAppStore((state) => state.addOpportunity);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    duration: "",
    location: "",
    capacity: "",
    eventDate: "",
    category: "",
    status: "Open",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.location) {
      setError("Please fill all required fields.");
      return;
    }

    addOpportunity(formData);

    setSuccessMessage("Opportunity created successfully!");
    setError("");

    setTimeout(() => {
      navigate("/dashboard/ngo");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">Create Opportunity</h1>

        {successMessage && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Opportunity Title *"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Description *"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="location"
            placeholder="Location *"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="requiredSkills"
            placeholder="Required Skills"
            value={formData.requiredSkills}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="capacity"
            placeholder="Volunteer Capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Awareness">Awareness</option>
            <option value="Recycling">Recycling</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
          >
            Create Opportunity
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOpportunity;
