import React from "react";
import "./Add.css";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../src/assets/assets";
function Add({ url }) {
  const [image, setImage] = useState(false);
  const [data, setDate] = useState({
    name: "",
    price: "",
    category: "Salad",
    description: "",
  });
  const onChangeEventHandler = (e) => {
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
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setDate({
        name: "",
        price: "",
        category: "Salad",
        description: "",
      });
      setImage(false);
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  };
  return (
    <div className="add">
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
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
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
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Add;
