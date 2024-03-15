import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const PostReportBox = ({ report }) => {
    console.log("To Object:", {
        pathname: `/posts/${report.post}`,
        state: { 
            report: report 
        }
    });
    return (
        <Box
            bgcolor="#756464"
            color="white"
            p={2}
            mt={2}
            borderRadius={4}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Link
                        to={{
                            pathname: `/posts/${report.post}`,
                            // state: { post: report.post }
                            search: `?postreport_id=${report.id}`
                        }}
                        style={{ textDecoration: 'underline' }}
                    >
                        <Typography variant="body1" gutterBottom>
                            {report.title}
                        </Typography>
                    </Link>
                    <Typography variant="body2" gutterBottom>
                        <strong>Reason:</strong> {report.reason}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2" gutterBottom align="right">
                        <strong>Reported by:</strong> {report.user}
                    </Typography>
                    <Typography variant="body2" gutterBottom align="right">
                        <strong>Date:</strong> {new Date(report.date).toLocaleDateString('en-US')}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PostReportBox;
