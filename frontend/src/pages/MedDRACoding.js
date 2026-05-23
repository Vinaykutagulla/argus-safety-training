import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { meddraService } from '../services/api';

const MedDRACoding = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMedDRA, setSelectedMedDRA] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [socs, setSocs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await meddraService.searchMedDRA({
        term: searchTerm || undefined
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSOCs = async () => {
    try {
      const response = await meddraService.getSOCs();
      setSocs(response.data);
    } catch (error) {
      console.error('Failed to load SOCs:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" mb={4}>
        MedDRA Coding System
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>Search MedDRA Codes</Typography>
            <Box component="form" onSubmit={handleSearch} mb={2}>
              <TextField
                fullWidth
                label="Search by Term or Code"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., 'Fever' or '10016256'"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>MedDRA Code</TableCell>
                    <TableCell>Preferred Term</TableCell>
                    <TableCell>System Organ Class</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((result, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{result.meddraCode}</TableCell>
                      <TableCell>{result.preferredTerm}</TableCell>
                      <TableCell>{result.systemOrganClass}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => setSelectedMedDRA(result)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {searchResults.length === 0 && !loading && (
              <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                No results found. Try a different search term.
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {selectedMedDRA && (
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>Details</Typography>
              <Box mb={2}>
                <Typography variant="body2" color="textSecondary">MedDRA Code</Typography>
                <Typography variant="body1">{selectedMedDRA.meddraCode}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="body2" color="textSecondary">Preferred Term</Typography>
                <Typography variant="body1">{selectedMedDRA.preferredTerm}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="body2" color="textSecondary">Low Level Term</Typography>
                <Typography variant="body1">{selectedMedDRA.lowLevelTerm || 'N/A'}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="body2" color="textSecondary">System Organ Class</Typography>
                <Typography variant="body1">{selectedMedDRA.systemOrganClass}</Typography>
              </Box>
              {selectedMedDRA.description && (
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">Description</Typography>
                  <Typography variant="body2">{selectedMedDRA.description}</Typography>
                </Box>
              )}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  // Copy to clipboard or use in form
                  navigator.clipboard.writeText(selectedMedDRA.meddraCode);
                  alert('Code copied to clipboard!');
                }}
              >
                Copy Code
              </Button>
            </Paper>
          )}

          <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6" mb={2}>Quick Links</Typography>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={loadSOCs}
              sx={{ mb: 1 }}
            >
              View System Organ Classes
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
            >
              MedDRA Documentation
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MedDRACoding;
