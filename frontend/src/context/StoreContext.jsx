import axios from "axios";
import { createContext, useState } from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [food_list, setFood_list] = useState([]);

  const navigate = useNavigate();
  const url =
    // import.meta.env.VITE_API_URL;

    "http://localhost:4000";

  const [searchTerm, setSearchTerm] = useState("");

  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState("");

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  useEffect(() => {
    async function loadData() {
      fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        // loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response.data.success) {
        setFood_list(response.data.foods);
      } else {
        toast.error("error", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodList();
    // console.log(food_list,"food_list");
  }, []);

  const addToCart = async (itemId) => {
    if (token) {
      if (!cartItem[itemId]) {
        setCartItem((pre) => ({ ...pre, [itemId]: 1 }));
      } else {
        setCartItem((pre) => ({ ...pre, [itemId]: pre[itemId] + 1 }));
      }
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    } else {
      if (window.confirm("to add to cart you are needed to login")) {
        setShowLogin(true);
      }
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
    try {
      const response = await axios.get(url + "/api/cart/get", {
        headers: { token },
      });
      if (response.data.success) {
        // console.log(response.data.cartData);
        setCartItem(response.data.cartData);
      } 
    } catch (error) {
      console.log(error);
    }
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
        totalAmount = totalAmount + Number(cartItem[item] * filtered?.price);
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
    url,
    fetchFoodList,
    showLogin,
    setShowLogin,
    logOut,loadCartData,
    searchTerm,
    setSearchTerm,
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
