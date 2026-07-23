import { Link, useLocation } from "react-router-dom";
import {
  FaBriefcase,
  FaFileAlt,
  FaSearch,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";

import useAuth from "../hooks/useAuth";

const MENU_ITEMS = {
  client: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
    {
      name: "My Gigs",
      path: "/gigs",
      icon: <FaBriefcase />,
    },
    {
      name: "Received Applications",
      path: "/received-applications",
      icon: <FaFileAlt />,
    },
  ],

  freelancer: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
    {
      name: "Browse Gigs",
      path: "/browse-gigs",
      icon: <FaSearch />,
    },
    {
      name: "My Applications",
      path: "/my-applications",
      icon: <FaFileAlt />,
    },
  ],
};

function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  // Select menu based on the authenticated user's role.
  const menuItems = MENU_ITEMS[user?.role] || [];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg">
      <h2 className="text-2xl font-bold p-6 border-b">Menu</h2>

      <nav className="p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors duration-200 ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            <span>{item.icon}</span>

            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
