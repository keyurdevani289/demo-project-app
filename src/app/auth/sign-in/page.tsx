"use client";

import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import SHA256 from "crypto-js/sha256";
import { useAppSelector } from "@/store/hooks/hooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setCookie } from "@/hooks/useCookie";
import { userData } from "@/types/types";

// Login Component
export const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });
  const users = useAppSelector((state) => state.form.users);

  const router = useRouter();

  // Login function that uses toastify on failure
  const loginUser = (
    loginData: { email: string; password: string },
    users: userData[]
  ): boolean => {
    // Find the user with the matching email
    const user = users.find((u) => u.email === loginData.email);

    if (!user) {
      toast.error("User not found. Please check your email.");
      return false;
    }

    // Hash the entered password and compare with stored hash
    const enteredHashed = SHA256(loginData.password).toString();
    if (enteredHashed !== user.password) {
      toast.error("Invalid password. Please try again.");
      return false;
    }

    return true;
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      const isValid = loginUser(values, users);
      if (isValid) {
        toast.success("Login successful!");
        setCookie("userToken", values.email);
        router.push("/");

        // Continue with your login flow (e.g., routing)
      }
    },
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/sign-up">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
