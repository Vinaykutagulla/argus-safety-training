import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Grid,
  Alert
} from '@mui/material';
import { caseService } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const CaseEntrySchema = Yup.object().shape({
  patientAge: Yup.number().required('Patient age is required'),
  patientGender: Yup.string().required('Gender is required'),
  reporterName: Yup.string().required('Reporter name is required'),
  reporterType: Yup.string().required('Reporter type is required'),
  dateOfOnset: Yup.date().required('Date of onset is required'),
  productName: Yup.string().required('Product name is required'),
  dosage: Yup.string().required('Dosage is required')
});

const CaseEntry = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const initialValues = {
    patientAge: '',
    patientGender: '',
    reporterName: user?.name || '',
    reporterType: 'Healthcare Professional',
    dateOfOnset: '',
    productName: '',
    dosage: '',
    route: 'Oral',
    indicatedFor: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const caseData = {
        patientAge: values.patientAge,
        patientGender: values.patientGender,
        reporterName: values.reporterName,
        reporterType: values.reporterType,
        dateOfOnset: values.dateOfOnset,
        suspectedProducts: [{
          productName: values.productName,
          dosage: values.dosage,
          route: values.route,
          indicatedFor: values.indicatedFor
        }]
      };

      const response = await caseService.createCase(caseData);
      setSuccess('Case created successfully!');
      setTimeout(() => {
        navigate(`/cases/${response.data.case._id}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create case');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" mb={4}>
          New Case Entry
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Formik
          initialValues={initialValues}
          validationSchema={CaseEntrySchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Patient Age"
                    name="patientAge"
                    type="number"
                    error={touched.patientAge && !!errors.patientAge}
                    helperText={touched.patientAge && errors.patientAge}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Gender"
                    name="patientGender"
                    select
                    error={touched.patientGender && !!errors.patientGender}
                    helperText={touched.patientGender && errors.patientGender}
                  >
                    <MenuItem value="M">Male</MenuItem>
                    <MenuItem value="F">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Reporter Name"
                    name="reporterName"
                    error={touched.reporterName && !!errors.reporterName}
                    helperText={touched.reporterName && errors.reporterName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Reporter Type"
                    name="reporterType"
                    select
                    error={touched.reporterType && !!errors.reporterType}
                    helperText={touched.reporterType && errors.reporterType}
                  >
                    <MenuItem value="Healthcare Professional">Healthcare Professional</MenuItem>
                    <MenuItem value="Patient">Patient</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Date of Onset"
                    name="dateOfOnset"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={touched.dateOfOnset && !!errors.dateOfOnset}
                    helperText={touched.dateOfOnset && errors.dateOfOnset}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Product Name"
                    name="productName"
                    error={touched.productName && !!errors.productName}
                    helperText={touched.productName && errors.productName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Dosage"
                    name="dosage"
                    error={touched.dosage && !!errors.dosage}
                    helperText={touched.dosage && errors.dosage}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Route"
                    name="route"
                    select
                  >
                    <MenuItem value="Oral">Oral</MenuItem>
                    <MenuItem value="IV">IV</MenuItem>
                    <MenuItem value="IM">IM</MenuItem>
                    <MenuItem value="Topical">Topical</MenuItem>
                    <MenuItem value="Inhalation">Inhalation</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Indicated For"
                    name="indicatedFor"
                    multiline
                    rows={3}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Save Case
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/cases')}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default CaseEntry;
