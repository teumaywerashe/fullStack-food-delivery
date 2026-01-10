import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const { cartItem,token, food_list, removeFromCart,loadCartData, url, getTotalAmount } =
    useContext(StoreContext);
   useEffect(()=>{
    loadCartData(token)
    // console.log("cart Item",cartItem)
   })
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={index}>
                <div key={index} className="cart-items-item cart-items-title">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-botton">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalAmount()>0?getTotalAmount():0}</p>
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
          <button onClick={() => navigate("/order")}>
            proceed to checkout
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>if you have promo code, enter it here </p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
