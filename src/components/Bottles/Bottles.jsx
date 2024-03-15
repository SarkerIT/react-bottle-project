import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import {
  addToLocalStorage,
  getStoredCart,
  removeFromLocalStorage,
} from "../../utilities/local-storage";
import Cart from "../Cart/Cart";

const Bottles = () => {
  // load data
  const [bottles, setBottles] = useState([]);

  // keep the selected bottle in the cart
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("../../bottles.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  //load cart from local storage
  useEffect(() => {
    console.log("called from local storeage", bottles.length);
    if (bottles.length > 0) {
      const storedCart = getStoredCart();
      console.log(storedCart, bottles);

      const savedCart = [];
      for (const id of storedCart) {
        console.log(id);
        const bottle = bottles.find((bottle) => bottle.id === id);
        if (bottle) {
          savedCart.push(bottle);
        }
      }
      console.log("Saved Cart", savedCart);
      setCart(savedCart);
    }
  }, [bottles]);

  // remove a bottle from cart
  const handleRemoveFromCart = (id) => {
    // remove from visual cart
    const remainingCart = cart.filter((bottle) => bottle.id !== id);
    setCart(remainingCart);

    // remove form local storage
    removeFromLocalStorage(id);
  };

  // onclick event handler
  const handleAddToCart = (bottle) => {
    // console.log("Bottle gonna be added in Bottles.jsx");
    // console.log(bottle);
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLocalStorage(bottle.id);
  };

  return (
    <div>
      <h3>My Total Bottles from Bottles.jsx: {bottles.length}</h3>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
      <div className="bottles-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={() => handleAddToCart(bottle)}
          ></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
