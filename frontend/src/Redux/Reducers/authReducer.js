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
  PROFILE_UPDATE_RESET,
  PASSWORD_UPDATE_RESET,
  CLEAR_ERRORS,
} from "../Constants/authConstants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
    case LOGOUT_REQUEST:
      return { loading: true, isAuthenticated: false };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        message: action.payload,
      };
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOAD_USER_FAIL:
    case LOGOUT_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return { ...state, message: null, error: null };
    default:
      return state;
  }
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
    case PASSWORD_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_UPDATE_SUCCESS:
    case PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case PROFILE_UPDATE_RESET:
    case PASSWORD_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case PROFILE_UPDATE_FAIL:
    case PASSWORD_UPDATE_FAIL:
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
