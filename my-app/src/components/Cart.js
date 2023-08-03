import CartItem from './CartItem';
import React, { useState } from 'react';
const products = [
  { id: 1, name: 'Producto 1', price: 10 },
  { id: 2, name: 'Producto 2', price: 15 },
  { id: 3, name: 'Producto 3', price: 20 },
];

function Cart() {
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
      <h2 className="text-2xl font-semibold mb-4">Carrito de Compras</h2>
      {cartItems.length > 0 ? (
        <>
          <ul className="divide-y divide-gray-400 mb-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} remove={() => removeFromCart(item)} />
            ))}
          </ul>

          <p className="text-xl font-semibold">Total: ${calculateTotal()}</p>

          <div className="flex mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
              onClick={() => alert('¡Gracias por tu compra!')}
            >
              Comprar
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-4"
              onClick={() => setCartItems([])}
            >
              Vaciar carrito
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setCartItems([...cartItems, ...products])}
            >
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

export default Cart;