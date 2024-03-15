import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import doctorimage from "../Images/doctor.jpg";
import forms from "../Components/doctorfilter";
import Forms from "../Components/doctorfilter";
const MyDoctors = () => {
 
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [area, setArea] = useState("");

  // Notice we don't initialize query state here because it's constructed right before making the API call

  const loadDoctors = async () => {
    // Constructing the query object dynamically based on the current state
    let queryParams = {
      patient: localStorage.getItem("username"), // Assuming the username is stored in localStorage
    };

    // Adding optional parameters only if they exist
    if (department) queryParams.department = department;
    if (designation) queryParams.designation = designation;
    if (name) queryParams.name = name;
    if (area) queryParams.area = area;

    const url = "http://localhost:8000/patients/my-doctors";

    try {
      const response = await axios.get(url, { params: queryParams });
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // We call loadDoctors directly within useEffect
    // This will run on component mount and whenever the component's state changes
    loadDoctors();
  }, [department, designation, name, area]);

  return (
    <>
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-3xl font-bold text-center mt-10">My Doctors</h1>
      </div>
      <div className="flex flex-row ml-10 mt-10 ">
        <div className="bg-white h-auto w-3/4 mr-4 ">
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10 my-10 ">
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <Link to={`/doctor/${doctor.username}`}>
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden"
                  >
                    <img
                      className="w-50 h-50 object-cover object-center"
                      src={doctorimage}
                      alt="Card Image"
                    />
                    <div className="p-4">
                      <h2 className="font-bold text-xl mb-2">{doctor.name}</h2>
                      <p className="text-gray-700">{doctor.department}</p>
                      <p className="text-gray-700">{doctor.designation}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>NO doctor available</p>
            )}
          </div>
        </div>
        <div className=" h-400 w-64">
          <form className="max-w-lg mx-auto">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
               name="doctorName"
               id="doctorName"
               placeholder="Enter Doctor's Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               type="text"
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            
            <div className="mb-4">
              <label
                htmlFor="designation"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Designation
              </label>
              <input
                name="designation"
                id="designation"
                placeholder="Designation of Doctor"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Department
              </label>
              <input
                name="department"
                id="department"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Area
              </label>
              <input
               name="area"
               id="area"
               placeholder="Doctor's Chamber's Area"
               value={area}
               onChange={(e) => setArea(e.target.value)}
               type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                type="button" onClick={loadDoctors}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MyDoctors;
