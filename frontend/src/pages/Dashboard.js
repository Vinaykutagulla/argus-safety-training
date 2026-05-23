import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import { dashboardService } from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, timelineRes, reportRes] = await Promise.all([
          dashboardService.getDashboardStats(),
          dashboardService.getCasesTimeline(),
          dashboardService.getAdverseEventsReport()
        ]);

        setStats(statsRes.data);
        setTimeline(timelineRes.data);
        setReport(reportRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  const casesByStatusChart = {
    labels: stats?.casesByStatus?.map(item => item._id) || [],
    datasets: [{
      label: 'Cases by Status',
      data: stats?.casesByStatus?.map(item => item.count) || [],
      backgroundColor: ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c']
    }]
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" mb={4}>
        Safety Monitoring Dashboard
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Cases
              </Typography>
              <Typography variant="h4">
                {stats?.totalCases || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Adverse Events
              </Typography>
              <Typography variant="h4">
                {stats?.totalAdverseEvents || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Serious Cases
              </Typography>
              <Typography variant="h4">
                {stats?.seriousCases || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completion Rate
              </Typography>
              <Typography variant="h4">
                {stats?.totalCases ? ((stats?.casesByStatus?.find(c => c._id === 'Closed')?.count || 0) / stats.totalCases * 100).toFixed(1) : 0}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>
              Cases by Status
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={casesByStatusChart}
                options={{ maintainAspectRatio: false }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>
              Adverse Events by Severity
            </Typography>
            <Box>
              {report?.map((item, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography variant="body2">{item._id}</Typography>
                  <LinearProgress variant="determinate" value={Math.min(item.count * 10, 100)} />
                  <Typography variant="caption">{item.count} events</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
