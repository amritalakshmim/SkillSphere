import { Link } from "react-router-dom";
import { Zap, Users, Globe, ShieldCheck } from "lucide-react";
import FeatureCard from "../../components/FeatureCard";
import HeroGigCard from "../../components/HeroGigCard";

function Home() {
  const features = [
    {
      icon: <Zap size={40} className="text-yellow-600" />,
      title: "Fast Hiring",
      description: "Hire talented developers in just a few clicks.",
    },
    {
      icon: <Users size={40} className="text-green-600" />,
      title: "Verified Freelancers",
      description: "Connect with skilled professionals from different domains.",
    },
    {
      icon: <Globe size={40} className="text-blue-600" />,
      title: "Remote Friendly",
      description: "Collaborate with people anywhere in the world.",
    },
    {
      icon: <ShieldCheck size={40} className="text-purple-600" />,
      title: "Secure Platform",
      description: "Your projects and data are protected.",
    },
  ];

  const heroGigs = [
    {
      title: "React Developer",
      budget: "30,000",
      location: "Remote",
      skills: ["React", "Node.js"],
    },
    {
      title: "Python Developer",
      budget: "40,000",
      location: "Remote",
      skills: ["Python", "Django"],
    },
    {
      title: "UI/UX Designer",
      budget: "25,000",
      location: "Hybrid",
      skills: ["Figma", "UI Design"],
    },
  ];

  return (
    <div>
      <nav className="sticky top-0 z-50 bg-linear-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">SkillSphere</h1>

        <div className="flex items-center gap-6">
          <Link to="/login" className="transition hover:text-blue-200">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Register
          </Link>
        </div>
      </nav>
      <section className="bg-linear-to-b from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left */}

          <div className="flex-1">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Find Your Next
              <span className="text-blue-600"> Freelance Opportunity</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              SkillSphere connects talented freelancers with clients looking for
              quality work. Build your career or hire the perfect developer.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-blue-700 hover:scale-105"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right */}

          <div className="flex-1 space-y-6">
            {heroGigs.map((gig) => (
              <HeroGigCard
                key={`${gig.title}-${gig.location}`}
                title={gig.title}
                budget={gig.budget}
                location={gig.location}
                skills={gig.skills}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center">
            Why Choose SkillSphere?
          </h2>

          <p className="text-gray-600 text-center mt-4 mb-16">
            Everything you need to hire, collaborate, and succeed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center">
            How SkillSphere Works
          </h2>

          <p className="text-gray-600 text-center mt-4 mb-16">
            Start collaborating in just three simple steps.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                1
              </div>

              <h3 className="text-xl font-semibold mt-6">Create an Account</h3>

              <p className="text-gray-600 mt-3">
                Sign up as a client or freelancer and complete your profile.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                2
              </div>

              <h3 className="text-xl font-semibold mt-6">
                Post or Browse Gigs
              </h3>

              <p className="text-gray-600 mt-3">
                Clients post projects while freelancers discover opportunities.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                3
              </div>

              <h3 className="text-xl font-semibold mt-6">Collaborate & Grow</h3>

              <p className="text-gray-600 mt-3">
                Apply, hire, approve applications, and work together
                successfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold">SkillSphere</h2>

          <p className="text-gray-400 mt-4">
            Connecting talented freelancers with clients worldwide.
          </p>

          <div className="border-t border-gray-700 mt-8 pt-6">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} SkillSphere. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
