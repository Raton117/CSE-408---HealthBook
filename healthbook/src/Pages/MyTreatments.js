import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Treatment = () => {
  const [treatments, setTreatments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTreatments = () => {
      axios.get('http://localhost:8000/patients/treatments', {
        params: {
          user: localStorage.getItem('username'),
          patient: localStorage.getItem('username')
        }
      })
        .then(response => {
          console.log(response);
          setTreatments(response.data.treatment);
        })
        .catch(error => {
          console.error('Error fetching treatments:', error);
        });
    };

    fetchTreatments();
  }, []);

  let filteredTreatments;
  if (!treatments) {
    filteredTreatments = "No treatments found";
    console.log(filteredTreatments)
  } else {
    filteredTreatments = treatments.filter(treatment => {
      return treatment.id.toString().includes(searchTerm.toLowerCase()) ||
        treatment.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
        treatment.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(treatment.start_date).toLocaleDateString().includes(searchTerm);
    });
  }

  const handleShare = (treatmentId) => {
    // Logic to handle sharing treatment
    alert(`Share treatment ${treatmentId}`);
  };

  const handleChangeStatus = (treatmentId, newStatus) => {
    // Logic to change treatment status
    alert(`Change treatment ${treatmentId} status to ${newStatus}`);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID, disease, doctor, or start date..."
          className="border p-2 w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTreatments === "No treatments found" | filteredTreatments.length === 0 ? (
          <p>No treatments found</p>
        ) : (
          filteredTreatments.map((treatment) => (
            <div key={treatment.id} className="border p-4 rounded shadow relative">
              <Link key={treatment.id} to={`/myprescriptions/${treatment.id}`}>
                <h3 className="text-lg font-semibold">Treatment ID: {treatment.id}</h3>
                <p>Disease: {treatment.disease}</p>
                <p>Doctor: {treatment.doctor_name}</p>
                <p>Start Date: {new Date(treatment.start_date).toLocaleDateString()}</p>
              </Link>
              <div className="absolute right-4 bottom-4">
                <button onClick={() => handleShare(treatment.id)} className="bg-blue-500 text-white rounded px-3 py-1 mr-2">
                  Share
                </button>
                <select onChange={(e) => handleChangeStatus(treatment.id, e.target.value)} defaultValue={treatment.status}>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
      <Link to="/addtreatment" className="fixed right-4 bottom-4">
        <button className="bg-blue-500 text-white rounded-full p-4">
          +
        </button>
      </Link>
    </div>
  );
};

export default Treatment;
