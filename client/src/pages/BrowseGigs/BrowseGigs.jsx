import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES } from "../../constants/categories";
import { EXPERIENCE_LEVELS } from "../../constants/experienceLevels";
import API from "../../services/api";
import GigCard from "../../components/GigCard";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";

function BrowseGigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  const loadGigs = async () => {
    try {
      const response = await API.get("/gigs");
      setGigs(response.data.gigs);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGigs();
  }, []);

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch = gig.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || gig.category === selectedCategory;

    const matchesExperience =
      selectedExperience === "" || gig.experienceLevel === selectedExperience;

    return matchesSearch && matchesCategory && matchesExperience;
  });

  if (loading) {
    return <LoadingSpinner text="Loading gigs..." />;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8">Browse Gigs</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search gigs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>

          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Experience */}
        <select
          value={selectedExperience}
          onChange={(e) => setSelectedExperience(e.target.value)}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Levels</option>

          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <p className="text-gray-600 mb-6">{filteredGigs.length} gigs found</p>

      {/* Gig Cards */}
      {filteredGigs.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No Gigs Found"
          description="Try changing your search or filters."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} mode="browse" />
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseGigs;
