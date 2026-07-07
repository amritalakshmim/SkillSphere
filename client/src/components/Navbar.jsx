import useAuth from "../hooks/useAuth";

function Navbar() {

  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        SkillSphere
      </h1>

      <div className="flex items-center gap-4">

        <span>
          {user?.name}
        </span>

        <button
          onClick={logout}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;