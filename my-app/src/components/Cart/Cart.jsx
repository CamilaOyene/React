import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import carrito from '../../assets/shopping-cart.png';
import {
  ADD_PRODUCT_TO_CART,
  CHECKOUT,
  EMPTY_CART,
  REMOVE_PRODUCT_FROM_CART,
  getCartItems,
} from '../redux/slices/productSlice';
import CartItem from '../CartItem/CartItem';
import './styles.css';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCartItems);

  const handleAddToCart = (product) => {
    dispatch(ADD_PRODUCT_TO_CART(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(REMOVE_PRODUCT_FROM_CART(product.id));
  };

  const handleCheckout = () => {
    if (cart && cart.length < 1) {
      // eslint-disable-next-line
      alert(
        'No tienes productos pendientes de compra en tu carrito.\nPresiona Seguir comprando!',
      );
      return;
    }
    // eslint-disable-next-line
    alert('Muchas gracias por su compra!');
    dispatch(CHECKOUT());
  };

  const handleEmptyCart = () => {
    dispatch(EMPTY_CART());
  };

  return (
    <div className="container text-center">
      <h1 className="text-center">Bienvenido a mi carrito de compras</h1>
      <p className="text-center">
        Aca podes agregar los productos que deseas comprar y realizar el proceso
        de compra de forma sencilla y segura.
      </p>
      {cart !== undefined || cart.length > 0 ? (
        cart.map((product, idx) => (
          <CartItem
            key={idx}
            itemKey={idx}
            item={product}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            allowRemoval
          />
        ))
      ) : (
        <div className="text-center">
          <img src={carrito} alt="Carrito de compras" />
        </div>
      )}
      <div className="row">
        <div className="col p-5">
          <div
            className="btn-group"
            role="group"
            aria-label="Acciones del carrito"
          >
            <NavLink to="/">
              <button type="button" className="btn btn-outline-primary">
                Seguir Comprando
              </button>
            </NavLink>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => handleCheckout()}
              disabled={cart.length < 1}
            >
              Confirmar Compra
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => handleEmptyCart()}
              disabled={cart.length < 1}
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
