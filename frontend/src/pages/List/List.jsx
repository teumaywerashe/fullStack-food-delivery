import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

function List({url}) {
 
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
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
      const response = await axios.delete(`${url}/api/food/remove/${id}`);
      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
fetchList();
  }, [list]);

  

  return (
    <div className="add list flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length === 0 && <p>No foods available</p>}
        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img
              src={
                item.image ? `${url}/images/${item.image}` : "/placeholder.png"
              }
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p
              onClick={() => removeEventListenerHandler(item._id)}
              className="cursor"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
