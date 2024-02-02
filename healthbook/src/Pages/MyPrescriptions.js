// pages/MyPrescriptions.js
import React, { useState, useEffect } from 'react';

const MyPrescriptions = () => {
    const prescriptions = [
        { id: 1, name: 'Prescription 1', date: '2024-02-03', doctor: 'Dr. Smith' },
        { id: 2, name: 'Prescription 2', date: '2024-02-10', doctor: 'Dr. Jones' },
        // more prescriptions...
      ];
      
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrescriptions, setFilteredPrescriptions] = useState(prescriptions || []);

  useEffect(() => {
    const results = prescriptions.filter(prescription => {
      const lowerCaseName = prescription.name?.toLowerCase() || '';
      const lowerCaseDisease = prescription.disease?.toLowerCase() || '';
      const lowerCaseDate = new Date(prescription.date)?.toLocaleDateString()?.toLowerCase() || '';
  
      return (
        lowerCaseName.includes(searchTerm.toLowerCase()) ||
        lowerCaseDisease.includes(searchTerm.toLowerCase()) ||
        lowerCaseDate.includes(searchTerm.toLowerCase())
      );
    });
  
    setFilteredPrescriptions(results);
  }, [searchTerm, prescriptions]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search by name, disease, or date..."
        className="border p-2 mb-4 w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrescriptions.map((prescription) => (
          <div key={prescription.id} className="border p-4 rounded-md transition duration-300 hover:shadow-lg">
            <h3 className="text-lg font-semibold mb-2">{prescription.name}</h3>
            <p className="text-gray-700 mb-2">{prescription.disease}</p>
            <p className="text-gray-600">{new Date(prescription.date).toLocaleDateString()}</p>
            {/* Add more prescription details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPrescriptions;
