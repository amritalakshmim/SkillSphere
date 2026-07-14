import { CheckCircle } from "lucide-react";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="flex-2 bg-linear-to-br from-blue-600 to-indigo-700 text-white flex flex-col justify-center px-20">
        <h1 className="text-5xl font-extrabold mb-8">🚀 SkillSphere</h1>

        <p className="text-xl leading-relaxed text-blue-100 max-w-lg">
          Connect with talented freelancers, discover exciting projects, and
          grow your career.
        </p>

        <div className="mt-16 space-y-6 hidden lg:block">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-300" size={22} />
            <p>Hire Skilled Developers</p>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-300" size={22} />
            <p>Find Freelance Projects</p>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-300" size={22} />
            <p>Build Your Professional Career</p>
          </div>
        </div>
      </div>
      {/* Right Section */}

      <div className="lg:flex-3 bg-gray-100 flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
