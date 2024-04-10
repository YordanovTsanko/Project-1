import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const AdminLogin = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [code, setCode] = useState("");

  const handleOnChange = (e) => {
    setCode(e.target.value);
  };

  useEffect(() => {
    if (!loading) {
      if (user === null) {
        navigate("/");
      } else {
        if (user?.role === "admin") {
          console.log("isAdmin");
        }
      }
    }
  }, [user, loading, navigate]);

  const handleSubmit = async () => {
    if (true) {
     return navigate("/admin/dashboard");
    } else {
    }
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        minHeight: "calc(100vh - 224px)",
        pt: 4,

        "@media (min-width: 961px)": {
          pt: 0,
        },
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Please verify yur email !
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={code}
            name="key"
            onChange={handleOnChange}
            label="Admin Code"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Continue
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/admin/register" variant="body1">
                If you haven't received an email within the next 5 minutes,
                please{" "}
                <span style={{ color: "#1976d2" }}>request a new one.</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminLogin;
