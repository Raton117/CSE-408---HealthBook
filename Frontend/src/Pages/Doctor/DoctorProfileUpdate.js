import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  // Assuming you fetch the user's ID from somewhere, like context or a global state.
  const userId = "user123"; // Example user ID

  const [doctorData, setDoctorData] = useState({
    username: "",
    name: "",
    email: "",
    phoneNumber: "",
    hospitalName: "",
    department: "",
    designation: "",
    password: ""
    
  });

  const navigate = useNavigate();
  const profileuser = localStorage.getItem("username");
  const requestingUsername = profileuser;
  useEffect(() => {
    // Fetch the existing user data
    const fetchData = async () => {
      try {
        //

        const response = await axios.get(
          `http://localhost:8000/doctors/profile?username=${profileuser}&requesting_username=${requestingUsername}`
        );
        const { doctor } = response.data;
        console.log("get doctor data");
        console.log(response.data);
        setDoctorData({
          username: doctor.username,
          name: doctor.name,
          email: doctor.email,
          phoneNumber: doctor.phone_number,
          hospitalName: doctor.hospital_name,
          department: doctor.department,
          designation: doctor.designation,
          password: doctor.password

        
        });
        console.log(doctorData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        // Changed from put to patch
        `http://localhost:8000/doctors/profile-update`,
        doctorData
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
    <div className="flex items-center justify-center min-h-screen bg-transparent pt-20">
  <div className="bg-white p-10 rounded shadow-md w-full max-w-4xl">
    <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
      <div className="flex flex-col col-span-2 sm:col-span-1">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={doctorData.username}
          onChange={handleChange}
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Enter your username"
        />
      </div>
      <div className="flex flex-col col-span-2 sm:col-span-1">
        <label htmlFor="name">Full Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={doctorData.name}
          onChange={handleChange}
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Enter your name"
        />
      </div>
      <div className="flex flex-col col-span-2 sm:col-span-1">
        <label htmlFor="hospitalName">Hospital Name:</label>
        <input
          id="hospitalName"
          type="text"
          name="hospitalName"
          value={doctorData.hospitalName}
          onChange={handleChange}
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Enter hospital name"
        />
      </div>
      <div className="flex flex-col col-span-2 sm:col-span-1">
        <label htmlFor="department">Department:</label>
        <input
          id="department"
          type="text"
          name="department"
          value={doctorData.department}
          onChange={handleChange}
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Enter department"
        />
      </div>
      <div className="flex flex-col col-span-2 sm:col-span-1">
        <label htmlFor="designation">Designation:</label>
        <input
          id="designation"
          type="text"
          name="designation"
          value={doctorData.designation}
          onChange={handleChange}
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Enter designation"
        />
      </div>
      <div className="flex flex-col col-span-2 sm:col-span-1">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={doctorData.email}
          onChange={handleChange}
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Enter email"
        />
      </div>
     
      <div className="flex flex-col col-span-2 sm:col-span-1">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          id="phoneNumber"
          type="text"
          name="phoneNumber"
          value={doctorData.phoneNumber}
          onChange={handleChange}
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Enter your phone number"
        />
        </div>

<div className="flex flex-col col-span-2 sm:col-span-1">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="text"
          name="password"
          value={doctorData.password}
          onChange={handleChange}
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Enter your phone number"
        />
        </div>
      
      
    

        
      
      <div className="col-span-2">
        <button
          type="submit"
          className="w-full py-2 px-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 mt-4 onClick={handleSubmit}"
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
