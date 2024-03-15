import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import doctor from "../Images/doctor.jpg";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [myRating, setMyRating] = useState(0);
  const [rated, isRated] = useState(false);

  const handleRatingSelection = async (rating) => {
    if (userRating === rating) {
      rating = 0;
    }
    console.log("handlerating selection" );
    console.log(rating);
    setUserRating(rating);
    // console.log(rating);
    submitRating(rating);
  };

  const submitRating = async (rating) => {
    console.log(rating);
    try {
      if (!rated && rating > 0) {
        const response = await axios.post(
          "http://localhost:8000/patients/add-rating",
          {
            patient: localStorage.getItem("username"),
            doctor: doctorData.username,
            rating: rating,
          }
        );
        console.log(response.data);
      } else if (rated && rating > 0) {
        const response = await axios.patch(
          "http://localhost:8000/patients/update-rating",
          {
            patient: localStorage.getItem("username"),
            doctor: doctorData.username,
            rating: rating,
          }
        );
        console.log(response.data);
      } else if (rated && rating === 0) {
        const response = await axios.delete(
          `http://localhost:8000/patients/delete-rating?patient=${localStorage.getItem(
            "username"
          )}&doctor=${doctorData.username}`
        );
        console.log(response.data);
      }
      setMyRating(rating);
      // Optionally, you can update the displayed rating immediately after successful submission
    } catch (error) {
      console.error("Error adding rating:", error);
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
        } else {
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

  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="bg-white shadow-lg rounded-lg mx-auto my-8 max-w-2xl">
    <div className="px-6 py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-24 w-24">
          <img className="h-24 w-24 rounded-full" src={doctor} alt="Doctor" />
        </div>
        <div className="ml-4 flex flex-wrap md:flex-nowrap w-full">
  <div className="w-full md:w-1/2 px-2">
    <div className="text-lg leading-6 font-medium text-gray-900">
      <div>{doctorData.name}</div>
      <div> {doctorData.designation}</div>
      <div>
        {doctorData.degree.map((deg, index) => (
          <span key={index}>{deg.degree}{index < doctorData.degree.length - 1 ? ", " : ""}</span>
        ))}
      </div>
      <div><strong>Email:</strong> {doctorData.email}</div>
      <div><strong>Phone:</strong> {doctorData.phoneNumber}</div>
    </div>
  </div>
  <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
    <div className="text-sm text-gray-500">
      <div><strong>Hospital Name:</strong> {doctorData.hospitalName}</div>
      <div><strong>Department:</strong> {doctorData.department}</div>
      <div><strong>Description:</strong> {doctorData.description}</div>
      {doctorData.consultency.map((consult, index) => (
        <div key={index} className="mt-2">
          <div><strong>Clinic Name:</strong> {consult.clinic_name}</div>
          <div><strong>Room:</strong> {consult.room}</div>
          <div><strong>Days:</strong> {consult.days.map(day => day.day).join(", ")}</div>
          <div><strong>Time:</strong> {consult.start_time} - {consult.end_time}</div>
        </div>
      ))}
    </div>
  </div>
</div>

      </div>

      <div className="px-6 py-4">
        <div className="flex flex-col justify-between items-center">
          <div>
            <strong>Rating:</strong>
            
            
            <span className="text-lg ml-2">{doctorData.rating}</span>
            <div>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={`cursor-pointer ${index < userRating ? "text-yellow-400" : "text-gray-300"}`}
                onClick={() => handleRatingSelection(index + 1)}
              />
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="border-t border-gray-200">
        <div className="flex justify-center -mb-px">
          {["about", "education"].map((tab) => (
            <div key={tab} className="w-1/3 px-4 py-3">
              <button
                onClick={() => setActiveTab(tab)}
                className={`${activeTab === tab ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"} border-b-2 -mb-px pb-3 block text-center font-medium`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Tab Content */}
      <div className="px-6 py-4">
        <p className="text-gray-600">
          {/* You would put your tab content here, conditional on activeTab */}
          {activeTab === "about" && (
            <div>
              {" "}
              <h4 className="text-lg font-semibold mb-2">
                About Dr. {doctorData.name}
              </h4>
              <p className="text-gray-600">
                {doctorData.name} is a leading Doctor based in New York, with
                over 15 years of experience in the field. He has dedicated his
                career to providing comprehensive care for a variety of ENT
                conditions, offering both medical and surgical solutions.
              </p>
              <p className="text-gray-600 mt-4">
                {doctorData.name} is known for his patient-centered approach to
                care, ensuring that each patient receives a thorough evaluation
                and a personalized treatment plan.He has achieved numerous
                accolades and awards for his work, and is a member of several
                professional organizations.
              </p>
            </div>
          )}
          {activeTab === "education" && (
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Education & Qualifications
              </h4>
              <ul className="list-disc pl-5 text-gray-600">
                <li>
                  {" "}
                  {doctorData.degree.map((deg) => deg.degree).join(", ")}
                </li>
              </ul>
            </div>
          )}
         </p>
        </div>

    </div>
    </div>
    
    
  );
};

export default DoctorProfile;
