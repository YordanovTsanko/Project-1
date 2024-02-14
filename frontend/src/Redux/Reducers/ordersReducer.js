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

const initialState = {
  orders: [],
  orderDetails: null,
  loading: true,
  error: null,
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case MY_ORDERS_REQUEST:
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload,
      };
    case CREATE_ORDER_FAIL:
    case MY_ORDERS_FAIL:
    case ORDER_DETAILS_FAIL:
      return {
        ...state,
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
