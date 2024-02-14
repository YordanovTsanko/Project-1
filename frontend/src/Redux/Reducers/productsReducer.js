import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../Constants/productsConstants";

export const productsReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
