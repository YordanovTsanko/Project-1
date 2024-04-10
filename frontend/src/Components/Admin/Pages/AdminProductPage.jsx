import React from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import { Container, Grid, Skeleton, Typography } from "@mui/material";
import FilterProduct from "../Components/Products/FilterProduct";
import AdminNav from "../Components/AdminNav";
import SingleProductDisplay from "../Components/Products/SingleProductDisplay";
import  SearchBar  from "../../Layouts/SearchBar";
const AdminProductPage = () => {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/v1/admin/products`);
      if (data.success) {
        setProducts(data.products);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <Container
      component="main"
      sx={{
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
      <FilterProduct />
      <SearchBar/>
      {loading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <Grid container sx={{mb:10}}>
          {products.map((product) => (
            <SingleProductDisplay product={product} key={product._id} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AdminProductPage;
