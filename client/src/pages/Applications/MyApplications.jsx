import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";

function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    try {
      const response = await API.get("/applications/my");

      setApplications(response.data.applications);
    } catch (error) {
      toast.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading ..." />;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">My Applications</h1>

      {applications.length === 0 ? (
        <EmptyState
          icon="📄"
          title="No Applications Yet"
          description="You haven't applied for any gigs yet. Start exploring opportunities and apply to gigs that match your skills."
          buttonText="Browse Gigs"
          buttonLink="/browse-gigs"
        />
      ) : (
        <div className="space-y-6">
          {applications
            .filter((application) => application.gig)
            .map((application) => (
              <div
                key={application._id}
                className="bg-white shadow-md hover:shadow-xl transition  rounded-xl p-6 border"
              >
                <h2 className="text-2xl font-bold">{application.gig.title}</h2>

                <p className="text-gray-600 mt-2">
                  {application.gig.description}
                </p>

                <div className="mt-5 space-y-2">
                  <p>💰 ₹ {application.gig.budget.toLocaleString()}</p>

                  <p>📍 {application.gig.location}</p>

                  <p>🏷 {application.gig.category}</p>

                  <p>⭐ {application.gig.experienceLevel}</p>

                  <p>👤 Posted by: {application.gig.createdBy?.name}</p>

                  <p>
                    📅 Applied on:{" "}
                    {new Date(application.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </p>

                  <p>
                    Status:{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        application.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : application.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {application.status}
                    </span>
                  </p>

                  {application.status === "Approved" && (
                    <div className="mt-5 bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-700">
                        🎉 Congratulations!
                      </h3>

                      <p className="mt-2">
                        Your application has been approved.
                      </p>

                      <div className="mt-4 space-y-1">
                        <p>
                          <span className="font-medium">Client:</span>{" "}
                          {application.gig.createdBy.name}
                        </p>

                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          {application.gig.createdBy.email}
                        </p>
                      </div>

                      <p className="mt-4 text-sm text-gray-600">
                        Please contact the client using the email above to
                        discuss the project requirements.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;
