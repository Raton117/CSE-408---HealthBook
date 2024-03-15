import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Treatment = () => {
  const [treatments, setTreatments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(null);
  const [doctorSearchTerm, setDoctorSearchTerm] = useState('');
  const [doctorSearchResults, setDoctorSearchResults] = useState([]);
  const [DoctorUsername, setDoctorUsername] = useState('');
  const [sharedDoctorNames, setSharedDoctorNames] = useState([]);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const navigate = useNavigate();

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

    const fetchShared = () => {
      axios.get('http://localhost:8000/patients/shared-treatments', {
        params: {
          user: localStorage.getItem('username'),
          treatment: selectedTreatmentId
        }
      })
        .then(response => {
          console.log(response);
          setSharedDoctorNames(response.data.shares);
        })
        .catch(error => {
          console.error('Error fetching treatments:', error);
        });
    };
    if (!showShareModal) {
      fetchTreatments();
    }
    else {
      fetchShared();
      if (doctorSearchTerm) {
        const fetchPatientSuggestions = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/patients/search-doctor?username=${doctorSearchTerm}`);
                setDoctorSearchResults(response.data.doctors || []);
            } catch (error) {
                console.error('Error fetching docotr suggestions:', error);
            }
        };
  
        fetchPatientSuggestions();
    } else {
        setDoctorSearchResults([]);
    }

    
    }
    
  }, [doctorSearchTerm,triggerEffect]);

  const callEffect = () => {
    setTriggerEffect(!triggerEffect); // Toggle triggerEffect to trigger useEffect
  };
  const handleEdit = (treatment) => {
    // Logic to handle editing treatment
    console.log(treatment)
    const treatmentJSON = JSON.stringify(treatment);
    const encodedTreatment = encodeURIComponent(treatmentJSON);
    navigate(`/updatetreatment/${treatment.id}?data=${encodedTreatment}`);
    // alert(`Edit treatment ${treatment}`);
  };

  const handleChangeStatus = (treatmentId, newStatus) => {
    // Logic to change treatment status
    alert(`Change treatment ${treatmentId} status to ${newStatus}`);
  };


  let filteredTreatments;
  if (!treatments) {
    filteredTreatments = "No treatments found";
    console.log(filteredTreatments)
  } else {
    filteredTreatments = treatments.filter(treatment => {
      return (treatment.id && treatment.id.toString().includes(searchTerm.toLowerCase())) ||
      (treatment.disease && treatment.disease.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (treatment.doctor_name && treatment.doctor_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (treatment.start_date && new Date(treatment.start_date).toLocaleDateString().includes(searchTerm));

    });
  }

  const selectDoctor = (username) => {
    setDoctorUsername(username);
    setDoctorSearchResults([]);
};
const shareTreatment = (doctorUsername, treatmentId) => {
  axios.post('http://localhost:8000/patients/share-treatment', {
    patient: localStorage.getItem('username'),
    doctor: doctorUsername,
    treatment: treatmentId
  })
    .then(response => {
      console.log('Treatment shared successfully:', response);
      // You can handle the response as needed
      // For example, you can update the list of shared treatments
    })
    .catch(error => {
      console.error('Error sharing treatment:', error);
    });
    setShowShareModal(false);
};

const unshareTreatment = (doctorUsername, treatmentId) => {
  axios.post('http://localhost:8000/patients/unshare-treatment', {
    patient: localStorage.getItem('username'),
    doctor: doctorUsername,
    treatment: treatmentId
  })
    .then(response => {
      console.log('Treatment unshared successfully:', response);
      // You can handle the response as needed
      // For example, you can update the list of shared treatments
    })
    .catch(error => {
      console.error('Error sharing treatment:', error);
    });
    
    callEffect();
};

  // Mock data for doctor names (replace with actual data)
  const doctorNames = ["Doctor 1", "Doctor 2", "Doctor 3"];

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
        {filteredTreatments === "No treatments found" || filteredTreatments.length === 0 ? (
          <p>No treatments found</p>
        ) : (
          filteredTreatments.map((treatment) => (
            <div key={treatment.id} className="border p-4 rounded shadow relative">
              <Link key={treatment.id} to={`/myprescriptions/${treatment.id}`}>
                <h3 className="text-lg font-semibold">Treatment ID: {treatment.id}</h3>
                <p>Disease: {treatment.disease}</p>
                <p>Doctor: {treatment.doctor_name}</p>
                <p>Start Date: {new Date(treatment.start_date).toLocaleDateString()}</p>
                <p>Cost: {treatment.cost}</p>
              </Link>
              <div className="absolute right-4 bottom-4 flex flex-col">
                <button onClick={() => {
                  setSelectedTreatmentId(treatment.id);
                  setShowShareModal(true);
                }} className="bg-blue-500 text-white rounded px-3 py-1 mr-2 mb-2">
                  Share
                </button>
                <button onClick={() => handleEdit(treatment)} className="bg-blue-500 text-white rounded px-3 py-1 mr-2 mb-2">
                  Edit
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

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-20 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Share Treatment</h2>
            <input
              type="text"
              placeholder="Search doctor by username..."
              className="border p-2 w-full mb-2"
              onChange={(e) => {
                setDoctorSearchTerm(e.target.value);
                //searchDoctorByUsername(doctorSearchTerm);
              }}
            />
            <div>
            {doctorSearchResults.length > 0 && (
                        <ul className="border p-2 mt-2">
                            {doctorSearchResults.map((doctor, index) => (
                                <li key={index} className="py-1 cursor-pointer" onClick={() => selectDoctor(doctor.username)}>
                                    {doctor.username} - {doctor.name}
                                    <div className="bg-blue-500 text-white rounded-full pl-20">
                                    <button  onClick={() => shareTreatment(doctor.username, selectedTreatmentId)}>Share</button>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

            
              </div>

              {/* <div>
              {sharedDoctorNames.length > 0 && (
                        <ul className="border p-2 mt-2">
                            {sharedDoctorNames.map((doctor, index) => (
                                <li key={index} className="py-1 cursor-pointer" onClick={() => selectDoctor(doctor.username)}>
                                    {doctor.username}
                                    <div className="bg-blue-500 text-white rounded-full pl-20">
                                    <button  onClick={() => unshareTreatment(doctor.username, selectedTreatmentId)}>Unshare</button>

                                    </div>
                                </li>
                            ))}
                            
                        </ul>
              )}
                   

            
              </div> */}



            <button onClick={() => setShowShareModal(false)} className="bg-blue-500 text-white rounded px-3 py-1 mr-2 mb-2">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Treatment;
