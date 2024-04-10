import React from "react";
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const AdminProductPage = ({ productInfo, setProductInfo }) => {
  const handleOnchange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  //   const deleteProduct = async () => {};
  const categoryDropdown = [
    "shoe",
    "woman cloths",
    "man cloths",
    "electronics",
    "jewelry",
    "gym accessories",
  ];

  return (
    <>
      <Container sx={{ width: "100%", marginBottom: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={productInfo.name}
              onChange={handleOnchange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image"
              name="img"
              value={productInfo.img}
              onChange={handleOnchange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              type="number"
              name="price"
              value={productInfo.price}
              onChange={handleOnchange}
              variant="outlined"
              fullWidth
              inputProps={{
                style: {
                  MozAppearance: "textfield",
                  WebkitAppearance: "textfield",
                  appearance: "textfield",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock"
              type="number"
              name="stock"
              value={productInfo.stock}
              onChange={handleOnchange}
              variant="outlined"
              fullWidth
              inputProps={{
                style: {
                  MozAppearance: "textfield",
                  WebkitAppearance: "textfield",
                  appearance: "textfield",
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productInfo.category}
                label="Category"
                name="category"
                onChange={handleOnchange}
              >
                {categoryDropdown.map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ margin: "10px auto" }}>
            <TextField
              id="filled-textarea"
              value={productInfo.description}
              onChange={handleOnchange}
              label="Description"
              multiline
              sx={{ width: "100%" }}
              variant="outlined"
              name="description"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminProductPage;
