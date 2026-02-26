import { useAppStore } from "../store/useAppStore";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const EditOpportunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const opportunities = useAppStore((state) => state.opportunities);
  const updateOpportunityStore = useAppStore(
    (state) => state.updateOpportunity,
  );
  const deleteOpportunityStore = useAppStore(
    (state) => state.deleteOpportunity,
  );

  const opportunity = opportunities.find((op) => String(op.id) === String(id));

  const [formData, setFormData] = useState(
    opportunity || {
      title: "",
      description: "",
      requiredSkills: "",
      duration: "",
      location: "",
      capacity: "",
      eventDate: "",
      category: "",
      status: "Open",
    },
  );

  const [updating, setUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);

    updateOpportunityStore(id, formData);

    setUpdating(false);
    setSuccessMessage("Opportunity updated successfully!");

    setTimeout(() => {
      navigate("/dashboard/ngo");
    }, 1500);
  };
  const handleDelete = () => {
    deleteOpportunityStore(id);
    navigate("/dashboard/ngo");
  };

  if (!opportunity) {
    return <div className="p-6">Opportunity not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Opportunity</h1>

        {successMessage && (
          <div className="mb-6 rounded-lg bg-green-100 p-3 text-green-700 text-sm font-medium">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Required Skills
            </label>
            <input
              type="text"
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleChange}
              placeholder="Teamwork, Communication"
              className="w-full border p-3 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="2 weeks"
              className="w-full border p-3 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Volunteer Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity || ""}
              onChange={handleChange}
              placeholder="50"
              className="w-full border p-3 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="Cleanup">Cleanup</option>
              <option value="Plantation">Plantation</option>
              <option value="Awareness">Awareness</option>
              <option value="Recycling">Recycling</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>

            <button
              type="submit"
              disabled={updating}
              className="bg-emerald-600 text-white px-5 py-2 rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl">
            <p>Are you sure?</p>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowModal(false)}>Cancel</button>
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

export default EditOpportunity;
