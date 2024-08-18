import React from "react";
import axios from "axios";
import { Button, Container, Grid, Skeleton, Typography } from "@mui/material";
import FilterProduct from "../Components/Products/FilterProduct";
import AdminNav from "../Components/AdminNav";
import SingleProductDisplay from "../Components/Products/SingleProductDisplay";
import SearchBar from "../../Layouts/SearchBar";

const AdminProductPage = () => {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [loadingA, setLoadingA] = React.useState(false);

  // Function to handle adding random products
  const handleAddRandomProducts = async () => {
    setLoadingA(true);
    try {
      const response = await axios.post("/api/v1/admin/random/products");
      alert(response.data.message);
    } catch (err) {
      console.error("Error adding products:", err);
    } finally {
      setLoadingA(false);
    }
  };

  // Fetch products when component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/v1/admin/products`);
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container
      component="main"
      sx={{
        width:"100%",
        minHeight: "calc(100vh - 224px)",
        pt: 1,
        "@media (min-width: 961px)": {
          pt: 0,
        },
      }}
    >
      <AdminNav />

      <Typography sx={{ mt: 3 }} variant="h2" align="center" gutterBottom>
        All Products
      </Typography>
      <Button
        sx={{ margin: "0 auto" }}
        variant="contained"
        color="error"
        onClick={handleAddRandomProducts}
        disabled={loadingA}
      >
        {loadingA ? "Adding Products..." : "Add 10 Products"}
      </Button>
      <FilterProduct />
      <SearchBar />
      {loading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <Grid container sx={{ mb: 10 }}>
          {products.map((product) => (
            <SingleProductDisplay product={product} key={product._id} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AdminProductPage;
