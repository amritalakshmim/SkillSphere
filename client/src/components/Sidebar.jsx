import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaBriefcase,
  FaFileAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
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
      name: "Gigs",
      path: "/gigs",
      icon: <FaBriefcase />,
    },
    {
      name: "Applications",
      path: "/applications",
      icon: <FaFileAlt />,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg">

      <h2 className="text-2xl font-bold p-6 border-b">
        Menu
      </h2>

      <nav className="p-4">

        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition
              ${
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