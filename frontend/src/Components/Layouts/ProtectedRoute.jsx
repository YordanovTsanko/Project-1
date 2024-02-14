import { CircularProgress, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (!loading && loading !== undefined ) {
    if (isAuthenticated) {
      return element;
    } else {
      return <Navigate to="/login" />;
    }
  } else {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 224px)",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }
};

export default ProtectedRoute;
