import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Treatment = () => {
  const [treatments, setTreatments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const doctorUsername = localStorage.getItem('username');
        let queryParams = { doctor: doctorUsername };
        if (searchTerm) {
          queryParams.q = searchTerm;
        }
        const response = await axios.get('http://localhost:8000/doctors/patient-treatments', {
          params: queryParams
        });
        setTreatments(response.data);
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };

    fetchTreatments();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by patient username, treatment ID, disease, or start date..."
          className="border p-2 w-full"
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {treatments.length === 0 ? (
          <p>No treatments found</p>
        ) : (
          treatments.map((treatment) => (
            <div key={treatment.id} className="border p-4 rounded shadow relative">
              <Link key={treatment.id} to={`/doctormyprescriptions/${treatment.id}`}>
                <h3 className="text-lg font-semibold">Treatment ID: {treatment.id}</h3>
                <p>Disease: {treatment.disease}</p>
                <p>Start Date: {new Date(treatment.start_date).toLocaleDateString()}</p>
                <p>Cost: {treatment.cost}</p>
              </Link>
            </div>
          ))
        )}
      </div>
      <Link to="/doctoraddtreatment" className="fixed bottom-4 right-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Treatment
        </button>
      </Link>
    </div>
  );
};

export default Treatment;
