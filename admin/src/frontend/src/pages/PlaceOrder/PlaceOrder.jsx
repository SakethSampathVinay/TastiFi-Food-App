import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure correct import
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

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

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item }; // Create a copy to avoid mutating the original object
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      });

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      };

      const token = localStorage.getItem("token");
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.href = session_url; // Redirect user to Stripe checkout
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error in placeOrder:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized! Please log in again.");
        window.location.replace("/login");
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount()]);

  return (
    <div>
      <form className="place-order" onSubmit={placeOrder}>
        <div className="place-order">
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <input
                required
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                placeholder="First name"
              />
              <input
                required
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                placeholder="Last name"
              />
            </div>
            <input
              required
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="text"
              placeholder="Email address"
            />
            <input
              required
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              type="text"
              placeholder="Street"
            />
            <div className="multi-fields">
              <input
                required
                name="city"
                onChange={onChangeHandler}
                value={data.city}
                type="text"
                placeholder="City"
              />
              <input
                required
                name="state"
                onChange={onChangeHandler}
                value={data.state}
                type="text"
                placeholder="State"
              />
            </div>
            <div className="multi-fields">
              <input
                required
                name="zipcode"
                onChange={onChangeHandler}
                value={data.zipcode}
                type="text"
                placeholder="Zip Code"
              />
              <input
                required
                name="country"
                onChange={onChangeHandler}
                value={data.country}
                type="text"
                placeholder="Country"
              />
            </div>
            <input
              required
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              type="text"
              placeholder="Phone"
            />
          </div>
          <div className="place-order-right">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>₹{getTotalCartAmount()}</p>
                </div>
                <div className="cart-total-details">
                  <p>Delivery</p>
                  <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />

                <div className="cart-total-details">
                  <p>Total</p>
                  <p>
                    ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                  </p>
                </div>
                <button type="submit">PROCEED TO PAYMENT</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
