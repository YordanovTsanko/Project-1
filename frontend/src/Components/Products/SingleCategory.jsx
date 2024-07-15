import "./singlecategory.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "@mui/system";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Loading from "../Layouts/Loading";
import { BiFilterAlt } from "react-icons/bi";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/Actions/productsActions";

const SingleCategory = () => {
  const [title, setTitle] = useState("All");

  const { loading, error, products } = useSelector((state) => state.products);

  const { cat } = useParams();

  const dispatch = useDispatch();

  const productFilter = [
    "All",
    "Price Low To High",
    "Price High To Low",
    "High Rated",
    "Low Rated",
  ];

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    dispatch(getProducts(cat));
  }, [cat, dispatch]);

  return (
    <>
      {loading ? (
        <Container
          maxWidth="xl"
          style={{
            marginTop: 10,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            paddingLeft: 10,
            paddingBottom: 20,
          }}
        >
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
        </Container>
      ) : (
        <Container
          maxWidth="xl"
          sx={{
            mt: 15,
            mb: 15,
            display: "flex",
            justifyContent: "start",
            flexDirection: "column",
            minHeight: "calc(100vh - 170px)",
          }}
        >
          {products?.length > 0 ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: "column",
                  mb: 4,
                }}
              >
                <Button endIcon={<BiFilterAlt />}>Filters</Button>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={title}
                  sx={{ width: 200 }}
                  onChange={(e) => handleChange(e)}
                >
                  {productFilter.map((prod) => (
                    <MenuItem key={prod} value={prod}>
                      {prod}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box
                maxWidth="xl"
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: 4,
                  placeItems: {
                    xs: "center",
                  },
                }}
              >
                {products.map((prod) => (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      width: "100%"
                    }}
                  >
                    <Link
                      to={`/product/type/${cat}/${prod._id}`}
                      key={prod._id}
                      style={{width:"100%"}}
                    >
                      <ProductCard prod={prod} />
                    </Link>
                  </Box>
                ))}
              </Box>
            </>
          ) : (
            <Container
              maxWidth="md"
              sx={{
                py: 4,
                minHeight: "calc(100vh - 224px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="https://cdn2.iconfinder.com/data/icons/oops-404-error/64/208_404-error-oops-page-browser-computer-512.png"
                alt="404 Error"
                style={{
                  color: "red",
                  width: "100%",
                  maxWidth: "212px",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  m: "0 auto",
                  textAlign: "center",
                  color: "#1976d2",
                  fontWeight: "bold",
                  "@media (max-width:1050px)": {
                    fontSize: "2.4rem",
                  },
                }}
              >
                {error}
              </Typography>
              <Button sx={{ mt: 10 }}>
                <Link
                  to="/"
                  style={{
                    display: "inline-block",
                    color: "red",
                    textDecoration: "none",
                    borderBottom: "2px solid red",
                  }}
                >
                  Go Back
                </Link>
              </Button>
            </Container>
          )}
        </Container>
      )}
    </>
  );
};

export default SingleCategory;

//
