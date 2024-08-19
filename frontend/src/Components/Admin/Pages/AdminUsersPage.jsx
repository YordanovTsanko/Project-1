import React from "react";
import axios from "axios";
// import { toast } from "react-toastify";
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

const AdminUsersPage = () => {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/v1/admin/users`);
      if (data.success) {
        setUsers(data.users);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <Container
      component="main"
      sx={{
        minHeight: "calc(100vh - 224px)",
        pt: 5,

        "@media (min-width: 961px)": {
          pt: 0,
        },
      }}
    >
      <AdminNav />
      <Typography sx={{ mt: 3 }} variant="h2" align="center" gutterBottom>
        All Users
      </Typography>
      {loading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <TableContainer component={Paper} sx={{mb:10, mt:4}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontSize:"1rem" , fontWeight:700}}>First Name</TableCell>
                <TableCell sx={{fontSize:"1rem" , fontWeight:700}}>Last Name</TableCell>
                <TableCell sx={{fontSize:"1rem" , fontWeight:700}}>Email</TableCell>
                <TableCell sx={{fontSize:"1rem" , fontWeight:700}}>Phone Number</TableCell>
                <TableCell sx={{fontSize:"1rem" , fontWeight:700}}>Role</TableCell>
                <TableCell sx={{fontSize:"1rem" , fontWeight:700}}>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 && users.map((user) => (
                <TableRow
                  key={user?._id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>{user?.firstName}</TableCell>
                  <TableCell>{user?.lastName}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.phoneNumber}</TableCell>
                  <TableCell>{user?.role}</TableCell>
                  <TableCell>
                    {new Date(user?.createdAt).toLocaleString()}
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

export default AdminUsersPage;
