import { useEffect, useState } from "react";
import API from "../../services/api";
import EmptyState from "../../components/EmptyState";

function ReceivedApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateStatus = async (applicationId, status) => {
    try {
      await API.put(`/applications/${applicationId}`, {
        status,
      });

      loadApplications();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const loadApplications = async () => {
    try {
      const response = await API.get("/applications/received");

      setApplications(response.data.applications);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Applications Received</h1>

      {applications.length === 0 ? (
        <EmptyState
          icon="📥"
          title="No Applications Received"
          description="No freelancers have applied to your gigs yet."
        />
      ) : (
        <div className="space-y-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border"
            >
              <h2 className="text-2xl font-bold text-blue-700">
                {application.gig.title}
              </h2>

              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">
                  Freelancer Profile
                </h3>

                {application.status === "Approved" ? (
                  <>
                    <p>
                      <span className="font-medium">📧 Email:</span>{" "}
                      {application.applicant.email}
                    </p>

                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 font-medium">
                        🎉 You have approved this freelancer.
                      </p>

                      <p className="text-sm text-green-700 mt-2">
                        Contact them using the email above to discuss the
                        project.
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 mt-2 italic">
                    Contact details will be available after approval.
                  </p>
                )}

                <p>
                  <span className="font-medium">📧 Email:</span>{" "}
                  {application.applicant.email}
                </p>

                <p className="mt-2">
                  <span className="font-medium">🎓 Qualification:</span>{" "}
                  {application.applicant.qualification || "Not provided"}
                </p>

                <p>
                  <span className="font-medium">💼 Experience:</span>{" "}
                  {application.applicant.experience || "Not provided"}
                </p>

                <div className="mt-3">
                  <span className="font-medium">🛠 Skills:</span>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {application.applicant.skills?.length ? (
                      application.applicant.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No skills added</span>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <span className="font-medium">📝 About:</span>

                  <p className="text-gray-700 mt-1">
                    {application.applicant.about || "No description provided."}
                  </p>
                </div>
              </div>

              <p className="mt-4">
                Status:
                <span
                  className={`ml-2 px-3 rounded-full text-sm font-semibold
                  ${
                    application.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : application.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {application.status}
                </span>
              </p>

              {application.status === "Pending" && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => updateStatus(application._id, "Approved")}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    ✅ Approve
                  </button>

                  <button
                    onClick={() => updateStatus(application._id, "Rejected")}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReceivedApplications;
