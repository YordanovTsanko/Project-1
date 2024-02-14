import axios from "axios";
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../Constants/productsConstants";

export const getProducts = (cat) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });
  
    const { data } = await axios.get(`/api/v1/products/${cat}`);

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

export const getProductDetails = (cat, id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/products/${cat}/${id}`);

    dispatch({
      type: GET_PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_DETAILS_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
