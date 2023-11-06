import React from 'react';
import { NavLink } from 'react-router-dom';
import ButtonsCartItem from '../ButtonsCartItem/ButttonsCartItem';

function CartItem({ itemKey, item, addToCart, removeFromCart }) {
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
          <ButtonsCartItem
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            item={item}
          />
        </div>
      </li>
    </div>
  );
}

export default CartItem;
