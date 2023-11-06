import React from 'react';

function ButtonsCartItem({ addToCart, removeFromCart, item }) {
  return (
    <div>
      {/* eslint-disable-next-line */}
            <button className="buy" type="button" onClick={() => addToCart(item)}>
        +
      </button>
      {/* eslint-disable-next-line */}
            <button className="buy" type="button" onClick={() => removeFromCart(item)}>
        -
      </button>
    </div>
  );
}

export default ButtonsCartItem;
