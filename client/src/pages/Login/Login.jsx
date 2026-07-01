import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault(); 

    try {

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Success:", response.data);

      // Store JWT
      localStorage.setItem("token", response.data.token);

      // Clear the form
      setEmail("");
      setPassword("");

      // Redirect
      navigate("/dashboard");

    } catch (error) {

      console.log("Login Failed:", error.response?.data || error.message);

    }  
  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;