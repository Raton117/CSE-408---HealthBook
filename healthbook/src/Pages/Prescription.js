import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PrescriptionDetail = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const userRole = localStorage.getItem('userRole');

  // useEffect(() => {
  //   const fetchPrescription = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8000/patients/get-prescription`, {
  //         params: { id: id, username: localStorage.getItem('username') }
  //       });
  //       setPrescription(response.data.prescription);
  //     } catch (error) {
  //       console.error('Error fetching prescription details:', error);
  //     }
  //   };

  //   fetchPrescription();
  // }, [id]);
  
  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        let response;
        if (userRole === 'doctor') {
          response = await axios.get(`http://localhost:8000/doctors/get-prescription`, {
            params: { id: id, username: localStorage.getItem('username') }
          });
        } else {
          response = await axios.get(`http://localhost:8000/patients/get-prescription`, {
            params: { id: id, username: localStorage.getItem('username') }
          });
        }
        setPrescription(response.data.prescription);
      } catch (error) {
        console.error('Error fetching prescription details:', error);
      }
    };

    fetchPrescription();
  }, [id, userRole]);

  if (!prescription) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-3/4 pr-8">
        <h1 className="text-xl font-bold mb-4">Prescription Details for {prescription.patient_name}</h1>
        <div className="border rounded-md p-4 mb-4">
          <p><strong>Doctor:</strong> {prescription.doctor_name}</p>
          <p><strong>Date:</strong> {prescription.date}</p>
          <p><strong>Address:</strong> {prescription.address}</p>
          <p><strong>Age:</strong> {prescription.age}</p>
          <p><strong>Weight:</strong> {prescription.weight} kg</p>
          <p><strong>Blood Pressure:</strong> {prescription.bp_low}/{prescription.bp_high}</p>
          <p><strong>Notes:</strong> {prescription.notes}</p>
        </div>

        <div className="border rounded-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Symptoms</h2>
          <ul className="list-disc pl-6">
            {prescription.symptoms.map((symptom, index) => (
              <li key={index}>{symptom.symptom}</li>
            ))}
          </ul>
        </div>

        <div className="border rounded-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Tests</h2>
          <ul className="list-disc pl-6">
            {prescription.tests.map((test, index) => (
              <li key={index}>{test.test_name}</li>
            ))}
          </ul>
        </div>

        <div className="border rounded-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Diagnoses</h2>
          <ul className="list-disc pl-6">
            {prescription.diagnoses.map((diagnosis, index) => (
              <li key={index}>{diagnosis.disease}</li>
            ))}
          </ul>
        </div>

        <div className="border rounded-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Advices</h2>
          <ul className="list-disc pl-6">
            {prescription.advices.map((advice, index) => (
              <li key={index}>{advice.advice}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-1/4">
        <div className="border rounded-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Medications</h2>
          <div className="space-y-4">
            {prescription.medicines.map((medication, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">{medication.medicine_name}</span>
                </div>
                <p className="text-gray-600">{medication.duration} days</p>
                <div className="flex space-x-2 mt-2">
                  {medication.meal_time === 'before' && <span className="text-green-500">Before Meal</span>}
                  {medication.meal_time === 'after' && <span className="text-red-500">After Meal</span>}
                </div>
                <div className="flex space-x-2 mt-2">
                  {medication.breakfast && <span className="text-blue-500">Breakfast</span>}
                  {medication.lunch && <span className="text-blue-500">Lunch</span>}
                  {medication.dinner && <span className="text-blue-500">Dinner</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link to={`/edit-prescription/${id}`} className="bg-blue-500 text-white py-2 px-4 rounded-md fixed bottom-4 right-4">Edit Prescription</Link>
      </div>
    </div>
  );
};

export default PrescriptionDetail;
