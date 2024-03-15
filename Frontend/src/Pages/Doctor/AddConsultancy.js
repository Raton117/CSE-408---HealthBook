import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddConsultancyForm = () => {
  // State management for form fields
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clinic_name: "",
    days: "",
    start_time: "",
    end_time: "",
    room: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      doctor_username: localStorage.getItem("username"),
      clinic_name: formData.clinic_name,
      room: formData.room,
      start_time: formData.start_time,
      end_time: formData.end_time,
      days: formData.days.split(',').map(day => day.trim().toLowerCase()),
 // Assuming days are submitted as comma-separated values and need to be transformed into an array
    };

    try {
      const response = await axios.post('http://localhost:8000/doctors/add-consultency', postData);
      console.log(response.data);
      alert("Consultancy Added successfully.");
      navigate('/')

      // Handle further actions after successful posting like showing a success message, redirecting, etc.
    } catch (error) {
      console.error('Error posting consultancy data:', error);
      // Handle error scenarios, e.g., showing error messages
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent pt-20">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Consultancy</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Form fields */}
          <label> Clinic Name</label>
          <input
            type="text"
            name="clinic_name"
            value={formData.clinic_name}
            onChange={handleChange}
            className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
            placeholder="Enter clinic name"
          />
          <label> Days</label>
          <input
            type="text"
            name="days"
            value={formData.days}
            onChange={handleChange}
            className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
            placeholder="Enter days separated by commas"
          />
          <label> Start Time</label>
          <input
            type="text"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
            placeholder="Enter start time"
          />
          <label> End Time</label>
          <input 
            type="text"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
            placeholder="Enter end time"
          />
          <label> Room No</label>
          <input
            type="text"
            name="room"
            value={formData.room}
            onChange={handleChange}
            className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
            placeholder="Enter room no"
          />







          {/* Repeat for other inputs, ensuring to change the `name` and `value` accordingly */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 mt-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddConsultancyForm;
