import React,{useEffect,useState} from "react";
import axios from "axios";

const Request = () => {
  const [doctorname, setDoctorname] = useState("");
  const [doctors, setDoctors] = useState([" "]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await axios.get(`http://localhost:8000/patients/get-access-requests?username=${username}`);
        
      
        console.log(response.data);
        console.log(response.data.requests);
        setDoctors(response.data.requests);
        console.log(doctors);
       
        
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
  
    fetchData();
  }, []);


  const handleAccess= async(e) => {
      e.preventDefault()
      const res = await axios.patch(`http://localhost:8000/patients/response-access`, // Updated endpoint
      {
        doctor_username: doctors[0].doctor_username,
        patient_username: localStorage.getItem("username"),
        status: "Accepted"
      })
      console.log(res.data)
      console.log("access")
  }

  const handleDeny= async(e) => {
    e.preventDefault()
    const res = await axios.patch(`http://localhost:8000/patients/response-access`, // Updated endpoint
    {
      doctor_username: doctors[0].doctor_username,
      patient_username:  localStorage.getItem("username"),
      status: "Rejected"
    })
    console.log(res.data)
    console.log("deny")

  }
  
  return (
    <>
     <div className="flex justify-center min-h-screen bg-gray-100">
  <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-sm h-auto w-full">
    <div className="text-center font-bold text-xl mb-4">Requests</div>
    {doctors && doctors.length > 0 ? ( // Check if the doctors array exists and has at least one entry
      <div className="border-t border-gray-200 pt-4">
        <p className="text-gray-700 text-base mb-4">
          Doctor {doctors[0].doctor_username} wants access to your prescriptions and current medications
        </p>
        <div className="flex justify-between">
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline" onClick={handleAccess}>
            Grant Access
          </button>
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline" onClick={handleDeny}>
            Deny Access
          </button>
        </div>
      </div>
    ) : ( // If there are no doctors, render an alternative content or nothing
      <div className="text-gray-700 text-base mb-4">No requests at this time.</div>
    )}
  </div>
</div>

    </>
  );
};

export default Request;
