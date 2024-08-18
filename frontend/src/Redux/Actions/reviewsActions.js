import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  GET_PRODUCT_REVIEWS_REQUEST,
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_PRODUCT_REVIEWS_FAIL,
  CLEAR_ERRORS,
  EDIT_REVIEW_REQUEST,
  EDIT_REVIEW_SUCCESS,
  EDIT_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../Constants/reviewsConstants";

export const createReview = (reviewData) => async (dispatch) => {
  // { rating, comment, productId } = req.body/reviewData
  try {
    dispatch({ type: CREATE_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/v1/review/new`, reviewData, config);

    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload:
        error.response.data.errMessage ||
        "Something went wrong while creating the review.",
    });
  }
};

export const getProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/v1/review/${productId}`);

    dispatch({
      type: GET_PRODUCT_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_REVIEWS_FAIL,
      payload:
        error.response.data.errMessage || "Failed to fetch product reviews.",
    });
  }
};
export const editReview = (newData, reviewId) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/review/edit/${reviewId}`,
      newData,
      config
    );
    dispatch({
      type: EDIT_REVIEW_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_REVIEW_FAIL,
      payload: error.response.data.errMessage || "Failed to edit the review!",
    });
  }
};
export const deleteReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(`/api/v1/review/delete/${productId}`);
   console.log(data.review._id)
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.review._id,
    });

    toast.success(data.message, {
      autoClose: 500,
      theme: "colored",
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.errMessage || "Failed to delete the review!",
    });
  }
};

// Action to clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
