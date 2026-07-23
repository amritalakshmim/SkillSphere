import { useEffect, useState } from "react";
import API from "../../services/api";
import useAuth from "../../hooks/useAuth";

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const response = await API.get("/dashboard");
      setStats(response.data.stats);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">
        Welcome, {user?.name} 👋
      </h1>

      <p className="text-gray-600 mb-10">
        Here's an overview of your account.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        {user?.role === "client" ? (
          <>
            <StatCard
              title="Total Gigs"
              value={stats.totalGigs}
            />

            <StatCard
              title="Applications Received"
              value={stats.applicationsReceived}
            />

            <StatCard
              title="Approved Applications"
              value={stats.approvedApplications}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Applications Sent"
              value={stats.applicationsSent}
            />

            <StatCard
              title="Approved Applications"
              value={stats.approvedApplications}
            />

            <StatCard
              title="Pending Applications"
              value={stats.pendingApplications}
            />
          </>
        )}

      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition">
      <h2 className="text-gray-500">{title}</h2>

      <p className="text-4xl font-bold mt-4">
        {value ?? 0}
      </p>
    </div>
  );
}

export default Dashboard;