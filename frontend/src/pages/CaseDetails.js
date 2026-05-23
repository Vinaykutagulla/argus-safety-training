import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { caseService, adverseEventService } from '../services/api';

const AdverseEventSchema = Yup.object().shape({
  eventDescription: Yup.string().required('Event description is required'),
  severity: Yup.string().required('Severity is required'),
  outcome: Yup.string().required('Outcome is required')
});

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchCaseDetails();
  }, [id]);

  const fetchCaseDetails = async () => {
    try {
      const response = await caseService.getCaseById(id);
      setCaseData(response.data);
    } catch (err) {
      setError('Failed to fetch case details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdverseEvent = async (values, { setSubmitting, resetForm }) => {
    try {
      await adverseEventService.createAdverseEvent({
        caseId: id,
        ...values
      });
      await fetchCaseDetails();
      setOpenDialog(false);
      resetForm();
    } catch (err) {
      setError('Failed to add adverse event');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!caseData) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Case {caseData.caseId}</Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/cases')}
        >
          Back to Cases
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>Patient Information</Typography>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary">Patient ID</Typography>
              <Typography variant="body1">{caseData.patientId}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary">Age</Typography>
              <Typography variant="body1">{caseData.patientAge}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary">Gender</Typography>
              <Typography variant="body1">{caseData.patientGender}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>Case Information</Typography>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary">Status</Typography>
              <Typography variant="body1">{caseData.status}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary">Reporter</Typography>
              <Typography variant="body1">{caseData.reporterName}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary">Date of Report</Typography>
              <Typography variant="body1">
                {new Date(caseData.dateOfReport).toLocaleDateString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Adverse Events</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}
              >
                Add Adverse Event
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {caseData.adverseEvents && caseData.adverseEvents.length > 0 ? (
              caseData.adverseEvents.map((event, idx) => (
                <Card key={idx} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" mb={1}>
                      {event.eventDescription}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">Severity</Typography>
                        <Typography variant="body1">{event.severity}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary">Outcome</Typography>
                        <Typography variant="body1">{event.outcome}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No adverse events recorded
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Adverse Event</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              eventDescription: '',
              eventDate: new Date().toISOString().split('T')[0],
              severity: 'Moderate',
              outcome: 'Unknown',
              causality: { assessment: 'Unknown', reasoning: '' }
            }}
            validationSchema={AdverseEventSchema}
            onSubmit={handleAddAdverseEvent}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  label="Event Description"
                  name="eventDescription"
                  multiline
                  rows={3}
                  margin="normal"
                  error={touched.eventDescription && !!errors.eventDescription}
                  helperText={touched.eventDescription && errors.eventDescription}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Event Date"
                  name="eventDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Severity"
                  name="severity"
                  select
                  SelectProps={{ native: true }}
                  margin="normal"
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                  <option value="Life-threatening">Life-threatening</option>
                </Field>
                <Field
                  as={TextField}
                  fullWidth
                  label="Outcome"
                  name="outcome"
                  select
                  SelectProps={{ native: true }}
                  margin="normal"
                >
                  <option value="Recovered">Recovered</option>
                  <option value="Recovering">Recovering</option>
                  <option value="Not Recovered">Not Recovered</option>
                  <option value="Fatal">Fatal</option>
                  <option value="Unknown">Unknown</option>
                </Field>
                <DialogActions sx={{ mt: 2 }}>
                  <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    Add Event
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CaseDetails;
