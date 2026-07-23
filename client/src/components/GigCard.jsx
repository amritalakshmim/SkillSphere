import { Link } from "react-router-dom";

function GigCard({ gig, mode = "manage", onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition">
      <h2 className="text-2xl font-bold">{gig.title}</h2>

      <p className="text-gray-600 mt-3">{gig.description}</p>

      <div className="mt-5 space-y-2">
        <p>
          💰
          <span className="font-semibold">
            ₹ {gig.budget.toLocaleString()}
          </span>
        </p>

        <p>📍 {gig.location}</p>

        <p>🏷 {gig.category}</p>

        <p>⭐ {gig.experienceLevel}</p>
      </div>

      <div className="mt-5">
        <h3 className="font-semibold mb-2">Skills</h3>

        <div className="flex flex-wrap gap-2">
          {gig.skills?.map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {mode === "manage" ? (
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => onEdit(gig._id)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            ✏ Edit
          </button>

          <button
            onClick={() => onDelete(gig._id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            🗑 Delete
          </button>
        </div>
      ) : (
        <Link
          to={`/gigs/${gig._id}`}
          className="block mt-6 text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      )}
    </div>
  );
}

export default GigCard;