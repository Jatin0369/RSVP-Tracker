import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use VITE_BACKEND_URL for the API base URL
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, 
        { email, password }
      );
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token); // Store token
      navigate("/home"); // Redirect to create event page
    } catch (error) {
      console.error(error);
      alert("Invalid credentials. Please try again."); // Show an error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-300 to-blue-200 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 ]">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-3 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to='/register' className="text-green-500 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
