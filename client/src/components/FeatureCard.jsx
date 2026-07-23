function FeatureCard({ icon, title, description = "Coming soon..." }) {
  return (
    <div className="bg-white rounded-2xl shadow-md transition-all hover:-translate-y-2 hover:shadow-xl p-8">
      <div className="text-5xl mb-5">{icon}</div>

      <h3 className="text-2xl font-bold mb-3">{title}</h3>

      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;
