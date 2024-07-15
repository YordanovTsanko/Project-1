import {
  Alert,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchBar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length > 2) {
      const { data } = await axios.get(
        `/api/v1/product/search/${event.target.value}`
      );
      setFilteredData(data.products);
      console.log(data);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 5,
      }}
    >
      <TextField
        id="search"
        type="search"
        label="Search Products"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ width: { xs: 350, sm: 500, md: 800 } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AiOutlineSearch />
            </InputAdornment>
          ),
        }}
      />
      {searchTerm.length > 2 && (
        <Box
          sx={{
            width: { xs: 350, sm: 500, md: 800 },
            overflowY: filteredData?.length === 0 ? "hidden" : "scroll",
            height: filteredData?.length === 0 ? 40 : 200,
          }}
        >
          <Stack spacing={1}>
            {filteredData?.length === 0 ? (
              <Alert
                severity="error"
                sx={{
                  display: "flex",
                  alignItems:"center",
                  padding: 0,
                  pl: 2,
                  fontSize: "1.1rem",
                }}
              >
                Product Not Found.
              </Alert>
            ) : (
              filteredData &&
              filteredData.map((products) => (
                <Link to={`/product/type/${products.category}/${products._id}`} key={products._id}>
                  <Item
                    sx={{
                      borderRadius: 0,
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "2px 15px",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">
                      {" "}
                      {products.name.slice(0, 35)}
                    </Typography>
                    <img
                      src={products.img}
                      alt={products.name}
                      style={{ width: 55, height: 65 }}
                    />
                  </Item>
                </Link>
              ))
            )}
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default SearchBar;
