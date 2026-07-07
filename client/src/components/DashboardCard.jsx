import { Link } from "react-router-dom";

function DashboardCard({ title, description, icon, link }) {
  return (
    <Link to={link}>
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:scale-105 hover:bg-blue-50 cursor-pointer transition duration-300">
        <div className="text-4xl mb-4">{icon}</div>

        <h2 className="text-xl font-bold text-gray-800">{title}</h2>

        <p className="text-gray-600 mt-2">{description}</p>
        
      </div>
    </Link>
  );
}

export default DashboardCard;
