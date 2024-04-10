import React from "react";
import Container from "@mui/material/Container";
import ProductChart from "../Components/Charts/ProductChart";
import AdminNav from "../Components/AdminNav";

const AdminHomePage = () => {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        minHeight: "calc(100vh - 224px)",
        pt: 5,

        "@media (min-width: 961px)": {
          pt: 0,
        },
      }}
    >
      <AdminNav />
      <ProductChart />
    </Container>
  );
};

export default AdminHomePage;
