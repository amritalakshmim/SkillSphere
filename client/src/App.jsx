import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Gigs from "./pages/Gigs/Gigs";
import CreateGig from "./pages/Gigs/CreateGig";
import EditGig from "./pages/Gigs/EditGig";

import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";

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
        path="/gigs"
        element={
          <ProtectedRoute>
            <Layout>
              <Gigs />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-gig"
        element={
          <ProtectedRoute>
            <Layout>
              <CreateGig />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-gig/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <EditGig />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
