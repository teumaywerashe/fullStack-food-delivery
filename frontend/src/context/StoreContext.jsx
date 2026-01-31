import axios from "axios";
import { createContext, useState } from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const navigate = useNavigate();
  const url =
  //  import.meta.env.VITE_API_URL;

  "http://localhost:4000";

  const [showLogin, setShowLogin] = useState(false);
  const [food_list, setFood_list] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItem, setCartItem] = useState({});
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [isLoading, setIsLoading] = useState(false);

  const [menulistData, setMenuListData] = useState([]);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    localStorage.removeItem("userId");
    setUserId(null);
    navigate("/");
  };
  useEffect(() => {
    async function loadData() {
      fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
        await getAllNotification();

      }
    }
    loadData();
  }, []);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/food/list");
      if (response.data.success) {
        setFood_list(response.data.foods);
        setMenuListData([
          ...new Set(response.data.foods.map((food) => food.category)),
        ]);
      } else {
        toast.error("error", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  const addToCart = async (itemId) => {
    if (token) {
      if (!cartItem[itemId]) {
        setCartItem((pre) => ({ ...pre, [itemId]: 1 }));
      } else {
        setCartItem((pre) => ({ ...pre, [itemId]: pre[itemId] + 1 }));
      }
      await axios.post(
        url + "/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } },
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
      await axios.delete(url + "/cart/remove", {
        data: { itemId },
       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(url + "/cart/get", {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
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
const getNotification = async (id) => {
    if (!id) id===userId;
    try {
        const response = await axios.get(`${url}/notification/${id}`);
     
        if (response.data.success) {
            setNotification(response.data.notification);
        }
    } catch (error) {
        console.log("Error fetching notifications:", error);
    }
};

const markAsRead = async (id) => {
    try {
        const response = await axios.patch(`${url}/notification/${id}`, {});
        if (response.data.success) {
          
            setNotification((prev) => 
                prev.map((n) => n._id === id ? { ...n, isRead: true } : n)
            );
        }
    } catch (error) {
        console.log("Error marking as read:", error);
    }
};

const deleteNotification = async (id) => {
    try {
        const response = await axios.delete(`${url}/notification/${id}`);
        if (response.data.success) {
         
            setNotification((prev) => prev.filter((n) => n._id !== id));
        }
    } catch (error) {
        console.log("Error deleting notification:", error);
    }
};

  const getAllNotification = async () => {
    try {
      const response = await axios.get(`${url}/notification`);
      if (response.data.success) {
        setNotification(response.data.notification);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${url}/user`);
      if (response.data.success) {
        return setUsers(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url + "/order/list", {
     headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      if (response.data.success) {
        console.log(response.data.data);
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log("something goes wrong", error);
      toast.error("something goes wrong");
    } finally {
      setIsLoading(false);
    }
  };


  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    getAllUsers,menulistData,
    removeFromCart,
    getTotalAmount,
    getTotalCart,
    url,
    users,
    isLoading,
    setIsLoading,
    fetchFoodList,
    showLogin,
    setShowLogin,
    orders,
    setOrders,
    logOut,
    markAsRead,
    loadCartData,
    showNotification,
    setShowNotification,
    searchTerm,
    setSearchTerm,
    token,
    setToken,
    notification,
    setNotification,
    getNotification,
   
    deleteNotification,
    userId,
    setUserId,
    fetchAllOrders,
    getAllNotification,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
