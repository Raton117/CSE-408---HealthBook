import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileViewPage = () => {
 
  const navigate = useNavigate();

 
  const [doctorData, setDoctorData] = useState({
    username: '',
    name: '',
    email: '',
    phoneNumber: '',
    description: '',
    hospitalName: '',
    department: '',
    degree: [],
    designation: '',
    consultency: [],
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileuser = localStorage.getItem('username');
          const requestingUsername =profileuser; // 
  
          const response = await axios.get(`http://localhost:8000/doctors/profile?username=${profileuser}&requesting_username=${requestingUsername}`);
          console.log(response.data);
        const { doctor } = response.data;
        setDoctorData({
          username: doctor.username,
          name: doctor.name,
          email: doctor.email,
          phoneNumber: doctor.phone_number,
          description: doctor.description,
          hospitalName: doctor.hospital_name,
          department: doctor.department,
          degree: doctor.degree,
          designation: doctor.designation,
          consultency: doctor.consultency,
        });
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
    <div className="bg-white p-20 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Doctor Profile</h2>
      <div className="mb-4">
        <strong>Username:</strong> {doctorData.username}
      </div>
      <div className="mb-4">
        <strong>Full Name:</strong> {doctorData.name}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {doctorData.email}
      </div>
      <div className="mb-4">
        <strong>Phone Number:</strong> {doctorData.phoneNumber}
      </div>
      <div className="mb-4">
        <strong>Description:</strong> {doctorData.description}
      </div>
      <div className="mb-4">
        <strong>Hospital Name:</strong> {doctorData.hospitalName}
      </div>
      <div className="mb-4">
        <strong>Department:</strong> {doctorData.department}
      </div>
      <div className="mb-4">
        <strong>Degree:</strong> {doctorData.degree.map((deg) => deg.degree).join(', ')}
      </div>
      <div className="mb-4">
        <strong>Designation:</strong> {doctorData.designation}
      </div>
      <div className="mb-4">
        <strong>Consultancy:</strong>
        {doctorData.consultency.map((consult, index) => (
          <div key={index}>
            <div>
              <strong>Clinic Name:</strong> {consult.clinic_name}
            </div>
            <div>
              <strong>Room:</strong> {consult.room}
            </div>
            <div>
              <strong>Days:</strong> {consult.days.map(day => day.day).join(', ')}
            </div>
            <div>
              <strong>Time:</strong> {consult.start_time} - {consult.end_time}
            </div>
            <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate('/updatedoctorprofile')} // Navigate to the update profile page
          >
            Update Profile
          </button>
        </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default ProfileViewPage;
