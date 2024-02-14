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

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
    case GET_CART_REQUEST:
    case REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };

    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };
      case REMOVE_FROM_CART_SUCCESS:
        return{
          ...state,
          loading: false
        }
    case ADD_TO_CART_FAIL:
    case GET_CART_FAIL:
    case REMOVE_FROM_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
