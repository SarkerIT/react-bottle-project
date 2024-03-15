import PropTypes from "prop-types";
import "./Bottle.css";

const Bottle = ({ bottle, handleAddToCart }) => {
  const { name, img, price } = bottle;
  //   console.log(bottle);

  return (
    <div className="individualBottle">
      <h3>Form Bottle.jsx: {name}</h3>
      <img className="bottleImg" src={img} alt="" />

      <p>Price: ${price}</p>
      <button onClick={handleAddToCart} className="purchaseBtn">
        Purchase
      </button>
    </div>
  );
};

Bottle.propTypes = {
  bottle: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default Bottle;
