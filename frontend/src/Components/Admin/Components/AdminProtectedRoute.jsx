import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  // Display a loading spinner or message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if the user is authenticated and has the 'admin' role
  if (user && user.role === "admin") {
    return <Outlet />;
  }
  
  return <Navigate to="/" replace />;
};

export default AdminProtectedRoute;
