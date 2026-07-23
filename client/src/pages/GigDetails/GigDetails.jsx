import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Loader2,
  MapPin,
  Briefcase,
  Calendar,
  IndianRupee,
  User,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

import API from "../../services/api";

function GigDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const loadGig = async () => {
    try {
      const response = await API.get(`/gigs/${id}`);

      setGig(response.data.gig);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);

      await API.post("/applications", {
        gigId: gig._id,
      });

      toast.success("Application submitted successfully.");

      setApplied(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit application.");
    } finally {
      setApplying(false);
    }
  };

  const profileComplete =
    Boolean(user?.qualification?.trim()) &&
    Boolean(user?.experience?.trim()) &&
    Boolean(user?.about?.trim()) &&
    user?.skills?.length > 0;

  const checkIfApplied = async () => {
    try {
      const response = await API.get(`/applications/check/${id}`);

      setApplied(response.data.applied);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    loadGig();
    checkIfApplied();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-bold text-gray-800">Gig not found</h1>

        <p className="text-gray-500 mt-3">
          The gig you're looking for doesn't exist or may have been removed.
        </p>

        <button
          onClick={() => navigate("/browse-gigs")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Browse Gigs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:cursor-pointer mb-8"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold">{gig.title}</h1>

        <p className="text-gray-600 mt-6 leading-relaxed">{gig.description}</p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="flex items-center gap-3">
            <IndianRupee className="text-green-600" />₹{" "}
            {gig.budget.toLocaleString()}
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="text-red-500" />
            {gig.location}
          </div>

          <div className="flex items-center gap-3">
            <Briefcase className="text-yellow-500" />
            {gig.category}
          </div>

          <div className="flex items-center gap-3">
            <User className="text-blue-500" />
            {gig.experienceLevel}
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-purple-500" />
            {new Date(gig.deadline).toLocaleDateString()}
          </div>

          {gig.createdBy && (
            <div className="flex items-center gap-3">
              <User className="text-indigo-500" />
              {gig.createdBy.name}
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Skills Required</h2>

          <div className="flex flex-wrap gap-3">
            {gig.skills?.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        {user?.role === "freelancer" && (
          <div className="mt-10">
            {!profileComplete && (
              <div className="mb-4 p-4 rounded-lg bg-yellow-50 border border-yellow-300">
                <p className="text-yellow-800">
                  Complete your freelancer profile before applying for gigs.
                </p>

                <Link
                  to="/profile"
                  className="inline-block mt-3 text-blue-600 hover:underline font-medium"
                >
                  Go to My Profile →
                </Link>
              </div>
            )}

            <button
              disabled={!profileComplete || applied || applying}
              onClick={handleApply}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                !profileComplete || applied || applying
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {applying ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Applying...
                </span>
              ) : applied ? (
                "Already Applied"
              ) : !profileComplete ? (
                "Complete Profile to Apply"
              ) : (
                "Apply Now"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GigDetails;
