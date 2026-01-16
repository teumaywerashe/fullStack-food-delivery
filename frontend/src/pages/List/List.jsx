import React, { useState, useEffect, useContext } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { FiEdit, FiTrash } from "react-icons/fi";

function List() {
  const { url } = useContext(StoreContext);

  const [loading, setLoading] = useState(false);

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data) {
        setList(response.data.foods);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Failed to fetch food list");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const removeEventListenerHandler = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove/${id}`);
      if (response.data.success) {
        toast.success(response.data.msg);
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
  }, []);

  return (
    <div className="list flex-col">
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
        {loading ? (
          <div className="loading-container">
            <span className="loading-text">Loading</span>
          </div>
        ) : list.length === 0 ? (
          <p>No foods available</p>
        ) : (
          list.map((item) => (
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
                <FiEdit
                  size={20}
                  onClick={() => {
                    console.log("edit clicked");
                  }}
                  className="edit"
                />
                <FiTrash
                  size={20}
                  onClick={() => removeEventListenerHandler(item._id)}
                  className="delete"
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default List;
