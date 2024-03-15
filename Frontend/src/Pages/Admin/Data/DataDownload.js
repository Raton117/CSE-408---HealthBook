import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';

const TreatmentsPage = () => {

    // const [formData, setFormData] = useState({
    //     area: '',
    //     start_date: '',
    //     end_date: ''
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const [area, setArea] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'area') {
            setArea(value);
        } else if (name === 'start_date') {
            setStartDate(value);
        } else if (name === 'end_date') {
            setEndDate(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(area, start_date, end_date);
        try {
            const response = await axios.get(`http://localhost:8000/admins/treatments-data?area=${area}&start_date=${start_date}&end_date=${end_date}&username=${localStorage.getItem('username')}`, {
                responseType: 'blob' // Important: responseType must be set to 'blob' for binary data
            });
            console.log(response.data);
            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const file = 'treatments_' + 'area=' + area + '_start_date=' + start_date + '_end_date=' + end_date + '.csv';
            link.setAttribute('download', file);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error generating CSV:', error);
        }
    };

    return (
        <Container>
            {/* <form onSubmit={handleSubmit} className={classes.formContainer}> */}
            <Typography variant="h4" sx={{ marginTop: '40px', textAlign: 'center' }}>
                Generate CSV for Treatments
            </Typography>
            <Grid container spacing={2} marginTop={2} justifyContent="center">
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label="Area"
                        name="area"
                        value={area}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label="Start Date"
                        type="date"
                        name="start_date"
                        value={start_date}
                        onChange={handleChange}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label="End Date"
                        type="date"
                        name="end_date"
                        value={end_date}
                        onChange={handleChange}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={0}>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                        Generate CSV
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TreatmentsPage;


