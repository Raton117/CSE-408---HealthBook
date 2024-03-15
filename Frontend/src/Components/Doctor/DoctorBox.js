import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  box: {
    backgroundColor: '#756464', // Gray background
    color: 'white', // White text color
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px',
    borderRadius: '10px',
  },
  userInfo: {
    textAlign: 'left',
  },
  designationInfo: {
    textAlign: 'center',
  },
  actionButtons: {
    textAlign: 'right',
    display: 'flex', // Set display to flex
    flexDirection: 'column', // Stack buttons vertically
  },
  button: {
    margin: '5px', // Add margin between buttons
  },
  underlinedLink: {
    textDecoration: 'underline',
  },
});

const DoctorBox = ({doctor, onVerify, onDelete}) => {
  const classes = useStyles();

  const handleVerifyClick = () => {
    onVerify(doctor);
  }

  const handleDeleteClick = () => {
    onDelete(doctor);
  }
  return (
    <Box className={classes.box}>
      <div className={classes.userInfo}>
      <Link to={`/doctor/${doctor.username}`} className={classes.underlinedLink}>
          <Typography variant="body1">{doctor.username}</Typography>
        </Link>
        <Typography variant="body1">{doctor.name}</Typography>
        <Typography variant="body1">{doctor.hospital_name}</Typography>
      </div>
      <div className={classes.designationInfo}>
        <Typography variant="body1">{doctor.designation}</Typography>
        <Typography variant="body1">{doctor.department}</Typography>
      </div>
      <div className={classes.actionButtons}>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleVerifyClick}>Verify</Button>
        <Button variant="contained" color="error" className={classes.button} onClick={handleDeleteClick}>Delete</Button>
      </div>
    </Box>
  )
}

export default DoctorBox