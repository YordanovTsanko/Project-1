import React from "react";
import axios from "axios";
import {
  Container,
  Skeleton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AdminNav from "../Components/AdminNav";

const AdminOrdersPage = () => {
  const [loading, setLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`/api/v1/admin/orders`);
        if (data.success) {
          setOrders(data.orders);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error (e.g., display an error message to the user)
      }
    }
    fetchData();
  }, []);

  return (
    <Container
      component="main"
      sx={{
        minHeight: "calc(100vh - 224px)",
        pt: 1,

        "@media (min-width: 961px)": {
          pt: 0,
        },
      }}
    >
      <AdminNav />
      <Typography sx={{ mt: 3 }} variant="h2" align="center" gutterBottom>
        All Orders
      </Typography>
      {loading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <TableContainer component={Paper} sx={{ mb: 10, mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1rem", fontWeight: 700 }}>Order ID</TableCell>
                <TableCell sx={{ fontSize: "1rem", fontWeight: 700 }}>User ID</TableCell>
                <TableCell sx={{ fontSize: "1rem", fontWeight: 700 }}>Total Amount</TableCell>
                <TableCell sx={{ fontSize: "1rem", fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontSize: "1rem", fontWeight: 700 }}>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order?._id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.user}</TableCell>
                  <TableCell>{order?.totalAmount}</TableCell>
                  <TableCell>{order?.status}</TableCell>
                  <TableCell>
                    {new Date(order?.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminOrdersPage;
