import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { authReducer, userReducer } from "./Redux/Reducers/authReducer";
import { productDetailsReducer, productsReducers } from "./Redux/Reducers/productsReducer";
import { ordersReducer } from "./Redux/Reducers/ordersReducer";
import { cartReducer } from "./Redux/Reducers/cartReducer";
import { reviewsReducer } from "./Redux/Reducers/reviewsReducer";

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  products: productsReducers,
  productDetails: productDetailsReducer,
  orders: ordersReducer,
  cart: cartReducer,
  reviews: reviewsReducer,
});

const initialState = {};

const middleware = [thunk, createSagaMiddleware()];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;


