import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import "./products.css";
import { useNavigate } from "react-router-dom";
const SingleProductDisplay = ({ product }) => {

const navigate = useNavigate()

function handleOnClick(){
    navigate(`/admin/product/${product._id}`)
}

  return (
    <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} onClick={handleOnClick}>
      <Card sx={{ p: 2, mt:2 }} className="single-card">
        <CardMedia
          component="img"
          height="170"
          width="100%"
          image={product.img}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom className="single-line">
            {product.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Category: {product.category}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Stock: {product.stock}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SingleProductDisplay;
