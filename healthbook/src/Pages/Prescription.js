import React, { useState } from 'react';

const PrescriptionDetails = () => {
  // Assuming 'finished' is a boolean value in your prescription object
  const [finished, setFinished] = useState(prescription.finished || false);
  const prescriptionId = '1';

const prescription = {
  id: prescriptionId,
  name: 'Sample Prescription',
  disease: 'Common Cold',
  date: '2022-02-10',
  // Other prescription details...
};

  const toggleFinished = () => {
    setFinished(!finished);
    // Here, you might want to update the state in your backend/database as well
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{prescription.title}</h2>
        <p><strong>Date:</strong> {prescription.date}</p>
        <p><strong>Doctor:</strong> {prescription.doctor}</p>
        <p className="mb-4"><strong>Description:</strong> {prescription.description}</p>

        <label htmlFor="toggleFinished" className="flex items-center cursor-pointer">
          <div className="relative">
            <input id="toggleFinished" type="checkbox" className="sr-only" checked={finished} onChange={toggleFinished} />
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${finished ? 'transform translate-x-full bg-green-500' : 'bg-gray-400'}`}></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">{finished ? 'Finished' : 'Not Finished'}</div>
        </label>
      </div>

      {/* More details and components related to the prescription can go here */}
    </div>
  );
};

export default PrescriptionDetails;
