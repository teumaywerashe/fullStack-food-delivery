import React, { useState, useEffect, useContext } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { FiTrash } from "react-icons/fi";

function List() {
  const { url } = useContext(StoreContext);

  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/food/list`);
      if (response.data) {
        setList(response.data.foods);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Failed to fetch food list");
      console.error(error);
    }
  };
  const removeEventListenerHandler = async (id) => {
    try {
      const response = await axios.delete(`${url}/food/remove/${id}`);
      if (response.data.success) {
        toast.success(response.data.msg);
        fetchList();
      } else {
        // toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      fetchList();
    }
  };
  useEffect(() => {
    fetchList();
  }, [list]);

  return (
    <div className="list flex-col">
      <>
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Available quantity</b>
            <b>Action</b>
          </div>
          {list.length === 0 && <p>No food items available.</p>}
          {list.map((item) => (
            <div key={item._id} className="list-table-format">
              <img
                src={
                  item.image
                    ? `${url}/images/${item.image}`
                    : "/placeholder.png"
                }
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
              <button className="cursor">
                <FiTrash
                  size={20}
                  onClick={() => removeEventListenerHandler(item._id)}
                  className="delete"
                />
              </button>
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export default List;
