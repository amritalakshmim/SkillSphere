import { useNavigate } from "react-router-dom";

function EmptyState({
  icon = "📄",
  title,
  description,
  buttonText,
  buttonLink,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-6xl mb-4">{icon}</div>

      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>

      <p className="text-gray-500 mt-3 text-center max-w-md">
        {description}
      </p>

      {buttonText && buttonLink && (
        <button
          onClick={() => navigate(buttonLink)}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;

