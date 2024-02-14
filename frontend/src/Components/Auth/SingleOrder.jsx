import {
  Container,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  CircularProgress,
  useTheme,
  Box,
  Avatar,
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
        mt: 15,
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
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Order ID: {orderDetails?._id.slice(0, 4)}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Order status:{" "}
            <b style={{ color: "orange" }}>
              {orderDetails?.orderStatus.substring(0, 1).toUpperCase() +
                orderDetails?.orderStatus.substring(1)}
            </b>
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetails?.orderItems?.map((item) => (
                  <TableRow key={item.product}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          src={item.image}
                          alt={item.name}
                          sx={{
                            width: 50,
                            height: 50,
                            marginRight: 1,
                            borderRadius: 0,
                          }}
                        />
                        <Typography variant="body1">{item.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{`£${item.price.toFixed(2)}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
