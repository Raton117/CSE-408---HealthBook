import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const AddTreatment = () => {
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    patient_username: localStorage.getItem('username'),
    disease: '',
    doctor_name: '',
    speciality: '',
    designation: '',
    hospital_name: '',
    start_date: '',
    last_date: '',
    status: 'ongoing',
    cost: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/patients/add-treatment', formData);
      console.log(response.data);
      navigate("/mytreatments");
      // Reset form fields or navigate to another page upon successful submission
    } catch (error) {
      console.error('Error adding treatment:', error);
    }
    
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Treatment</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Disease</label>
            <input
              type="text"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
            <input
              type="text"
              name="doctor_name"
              value={formData.doctor_name}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Speciality</label>
            <input
              type="text"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
            <input
              type="text"
              name="hospital_name"
              value={formData.hospital_name}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Last Date</label>
            <input
              type="date"
              name="last_date"
              value={formData.last_date}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="ongoing">Ongoing</option>
              <option value="success">Success</option>
              <option value="failure">Failure</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Cost</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              // onChange={(e) => {
              //   // Convert the selected value to an integer before passing it to handleChange
              //   handleChange({...formData, cost: parseInt(e.target.value)});
              // }}
              className="border p-2 w-full"
            />
          </div>
          
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Add Treatment
        </button>
      </form>
    </div>
  );
};

export default AddTreatment;
