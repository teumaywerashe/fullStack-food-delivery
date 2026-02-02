import React, { useContext } from "react";
import "./Add.css";

import { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

function Add() {
  const [image, setImage] = useState(false);

  const [added, setAdded] = useState(null);

  const { token, url } = useContext(StoreContext);
  const [data, setDate] = useState({
    name: "",
    price: "",
    category: "Salad",
    description: "",
    quantity: "",
  });
  const onChangeEventHandler = (e) => {
    setAdded(null);
    const name = e.target.name;
    const value = e.target.value;
    setDate({ ...data, [name]: value });
  };

  const onSubmitEventListener = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData, {
      headers: { token },
    });
    if (response.data.success) {
      setAdded("Added!");
      setDate({
        name: "",
        price: "",
        category: "Salad",
        description: "",
        quantity: "",
      });
      setImage(false);
      // toast.success(response.data.msg);
      // navigate("/admin/list");
    } else {
      // toast.error(response.data.msg);
      setAdded("Error Adding");
    }
  };
  return (
    <div className="add-page">
      <form className="flex-col" onSubmit={onSubmitEventListener}>
        <div className="flex-col add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            required
            hidden
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={(e) => {
              onChangeEventHandler(e);
            }}
            value={data.name}
            type="text"
            name="name"
            placeholder="name"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={(e) => onChangeEventHandler(e)}
            name="description"
            rows="6"
            required
            value={data.description}
            placeholder="write content here"
            id=""
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={(e) => onChangeEventHandler(e)}
              name="category"
              id=""
            >
              <option value="Salad">Festing Food(Yetsom)</option>
              <option value="Rolls">Normal Food(Yefisg)</option>
              <option value="Deserts">Hot Drink</option>
              <option value="Sandwitch">Soft Drink</option>
              <option value="Cake">Alcohol</option>
              <option value="Pure Veg">Fresh Food</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={(e) => onChangeEventHandler(e)}
              value={data.price}
              name="price"
              type="number"
              placeholder="$20"
              required
            />
          </div>
          <div className="add-price flex-col">
            <p>Available product</p>
            <input
              onChange={(e) => onChangeEventHandler(e)}
              value={data.quantity}
              name="quantity"
              type="number"
              placeholder="120"
              required
            />
          </div>
        </div>
        <button
          onClick={() => {
            setAdded("Adding...");
          }}
          type="submit"
          className="add-btn"
        >
          {added ? added : "ADD"}
        </button>
      </form>
    </div>
  );
}

export default Add;
