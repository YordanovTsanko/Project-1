import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Chip,
  Rating,
  Grid,
  ButtonGroup,
  Skeleton,
} from "@mui/material";
import { MdAddShoppingCart } from "react-icons/md";
import {
  AiFillCloseCircle,
  AiOutlineLogin,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";
import { Transition } from "../Layouts/Handlers";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../Redux/Actions/productsActions";
import { addToCart } from "../../Redux/Actions/cartActions";

const ProductDetail = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const [openAlert, setOpenAlert] = useState(false);
  const { id, cat } = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(cat, id));
  }, [dispatch, id, cat]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setOpenAlert(true);
    } else {
      setOpenAlert(false);
      dispatch(addToCart(id));
    }
  };

  const shareProduct = async (product) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out this product: ${product.name}`,
          url: window.location.href,
        });
      } else {
        toast.error("Sharing is not supported on this device/browser.", {
          autoClose: 500,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`Error sharing product: ${error}`, {
        autoClose: 500,
        theme: "colored",
      });
    }
  };

  const increaseQuantity = () => {
    if (productQuantity < product.stock) {
      setProductQuantity((prev) => prev + 1);
    }else{
      toast.error(`Maximum available items in stock: ${product.stock}`, {
        autoClose: 1000,
        theme: "colored",
      });
    }
  };
  const decreaseQuantity = () => {
    setProductQuantity((prev) => prev - 1);
    if (productQuantity <= 1) {
      setProductQuantity(1);
    }
  };
  return (
    <>
      <Container maxWidth="xl">
        <Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenAlert(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
            <DialogContentText
              style={{ textAlign: "center" }}
              id="alert-dialog-slide-description"
            >
              Please Login To Proceed
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Link to="/login">
              {" "}
              <Button
                variant="contained"
                endIcon={<AiOutlineLogin />}
                color="primary"
              >
                Login
              </Button>
            </Link>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenAlert(false)}
              endIcon={<AiFillCloseCircle />}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <main className="main-content">
          {loading && loading !== undefined ? (
            <section
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Skeleton variant="rectangular" height={400} />
              <Skeleton variant="rectangular" height={200} width="200px" />
              <Skeleton variant="text" height={400} width={700} />
            </section>
          ) : error ? (
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
                  textAlign: "center",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                {error}
              </Typography>
            </Container>
          ) : (
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box style={{ marginTop: "32px" }}>
                    <img
                      alt={product.name}
                      src={product.img}
                      width="100%"
                      height="400px"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Chip
                    label={
                      product.price > 1000 ? "Upto 9% off" : "Upto 38% off"
                    }
                    variant="outlined"
                    sx={{
                      background: "#1976d2",
                      color: "white",
                      width: "150px",
                      fontWeight: "bold",
                      my: 2,
                    }}
                    style={{ margin: "0" }}
                  />
                  <Typography variant="h3">{product.name}</Typography>
                  <Typography>{product.description}</Typography>
                  <Rating
                    name="read-only"
                    value={4}
                    readOnly
                    precision={0.5}
                    style={{ marginTop: "20px" }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      "& > *": {
                        m: 1,
                      },
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <Button onClick={decreaseQuantity}>-</Button>
                        <Button>{productQuantity}</Button>
                        <Button onClick={increaseQuantity}>+</Button>
                      </ButtonGroup>
                      <div
                        style={{
                          display: "flex",
                          gap: 20,
                        }}
                      >
                        <Typography variant="h4" color="red">
                          <s>
                            {" "}
                            £
                            {product.price > 1000
                              ? product.price + 1000
                              : product.price + 100}
                          </s>{" "}
                        </Typography>
                        <Typography variant="h4" color="primary">
                          £{product.price}
                        </Typography>
                      </div>
                    </div>
                  </Box>
                  <div
                    style={{
                      display: "flex",
                      marginTop: 20,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Tooltip title="Add To Cart">
                      <Button
                        variant="contained"
                        sx={{ mr: 2 }}
                        startIcon={<MdAddShoppingCart />}
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                    </Tooltip>
                    <Tooltip title="Share">
                      <Button
                        variant="contained"
                        startIcon={<AiOutlineShareAlt />}
                        onClick={() => shareProduct(product)}
                      >
                        Share
                      </Button>
                    </Tooltip>
                  </div>
                </Grid>
              </Grid>

              <ProductReview
                isAuthenticated={isAuthenticated}
                id={id}
                setOpenAlert={setOpenAlert}
              />
            </Container>
          )}
        </main>
      </Container>
    </>
  );
};

export default ProductDetail;
