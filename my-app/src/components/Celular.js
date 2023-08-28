import React, { useState } from "react";
import "../components-css/Cart.css";
import celular from "../assets/iphone.jpg";
import celular2 from "../assets/celular2.png";
import celular3 from "../assets/celular3.jpg";

const products = [
  { id: 1, name: "IPhone 11", price: 10, image: celular },
  { id: 2, name: "Samsung Galaxy", price: 15, image: celular2 },
  { id: 3, name: "Motorola G", price: 15, image: celular3 },
];

function Celulares() {
  const [cartItems, setCartItems] = useState([]);

  // Agregar un producto al carrito
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Eliminar un producto del carrito
  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  // Calcular el total del carrito
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="cart-heading">Celulares</h2>
      {products.length > 0 ? (
        <>
          <ul className="cart-list">
            {products.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price"> ${item.price}</span>
                </div>
                {cartItems.find((cartItem) => cartItem.id === item.id) ? (
                  <button className="buy" onClick={() => removeFromCart(item)}>
                    -
                  </button>
                ) : (
                  <button className="buy" onClick={() => addToCart(item)}>
                    +
                  </button>
                )}
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: ${calculateTotal()}</p>
          <div className="cart-actions">
            {cartItems.length > 0 && (
              <button
                className="buy"
                onClick={() =>
                  alert("¡Gracias por tu compra!", setCartItems([]))
                }
              >
                Comprar
              </button>
            )}
            <button className="clear" onClick={() => setCartItems([])}>
              Vaciar carrito
            </button>
            <button className="continue" onClick={() => setCartItems([])}>
              Seguir comprando
            </button>
          </div>
        </>
      ) : (
        <p>Tu carrito está vacío</p>
      )}
    </div>
  );
}

export default Celulares;