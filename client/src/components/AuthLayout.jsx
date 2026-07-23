import { CheckCircle } from "lucide-react";

const FEATURES = [
  "Hire Skilled Developers",
  "Find Freelance Projects",
  "Build Your Professional Career",
];

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-2 bg-linear-to-br from-blue-600 to-indigo-700 text-white flex flex-col justify-center px-20">
        {/* Brand Name */}
        <h1 className="text-5xl font-extrabold mb-8">SkillSphere</h1>

        {/* Platform Description */}
        <p className="text-xl leading-relaxed text-blue-100 mb-4 max-w-lg">
          Connect with talented freelancers, discover exciting projects, and
          grow your career.
        </p>

        {/* Platform Features (Hidden on small screens) */}
        <div className="mt-16 space-y-6 hidden lg:block">
          {FEATURES.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle className="text-green-300" size={22} />

              <p>{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:flex-3 bg-gray-100 flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
