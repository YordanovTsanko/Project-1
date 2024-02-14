import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { MdLockOutline, MdMailOutline } from "react-icons/md";
import { toast } from "react-toastify";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isSentMail, setIsSentMail] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.success("Email sent succefully", {
        autoClose: 500,
        theme: "colored",
      });
      setIsSentMail(true);
    } catch (error) {
      toast.error(error.response.data.msg, {
        autoClose: 500,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xm"
        sx={{
          minHeight: "calc(100vh - 224px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!isSentMail ? (
          <>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
                <MdLockOutline />
              </Avatar>
              <Typography component="h1" variant="h5">
                Forgot Password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                color: "#1976d2",
                fontWeight: "bold",
                mb: 5
              }}
            >
              Email Sent Successfully !!!
            </Typography>
            <a
              href="https://mail.google.com/mail/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <Button endIcon={<MdMailOutline />} variant="contained">
                Open Mail
              </Button>
            </a>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ForgotPasswordForm;
