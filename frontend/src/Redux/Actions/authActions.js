import axios from "axios";
import { toast } from "react-toastify";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  CLEAR_ERRORS,
} from "../Constants/authConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/register", userData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.message,
    });
    return data
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.errMessage || "Error",
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/isloggedin");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    await axios.post("/api/v1/logout");

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

//profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fixedData = (({ id, ...rest }) => rest)(userData);

    const { data } = await axios.put(
      `/api/v1/user/edit/${userData.id}`,
      fixedData,
      config
    );
    dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data.success });
    toast.success("Profile Updated", {
      autoClose: 500,
      theme: "colored",
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.errMessage, {
      autoClose: 500,
      theme: "colored",
    });
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

export const updatePassword = (userData, password) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(
      `/api/v1/user/edit/${userData.id}`,
      password,
      config
    );
    dispatch({ type: PASSWORD_UPDATE_SUCCESS, payload: response.data.success });
    toast.success(response.data.message, {
      autoClose: 500,
      theme: "colored",
    });
  } catch (error) {
    toast.error(error.response.data.errMessage, {
      autoClose: 500,
      theme: "colored",
    });
    dispatch({
      type: PASSWORD_UPDATE_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
