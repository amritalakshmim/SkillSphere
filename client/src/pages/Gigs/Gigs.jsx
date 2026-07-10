import { useState, useEffect } from "react";
import API from "../../services/api";
import GigCard from "../../components/GigCard";
import { useNavigate } from "react-router-dom";

function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gig?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await API.delete(`/gigs/${id}`);

      loadGigs();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-gig/${id}`);
  };

  const loadGigs = async () => {
    try {
      const response = await API.get("/gigs/my");

      setGigs(response.data.gigs);
    } catch (error) {
      console.log("Failed to load gigs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGigs();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Gigs</h1>

        <button
          onClick={() => navigate("/create-gig")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Gig
        </button>
      </div>

      {loading ? (
        <p>Loading gigs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} onEdit={handleEdit} onDelete={handleDelete}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gigs;

// if (!loading && gigs.length === 0) {
//   return (
//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         My Gigs
//       </h1>

//       <p className="text-gray-500">
//         You haven't created any gigs yet.
//       </p>

//     </div>
//   );
// }
