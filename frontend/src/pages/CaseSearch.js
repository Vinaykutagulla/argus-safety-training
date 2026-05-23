import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
  Pagination
} from '@mui/material';
import { caseService } from '../services/api';

const CaseSearch = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState({
    caseId: '',
    patientId: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCases();
  }, [page]);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const response = await caseService.getCases({ page, limit: 10 });
      setCases(response.data.cases);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    setLoading(true);
    try {
      const response = await caseService.searchCases(searchParams);
      setCases(response.data.cases);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      'Draft': 'default',
      'Submitted': 'primary',
      'Under Review': 'warning',
      'Assessed': 'info',
      'Closed': 'success'
    };
    return colors[status] || 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box component="form" onSubmit={handleSearch}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Case ID"
                name="caseId"
                value={searchParams.caseId}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Patient ID"
                name="patientId"
                value={searchParams.patientId}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Status"
                name="status"
                select
                value={searchParams.status}
                onChange={handleInputChange}
                SelectProps={{ native: true }}
              >
                <option value="">All</option>
                <option value="Draft">Draft</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Assessed">Assessed</option>
                <option value="Closed">Closed</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Case ID</TableCell>
              <TableCell>Patient ID</TableCell>
              <TableCell>Reporter</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map(caseItem => (
              <TableRow key={caseItem._id} hover>
                <TableCell>{caseItem.caseId}</TableCell>
                <TableCell>{caseItem.patientId}</TableCell>
                <TableCell>{caseItem.reporterName}</TableCell>
                <TableCell>{new Date(caseItem.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip label={caseItem.status} color={getStatusColor(caseItem.status)} size="small" />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/cases/${caseItem._id}`)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default CaseSearch;
