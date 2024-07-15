import {
  Avatar,
  Box,
  Container,
  Typography,
  Button
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "calc(100vh - 224px)",
      }}
    >
      <Avatar sx={{ mt: 5, bgcolor: "#1976d2", width: 100, height: 100 }}>
        <img
          src="https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg"
          alt="User Avatar"
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
      </Avatar>
      <Typography
        variant="h6"
        sx={{ margin: "10px 0", fontWeight: "bold", color: "#1976d2" }}
      >
        {user?.firstName + " " + user?.lastName}
      </Typography>
      <Box
        sx={{
          border: "1px solid #ccc",
          padding: "30px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "430px",
        }}
      >
        {/* Add user profile information */}
        <Typography variant="body1" gutterBottom>
          <b>Join Date:</b> {user?.createdAt}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Email:</b> {user?.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Phone Number:</b> {user?.phoneNumber}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Country:</b> Bulgaria
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Address:</b> jk. Eshek Siki
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>City:</b> Razgrad
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Postal/Zip Code:</b> 7200
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Province/State:</b> Razgrad
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 5 }}>
        <Link to="/profile/edit">
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Edit Profile
          </Button>
        </Link>
        <Link to="/profile/orders">
          <Button variant="contained" color="warning" sx={{ mt: 2 }}>
            My Orders
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Profile;
