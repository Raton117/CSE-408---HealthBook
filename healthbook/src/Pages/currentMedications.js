import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentMedications = () => {
  const [medications, setMedications] = useState([]);
//   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
    //   try {
    //     console.log(localStorage.getItem('username'));
    //     const response = axios.get('http://localhost:8000/patients/current-medications', {
    //         params: {
    //           user: localStorage.getItem('username'),
    //           patient: localStorage.getItem('username')
    //         }
    //       })
    //     console.log(response);
    //     // setMedications(response.data.medications);
    //   } catch (error) {
    //     console.error('Error fetching current medications:', error);
    //   } finally {
    //     setLoading(false);
    //   }
        axios.get('http://localhost:8000/patients/current-medications', {
            params: {
                user: localStorage.getItem('username'),
                patient: localStorage.getItem('username')
            }
        })
        .then(response => {
            console.log(response.data.medicines[0]);
            setMedications(response.data.medicines);
        })
        .catch(error => {
            console.error('Error fetching medicines:', error);
        });
    };

    fetchMedications();
  }, []);

//   if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Current Medications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medications.map((medication, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium">{medication.medicine_name}</h3>
            <p>Duration: {medication.duration} days</p>
            <p>Meal Time: {medication.meal_time}</p>
            {/* Add more medication details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentMedications;
