import {
  Container,
  Typography,
  Paper,
  TableContainer,
  CardMedia,
  Grid,
  CircularProgress,
  useTheme,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../Redux/Actions/ordersActions";

const SingleOrder = () => {
  const { id } = useParams();

  const theme = useTheme();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      setErrMessage(error);
    }
  }, [dispatch, error, id]);

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        minHeight: "calc(100vh - 224px)",
        [theme.breakpoints.up("md")]: {
          mt: 0,
        },
      }}
    >
      {loading ? (
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      ) : errMessage ? (
        <Typography variant="body2" color="error">
          {errMessage}
        </Typography>
      ) : (
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            mt: 15,
            mb: 15,
            "@media (max-width:1050px)": {
              mt: 10,
              mb: 10,
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
              "@media (max-width:610px)": {
                fontSize: "2rem",
              },
            }}
            gutterBottom
          >
            Order ID: {orderDetails?._id.slice(0, 4)}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              "@media (max-width:610px)": {
                fontSize: "1rem",
              },
            }}
            gutterBottom
          >
            Order status:{" "}
            <b style={{ color: "orange" }}>
              {orderDetails?.orderStatus.substring(0, 1).toUpperCase() +
                orderDetails?.orderStatus.substring(1)}
            </b>
          </Typography>
          <TableContainer>
            <Box
              sx={{
                "@media (min-width: 611px)": {
                  display: "block",
                },
                "@media (max-width: 610px)": {
                  display: "grid",
                  gap: 2,
                },
              }}
            >
              {orderDetails?.orderItems?.map((item) => (
                <Paper
                  key={item.product}
                  elevation={3}
                  sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    "@media (max-width: 610px)": {
                      display: "block",
                      padding: 2,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      "@media (max-width: 610px)": {
                        flexDirection: "column",
                        alignItems: "flex-start",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 110,
                        height: 110,
                        objectFit: "fill",
                        marginRight: 2,
                        borderRadius: 1,
                        "@media (max-width: 610px)": {
                          width: 80,
                          height: 80,
                          marginBottom: 1,
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        "@media (max-width: 610px)": {
                          textAlign: "left",
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          "@media (max-width: 610px)": {
                            fontSize: "0.6rem",
                          },
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          "@media (max-width: 610px)": {
                            fontSize: "0.9rem",
                          },
                        }}
                      >
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          "@media (max-width: 610px)": {
                            fontSize: "0.9rem",
                          },
                        }}
                      >
                        Price: £{item.price.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </TableContainer>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Total Price: £{orderDetails?.itemsPrice.toFixed(2)}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default SingleOrder;
