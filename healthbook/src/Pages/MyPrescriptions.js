// MyPrescriptions.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPrescriptions = () => {
      axios.get('http://localhost:8000/patients/get-list-of-prescriptions', {
        params: {
          user: localStorage.getItem('username'),
          patient: localStorage.getItem('username')
        }
      })
      .then(response => {
        console.log(response);
        setPrescriptions(response.data.prescriptions);
      })
      .catch(error => {
        console.error('Error fetching prescriptions:', error);
      });
    };

    fetchPrescriptions();
  }, []);

  const filteredPrescriptions = prescriptions.filter(prescription => {
    return prescription.id.toString().includes(searchTerm.toLowerCase()) ||
           prescription.diagnoses.some(d => d.disease.toLowerCase().includes(searchTerm.toLowerCase())) ||
           prescription.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           new Date(prescription.date).toLocaleDateString().includes(searchTerm);
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID, disease, doctor, or date..."
          className="border p-2 w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrescriptions.map((prescription) => (
          <Link key={prescription.id} to={`/prescription/${prescription.id}`} className="border p-4 rounded shadow" >
          {/* Display prescription details */}
             <h3 className="text-lg font-semibold">Prescription ID: {prescription.id}</h3>
             <p>Disease: {prescription.diagnoses.map(d => d.disease).join(', ')}</p>
             <p>Doctor: {prescription.doctor_name}</p>
             <p>Date: {new Date(prescription.date).toLocaleDateString()}</p>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default MyPrescriptions;
