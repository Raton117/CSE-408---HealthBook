import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import patientImage from "../Images/patient1.png";
import forms from "../Components/doctorfilter";
import Forms from "../Components/doctorfilter";
const ListofPatients = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [area, setArea] = useState("");

  const [query, setQuery] = useState();

  const loadDoctors = async () => {
    const url = "";

    const res = axios
      .get(url, { params: query })
      .then((response) => {
        setDoctors(response.data.doctors);
        console.log(response.data.doctors[0].consultency[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const doDoctorSearch = () => {
    setQuery({
      department: department,
      designation: designation,
      name: name,
      area: area,
    });
  };

  useEffect(() => {
    loadDoctors();
  }, [query]);

  return (
    <>
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-3xl font-bold text-center mt-10">My Doctors</h1>
      </div>
      <div className="flex flex-row ml-10 mt-10 ">
        <div className="bg-white h-auto w-3/4 mr-4 ">
          <div class="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10 my-10 ">
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <Link to="/doctorprofile">
                  <div
                    key={index}
                    class="bg-white shadow-md rounded-lg overflow-hidden"
                  >
                    <img
                      class="w-50 h-50 object-cover object-center"
                      src={patientImage}
                      alt="Card Image"
                    />
                    <div class="p-4">
                      <h2 class="font-bold text-xl mb-2">{doctor.name}</h2>
                      <p class="text-gray-700">{doctor.department}</p>
                      <p class="text-gray-700">{doctor.designation}</p>
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
          <form class="max-w-lg mx-auto">
            <div class="mb-4">
              <label
                for="name"
                class="block text-gray-700 text-sm font-bold mb-2"
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
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            
            <div class="mb-4">
              <label
                for="designation"
                class="block text-gray-700 text-sm font-bold mb-2"
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
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-4">
              <label
                for="password"
                class="block text-gray-700 text-sm font-bold mb-2"
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
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-4">
              <label
                for="confirmPassword"
                class="block text-gray-700 text-sm font-bold mb-2"
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
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="flex items-center justify-center">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                type="button" onClick={doDoctorSearch}
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

export default ListofPatients;
