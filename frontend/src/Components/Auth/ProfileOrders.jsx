import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Grid,
  useTheme,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../Redux/Actions/ordersActions";

const ProfileOrders = () => {
  const [errMessage, setErrMessage] = useState("");

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (error) {
      setErrMessage(error);
    }

    dispatch(getUserOrders());
  }, [dispatch, error]);

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
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginTop: 15,
          color: "#1976d2",
          "@media (max-width:1050px)": {
            mt: 10,
          },
        }}
      >
        My Orders
      </Typography>
      {errMessage ? (
        <Typography variant="body2" color="error">
          {errMessage}
        </Typography>
      ) : loading ? (
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order) => {
                  return (
                    <TableRow
                      key={order.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/profile/order/${order._id}`)}
                    >
                      <TableCell>{order._id}</TableCell>
                      <TableCell>
                        {new Date(Date.parse(order.createAt)).toLocaleString()}
                      </TableCell>
                      <TableCell>{`£${order.itemsPrice}`}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ProfileOrders;
