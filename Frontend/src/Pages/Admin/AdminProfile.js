import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileViewPage = () => {
 
  const navigate = useNavigate();

 
    const [userData, setUserData] = useState({
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
    });
  
    useEffect(() => {
      // Fetch the user's details
      const fetchData = async () => {
        try {
          const profileuser = localStorage.getItem('username');
          const requestingUsername =profileuser; // 
  
          const response = await axios.get(`http://localhost:8000/admins/profile?username=${profileuser}`);
          console.log(response.data);
          const { admin } = response.data;
          const { username, password, email, phone_number} = admin;
          
          //console.log(username);
         // console.log(name);
          
          setUserData({
            username: username,
            email: email,
            phoneNumber: phone_number,
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
          <strong>Email:</strong> {userData.email}
        </div>
        <div className="mb-4">
          <strong>Phone Number:</strong> {userData.phoneNumber}
        </div>
      </div>
    </div>
  );
};

export default ProfileViewPage;