import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DoctorProfile = () => {
  const navigate = useNavigate();

  const { username } = useParams();

  console.log(username);

  const [doctorData, setDoctorData] = useState({
    username: "",
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
    hospitalName: "",
    department: "",
    degree: [],
    designation: "",
    consultency: [],
    rating: null,
  });

  const [userRating, setUserRating] = useState(0);
  const [myRating, setMyRating] = useState(-1);
  const [rated, isRated] = useState(false);

  const handleRatingSelection = async(rating) => {
    if (userRating === rating) {
      rating = 0;
    }
    console.log(rating)
    setUserRating(rating);
    // console.log(rating);
    submitRating(rating);
  };

  const submitRating = async (rating) => {
    console.log(rating);
    try {
      if (!rated && rating > 0) {
        const response = await axios.post(
          'http://localhost:8000/patients/add-rating',
          {
            patient: localStorage.getItem('username'),
            doctor: doctorData.username,
            rating: rating,
          }
        );
        console.log(response.data);
      }

      else if (rated && rating > 0) {
        const response = await axios.patch(
          'http://localhost:8000/patients/update-rating',
          {
            patient: localStorage.getItem('username'),
            doctor: doctorData.username,
            rating: rating,
          }
        );
        console.log(response.data);
      }

      else if (rated && rating === 0) {
        console.log(doctorData)
        const response = await axios.delete(
          `http://localhost:8000/patients/delete-rating?patient=${localStorage.getItem('username')}&doctor=${doctorData.username}`
        );
        console.log(response.data);
      }
      setMyRating(rating);
      // Optionally, you can update the displayed rating immediately after successful submission
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileuser = localStorage.getItem("username");
        const requestingUsername = profileuser; //

        // const response = await axios.get(`http://localhost:8000/doctors/profile?username=${profileuser}&requesting_username=${requestingUsername}`);
        const response = await axios.get(
          `http://localhost:8000/doctors/profile?username=${username}&requesting_username=${requestingUsername}`
        );

        const response2 = await axios.get(
          `http://localhost:8000/doctors/rating?doctor=${username}`
        );

        const response3 = await axios.get(
          `http://localhost:8000/patients/get-rating?patient=${requestingUsername}&doctor=${username}`
        );

        if (response3.data.responseCode === 200) {
          setUserRating(response3.data.rating.rating);
          isRated(true);
        }
        else {
          setUserRating(0);
          isRated(false);
        }
        console.log(response.data);
        console.log(response2.data.rating);
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
          rating: response2.data.rating,
        });
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchData();
  }, [myRating]);

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
          <strong>Degree:</strong>{" "}
          {doctorData.degree.map((deg) => deg.degree).join(", ")}
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
                <strong>Days:</strong>{" "}
                {consult.days.map((day) => day.day).join(", ")}
              </div>
              <div>
                <strong>Time:</strong> {consult.start_time} - {consult.end_time}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <strong>Rating:</strong> {doctorData.rating}
        </div>
        {doctorData.username === localStorage.getItem("username") && (
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/updatedoctorprofile")} // Navigate to the update profile page
            >
              Update Profile
            </button>
          </div>
        )}
        
        {localStorage.getItem("userRole") === 'patient' && (
          <div className="mb-4">
            <div>
              {[1, 2, 3, 4, 5].map((rating) => (
                <span
                  key={rating}
                  className={`star text-xl cursor-pointer inline-block text-red ${userRating !== 0 && userRating >= rating ? 'text-brown' : ''}`}
                  onClick={() => handleRatingSelection(rating)}
                >
                  <FontAwesomeIcon icon={faStar} />
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate(-1)} // Navigate to the update profile page
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
