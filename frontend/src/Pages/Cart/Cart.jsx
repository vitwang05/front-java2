import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../Components/Context/ShopContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    loadCartData,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  // Gọi API tải giỏ hàng khi component mount
  useEffect(() => {
    loadCartData();
  }, []);

  // Kiểm tra nếu dữ liệu chưa sẵn sàng
  if (!cartItems || !food_list) {
    return <p>Loading cart data...</p>;
  }
  console.log(cartItems)
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
        {cartItems.map((item, index) => (
          <div key={index}>
            <div className="cart-items-title cart-items-item">
              <img src={item.food.image} alt={item.food.name} />
              <p>{item.food.name}</p>
              <p>${item.food.price}</p>
              <p>{item.quantity}</p>
              <p>${item.food.price * item.quantity}</p>
              <p
                onClick={() => removeFromCart(item.id)}
                className="cross"
                >
                X
              </p>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? "0.00" : "2.00"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                $
                {(getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 2
                ).toFixed(2)}
              </p>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
