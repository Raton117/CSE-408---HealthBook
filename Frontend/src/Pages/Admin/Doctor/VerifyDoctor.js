import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Box, Button, Typography, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import DoctorBox from '../../../Components/Doctor/DoctorBox';

const VerifyDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  useEffect(() => {
    const fetchDoctors = () => {
      axios.get('http://localhost:8000/admins/getDoctors')
        .then(response => {
          // console.log(response.date.doctors);
          setDoctors(response.data.doctors);
        })
        .catch(error => {
          console.error('Error fetching doctors:', error);
        });
    };

    fetchDoctors();
  }, []);

  const onVerify = async (doctor) => {
    try {
      const response = await axios.post('http://localhost:8000/admins/verifyDoctor', {
        "doctor": doctor.username,
        "admin": localStorage.getItem('username')
      });
      console.log(response);
      setDoctors(doctors.filter(current_doctor => current_doctor.username !== doctor.username));
      setOpenAlert(true); // Open the success alert
    } catch (error) {
      console.error('Error verifying doctor:', error);
    }
  }

  const onDelete = async (doctor) => {
    try {
      const response = await axios.post('http://localhost:8000/admins/deleteDoctor', {
        "doctor": doctor.username,
        "admin": localStorage.getItem('username')
      });
      console.log(response);
      setDoctors(doctors.filter(current_doctor => current_doctor.username !== doctor.username));
      setDeleteAlert(true); // Open the success alert
    } catch (error) {
      console.error('Error verifying doctor:', error);
    }
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
    setDeleteAlert(false);
  };

  return (
    <div>
      {doctors.length === 0 ? (
        <Typography variant="body1">No unverified doctors</Typography>
      ) : (
        doctors.map(doctor => (
          <DoctorBox key={doctor.username} doctor={doctor} onVerify={onVerify} onDelete={onDelete}/>
        ))
      )}

      {/* Success Alert */}
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Doctor verified successfully!
        </Alert>
      </Snackbar>

      {/* Success Alert */}
      <Snackbar open={deleteAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
          Doctor deleted successfully!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default VerifyDoctor