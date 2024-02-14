import { Typography } from "@mui/material";
import React from "react";

const CopyRight = () => {
  return (
    <a href="/" target="_blank" rel="noreferrer">
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{ pt: 5, pb: 5, backgroundColor: "#E6E6E6" }}
        color="text.secondary"
        align="center"
        style={{ color: "#1976d2" }}
      >
        {" "}
        {new Date().getFullYear()}
        {" © "}
        Developed By Tsanko Yordanov
      </Typography>
    </a>
  );
};

export default CopyRight;
