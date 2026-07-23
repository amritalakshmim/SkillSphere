import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Page Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
