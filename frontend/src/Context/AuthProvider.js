import React, { createContext, useEffect } from "react";
import { loadUser, clearErrors } from "../Redux/Actions/authActions";
import { useDispatch, useSelector } from "react-redux";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log(error);
    dispatch(loadUser());
  }, [dispatch, error]);
  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
