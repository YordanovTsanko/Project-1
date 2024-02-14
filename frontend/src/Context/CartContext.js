import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    orderEmail: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
  });

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCart = async () => {
      if (!loading) {
        try {
          if (isAuthenticated) {
            const cartData = await axios.get("/api/v1/cart");
            setCart(cartData.data.cart);
          } else {
            setCart([]);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };

    fetchCart();
  }, [isAuthenticated, loading]);

  return (
    <CartContext.Provider
      value={{ cart, setCart, shippingInfo, setShippingInfo }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
