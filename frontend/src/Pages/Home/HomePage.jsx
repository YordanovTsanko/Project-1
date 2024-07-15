import React from "react";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CategoryCard from "../../Components/Products/CategoryCard";
import CategoriesData from "../../Assets/HomePageCategories";
import Carousel from "../../Components/Layouts/Carousel";
import SearchBar from "../../Components/Layouts/SearchBar";

const HomePage = () => {
  return (
    <>
      <Box>
        <Carousel />
      </Box>
      <Container
        maxWidth="xl"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 0,
          flexDirection: "column",
          marginBottom: 70,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            marginTop: 10,
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          Search for a product
        </Typography>
        <Container
          style={{ marginTop: 30, display: "flex", justifyContent: "center" }}
        >
          <SearchBar />
        </Container>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            marginTop: 10,
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          Categories
        </Typography>
        <Container
          maxWidth="xl"
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {CategoriesData.map((data) => (
            <CategoryCard data={data} key={data.img} />
          ))}
        </Container>
      </Container>
    </>
  );
};

export default HomePage;
