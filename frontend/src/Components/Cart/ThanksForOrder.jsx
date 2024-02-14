import React from "react";
import { useSelector } from "react-redux";
import { Typography, Box, Container } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ThanksForOrder = () => {
  const { order } = useSelector((state) => state.orders);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: "calc(100vh - 224px)",
        display: "flex",
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <Box textAlign="center" p={2}>
        <CheckCircleIcon sx={{ fontSize: 100, color: "blue" }} />
        <Typography variant="h4" gutterBottom>
          Thank you for your order
        </Typography>
        <Typography variant="body1">Your order ID is: {order?.order?._id}</Typography>
      </Box>
    </Container>
  );
};

export default ThanksForOrder;
