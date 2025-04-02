import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:8081/food/";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [cartItems, setCartItems] = useState([]);
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    const userId = token;
    const foodId = itemId;
    const quantity = 1;

    try {
      const response = await axios.post(url + "cart", {
        userId,
        foodId,
        quantity,
      });

      if (response.data.code) {
        alert("Added to cart successfully");
      } else {
        console.error("Error adding to cart");
      }
    } catch (error) {
      console.error("Error with the request:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    console.log(itemId);
    try {
      await axios.delete(`${url}cart/removeCartItem/${itemId}`);
      alert("removed");
    } catch (error) {
      console.error("Error remove item");
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    // Duyệt qua từng phần tử trong cartItems
    for (const item of cartItems) {
      // Tính tiền của món này (giá x số lượng)
      totalAmount += item.food.price * item.quantity;
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}foods`);
      setFoodList(response.data.result);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };
  console.log(food_list);
  const loadCartData = async () => {
    if (token) {
      // Kiểm tra nếu token có giá trị hợp lệ
      try {
        const response = await axios.get(`${url}cart/${token}`);
        setCartItems(response.data.result);
      } catch (error) {
        console.error("Error loading cart data", error);
      }
    } else {
      console.error("Token is missing");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchFoodList(); // Nếu có token, đặt nó vào state
    }
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    loadCartData,
    url,
    setToken,
    token,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
