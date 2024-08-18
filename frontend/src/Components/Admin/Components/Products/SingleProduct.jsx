import React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
  ButtonGroup,
  Fab,
  Paper,
  Skeleton,
} from "@mui/material";
import AdminNav from "../AdminNav";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState({});

  const handleDeleteProduct = async (productId) => {
    await axios
      .delete(`/api/v1/admin/product/delete/${productId}`)
      .then(() => {
        navigate("/admin/products");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  React.useEffect(() => {
    axios
      .get(`/api/v1/admin/product/${id}`)
      .then((response) => {
        setProduct(response.data.product);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <Container
      component="main"
      sx={{
        minHeight: "calc(100vh - 224px)",
        pt: 1,
        "@media (min-width: 961px)": { pt: 0 },
      }}
    >
      <AdminNav />
      {!loading && product ? (
        <>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" align="center">
                    <img
                      src={product?.img}
                      alt={product?.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        marginTop: "10px",
                      }}
                    />
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        width: { xs: "90%", md: "50%" },
                        mx: "auto",
                        mt: 3,
                      }}
                    >
                      {product?.name}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" gutterBottom>
                      <b>Product ID:</b> {product?._id}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" gutterBottom>
                      <b>Description:</b> {product?.description}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" gutterBottom>
                      <b> Price:</b> ${product?.price}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" gutterBottom>
                      <b>Stock:</b> {product?.stock}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" gutterBottom>
                      <b>Ratings:</b> {product?.rating}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <ButtonGroup
            sx={{
              mt: 5,
              mb: 10,
              gap: 5,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Fab color="primary" aria-label="edit">
              <EditIcon />
            </Fab>
            <Button
              variant="outlined"
              color="error"
              onClick={()=>handleDeleteProduct(product._id)}
            >
              Delete Product
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <Skeleton variant="rectangular" height={400} />
      )}
    </Container>
  );
};

export default SingleProduct;
