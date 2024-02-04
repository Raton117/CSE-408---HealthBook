import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfilePage = () => {
  // Assuming you fetch the user's ID from somewhere, like context or a global state.
  const userId = 'user123'; // Example user ID
  
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [area, setArea] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing user data
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/patients/${userId}`);
        const { username, name, email, phone_number, dob,area } = response.data;
        setUsername(username);
        setName(name);
        setEmail(email);
        setPhoneNumber(phone_number);
        setDateOfBirth(dob);
        setArea(area);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/patients/${userId}`, {
        username: username,
        name: name,
        email: email,
        phone_number: phoneNumber,
        dob: dateOfBirth,
        area: area,
      });
      console.log(response.data);
      alert("Profile updated successfully.");
      navigate('/profile'); // Redirect to the profile page or wherever appropriate
    } catch (error) {
      console.error("There was an error updating the profile:", error);
      alert("An error occurred during profile update. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <div className="bg-white p-20 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter your area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
