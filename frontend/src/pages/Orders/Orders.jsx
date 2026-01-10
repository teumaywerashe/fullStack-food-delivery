import React, { useContext } from "react";
import "./Orders.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { token ,url} = useContext(StoreContext);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list", {
      headers: { token },
    });
    if (response.data.success) {
      console.log(response.data.data);
      setOrders(response.data.data);
    } else {
      // toast.error("error");
    }
    console.log(response.data);
  };



  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: e.target.value,
      },{headers:{token}});
      console.log(response.data);
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllOrders();
    console.log(orders);
  });
  return (
    <div className="orders-page">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length) {
                      return item.name + "x" + item.quantity;
                    } else {
                      return item.name + "x" + item.quantity + ",";
                    }
                  })}
                </p>
                <div className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </div>
                <div className="order-item-address">
                  <p>
                    {order.address.street +
                      "," +
                      order.address.city +
                      "," +
                      order.address.state +
                      "," +
                      order.address.country +
                      "," +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items:{order.items.length}</p>
              <p>${order.amount}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="food processing">food processing</option>
                <option
                  value="Out 
              For Delivery"
                >
                  Out For Delivery
                </option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <div className="no-orders">
            <h3>No Orders Found</h3>
            <p>Looks like you have not received any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
