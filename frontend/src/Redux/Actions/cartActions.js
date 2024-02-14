import axios from "axios";
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
} from "../Constants/cartConstants";
import { toast } from "react-toastify";

export const getCart = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });

    const { data } = await axios.get("/api/v1/cart");

    dispatch({
      type: GET_CART_SUCCESS,
      payload: data.cart,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addToCart = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });

   const {data} = await axios.put(`/api/v1/cart/add/${productId}`);
  

    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: data.cart,
    });

    toast.success("Product added to the card", {
      autoClose: 500,
      theme: "colored",
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

export const removeFromCart = (productId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FROM_CART_REQUEST });

    const cart = await axios.delete(
      `/api/v1/cart/delete/${productId}`
    );
    toast.success("Removed From Cart", {
      autoClose: 500,
      theme: "colored",
    });

    dispatch({
      type: REMOVE_FROM_CART_SUCCESS,
    });
    dispatch({
      type: GET_CART_SUCCESS,
      payload: cart.data.cart,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: REMOVE_FROM_CART_FAIL,
      payload: error.response.data.errMessage,
    });
    toast.error(error.response.data.errMessage, {
      autoClose: 500,
      theme: "colored",
    });
  }
};
