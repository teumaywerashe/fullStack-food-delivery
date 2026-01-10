import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import "react-phone-input-2/lib/style.css";
import { StoreContext } from "../../context/StoreContext";

import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { getTotalAmount, token, food_list, cartItem, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const PlaceOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];
    {
      food_list.map((item) => {
        if (cartItem[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItem[item._id];
          orderItems.push(itemInfo);
        }
      });
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalAmount() + 2,
      };

      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      console.log(response.data);
      if (response.data.success) {
        const { checkout_url } = response.data;
        window.open(checkout_url, "_blank");
      } else {
        alert("Payment initialization failed");
      }
    }
  };

  useEffect(() => {
    if (!token || getTotalAmount() === 0) {
      if (!token) {
        alert("Please login first");
      } else {
        alert("Your cart is empty. Please add items to cart first");
      }

      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={PlaceOrder} type="submit" className="place-order">
      <div className="place-order-left">
        <p className="title">Delvery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            type="text"
            value={data.firstName}
            placeholder="first name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            placeholder="last name"
            type="text"
            value={data.lastName}
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          type="email"
          value={data.email}
          placeholder="email adress"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={data.street}
          placeholder="street"
          type="text"
        />
        <div className="multi-fields">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            type="text"
            value={data.city}
            placeholder="city "
          />
          <input
            required
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            placeholder="state"
            type="text"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            type="text"
            value={data.zipcode}
            placeholder="Zip code "
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            placeholder="country"
            value={data.country}
            type="text"
          />
        </div>
        <input
          required
          type="text"
          placeholder="phone number"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Dalivery Fee</p>
              <p>${getTotalAmount() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalAmount() > 0 ? getTotalAmount() + 2 : 0}</b>
            </div>
          </div>
          <button>proceed to payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
