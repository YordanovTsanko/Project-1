import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Container,
  CssBaseline,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseCircle, AiOutlineLogin } from "react-icons/ai";
import CartCard from "../../Components/Cart/CartCard";
import "./Cart.css";
import { EmptyCart } from "../../Assets/Images/Image";
import { Transition } from "../../Components/Layouts/Handlers";
import { IoBagCheckOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeFromCart } from "../../Redux/Actions/cartActions";

const Cart = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);

  let shippingCoast = 20;
  const [cartTotal, setCartTotal] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const calculateTotal = () => {
      let sum;
      if (cartItems.length > 0) {
        sum = cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      }
      setCartTotal(sum);
    };
    calculateTotal();
  }, [cartItems]);

  useEffect(() => {
    if (!isAuthenticated) {
      setOpenAlert(true);
    } else {
      setOpenAlert(false);
      dispatch(getCart());
      setTotal((cartTotal + shippingCoast).toFixed(2));
    }
  }, [dispatch, isAuthenticated, shippingCoast, cartTotal]);

  const handleRemoveFromCart = async (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          minHeight: "calc(100vh - 224px)",
          pt: 1, 

          "@media (min-width: 961px)": {
            pt: 0, 
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            marginTop: 10,
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          Cart
        </Typography>
        {isAuthenticated && cartItems.length <= 0 && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="main-card">
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                Your Cart is Empty
              </Typography>
              <img
                src={EmptyCart}
                alt="Empty_cart"
                className="empty-cart-img"
              />
            </div>
          </Box>
        )}
        <Container
          sx={{ display: "flex", flexDirection: "column", mb: 10, mt: 8 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {cartItems.length > 0 &&
              cartItems.map((product) => (
                <CartCard
                  product={product}
                  key={product._id}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))}
          </Box>

          {cartItems.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Card
                sx={{
                  minWidth: { xs: "100%", sm: 550, md: 550, lg: 700 },
                  mt: 8,
                }}
              >
                <CardContent>
                  <Typography variant="div" component="h1">
                    Order Summary
                  </Typography>
                  <Typography variant="subtitle2">
                    <hr />
                  </Typography>
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="div"
                        color="primary"
                      >
                        Items Price
                      </Typography>
                      <Typography variant="h6" component="div" color="primary">
                        £{(total - shippingCoast).toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="div"
                        color="primary"
                      >
                        Shipping
                      </Typography>
                      <Typography variant="h6" component="div" color="primary">
                        £{shippingCoast.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="div"
                        color="primary"
                      >
                        Total
                      </Typography>
                      <Typography variant="h6" component="div" color="primary">
                        £{total}
                      </Typography>
                    </Box>
                  </Grid>
                </CardContent>
              </Card>
              <Link to="/checkout">
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<IoBagCheckOutline />}
                  color="primary"
                  sx={{
                    marginTop: {
                      xs: 5,
                      md: 0,
                    },
                  }}
                >
                  Checkout
                </Button>
              </Link>
            </Box>
          )}
        </Container>
      </Container>
      <Dialog
        open={openAlert}
        keepMounted
        onClose={() => {
          setOpenAlert(false);
          navigate("/");
        }}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          sx={{
            width: { xs: 280, md: 350, xl: 400 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5"> Please Login To Proceed</Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            endIcon={<AiOutlineLogin />}
            color="primary"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="error"
            endIcon={<AiFillCloseCircle />}
            onClick={() => {
              setOpenAlert(false);
              navigate("/");
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
