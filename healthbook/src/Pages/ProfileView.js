import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileViewPage = () => {
 
  const navigate = useNavigate();

 
    const [userData, setUserData] = useState({
      username: '',
      name: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      area: '',
      password: '',
    });
  
    useEffect(() => {
      // Fetch the user's details
      const fetchData = async () => {
        try {
          const profileuser = localStorage.getItem('username');
          const requestingUsername =profileuser; // 
  
          const response = await axios.get(`http://localhost:8000/patients/profile?username=${profileuser}&requesting_username=${requestingUsername}`);
          console.log(response.data);
          const { patient } = response.data;
          const { username, password, name, email, phone_number, dob, area } = patient;
          
          //console.log(username);
         // console.log(name);
          
          setUserData({
            username: username,
            name: name,
            email: email,
            phoneNumber: phone_number,
            dateOfBirth: dob,
            area: area,
            password: password,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
      <div className="bg-white p-20 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile Details</h2>
        <div className="mb-4">
          <strong>Username:</strong> {userData.username}
        </div>
        <div className="mb-4">
          <strong>Full Name:</strong> {userData.name}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {userData.email}
        </div>
        <div className="mb-4">
          <strong>Password:</strong> {userData.password}
        </div>
        <div className="mb-4">
          <strong>Phone Number:</strong> {userData.phoneNumber}
        </div>
        <div className="mb-4">
          <strong>Date of Birth:</strong> {userData.dateOfBirth}
        </div>
        <div className="mb-4">
          <strong>Area:</strong> {userData.area}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate('/updateprofile')} // Navigate to the update profile page
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewPage;
