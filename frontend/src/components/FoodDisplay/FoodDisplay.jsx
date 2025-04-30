import React, { useContext, useEffect, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const [loading, setLoading] = useState(true);
  const { food_list } = useContext(StoreContext);

  useEffect(() => {
    if (food_list && food_list.length > 0) {
      setLoading(false);
    }
  }, [food_list]);

  return (
    <div className="food-display" id="food-display">
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <h2>Top dishes near you</h2>
          <div className="food-display-list">
            {food_list
              .filter(
                (item) => category === "All" || category === item.category
              )
              .map((item, index) => (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FoodDisplay;
