import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import useAuth from "../../hooks/useAuth";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log("Register Success:", response.data);

      login(response.data.user, response.data.token);

      setName("");
      setEmail("");
      setPassword("");

      navigate("/dashboard");

    } catch (error) {

      console.log("Register Failed:", error.response?.data || error.message);

    }  
  };

  return (
    <div>

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input 
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />  

        <br /><br /> 

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
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;