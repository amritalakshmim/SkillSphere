import useAuth from "../../hooks/useAuth";
import DashboardCard from "../../components/DashboardCard";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Welcome back, {user?.name} 👋
      </h1>

      <p className="text-gray-600 mt-2">
        Role: {user?.role}
      </p>

      <div className="grid grid-cols-2 gap-6 mt-10">

        <DashboardCard
          title="Profile"
          description="Manage your profile"
          icon="👤"
        />

        <DashboardCard
          title="My Gigs"
          description="Create and manage gigs"
          icon="💼"
        />

        <DashboardCard
          title="Applications"
          description="Track your applications"
          icon="📄"
        />

        <DashboardCard
          title="Messages"
          description="Chat with clients"
          icon="💬"
        />

      </div>

    </div>
  );
}

export default Dashboard;