import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestPatient = () => {
  const [name, setName] = useState("");
  const [query, setQuery] = useState({});
  const [patients, setPatients] = useState([]);
  
  const loadPatients = async () => {
    const url = "http://localhost:8000/doctors/patient";

    axios
      .get(url, { params: query })
      .then((response) => {
        console.log(response.data);
        setPatients(response.data.patient);
      })
      .catch((error) => {
        console.error("This is an error", error);
      });
  };

  const handleSearch = () => {
    setQuery({ username: name });
  };

  useEffect(() => {
    if (Object.keys(query).length !== 0) {
      loadPatients();
    }
  }, [query]);

  const handleRequest = async() => {
    console.log(patients.username+" clicled");
    console.log(localStorage.getItem("username"));

    try {
      const response = await axios.post("http://localhost:8000/doctors/request-data", {
        patient_username: patients.username,
        doctor_username: localStorage.getItem("username"),
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error making request:", error);
     
    }
  };
  

  return (
    <>
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-3xl font-bold text-center mt-10">Patients</h1>
      </div>
      <div className="flex flex-col m-4">
        {/* Form Part */}
        <div className=" bg-white rounded-lg shadow-lg p-8 mr-4">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                name="patient"
                id="patient"
                placeholder="Enter Patient's Name"
                value={name} 
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Request Part */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center font-bold text-xl mb-4">Requests</div>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-700 text-base mb-4">
              Would you like to send {patients.username} a request to access their health records?
            </p>
            <div className="flex justify-between">
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline" onClick={handleRequest}>
               Request Access
              </button>
              <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline">
                Not Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestPatient;