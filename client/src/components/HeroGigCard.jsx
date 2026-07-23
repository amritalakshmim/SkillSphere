function HeroGigCard({ title, budget, location, skills }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="text-blue-600 font-semibold mt-2">
        ₹ {budget.toLocaleString()}
      </p>

      <p className="text-gray-500 mt-1">
        📍 {location}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

    </div>
  );
}

export default HeroGigCard;