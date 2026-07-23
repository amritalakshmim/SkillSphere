import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../services/api";
import useAuth from "../../hooks/useAuth";

function Profile() {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    qualification: "",
    experience: "",
    skills: "",
    about: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const profileFields = [
    formData.qualification,
    formData.experience,
    formData.skills,
    formData.about,
  ];

  const completedFields = profileFields.filter(
    (field) => field.trim() !== ""
  ).length;

  const completion = Math.round(
    (completedFields / profileFields.length) * 100
  );

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await API.get("/users/profile");

        setFormData({
          name: response.data.user.name || "",
          email: response.data.user.email || "",
          qualification: response.data.user.qualification || "",
          experience: response.data.user.experience || "",
          skills: response.data.user.skills?.join(", ") || "",
          about: response.data.user.about || "",
        });
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await API.put("/users/profile", payload);

      setUser(response.data.user);

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-lg">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        {user?.role === "freelancer" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">

            <h2 className="text-lg font-semibold">
              Profile Completion
            </h2>

            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  completion === 100
                    ? "bg-green-600"
                    : completion >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${completion}%` }}
              ></div>
            </div>

            <p className="mt-3 text-sm text-gray-700">
              {completion}% Complete
            </p>

            {completion < 100 ? (
              <p className="text-sm text-orange-600 mt-2">
                Complete your profile before applying for gigs.
              </p>
            ) : (
              <p className="text-sm text-green-600 font-medium mt-2">
                🎉 Your profile is complete and ready for job applications!
              </p>
            )}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {user?.role === "freelancer" && (
            <>
              <div>
                <label className="block mb-2 font-medium">
                  Qualification
                </label>

                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  placeholder="e.g. B.Tech Computer Science"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  placeholder="e.g. Fresher or 2 Years"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  placeholder="React, Node.js, MongoDB, Express"
                />

                <p className="text-sm text-gray-500 mt-2">
                  Separate each skill with a comma.
                </p>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  About Me
                </label>

                <textarea
                  name="about"
                  rows={5}
                  value={formData.about}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  placeholder="Briefly describe your skills, experience and the type of work you do."
                />
              </div>
            </>
          )}

          <div>
            <label className="block mb-2 font-medium">
              Role
            </label>

            <input
              type="text"
              value={
                user?.role
                  ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  : ""
              }
              disabled
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Profile;