"use client";
import React, { useState } from "react";

import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid,
  Container,
  CssBaseline,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { isEmpty } from "@/hooks/isEmpty";

// Signup Component
const steps = ["Personal Info", "Account Info"];

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignupStep1: React.FC<{ formik: FormikProps<SignupFormValues> }> = ({
  formik,
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        id="firstName"
        name="firstName"
        label="First Name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        id="lastName"
        name="lastName"
        label="Last Name"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />
    </Grid>
  </Grid>
);

const SignupStep2: React.FC<{ formik: FormikProps<SignupFormValues> }> = ({
  formik,
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
    </Grid>
  </Grid>
);

export const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);

  const validationSchema = [
    Yup.object().shape({
      firstName: Yup.string().required("First Name is required").max(50),
      lastName: Yup.string().required("Last Name is required").max(50),
    }),
    Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
  ];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema[activeStep],
    onSubmit: (values) => {
      if (activeStep === steps.length - 1) {
        console.log("Form submitted:", values);
      } else {
        setActiveStep((prev) => prev + 1);
      }
    },
  });

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Container  component="main" maxWidth="sm" sx={{display: "flex", justifyContent: "center",alignItems: "center",height: "100vh" }} >
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Sign Up
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={formik.handleSubmit}>
          {activeStep === 0 ? (
            <SignupStep1 formik={formik} />
          ) : (
            <SignupStep2 formik={formik} />
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={
                activeStep === 0
                  ? isEmpty(formik.values.firstName) ||
                    isEmpty(formik.values.lastName)
                  : isEmpty(formik.values.email) ||
                  isEmpty(formik.values.password)
              }
            >
              {activeStep === steps.length - 1 ? "Sign Up" : "Next"}
            </Button>
          </Box>
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Link href="/auth/sign-in">Already have an account? Login</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
