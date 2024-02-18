import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/patients/signup', {
        username: username,
        password: password,
        password_confirmation: confirmPassword,
        name: name,
        email: email,
        phone_number: phoneNumber,
        dob: dateOfBirth,
      });
      console.log(response.data);
      console.log(response.data.responseCode)
      if (response.data.responseCode == 201) {
        navigate('/login');
      } else {
        // unsuccessful signup, e.g., username already taken, etc.
        alert("Signup was unsuccessful. Please try again.");
      }
    } catch (error) {
      //  error, e.g., network error, server error, etc.
      console.error("There was an error during signup:", error);
      alert("An error occurred during signup. Please try again later.");
    }
  
  };

  return (
    // Adjusted classes for centering with margin and a max-width
    <div className="flex items-center justify-center h-screen bg-transparent">
      <div className="bg-white pt-10 pr-20 pl-20 pb-20 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <div className="mb-4">
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
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          />
        </div>
        

        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            required
            className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          />
        </div>
        <div className="mb-6">
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder="Date of Birth"
            required
            className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Signup
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate('/doctorsignup')}
          >
            Signup As a Doctor
          </button>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;
