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
    description: "",
    hospitalName: "",
    department: "",
    degree: [],
    designation: "",
    consultency: [],
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
          description: doctor.description,
          hospitalName: doctor.hospital_name,
          department: doctor.department,
          degree: doctor.degree,
          designation: doctor.designation,
          consultency: doctor.consultency,
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

  const handleDegreesChange = (e) => {
    const degreesArray = e.target.value.split(",").map((degree) => {
      const [degreeName, speciality = ""] = degree
        .trim()
        .split("|")
        .map((s) => s.trim());
      return { degree: degreeName, speciality };
    });
    setDoctorData({ ...doctorData, degree: degreesArray });
  };

  const degreesString = doctorData.degree
    .map(
      (degreeObj) =>
        `${degreeObj.degree}${
          degreeObj.speciality ? " | " + degreeObj.speciality : ""
        }`
    )
    .join(", ");

  const handleConsultancyChange = (e, index, field) => {
    const updatedConsultancy = [...doctorData.consultency];

    if (field === "days") {
      const daysArray = e.target.value
        .split(",")
        .map((day) => ({ day: day.trim() }));
      updatedConsultancy[index][field] = daysArray;
    } else {
      updatedConsultancy[index][field] = e.target.value;
    }

    setDoctorData({ ...doctorData, consultency: updatedConsultancy });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        // Changed from put to patch
        `http://localhost:8000/doctor/profile-update/?doctor-username=${profileuser}`,
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
      <div className="flex flex-col col-span-2">
        <label htmlFor="degree">Degrees and Specialties:</label>
        <input
          id="degree"
          type="text"
          name="degree"
          value={degreesString}
          onChange={handleDegreesChange}
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Format: Degree | Specialty, Degree | Specialty"
        />
      </div>
      <div className="flex flex-col col-span-2">
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
      {doctorData.consultency.map((consult, index) => (
        <div className="flex flex-col col-span-2" key={index}>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor={`clinic_name-${index}`}>Clinic Name:</label>
              <input
                id={`clinic_name-${index}`}
                type="text"
                name={`clinic_name-${index}`}
                value={consult.clinic_name}
                onChange={(e) => handleConsultancyChange(e, index, "clinic_name")}
                className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
                placeholder="Enter clinic name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`days-${index}`}>Days:</label>
              <input
                id={`days-${index}`}
                type="text"
                name={`days-${index}`}
                value={consult.days.map((day) => day.day).join(", ")}
                onChange={(e) => handleConsultancyChange(e, index, "days")}
                className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
                placeholder="Enter days separated by commas"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`start_time-${index}`}>Start Time:</label>
              <input
                id={`start_time-${index}`}
                type="text"
                name={`start_time-${index}`}
                value={consult.start_time}
                onChange={(e) => handleConsultancyChange(e, index, "start_time")}
                className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
                placeholder="Enter start time"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`end_time-${index}`}>End Time:</label>
              <input
                id={`end_time-${index}`}
                type="text"
                name={`end_time-${index}`}
                value={consult.end_time}
                onChange={(e) => handleConsultancyChange(e, index, "end_time")}
                className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
                placeholder="Enter end time"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor={`room-${index}`}>Room:</label>
              <input
                id={`room-${index}`}
                type="text"
                name={`room-${index}`}
                value={consult.room}
                onChange={(e) => handleConsultancyChange(e, index, "room")}
                className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
                placeholder="Enter room number"
              />
            </div>
          </div>
        </div>
      ))}
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
