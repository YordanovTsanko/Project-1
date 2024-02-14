import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../Constants/ordersConstants"; 
import { toast } from "react-toastify";

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", orderData, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });

    // Clear the cart after successfully creating the order
    await axios.put("/api/v1/order/clear/cart");

   

    toast.success("Order created successfully", {
      autoClose: 500,
      theme: "colored",
    });

    return data
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getUserOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/orders");

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload:
        error.response && error.response.data.errMessage
          ? error.response.data.errMessage
          : error.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${orderId}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
