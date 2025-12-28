import axios from "axios";
import { createContext, useState } from "react";

import { useEffect } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFood_list] = useState([]);
  const url = "http://localhost:3000";

  const [searchTerm,setSearchTerm]=useState('')

  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState("");
  useEffect(() => {
    async function loadData() {
      fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFood_list(response.data.foods);
    // console.log(response.data.foods);
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((pre) => ({ ...pre, [itemId]: 1 }));
    } else {
      setCartItem((pre) => ({ ...pre, [itemId]: pre[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItem((pre) => ({ ...pre, [itemId]: pre[itemId] - 1 }));

    if (token) {
      await axios.delete(url + "/api/cart/remove", {
        data: { itemId },
        headers: { token },
      });
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.get(url + "/api/cart/get", {
      headers: { token },
    });
    setCartItem(response.data.cartData);
  };
  const getTotalCart = () => {
    let totalcart = 0;
    for (let item in cartItem) {
      totalcart += cartItem[item];
    }
    return totalcart;
  };
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (let item in cartItem) {
      if (cartItem[item] > 0) {
        const filtered = food_list.find((product) => product._id === item);
        totalAmount = totalAmount + cartItem[item] * filtered.price;
      }
    }
    return totalAmount;
  };
  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalAmount,
    getTotalCart,
    url,searchTerm,setSearchTerm,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
