import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDegreeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    degree: "",
    speciality: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      username: localStorage.getItem("username"), // Assuming username is stored in localStorage
      degree: formData.degree,
      speciality: formData.speciality,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/doctors/add-degree",
        postData
      );
      console.log(response.data);
      alert("Degree Added successfully.");
      navigate("/"); // Redirect to the desired page after successful submission
    } catch (error) {
      console.error("Error posting degree data:", error);
      alert("Failed to add degree.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent pt-20">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-xl"> {/* Adjusted max width to 'max-w-xl' for a smaller form */}
        <h2 className="text-2xl font-bold mb-4 text-center">Add Degree</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="col-span-2 flex flex-col">
            <label htmlFor="degree">Degree:</label>
            <input
              id="degree"
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter degree"
            />
          </div>
          <div className="col-span-2 flex flex-col">
            <label htmlFor="speciality">Speciality:</label>
            <input
              id="speciality"
              type="text"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
              placeholder="Enter speciality"
            />
          </div>
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-64 py-2 px-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 mt-4" 
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default AddDegreeForm;
