import "./loginRegister.css";
import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdLockOutline } from "react-icons/md";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { login, clearErrors } from "../../Redux/Actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, error, message } = useSelector(
    (state) => state.auth
  );

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(credentials.email, credentials.password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (message) {
      toast.success(message, {
        autoClose: 5000,
        theme: "colored",
      });
      dispatch(clearErrors());
    }

    if (error) {
      toast.error(error, {
        autoClose: 2000,
        theme: "colored",
      });
      dispatch(clearErrors());
    }
  }, [isAuthenticated, navigate, dispatch, error, message]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ marginBottom: 5, minHeight: "calc(100vh - 224px)" }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "@media (max-width:1050px)": {
            mt: 10,
          },
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={credentials.email}
            name="email"
            onChange={handleOnChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={credentials.password}
            name="password"
            onChange={handleOnChange}
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ cursor: "pointer" }}
                >
                  {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </InputAdornment>
              ),
            }}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                to="/forgotpassword"
                variant="body2"
                style={{ color: "#1976d2" }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                Don't have an account?
                <span style={{ color: "#1976d2" }}> Sign Up</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
