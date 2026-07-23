import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Gigs from "./pages/Gigs/Gigs";
import CreateGig from "./pages/Gigs/CreateGig";
import EditGig from "./pages/Gigs/EditGig";
import BrowseGigs from "./pages/BrowseGigs/BrowseGigs";
import GigDetails from "./pages/GigDetails/GigDetails";
import MyApplications from "./pages/Applications/MyApplications";
import ReceivedApplications from "./pages/Applications/ReceivedApplications";
import NotFound from "./pages/NotFound/NotFound";

// Components
import Layout from "./components/Layout";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/gigs/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <GigDetails />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/gigs"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <Layout>
              <Gigs />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-gig"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <Layout>
              <CreateGig />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-gig/:id"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <Layout>
              <EditGig />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/received-applications"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <Layout>
              <ReceivedApplications />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/browse-gigs"
        element={
          <ProtectedRoute allowedRoles={["freelancer"]}>
            <Layout>
              <BrowseGigs />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-applications"
        element={
          <ProtectedRoute allowedRoles={["freelancer"]}>
            <Layout>
              <MyApplications />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
