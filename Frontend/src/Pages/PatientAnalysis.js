import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, IconButton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PatientAnalysis = () => {

    // const [data, setData] = useState(null);
    const [imageSrc1, setImageSrc1] = useState(null);
    const [imageSrc2, setImageSrc2] = useState(null);
    const [imageSrc3, setImageSrc3] = useState(null);
    const [recurringDiseases, setRecurringDiseases] = useState([]);
    const [healthSatisfaction, setHealthSatisfaction] = useState(0);

    const username = localStorage.getItem('username');

    const navigate = useNavigate();

    // Get the current date
    const currentDate = new Date();

    // Array of month names
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    // Current month
    const currentMonthIndex = currentDate.getMonth();
    const currentMonth = monthNames[currentMonthIndex];

    // Previous month
    const previousMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
    const previousMonth = monthNames[previousMonthIndex];

    // Next month
    const nextMonthIndex = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
    const nextMonth = monthNames[nextMonthIndex];

    console.log('Current month:', currentMonth);
    console.log('Previous month:', previousMonth);
    console.log('Next month:', nextMonth);

    useEffect(() => {
        let timeoutId;
        const fetchData = async () => {
            try {
                const response1 = await axios.get(`http://localhost:8000/patients/last-one-year-diseases?patient=${username}`);
                setImageSrc1(response1.data.response.image);

                const response2 = await axios.get(`http://localhost:8000/patients/patient-treatment-success?patient=${username}`);
                setImageSrc2(response2.data.response.image);

                const response3 = await axios.get(`http://localhost:8000/patients/patient-doctor-visit?patient=${username}`);
                setImageSrc3(response3.data.response.image);

                const recurringDiseasesResponse = await axios.get(`http://localhost:8000/patients/recurring-diseases?patient=${username}`);
                setRecurringDiseases(recurringDiseasesResponse.data.diseases);

                const healthSatisfactionResponse = await axios.get(`http://localhost:8000/patients/patient-satisfaction?patient=${username}`);
                setHealthSatisfaction(healthSatisfactionResponse.data.health_satisfaction);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const debounceFetchData = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(fetchData, 0.05); // Debounce time
        };

        debounceFetchData();

        return () => clearTimeout(timeoutId);
    }, [username]);
    return (
        <Container style={{ paddingTop: '40px' }}>
            <IconButton variant="outlined" onClick={() => navigate(-1)}>
                <ArrowBackIcon />
            </IconButton>
            <Grid container spacing={2} alignContent={'center'}>
                <Grid item xs={12} md={4}>
                    <div style={{ display: 'flex' }}>
                        {imageSrc1 && (
                            <img
                                src={imageSrc1}
                                alt="Last one year diseases"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        )}
                        {imageSrc2 && (
                            <img
                                src={imageSrc2}
                                alt="Treatment Success Rate"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        )}
                        {imageSrc3 && (
                            <img
                                src={imageSrc3}
                                alt="Last year doctor visit count"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        )}
                    </div>
                </Grid>
            </Grid>
            <div style={{ paddingTop: '20px' }}>
                {recurringDiseases.length === 0 ? (
                    <Typography variant="h6">No Recurring Diseases</Typography>
                ) : (
                    <Typography variant="h6">Recurring Diseases:</Typography>
                )}
                <ul>
                    {recurringDiseases.map((disease, index) => (
                        <li key={index}>{`${disease.disease}: ${disease.count} times between ${previousMonth} and ${nextMonth} in last 3 years`}</li>
                    ))}
                </ul>
            </div>
            <div style={{ paddingTop: '20px' }}>
            <Typography variant="h5" style={{ color: 'red' }}>{`Health Satisfaction Score: ${healthSatisfaction}`}</Typography>
            </div>
        </Container>
    )
}

export default PatientAnalysis