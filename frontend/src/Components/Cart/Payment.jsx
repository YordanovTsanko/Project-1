import {
  Box,
  Button,
  Container,
  Divider,
  ListItemText,
  TextField,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiSecurePaymentFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../Redux/Actions/ordersActions";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const { cartItems, loading: cartLoading } = useSelector(
    (state) => state.cart
  );

  const [shippingInfo, setShippingInfo] = useState({});

  const [itemsTotalPrice, setItemsTotalPrice] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  let shippingPrice = 20;

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handlePayment = async () => {
    const order = {
      orderItems: cartItems,
      shippingInfo: shippingInfo,
      itemsPrice: itemsTotalPrice,
      taxPrice: (itemsTotalPrice * 0.2).toFixed(2),
      shippingPrice,
      withoutTaxPrice: (
        itemsTotalPrice -
        shippingPrice -
        (itemsTotalPrice * 0.2).toFixed(2)
      ).toFixed(2),
    };
    const orderPlaced = await dispatch(createOrder(order));

    if (orderPlaced?.success) {
      navigate("/order/placed");
    }
  };

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
    if (!loading) {
      if (isAuthenticated) {
        if (cartItems) {
          setItemsTotalPrice((cartTotal + shippingPrice).toFixed(2));
        }

        const storedShippingInfo = localStorage.getItem("shippingInfo");
        const parsedShippingInfo = storedShippingInfo
          ? JSON.parse(storedShippingInfo)
          : {};
        setShippingInfo(parsedShippingInfo);
        // Check if every value in shippingInfo is truthy (not an empty string)
        if (Object.values(parsedShippingInfo).every((value) => value !== "")) {
          return;
        }
        return navigate("/checkout");
      } else {
        return navigate("/login");
      }
    }
  }, [isAuthenticated, loading, shippingPrice, navigate, cartTotal, cartItems]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <div>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mt: 4,
            mb: 5,
            color: "#1976d2",
            fontWeight: "bold",
            "@media (max-width:1050px)": {
              mt: 2,
              fontSize: "2.4rem",
            },
          }}
        >
          Shipping Details
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <ListItem>
            <ListItemText primary="First Name" />
            <Typography variant="subtitle1">
              {shippingInfo && shippingInfo.firstName
                ? shippingInfo.firstName
                : ""}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Last Name" />
            <Typography variant="subtitle1">
              {shippingInfo && shippingInfo.lastName
                ? shippingInfo.lastName
                : ""}
            </Typography>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Email" />
            <Typography variant="subtitle1">
              {shippingInfo && shippingInfo.orderEmail
                ? shippingInfo.orderEmail
                : ""}
            </Typography>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Phone Number" />
            <Typography variant="subtitle1">
              {shippingInfo && shippingInfo.phoneNumber
                ? shippingInfo.phoneNumber
                : ""}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="City" />
            <Typography variant="subtitle1">
              {shippingInfo && shippingInfo.city ? shippingInfo.city : ""}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="State" />
            <Typography variant="subtitle1">
              {shippingInfo && shippingInfo.state ? shippingInfo.state : ""}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="ZIP/POST Code" />
            <Typography variant="subtitle1">
              {shippingInfo && shippingInfo.zipCode ? shippingInfo.zipCode : ""}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Address" />
            <Typography variant="subtitle1">
              {shippingInfo && shippingInfo.address ? shippingInfo.address : ""}
            </Typography>
          </ListItem>
        </Box>
      </div>
      <div>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mt: 5,
            mb: 5,
            color: "#1976d2",
            fontWeight: "bold",
            "@media (max-width:1050px)": {
              mt: 2,
              mb: 2,
              fontSize: "2.4rem",
            },
          }}
        >
          Order Summary
        </Typography>
        <List>
          {cartLoading ? (
            <></>
          ) : (
            cartItems.map((item) => (
              <React.Fragment key={item._id}>
                <ListItem>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ maxWidth: 90, marginRight: 10 }}
                  />
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity} x £${
                      item.price
                    } = £${(item.quantity * item.price).toFixed(2)}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          )}

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ListItem>
              <ListItemText primary="Items Price" />
              <Typography variant="subtitle1">
                £{" "}
                {(
                  itemsTotalPrice -
                  shippingPrice -
                  (itemsTotalPrice * 0.2).toFixed(2)
                ).toFixed(2)}
              </Typography>
            </ListItem>
            <Divider />

            <ListItem>
              <ListItemText primary="Tax" />
              <Typography variant="subtitle1">
                £ {(itemsTotalPrice * 0.2).toFixed(2)}
              </Typography>
            </ListItem>
            <Divider />

            <ListItem>
              <ListItemText primary="Shipping" />
              <Typography variant="subtitle1">
                £ {shippingPrice.toFixed(2)}
              </Typography>
            </ListItem>
            <Divider />

            <ListItem>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1">£ {itemsTotalPrice}</Typography>
            </ListItem>
          </Box>
        </List>
      </div>

      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mt: 5,
          mb: 5,
          color: "#1976d2",
          fontWeight: "bold",
          "@media (max-width:1050px)": {
            mt: 2,
            mb: 2,
            fontSize: "2.4rem",
          },
        }}
      >
        Payment Details
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          label="Card Name"
          variant="outlined"
          fullWidth
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <TextField
          label="Card Number"
          variant="outlined"
          fullWidth
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Expiry Date"
            variant="outlined"
            fullWidth
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <TextField
            label="CVC"
            variant="outlined"
            fullWidth
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<RiSecurePaymentFill />}
          onClick={handlePayment}
        >
          Pay Now
        </Button>
      </Box>
    </Container>
  );
};

export default Payment;
