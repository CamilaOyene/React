import React from 'react';
import { NavLink } from 'react-router-dom';

function CartItem({ itemKey, item, addToCart, removeFromCart, allowRemoval }) {
  return (
    <div>
      <li key={itemKey} className="cart-item">
        <NavLink to={`/productos/${item.id}`}>
          <img src={item.imagenURL} alt={item.imagenURL} />
          <div className="cart-item-details">
            <span className="cart-item-name">{item.nombre}</span>
            <span className="cart-item-price"> ${item.precio}</span>
          </div>
        </NavLink>
        <div>
          <button className="buy" type="button" onClick={() => addToCart(item)}>
            +
          </button>
          {allowRemoval && (
            <button
              className="buy"
              type="button"
              onClick={() => removeFromCart(item)}
            >
              -
            </button>
          )}
        </div>
      </li>
    </div>
  );
}

export default CartItem;
