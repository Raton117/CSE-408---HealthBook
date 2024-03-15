import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import axios from 'axios';
import PostReportBox from '../../../Components/Doctor/PostReportBox';

function PostReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admins/postreports');
      console.log(response.data.reports);
      setReports(response.data.reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      {reports.length === 0 ? (
        <Typography variant="h5">
          There are no Post reports
        </Typography>
      ) : (
        <Typography variant="h4" gutterBottom>
          Post Reports
        </Typography>
      )}
      {reports.map((report, index) => (
        <React.Fragment key={index}>
          <PostReportBox report={report} />
        </React.Fragment>
      ))}
    </Container>
  );
}

export default PostReports;

