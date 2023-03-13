import React from "react";
import { Container, Button } from "reactstrap";

const Cart = ({ setclassCart, setIsCartOpen }) => {
  let content;

  const cartItems = [
    {
      name: "one",
      price: "120.10",
    },
    {
      name: "one",
      price: "120.10",
    },
    {
      name: "one",
      price: "120.10",
    },
    {
      name: "one",
      price: "120.10",
    },
    {
      name: "one",
      price: "120.10",
    },
    {
      name: "one",
      price: "120.10",
    },
    {
      name: "one",
      price: "120.10",
    },
  ];

  const closeCart = () => {
    setclassCart("mini-cart hidden");
    setIsCartOpen(false);
  };

  content = (
    <div className="cart">
      <div className="cart-header">
        <Button color="white" onClick={closeCart}>
          <i class="bi bi-x fs-4"></i>
        </Button>
      </div>
      {cartItems.length > 0 ? (
        <div className="cart-body">
          {cartItems.map((item) => (
            <div>
              <span>{`${item.name} /`}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="cart-empty">
          <i class="bi bi-cart-x-fill"></i>
          <p>Cart is Empty</p>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="cart-summary">
            <div>Summary</div>
          </div>
          <div className="cart-checkout">
            <div>Checlout</div>
          </div>
        </>
      )}
    </div>
  );

  return content;
};

export default Cart;
