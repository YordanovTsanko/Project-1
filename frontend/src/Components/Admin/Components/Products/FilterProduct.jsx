import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  FormGroup,
  InputLabel,
} from "@mui/material";

const FilterProduct = () => {
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "price_high", label: "Price (Higher)" },
    { value: "price_low", label: "Price (Lower)" },
    { value: "rating_high", label: "Rating (Higher)" },
    { value: "rating_low", label: "Rating (Lower)" },
    { value: "comments_high", label: "Comments (Higher)" },
    { value: "comments_low", label: "Comments (Lower)" },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "clothes", label: "Clothes" },
    { value: "shoes", label: "Shoes" },
    { value: "electronics", label: "Electronics" },
    // Add more categories as needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Box>
      <FormGroup
        onSubmit={handleSubmit}
        sx={{ display: "flex" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.32)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.32)",
            paddingBottom: 2,
            paddingTop: 2,
            marginBottom: 2,
            marginTop: 2,
          }}
        >
          <Typography variant="h5" letterSpacing={5}>
            Filter
          </Typography>
          <FormControl sx={{ width: 240 }}>
            <InputLabel htmlFor="sort-by-select">Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              displayEmpty
              inputProps={{ id: "sort-by-select" }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 240 }}>
            <InputLabel htmlFor="category-select">Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              inputProps={{ id: "category-select" }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Apply Filters
          </Button>
        </Box>
      </FormGroup>
    </Box>
  );
};

export default FilterProduct;
