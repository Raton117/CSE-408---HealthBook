import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  // Assuming you fetch the user's ID from somewhere, like context or a global state.
  const userId = "user123"; // Example user ID

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        const profileuser = localStorage.getItem("username");
        const requestingUsername = profileuser; //

        const response = await axios.get(
          `http://localhost:8000/patients/profile?username=${profileuser}&requesting_username=${requestingUsername}`
        );
        console.log(response.data);
        const { patient } = response.data;
        const { username, password, name, email, phone_number, dob, area } =
          patient;
        setUsername(username);
        setName(name);
        setEmail(email);
        setPhoneNumber(phone_number);
        setDateOfBirth(dob);
        setArea(area);
        setPassword(password);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch( // Changed from put to patch
      `http://localhost:8000/patients/update`, // Updated endpoint
      
        {
          username: username,
          name: name,
          email: email,
          phone_number: phoneNumber,
          dob: dateOfBirth,
          area: area,
          password: password,
        }
      );
     
      console.log(response.data);
      alert("Profile updated successfully.");
      navigate("/profileviewpage"); // Redirect to the profile page or wherever appropriate
    } catch (error) {
      console.error("There was an error updating the profile:", error);
      alert("An error occurred during profile update. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <div className="bg-white p-20 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
        <form >
          <div className="mb-4 flex items-center">
            <label className="w-1/3" htmlFor="username">
              Username:
            </label>
            <input
              id="username"
              type="text"
              className="w-2/3 px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3" htmlFor="fullname">
              Full Name:
            </label>
            <input
              id="fullname"
              type="text"
              className="w-2/3 px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-2/3 px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3" htmlFor="username">
              Password:
            </label>
            <input
              id="password"
              type="text"
              className="w-2/3 px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3" htmlFor="phone">
              Phone Number:
            </label>
            <input
              id="phone"
              type="text"
              className="w-2/3 px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3" htmlFor="dob">
              Date of Birth:
            </label>
            <input
              id="dob"
              type="date"
              className="w-2/3 px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3" htmlFor="area">
              Area:
            </label>
            <input
              id="area"
              type="text"
              className="w-2/3 px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter your area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-700" onClick={handleSubmit}
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
