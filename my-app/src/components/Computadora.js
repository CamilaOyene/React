import React, { useState } from "react";
import "../components-css/Cart.css";
import laptop1 from "../assets/laptop1.jpg";
import laptop2 from "../assets/laptop2.jpg";
import laptop3 from "../assets/laptop3.jpg";
import laptop4 from "../assets/laptop4.jpg";

const products = [
  { id: 1, name: "Laptop HP", price: 800, image: laptop1 },
  { id: 2, name: "MacBook Pro", price: 1200, image: laptop2 },
  { id: 3, name: "Dell Inspiron", price: 950, image: laptop3 },
  { id: 4, name: "Lenovo ThinkPad", price: 1100, image: laptop4 },
];

function Computadora() {
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
      <h2 className="cart-heading">Computadoras</h2>
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

export default Computadora;