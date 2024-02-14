import React, { useEffect, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import styles from "./Chekout.module.css";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CheckoutForm = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    orderEmail: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
  });

  const isAnyFieldEmpty = () => {
    for (const field in shippingInfo) {
      if (shippingInfo[field] === "") {
        return true;
      }
    }
    return false;
  };

  const checkOutHandler = async (e) => {
    e.preventDefault();
    const anyFieldEmpty = isAnyFieldEmpty();
    if (anyFieldEmpty) {
      toast.error("Please fill all sections", {
        autoClose: 500,
        theme: "colored",
      });
    } else {
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
      navigate("/payment");
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setShippingInfo((prevShippingInfo) => ({
      ...prevShippingInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <>
      <Container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: 10,
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
          Shipping Details
        </Typography>
        <form
          noValidate
          autoComplete="off"
          className={styles.checkout_form}
          onSubmit={checkOutHandler}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={shippingInfo.firstName || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={shippingInfo.lastName || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Number"
                type="tel"
                name="phoneNumber"
                value={shippingInfo.phoneNumber || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  inputMode: 'numeric',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="orderEmail"
                value={shippingInfo.orderEmail || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={shippingInfo.address || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="city"
                value={shippingInfo.city || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="tel"
                label="Postal/Zip Code"
                name="zipCode"
                value={shippingInfo.zipCode || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Province/State"
                name="state"
                value={shippingInfo.state || ""}
                onChange={handleOnChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Container
            sx={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <Button
              variant="contained"
              endIcon={<BsFillCartCheckFill />}
              type="submit"
            >
              Go to Payment
            </Button>
          </Container>
        </form>
      </Container>
    </>
  );
};

export default CheckoutForm;
