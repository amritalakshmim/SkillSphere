import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [loading, setLoading] = useState(true);

  const login = (userData, userToken) => {
    localStorage.setItem("token", userToken);

    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);

    navigate("/login");
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await API.get("/auth/me");

        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to load user", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

export default AuthContext;
