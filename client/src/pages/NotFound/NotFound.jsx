import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-8xl font-bold text-blue-600">404</h1>

      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>

      <p className="text-gray-500 mt-3 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default NotFound;
