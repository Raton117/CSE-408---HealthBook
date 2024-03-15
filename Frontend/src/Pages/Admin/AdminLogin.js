import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminLoginPage = ({setIsAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    // e.preventDefault();
    doLogin();
  };
 
  const doLogin = async (e) => {
  

    const res = await axios.post("http://localhost:8000/admins/login", {
      username: username,
      password: pass,
    });
    const data = res.data;
   
    if (data.responseCode == 200) {
      localStorage.setItem("username", username);
      localStorage.setItem("userRole",'admin');
      localStorage.setItem("isAuthenticated", true);
      setIsAuthenticated(true)
      navigate("/");
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <div className="bg-white p-20 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Hi, Admin</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            id="password"
            name="password"
            className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
            placeholder="Enter your password"
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;