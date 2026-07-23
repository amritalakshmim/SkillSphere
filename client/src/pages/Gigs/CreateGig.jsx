import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CATEGORIES } from "../../constants/categories";
import { EXPERIENCE_LEVELS } from "../../constants/experienceLevels";
import API from "../../services/api";

function CreateGig() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    location: "",
    category: "",
    skills: "",
    experienceLevel: "Beginner",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const gigData = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
    };

    try {
      await API.post("/gigs", gigData);

      toast.success("Gig created successfully!");

      setTimeout(() => {
        navigate("/gigs");
      }, 1000);

      navigate("/gigs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create gig.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Gig</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        {/* Title */}
        <div>
          <label className="block font-medium mb-2">Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Enter gig title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2">Description</label>

          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Describe your gig"
          ></textarea>
        </div>

        {/* Budget */}
        <div>
          <label className="block font-medium mb-2">Budget</label>

          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="5000"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-2">Location</label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Remote or Kochi"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-2">Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Category</option>

            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block font-medium mb-2">Experience Level</label>

          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Experience Level</option>

            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Deadline */}
        <div>
          <label className="block font-medium mb-2">Deadline</label>

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block font-medium mb-2">Skills</label>

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Create Gig
        </button>
      </form>
    </div>
  );
}

export default CreateGig;
