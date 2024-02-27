import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTreatmentForDoctor = () => {
    const navigate = useNavigate();
    const [patientUsername, setPatientUsername] = useState('');
    const [patientSuggestions, setPatientSuggestions] = useState([]);
    const [formData, setFormData] = useState({
        disease: '',
        hospital_name: ''
    });
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (patientUsername) {
            const fetchPatientSuggestions = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/doctors/patient?username=${patientUsername}`);
                    setPatientSuggestions(response.data.patient || []);
                } catch (error) {
                    console.error('Error fetching patient suggestions:', error);
                }
            };

            fetchPatientSuggestions();
        } else {
            setPatientSuggestions([]);
        }
    }, [patientUsername]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const selectPatient = (username) => {
        setPatientUsername(username);
        setPatientSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const doctor_username = localStorage.getItem('username');
            const response = await axios.post('http://localhost:8000/doctors/add-treatment', {
                ...formData,
                patient_username: patientUsername,
                doctor_username
            });
            console.log(response.data);
            if (response.data.responseCode === 200) {
                navigate('/doctorTreatments');
            } else {
                setAlert({ type: 'error', message: response.data.status });
            }
        } catch (error) {
            console.error('Error adding treatment:', error);
            setAlert({ type: 'error', message: 'An error occurred while adding treatment' });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Add Treatment for Patient</h2>
            {alert && (
                <div className={`alert-${alert.type}`}>
                    {alert.message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                {/* Rest of your form */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Patient Username</label>
                    <input
                        type="text"
                        value={patientUsername}
                        onChange={(e) => setPatientUsername(e.target.value)}
                        className="border p-2 w-full"
                        placeholder="Start typing username..."
                    />
                    {patientSuggestions.length > 0 && (
                        <ul className="border p-2 mt-2">
                            {patientSuggestions.map((patient, index) => (
                                <li key={index} className="py-1 cursor-pointer" onClick={() => selectPatient(patient.username)}>
                                    {patient.username} - {patient.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
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
                    <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
                    <input
                        type="text"
                        name="hospital_name"
                        value={formData.hospital_name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Add Treatment
                </button>
            </form>
        </div>
    );
};

export default AddTreatmentForDoctor;
