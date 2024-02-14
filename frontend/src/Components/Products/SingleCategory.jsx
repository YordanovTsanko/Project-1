import "./singlecategory.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "@mui/system";
import {
  Box,
  Button,
  MenuItem,
  FormControl,
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
                    sm: "repeat(5, 1fr)",
                  },
                  gap: 2,
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
                    }}
                  >
                    {" "}
                    <Box sx={{ minWidth: 140 }}>
                      <FormControl sx={{ width: 140 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
                            width: "80vw",
                          }}
                        ></Box>
                      </FormControl>
                    </Box>
                    <Link
                      to={`/product/type/${cat}/${prod._id}`}
                      key={prod._id}
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
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  m: "0 auto",
                  textAlign: "center",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                {error}
              </Typography>
            </Container>
          )}
        </Container>
      )}
    </>
  );
};

export default SingleCategory;

//
