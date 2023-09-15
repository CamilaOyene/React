import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "../components-css/Cart.css";
import ProductDetail from "./ProductDetail";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase/config";
import { STORE_PRODUCTS } from "./redux/slices/productSlice";
import { useDispatch } from "react-redux";

function Celulares() {
  const [cartItems, setCartItems] = useState([]);
  const [products1, setProducts1] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    try {
      const productsRef = collection(db, "Productos");
      const q = query(productsRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredProducts = allProducts.filter(
          (product) => product.descripcion === "celular"
        );

        setProducts1(filteredProducts);
        dispatch(
          STORE_PRODUCTS({
            products: allProducts,
          })
        );
      });
    } catch (error) {}
  };

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
        const updatedCart = [...cartItems];
        updatedCart[index].quantity -= 1;
        setCartItems(updatedCart);
      } else {
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

  const { id } = useParams();

  if (id) {
    const product = products1.find((item) => item.id === parseInt(id));
    if (product) {
      return (
        <ProductDetail
          products={product}
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      );
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="cart-heading"></h2>
      {products1?.length > 0 ? (
        <>
          <ul className="cart-list">
            {products1?.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.imagenURL} alt={item.imagenURL} />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.nombre}</span>
                  <span className="cart-item-price"> ${item.precio}</span>
                </div>
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
      <ProductDetail
        products={products1}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        id={id}
      />
    </div>
  );
}

export default Celulares;