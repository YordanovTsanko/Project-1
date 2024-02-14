import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AiFillCloseCircle,
  AiFillDelete,
  AiOutlineFileDone,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styles from "./Update.module.css";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Transition } from "../Layouts/Handlers";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, updatePassword } from "../../Redux/Actions/authActions";

const UpdateDetails = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    zipCode: "",
    city: "",
    userState: "",
    id: "",
  });
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProfile(userDetails));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    dispatch(updatePassword(userDetails, password));
  };

  const deleteAccount = async () => {};

  useEffect(() => {
    if (!loading) {
      const getUser = async () => {
        try {
          const response = await axios.get("/api/v1/isLoggedIn");
          setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            phoneNumber: response.data.user.phoneNumber,
            email: response.data.user.email,
            id: response.data.user._id,
          }));
        } catch (error) {
          console.error("Error checking authentication status:", error);
        }
      };

      if (isAuthenticated) {
        getUser();
      } else {
        navigate("/login");
      }
    }
  }, [isAuthenticated, loading, navigate, setUserDetails]);

  return (
    <>
      <Container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: 10,
        }}
      >
        <Typography
          variant="h4"
          sx={{ margin: "30px 0", fontWeight: "bold", color: "#1976d2" }}
        >
          Personal Information
        </Typography>
        <form
          noValidate
          autoComplete="off"
          className={styles.checkout_form}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={userDetails.firstName || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={userDetails.lastName || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Number"
                type="tel"
                name="phoneNumber"
                value={userDetails.phoneNumber || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={userDetails.email || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={userDetails.address || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="city"
                value={userDetails.city || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="tel"
                label="Postal/Zip Code"
                name="zipCode"
                value={userDetails.zipCode || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Province/State"
                name="userState"
                value={userDetails.userState || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "25px 0",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                endIcon={<AiOutlineFileDone />}
                type="submit"
              >
                Save
              </Button>
            </Box>
          </Grid>
        </form>

        <Typography
          variant="h4"
          sx={{ margin: "20px 0", fontWeight: "bold", color: "#1976d2" }}
        >
          Reset Password
        </Typography>
        <form onSubmit={handleResetPassword}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Current password"
                name="password"
                type={showPassword ? "text" : "password"}
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
                value={password.password || ""}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      sx={{ cursor: "pointer" }}
                    >
                      {showNewPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                    </InputAdornment>
                  ),
                }}
                value={password.newPassword || ""}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      sx={{ cursor: "pointer" }}
                    >
                      {showNewPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                    </InputAdornment>
                  ),
                }}
                value={password.confirmPassword || ""}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "25px 0",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              endIcon={<RiLockPasswordLine />}
              type="submit"
            >
              Reset
            </Button>
          </Box>
        </form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "25px 0",
            width: "100%",
          }}
        >
          <Typography variant="h6">Delete Your Account?</Typography>
          <Button
            variant="contained"
            color="error"
            endIcon={<AiFillDelete />}
            onClick={() => setOpenAlert(true)}
          >
            Delete
          </Button>
        </Box>
        <Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenAlert(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
            <DialogContentText
              style={{ textAlign: "center" }}
              id="alert-dialog-slide-description"
            >
              <Typography variant="body1">
                Your all data will be erased
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Button
              variant="contained"
              endIcon={<AiFillDelete />}
              color="error"
              onClick={deleteAccount}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenAlert(false)}
              endIcon={<AiFillCloseCircle />}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default UpdateDetails;
