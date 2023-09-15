/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from "react";
import "../components-css/Cart.css";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "./firebase/config";
import {useDispatch} from 'react-redux'
import { STORE_PRODUCTS } from "./redux/slices/productSlice";
import { NavLink } from "react-router-dom";

function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [products1, setProducts1] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    getProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProducts = () => {
    try {
      const productsRef = collection(db, "Productos");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setProducts1(allProducts)
        dispatch(STORE_PRODUCTS({
          products: allProducts
        }))
      });
    } catch (error) {
      
    }
  }

  // Agregar un producto al carrito
const addToCart = (product) => {
  const index = cartItems.findIndex((item) => item.id === product.id);

  if (index !== -1) {
    // El producto ya está en el carrito, aumenta la cantidad
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
  } else {
    // El producto no está en el carrito, agrégalo con cantidad 1
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }
};

const removeFromCart = (product) => {
  const index = cartItems.findIndex((item) => item.id === product.id);

  if (index !== -1) {
    if (cartItems[index].quantity > 1) {
      // Hay más de un producto en el carrito, disminuye la cantidad
      const updatedCart = [...cartItems];
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    } else {
      // Solo hay un producto en el carrito, elimínalo
      const updatedCart = cartItems.filter((item) => item.id !== product.id);
      setCartItems(updatedCart);
    }
  }
};


  // Calcular el total del carrito
 const calculateTotal = () => {
   return cartItems.reduce(
     (total, item) => total + item.precio * item.quantity,
     0
   );
 };

  return (
    <div className="container mx-auto py-8">
      <h2 className="cart-heading"></h2>
      {products1?.length > 0 ? (
        <>
          <ul className="cart-list">
            {products1?.map((item) => (
              <li key={item.id} className="cart-item">
                <NavLink to={`/productos/${item.id}`}>
                  <img src={item.imagenURL} alt={item.imagenURL} />
                  <div className="cart-item-details">
                    <span className="cart-item-name">{item.nombre}</span>
                    <span className="cart-item-price"> ${item.precio}</span>
                  </div>
                </NavLink>
                <button className="buy" onClick={() => addToCart(item)}>
                  +
                </button>
                {cartItems?.find((cartItem) => cartItem.id === item.id) && (
                  <span>
                    {
                      cartItems.find((cartItem) => cartItem.id === item.id)
                        .quantity
                    }
                  </span>
                )}
                {cartItems?.find((cartItem) => cartItem.id === item.id) && (
                  <button className="buy" onClick={() => removeFromCart(item)}>
                    -
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
        <p>No hay productos</p>
      )}
    </div>
  );
}

export default Home;

