import React from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

import "./Dashboard.css";
import { useGetDashboardDetailsQuery } from "../../store/slices/dashboardSlice";

const Dashboard = () => {
  const { isLoading, data, isError } = useGetDashboardDetailsQuery();

  if (isLoading)
    return (
      <Container sx={{ pt: 2, pb: 2 }}>
        <CircularProgress />
      </Container>
    );

  if (isError)
    return (
      <Container sx={{ pt: 2, pb: 2 }}>
        <Typography>Something went wrong</Typography>
      </Container>
    );

  return (
    <Container sx={{ pt: 2, pb: 2 }}>
      <Grid container gap={2}>
        <Grid item xs={12}>
          <Box sx={{ p: 2 }} className="dasboard_card">
            <Typography mb={2}>{data?.data.totalStudents}</Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <PeopleIcon />
              <Typography>Students</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ p: 2 }} className="dasboard_card">
            <Typography mb={2}>{data?.data.totalFaculties}</Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <PeopleIcon />
              <Typography>Faculties</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
